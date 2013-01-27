var MAXIMUM_APK_FILE_SIZE = 50000000;
zip.workerScriptsPath = "js/zip/";

var firstApkFileData = {};


var globalUnigueCounter = 0;
function getUniqueId() {
	return globalUnigueCounter++;
}

$(document).ready(function() {
	initialFilling();
	addValidationToElements($("input,textarea,select"));
	$("#build-appdf-file").click(function(event) {
		return buildAppdDFFile(event);
	});

	$("#show-import-description-xml").click(function(event) {
		var $modal = $("#import-description-xml-modal");
		var $importButton = $modal.find(".btn-primary");
		$("#load-errors").hide();
		$modal.on('shown', function () {
			$("#description-xml-to-import").focus();
		});
		$importButton.click(function(event) {
			event.preventDefault();
			var xml = $("#description-xml-to-import").val();
			loadDescriptionXML(xml, function() {
				$modal.modal('hide');
			}, function(error) {
				console.log("Import error: " + error);
				$("#load-errors").show();
				$("#load-errors-message").text(error);
			});
			return false;
		});
		$modal.modal("show");
		return false;
	});

	$("#categorization-type").change(function() {
		fillCategories();
		fillSubcategories();
		fillCategoryStoresInfo();
	});

	$("#categorization-category").change(function() {
		fillSubcategories();
		fillCategoryStoresInfo();
	});

	$("#categorization-subcategory").change(function() {
		fillCategoryStoresInfo();
	});
});

function fillApkFileInfo($el, apkData) {
	var $info = $el.closest(".control-group").find(".apk-file-info");
	$info.empty();

	if (apkData) {
		var $table = $("<table class='table table-striped table-bordered'/>");
		$table.append($("<tr><td>Package</td><td>" + apkData.package + "</td></tr>"));
		$info.append($table);
	};
};


function prettyFileInputClick(e) {
	console.log("prettyFileInputClick");
	$(e).closest(".controls").children("input").click();
};

function generateAppDFFile(onend) {
	var descriptionXML = generateDescriptionFileXML(); 
	localStorage.setItem(firstApkFileData.package, descriptionXML);

	var URL = window.webkitURL || window.mozURL || window.URL;

	var files = [];
	//Add all APK files
	$("section#apk-files").find("input:file").each(function() {
		console.log("next APK file element");
		console.log(this);
		files.push($(this)[0].files[0]);
	});

	var apkFile = document.getElementById("apk-file");

	zip.createWriter(new zip.BlobWriter(), function(writer) {

		addDescriptionAndFilesToZipWriter(writer, descriptionXML, files, onProgress, function() {
			writer.close(function(blob) {
				var url = URL.createObjectURL(blob);
				onend(url);
		    });
		  });

	}, function(error) {
		alert("error:" + error);
	});
};

function collectBuildErrors() {
	var errors = $("input,select,textarea").jqBootstrapValidation("collectErrors");
	console.log(errors);
	var errorArray = [];
	for (field in errors) {
		if (name!=undefined) {
			var fieldErrors = errors[field];
			for (var i=0; i<fieldErrors.length; i++) {
				var error = fieldErrors[i];
				if (errorArray.indexOf(error) == -1) {
					errorArray.push(error);
				};
			};
		};
	};

	validationCallbackApkFileFirst($("#apk-file"), $("#apk-file").val(), function(data) {
		console.log(data);
		if (!data.valid) {
			if (errorArray.indexOf(data.message) == -1) {
				errorArray.push(data.message);
			};
		};
	});

	return errorArray;
};

function showBuildErrors(errors) {
	//First trigger showing error messages inside control helpers
	$("input,select,textarea").trigger("submit.validation").trigger("validationLostFocus.validation");

	var $list = $("#form-errors").find("ul");

	//Then we clear all the previous errors from the error lost
	$list.find("li").remove();

	//Now we make sure the error list is visible and add all the errors there
	$("#form-errors").show();
	for (var i=0; i<errors.length; i++) {
		$list.append($("<li>"+errors[i]+"</li>"))
	};
};

// function loadTestDescriptionXml() {
// 	console.log("loadTestDescriptionXml");
// 	var xml = $("#descriptionxml").val();
// 	console.log(xml);
// 	parseDescriptionXML(xml, function(data) {
// 		console.log("Load success");
// 		console.log(data);
// 	}, function (error) {
// 		console.log("Load error");
// 		console.log(error);
// 	});
// };

