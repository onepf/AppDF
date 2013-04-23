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
    canvasNotSupported: "Your browser doesn`t support canvas",
    fileReaderNotSupported: "Your browser doesn`t support FileReader",
    imageHasTransparency: "Image has transparency",
    
    privacypolicyNotBothFilled: "Privacy policy should include both link and full text",
    eulaNotBothFilled: "End user license agreement should include both link and full text",
    smallPromoWrongSize: "Small promotion image size must be 180x120",
    largePromoWrongSize: "Large promotion image size must be 1024x500",
    screenshotLeastCount: "At least 4 screenshots are required",
    screenshotRequired: "Screenshot is required",
    screenshowWrongSize: "Wrong screenshot size",
    deviceAlreadyExist: "This device already exists",
    appIconRequired: "Application icon is required",
    appIconSize512: "Application icon size must be 512x512",
    appIconSizeSquare: "Application icon must be square",
    APKfileRequired: "APK file is required",
    APKfileSize50M: "APK file size cannot exceed 50M",
    APKfileWrongPackageName: "APK file package names do not match",
    storeExist: "This store already exists",
    applicationNameWrong: "Application store name could contain only small English letters without special symbols",
    wrongYoutubeFormat: "Wrong YouTube video ID format. Do not place entire URL but just ID (which is usualy written in URL after 'v='",
    wrongCategorization: "Wrong categorisation",
    wrongCustomerPhone: "Wrong customer support phone number format. Only digits, brackets, spaces and dashes are allowed. Must be in international format like +1 (555) 123-45-67.",
    wrongCustomerEmail: "Wrong customer support email format. Must be a valid email address.",
    wrongCustomerWebPage: "Wrong customer support webpage format. Must be a valid URL.",
    
    //incode html in appdfeditor2.js
    keywordRequired: "Keyword cannot be empty. Remove keyword input if you do not need it.",
    pricePattern: "Wrong price value. Must be a valid number like 15.95.",
    
    //loading errors
    selectAppDFFile: "Please select AppDF file",
    errorCreatingAppDFFile: "Cant create AppDF file",
    notZipFile: "AppDF not in zip format",
    descriptionIsNotXML: "description.xml file is not XML",
    descriptionNotFound: "description.xml file is not found inside AppDF container",
    
    //validation in parser
    requiredGoogleAndroidTagMiss: "Required <google-android-content-guidelines> tag in <consent> section is missing",
    requiredUSExportLawsTagMiss: "Required <us-export-laws> tag in <consent> section is missing",
    requiredSlideMeTagMiss: "Required <slideme-agreement> tag in <consent> section is missing",
    requiredFree3PartyTagMiss: "Required <free-from-third-party-copytighted-content> tag in <consent> section is missing",
    requiredImportExportTagMiss: "Required <import-export> tag in <consent> section is missing",
    availabilityPerionError: "Availability period since date must be earlier than until date",
    
    //fn
    fnResourceNotFound: function(name) { return name + " not found"; },
    fnFileErrorAndCode: function(fileName, errorCode) { return fileName + " file could not be read. Code " + errorCode; },
    fnWrongAttribute: function(tagName, name) { return "Tag <" + tagName + "> doesn`t have attribute \"" + name + "\""; },
    fnWrongAttrBooleanValue: function(attributeValue, tagName) { return "Wrong attribute value \"" + attributeValue + "\" in tag <" + tagName + ">. Must be \"yes\" or \"no\"."; },
    fnWrongBooleanValue: function(tagName) { return "Wrong value in tag <" + tagName + ">. Must be \"yes\" or \"no\"."; },
    
    fnTitleRequiredError: function(languageCode) { return "The first title required (for language \"" + languageCode + "\")"; },
    fnTitleError: function(languageCode) { return "The first title must be shorter than 30 symbols (for language \"" + languageCode + "\")"; },
    fnShortDescriptionError: function(languageCode) { return "The first short description must be shorter than 80 symbols (for language \"" + languageCode + "\")"; },
    fnFullDescriptionError: function(languageCode) { return "The full description must be shorter than 4000 symbols (for language \"" + languageCode + "\")"; },
    
    fnFeatureMaxError: function(languageCode) { return "More than five features (for language \"" + languageCode + "\")"; },
    fnFeatureMinError: function(languageCode) { return "There must be at least three features (for language \"" + languageCode + "\")"; },
    fnRecentChangesError: function(languageCode) { return "Recent changes must be shorted than 500 symbols (for language \"" + languageCode + "\")"; },
    
    fnUnableAccessImageData: function(error) { return "Unable to access image data: " + error; },
    
    fnWrongTag: function(wrongTag, where) { return "Wrong tag " + wrongTag + " in " + where + " found"; },
    fnWrongCountryCode: function(countryCode) { return "Wrong country code " + countryCode; },
    fnWrongLanguageCode: function(languageCode) { return "Wrong language code " + languageCode; },
    
    fnUnknownType: function(type) { return "Unknown type \"" + type + "\""; },
    fnUnknownCategory: function(category, type) { return "Unknown category \"" + category + "\" for type \"" + type + "\""; },
    fnUnknownSubCategory: function(subcategory, category) { return "Unknown subcategory \"" + subcategory + "\" for category \"" + category + "\""; },
    fnStoreSpecificXMLError: function(storeSpecificID) { return "Store Specific '" + storeSpecificID + "' - invalid XML"; },
    fnDublikateRes: function(resName) { return "Dublicated resource " + resName; }
};