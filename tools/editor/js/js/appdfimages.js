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
    function resetFirstAppIcon() {
        $(".app-icon-first").empty();
        $imageGroup = $(' \
        <div class="image-input-group"> \
            <input type="file" id="description-images-appicon" class="hide ie_show appicon-input empty-image" \
                name="description-images-appicon" \
                accept="image/png" \
                data-validation-callback-callback="appdfEditor.validationCallbackAppIconFirst" \
                /> \
            <img src="img/appicon_placeholder.png" id="description-images-appicon-img" width="128" height="128"> \
            <p class="image-input-label">&nbsp;</p> \
        </div> \
        ');
        $(".app-icon-first").append($imageGroup);
        addValidationToElements($imageGroup.find("input"));
    };
    
	function addMoreAppIcon(e) {
		var $parent = $(e).closest(".controls").find(".image-group:first");
		var $controlGroup = $(' \
		<div class="image-input-group"> \
			<input type="file" id="description-images-appicon-' + getUniqueId() + '" class="hide ie_show appicon-input empty-image" \
				name="description-images-appicon-' + getUniqueId() + '" \
				accept="image/png" \
				data-validation-callback-callback="appdfEditor.validationCallbackAppIconMore" \
			/> \
			<img src="img/appicon_placeholder.png" width="128" height="128"> \
			<p class="image-input-label"></p> \
		</div> \
		');
		$parent.append($controlGroup);
		addValidationToElements($controlGroup.find("input"));
	};
	
    function addLargePromo(e) {
        var $parent = $(e).closest(".controls").find(".image-group:first");
        
        $parent.find(".image-input-group").remove();
		var $controlGroup = $(' \
        <div class="image-input-group"> \
            <input type="file" id="description-images-largepromo" class="hide ie_show image-input empty-image" \
                name="description-images-largepromo" \
                accept="image/png" \
                data-validation-callback-callback="appdfEditor.validationCallbackPromo" \
            /> \
            <img src="img/largepromo_placeholder.png" id="description-images-largepromo-img" width="256" height="125"> \
            <p class="image-input-label"></p> \
            <div class="btn large-promo-image-reset">Reset large promo image</div> \
        </div> \
		');
		$parent.append($controlGroup);
		addValidationToElements($controlGroup.find("input"));
    };
    
    function addSmallPromo(e) {
        var $parent = $(e).closest(".image-group");
        
        $parent.find(".image-input-group").remove();
		var $controlGroup = $(' \
        <div class="image-input-group"> \
            <input type="file" id="description-images-smallpromo" class="hide ie_show image-input empty-image" \
                name="description-images-smallpromo" \
                accept="image/png" \
                data-validation-callback-callback="appdfEditor.validationCallbackPromo" \
            /> \
            <img src="img/smallpromo_placeholder.png" id="description-images-largepromo-img" width="180" height="120"> \
            <p class="image-input-label"></p> \
            <div class="btn small-promo-image-reset">Reset small promo image</div> \
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
		setScreenshotsIndexList(e);
        return false;
    };
	
	function setScreenshotsIndexList(e) {
		var $screenshotsGroup = $(e.target).closest(".image-group").find(".image-input-group.not-empty-group");
		var currentIndex = 1;
		for (var i=0; i<$screenshotsGroup.length; i++) {
			$($screenshotsGroup[i]).data("index", currentIndex++);
		};
	};
	
    function onScreenshotImageInputMoveUp(e) {
        var $imageInputGroup = $(e.target).closest(".image-input-group");
        var $imageGroup = $imageInputGroup.parent();
        if ($imageInputGroup.prev().length>0) {
            $imageInputGroup.prev().before($imageInputGroup);
        };
		setScreenshotsIndexList(e);
        return false;
    };

    function onScreenshotImageInputMoveDown(e) {
        var $imageInputGroup = $(e.target).closest(".image-input-group");
        var $imageGroup = $imageInputGroup.parent();
        if ($imageInputGroup.next().length>0) {
            $imageInputGroup.next().after($imageInputGroup);
        };
		setScreenshotsIndexList(e);
        return false;
    };

    function onAppIconImageInputChange(e) {
        onImageInputChange(e);

        var $el = $(e.target);
        var $group = $el.closest(".image-input-group");
        var firstImage = $group.is(':first-child');

        if (!appdfLocalization.isDefaultLanguage($el) || !firstImage) {
            $group.find(".image-input-label").append($('&nbsp;<span><a href="#" class="btn btn-small image-input-remove">remove</a></span>'));
        };

        if ($group.parent().find("input.empty-image").length===0) {
            addMoreAppIcon($el);
        };    

        return false;
    };

    function onScreenshotImageInputChange(e) {
        onImageInputChange(e);
        
		var $el = $(e.target);
        if (appdfEditor.isNoFile($el[0])) {
            return false;
        };
        
        var $group = $el.closest(".image-input-group");

        $group.find(".image-input-label").append($('<span class="btn-group"> \
			<a href="#" class="btn btn-small image-input-remove">remove</a> \
			<a href="#" class="btn btn-small image-input-moveup">move up</a> \
			<a href="#" class="btn btn-small image-input-movedown">move down</a> \
			<a href="#" class="btn btn-small image-input-addindex">add other resolution</a></span>'));

		if (!$group.hasClass("not-empty-group")) {
			$group.addClass("not-empty-group");
		};
		
        if (!$group.parent().find(".image-input-group:not(.not-empty-group)").size()) {
            addMoreScreenshots($el);
        };
		
		setScreenshotsIndexList(e);
        return false; 
    };

    function onImageInputChange(e) {
        var $el = $(e.target);
        if (appdfEditor.isNoFile($el[0])) {
            return false;
        };
        
        var imageFileName = appdfEditor.getFileName($el[0]);
        var URL = window.webkitURL || window.mozURL || window.URL;    
        var file = appdfEditor.getFileContent($el[0]);
        if (typeof file==="undefined") {
            //error
            return false;
        };
        
        var imgUrl = URL.createObjectURL(file);
		
		$el.next().attr("src", imgUrl);
		$el.removeClass("empty-image");
        
        var $group = $el.closest(".image-input-group");
		$group.find(".image-input-label").html('<span class="label image-input-name"></span><span>&nbsp;&nbsp;</span>');

        var imgUrl = $el.next().attr("src");
        getImgSize(imgUrl, function(width, height) {
			$el.data("width", width).data("height", height);
            $group.find(".image-input-name").text(imageFileName + " " + width + "x" + height);
        });

        return false;
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
    
    function checkTransparency(imgSrc, oncheck) {
        var start = false;
        var context = null;
        var c = document.createElement("canvas");
        if (c.getContext) {
            context = c.getContext("2d");
            if (context.getImageData) {
                start = true;
            };
        };
        
        var loadImage = new Image();
        loadImage.style.position = "absolute";
        loadImage.style.left = "-10000px";
        loadImage.style.top = "-10000px";
        document.body.appendChild(loadImage);
        
        loadImage.onload = function() {
            var iWidth = this.offsetWidth;
            var iHeight = this.offsetHeight;
            
            if (start) {
                c.width = iWidth;
                c.height = iHeight;
                c.style.width = iWidth + "px";
                c.style.height = iHeight + "px";
                context.drawImage(this, 0, 0, iWidth, iHeight);
                try {
                    try {
                        var imgDat = context.getImageData(0, 0, iWidth, iHeight);
                    } catch (e) {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalBrowserRead");
                        var imgDat = context.getImageData(0, 0, iWidth, iHeight);
                    };
                } catch (e) {
                    oncheck(iWidth, iHeight, {
                        checked: false,
                        valid: true,
                        message: errorMessages.canvasNotSupported
                    });
                    document.body.removeChild(loadImage);
                    return;
                };
                
                var imgData = imgDat.data;
                for(var i=0, n=imgData.length; i<n; i+=4) {
                    if (imgData[i+3]===0) {
                        oncheck(iWidth, iHeight, {
                            checked: true,
                            valid: false,
                            message: errorMessages.imageHasTransparency
                        });
                        document.body.removeChild(loadImage);
                        return;
                    };
                };
                
                oncheck(iWidth, iHeight, {
                    checked: true,
                    valid: true,
                    message: ""
                });
            } else {
                oncheck(iWidth, iHeight, {
                    checked: false,
                    valid: true,
                    message: errorMessages.canvasNotSupported
                });
            };
            document.body.removeChild(loadImage);
        };
        loadImage.src = imgSrc;
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
        resetFirstAppIcon : resetFirstAppIcon,
		addMoreAppIcon : addMoreAppIcon,
		addMoreScreenshots : addMoreScreenshots,
		addScreenshotIndex: addScreenshotIndex,
        addLargePromo : addLargePromo,
        addSmallPromo : addSmallPromo,
        onAppIconImageInputChange : onAppIconImageInputChange,
        onScreenshotImageInputChange : onScreenshotImageInputChange,
        onImageInputChange : onImageInputChange,
        getImgSize : getImgSize,
        checkTransparency : checkTransparency
	};
 })();
 
 $(function() {
	appdfImages.init();
});