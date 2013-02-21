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
    function fillCountries($e, selectedCountry) {
        $e.append($("<option />").val("").text("Select Country"));

        for (countryCode in dataCountries) {
            $e.append($("<option />").val(countryCode).text(dataCountries[countryCode]));
        };

        $e.change(function() {
            var selectedCountryCode = $(this).find(":selected").val();
            if (selectedCountryCode != "") {
                var currency = countryCurrencies[selectedCountryCode];
                $(this).closest(".control-group").find(".add-on").html(currency);
            } else {
                $(this).closest(".control-group").find(".add-on").html("");
            };
        });

        if (selectedCountry) {
            $e.val(selectedCountry);
            var currency = countryCurrencies[selectedCountry];
            $e.closest(".control-group").find(".add-on").html(currency);
        };
    };

    function normalizeInputFileName(fileName) {
        return fileName.replace("C:\\fakepath\\", "");
    };

    function addMoreKeywords(e, value) {
        var $parent = $(e).closest(".input-append").parent();
        var $controlGroup = $(' \
            <div class="keyword-countainer"> \
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
        $controlGroup.find("input").focus();
        addValidationToElements($controlGroup.find("input"));
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

    function addApkFile(e) {
        var $parent = $(e).closest(".control-group");
        var $controlGroup = $(' \
            <div class="control-group"> \
                <label class="control-label" for="pretty-apk-file">APK File</label> \
                <div class="controls"> \
                    <input type="file" name="apk-file" class="hide ie_show" accept="application/vnd.android.package-archive" \
                        data-validation-callback-callback="validationCallbackApkFileMore" \
                    /> \
                    <div class="input-append ie_hide"> \
                        <input id="pretty-apk-file" class="input-large" type="text" readonly="readonly" onclick="prettyFileInputClick(this);"> \
                            <a class="btn" onclick="prettyFileInputClick(this);">Browse</a> \
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
    };

    function showLoadAppdfDialog() {
        var $modal = $("#load-appdf-modal");
        var $browseButton = $modal.find(".load-appdf-modal-browse")
        var $openButton = $modal.find(".btn-primary");
        var $file = $modal.find("#load-appdf-modal-file");
        $("#load-appdf-modal-errors").hide();

        $browseButton.click(function(event) {
            event.preventDefault();
            $file.click();
        });

        $file.change(function(event) {
            $("#load-appdf-modal-prettyfile").val(appdfEditor.normalizeInputFileName($file.val()));
        });

        $openButton.click(function(event) {
            event.preventDefault();
            loadAppdfFile($file[0].files[0], function() {
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
                    $list.append( $("<li>").text(errors[i]) );
                };

            });
            return false;
        });

        $modal.modal("show");
    };

    function showYouTubeBorwseDialog(e) {
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

    function addClickHandlers() {
        $('body').on('click', '.description-texts-keywords-addmore', function(e) {
            addMoreKeywords(e.target, "");
            return false;
        });

        $('body').on('click', '.price-localprice-add', function(e) {
            addMoreLocalPrice(e.target, "", "");
            return false;
        });

        $('body').on('click', '.description-texts-keywords-remove', function(e) {
            $(e.target).closest(".keyword-countainer").remove();
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
            showYouTubeBorwseDialog(event.target);
            return false;
        });

        $('body').on('click', '.apkfile-pretty-browse', function(event) {
            $(event.target).closest(".controls").children("input").click();
            return false;
        });
    };

    function init() {
        initRatingCertificate();
        initMenuStickToTop();
        initScrollspy();
        addClickHandlers();
    };

    return {
        addMoreKeywords : addMoreKeywords,
        addMoreLocalPrice : addMoreLocalPrice,
        init : init,
        normalizeInputFileName : normalizeInputFileName
    };
})();

$(function() {
    appdfEditor.init();
});

