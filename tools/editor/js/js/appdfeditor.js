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

	// $('#myTab a').click(function (e) {
	// 	e.preventDefault();
	// 	$(this).tab('show');
	// });

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
	console.log(descriptionXML);

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
			errorArray.push(data.message);
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

function buildAppdDFFile(event) {
	console.log("BbuildAppdDFFile");
	var errors = collectBuildErrors();
	console.log(errors);
	if (errors.length>0) {
		event.preventDefault();
		showBuildErrors(errors);
	} else {
		$("#form-errors").find("ul").hide();
	};
	return;
	//todo - remove return
	var $barDiv = $("#build-appdf-file-progress");
	var $bar = $("#build-appdf-file-progress .bar");
	$bar.css("width", "0%");
	$barDiv.show();

	console.log("onclick");
	var downloadLink = document.getElementById("build-appdf-file");
	if (!downloadLink.download) {
		generateAppDFFile(function(url) {
			var clickEvent = document.createEvent("MouseEvent");
			console.log("url = " + url);
			downloadLink.href = url;
			downloadLink.download = "test.zip";
			clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			downloadLink.dispatchEvent(clickEvent);
			$barDiv.hide();
		});
		event.preventDefault();
		return false;
	};
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

function addMoreTitles(e) {
	var $parent = $(e).closest(".control-group");
	var strHtml = ' \
		<div class="control-group"> \
			<!-- description/texts/title --> \
			<label class="control-label"  for="description-texts-title-more">Longer title</label> \
			<div class="controls"> \
				<div class="input-append"> \
					<input type="text" id="description-texts-title-more-' + getUniqueId() + ' class="input-xxlarge"> \
					<button class="btn" type="button" onclick="removeControlGroup(this); return false;"><i class="icon-remove"></i></button> \
				</div> \
				<p class="help-block">Enter longer title and it will be used by those stores that support longer titles.</p> \
			</div> \
		</div><!--./control-group --> \
	';
 	$parent.after($(strHtml));
 }

function addMoreShortDescriptions(e) {
	var $parent = $(e).closest(".control-group");
	var strHtml = ' \
		<div class="control-group"> \
			<!-- description/texts/title --> \
			<label class="control-label"  for="description-texts-shortdescription-more">Longer short description</label> \
			<div class="controls"> \
				<div class="input-append"> \
					<input type="text" id="description-texts-shortdescription-more-' + getUniqueId() + '" class="input-xxlarge"> \
					<button class="btn" type="button" onclick="removeControlGroup(this); return false;"><i class="icon-remove"></i></button> \
				</div> \
				<p class="help-block">Enter longer short description and it will be used by those stores that support longer short descriptions.</p> \
			</div> \
		</div><!--./control-group --> \
	';
 	$parent.after($(strHtml));
 }

function addMoreKeywords(e) {
	var $parent = $(e).closest(".input-append");
	var strHtml = ' \
		<div class="keyword-countainer"> \
			<div class="input-append"> \
				<input type="text" id="description-texts-keywords-more-' + getUniqueId() + '"> \
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
	var $bar = $("#build-appdf-file-progress .bar");
	console.log("progress total=" + total + ", current=" + current);
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
	validationCallbackApkFile($el, value, callback, true);
};

function validationCallbackApkFileMore($el, value, callback) {
	console.log("validationCallbackApkFileMore");
	validationCallbackApkFile($el, value, callback, false);
};