function buildAppdDFFile(event) {
	console.log("BbuildAppdDFFile");

	//First we check if there is already built file, if so we return to a standard download handler
	var downloadLink = document.getElementById("build-appdf-file");
	if (downloadLink.download) {
		return true;
	}

	//If not we start the checking and building process.
	//First we collect all the errors and check if there are any
	var errors = collectBuildErrors();
	if (errors.length>0) {
		//If there are errors we just show the errors and return
		showBuildErrors(errors);
		return false;
	} 

	//If there are not errors, we hide the error block and show the progress block
	$("#form-errors").hide();
	$("#build-appdf-progressbarr").css("width", "0%");
	$("#build-appdf-status").show();

	generateAppDFFile(function(url) {
		var clickEvent = document.createEvent("MouseEvent");
		console.log("url = " + url);
		downloadLink.href = url;
		downloadLink.download = "test.zip"; //todo - rename file to .appdf with good name
		clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		downloadLink.dispatchEvent(clickEvent);
		$("#build-appdf-status").hide();
		setTimeout(clearBuildedAppdfFile, 1);
	});

	return false;
};

function clearBuildedAppdfFile() {
	console.log("clearBuildedAppdfFile");
	var downloadLink = document.getElementById("build-appdf-file");
	downloadLink.download = null;
};

function fillLanguages(element) {
	for (var code in allLanguages) {
		if (code.toLowerCase()!="en_us") {
			element.append($("<option />").val(code).text(allLanguages[code]));
		};
	};
	element.val("en");
};

function fillCategories() {
	var selectedType = $("#categorization-type").find(":selected").val();
	var categories = $("#categorization-category");
	var categoryHash = allCategories[selectedType];
	categories.empty();
	for (var k in categoryHash) {
 		categories.append($("<option />").val(k).text(k));
 	}
 }

 function fillSubcategories() {
	var selectedType = $("#categorization-type").find(":selected").val();
	var selectedCategory = $("#categorization-category").find(":selected").val();
	var subcategories = $("#categorization-subcategory");
	var subcategoryArray = allCategories[selectedType][selectedCategory];
	subcategories.empty();
	for (var i=0; i<subcategoryArray.length; i++) {
		var s = subcategoryArray[i];
		subcategories.append($("<option />").val(s).text(s));
	}
	if (subcategoryArray.length<=1) {
		subcategories.closest(".control-group").hide();	
	} else {
		subcategories.closest(".control-group").show();			
	}
};

function fillCategoryStoresInfo() {
	var table = $("<table class='table table-striped table-bordered'/>");
	table.append($("<tr><th>Store</th><th>Category</th></tr>"));

	var selectedType = $("#categorization-type").find(":selected").val();
	var selectedCategory = $("#categorization-category").find(":selected").val();
	var selectedSubcategory = $("#categorization-subcategory").find(":selected").val();

	var storeInfo = storeCategories[selectedType][selectedCategory][selectedSubcategory];

	for (store in storeInfo) {
		table.append($("<tr><td>" + allStores[store] + "</td><td>" + storeInfo[store] + "</td></tr>"));
	}

	$("#store-categories-info").empty();
	$("#store-categories-info").append(table);
};

function addValidationToElements($elements) {
	$elements.jqBootstrapValidation(
		{
			preventSubmit: true,
			submitError: function($form, event, errors) {
				console.log("submitError");
				console.log(event);
				console.log(errors);
				// Here I do nothing, but you could do something like display 
				// the error messages to the user, log, etc.
			},
			submitSuccess: function($form, event) {
				alert("OK");
				event.preventDefault();
			},
			filter: function() {
				return $(this).is(":visible");
			}
		}
	);
};

function addValidationToLastControlGroup($fieldset) {
	var $lastControlGroup = $fieldset.children(".control-group").last();
	addValidationToElements($lastControlGroup.find("input,textarea,select"));
};

function addMoreTitles(e, value) {
	var $parent = $(e).closest(".control-group");
	var strHtml = ' \
		<div class="control-group"> \
			<!-- description/texts/title --> \
			<label class="control-label"  for="description-texts-title-more">Longer title</label> \
			<div class="controls"> \
				<div class="input-append"> \
					<input type="text" id="description-texts-title-more-' + getUniqueId() + ' class="input-xxlarge" value="' + value + '"> \
					<button class="btn" type="button" onclick="removeControlGroup(this); return false;"><i class="icon-remove"></i></button> \
				</div> \
				<p class="help-block">Enter longer title and it will be used by those stores that support longer titles.</p> \
			</div> \
		</div><!--./control-group --> \
	';
 	$parent.after($(strHtml));
 }

