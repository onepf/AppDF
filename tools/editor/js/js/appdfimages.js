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
 * Images related logic of AppDF Editor
 * Depends on: jquery.js, appdfedior.js
 */

 $(function() {
    function onInputImageRemove(e) {
        $(e.target).closest(".image-input-group").remove();
        return false;
    };

    function onScreenshoutRemove(e) {
        onInputImageRemove(e);
        return false;
    };

    function onScreenshotImageInputMoveUp(e) {
        var $imageInputGroup = $(e.target).closest(".image-input-group");
        var $imageGroup = $imageInputGroup.parent();
        if ($imageInputGroup.prev().length>0) {
            $imageInputGroup.prev().before($imageInputGroup);
        };
        return false;
    };

    function onScreenshotImageInputMoveDown(e) {
        var $imageInputGroup = $(e.target).closest(".image-input-group");
        var $imageGroup = $imageInputGroup.parent();
        if ($imageInputGroup.next().length>0) {
            $imageInputGroup.next().after($imageInputGroup);
        };
        return false;
    };

    function onAppIconImageInputChange(e) {
        onImageInputChange(e);

        var $el = $(e.target);
        var imageFileName = appdfEditor.normalizeInputFileName($el.val());

        var $group = $el.closest(".image-input-group");
        var firstImage = $group.is(':first-child');

        if (!isDefaultLanguage($el) || !firstImage) {
            $group.find(".image-input-label").append($('<span> (<a href="#" class="image-input-remove">remove</a>)</span>'));
        };

        if ($group.parent().find("input.empty-image").length===0) {
            addMoreAppIcon($el);
        };    

        return false;
    };

    function onScreenshotImageInputChange(e) {
        onImageInputChange(e);

        var $el = $(e.target);
        var imageFileName = appdfEditor.normalizeInputFileName($el.val());

        var $group = $el.closest(".image-input-group");

        $group.find(".image-input-label").append($('<span> (<a href="#" class="image-input-remove">remove</a> | <a href="#" class="image-input-moveup">move up</a> | <a href="#" class="image-input-movedown">move down</a>)</span>'));
        $group.find("a.image-input-remove").click(function (e) {
            onScreenshoutRemove(e);
            return false;
        });

        if ($group.parent().find("input.empty-image").length===0) {
            addMoreScreenshots($el);
        };   

        return false; 
    };

    function onImageInputChange(e) {
        if (e.target.files.length === 0) {
            return false;
        };
        
        var $el = $(e.target);
        var imageFileName = appdfEditor.normalizeInputFileName($el.val());
        var URL = window.webkitURL || window.mozURL || window.URL;    
        var file = e.target.files[0];
        var imgUrl = URL.createObjectURL(file);

        var $group = $el.closest(".image-input-group");
        $group.find("img").attr("src", imgUrl);

        $group.find("input").removeClass("empty-image");
        $group.find(".image-input-label").html('<span class="image-input-name"></span>');

        var imgUrl = $group.find("img").attr("src");
        getImgSize(imgUrl, function(width, height) {
            $group.find(".image-input-name").text(imageFileName + " " + width + "x" + height);
        });

        return false;
    };

    function init() {
        $('body').on('click', '.image-input-moveup', onScreenshotImageInputMoveUp);
        $('body').on('click', '.image-input-movedown', onScreenshotImageInputMoveDown);
        $('body').on('change', '.appicon-input', onAppIconImageInputChange);
        $('body').on('change', '.screenshot-input', onScreenshotImageInputChange);
        $('body').on('change', '.image-input', onImageInputChange);

        $('body').on('click', '.image-input-group', function(e) {
            if (e.target.tagName.toLowerCase() === "img") {
                $(e.target).closest(".image-input-group").children("input").click();
                e.preventDefault();
            };
        });

        $('body').on('click', '.image-input-remove', function(e) {
            onInputImageRemove(e);
            return false;
        });        
    };

    init();
 });