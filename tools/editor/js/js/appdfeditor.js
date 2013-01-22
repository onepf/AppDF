zip.workerScriptsPath = "js/zip/";

var allCategories = {};
var storeCategories = {};
var allLanguages = {};
var allStores = {};

var globalUnigueCounter = 0;
function getUniqueId() {
	return globalUnigueCounter++;
}

$.getJSON("data/categories.json", function(loadedCategories) {
$.getJSON("data/store_categories.json", function(loadedStoreCategories) {
$.getJSON("data/languages.json", function(loadedLanguages) {
$.getJSON("data/stores.json", function(loadedStores) {
	allCategories = loadedCategories;
	storeCategories = loadedStoreCategories;
	allLanguages = loadedLanguages;
	allStores = loadedStores;
	initialFilling();
})
})
})			
})

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

$("#apk-file").change(function() {
	var fileInputEntry = document.getElementById("apk-file");
	var error = ApkParser.parseApkFile(fileInputEntry.files[0], fileInputEntry.value, function(apkData) {
		$('#pretty-apk-file').val($("#apk-file").val().replace("C:\\fakepath\\", ""));
		alert("package = " + apkData.package);
	}, function (error) {
		fileInputEntry.value = '';
		alert("Error APK File Parsing: " + error);
	});
});

function prettyFileInputClick(id) {
	$('input[id=' + id + ']').click();
};

function generateAppDFFile(onend) {
	var descriptionXML = generateDescriptionFileXML(); 
	console.log(descriptionXML);
	return;

	var URL = window.webkitURL || window.mozURL || window.URL;
	var apkFile = document.getElementById("apk-file");

	zip.createWriter(new zip.BlobWriter(), function(writer) {

		addDescriptionAndFilesToZipWriter(writer, descriptionXML, [apkFile.files], onProgress, function() {
			writer.close(function(blob) {
				var url = URL.createObjectURL(blob);
				onend(url);
		    });
		  });

	}, function(error) {
		alert("error:" + error);
	});
};

$("#build-appdf-file").click(function(event) {
	var downloadLink = document.getElementById("build-appdf-file");
	if (!downloadLink.download) {
		generateAppDFFile(function(url) {
			var clickEvent = document.createEvent("MouseEvent");
			downloadLink.href = url;
			downloadLink.download = "test.zip";
			clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			downloadLink.dispatchEvent(clickEvent);
		});
		event.preventDefault();
		return false;
	}
});

function fillLanguages(element) {
	for (var code in allLanguages) {
 		element.append($("<option />").val(code).text(allLanguages[code]));
 	}
 	element.val("en");
 }

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
 }

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
}

 function addMoreTitles(e) {
 	var parent = $(e).closest(".control-group");
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
 	parent.after($(strHtml));
 }

function addMoreShortDescriptions(e) {
	var parent = $(e).closest(".control-group");
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
 	parent.after($(strHtml));
 }

function addMoreKeywords(e) {
	var parent = $(e).closest(".input-append");
	var strHtml = ' \
		<div class="keyword-countainer"> \
				<div class="input-append"> \
				<input type="text" id="description-texts-keywords-more"> \
				<button class="btn" type="button" onclick="removeKeyword(this); return false;"><i class="icon-remove"></i></button> \
			</div> \
		</div> \
	';
 	parent.after($(strHtml));
 }

function removeControlGroup(e) {
	$(e).closest(".control-group").remove();
}

function removeKeyword(e) {
	$(e).closest(".keyword-countainer").remove();
}

//Initial filling
function initialFilling() {
	fillLanguages($("#description-attrlanguage"));
	fillCategories();
	fillSubcategories();
}

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

function generateDescriptionFileXML() {
	var xml = new XMLGenerator();
	xml.addLine('<?xml version="1.0" encoding="UTF-8"?>');
	xml.addTag('<application-description-file version="1">', function() {
		xml.addTag('<application package="ru.yandex.shell">', function() {
			generateCategorizationXML(xml);
			generateDescriptionXML(xml);
			generateCustomerSupportXML(xml);
		});
	});
	return xml.getXmlText();
};

//Add validations
$("input,textarea,select").jqBootstrapValidation(
    {
        preventSubmit: true,
        submitError: function($form, event, errors) {
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

	function addNextFile() {
		var file = flattenedFiles[addIndex];
		zipWriter.add(file.name, new zip.BlobReader(file), function() {
			addIndex++;
			if (addIndex < flattenedFiles.length) {
				addNextFile();
			} else {
				onend();
			}
		}, onprogress);
	};

	zipWriter.add("description.xml", new zip.TextReader(descriptionXml), function() {
		addNextFile();
	}, onprogress);
};

function onProgress(current, total) {
	console.log("progress total=" + total + ", current=" + current);
};
