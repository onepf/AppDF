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
 * Parsers AppDF description.xml file and converts into JSON data
 * Depends on: jquery.js
 */
var appdfParser = (function() {
	function isDefined(x) {
		return (typeof x != "undefined");
	};

	function isUndefined(x) {
		return (typeof x === "undefined");
	};

	function parseDescriptionXML(xmlText, onend, onerror) {
		data = {};
		var $xml = $($.parseXML(xmlText));

		var errors = [];
		var curDataPath = "";
		var $curXml = $xml;

		function getElementsByPath($x, xmlPath) {
			var $cx = $x;
			var xmlPathElements = xmlPath.split("/");
		
			for (var i=0; i<xmlPathElements.length; i++) {
				if (xmlPathElements[i]!="") {
					$cx = $cx.children(xmlPathElements[i]);
				};
			};

			return $cx;
		};

		//Load helpder
		function loadHelper(dataPath, xmlPath, onsuccess) {
			if (isUndefined(xmlPath)) {
				xmlPath = dataPath;
			};
			var dataPathElements = (curDataPath+dataPath).split("/");

			var curData = data;
			for (var i=0; i<dataPathElements.length-1; i++) {
				if (isUndefined(curData[dataPathElements[i]])) {
					curData[dataPathElements[i]] = {};
				};
				curData = curData[dataPathElements[i]];
			};

			var $e = getElementsByPath($curXml, xmlPath);
			onsuccess(curData, dataPathElements[dataPathElements.length-1], $e);
		};

		//Load xml
		function loadXml(dataPath, xmlPath) {
			loadHelper(dataPath, xmlPath, function(d, name, $e) {
				if ($e.length>0) {
					var serializer = new XMLSerializer(); 
					var xmlString = serializer.serializeToString($e[0]);
					d[name] = xmlString;
				};
			});
		};
		
		function loadStoreSpecificContent() {
			loadHelper('', '*', function(d, name, $e) {
				for (var i = 0; i < $e.length; i++) {
					d[$e[i].nodeName] = getXmlContent($($e[i]).children());
				};
			});
		};
		
		function getXmlContent($e) {
			var serializer = new XMLSerializer(); 
			var xmlString = '';
			for (var i = 0; i < $e.length; i++) {
				xmlString += serializer.serializeToString($e[i]);
			};
			return xmlString;
		};
		
		//Load text
		function loadText(dataPath, xmlPath) {
			loadHelper(dataPath, xmlPath, function(d, name, $e) {
				if ($e.length>0) {
					d[name] = $e.text();
				};
			});
		};

		//Load array
		function loadArray(dataPath, xmlPath) {
			loadHelper(dataPath, xmlPath, function(d, name, $e) {
				d[name] = [];
				$e.each(function() {
					d[name].push($(this).text());
				});
			});
		};
		
		//Load object
		function loadObjectWithData(dataPath, xmlPath) {
			loadHelper(dataPath, xmlPath, function(d, name, $e) {
				if (!$e.length) {
					return;
				};
				
				d[name] = {};
				$e.each(function() {
					d[name][$(this).text()] = ($(this).text());
				});
			});
		};

		//Load yes/no attribute
		function loadBooleanAttribute(dataPath, xmlPath, attributeName) {
			loadHelper(dataPath, xmlPath, function(d, name, $e) {
				if ($e.length>0) {
					var attributeValue = $e.attr(attributeName);
					if (attributeValue=="yes") {
						d[name] = true;
					} else if (attributeValue=="no") {
						d[name] = false;
					} else {
						errors.push("Wrong attribute value \"" + attributeValue + "\" in tag <" + $e[0].tagName + ">. Must be \"yes\" or \"no\".");
					};
				};
			});
		};

		//Load yes/no tag
		function loadBoolean(dataPath, xmlPath) {
			loadHelper(dataPath, xmlPath, function(d, name, $e) {
				if ($e.length>0) {
					d[name] = $e.text();
				};
				if ($e.length>0) {
					var tagValue = $e.text();
					if (tagValue=="yes") {
						d[name] = true;
					} else if (tagValue=="no") {
						d[name] = false;
					} else {
						errors.push("Wrong value in tag <" + $e[0].tagName + ">. Must be \"yes\" or \"no\".");
					};
				};
			});
		};

		function section(dataPath, xmlPath, onsection) {
			function isString(o) {
				return typeof o == "string" || (typeof o == "object" && o.constructor === String);
			};
			var saveCurDataPath = curDataPath;
			var $saveCurXml = $curXml;
			curDataPath += dataPath;
			if (curDataPath[curDataPath.length-1]!="/") {
				curDataPath += "/";
			};
			if (isString(xmlPath)) {
				$curXml = getElementsByPath($curXml, xmlPath);
			} else {
				$curXml = xmlPath;			
			};
			onsection();
			curDataPath = saveCurDataPath;
			$curXml = $saveCurXml;
		};

		$curXml = getElementsByPath($xml, "application-description-file/application");

		//Categorization 
		section("categorization", "categorization", function() {
			loadText("type");
			loadText("category");
			loadText("subcategory");
		});

		function loadOneLanguageDescription() {
			section("texts/", "texts", function() {
				loadArray("title", "title");
				loadHelper("keywords", "keywords", function(d, name, $e) {
					d[name] = $e.text().split(/\s*,\s*/);
				});
				loadArray("short-description", "short-description");
				loadText("full-description", "full-description");
				loadArray("features", "features/feature");
				loadText("recent-changes", "recent-changes");
				loadText("privacy-policy", "privacy-policy");
				loadText("eula", "eula");
			});
			section("images/", "images", function() {
				loadHelper("app-icon", "app-icon", function(d, name, $e) {
					d[name] = [];
					$e.each(function() {
						var size = $(this).attr("size");
						d[name].push({
							"name" : $(this).text(),
							"size" : size
						});
					});
				});
				loadText("large-promo", "large-promo");
				loadText("small-promo", "small-promo");
				loadArray("screenshots", "screenshots/screenshot");
			});
			section("videos/", "videos", function() {
				loadText("youtube-video", "youtube-video");
			});
		};

		//Description
		section("description/default", "description", function() {
			loadOneLanguageDescription();
		});

		//Description localization
		var $dl = getElementsByPath($curXml, "description-localization");
		$dl.each(function() {
			var languageCode = $(this).attr("language");
			section("description/" + languageCode + "/", $(this), function() {
				loadOneLanguageDescription();
			});
		});

		//Price
		section("price", "price", function() {
			loadBooleanAttribute("free", "", "free");
			if (data["price"]["free"]) {
				loadHelper("trial-version", "trial-version", function(d, name, $e) {
					data["price"]["trial-version"] = ($e.length>0);
					var fullVersion = $e.attr("full-version");
					if (fullVersion) {
						data["price"]["full-version"] = fullVersion;
					};
				});
			} else {
				loadText("base-price", "base-price");

				//Load local prices
				loadHelper("local-price", "local-price", function(d, name, $e) {
					d[name] = {};
					$e.each(function() {
						var countryCode = $(this).attr("country");
						d[name][countryCode] = $(this).text();
					});
				});
			};
		});

		//Consent
		section("consent", "consent", function() {
			loadBoolean("google-android-content-guidelines");
			loadBoolean("us-export-laws");
			loadBoolean("slideme-agreement");
			loadBoolean("free-from-third-party-copytighted-content");
			loadBoolean("import-export");
		});

		//Customer Support
		section("customer-support", "customer-support", function() {
			loadText("phone");
			loadText("email");
			loadText("website");
		});

		//Content Description
		section("content-description", "content-description", function() {
			loadText("content-rating");
			loadHelper("rating-certificates", "rating-certificates/rating-certificate", function(d, name, $e) {
				d[name] = [];
				$e.each(function() {
					var ratingCertificate = {
						"rating" : $(this).text(),
						"type" : $(this).attr("type")
					};
					if ($(this).attr("certificate")) {
						ratingCertificate["certificate"] = $(this).attr("certificate");
					};
					if ($(this).attr("mark")) {
						ratingCertificate["mark"] = $(this).attr("mark");
					};
					d[name].push(ratingCertificate);
				});
			});
			section("content-descriptors", "content-descriptors", function() {
				loadText("cartoon-violence");
				loadText("realistic-violence");
				loadText("bad-language");
				loadText("fear");
				loadText("sexual-content");
				loadText("drugs");
				loadText("gambling-reference");
				loadText("alcohol");
				loadText("smoking");
				loadText("discrimination");
			});
			section("included-activities", "included-activities", function() {
				loadBoolean("in-app-billing");
				loadBoolean("gambling");
				loadBoolean("advertising");
				loadBoolean("user-generated-content");
				loadBoolean("user-to-user-communications");
				loadBoolean("account-creation");
				loadBoolean("personal-information-collection");
			});
		});

		//Testing Instructions
		loadText("testing-instructions", "testing-instructions");

		
		//Store specific
		section("store-specific/", "store-specific", function() {
			loadStoreSpecificContent();
		});
		
		
		//Requirements
		section("requirements", "requirements", function() {
			loadBoolean("features/root");
			loadBoolean("features/gms");
			loadBoolean("features/online");
			
			loadObjectWithData("supported-languages/language", "supported-languages/language");
			loadObjectWithData("supported-devices/exclude", "supported-devices/exclude");
			loadObjectWithData("supported-resolutions/include", "supported-resolutions/include");
		});
		
		
		//Todo: temporary XML loading instead of parsing content
		loadXml("availability", "availability");
		loadText("testing-instructions", "testing-instructions");

		
		errors.append(validateDescriptionXMLData(data));

		if (errors.length==0) {
			onend(data);
		} else {
			onerror(errors);
		};
	};

	Array.prototype.append = function(a) {
		for (var i=0; i<a.length; i++) {
			this.push(a[i]);
		};
	};

	function validateDescriptionXMLData(data) {
		var errors = [];

		errors.append(validateCategorization(data.categorization));
		errors.append(validateDescriptionTexts("default", data.description.default.texts));
		errors.append(validateDescriptionImages("default", data.description.default.images));
		errors.append(validateDescriptionVideos("default", data.description.default.videos));
		errors.append(validatePrice(data.price));
		errors.append(validateConsent(data["consent"]));
		errors.append(validateCustomerSupport(data["customer-support"]));
		errors.append(validateContentDescription(data["content-description"]));
		errors.append(validateTestingInstructions(data["testing-instructions"]));
		//errors.append(validateStoreSpecific(data["store-specific"]));
		
		return errors;
	};

	function validateCategorization(data) {
		var errors = [];

		if (isUndefined(dataCategories[data.type])) {
			errors.push("Unknown type \"" + data.type + "\"");
			return errors;
		};

		if (isUndefined(dataCategories[data.type][data.category])) {
			errors.push("Unknown category \"" + data.category + "\" for type \"" + data.type + "\"");
			return errors;
		};

		if (dataCategories[data.type][data.category].indexOf(data.subcategory)==-1) {
			errors.push("Unknown subcategory \"" + data.subcategory + "\" for category \"" + data.category + "\"");
			return errors;
		};

		return errors;
	};

	function validateDescriptionImages(languageCode, data) {
		var errors = [];
		return errors;
	};

	function validateDescriptionVideos(languageCode, data) {
		var errors = [];
		return errors;
	};

	function validateDescriptionTexts(languageCode, data) {
		var errors = [];

		if (isDefined(data["title"]) && data["title"][0].length>30) {
			errors.push("The first title must be shorter than 30 symbols (for language \"" + languageCode + "\")");
		};

		if (isDefined(data["short-description"]) && data["short-description"][0].length>80) {
			errors.push("The first short description must be shorter than 80 symbols (for language \"" + languageCode + "\")");
		};

		if (isDefined(data["full-description"]) && data["full-description"].length>4000) {
			errors.push("The full description must be shorter than 4000 symbols (for language \"" + languageCode + "\")");
		};

		if (isDefined(data.features)) {
			if (data.features.length>5) {
				errors.push("More than five features (for language \"" + languageCode + "\")");
			};
			if (data.features.length<3) {
				errors.push("There must be at least three features (for language \"" + languageCode + "\")");
			};
		};

		if (isDefined(data["privacy-policy"]) && data["privacy-policy"].length>500) {
			errors.push("Recent changes must be shorted than 500 symbols (for language \"" + languageCode + "\")");
		};

		return errors;
	};

	function validateConsent(data) {
		var errors = [];

		if (isUndefined(data["google-android-content-guidelines"])) {
			errors.push("Required <google-android-content-guidelines> tag in <consent> section is missing");
		};

		if (isUndefined(data["us-export-laws"])) {
			errors.push("Required <us-export-laws> tag in <consent> section is missing");
		};

		if (isUndefined(data["slideme-agreement"])) {
			errors.push("Required <slideme-agreement> tag in <consent> section is missing");
		};

		if (isUndefined(data["free-from-third-party-copytighted-content"])) {
			errors.push("Required <free-from-third-party-copytighted-content> tag in <consent> section is missing");
		};

		if (isUndefined(data["import-export"])) {
			errors.push("Required <import-export> tag in <consent> section is missing");
		};

		return errors;	
	};

	function validateNumber(value, errorMessage) {
		var patt = /^\d+\.\d+$|^\d+$/g;
		if (!patt.test(value)) {
			return [errorMessage];
		};
		return [];
	};

	function validatePackageName(value, errorMessage) {
		var patt = /^([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9\-]+$/g;
		if (!patt.test(value)) {
			return [errorMessage];
		};
		return [];
	};

	function validatePhoneNumber(value, errorMessage) {
		var patt = /^\+(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/g;
		if (!patt.test(value)) {
			return [errorMessage];
		};
		return [];
	};

	function validateEmail(value, errorMessage) {
		var patt = /^.*@.*$/g;
		if (!patt.test(value)) {
			return [errorMessage];
		};
		return [];
	};

	function validateURL(value, errorMessage) {
		var patt = /^((http|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?$/g;

		if (!patt.test(value)) {
			return [errorMessage];
		};
		return [];
	};

	function validateEnum(value, fieldName, enumArray) {
		var index = -1;
		for (var i=0; i<enumArray.length; i++) {
			if (enumArray[i]==value) {
				index = i;
			};
		};
		if (index<0) {
			return ["Wrong " + fieldName + " value \"" + value + "\". Must be one of " + enumArray.join(", ")];
		} else {
			return [];
		};
	};

	function validatePrice(data) {
		var errors = [];

		if (data["free"]) {
			if (isDefined(data["full-version"])) {
				errors.append(validatePackageName(data["full-version"], "Wrong package name format \"" + data["full-version"] + "\" in full version attribute"));	
			};
		} else {
			if (isUndefined(data["base-price"])) {
				errors.push("Required base price value is missing for paid product");
			} else {
				errors.append(validateNumber(data["base-price"], "Wrong price value \"" + data["base-price"] + "\". Must be a valid number like \"15.95\"."));	
			};
			
			
		};

		return errors;	
	};

	function validateCustomerSupport(data) {
		var errors = [];

		errors.append(validatePhoneNumber(data["phone"], "Wrong customer support phone number format. Only digits, brackets, spaces and dashes are allowed. Must be in international format like +1 (555) 123-45-67."));	
		errors.append(validateEmail(data["email"], "Wrong customer support email format. Must be a valid email address."));	
		errors.append(validateURL(data["website"], "Wrong customer support webpage format. Must be a valid URL."));	

		return errors;	
	};

	function validateContentDescription(data) {
		var errors = [];

		errors.append(validateEnum(data["content-rating"], "Content rating", [3,6,10,13,17,18]));	
		var yes_light_strong = ["no", "light", "strong"];
		errors.append(validateEnum(data["content-descriptors"]["cartoon-violence"], "cartoon violence", yes_light_strong));	
		errors.append(validateEnum(data["content-descriptors"]["realistic-violence"], "realistic violence", yes_light_strong));	
		errors.append(validateEnum(data["content-descriptors"]["bad-language"], "bad language", yes_light_strong));	
		errors.append(validateEnum(data["content-descriptors"]["fear"], "fear", yes_light_strong));	
		errors.append(validateEnum(data["content-descriptors"]["sexual-content"], "sexual content", yes_light_strong));	
		errors.append(validateEnum(data["content-descriptors"]["drugs"], "drugs", yes_light_strong));	
		errors.append(validateEnum(data["content-descriptors"]["gambling-reference"], "gambling reference", yes_light_strong));	
		errors.append(validateEnum(data["content-descriptors"]["alcohol"], "alcohol", yes_light_strong));	
		errors.append(validateEnum(data["content-descriptors"]["smoking"], "smoking", yes_light_strong));	
		errors.append(validateEnum(data["content-descriptors"]["discrimination"], "discrimination", yes_light_strong));	

		for (var i=0; i<data["rating-certificates"].length; i++) {
			var ratingCertificate = data["rating-certificates"][i];
			switch(ratingCertificate["type"]) {
				case "PEGI":
					errors.append(validateEnum(ratingCertificate["rating"], "PEGI rating certificate", ["3", "7", "12", "16", "18"]));
					break;
				case "ESRB":
					errors.append(validateEnum(ratingCertificate["rating"], "ESRB rating certificate", ["3", "6", "10", "13", "17", "18"]));
					break;
				case "GRB":
					errors.append(validateEnum(ratingCertificate["rating"], "GRB rating certificate", ["0", "12", "15", "18"]));
					break;
				case "CERO":
					errors.append(validateEnum(ratingCertificate["rating"], "CERO rating certificate", ["0", "12", "15", "17", "18"]));
					break;
				case "DEJUS":
					errors.append(validateEnum(ratingCertificate["rating"], "DEJUS rating certificate", ["0", "10", "12", "14", "16", "18"]));
					break;
				case "FSK":
					errors.append(validateEnum(ratingCertificate["rating"], "FSK rating certificate", ["0", "6", "12", "16", "18"]));
					break;
				default:
					errors.push("Wrong rating certificate type value \"" + ratingCertificate["type"] + "\". Must be one of 'PEGI', 'ESRB', 'GRB', 'CERO', 'DEJUS', 'FSK'");
			};
		};
		return errors;	
	};

	function validateTestingInstructions(data) {
		var errors = [];

		if (isUndefined(data)) {
			errors.push("Required <testing-instructions> tag is missing");
		} else { 
			if (data.length>4000) {
				errors.push("The testing instruction text must be shorter than 4000 symbols");
			};
		};

		return errors;	
	};

	function validateStoreSpecific(data) {
		//nothing to do.
		return [];
	};
	
	
    return {
        parseDescriptionXML : parseDescriptionXML
    };
})();