function addMoreShortDescriptions(e, value) {
	var $parent = $(e).closest(".control-group");
	var strHtml = ' \
		<div class="control-group"> \
			<!-- description/texts/title --> \
			<label class="control-label"  for="description-texts-shortdescription-more">Longer short description</label> \
			<div class="controls"> \
				<div class="input-append"> \
					<input type="text" id="description-texts-shortdescription-more-' + getUniqueId() + '" class="input-xxlarge" value="' + value + '"> \
					<button class="btn" type="button" onclick="removeControlGroup(this); return false;"><i class="icon-remove"></i></button> \
				</div> \
				<p class="help-block">Enter longer short description and it will be used by those stores that support longer short descriptions.</p> \
			</div> \
		</div><!--./control-group --> \
	';
 	$parent.after($(strHtml));
 }

function addMoreKeywords(e, value) {
	var $parent = $(e).closest(".input-append");
	var strHtml = ' \
		<div class="keyword-countainer"> \
			<div class="input-append"> \
				<input type="text" id="description-texts-keywords-more-' + getUniqueId() + '" value="' + value + '"> \
				<button class="btn" type="button" onclick="removeKeyword(this); return false;"><i class="icon-remove"></i></button> \
			</div> \
		</div> \
	';
	$parent.after($(strHtml));
 }

function addApkFile(e) {
	console.log("addApkFile");
	var $parent = $(e).closest(".control-group");
	var strHtml = ' \
		<div class="control-group"> \
			<label class="control-label" for="pretty-apk-file">APK File</label> \
			<div class="controls"> \
				<input type="file" name="apk-file" class="hide ie_show" accept="application/vnd.android.package-archive" \
					data-validation-callback-callback="validationCallbackApkFileMore" \
				/> \
				<div class="input-append ie_hide"> \
					<input id="pretty-apk-file" class="input-large" type="text" readonly="readonly" onclick="prettyFileInputClick(this);"> \
						<a class="btn" onclick="prettyFileInputClick(this);">Browse</a> \
						<a class="btn" onclick="removeControlGroup(this);"><i class="icon-remove"></i></a> \
				</div> \
				<p class="help-block">Submit additional APK files if your application uses more than one APK file</p> \
			</div> \
			<div class="controls"> \
				<div class="apk-file-info"></div> \
			</div> \
		</div> \
	';
	$parent.after($(strHtml));
	$controlGroup = $($parent.closest("fieldset").children("div.control-group")[1]);
	addValidationToElements($controlGroup.find("input,textarea,select"));
};

function removeControlGroup(e) {
	$(e).closest(".control-group").remove();
};

function removeKeyword(e) {
	$(e).closest(".keyword-countainer").remove();
};

function initialFilling() {
	fillLanguages($("#add-localization-modal-language"));	
	fillCategories();
	fillSubcategories();
};

function generateCategorizationXML(xml) {
	xml.addTag("<categorization>", function() {
		xml.addTag("<type>", $("#categorization-type").val());
		xml.addTag("<category>", $("#categorization-category").val());
		xml.addTag("<subcategory>", $("#categorization-subcategory").val());
	});
};

function generateOneLanguageDescription(languageCode, xml) {
	$parent = $("#localization-tab-" + languageCode);

	xml.addTag("<texts>", function() {
		//Title
		xml.addNonEmptyTextTag("<title>", $parent.find("#description-texts-title").val());
		console.log($parent.find("input[id^=description-texts-title-more-]"));
		$parent.find("input[id^=description-texts-title-more-]").each(function() {
			xml.addNonEmptyTextTag("<title>", $(this).val());
		});

		//Keywords
		var keywords = [];
		keywords.push($parent.find("#description-texts-keywords").val());
		$parent.find("input[id^=description-texts-keywords-more-]").each(function() {
			keywords.push($(this).val());
		});
		xml.addNonEmptyTextTag("<keywords>", keywords.join(","));

		//Short description
		xml.addNonEmptyTextTag("<short-description>", $parent.find("#description-texts-shortdescription").val());
		$parent.find("input[id^=description-texts-shortdescription-more-]").each(function() {
			xml.addNonEmptyTextTag("<short-description>", $(this).val());
		});

		//Full description
		xml.addNonEmptyTextTag("<full-description>", $parent.find("#description-texts-fulldescription").val());

		//Features
		xml.addTag("<features>", function() {
			$parent.find("input[id^=description-texts-features-]").each(function() {
				xml.addNonEmptyTextTag("<feature>", $(this).val());
			});
		});

		//Recent changes
		xml.addNonEmptyTextTag("<recent-changes>", $parent.find("#description-texts-recentchanges").val());		
	});		
};

