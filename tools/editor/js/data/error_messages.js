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

var errorMessages = {
    privacypolicyNotBothFilled: "Privacy policy should include both link and full text",
    eulaNotBothFilled: "End user license agreement should include both link and full text",
    smallPromoWrongSize: "Small promotion image size must be 180x120",
    largePromoWrongSize: "Large promotion image size must be 1024x500",
    screenshotRequired: "Screenshot is required",
    screenshowWrongSize: "Wrong screenshot size",
    deviceAlreadyExist: "This device already exists",
    appIconRequired: "Application icon is required",
    appIconSize512: "Application icon size must be 512x512",
    APKfileRequired: "APK file is required",
    APKfileSize50M: "APK file size cannot exceed 50M",
    APKfileWrongPackageName: "APK file package names do not match",
    storeExist: "This store already exists",
    applicationNameWrong: "Application store name could contain only small English letters without special symbols",
    
    //incode html in appdfeditor2.js
    keywordRequired: "Keyword cannot be empty. Remove keyword input if you do not need it.",
    pricePattern: "Wrong price value. Must be a valid number like 15.95.",
    
    //loading errors
    selectAppDFFile: "Please select AppDF file",
    notZipFile: "AppDF not in zip format",
    descriptionIsNotXML: "description.xml file is not XML",
    descriptionNotFound: "description.xml file is not found inside AppDF container",
    fileErrorAndCode: /*here file name*/" file could not be read. Code "/*here error code*/,
    wrongLanguageCode: "Wrong language code",
    resourceNotFound: /*filename*/" not found"
};