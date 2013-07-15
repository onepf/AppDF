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
 * Main JavaScript for the AppDf editor, contains all the logic that is not moved to separate files
 * Depends on: categories.js, store_categories.js, stores.js, languages.js, jquery.js, bootstrap.js, jqBootstrapValidation.js,
 *             xmlgenerator.js, zip.js, appdflocalization.js, apkreader.js, appdfparser.js, appdfxmlsaving.js, appdfxmlloading.js
 */

var appdfEditor = (function() {
    var MAXIMUM_APK_FILE_SIZE = 50000000;
    var importingFlag = false;
    var firstApkFileData = {};
    var globalUnigueCounter = 0;

    var fileName = "";
    var fileData = "";
    
    
    function getUniqueId() {
        globalUnigueCounter += 1;
        return globalUnigueCounter;
    };
    
    function addValidationToElements($elements) {
        $elements.jqBootstrapValidation({
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
        });
    };

   function fillCountries($e, selectedCountry) {
        $e.append($("<option />").val("").text("Select Country"));

        for (countryCode in dataCountries) {
            $e.append($("<option />").val(countryCode).text(dataCountries[countryCode]));
        };

        $e.change(function() {
            var selectedCountryCode = $(this).find(":selected").val();
            if (selectedCountryCode != "") {
                var currency = dataCountryCurrencies[selectedCountryCode];
                $(this).closest(".control-group").find(".add-on").html(currency);
            } else {
                $(this).closest(".control-group").find(".add-on").html("");
            };
        });

        if (selectedCountry) {
            $e.val(selectedCountry);
            var currency = dataCountryCurrencies[selectedCountry];
            $e.closest(".control-group").find(".add-on").html(currency);
        };
    };

    function normalizeInputFileName(fileName) {
        return fileName.replace("C:\\fakepath\\", "");
    };

    function getFileName($el) {
        if ($($el).val()) {
            return normalizeInputFileName($($el).val());
        } else if ($($el).data("file")) {
            return $($el).data("file");
        } else {
            return "";
        };
    };
    
    function getFileContent($el) {
        if ($el.files.length) {
            return $el.files[0];
        } else if ($($el).data("file")) {
            return appdfXMLLoader.appdfFiles[$($el).data("file")];
        } else {
            return null;
        };
    };
    
    function isNoFile($el) {
        if ($el.files.length || $($el).data("file")) {
            return false;
        } else {
            return true;
        };
    };
    
    function isOnlyDataImage($el) {
        if (!$el.files.length && $($el).data("file")) {
            return true;
        } else {
            return false;
        };
    };
    
    function addMoreKeywords(e, value) {
        var $parent = $(e).closest(".input-append").parent();
        var $controlGroup = $(' \
            <div class="input-container"> \
                <div class="input-append"> \
                    <input type="text" id="description-texts-keywords-more-' + getUniqueId() + '" value="' + value + '" \
                    required \
                    data-validation-required-message="' + errorMessages.keywordRequired + '" \
                    > \
                    <button class="btn description-texts-keywords-remove"><i class="icon-remove"></i></button> \
                </div> \
            </div> \
        ');
        $parent.find("p.help-block").before($controlGroup);
        //$controlGroup.find("input").focus();
    };

    function addMoreUnsupportedDevices(e, value) {
		if ($('#section-requirements input[name="unsupport-device-name-' + value + '"]').length) {
			return false;
		};
		
        var $parent = $(e).closest(".input-append").parent();
        var $controlGroup = $(' \
            <div class="input-container"> \
                <div class="input-append"> \
                    <input type="text" readonly id="requirements-supporteddevices-more-' + getUniqueId() + '" \
					name="unsupport-device-name-' + value + '" value="' + value + '" \
                    > \
                    <button class="btn requirements-supporteddevices-remove"><i class="icon-remove"></i></button> \
                </div> \
            </div> \
        ');
        //$parent.find("p.help-block").before($controlGroup);
        $parent.find(".input-append:first").after($controlGroup);
        addValidationToElements($controlGroup.find("input"));
		return true;
    };

    function addMoreLocalPrice(e, value, country) {
        var $parent = $(e).closest(".tab-pane");
        var $controlGroup = $(' \
            <div class="control-group"> \
                <!-- price/local-price --> \
                <label class="control-label" for="price-baseprice">Local price</label> \
                <div class="controls"> \
                    <div class="input-prepend input-append"> \
                        <select id="price-localprice-country-' + getUniqueId() + '" style="margin-right: 10px;"> \
                        </select> \
                        <span class="add-on"></span> \
                        <input class="span2" type="text" id="price-localprice-' + getUniqueId() + '" value="' + value + '" \
                            pattern="^\\d+\\.\\d+$|^\\d+$" \
                            data-validation-pattern-message="' + errorMessages.pricePattern + '" \
                        > \
                        <button class="btn control-group-remove"><i class="icon-remove"></i></button> \
                    </div> \
                    <p class="help-block"></p> \
                </div> \
            </div><!--./control-group --> \
        ');
        $parent.append($controlGroup);
        fillCountries($controlGroup.find("select"), country);
        addValidationToElements($controlGroup.find("input"));
    };

    function getStoreNameById(store) {
        if (dataStores[store]) {
            return dataStores[store];
        } else {
            return store;
        };
    };

    function addMoreStoreSpecific(e, store, value) {
		var regExp = /^[^\s][a-z]*$/;
		if ($('#section-store-specific input[name="storespecific-name-' + store + '"]').length || !regExp.test(store)) {
			return false;
		};
        
        var $parent = $(e).closest(".control-group-container");
        var $controlGroup = $(' \
            <div class="control-group store-specific"> \
                <label class="control-label"  for="storespecific-name-' + store + '">' + getStoreNameById(store) + '</label> \
                <div class="controls"> \
                    <input type="hidden" name="storespecific-name-' + store + '" id="storespecific-name-' + store + '" value="' + store + '"> \
                    <textarea class="input-xxlarge" rows="10" id="storespecific-xml-' + store + '" >' + value + '</textarea> \
                    <p class="help-block">' + getStoreNameById(store) + ' specific data in XML format. You can also rewrite any of the application description fields in this XML. \
                    <button class="btn control-group-remove">Remove ' + getStoreNameById(store) + ' Specific Data</button> \
                </div> \
            </div><!--./control-group --> \
        ');
        
        $parent.append($controlGroup);
        //$controlGroup.find("input").focus();
		addValidationToElements($controlGroup.find("input,textarea,select"));
		return true;
    };

    function addMoreTitles(e, value) {
        var $parent = $(e).closest(".control-group-container");
        var $controlGroup = $(' \
            <div class="control-group"> \
                <!-- description/texts/title --> \
                <label class="control-label"  for="description-texts-title-more">Longer title</label> \
                <div class="controls"> \
                    <div class="input-append"> \
                        <input type="text" id="description-texts-title-more-' + getUniqueId() + ' class="input-xxlarge" value="' + value + '"> \
                        <button class="btn" type="button" onclick="appdfEditor.removeControlGroup(this); return false;"><i class="icon-remove"></i></button> \
                    </div> \
                    <p class="help-block">Enter longer title and it will be used by those stores that support longer titles.</p> \
                </div> \
            </div><!--./control-group --> \
        ');
        $parent.append($controlGroup);
        //$controlGroup.find("input").focus();
    };

    function addMoreShortDescriptions(e, value) {
        var $parent = $(e).closest(".control-group-container");
        var $controlGroup = $(' \
            <div class="control-group"> \
                <!-- description/texts/title --> \
                <label class="control-label"  for="description-texts-shortdescription-more">Longer short description</label> \
                <div class="controls"> \
                    <div class="input-append"> \
                        <input type="text" id="description-texts-shortdescription-more-' + getUniqueId() + '" class="input-xxlarge" value="' + value + '"> \
                        <button class="btn" type="button" onclick="appdfEditor.removeControlGroup(this); return false;"><i class="icon-remove"></i></button> \
                    </div> \
                    <p class="help-block">Enter longer short description and it will be used by those stores that support longer short descriptions.</p> \
                </div> \
            </div><!--./control-group --> \
        ');
        $parent.append($controlGroup);
        //$controlGroup.find("input").focus();
    };

    function addApkFile(e) {
        var $parent = $(e).closest(".control-group");
        var $controlGroup = $(' \
            <div class="control-group"> \
                <label class="control-label" for="pretty-apk-file">APK File</label> \
                <div class="controls"> \
                    <input type="file" name="apk-file" class="hide ie_show hidden-apk-file" accept="application/vnd.android.package-archive" \
                        data-validation-callback-callback="appdfEditor.validationCallbackApkFileMore" \
                    /> \
                    <div class="input-append ie_hide"> \
                        <input id="pretty-apk-file" class="input-large apkfile-pretty-browse" type="text" readonly="readonly" > \
                            <a class="btn apkfile-pretty-browse">Browse</a> \
                            <a class="btn control-group-remove"><i class="icon-remove"></i></a> \
                    </div> \
                    <p class="help-block">Submit additional APK files if your application uses more than one APK file</p> \
                </div> \
                <div class="controls"> \
                    <div class="apk-file-info"></div> \
                </div> \
            </div> \
        ');
        $parent.after($controlGroup);
        addValidationToElements($controlGroup.find("input,textarea,select"));
    };

    function addVideoFile(e) {
        var $parent = $(e).closest(".control-group");
        var $controlGroup = $(' \
            <div class="controls video-file-control empty-video"> \
                <input type="file" name="video-file" class="hide ie_show hidden-video-file" accept="video/mpeg" \
                    data-validation-callback-callback="appdfEditor.validationCallbackVideoFile" \
                /> \
                <div class="input-append ie_hide"> \
                    <input id="pretty-video-file" class="input-large video-pretty-browse" type="text" readonly="readonly" > \
                        <a class="btn video-pretty-browse">Browse</a> \
                        <a class="btn control-remove"><i class="icon-remove"></i></a> \
                </div> \
                <p class="help-block"></p> \
            </div> \
        ');
        $parent.append($controlGroup);
        addValidationToElements($controlGroup.find("input,textarea,select"));
    };

    function initMenuStickToTop() {
        var $window = $(window);

        //Stick the menu to the top of the page
        $('.bs-docs-sidenav').affix({
            offset: {
                top: function () { return $window.width() <= 980 ? 290 : 210 },
                bottom: 270
            }
        });      

        //Disable empty links
        $('section [href^=#]').click(function (e) {
            e.preventDefault();
        });
    };

    function initScrollspy() {
        var lastId = "";
        var topMenu = $(".navbar");
        var leftMenu = $(".nav-list");
        var topMenuHeight = topMenu.outerHeight();
        var menuItems = leftMenu.find("a");

        var scrollItems = menuItems.map(function() {
                var item = $($(this).attr("href"));
                if (item.length) {
                    return item;
                }
        });

        menuItems.click(function(e) {
            var href = $(this).attr("href");
            var offsetTop = (href === "#") ? 0 : $(href).offset().top - topMenuHeight + 1;
            $('html, body').stop().animate({
                scrollTop: offsetTop
            }, 300);
            e.preventDefault();
        });

        $(window).scroll(function() {
            var fromTop = $(this).scrollTop() + topMenuHeight;
            var cur = scrollItems.map(function() {
                if ($(this).offset().top < fromTop) return this;
            });
            cur = cur[cur.length - 1];
            var id = cur && cur.length ? cur[0].id : "";

            if (lastId !== id) {
                lastId = id;
                menuItems.parent().removeClass("active").end().filter("[href=#" + id + "]").parent().addClass("active");
            };
        });
    };

    function initRatingCertificate() {
        $('body').on('click', '.pretty-file-input', function(e) {
            $(e.target).closest(".file-input-group").find(".pretty-file-file").click();
            return false;
        });

        $('body').on('click', '.pretty-file-button', function(e) {
            $(e.target).closest(".file-input-group").find(".pretty-file-file").click();
            return false;
        });

        $('body').on('change', '.pretty-file-file', function(e) {
            var fileName = $(e.target).val();
            fileName = fileName.replace("C:\\fakepath\\", "");
            $(e.target).closest(".file-input-group").find(".pretty-file-input").val(fileName);
            return false;
        });
    };
    
    var importDescriptionXMLInit = false;
    function showImportDescriptionXMLDialog() {
        var $modal = $("#import-descriptionxml-modal");
        var $importButton = $modal.find(".btn-primary");

        $("#import-descriptionxml-modal-errors").hide();
        $("#import-descriptionxml-modal-status").hide();

        if (!importDescriptionXMLInit) {
            importDescriptionXMLInit = true;
            
            $modal.on('shown', function () {
                if (appdfEditor.importingFlag) {
                    $("#import-descriptionxml-modal-status").show();
                } else {
                    $("#import-descriptionxml-modal-text").val("");
                    $("#import-descriptionxml-modal-status").hide();
                };
                
                $("#import-descriptionxml-modal-text").focus();
            });

            $importButton.click(function(event) {
                event.preventDefault();
                if (appdfEditor.importingFlag) {
                    return false;
                };
                appdfEditor.importingFlag = true;
                
                var xml = $("#import-descriptionxml-modal-text").val();
                $("#import-descriptionxml-modal-status").show();
                $("#import-descriptionxml-modal-errors").hide();
                
                appdfXMLLoader.loadDescriptionXML(xml, function() {
                    $modal.modal('hide');
                    importProgress(0, 100);
                    appdfEditor.importingFlag = false;
                }, function(errors) {
                    $("#import-descriptionxml-modal-status").hide();
                    importProgress(0, 100);
                    $("#import-descriptionxml-modal-errors").show();
                    
                    var $list = $("#import-descriptionxml-modal-errors").find("ul");
                    $list.find("li").remove();
                    for (var i=0; i<errors.length; i++) {
                        $list.append($("<li>").text(errors[i]));
                    };
                    appdfEditor.importingFlag = false;
                }, importProgress, false);
                return false;
            });
        };
        
        $modal.modal("show");
    };
    
    var loadAppdfDialogInit = false;
    function showLoadAppdfDialog() {
        var $modal = $("#load-appdf-modal");
        var $browseButton = $modal.find(".load-appdf-modal-browse")
        var $openButton = $modal.find("#load-appdf-modal-open-button");
        var $openUnfinishedButton = $modal.find("#load-appdf-modal-open-unfinished-button");
        var $file = $modal.find("#load-appdf-modal-file");
        
        $openUnfinishedButton.hide();
        $("#load-appdf-modal-errors").hide();
        $("#load-appdf-modal-status").hide();
        $("#load-appdf-modal-prettyfile").val("");
        $file.val("");
        
        if (!loadAppdfDialogInit) {
            loadAppdfDialogInit = true;
            
            $browseButton.click(function(event) {
                event.preventDefault();
                $file.click();
                return false;
            });

            $file.change(function(event) {
                $("#load-appdf-modal-prettyfile").val(normalizeInputFileName($file.val()));
                return false;
            });

            $modal.on("shown", function() {
                if (appdfEditor.importingFlag) {
                    $("#load-appdf-modal-status").show();
                } else {
                    $("#load-appdf-modal-status").hide();
                };
                $("#load-appdf-modal-errors").hide();
            });
            
            /*$openUnfinishedButton.click(function(event) {
                event.preventDefault();
                
                $("#load-appdf-modal-status").show();
                
                applyDescriptionXMLData()
            });*/
            
            $openButton.click(function(event) {
                event.preventDefault();
                if (appdfEditor.importingFlag) {
                    return false;
                };
                $openUnfinishedButton.hide();
                appdfEditor.importingFlag = true;
                
                $("#load-appdf-modal-status").show();
                $("#load-appdf-modal-errors").hide();
                
                appdfXMLLoader.loadAppdfFile($file[0].files[0], function() {
                    $modal.modal('hide');
                    loadProgress(0, 100);
                    appdfEditor.importingFlag = false;
                }, function(errors) {
                    console.log("Import errors");
                    console.log(errors);
                    
                    $("#load-appdf-modal-status").hide();
                    loadProgress(0, 100);
                    
                    var $list = $("#load-appdf-modal-errors").find("ul");

                    //Then we clear all the previous errors from the error lost
                    $list.find("li").remove();

                    //Now we make sure the error list is visible and add all the errors there
                    $("#load-appdf-modal-errors").show();
                    for (var i=0; i<errors.length; i++) {
                        $list.append($("<li>").text(errors[i].msg));
                    };
                    appdfEditor.importingFlag = false;
                }, loadProgress, parseProgress);
                return false;
            });
        }
        
        $modal.modal("show");
    };
    
    var addStoreDialogInit = false;
    function showAddStoreDialog() {
        var $modal = $("#requirements-store-add-modal");
        var $addButton = $modal.find(".btn-primary");
        
        if (!addStoreDialogInit) {
            addStoreDialogInit = true;
            
            $modal.on("shown", function () {
                $("#storespecific-input-modal").val("");
                $("#storespecific-xml-default-modal").val("");
                $("#storespecific-input-modal").focus();
            }).on("hidden", function() {
                $("#storespecific-input-modal").val("");
                $("#storespecific-xml-default-modal").val("");
            });

            $addButton.click(function(event) {
                event.preventDefault();
                var storeLabel = $("#storespecific-input-modal").val();
                var storeSpecificXML = $("#storespecific-xml-default-modal").val();
                if (addMoreStoreSpecific($(".storespecific-addmore"), storeLabel, storeSpecificXML)) {
                    $modal.modal("hide");
                };
            });
        };
        
        $modal.modal("show");
    };
    
    var youTubeBrowseDialogInit = false;
    function showYouTubeBrowseDialog(e) {
        var $original = $(e).closest(".input-append").find("input");
        var $modal = $("#description-videos-youtubevideo-dialog");
        var $video = $modal.find("#description-videos-youtubevideo-dialog-video");
        var $input = $modal.find("#description-videos-youtubevideo-dialog-url");
        var $info = $modal.find("#description-videos-youtubevideo-dialog-info");
        var $okButton = $modal.find(".btn-primary");

        var videoId = "";

        function getVideoId() {
            var youtubeRegex = /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/user\/\S+|\/ytscreeningroom\?v=|\/sandalsResorts#\w\/\w\/.*\/))([^\/&]{10,12})/
            var youtubeRegex2 = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
            var matched = $input.val().match(youtubeRegex); 
            var matched2 = $input.val().match(youtubeRegex2);

            videoId = "";
            if (matched && matched.length>0) {
                videoId = matched[1];
            };
            if (!videoId && matched2 && matched2.length>0) {
                videoId = matched2[1];
            };
        };

        function init() {
            if ($original.val()) {
                videoId = $original.val();
                $input.val("http://www.youtube.com/watch?v=" + videoId);
                $video.attr("src" , "http://www.youtube.com/embed/" + videoId + "?rel=0");
                $video.show();
            } else {
                $info.text("Copy/pase YouTube video URL into the edit field and press the \"Check\" button to make sure that URL is correct.");
                $video.hide();
                $input.val("");
            };
        };

        if (!youTubeBrowseDialogInit){
            youTubeBrowseDialogInit = true;
            
            $modal.find(".description-videos-youtubevideo-dialog-check").click(function(event) {
                event.preventDefault();
                getVideoId();

                if (videoId) {
                    $info.text("YouTube ID = " + videoId);
                    $video.attr("src" , "http://www.youtube.com/embed/" + videoId + "?rel=0");
                    $video.show();
                } else {
                    $info.text("Error: unrecognized YouTube URL format");
                    $video.hide();
                };
            });

            $okButton.click(function(event) {
                event.preventDefault();
                getVideoId();
                if (videoId) {
                    $modal.modal('hide');
                    $original.val(videoId);
                };
            });

            $modal.on('shown', function () {
                $input.focus();
            });

            $modal.on('hidden', function () {
                //To stop playing video in background after the modal dialog is closed
                $video.attr("src" , "");
            });
        }
        
        init();
        $modal.modal("show");
    };

    function fillLanguages() {
        var $langs = $("#add-localization-modal-language");
        $langs.empty();
        for (var code in dataLanguages) {
            if (code.toLowerCase() !== "en_us") {
                $langs.append($("<option />").val(code).text(dataLanguages[code]));
            };
        };
        $langs.val("en");
    };

    function fillScreenResolutions() {
        var $div = $("div[id^=\"requirements-supportedresolutions\"]");
		$div.empty();
        for (var resolution in dataScreenResolutions) {
            var $resolutionElement = $('<label class="checkbox"><input type="checkbox" id="requirements-supportedresolutions-' + resolution + '">' + dataScreenResolutions[resolution] + '</label>');
            $div.append($resolutionElement);
        };
    };
    
    function fillSupportedCountries() {
        var $div = $("div[id^=\"availability-supportedcountries-\"]");
        
		$div.empty();
        $div.append("\
            <div>\
                <button class=\"btn availability-supportedcountries-selectall\">Select all</button>\
                &nbsp;&nbsp;&nbsp;\
                <button class=\"btn availability-supportedcountries-unselectall\">Unselect all</button>\
            </div>\
        ");
        
        var countryCodes = [];
        for (countryCode in dataCountries) {
            countryCodes.push(countryCode);
        };
        
        var $row;
        $.each($div, function() {
            for (var i=0; i<countryCodes.length; i++) {
                if (i%3 === 0) {
                    $row = $("<div class='row'>");
                    $(this).append($row);
                };
                $row.append($(' \
                    <div class="span4"> \
                        <label class="checkbox"> \
                            <input type="checkbox" value="" id="availability-supportedcountries-' + countryCodes[i] + '"> \
                            ' + dataCountries[countryCodes[i]] + ' \
                        </label> \
                    </div>')
                );
            };
        });
    };
    
    function fillCategories() {
		var selectedType = $("#categorization-type").find(":selected").val();
		var $categories = $("#categorization-category");
		var categoryHash = dataCategories[selectedType];
		$categories.empty();
		for (var k in categoryHash) {
			$categories.append($("<option />").val(k).text(k));
		}
	};

	function fillSubcategories() {
		var selectedType = $("#categorization-type").find(":selected").val();
		var selectedCategory = $("#categorization-category").find(":selected").val();
		var $subcategories = $("#categorization-subcategory");
		var subcategoryArray = dataCategories[selectedType][selectedCategory];
		$subcategories.empty();
		for (var i=0; i<subcategoryArray.length; i++) {
			var s = subcategoryArray[i];
			$subcategories.append($("<option />").val(s).text(s));
		}
		if (subcategoryArray.length<=1) {
			$subcategories.closest(".control-group").hide();    
		} else {
			$subcategories.closest(".control-group").show();            
		}
	};

    function fillCategoryStoresInfo() {
        var $table = $("<table class='table table-striped table-bordered'/>");
        $table.append($("<tr><th>Store</th><th>Category</th></tr>"));

        var selectedType = $("#categorization-type").find(":selected").val();
        var selectedCategory = $("#categorization-category").find(":selected").val();
        var selectedSubcategory = $("#categorization-subcategory").find(":selected").val();

        var storeInfo = dataStoreCategories[selectedType][selectedCategory][selectedSubcategory];

        for (store in storeInfo) {
            $table.append($("<tr><td>" + dataStores[store] + "</td><td>" + storeInfo[store] + "</td></tr>"));
        }

        $("#store-categories-info").empty();
        $("#store-categories-info").append($table);
    };

    function addClickHandlers() {
        $('body').on('click', '.description-texts-keywords-addmore', function(e) {
            addMoreKeywords(e.target, "");
            return false;
        });

        $('body').on('click', '.requirements-supporteddevices-addmore', function(e) {
            var $input = $(e.target).closest(".input-append").find("input");
            if ($input.val() !== "") {
                if (addMoreUnsupportedDevices(e.target, $input.val())) {
					$input.val("");
				}
            };
            $input.focus();
            return false;
        });

        $('body').on('click', '.storespecific-addmore', function(e) {
            showAddStoreDialog();
            return false;
        });

        $('body').on('click', '.price-localprice-add', function(e) {
            addMoreLocalPrice(e.target, "", "");
            return false;
        });

        $('body').on('click', '.description-texts-keywords-remove', function(e) {
            $(e.target).closest(".input-container").remove();
            return false;
        });

        $('body').on('click', '.requirements-supporteddevices-remove', function(e) {
            $(e.target).closest(".input-container").remove();
            return false;
        });

        $('body').on('click', '.control-group-remove', function(e) {
            $(e.target).closest(".control-group").remove();
            return false;
        });

        $('body').on('click', '.control-remove', function(e) {
            $(e.target).closest(".controls").remove();
            return false;
        });

        $('body').on('click', '.apk-file-addmore', function(e) {
            addApkFile(e.target);
            return false;
        });

        $('body').on('click', '.video-file-addmore', function(e) {
            addVideoFile(e.target);
            return false;
        });

        $('body').on('click', '.show-import-description-xml', function(event) {
            showImportDescriptionXMLDialog();
            return false;
        });

        $('body').on('click', '.load-appdf-file', function(event) {
            showLoadAppdfDialog();
            return false;
        });

        $('body').on('click', '.description-videos-youtubevideo-browse', function(event) {
            showYouTubeBrowseDialog(event.target);
            return false;
        });

        $('body').on('click', '.apkfile-pretty-browse, .video-pretty-browse', function(event) {
            $(event.target).closest(".controls").children("input[type=\"file\"]").click();
            return false;
        });

        $('body').on('click', '.description-texts-title-addmore', function(event) {
            addMoreTitles(event.target, "");
            return false;
        });

        $('body').on('click', '.description-texts-shortdescription-addmore', function(event) {
            addMoreShortDescriptions(event.target, "");
            return false;
        });

        $('#requirements-supportedlanguages-type-custom').click(function(event) {
            $("#requirements-supportedlanguages").show();
        });
        $('#requirements-supportedlanguages-type-default').click(function(event) {
            $("#requirements-supportedlanguages").hide();
        });
        $('body').on('click', '.requirements-supportedlanguages-selectall', function(event) {
            $("#requirements-supportedlanguages input[type=\"checkbox\"]").attr("checked", "checked");
            return false;
        });
        $('body').on('click', '.requirements-supportedlanguages-unselectall', function(event) {
            $("#requirements-supportedlanguages input[type=\"checkbox\"]").removeAttr("checked");
            return false;
        });
		
        $('#requirements-supportedresolutions-type-include').click(function(event) {
            $("#requirements-supportedresolutions-include").show();
			$("#requirements-supportedresolutions-exclude").hide();
        });
		$('#requirements-supportedresolutions-type-exclude').click(function(event) {
			$("#requirements-supportedresolutions-include").hide();
            $("#requirements-supportedresolutions-exclude").show();
        });
		$('#requirements-supportedresolutions-type-default').click(function(event) {
			$("#requirements-supportedresolutions-include").hide();
			$("#requirements-supportedresolutions-exclude").hide();
		});

        $("#availability-supportedcountries-type-default").click(function(event) {
            $("#availability-supportedcountries-include").hide();
            $("#availability-supportedcountries-exclude").hide();
        });
        $("#availability-supportedcountries-type-include").click(function(event) {
            $("#availability-supportedcountries-include").show();
            $("#availability-supportedcountries-exclude").hide();
        });
        $("#availability-supportedcountries-type-exclude").click(function(event) {
            $("#availability-supportedcountries-include").hide();
            $("#availability-supportedcountries-exclude").show();
        });
         $('body').on('click', '.availability-supportedcountries-selectall', function(event) {
            $(event.target).closest("div[id^=\"availability-supportedcountries\"]").find("input[type=\"checkbox\"]").attr("checked", "checked");
            return false;
        });
        $('body').on('click', '.availability-supportedcountries-unselectall', function(event) {
            $(event.target).closest("div[id^=\"availability-supportedcountries\"]").find("input[type=\"checkbox\"]").removeAttr("checked");
            return false;
        });
        $('body').on("click", ".clear-datepicker", function(event) {
            $(event.target).closest("tr").find("input").val("");
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
        
        $("#build-appdf-file").click(function(event) {
            return buildAppdDFFile(event);
        });

        $("#build-unfinished-appdf-file").click(function(event) {
            startBuildingFile(true);
            return false;
        });

        $("#price-free-trialversion").change(function() {
            var trialVersion = $("#price-free-trialversion").attr("checked");
            if (trialVersion === "checked") {
                $("#price-free-fullversion").removeAttr('disabled');
            } else {
                $("#price-free-fullversion").attr('disabled', 'disabled');
            };
        });
        
        $("body").on("click", ".large-promo-image-reset", function(event) {
            appdfImages.addLargePromo(event.target);
            return false;
        });
        $("body").on("click", ".small-promo-image-reset", function(event) {
            appdfImages.addSmallPromo(event.target);
            return false;
        });
    };

    function addDatePicker() {
        var nowTemp = new Date();
        var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
        
        var perionSince = $("input[class=\"availability-period-since\"]").datepicker({
            onRender: function(date) {
                return date.valueOf() < now.valueOf() ? "disabled" : "";
            }
        }).on("changeDate", function(ev) {
            if (ev.date.valueOf() > perionUntil.date.valueOf()) {
                var newDate = new Date(ev.date)
                newDate.setDate(newDate.getDate() + 1);
                perionUntil.setValue(newDate);
                $("input[class=\"availability-period-until\"]").val("");
            };
            perionSince.hide();
        }).data("datepicker");
        
        var perionUntil = $("input[class=\"availability-period-until\"]").datepicker({
            onRender: function(date) {
                return date.valueOf() <= perionSince.date.valueOf() ? "disabled" : "";
            }
        }).on("changeDate", function(ev) {
            perionUntil.hide();
        }).data("datepicker");
    };
    
    function fillSupportedLanguages() {
        var $div = $("#requirements-supportedlanguages");
		$div.empty();
		
        $div.append("\
            <div>\
                <button class=\"btn requirements-supportedlanguages-selectall\">Select all</button>\
                &nbsp;&nbsp;&nbsp;\
                <button class=\"btn requirements-supportedlanguages-unselectall\">Unselect all</button>\
            </div>\
        ");
        
        var langCodes = [];
        for (var code in dataLanguages) {
            langCodes.push(code);
        };
        var $row;
        for (var i=0; i<langCodes.length; i++) {
            if (i%3 === 0) {
                $row = $("<div class='row'>");
                $div.append($row);
            };
            $row.append($(' \
                <div class="span4"> \
                    <label class="checkbox"> \
                        <input type="checkbox" value="" id="requirements-supportedlanguages-' + langCodes[i] + '"> \
                        ' + dataLanguages[langCodes[i]] + ' \
                    </label> \
                </div>')
            );
        };
    };

    function fillStores() {
        $input = $("#storespecific-input, #storespecific-input-modal");
        var storeCodes = [];
        for (store in dataStores) {
            storeCodes.push(store);
        };
        $input.typeahead({source: storeCodes});
    };

    function fillDeviceModels() {
        $input = $("#requirements-supporteddevices-input");
        var deviceModels = [];
        for (model in dataDeviceModels) {
            deviceModels.push(model + " (" + dataDeviceModels[model]["manufacture"] + "," + dataDeviceModels[model]["resolution"] + ")");
        };
        $input.typeahead({
            "source" : deviceModels,
            "updater" : function(item) {
                var deviceModelRegEx = /([^\(]*)\s\([.]*/i;
                var matched = item.match(deviceModelRegEx); 
                
                if (matched && matched.length>0) {
                    return matched[1];
                } else {
                    return item;
                };
            }
        });
    };
	
	function validationCallbackPromo($el, value, callback) {
		if (isNoFile($el[0])) {
			callback({
				value: value,
				valid: true
			});
			return;
		};
		
		var promoName = $($el).attr("name").split("-")[2];
		var imageFileName = getFileName($el[0]);
		var file = getFileContent($el[0]);
		var URL = window.webkitURL || window.mozURL || window.URL;    
		var imgUrl = URL.createObjectURL(file);
		
		appdfImages.checkTransparency(imgUrl, function(width, height, result) {
            result.value = value;
			if (((promoName==="smallpromo" && width===180 && height===120) || (promoName==="largepromo" && width===1024 && height===500)) && result.valid) {
				$el.data("width", width).data("height", height);
				callback({
					value: value,
					valid: true
				});
			} else if (result.valid) {
				callback({
					value: value,
					valid: false,
					message: promoName==="smallpromo"?errorMessages.smallPromoWrongSize:errorMessages.largePromoWrongSize 
				});
			} else {
                callback(result);
            };
		});
	};
	
	function validationCallbackScreenshotRequired($el, value, callback) {
		if (isNoFile($el[0])) {
			callback({
				value: value,
				valid: true
				//message: errorMessages.screenshotRequired
			});
			return;
		};
		var imageFileName = getFileName($el[0]);
		var file = getFileContent($el[0]);
        if (typeof file==="undefined") {
            callback({
                value: value,
                valid: false,
                message: errorMessages.fnResourceNotFound(imageFileName)
            });
            return false;
        };
        
		var URL = window.webkitURL || window.mozURL || window.URL;    
		var imgUrl = URL.createObjectURL(file);
		
		appdfImages.checkTransparency(imgUrl, function(width, height,result) {
            result.value = value;
			if (((width===480 && height===800) || (width===1080 && height===1920) || (width===1920 && height===1200)) && result.valid) {
				callback({
					value: value,
					valid: true
				});
			} else if (result.valid) {
				callback({
					value: value,
					valid: false,
					message: errorMessages.screenshowWrongSize
				});
			} else {
                callback(result);
            };
		});
	};

	function validationCallbackRequirementDevice($el, value, callback) {
		if ($('#section-requirements input[name="unsupport-device-name-' + value + '"]').length) {
			callback({
				value: value,
				valid: false,
				message: errorMessages.deviceAlreadyExist
			});
		} else {
			callback({
				value: value,
				valid: true
			});
		}
	};
    
	function validationCallbackAppIconFirst($el, value, callback) {
        validationCallbackAppIcon($el, value, callback, true);
    };
	function validationCallbackAppIconMore($el, value, callback) {
        validationCallbackAppIcon($el, value, callback, false);
    };
    
	function validationCallbackAppIcon($el, value, callback, first) {
		if (first && isNoFile($el[0])) {
			callback({
				value: value,
				valid: false,
				message: errorMessages.appIconRequired
			});
			return false;
		};
        
		var imageFileName = getFileName($el[0]);
		var file = getFileContent($el[0]);
        if (typeof file==="undefined") {
            callback({
                value: value,
                valid: false,
                message: errorMessages.fnResourceNotFound(imageFileName)
            });
            return false;
        };
        
		var URL = window.webkitURL || window.mozURL || window.URL;    
		var imgUrl = URL.createObjectURL(file);
        if (isOnlyDataImage($el[0])) {
            $($el[0]).removeClass("empty-image");
            $($el[0]).next().attr("src", imgUrl);
        };
        
		appdfImages.getImgSize(imgUrl, function(width, height) {
			if ((first && width===512 && height===512)||(!first && width===height)) {
				callback({
					value: value,
					valid: true
				});
			} else {
				callback({
					value: value,
					valid: false,
					message: first?errorMessages.appIconSize512:errorMessages.appIconSizeSquare
				});
			};
		});
	};
	
	function validationCallbackApkFile($el, value, callback, first) {
        var apkFileName = getFileName($el[0]);
        $el.closest(".controls").find("input:text").val(apkFileName);

		if (first && isNoFile($el[0])) {
			callback({
				value: value,
				valid: false,
				message: errorMessages.APKfileRequired
			});
			return;
		};
		
		var file = getFileContent($el[0]);
        if (typeof file==="undefined") {
            callback({
                value: value,
                valid: false,
                message: errorMessages.fnResourceNotFound(apkFileName)
            });
            return false;
        };
        
		if (file.size>MAXIMUM_APK_FILE_SIZE) {
			callback({
				value: value,
				valid: false,
				message: errorMessages.APKfileSize50M
			});
			return;
		};

		apkParser.parseApkFile(file, apkFileName, function(apkData) {
			fillApkFileInfo($el, apkData);
			var data = {
				value: value,
				valid: true
			};
            
			if (first) {
				appdfEditor.firstApkFileData = firstApkFileData = apkData;
			} else {
				if (firstApkFileData.package!=apkData.package) {
					data.valid = false;
					data.message = errorMessages.APKfileWrongPackageName;
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
					//TODO handle carefully that we set it only if page is empty
					//appdfXMLLoader.loadDescriptionXML(descriptionXML, function(){}, function(error){});
				};
			};
			callback(data);
		}, true);
	};
	
	function validationCallbackApkFileMore($el, value, callback) {
		validationCallbackApkFile($el, value, callback, false);
	};

	function validationCallbackStoreSpecify($el, value, callback) {
		var regExp = /^[^\s][a-z]*$/;
		if ($('#section-store-specific input[name="storespecific-name-' + value + '"]').length) {
			callback({
				value: value,
				valid: false,
				message: errorMessages.storeExist
			});
		} else if (value && !regExp.test(value)) {
			callback({
				value: value,
				valid: false,
				message: errorMessages.applicationNameWrong
			});
		} else {
			callback({
				value: value,
				valid: true
			});
		};
	};
	
    function validationCallbackYoutube($el, value, callback) {
        var regExp = /^[0-9a-zA-Z\-\_]{11}$/;
		if (value && !regExp.test(value)) {
			callback({
				value: value,
				valid: false,
				message: errorMessages.wrongYoutubeFormat
			});
		} else {
			callback({
				value: value,
				valid: true
			});
		};
    };
    
    function validationCallbackVideoFile($el, value, callback) {
        var videoFileName = getFileName($el[0]);
        $el.closest(".controls").removeClass("empty-video");
        $el.closest(".controls").find("input[id^=\"pretty-video-file\"]").val(videoFileName);
        
        callback({
            value: value,
            valid: true
        });
    };
    
    function removeControlGroup(e) {
        $(e).closest(".control-group").remove();
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
    
    function validateProgress(current, total) {
        var $bar = $("#build-appdf-progressbar");
        onProgress(current, total, $bar, "Validating: ");
    };
    
    function checkProgress(current, total) {
        var $bar = $("#build-appdf-progressbar");
        onProgress(current, total, $bar, "Checking: ");
    };
    
    function buildProgress(current, total) {
        var $bar = $("#build-appdf-progressbar");
        onProgress(current, total, $bar, "Building: ");
    };
    
    function importProgress(current, total) {
        var $bar = $("#load-descriptionxml-modal-progressbar");
        onProgress(current, total, $bar, "Importing: ");
    };
    
    function loadProgress(current, total) {
        var $bar = $("#load-appdf-modal-progressbar");
        onProgress(current, total, $bar, "Loading: ");
    };
    
    function parseProgress(current, total) {
        var $bar = $("#load-appdf-modal-progressbar");
        onProgress(current, total, $bar, "Parsing: ");
    };
    
    function onProgress(current, total, $bar, label) {
        var percentage = "" + Math.round(100.0 * current / total) + "%";
        $bar.css("width", percentage);
        $bar.text(label + percentage);
    };
    
    function initFilling() {
        fillLanguages();    
        fillCategories();
        fillSubcategories();
        fillCategoryStoresInfo();
        fillSupportedLanguages();
        fillScreenResolutions();
        fillSupportedCountries();
        fillStores();
        fillDeviceModels();
    };
    
    function isCanvasSupported(){
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };
    
    function checkInit() {
        var errors = [];
        var supportFlag = false;
        var regExp = /^[0-9]+/;
        var version = regExp.exec($.browser.version)[0];
        
        var supportBrowserData = [
            {browser: "mozilla", version: 15},
            {browser: "chrome", version: 19}
        ];
        
        $.each(supportBrowserData, function(i, val) {
            if ($.browser[val.browser] && version>=val.version && isCanvasSupported() && window.FileReader) {
                supportFlag = true;
            };
        });
        
        if (!supportFlag) {
            $("#not-yet-supported-modal").modal("show");
        } else {
            $("#not-yet-supported-modal").remove();
        };
    };


    function buildAppdDFFile(event) {
        //First we check if there is already built file, if so we return to a standard download handler
        $("#build-unfinished-appdf-file").hide();
        
        var downloadLink = document.getElementById("build-appdf-file");
        if (downloadLink.download) {
            return true;
        };
        
        if ($("#build-appdf-file[init]").size()) {
            return false;
        };
        $("#build-appdf-file").attr("init", true);
        
        //If not we start the checking and building process.
        //First we collect all the errors and check if there are any
        collectBuildErrors(startBuildingFile, showValidationErrors);

        return false;
    };

    function startBuildingFile(errorsExist){
        //If there are not errors, we hide the error block and show the progress block
        if (!errorsExist) {
            $("#form-errors").hide();
        } else {
            $("#build-appdf-file").attr("init", true);
        };
        
        buildProgress(0, 100);
        $("#build-appdf-progressbarr").css("width", "0%");
        $("#build-appdf-status").show();
        
        generateAppDFFile(function(url, data) {
            //TODO store file
            
            if (firstApkFileData) {
                fileName = firstApkFileData["package"] + ".appdf";
            } else {
                fileName = "untitled.appdf";
            };
            console.log("fileName: " + fileName);
            console.log("appdfEditor.fileName: " + appdfEditor.fileName);
            fileData = data;
            
            var clickEvent = document.createEvent("MouseEvents");
            var downloadLink = document.getElementById("build-appdf-file");
            downloadLink.href = url;
            downloadLink.download = fileName;
            clickEvent.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            downloadLink.dispatchEvent(clickEvent);
            $("#build-appdf-status").hide();
            setTimeout(clearBuildedAppdfFile, 1);
        });
    };
        
    function collectBuildErrors(onsuccess, onerror) {
        var totalErrorCheckCount = 0; //TOTAL check for error blocks;
        var currentErrorCheckCount = 0;
        var errors = $("input,select,textarea").jqBootstrapValidation("collectErrors");
        var validErrors = true;
        
        var errorArray = [];
        checkProgress(0, 100);
        $("#build-appdf-status").show();
        
        for (field in errors) {
            if (name!=undefined) {
                var fieldErrors = errors[field];
                var errorValidation = false;
                for (var i=0; i<fieldErrors.length; i++) {
                    var error = fieldErrors[i];
                    if (error.indexOf("required") != -1) {
                        errorValidation = true;
                    };
                    if (errorArray.indexOf(error) === -1) {
                        errorArray.push(error);
                    };
                };
                validErrors = validErrors && errorValidation;
            };
        };
        
        function checkBuildErrorsCount() {
            checkProgress(currentErrorCheckCount + 0, totalErrorCheckCount);
            if (currentErrorCheckCount === totalErrorCheckCount) {
                if (errorArray.length) {
                    onerror(errorArray, validErrors, onsuccess);
                } else {
                    $("#build-appdf-status").hide();
                    onsuccess(false);
                };
            };
            currentErrorCheckCount++;
        };
        
        function checkErrorMessage(data) {
            if (!data.valid) {
                if (validErrors && data.message.indexOf("required") != -1) {
                    validErrors = true;
                } else {
                    validErrors = false;
                };
                
                if (errorArray.indexOf(data.message) === -1) {
                    errorArray.push(data.message);
                };
            };
            checkBuildErrorsCount();
        };
        
        totalErrorCheckCount++;
        appdfEditor.validationCallbackApkFileFirst($("#apk-file"), 
            appdfEditor.getFileName($("#apk-file")), checkErrorMessage);
        
        /*var $apkFilesList = $("input.hidden-apk-file").not("[id=\"apk-file\"]");
        totalErrorCheckCount += $apkFilesList.size();
        $apkFilesList.each(function() {
            appdfEditor.validationCallbackApkFileMore($(this), appdfEditor.getFileName($(this)), checkErrorMessage);
        });*/
        
        totalErrorCheckCount++;
        appdfEditor.validationCallbackAppIconFirst($("#description-images-appicon"), 
            appdfEditor.getFileName($("#description-images-appicon")), checkErrorMessage);
        
        totalErrorCheckCount++;
        appdfEditor.validationCallbackPromo($("#description-images-smallpromo"), 
            appdfEditor.getFileName($("#description-images-smallpromo")), checkErrorMessage);
        
        totalErrorCheckCount++;
        appdfEditor.validationCallbackPromo($("#description-images-largepromo"), 
            appdfEditor.getFileName($("#description-images-largepromo")), checkErrorMessage);
        
        var $screenShotList = $('.screenshot-input');
        totalErrorCheckCount += $screenShotList.size();//add screenshots count to total error checks
        $screenShotList.each(function() {
            appdfEditor.validationCallbackScreenshotRequired($(this), $(this).val(), checkErrorMessage);
        });
        
        totalErrorCheckCount++;
        defaultScreenshotCount = $("#localization-tab-default .screenshots-group .image-input-group.not-empty-group").size();
        if (defaultScreenshotCount < 4) {
            checkErrorMessage({
                valid: false,
                value: "",
                message: errorMessages.screenshotLeastCount
            });
        } else {
            checkErrorMessage({valid: true});
        };
        
        var $videoFileList = $(".controls.video-file-control").not(".empty-video");
        totalErrorCheckCount += $videoFileList.size();
        $videoFileList.each(function() {
            appdfEditor.validationCallbackVideoFile($(this).find("input.hidden-video-file"), appdfEditor.getFileName($(this).find("input.hidden-video-file")), checkErrorMessage);
        });
        
        //privacy policy validation
        var $privacyPolicyArr = $("input[id^=\"description-texts-privacypolicy-link\"]");
        totalErrorCheckCount += $privacyPolicyArr.size();
        $privacyPolicyArr.each(function() {
            var linkValue = $(this).val();
            var fullTextValue = $(this).next().next().val();
            if ((linkValue!=="" && fullTextValue==="") || (linkValue==="" && fullTextValue!=="")) {
                checkErrorMessage({
                    valid: false,
                    value: "",
                    message: errorMessages.privacypolicyNotBothFilled
                });
            } else {
                checkErrorMessage({valid: true});
            };
        });
        
        //eula validation
        var $eulaArr = $("input[id^=\"description-texts-eula-link\"]");
        totalErrorCheckCount += $eulaArr.size();
        $eulaArr.each(function() {
            var linkValue = $(this).val();
            var fullTextValue = $(this).next().next().val();
            if ((linkValue!=="" && fullTextValue==="") || (linkValue==="" && fullTextValue!=="")) {
                checkErrorMessage({
                    valid: false,
                    value: "",
                    message: errorMessages.eulaNotBothFilled
                });
            } else {
                checkErrorMessage({valid: true});
            };
        });
        
        //validate store specify
        var $storeSpecific = $("#section-store-specific input[name^='storespecific-name-']");
        totalErrorCheckCount += $storeSpecific.size();
        var storeSpecificID, storeSpecificContent, invalidXmlFlag, errorMessage;
        $storeSpecific.each(function() {
            storeSpecificID = $(this).val();
            storeSpecificContent = $(this).next().val();
            try {
                $.parseXML("<a>" + storeSpecificContent + "</a>");
                invalidXmlFlag = false;
            } catch (e) {
                invalidXmlFlag = true;
                errorMessage = errorMessages.fnStoreSpecificXMLError(storeSpecificID);
            };
            
            if (invalidXmlFlag && errorArray.indexOf(errorMessage) === -1) {
                checkErrorMessage({
                    valid: false,
                    value: "",
                    message: errorMessage
                });
            } else {
                checkErrorMessage({valid: true});
            };
        });
        
        
        var fileNames = [];
        function addInputFiles($el) {
            $el.each(function() {
                //check if the file is already in the list then do not push it
                var fileName = appdfEditor.getFileName($(this)[0]);
                if (!appdfEditor.isNoFile($(this)[0]) && fileNames.indexOf(fileName)===-1) {
                    fileNames.push(fileName);
                } else if (fileName) {
                    totalErrorCheckCount++;
                    checkErrorMessage({
                        valid: false,
                        value: fileName,
                        message: errorMessages.fnDublikateRes(fileName)
                    });
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
        
        //videofiles
        addInputFiles($("input[class*=hidden-video-file]"));
        
        checkBuildErrorsCount();
    };
    
    function generateAppDFFile(onend) {
        console.log("generateAppDFFile");
        
        var descriptionXML = appdfXMLSaver.generateDescriptionFileXML(); 
        console.log(descriptionXML);
        console.log(firstApkFileData);
        localStorage.setItem(firstApkFileData.package, descriptionXML);

        var URL = window.webkitURL || window.mozURL || window.URL;

        var files = [];
        var fileNames = [];
        function addInputFiles($el) {
            $el.each(function() {
                //check if the file is already in the list then do not push it
                if (!appdfEditor.isNoFile($(this)[0]) && fileNames.indexOf(appdfEditor.getFileName($(this)[0]))===-1) {
                    files.push(appdfEditor.getFileContent($(this)[0]));
                    fileNames.push(appdfEditor.getFileName($(this)[0]));
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
        
        //videofiles
        addInputFiles($("input[class*=hidden-video-file]"));
        
        zip.createWriter(new zip.BlobWriter(), function(writer) {
            addDescriptionAndFilesToZipWriter(writer, descriptionXML, files, buildProgress, function() {
                writer.close(function(blob) {
                    var url = URL.createObjectURL(blob);
                    onend(url, blob);
                });
            });
        }, function(error) {
            alert("error:" + error);
        });
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
        //console.log("Description.xml");
        //console.log(descriptionXml);
        var addIndex = 0;

        var flattenedFiles = flatten(files);
        var totalSizeOfAllFiles = 0;
        $.each(flattenedFiles, function() { 
            totalSizeOfAllFiles += this.size;
        });

        var sizeOfAlreadyZippedFilesIncludingCurrent = 0;

        function addNextFile() {
            if (addIndex===flattenedFiles.length) {
                onend();
                return;
            };
            
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
    
    function showValidationErrors(errors, validError) {
        var $validateList = $("input[required],input[data-validation-callback-callback],select[required],select[data-validation-callback-callback],textarea[required],textarea[data-validation-callback-callback]");
        //$("input,select,textarea");
        var currentErrorCount = 0;
        totalErrorCount = $validateList.size();
        
        //$("input,select,textarea").trigger("submit.validation").trigger("validationLostFocus.validation");
        $validateList.each( function() {
            var $this = $(this);
            setTimeout(function() {
                currentErrorCount++;
                validateProgress(currentErrorCount, totalErrorCount);
                $this.trigger("submit.validation").trigger("validationLostFocus.validation");
                if (currentErrorCount===totalErrorCount) {
                    showBuildErrors(errors, validError);
                };
            }, 5);
        });
    };
    
    function showBuildErrors(errors, validError) {
        $("#build-appdf-status").hide();
        validateProgress(0, 100);
        $("#build-appdf-file").removeAttr("init");
        
        var $list = $("#form-errors").find("ul");

        //Then we clear all the previous errors from the error lost
        $list.find("li").remove();

        //Now we make sure the error list is visible and add all the errors there
        $("#form-errors").show();
        for (var i=0; i<errors.length; i++) {
            $list.append($("<li>"+errors[i]+"</li>"))
        };
        
        if (validError) {
            //show button to build unfinished file
            $("#build-unfinished-appdf-file").show();
        };
    };   
    
    function clearBuildedAppdfFile() {
        $("#build-appdf-file").removeAttr("init");
        var downloadLink = document.getElementById("build-appdf-file");
        downloadLink.download = null;
    };
    
    function reinitEditor() {
        //remove all warnings
        //$("input,select,textarea").trigger("clear.validation");
        $("input[required],input[data-validation-callback-callback],select[required],select[data-validation-callback-callback],textarea[required],textarea[data-validation-callback-callback]").trigger("clear.validation");
        
        //remove erros messages
        $("#form-errors").hide();
        
        //apk
        $("#section-apk-files .control-group-remove").click();
        //reset first
        $("#pretty-apk-file").val("");
        
        //category
        
        
        //description
        //remove localisations
        appdfLocalization.removeAllLocalizations();
        
        //clear appicons
        $(".image-input-remove").click();
        appdfImages.resetFirstAppIcon();
        
        //clear screenshots
        $(".screenshots-group a.image-input-remove").click();
        
        //reset promo
        $(".large-promo-image-reset").click();
        $(".small-promo-image-reset").click();
        //youtube
        $("#description-videos-youtubevideo").val("");
        //video
        $(".control-remove").click();
        
        
        //price
        $("input[id^=price-localprice-]").closest(".control-group").remove();
        $("#price-free-fullversion").val("");
        $("#price-baseprice").val("0");
        
        //customer support
        $("#customersupport-phone").val("");
        $("#customersupport-email").val("");
        $("#customersupport-website").val("");
        
        //consent
        $("#consent-googleandroidcontentguidelines").removeAttr("checked");
        $("#consent-usexportlaws").removeAttr("checked");
        $("#consent-importexportlaws").removeAttr("checked");
        $("#consent-slidemeagreement").removeAttr("checked");
        $("#consent-freefromthirdpartycopytightedcontent").removeAttr("checked");
        
        //content rating and descriptors
        $("#contentdescription-contentrating").val("3");
        var scd = "#contentdescription-contentdescriptors-";
        $(scd + "cartoonviolence").val("no");
        $(scd + "realisticviolence").val("no");
        $(scd + "badlanguage").val("no");
        $(scd + "fear").val("no");
        $(scd + "sexualcontent").val("no");
        $(scd + "drugs").val("no");
        $(scd + "gamblingreference").val("no");
        $(scd + "alcohol").val("no");
        $(scd + "smoking").val("no");
        $(scd + "discrimination").val("no");
        
        var sia = "#contentdescription-includedactivities-";
        $(sia + "inappbilling").removeAttr("checked");
        $(sia + "gambling").removeAttr("checked");
        $(sia + "advertising").removeAttr("checked");
        $(sia + "usergeneratedcontent").removeAttr("checked");
        $(sia + "usertousercommunications").removeAttr("checked");
        $(sia + "accountcreation").removeAttr("checked");
        $(sia + "personalinformationcollection").removeAttr("checked");
        
        var src = "#contentdescription-ratingcertificates-rating-";
        $(src + "pegi").val("");
        $(src + "esrb").val("");
        $(src + "gbr").val("");
        $(src + "cero").val("");
        $(src + "dejus").val("");
        $(src + "fsk").val("");
        
        //reset hidden file input data
        $(".file-input-group").each(function() {
            var html = $(this).html();
            $(this).empty();
            $(this).html(html);
        });
        $(".pretty-file-input").val("");
        
        
        //availability
        $(".availability-supportedcountries-unselectall").click();
        
        //requirements
        $("#requirements-features-root").removeAttr("checked");
        $("#requirements-features-gms").removeAttr("checked");
        $("#requirements-features-online").removeAttr("checked");
        //clear supported languages list
        $("#requirements-supportedlanguages-type-default").click();
        $(".requirements-supportedlanguages-unselectall").click();
        fillSupportedLanguages();
        //clear supported devices
        $("#requirements-supporteddevices-input").val("");
        $(".requirements-supporteddevices-remove").click();
        //clear supported resolutions list
        $("#requirements-supportedresolutions-type-default").click();
        fillScreenResolutions();
        
        //testing instructions
        $("#testinginstructions").val("");
        
        //store specific
        $('#section-store-specific .store-specific').remove();
    };
    
    function downloadifyInit() {
        Downloadify.create('downloadify',{
            filename: function(){
                return appdfEditor.fileName;
            },
            data: function(){ 
                return appdfEditor.fileData;
            },
            onComplete: function(){ alert('Your File Has Been Saved!'); },
            onCancel: function(){ alert('You have cancelled the saving of this file.'); },
            onError: function(){ alert('You must put something in the File Contents or there will be nothing to save!'); },
            swf: 'media/downloadify.swf',
            downloadImage: 'img/download.png',
            width: 100,
            height: 30,
            transparent: true,
            append: false
        });
    };
    
    function init() {
        checkInit();
        initRatingCertificate();
        initMenuStickToTop();
        initScrollspy();
        initFilling();
        addClickHandlers();
        addDatePicker();
        downloadifyInit();
    };

    return {
        firstApkFileData : firstApkFileData,
        
        init : init,
        reinitEditor : reinitEditor,
        addApkFile : addApkFile,
        addVideoFile : addVideoFile,
        addMoreKeywords : addMoreKeywords,
        addMoreLocalPrice : addMoreLocalPrice,
        addMoreTitles : addMoreTitles,
        addMoreShortDescriptions : addMoreShortDescriptions,
		addMoreStoreSpecific: addMoreStoreSpecific,
		addMoreUnsupportedDevices: addMoreUnsupportedDevices,
        normalizeInputFileName : normalizeInputFileName,
        getFileName : getFileName,
        getFileContent : getFileContent,
        isNoFile : isNoFile,
        fillCategories : fillCategories,
        fillSubcategories : fillSubcategories,
        fillCategoryStoresInfo : fillCategoryStoresInfo,
        fillSupportedCountries : fillSupportedCountries,
		validationCallbackAppIconFirst : validationCallbackAppIconFirst,
        validationCallbackAppIconMore : validationCallbackAppIconMore,
		validationCallbackApkFileFirst : validationCallbackApkFileFirst,
		validationCallbackApkFileMore : validationCallbackApkFileMore,
		validationCallbackPromo : validationCallbackPromo,
		validationCallbackScreenshotRequired : validationCallbackScreenshotRequired,
		validationCallbackRequirementDevice : validationCallbackRequirementDevice,
		validationCallbackStoreSpecify : validationCallbackStoreSpecify,
        validationCallbackYoutube : validationCallbackYoutube,
        validationCallbackVideoFile : validationCallbackVideoFile,
        addValidationToElements : addValidationToElements,
        getUniqueId : getUniqueId,
        parseProgress : parseProgress
    };
})();

$(function() {
    $("#no-js-modal").remove();
    appdfEditor.init();
});

$(document).ready(function() {
    zip.workerScriptsPath = "js/zip/";

    appdfEditor.addValidationToElements($("input,textarea,select"));
});

