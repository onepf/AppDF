var MAXIMUM_APK_FILE_SIZE = 50000000;
var MAX_LOCALIZATION_TABS = 10;
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

	$('#myTab a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
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

// function getDescriptionLanguages() {
// 	var langs = [];
// 	var re = /#tab-(default|[a-z][a-z]_[a-z][a-z]|[a-z][a-z])/g;  
// 	$("#description-tab-header").children("li").children("a").each(function() {
// 		var strHref = $(this).attr("href");
// 		var res = re.exec(strHref.toLowerCase()); 
// 		console.log(">>" + strHref + "<<");
// 		console.log(res);
// 		if (res) {
// 			langs.push(res[1]);
// 		};
// 	});
// 	return langs;
// };

function getDescriptionLanguages() {
	var langs = [];
	$("#description-tab-header").children("li").children("a").each(function() {
		var strHref = $(this).attr("href").toLowerCase();
		if (strHref.indexOf("#tab-")==0) {
			langs.push(strHref.substr(5));
		};
	});
	return langs;
};

function selectLanguage(languageCode) {
	var $tabHeader = $("#description-tab-header");
	$tabHeader.find('a[href="#tab-' + languageCode + '"]').tab('show');
};

function addLocalization(languageCode, languageName) {
	console.log("addLocalization langaugeCode=" + languageCode + ", languageName=" + languageName);
	var descriptionLangs = getDescriptionLanguages();
	if (descriptionLangs.indexOf(languageCode)>=0) {
		console.log("Language already exist, just select it");
		return;
	};

	var strHtmlHeader = '<li><a href="#tab-' + languageCode + '" data-toggle="tab">' + languageName + '</a></li>';

	var $tabHeader = $("#description-tab-header");
	if ($tabHeader.children().length<MAX_LOCALIZATION_TABS) {
		$tabHeader.children("li:last").before($(strHtmlHeader));
		$tabHeader.find('a[href="#tab-' + languageCode + '"]').tab('show');
		$tabHeader.find('a[href="#tab-' + languageCode + '"]').click(function (e) {
			e.preventDefault();
			$(this).tab('show');
		});
	}

	var strHtmlContent = '<div class="tab-pane" id="tab-' + languageCode + '"></div>';
	$("#description-tab-content").append($(strHtmlContent));

	var strHtmlClone = $("#description-tab-content").children("div#tab-default").html();
	$("#description-tab-content").children().last().append($(strHtmlClone));
};

function removeSelectedLocalization() {
	var $tabHeader = $("#description-tab-header");
	var $tabContent = $("#description-tab-content");
	var strHref = $tabHeader.find(".active").children("a").attr("href");
	if (strHref!="#tab-default") {
		$tabHeader.find(".active").remove();
		$tabContent.children("div" + strHref).remove();
		selectLanguage("default");
	} else {
		alert("Cannot remove default (English) localization");
	};
};

function showAllLocalizationDialog() {
	var $modal = $("#add-localization-modal");
	var $okButton = $modal.find(".btn-primary");
	$okButton.click(function(event) {
		event.preventDefault();
		console.log("OKButton Click");
		$modal.modal('hide');
		addLocalization($("#add-localization-modal-language").val(), $("#add-localization-modal-language").children(":selected").text());
	});

	$modal.modal("show");
};

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

function buildAppdDFFile(event) {
	console.log("BbuildAppdDFFile");
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
					<input type="text" id="description-texts-shortdescription-more" class="input-xxlarge"> \
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
				<input type="text" id="description-texts-keywords-more"> \
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

function generateDescriptionXML(xml) {
	xml.addTag("<description>", function() {
		xml.addTag("<texts>", function() {
			xml.addTag("<title>", $("#description-texts-title").val());
			$("section#description input[id^=description-texts-title-more-]").each(function() {
				xml.addTag("<title>", $(this).val());
			});
		});		
	});
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
	var apkFileName = normalizeInputFileName($el.val());
	$el.closest(".controls").find("input:text").val(apkFileName);
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
