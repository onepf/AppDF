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
 * Loading description.xml JSON into AppDF editor HTML5 page
 * Depends on: jquery.js, xmlgenerator.js, appdfeditor.js, appdflocalization.js
 */

var appdfXMLLoader = (function() {
    var appdfFiles = {};
    
    function loadDescriptionLocalizationSection(languageCode, data) {
        var $container = $("#localization-tab-" + languageCode);

        $container.find("input[id^=description-texts-title-more-]").closest(".control-group").remove();
        var titles = data["texts"]["title"];
        for (var i=0; i<titles.length; i++) {
            var title = titles[i];
            if (i==0) {
                $container.find("#description-texts-title").val(title);
            } else {
                appdfEditor.addMoreTitles($container.find("#description-texts-title"), title);
            };
        };    

        $container.find("input[id^=description-texts-keywords-more-]").closest(".input-container").remove();
        var keywords = data["texts"]["keywords"];
        for (var i=0; i<keywords.length; i++) {
            var keyword = keywords[i];
            if (i==0) {
                $container.find("#description-texts-keywords").val(keyword);
            } else {
                appdfEditor.addMoreKeywords($container.find("#description-texts-keywords"), keyword);
            };
        };    

        $container.find("input[id^=description-texts-shortdescription-more-]").closest(".control-group").remove();
        var shoftDescriptions = data["texts"]["short-description"];
        for (var i=0; i<shoftDescriptions.length; i++) {
            var shortDescription = shoftDescriptions[i];
            if (i==0) {
                $container.find("#description-texts-shortdescription").val(shortDescription);
            } else {
                appdfEditor.addMoreShortDescriptions($container.find("#description-texts-shortdescription"), shortDescription);
            };
        };    

        $container.find("#description-texts-fulldescription").val(data["texts"]["full-description"]);

        $container.find("input[id^=description-texts-features-]").val("");
        var features = data["texts"]["features"];
        for (var i=0; i<features.length; i++) {
            var feature = features[i];
            if (i<5) {
                $container.find("#description-texts-features-" + (i+1)).val(feature);
            };
        };    

        if (data["texts"]["recent-changes"]) {
            $container.find("#description-texts-recentchanges").val(data["texts"]["recent-changes"]);
        } else {
            $container.find("#description-texts-recentchanges").val("");        
        };

        if (data["texts"]["privacy-policy"] && data["texts"]["privacy-policy-link"]) {
            $container.find("#description-texts-privacypolicy-data").val(data["texts"]["privacy-policy"]);
            $container.find("#description-texts-privacypolicy-link").val(data["texts"]["privacy-policy-link"]);
        } else {
            $container.find("#description-texts-privacypolicy-data").val("");
            $container.find("#description-texts-privacypolicy-link").val("");
        };

        if (data["texts"]["eula"] && data["texts"]["eula-link"]) {
            $container.find("#description-texts-eula-link").val(data["texts"]["eula-link"]);
            $container.find("#description-texts-eula-data").val(data["texts"]["eula"]);
        } else {
            $container.find("#description-texts-eula-link").val("");
            $container.find("#description-texts-eula-data").val("");
        };
        
        
        //clear screenshots
        $container.find(".screenshots-group a.image-input-remove").click();
        
        if (data["images"]) {
            var appIcons = data["images"]["app-icon"];
            if (appIcons && appIcons.length) {
                for (var i=0; i<appIcons.length; i++) {
                    var $appIconInput = $container.find("input[id^=\"description-images-appicon\"]:last");
                    $appIconInput.data("file", appIcons[i].name);
                    
                    if (i===0) {
                        appdfEditor.validationCallbackAppIconFirst($appIconInput, appIcons[i].name, function(v) {});
                    } else {
                        appdfEditor.validationCallbackAppIconMore($appIconInput, appIcons[i].name, function(v) {});
                    };
                    appdfImages.onAppIconImageInputChange({target:$appIconInput});
                };
            };
            
            updatePromo(data["images"]["large-promo"], $container.find("input[id^=\"description-images-largepromo\"]"));
            updatePromo(data["images"]["small-promo"], $container.find("input[id^=\"description-images-smallpromo\"]"));
            
            var screenshots = data["images"]["screenshots"];
            if (screenshots && screenshots.length) {
                for (var i=0; i<screenshots.length; i++) {
                    var $screenshotGroups = $container.find(".screenshots-group .image-input-group");
                    var screenshotIndex = screenshots[i].index;
                    
                    while ($screenshotGroups.length < +screenshotIndex) {
                        appdfImages.addMoreScreenshots($screenshotGroups[0]);
                        $screenshotGroups = $container.find(".screenshots-group .image-input-group");
                    }
                    
                    var $screenshotInput = $($screenshotGroups[screenshotIndex-1]).find("input.empty-image:last");
                    if (!$screenshotInput.length) {
                        appdfImages.addScreenshotIndex({target:$screenshotGroups[screenshotIndex-1]});
                        $screenshotInput = $($screenshotGroups[screenshotIndex-1]).find("input.empty-image:last");
                    }
                    updateScreenshot(screenshots[i], $screenshotInput);
                };
            };
        };
        
        $container.find(".video-files-group .control-remove").click();
        var dataVideos = data["videos"];
        if (dataVideos) {
            if (dataVideos["youtube-video"]) {
                $container.find("#description-videos-youtubevideo").val(dataVideos["youtube-video"]);
            } else {
                $container.find("#description-videos-youtubevideo").val("");
            };
            
            var videoList = dataVideos["video-file"];
            
            var $videoFilesControl = $container.find(".video-files-group");
            var $videoHiddenInput;
            if (videoList && videoList.length) {
                for (var i = 0; i < videoList.length; i++) {
                    appdfEditor.addVideoFile($videoFilesControl.find(".video-file-addmore"));
                    $videoHiddenInput = $videoFilesControl.find("input.hidden-video-file:last");
                    $videoHiddenInput.data("file", videoList[i]);
                    
                    appdfEditor.validationCallbackVideoFile($videoHiddenInput, videoList[i], function(e) {});
                };
            };
        };
    };
    
    function updateScreenshot(screenshotData, $screenshotInput) {
        $screenshotInput.data("file", screenshotData.name);
        
        appdfEditor.validationCallbackScreenshotRequired($screenshotInput, screenshotData.name, function(v) {});
        appdfImages.onScreenshotImageInputChange({target:$screenshotInput[0]});
    };
    
    function updatePromo(promo, $promoInput) {
        if (promo) {
            $promoInput.data("file", promo.name);
            
            appdfEditor.validationCallbackPromo($promoInput, promo.name, function(v) {});
            appdfImages.onImageInputChange({target:$promoInput});
        };  
    };
    
    function loadDescriptionXML(xml, onend, onerror, onprogress) {
        appdfParser.parseDescriptionXML(xml, function(data) {
            //Calculate total number of actions to do
            var totalProgressItems = 29;
            for (languageCode in data["description"]) {
                totalProgressItems += 20;
            };
            //to start progress bar from 50% after parsing
            var passedProgressItems = totalProgressItems;
            totalProgressItems *= 2;
            
            
            //Helper function to report progress
            function progress(n) {
                if (!n) {
                    passedProgressItems += 1;
                } else {
                    passedProgressItems += n;
                };
                if (passedProgressItems>totalProgressItems) {
                    console.log("Error passedProgressItems>totalProgressItems. Adjust the constants in this fuction.")
                    passedProgressItems = totalProgressItems;
                };
                onprogress(passedProgressItems, totalProgressItems);
            };

            console.log("Description.XML is parsed");
            console.log(data);

            //Set control values in the categorization section
            $("#categorization-type").val(data["categorization"]["type"]);
            appdfEditor.fillCategories();
            progress();//1

            $("#categorization-category").val(data["categorization"]["category"]);
            appdfEditor.fillSubcategories();
            progress();//2

            $("#categorization-subcategory").val(data["categorization"]["subcategory"]);
            appdfEditor.fillCategoryStoresInfo();
            progress();//3

            //Set control values in the description/texts
            appdfLocalization.removeAllLocalizations();
            progress(3);//6
            for (languageCode in data["description"]) {
                if (languageCode!="default") {
                    appdfLocalization.addLocalization(languageCode, dataLanguages[languageCode]);
                };
                loadDescriptionLocalizationSection(languageCode, data["description"][languageCode]);
                progress(20);
            };//20*LanguageCount + 6

            //Select default language as open tab
            appdfLocalization.selectLanguage("default");

            //Price
            $("input[id^=price-localprice-]").closest(".control-group").remove();
            $("#price-free-fullversion").val("");
            $("#price-baseprice").val("0");
            progress();//20*LanguageCount + 7
            if (data["price"]["free"]) {
                $('a[href="#tab-price-free"]').tab('show');
                $("#price-free-trialversion").attr("checked", data["price"]["trial-version"]);
                if (data["price"]["trial-version"]) {
                    $("#price-free-fullversion").removeAttr('disabled');
                } else {
                    $("#price-free-fullversion").attr('disabled', 'disabled');
                };
                if (typeof data["price"]["full-version"] != 'undefined') {
                    $("#price-free-fullversion").val(data["price"]["full-version"]);
                };        
            } else {
                $('a[href="#tab-price-paid"]').tab('show');
                $("#price-baseprice").val(data["price"]["base-price"]);            

                $("#price-free-trialversion").attr("checked", false);
                $("#price-free-fullversion").attr('disabled', 'disabled');

                for (countryCode in data["price"]["local-price"]) {
                    appdfEditor.addMoreLocalPrice($("#price-baseprice"), data["price"]["local-price"][countryCode], countryCode);
                };
            };
            progress(3);//20*LanguageCount + 10

            //Consent
            $("#consent-googleandroidcontentguidelines").attr("checked", data["consent"]["google-android-content-guidelines"]);
            $("#consent-usexportlaws").attr("checked", data["consent"]["us-export-laws"]);
            $("#consent-importexportlaws").attr("checked", data["consent"]["us-export-laws"]);
            $("#consent-slidemeagreement").attr("checked", data["consent"]["slideme-agreement"]);
            $("#consent-freefromthirdpartycopytightedcontent").attr("checked", data["consent"]["free-from-third-party-copytighted-content"]);
            progress();//20*LanguageCount + 11

            //Customer support
            $("#customersupport-phone").val(data["customer-support"]["phone"]);
            $("#customersupport-email").val(data["customer-support"]["email"]);
            $("#customersupport-website").val(data["customer-support"]["website"]);
            progress();//20*LanguageCount + 12
            

            //Content description / content rating
            $("#contentdescription-contentrating").val(data["content-description"]["content-rating"]);
            progress();//20*LanguageCount + 13

            //Content description / content descriptors
            var dcd = data["content-description"]["content-descriptors"];
            var scd = "#contentdescription-contentdescriptors-"
            $(scd + "cartoonviolence").val(dcd["cartoon-violence"]);
            $(scd + "realisticviolence").val(dcd["realistic-violence"]);
            $(scd + "badlanguage").val(dcd["bad-language"]);
            $(scd + "fear").val(dcd["fear"]);
            $(scd + "sexualcontent").val(dcd["sexual-content"]);
            $(scd + "drugs").val(dcd["drugs"]);
            $(scd + "gamblingreference").val(dcd["gambling-reference"]);
            $(scd + "alcohol").val(dcd["alcohol"]);
            $(scd + "smoking").val(dcd["smoking"]);
            $(scd + "discrimination").val(dcd["discrimination"]);
            progress(2);//20*LanguageCount + 15

            //Content description / included-activities
            var dia = data["content-description"]["included-activities"];
            var sia = "#contentdescription-includedactivities-"
            $(sia + "inappbilling").attr("checked", dia["in-app-billing"]);
            $(sia + "gambling").attr("checked", dia["gambling"]);
            $(sia + "advertising").attr("checked", dia["advertising"]);
            $(sia + "usergeneratedcontent").attr("checked", dia["user-generated-content"]);
            $(sia + "usertousercommunications").attr("checked", dia["user-to-user-communications"]);
            $(sia + "accountcreation").attr("checked", dia["account-creation"]);
            $(sia + "personalinformationcollection").attr("checked", dia["personal-information-collection"]);
            progress(2);//20*LanguageCount + 17

            //Content description / rating-certificates
            var certificates = data["content-description"]["rating-certificates"];
            var sc = "#contentdescription-ratingcertificates-rating-"
            for (var i=0; i<certificates.length; i++) {
                var typeId = certificates[i]["type"].toLowerCase();
                $(sc + typeId).val(certificates[i]["rating"]);
            };
            progress(3);//20*LanguageCount + 20
            
            //Testing instructions
            $("#testinginstructions").val(data["testing-instructions"]);
            progress();//20*LanguageCount + 21
            
            
            //Store specify
            //remove current store specify list
            $('#section-store-specific .store-specific').remove();
            //add loaded store specify data
            var storeSpecificData = data["store-specific"];
            if (storeSpecificData) {
                for (var i in storeSpecificData) {
                    appdfEditor.addMoreStoreSpecific($(".storespecific-addmore"), i, storeSpecificData[i]);
                };
            };
            progress();//20*LanguageCount + 22
            
            
            //Requirements
            var featuresTagsAndIDsList = [ 
                {tag:"root", id:"#requirements-features-root"},
                {tag:"gms", id:"#requirements-features-gms"},
                {tag:"online", id:"#requirements-features-online"}
            ];
            //clear supported languages list
            $("#requirements-supportedlanguages-type-default").click();
            appdfEditor.fillSupportedLanguages();
            //clear supported resolutions list
            $("#requirements-supportedresolutions-type-default").click();
            appdfEditor.fillScreenResolutions();
            progress();//20*LanguageCount + 23
            
            var dataRequirements = data["requirements"];
            if (dataRequirements) {
                if (dataRequirements["features"]) {
                    for (var i in featuresTagsAndIDsList) {
                        if (dataRequirements["features"][featuresTagsAndIDsList[i].tag]) {
                            $(featuresTagsAndIDsList[i].id).attr("checked", "checked");
                        } else {
                            $(featuresTagsAndIDsList[i].id).removeAttr("checked");
                        };
                    };
                };
                progress();//20*LanguageCount + 24
                
                if (dataRequirements["supported-languages"] && dataRequirements["supported-languages"]["language"]) {
                    $("#requirements-supportedlanguages-type-custom").click();
                    var $el, supportedLanguages = dataRequirements["supported-languages"]["language"];
                    
                    for (var i in supportedLanguages) {
                        $el = $('#requirements-supportedlanguages input[id="requirements-supportedlanguages-' + supportedLanguages[i] + '"]');
                        if ($el.size()) {
                            $el.attr("checked", "checked");
                        };
                    };
                };
                progress();//20*LanguageCount + 25
                
                if (dataRequirements["supported-devices"] && dataRequirements["supported-devices"]["exclude"]) {
                    var unsupportedDevices = dataRequirements["supported-devices"]["exclude"], $el = $(".requirements-supporteddevices-addmore");
                    
                    for (var i in unsupportedDevices) {
                        appdfEditor.addMoreUnsupportedDevices($el, unsupportedDevices[i]);
                    };
                };
                progress();//20*LanguageCount + 26
                
                if (dataRequirements["supported-resolutions"] && (dataRequirements["supported-resolutions"]["include"] || dataRequirements["supported-resolutions"]["exclude"])) {
                    var onlyListedType = dataRequirements["supported-resolutions"]["include"]?"include":"exclude";
                    $("#requirements-supportedresolutions-type-" + onlyListedType).click();
                    
                    var $el;
                    var supportedResolutions = dataRequirements["supported-resolutions"][onlyListedType];
                    
                    for (var i in supportedResolutions) {
                        $el = $('#requirements-supportedresolutions-' + onlyListedType + ' input[id="requirements-supportedresolutions-' + supportedResolutions[i] + '"]');
                        if ($el.size()) {
                            $el.attr("checked", "checked");
                        };
                    };
                };
                progress();//20*LanguageCount + 27
            } else {
                progress(4);//20*LanguageCount + 27
            };
            
            //apk files section
            $("#section-apk-files .control-group-remove").click();
            if (data["apk-files"] && data["apk-files"]["apk-file"]) {
                var apkFileList = data["apk-files"]["apk-file"];
                var $apkFileInput;
                var $apkFileInputHidden;
                var apkFileIndex = 0;
                
                function checkApkValidationResult(data) {
                    if (!data.valid) {
                        console.log("APK file error: " + data.message);
                    };
                    if (++apkFileIndex<apkFileList.length) {
                        nextApkFileLoad();
                    };
                };
                
                function nextApkFileLoad() {
                    if (apkFileList[apkFileIndex] && appdfFiles[apkFileList[apkFileIndex]]) {
                        $apkFileInput = $("#section-apk-files input[class*=\"apkfile-pretty-browse\"]:last");
                        $apkFileInput.val(apkFileList[apkFileIndex]);
                        $apkFileInputHidden = $("#section-apk-files input[class*=\"hidden-apk-file\"]:last");
                        
                        $apkFileInputHidden.data("file", apkFileList[apkFileIndex]);
                        
                        if (apkFileIndex<apkFileList.length-1) {
                            appdfEditor.addApkFile($apkFileInputHidden);
                        };
                        
                        if (apkFileIndex===0) {
                            appdfEditor.validationCallbackApkFileFirst($apkFileInputHidden, apkFileList[apkFileIndex], checkApkValidationResult);
                        } else {
                            appdfEditor.validationCallbackApkFileMore($apkFileInputHidden, apkFileList[apkFileIndex], checkApkValidationResult);
                        };
                    };
                };
                
                nextApkFileLoad();
            };
            progress();//20*LanguageCount + 28
            
            //availability
            $("#availability-supportedcountries-type-default").click();
            $("#section-availability .availability-supportedcountries-unselectall").click();
            if (data["availability"] && data["availability"]["countries"]) {
                var dataAvailCountry = data["availability"]["countries"];
                if (dataAvailCountry && (dataAvailCountry["include"] || dataAvailCountry["exclude"])) {
                    var onlyListedType = dataAvailCountry["include"]?"include":"exclude";
                    $("#availability-supportedcountries-type-" + onlyListedType).click();
                    
                    var $el;
                    var countriesList = dataAvailCountry[onlyListedType];
                    
                    for (var i in countriesList) {
                        $el = $('#availability-supportedcountries-' + onlyListedType + ' input[id="availability-supportedcountries-' + countriesList[i] + '"]');
                        if ($el.size()) {
                            $el.attr("checked", "checked");
                        };
                    };
                };
                
                var dataAvailPeriod = data["availability"]["period"];
                if (dataAvailPeriod && dataAvailPeriod["since"]) {
                    $("#section-availability input.availability-period-since").data("datepicker").setValue(dataAvailPeriod["since"]);
                };
                if (dataAvailPeriod && dataAvailPeriod["until"]) {
                    $("#section-availability input.availability-period-until").data("datepicker").setValue(dataAvailPeriod["until"]);
                };
            };
            progress();//20*LanguageCount + 29
            
            onend();
        }, onerror, onprogress);
    };

    function loadAppdfFile(file, onend, onerror, loadprogress, parseprogress) {
        appdfFiles = {};
        
        if (!file) {
            onerror([errorMessages.selectAppDFFile]);
            return false;
        };
        
        zip.createReader(new zip.BlobReader(file), function(zipReader) {
            zipReader.getEntries(function (entries) {
                var appdfEntries = [];
                var totalFilesCount = 0;
                var filesLoaded = 0;
                var descriptionAttachedFlag = false;
                
                var totalFileSize = 0;
                var loadedSize = 0;
                var previousTotalSize = 0;
                var previousCurrentSize = 0;
                
                entries.forEach(function(entry) {
                    totalFileSize += entry.uncompressedSize;
                    appdfEntries.push(entry);
                    totalFilesCount++;
                    if (entry.filename==="description.xml") {
                        descriptionAttachedFlag = true;
                    };
                });
                
                if (!descriptionAttachedFlag) {
                    onerror([errorMessages.descriptionNotFound]);
                    return false;
                };
                
                function getNextFileData() {
                    getFileData(appdfEntries[filesLoaded], function() {
                        if (++filesLoaded === totalFilesCount) {
                            loadComplete(onend, onerror, parseprogress);
                        } else {
                            getNextFileData();
                        };
                    }, onerror, function(current, total) {//onloadprogress
                        if (total===previousTotalSize && current>=previousCurrentSize) {
                            loadedSize += current - previousCurrentSize;
                            previousCurrentSize = current;
                        } else {
                            previousTotalSize = total;
                            previousCurrentSize = current;
                            loadedSize += current;
                        }
                        loadprogress(loadedSize, totalFileSize);
                    });
                };
                getNextFileData();
            });
        }, function(e) {
            onerror([e]);
        });
    };
    
    function getFileData(appdfFileEntry, oncomplete, onerror, onprogress) {
        var fileName = appdfFileEntry.filename;
        var fileReader = new FileReader();
        
        appdfFileEntry.getData(new zip.BlobWriter(), function(blob){
            fileReader.onload = function(event) {
                appdfFiles[fileName] = event.target.result;
                appdfFiles[fileName].name = fileName;
                oncomplete();
            };
            
            fileReader.onprogress = function(e) {
                onprogress(e.loaded, e.total);
            };
            
            fileReader.onerror = function(event) {
                onerror([errorMessages.fileErrorAndCode(fileName, event.target.error.code)]);
            };
            
            if (fileName==="description.xml") {
                fileReader.readAsText(blob);
            } else {
                appdfFiles[fileName] = blob;
                appdfFiles[fileName].name = fileName;
                oncomplete();
            };
        }, onprogress);
    };
    
    function loadComplete(onend, onerror, onprogress) {
        var contents = appdfFiles["description.xml"];
        appdfXMLLoader.appdfFiles = appdfFiles;
        
        //parse descriptionXML after all files loaded
        loadDescriptionXML(contents, onend, onerror, onprogress);
    };
    
    return {
        appdfFiles : appdfFiles,
        loadDescriptionXML : loadDescriptionXML,
        loadAppdfFile : loadAppdfFile
    };
})();