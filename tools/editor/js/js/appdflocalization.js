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
 * Localization related logic of AppDF Editor
 * Depends on: jquery.js, appdfedior.js, bootstrap.js,
 */

var appdfLocalization = (function() {

    var MAX_LOCALIZATION_TABS = 5;

    function getDescriptionLanguages() {
        var langs = [];
        $("#description-tab-header").find("a").each(function() {
            var strHref = $(this).attr("href").toLowerCase();
            if (strHref.indexOf("#localization-tab-")==0) {
                langs.push(strHref.substr(18));
            };
        });
        return langs;
    };

    function selectLanguage(languageCode) {
        var $tabHeader = $("#description-tab-header");
        $tabHeader.find('a[href="#localization-tab-' + languageCode + '"]').tab('show');
    };

    function addLocalization(languageCode, languageName) {
        var descriptionLangs = getDescriptionLanguages();

        //Preventing adding one language twice
        if (descriptionLangs.indexOf(languageCode)>=0) {
            return;
        };

        var strHtmlHeader = '<li><a href="#localization-tab-' + languageCode + '" data-toggle="tab">' + languageName + '</a></li>';

        var $tabHeader = $("#description-tab-header");

        //We do not allow more than MAX_LOCALIZATION_TABS tabs, if more we add it to the "More" tab
        if ($tabHeader.children().length<MAX_LOCALIZATION_TABS) {
            $tabHeader.children("li:last").before($(strHtmlHeader));
        } else {
            $tabHeader.find('ul.dropdown-menu').append($(strHtmlHeader));
        };

        //Create new tab content container
        var strHtmlContent = '<div class="tab-pane" id="localization-tab-' + languageCode + '"></div>';
        $("#description-tab-content").append($(strHtmlContent));

        //Add copy of default langauge content to just created container 
        var strHtmlClone = $("#description-tab-content").children("div#localization-tab-default").html();
        var $localizedDescription = $(strHtmlClone);
        prepareJustCopiedDescription($localizedDescription);
        $("#description-tab-content").children().last().append($localizedDescription);

        //Open just created tab and create a handler 
        $tabHeader.find('a[href="#localization-tab-' + languageCode + '"]').tab('show');
        $tabHeader.find('a[href="#localization-tab-' + languageCode + '"]').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        });
    };

    function prepareJustCopiedDescription($e) {
        //reset promo images
        appdfImages.addLargePromo($e.find(".large-promo-image-reset")[0]);
        appdfImages.addSmallPromo($e.find(".small-promo-image-reset")[0]);
        
    	//Remove image fields that were non-empty in the default language
    	$e.find(".image-input-group").find("input.image-input").not(".empty-image").closest(".image-input-group").remove();
    	$e.find(".image-input-group").find("input.screenshot-input").not(".empty-image").closest(".image-input-group").remove();
    	$e.find(".image-input-group").find("input.appicon-input").not(".empty-image").closest(".image-input-group").remove();
        
        //Remove the required "*" symbol from the end of all labels because all fields in a localization are optional
    	$e.find(".required-mark").remove();
        
        $e.find(".warning").removeClass("warning");
        
        //Remove all additionally added keywords
        $e.find("input[id^=description-texts-keywords-more-]").closest(".input-container").remove();
    };

    function removeAllLocalizations() {
        var $tabHeader = $("#description-tab-header");
        var $tabContent = $("#description-tab-content");

        $tabHeader.find("a").each(function() {
            var strHref = $(this).attr("href");
            if (strHref!="#localization-tab-default" && strHref!="#") {
                $(this).closest("li").remove();
                $tabContent.children("div" + strHref).remove();
            };
        });
    };

    function removeSelectedLocalization() {
        var $tabHeader = $("#description-tab-header");
        var $tabContent = $("#description-tab-content");
        var strHref = $tabHeader.find(".active").children("a").attr("href");

        if (strHref=="#localization-tab-default") {
            alert("Cannot remove default (English) localization");
            return;
        };

        //First we check if "More" is selected
        if (strHref=="#") {
            strHref = $tabHeader.find(".active").find(".active").children("a").attr("href");
            $tabHeader.find(".active").find(".active").remove();
            $tabContent.children("div" + strHref).remove();
        } else {
            $tabHeader.find(".active").remove();
            $tabContent.children("div" + strHref).remove();
        };

        selectLanguage("default");
    };

    var localizationDialogInit = false;
    function showAllLocalizationDialog() {
        var $modal = $("#add-localization-modal");
        var $okButton = $modal.find(".btn-primary");
        
        if (!localizationDialogInit) {
            localizationDialogInit = true;
            $okButton.click(function(event) {
                event.preventDefault();
                $modal.modal('hide');
                addLocalization($("#add-localization-modal-language").val(), $("#add-localization-modal-language").children(":selected").text());
            });
        };
        
        $modal.modal("show");
    };

    function init() {
        $('body').on('click', '.description-tab-addlocation', function(event) {
            showAllLocalizationDialog();
            return false;
        });
        
        $('body').on('click', '.description-tab-removeselectedlocalization', function(event) {
            removeSelectedLocalization();
            var $tabHeader = $("#description-tab-header");
            $tabHeader.find("li.dropdown.open").removeClass("open");
            return false;
        });
    };
    
    function isDefaultLanguage($el) {
        var $tab = $el.closest(".tab-pane");
        var tabId = $tab.attr('id')
        var result = (tabId==="localization-tab-default");
        return result;
    };

    return {
        init : init,
        removeAllLocalizations : removeAllLocalizations,
        addLocalization : addLocalization,
        selectLanguage : selectLanguage,
        isDefaultLanguage : isDefaultLanguage,
        getDescriptionLanguages : getDescriptionLanguages
    };
})();

$(function() {
    appdfLocalization.init();
});
