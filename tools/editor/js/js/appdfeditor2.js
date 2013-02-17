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

$(function() {

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
        });

        $('body').on('click', '.pretty-file-button', function(e) {
            $(e.target).closest(".file-input-group").find(".pretty-file-file").click();
        });

        $('body').on('change', '.pretty-file-file', function(e) {
            var fileName = $(e.target).val();
            fileName = fileName.replace("C:\\fakepath\\", "");
            $(e.target).closest(".file-input-group").find(".pretty-file-input").val(fileName);
        });
    };

    function init() {
        initRatingCertificate();
        initMenuStickToTop();
        initScrollspy();
    };

    init();
 });