function generateDescriptionXML(xml) {
	xml.addTag("<description>", function() {
		generateOneLanguageDescription("default", xml);
	});
};

function generateDescriptionLocalizationsXML(xml) {
	var languages = getDescriptionLanguages();
	for (var i=0; i<languages.length; i++) {
		var languageCode = languages[i];
		if (languageCode!="default") {
			xml.addTag("<description-localization language=\"" + languageCode + "\">", function() {
				generateOneLanguageDescription(languageCode, xml);
			});
		};
	};
};

function generateCustomerSupportXML(xml) {
	xml.addTag("<customer-support>", function() {
		xml.addTag("<phone>", $("#customersupport-phone").val());
		xml.addTag("<email>", $("#customersupport-email").val());
		xml.addTag("<website>", $("#customersupport-website").val());
	});
};

function isCheckboxChecked(id) {
	return document.getElementById(id).checked ? "yes" : "no";
}

function generateConsentXML(xml) {
	xml.addTag("<consent>", function() {
		xml.addTag("<google-android-content-guidelines>", isCheckboxChecked("consent-googleandroidcontentguidelines"));
		xml.addTag("<us-export-laws>", isCheckboxChecked("consent-usexportlaws"));
	});
};

function generateApkFilesXML(xml) {
	xml.addTag("<apk-files>", function() {
		$("section#apk-files").find("input:file").each(function() {
			xml.addTag("<apk-file>", normalizeInputFileName($(this).val()));
		});
	});
};

function generateDescriptionFileXML() {
	var xml = new XMLGenerator();
	xml.addLine('<?xml version="1.0" encoding="UTF-8"?>');
	xml.addTag('<application-description-file version="1">', function() {
		xml.addTag('<application package="' + firstApkFileData.package + '">', function() {
			generateCategorizationXML(xml);
			generateDescriptionXML(xml);
			generateDescriptionLocalizationsXML(xml);
			generateApkFilesXML(xml);
			generateCustomerSupportXML(xml);
			generateConsentXML(xml);
		});
	});
	return xml.getXmlText();
};

function flatten(array) {
    var flat = [];
    for (var i = 0; i < array.length; i++) {
        var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
        if (type) { 
        	if (/^(array|collection|arguments|object|filelist)$/.test(type)) {
	        	flat = flat.concat(flatten(array[i])); 
        	} else {
    	    	flat = flat.concat(array[i]);         		
        	}
        }
    }
    return flat;
};

function addDescriptionAndFilesToZipWriter(zipWriter, descriptionXml, files, onprogress, onend) {
	var addIndex = 0;

	var flattenedFiles = flatten(files);
	var totalSizeOfAllFiles = 0;
	$.each(flattenedFiles, function() { 
		totalSizeOfAllFiles += this.size;
	});

	var sizeOfAlreadyZippedFilesIncludingCurrent = 0;

	function addNextFile() {
		var file = flattenedFiles[addIndex];
		console.log("file");
		console.log(file);
		sizeOfAlreadyZippedFilesIncludingCurrent += file.size;
		zipWriter.add(file.name, new zip.BlobReader(file), function() {
			addIndex++;
			if (addIndex < flattenedFiles.length) {
				addNextFile();
			} else {
				onend();
			}
		}, function(current, total) {
			onprogress(sizeOfAlreadyZippedFilesIncludingCurrent - total + current, totalSizeOfAllFiles)
		});
	};

	zipWriter.add("description.xml", new zip.TextReader(descriptionXml), function() {
		addNextFile();
	}, function(current, total) {
		onprogress(totalSizeOfAllFiles, totalSizeOfAllFiles);
	});
};

function onProgress(current, total) {
	var $bar = $("#build-appdf-progressbar");
	console.log("progress total=" + total + ", current=" + current);
	console.log($bar);
	var percentage = "" + Math.round(100.0 * current / total) + "%";
	console.log(percentage);
	$bar.css("width", percentage);
	$bar.text(percentage);
};

function normalizeInputFileName(fileName) {
	return fileName.replace("C:\\fakepath\\", "");
};

