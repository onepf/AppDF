/*******************************************************************************
 * Copyright 2012 Vassili Philippov <vassiliphilippov@onepf.org>
 * Copyright 2012 One Platform Foundation <www.onepf.org>
 * Copyright 2012 Yandex <www.yandex.com>
 * 
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 * 
 *        http://www.apache.org/licenses/LICENSE-2.0
 * 
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 ******************************************************************************/

/**
 * Depends on: categories.js, store_categories.js, stores.js, languages.js, jquery.js, bootstrap.js, jqBootstrapValidation.js,
 *             xmlgenerator.js, zip.js, appdflocalization.js, apkreader.js, appdfparser.js, appdfxmlsaving.js, appdfxmlloading.js
 */

var MAXIMUM_APK_FILE_SIZE = 50000000;
var firstApkFileData = {};
var globalUnigueCounter = 0;

function getUniqueId() {
    globalUnigueCounter += 1;
    return globalUnigueCounter;
};


$(document).ready(function() {
    zip.workerScriptsPath = "js/zip/";
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
            }, function(errors) {
                console.log("Import errors");
                console.log(errors);

                var $list = $("#load-errors").find("ul");

                //Then we clear all the previous errors from the error lost
                $list.find("li").remove();

                //Now we make sure the error list is visible and add all the errors there
                $("#load-errors").show();
                for (var i=0; i<errors.length; i++) {
                    $list.append( $("<li>").text(errors[i]) );
                };

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

    $("#price-free-trialversion").change(function() {
        var trialVersion = $("#price-free-trialversion").attr("checked");
        if (trialVersion === "checked") {
            $("#price-free-fullversion").removeAttr('disabled');
        } else {
            $("#price-free-fullversion").attr('disabled', 'disabled');
        };
    });
});


//Checks does the given element from the description belong to default language or one of optional localizations
function isDefaultLanguage($el) {
    var $tab = $el.closest(".tab-pane");
    var tabId = $tab.attr('id')
    var result = (tabId==="localization-tab-default");
    return result;
};

function fillApkFileInfo($el, apkData) {
    var $info = $el.closest(".control-group").find(".apk-file-info");
    $info.empty();

    if (apkData) {
        var $table = $("<table class='table table-striped table-bordered'/>");
        $table.append($("<tr><td>Package</td><td>" + apkData["package"] + "</td></tr>"));
        $table.append($("<tr><td>Version</td><td>" + apkData["version"] + "</td></tr>"));
        $info.append($table);
    };
};


function prettyFileInputClick(e) {
    $(e).closest(".controls").children("input").click();
};

