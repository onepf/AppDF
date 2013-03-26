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

 var appdfImages = (function() {
	function addMoreAppIcon(e) {
		var $parent = $(e).closest(".image-group");
		var $controlGroup = $(' \
		<div class="image-input-group"> \
			<input type="file" id="description-images-appicon-' + getUniqueId() + '" class="hide ie_show appicon-input empty-image" \
				name="description-images-appicon-' + getUniqueId() + '" \
				accept="image/png" \
				data-validation-callback-callback="appdfEditor.validationCallbackAppIconFirst" \
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
				data-validation-callback-callback="appdfEditor.validationCallbackScreenshotRequired" \
			/> \
			<img src="img/screenshot_placeholder.png" width="132" height="220"> \
			<p class="image-input-label"></p> \
		</div> \
		');
		$parent.append($controlGroup);
		addValidationToElements($controlGroup.find("input"));
	};
	
	function addScreenshotIndex(e) {
		var $parent = $(e.target).closest(".image-input-group");
		var $controlGroup = $(' \
			<input type="file" id="description-images-screenshot-' + getUniqueId() + '" class="hide ie_show screenshot-input empty-image" \
				name="description-images-screenshot-' + getUniqueId() + '" \
				accept="image/png" \
				data-validation-callback-callback="appdfEditor.validationCallbackScreenshotRequired" \
			/> \
			<img src="img/screenshot_placeholder.png" width="132" height="220"> \
		');
		$parent.find("p").before($controlGroup);
		addValidationToElements($controlGroup.find("input"));
	};
	
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

        $group.find(".image-input-label").append($('<span> \
			(<a href="#" class="image-input-remove">remove</a> | \
			<a href="#" class="image-input-moveup">move up</a> | \
			<a href="#" class="image-input-movedown">move down</a> | \
			<a href="#" class="image-input-addindex">add other resolution</a>)</span>'));
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
		
		$el.next().attr("src", imgUrl);
		$el.removeClass("empty-image");
        
        var $group = $el.closest(".image-input-group");
		$group.find(".image-input-label").html('<span class="image-input-name"></span>');

        var imgUrl = $el.next().attr("src");
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
				$(e.target).prev().click();
                e.preventDefault();
            };
        });

		$('body').on('click', '.image-input-addindex', function(e) {
			addScreenshotIndex(e);
			return false;
		});
		
        $('body').on('click', '.image-input-remove', function(e) {
            onInputImageRemove(e);
            return false;
        });        
    };

    return {
		init : init,
		addMoreAppIcon : addMoreAppIcon,
		addMoreScreenshots : addMoreScreenshots
	};
 })();