function validationCallbackApkFile($el, value, callback, first) {
	console.log("validationCallbackApkFile");
	console.log($el[0].files);
	var apkFileName = normalizeInputFileName($el.val());
	$el.closest(".controls").find("input:text").val(apkFileName);

	if (first && $el[0].files.length==0) {
		callback({
			value: value,
			valid: false,
			message: "APK file is required"
		});
		return;
	};
	
	var file = $el[0].files[0];

	if (file.size>MAXIMUM_APK_FILE_SIZE) {
		callback({
			value: value,
			valid: false,
			message: "APK file size cannot exceed 50M"
		});
		return;
	};

	ApkParser.parseApkFile(file, apkFileName, function(apkData) {
		console.log("validationCallbackApkFile read OK");
		fillApkFileInfo($el, apkData);
		var data = {
			value: value,
			valid: true
		};

		if (first) {
			firstApkFileData = apkData;
		} else {
			if (firstApkFileData.package!=apkData.package) {
				data.valid = false;
				data.message = "APK file package names do not match";
			};
		};
		callback(data);
	}, function (error) {
		console.log("validationCallbackApkFile read error" + error);
		fillApkFileInfo($el, null);
		callback({
			value: value,
			valid: false,
			message: error
		});
	});
};

function validationCallbackApkFileFirst($el, value, callback) {
	console.log("validationCallbackApkFileFirst");
	validationCallbackApkFile($el, value, function(data) {
		if (data.valid) {
			loadDescriptionXML(localStorage.getItem(firstApkFileData.package), function(){}, function(error){});
		};
		callback(data);
	}, true);
};

function validationCallbackApkFileMore($el, value, callback) {
	console.log("validationCallbackApkFileMore");
	validationCallbackApkFile($el, value, callback, false);
};

function showImportingError(error) {
	$("#load-errors").show();
	$("#load-errors-message").html(error);
};

function loadDescriptionLocalizationSection(languageCode, data) {
	var $container = $("#localization-tab-" + languageCode);

	$container.find("input[id^=description-texts-title-more-]").closest(".control-group").remove();
	var titles = data["texts"]["title"];
	for (var i=0; i<titles.length; i++) {
		var title = titles[i];
		if (i==0) {
			$container.find("#description-texts-title").val(title);
		} else {
			addMoreTitles($container.find("#description-texts-title"), title);
		};
	};	

	$container.find("input[id^=description-texts-keywords-more-]").closest(".keyword-countainer").remove();
	var keywords = data["texts"]["keywords"];
	console.log("keywords for lang="+languageCode);
	console.log(keywords);
	for (var i=0; i<keywords.length; i++) {
		var keyword = keywords[i];
		if (i==0) {
			$container.find("#description-texts-keywords").val(keyword);
		} else {
			addMoreKeywords($container.find("#description-texts-keywords"), keyword);
		};
	};	

	$container.find("input[id^=description-texts-shortdescription-more-]").closest(".control-group").remove();
	var shoftDescriptions = data["texts"]["short-description"];
	for (var i=0; i<shoftDescriptions.length; i++) {
		var shortDescription = shoftDescriptions[i];
		if (i==0) {
			$container.find("#description-texts-shortdescription").val(shortDescription);
		} else {
			addMoreShortDescriptions($container.find("#description-texts-shortdescription"), shortDescription);
		};
	};	

	$container.find("#description-texts-fulldescription").val(data["texts"]["full-description"]);

	$container.find("input[id^=description-texts-features-]").val("");
	var features = data["texts"]["features"];
	for (var i=0; i<features.length; i++) {
		var feature = features[i];
		if (i<5) {
			$container.find("#description-texts-features-" + (i+1)).val(feature);
			console.log($container.find("#description-texts-features-" + (i+1)));
		};
	};	

	console.log(data["texts"]["recent-changes"]);
	if (data["texts"]["recent-changes"]) {
		console.log("recent changes are not null");
		$container.find("#description-texts-recentchanges").val(data["texts"]["recent-changes"]);
	} else {
		$container.find("#description-texts-recentchanges").val("");		
	};
};

function loadDescriptionXML(xml, onend, onerror) {
	parseDescriptionXML(xml, function(data) {
		console.log("Description.XML is parsed");
		console.log(data);

		//Set control values in the categorization section
		$("#categorization-type").val(data["categorization"]["type"]);
		fillCategories();

		$("#categorization-category").val(data["categorization"]["category"]);
		fillSubcategories();

		$("#categorization-subcategory").val(data["categorization"]["subcategory"]);
		fillCategoryStoresInfo();

		//Set control values in the description/texts
		removeAllLocalizations();
		for (languageCode in data["description"]) {
			if (languageCode!="default") {
				addLocalization(languageCode, allLanguages[languageCode]);
			};
			loadDescriptionLocalizationSection(languageCode, data["description"][languageCode]);
		};

		onend();
	}, onerror);
};
