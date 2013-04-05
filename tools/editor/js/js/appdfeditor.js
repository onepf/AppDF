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

var firstApkFileData = {};
var globalUnigueCounter = 0;

function getUniqueId() {
    globalUnigueCounter += 1;
    return globalUnigueCounter;
};

$(document).ready(function() {
    zip.workerScriptsPath = "js/zip/";

    addValidationToElements($("input,textarea,select"));
});

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

