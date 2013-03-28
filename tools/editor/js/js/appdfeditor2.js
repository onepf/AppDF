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
                    data-validation-required-message="Keyword cannot be empty. Remove keyword input if you do not need it." \
                    > \
                    <button class="btn description-texts-keywords-remove"><i class="icon-remove"></i></button> \
                </div> \
            </div> \
        ');
        $parent.find("p.help-block").before($controlGroup);
//        $controlGroup.find("input").focus();
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
        $parent.find("p.help-block").before($controlGroup);
        //$controlGroup.find("input").focus();
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
                            data-validation-pattern-message="Wrong price value. Must be a valid number like 15.95." \
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
        $controlGroup.find("input").focus();
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
        $controlGroup.find("input").focus();
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
        $controlGroup.find("input").focus();
    };

    function addApkFile(e) {
        var $parent = $(e).closest(".control-group");
        var $controlGroup = $(' \
            <div class="control-group"> \
                <label class="control-label" for="pretty-apk-file">APK File</label> \
                <div class="controls"> \
                    <input type="file" name="apk-file" class="hide ie_show" accept="application/vnd.android.package-archive" \
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

    function showImportDescriptionXMLDialog() {
        var $modal = $("#import-descriptionxml-modal");
        var $importButton = $modal.find(".btn-primary");

        $("#import-descriptionxml-modal-errors").hide();
        $("#import-descriptionxml-modal-status").hide();

        $modal.on('shown', function () {
            $("#import-descriptionxml-modal-text").focus();
        });

        $importButton.click(function(event) {
            event.preventDefault();
            var xml = $("#import-descriptionxml-modal-text").val();
            console.log("Showing importing message");
            $("#import-descriptionxml-modal-status").show();
            console.log("Push");
            appdfXMLLoader.loadDescriptionXML(xml, function() {
                $modal.modal('hide');
            }, function(errors) {
                console.log("Import errors");
                console.log(errors);

                var $list = $("#import-descriptionxml-modal-errors").find("ul");

                //Then we clear all the previous errors from the error lost
                $list.find("li").remove();

                //Now we make sure the error list is visible and add all the errors there
                $("#load-errors").show();
                for (var i=0; i<errors.length; i++) {
                    $list.append($("<li>").text(errors[i]));
                };

            }, function(current, total) {
                //onprogress
            });
            return false;
        });

        $modal.modal("show");
    };

    function showLoadAppdfDialog() {
        var $modal = $("#load-appdf-modal");
        var $browseButton = $modal.find(".load-appdf-modal-browse")
        var $openButton = $modal.find(".btn-primary");
        var $file = $modal.find("#load-appdf-modal-file");
        $("#load-appdf-modal-errors").hide();
        $("#load-appdf-modal-status").hide();
        $("#load-appdf-modal-prettyfile").val("");
        $file.val("");

        $browseButton.click(function(event) {
            console.log("borwseButton click");
            event.preventDefault();
            $file.click();
            console.log("click end");
            return false;
        });

        $file.change(function(event) {
            console.log("file is changed");
            $("#load-appdf-modal-prettyfile").val(normalizeInputFileName($file.val()));
            return false;
        });

        $openButton.click(function(event) {
            event.preventDefault();
            $("#load-appdf-modal-status").show();

            appdfXMLLoader.loadAppdfFile($file[0].files[0], function() {
                $modal.modal('hide');
            }, function(errors) {
                console.log("Import errors");
                console.log(errors);

                var $list = $("#load-appdf-modal-errors").find("ul");

                //Then we clear all the previous errors from the error lost
                $list.find("li").remove();

                //Now we make sure the error list is visible and add all the errors there
                $("#load-appdf-modal-errors").show();
                for (var i=0; i<errors.length; i++) {
                    $list.append($("<li>").text(errors[i]));
                };

            }, function(current, total) {
                //onprogress
            });
            return false;
        });

        $modal.modal("show");
    };

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

        init();
        $modal.modal("show");
    };

    function fillLanguages() {
        var $langs = $("#add-localization-modal-language");
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
            var $input = $(e.target).closest(".input-append").find("input");
            if ($input.val() !== "") {
                if (addMoreStoreSpecific(e.target, $input.val(), "")) {
					$input.val("");
				}
            };
            $input.focus();
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

        $('body').on('click', '.apk-file-addmore', function(e) {
            addApkFile(e.target);
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

        $('body').on('click', '.apkfile-pretty-browse', function(event) {
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

        $("#price-free-trialversion").change(function() {
            var trialVersion = $("#price-free-trialversion").attr("checked");
            if (trialVersion === "checked") {
                $("#price-free-fullversion").removeAttr('disabled');
            } else {
                $("#price-free-fullversion").attr('disabled', 'disabled');
            };
        });
    };

    function fillSupportedLanguages() {
        var $div = $("#requirements-supportedlanguages");
		$div.empty();
		
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
        $input = $("#storespecific-input");
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
                console.log("updater");
                console.log(item);

                var deviceModelRegEx = /([^\(]*)\s\([.]*/i;
                var matched = item.match(deviceModelRegEx); 
                console.log(matched);
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
		
		appdfImages.getImgSize(imgUrl, function(width, height) {
			if ( (promoName==="smallpromo" && width===180 && height===120) || (promoName==="largepromo" && width===1024 && height===500)) {
				$el.data("width", width).data("height", height);
				callback({
					value: value,
					valid: true
				});
			} else {
				callback({
					value: value,
					valid: false,
					message: promoName==="smallpromo"?"Small promotion image size must be 180x120":"Large promotion image size must be 1024x500" 
				});
			};
		});
	};
	
	function validationCallbackScreenshotRequired($el, value, callback) {
		if (isNoFile($el[0])) {
			callback({
				value: value,
				valid: true
				//message: "Screenshot is required"
			});
			return;
		};
		var imageFileName = getFileName($el[0]);
		var file = getFileContent($el[0]);
		var URL = window.webkitURL || window.mozURL || window.URL;    
		var imgUrl = URL.createObjectURL(file);
		
		appdfImages.getImgSize(imgUrl, function(width, height) {
			if ((width===480 && height===800) || (width===1080 && height===1920) || (width===1920 && height===1200)) {
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

	function validationCallbackRequirementDevice($el, value, callback) {
		if ($('#section-requirements input[name="unsupport-device-name-' + value + '"]').length) {
			callback({
				value: value,
				valid: false,
				message: "This device already exists"
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
				message: "Application icon is required"
			});
			return;
		};
        
		var imageFileName = getFileName($el[0]);
		var file = getFileContent($el[0]);
		var URL = window.webkitURL || window.mozURL || window.URL;    
		var imgUrl = URL.createObjectURL(file);
        if (isOnlyDataImage($el[0])) {
            $($el[0]).removeClass("empty-image");
            $($el[0]).next().attr("src", imgUrl);
        };
        
		appdfImages.getImgSize(imgUrl, function(width, height) {
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
	
	function validationCallbackApkFile($el, value, callback, first) {
        var apkFileName = getFileName($el[0]);
        $el.closest(".controls").find("input:text").val(apkFileName);

		if (first && isNoFile($el[0])) {
			callback({
				value: value,
				valid: false,
				message: "APK file is required"
			});
			return;
		};
		
		var file = getFileContent($el[0]);
        
		if (file.size>MAXIMUM_APK_FILE_SIZE) {
			callback({
				value: value,
				valid: false,
				message: "APK file size cannot exceed 50M"
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
				message: "This store already exists"
			});
		} else if (value && !regExp.test(value)) {
			callback({
				value: value,
				valid: false,
				message: "Application store name could contain only small English letters without special symbols"
			});
		} else {
			callback({
				value: value,
				valid: true
			});
		};
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

    function initFilling() {
        fillLanguages();    
        fillCategories();
        fillSubcategories();
        fillCategoryStoresInfo();
        fillSupportedLanguages();
        fillScreenResolutions();
        fillStores();
        fillDeviceModels();
    };

    function init() {
        initRatingCertificate();
        initMenuStickToTop();
        initScrollspy();
        initFilling();
        addClickHandlers();
    };

    return {
        init : init,
        addApkFile : addApkFile,
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
		fillSupportedLanguages : fillSupportedLanguages,
        fillScreenResolutions : fillScreenResolutions,
		validationCallbackAppIconFirst : validationCallbackAppIconFirst,
        validationCallbackAppIconMore : validationCallbackAppIconMore,
		validationCallbackApkFileFirst : validationCallbackApkFileFirst,
		validationCallbackApkFileMore : validationCallbackApkFileMore,
		validationCallbackPromo : validationCallbackPromo,
		validationCallbackScreenshotRequired : validationCallbackScreenshotRequired,
		validationCallbackRequirementDevice : validationCallbackRequirementDevice,
		validationCallbackStoreSpecify : validationCallbackStoreSpecify
    };
})();

$(function() {
    appdfEditor.init();
});