function generateAppDFFile(onend) {
    var descriptionXML = generateDescriptionFileXML(); 
    localStorage.setItem(firstApkFileData.package, descriptionXML);

    var URL = window.webkitURL || window.mozURL || window.URL;

    var files = [];
    function addInputFiles($el) {
        $el.each(function() {
            //check if the file is already in the list then do not push it
            if ($(this)[0].files.length>0 && $(this)[0].files[0]) {
                files.push($(this)[0].files[0]);
            };
        });
    };

    //Add all APK files
    addInputFiles($("section#section-apk-files").find("input:file"));

    //Add all the images
    addInputFiles($("input[id^=description-images-appicon]"));
    addInputFiles($("input[id^=description-images-screenshot]"));
    addInputFiles($("input[id^=description-images-smallpromo]"));
    addInputFiles($("input[id^=description-images-largepromo]"));
    addInputFiles($("input[id^=contentdescription-ratingcertificates-certificate-]"));
    addInputFiles($("input[id^=contentdescription-ratingcertificates-mark-]"));

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
    var errorArray = [];
    for (field in errors) {
        if (name!=undefined) {
            var fieldErrors = errors[field];
            for (var i=0; i<fieldErrors.length; i++) {
                var error = fieldErrors[i];
                if (errorArray.indexOf(error) === -1) {
                    errorArray.push(error);
                };
            };
        };
    };

    validationCallbackApkFileFirst($("#apk-file"), $("#apk-file").val(), function(data) {
        if (!data.valid) {
            if (errorArray.indexOf(data.message) === -1) {
                errorArray.push(data.message);
            };
        };
    });

    validationCallbackAppIconFirst($("#description-images-appicon"), $("#description-images-appicon").val(), function(data) {
        if (!data.valid) {
            if (errorArray.indexOf(data.message) === -1) {
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

function buildAppdDFFile(event) {
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
        downloadLink.href = url;
        if (firstApkFileData) {
            downloadLink.download = firstApkFileData["package"] + ".zip"; //todo: rename extension to ".appdf" when debugging finished;
        } else {
            downloadLink.download = "untitled.appdf";
        };
        clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        downloadLink.dispatchEvent(clickEvent);
        $("#build-appdf-status").hide();
        setTimeout(clearBuildedAppdfFile, 1);
    });

    return false;
};

function clearBuildedAppdfFile() {
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
                // Here I do nothing, but you could do something like display 
                // the error messages to the user, log, etc.
            },
            submitSuccess: function($form, event) {
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
    var $controlGroup = $(' \
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
    ');
     $parent.after($controlGroup);
};

function addMoreShortDescriptions(e, value) {
    var $parent = $(e).closest(".control-group");
    var $controlGroup = $(' \
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
    ');
     $parent.after($controlGroup);
};

function addMoreAppIcon(e) {
    var $parent = $(e).closest(".image-group");
    var $controlGroup = $(' \
    <div class="image-input-group"> \
        <input type="file" id="description-images-appicon-' + getUniqueId() + '" class="hide ie_show appicon-input empty-image" \
            name="description-images-appicon-' + getUniqueId() + '" \
            accept="image/png" \
            data-validation-callback-callback="validationCallbackAppIconFirst" \
        /> \
        <img src="img/appicon_placeholder.png" width="128" height="128"> \
        <p class="image-input-label"></p> \
    </div> \
    ');
    $parent.append($controlGroup);
    addValidationToElements($controlGroup.find("input"));
};

function addMoreScreenshots(e) {
    var $parent = $(e).closest(".image-group");
    var $controlGroup = $(' \
    <div class="image-input-group"> \
        <input type="file" id="description-images-screenshot-' + getUniqueId() + '" class="hide ie_show screenshot-input empty-image" \
            name="description-images-screenshot-' + getUniqueId() + '" \
            accept="image/png" \
            data-validation-callback-callback="validationCallbackScreenshotRequired" \
        /> \
        <img src="img/screenshot_placeholder.png" width="132" height="220"> \
        <p class="image-input-label"></p> \
    </div> \
    ');
    $parent.append($controlGroup);
    addValidationToElements($controlGroup.find("input"));
};

function removeControlGroup(e) {
    $(e).closest(".control-group").remove();
};

function initialFilling() {
    fillLanguages($("#add-localization-modal-language"));    
    fillCategories();
    fillSubcategories();
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
    console.log("Description.xml");
    console.log(descriptionXml);
    var addIndex = 0;

    var flattenedFiles = flatten(files);
    var totalSizeOfAllFiles = 0;
    $.each(flattenedFiles, function() { 
        totalSizeOfAllFiles += this.size;
    });

    var sizeOfAlreadyZippedFilesIncludingCurrent = 0;

    function addNextFile() {
        var file = flattenedFiles[addIndex];
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
    var percentage = "" + Math.round(100.0 * current / total) + "%";
    $bar.css("width", percentage);
    $bar.text(percentage);
};

function normalizeInputFileName(fileName) {
    return fileName.replace("C:\\fakepath\\", "");
};

function validationCallbackApkFile($el, value, callback, first) {
    var apkFileName = normalizeInputFileName($el.val());
    $el.closest(".controls").find("input:text").val(apkFileName);

    if (first && $el[0].files.length === 0) {
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
        fillApkFileInfo($el, null);
        callback({
            value: value,
            valid: false,
            message: error
        });
    });
};

function validationCallbackApkFileFirst($el, value, callback) {
    validationCallbackApkFile($el, value, function(data) {
        if (data.valid) {
            var descriptionXML = localStorage.getItem(firstApkFileData.package);
            if (descriptionXML && descriptionXML!="") {
//todo: handle carefully that we set it only if page is empty
//                loadDescriptionXML(descriptionXML, function(){}, function(error){});
            };
        };
        callback(data);
    }, true);
};

function validationCallbackApkFileMore($el, value, callback) {
    validationCallbackApkFile($el, value, callback, false);
};

function getImgSize(imgSrc, onsize) {
    var newImg = new Image();
    newImg.onload = function() {
        var width = newImg.width;
        var height = newImg.height;
        onsize(width, height);
    };
    newImg.src = imgSrc; // this must be done AFTER setting onload
};

function validationCallbackAppIconFirst($el, value, callback) {
    if ($el[0].files.length === 0) {
        callback({
            value: value,
            valid: false,
            message: "Application icon is required"
        });
        return;
    };
    
    var imageFileName = normalizeInputFileName($el.val());
    var file = $el[0].files[0];
    var URL = window.webkitURL || window.mozURL || window.URL;    
    var imgUrl = URL.createObjectURL(file);

    getImgSize(imgUrl, function(width, height) {
        if (width===512 && height===512) {
            callback({
                value: value,
                valid: true
            });
        } else {
            callback({
                value: value,
                valid: false,
                message: "Application icon size must be 512x512"
            });
        };
    });
};

function validationCallbackScreenshotRequired($el, value, callback) {
    var imageFileName = normalizeInputFileName($el.val());
    var file = $el[0].files[0];
    var URL = window.webkitURL || window.mozURL || window.URL;    
    var imgUrl = URL.createObjectURL(file);

    getImgSize(imgUrl, function(width, height) {
        if (true /*todo: add some size checking*/) {
            callback({
                value: value,
                valid: true
            });
        } else {
            callback({
                value: value,
                valid: false,
                message: "Wrong screenshot size" //todo: better error message
            });
        };
    });
};

function screenshotClick(e) {
    $(e).closest(".screenshot-container").children("input").click();
};
