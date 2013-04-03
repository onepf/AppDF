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

	function parseDescriptionXML(xmlText, onend, onerror, onprogress) {
        //Calculate total number of actions to do
        var totalProgressItems = 14;
        var passedProgressItems = 0;
        //to set progressbar max value to 50% for parsing
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
        
		data = {};
        var $xml;
        try {
            $xml = $($.parseXML(xmlText));
        } catch(e) {
            onerror([errorMessages.descriptionIsNotXML]);
            return false;
        };
        progress();//1
        
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

		//Load text attribute
		function loadTextAttribute(dataPath, xmlPath, attributeName) {
			loadHelper(dataPath, xmlPath, function(d, name, $e) {
				if ($e.length>0) {
					var attributeValue = $e.attr(attributeName);
					if (typeof attributeValue!=="undefined" && attributeValue!==false) {
						d[name] = attributeValue;
					} else {
						errors.push(errorMessages.fnWrongAttribute($e[0].tagName, name));
					};
				};
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
                        errors.push(errorMessages.fnWrongAttrBooleanValue(attributeValue, $e[0].tagName));
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
                        errors.push(errorMessages.fnWrongBooleanValue($e[0].tagName));
					};
				};
			});
		};

		function section(dataPath, xmlPath, onsection) {
			function isString(o) {
				return typeof o == "string" || (typeof o == "object" && o.constructor === String);
			};
			var $saveCurXml = $curXml;
			var saveCurDataPath = curDataPath;
			if (isString(xmlPath)) {
				$curXml = getElementsByPath($curXml, xmlPath);
			} else {
				$curXml = xmlPath;			
			};
            if ($curXml.length) {
                curDataPath += dataPath;
                if (curDataPath[curDataPath.length-1]!="/") {
                    curDataPath += "/";
                };
                
                onsection();
            };
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
        progress();//2
        
		function loadOneLanguageDescription() {
			section("texts/", "texts", function() {
				loadArray("title", "title");
				loadHelper("keywords", "keywords", function(d, name, $e) {
					d[name] = $e.text().split(/\s*,\s*/);
				});
				loadArray("short-description", "short-description");
				
                //loadXml("full-description", "full-description");
                loadText("full-description", "full-description");
                
				loadArray("features", "features/feature");
				loadText("recent-changes", "recent-changes");
                
				loadTextAttribute("privacy-policy-link", "privacy-policy", "href");
				loadText("privacy-policy", "privacy-policy");
                
				loadTextAttribute("eula-link", "eula", "href")
				loadText("eula", "eula");
			});
			section("images/", "images", function() {
				loadHelper("app-icon", "app-icon", function(d, name, $e) {
					d[name] = [];
					$e.each(function() {
						d[name].push({
							"name" : $(this).text(),
							"width" : $(this).attr("width"),
							"height" : $(this).attr("height")
						});
					});
				});
                
				loadHelper("large-promo", "large-promo", function(d, name, $e) {
					d[name] = null;
					$e.each(function() {
						d[name] = {
							"name" : $(this).text(),
							"width" : $(this).attr("width"),
							"height" : $(this).attr("height")
						};
					});
				});
                
                loadHelper("small-promo", "small-promo", function(d, name, $e) {
					d[name] = null;
					$e.each(function() {
						d[name] = {
							"name" : $(this).text(),
							"width" : $(this).attr("width"),
							"height" : $(this).attr("height")
						};
					});
				});
                
				loadHelper("screenshots", "screenshots/screenshot", function(d, name, $e) {
					d[name] = [];
					$e.each(function() {
						d[name].push({
							"name" : $(this).text(),
							"width" : $(this).attr("width"),
							"height" : $(this).attr("height"),
							"index" : $(this).attr("index")
						});
					});
				});
			});
            
			section("videos/", "videos", function() {
				loadText("youtube-video", "youtube-video");
                loadArray("video-file", "video-file");
			});
		};

		//Description
		section("description/default", "description", function() {
			loadOneLanguageDescription();
            totalProgressItems += 5 * 2;
		});
        progress(5);//5 + 2
        
		//Description localization
		var $dl = getElementsByPath($curXml, "description-localization");
		$dl.each(function() {
			var languageCode = $(this).attr("language");

			section("description/" + languageCode + "/", $(this), function() {
				loadOneLanguageDescription();
                totalProgressItems += 5 * 2;
			});
            progress(5);//LanguageCode*5 + 2
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
        progress();//LanguageCode*5 + 3
        
		//Consent
		section("consent", "consent", function() {
			loadBoolean("google-android-content-guidelines");
			loadBoolean("us-export-laws");
			loadBoolean("slideme-agreement");
			loadBoolean("free-from-third-party-copytighted-content");
			loadBoolean("import-export");
		});
        progress();//LanguageCode*5 + 4
        
		//Customer Support
		section("customer-support", "customer-support", function() {
			loadText("phone");
			loadText("email");
			loadText("website");
		});
        progress();//LanguageCode*5 + 5

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
            progress();//LanguageCode*5 + 6
            
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
            progress();//LanguageCode*5 + 7
            
			section("included-activities", "included-activities", function() {
				loadBoolean("in-app-billing");
				loadBoolean("gambling");
				loadBoolean("advertising");
				loadBoolean("user-generated-content");
				loadBoolean("user-to-user-communications");
				loadBoolean("account-creation");
				loadBoolean("personal-information-collection");
			});
            progress();//LanguageCode*5 + 8
		});

		//Testing Instructions
		loadText("testing-instructions", "testing-instructions");
        progress();//LanguageCode*5 + 9
		
		//Store specific
		section("store-specific/", "store-specific", function() {
			loadStoreSpecificContent();
		});
        progress();//LanguageCode*5 + 10
		
		//Requirements
		section("requirements", "requirements", function() {
			loadBoolean("features/root");
			loadBoolean("features/gms");
			loadBoolean("features/online");
			
			loadObjectWithData("supported-languages/language", "supported-languages/language");
			loadObjectWithData("supported-devices/exclude", "supported-devices/exclude");
			
			section("supported-resolutions/", "supported-resolutions", function() {
				loadBooleanAttribute("only-listed", "", "only-listed");
				
				if (data["requirements"]["supported-resolutions"]["only-listed"]) {
					loadObjectWithData("include", "include");
				} else {
					loadObjectWithData("exclude", "exlude");
				};
			});
		});
        progress();//LanguageCode*5 + 11
        
        section("apk-files/", "apk-files", function() {
            loadArray("apk-file", "apk-file");
        });
        progress();//LanguageCode*5 + 12
        
        section("availability", "availability", function() {
            section("countries", "countries", function() {
                loadBooleanAttribute("only-listed", "", "only-listed");
                
                if (data["availability"]["countries"]["only-listed"]) {
                    loadObjectWithData("include", "include");
				} else {
					loadObjectWithData("exclude", "exlude");
                };
            });
            
            section("period", "period", function() {
                loadHelper("since", "since", function(d, name, $e) {
                    var year = $($e).attr("year");
                    var month = $($e).attr("month");
                    var day = $($e).attr("day");
                    d[name] = new Date(year, month, day, 0, 0, 0, 0);
                });
                
                loadHelper("until", "until", function(d, name, $e) {
                    var year = $($e).attr("year");
                    var month = $($e).attr("month");
                    var day = $($e).attr("day");
                    d[name] = new Date(year, month, day, 0, 0, 0, 0);
                });
            });
        });
        progress();//LanguageCode*5 + 13
        
		loadText("testing-instructions", "testing-instructions");
        progress();//LanguageCode*5 + 14

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
        errors.append(validateLanguageCode(data.description));
        
        for (var i in data.description) {
            if (data.description[i]["texts"]) {
                errors.append(validateDescriptionTexts(i, data.description[i].texts));
            };
            if (data.description[i]["images"]) {
                errors.append(validateDescriptionImages(i, data.description[i].images));
            };
            if (data.description[i]["videos"]) {
                errors.append(validateDescriptionVideos(i, data.description[i].videos));
            };
        };
		errors.append(validatePrice(data.price));
		errors.append(validateConsent(data["consent"]));
		errors.append(validateCustomerSupport(data["customer-support"]));
		errors.append(validateContentDescription(data["content-description"]));
        errors.append(validateAvailabilityPeriod(data));
		errors.append(validateTestingInstructions(data["testing-instructions"]));
		errors.append(validateStoreSpecific(data["store-specific"]));
		
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

    function validateLanguageCode(data) {
        var errors = [];
        
        for (var languageCode in data) {
            if (languageCode!=="default" && isUndefined(dataLanguages[languageCode])) {
                errors.push(errorMessages.wrongLanguageCode);
            };
        };
        
        return errors;
    };
    
    function validateCountryCode(data) {
        var errors = [];
        
        for (var countryCode in data) {
            if (isUndefined(countryCode[languageCode])) {
                errors.push(errorMessages.wrongLanguageCode);
            };
        };
        
        return errors;
    };
    
    function validateDescriptionVideos(languageCode, data) {
        var errors = [];
        
        if (data["video-file"]) {
            var videoList = data["video-file"];
            
            if (videoList.length) {
                for (var i=0; i<videoList.length; i++) {
                    if (isUndefined(appdfXMLLoader.appdfFiles[videoList[i]])) {
                        errors.push(errorMessages.fnResourceNotFound(videoList[i]));
                    };
                };
            };
        };
        
        return errors;
    };
    
	function validateDescriptionImages(languageCode, data) {
		var errors = [];
        
        var appIconList = data["app-icon"];
        if (appIconList.length) {
            for (var i=0; i<appIconList.length; i++) {
                if (isUndefined(appdfXMLLoader.appdfFiles[appIconList[i].name])) {
                    errors.push(errorMessages.fnResourceNotFound(appIconList[i].name));
                };
            };
        };
        
        var screenshotList = data["screenshots"];
        if (screenshotList.length) {
            for (var i=0; i<screenshotList.length; i++) {
                if (isUndefined(appdfXMLLoader.appdfFiles[screenshotList[i].name])) {
                    errors.push(errorMessages.fnResourceNotFound(screenshotList[i].name));
                };
            };
        };
        
        var largePromo = data["large-promo"];
        if (largePromo) {
            if (isUndefined(appdfXMLLoader.appdfFiles[largePromo.name])) {
                errors.push(errorMessages.fnResourceNotFound(largePromo.name));
            };
        };
        
        var smallPromo = data["small-promo"];
        if (smallPromo) {
            if (isUndefined(appdfXMLLoader.appdfFiles[smallPromo.name])) {
                errors.push(errorMessages.fnResourceNotFound(smallPromo.name));
            };
        };
        
		return errors;
	};

	function validateDescriptionTexts(languageCode, data) {
		var errors = [];

		if (isDefined(data["title"]) && data["title"][0].length>30) {
			errors.push(errorMessages.fnTitleError(languageCode));
		};

		if (isDefined(data["short-description"]) && data["short-description"][0].length>80) {
			errors.push(errorMessages.fnShortDescriptionError(languageCode));
		};
        
        //TODO check for tags
		if (isDefined(data["full-description"]) && data["full-description"].length>4000) {
			errors.push(errorMessages.fnFullDescriptionError(languageCode));
		};

		if ((isDefined(data["eula"]) && data["eula"].length && (isUndefined(data["eula-link"]) || data["eula-link"].length===0)) ||
            (isDefined(data["eula-link"]) && data["eula-link"].length && (isUndefined(data["eula"]) || data["eula"].length===0))) {
			errors.push(errorMessages.eulaNotBothFilled);
		};

		if ((isDefined(data["privacy-policy"]) && data["privacy-policy"].length && (isUndefined(data["privacy-policy-link"]) || data["privacy-policy-link"].length===0)) ||
            (isDefined(data["privacy-policy-link"]) && data["privacy-policy-link"].length && (isUndefined(data["privacy-policy"]) || data["privacy-policy"].length===0))) {
			errors.push(errorMessages.privacypolicyNotBothFilled);
		};

		if (isDefined(data.features)) {
			if (data.features.length>5) {
				errors.push(errorMessages.fnFeatureMaxError(languageCode));
			};
			if (data.features.length<3) {
				errors.push(errorMessages.fnFeatureMinError(languageCode));
			};
		};

		if (isDefined(data["recent-changes"]) && data["recent-changes"].length>500) {
			errors.push(errorMessages.fnRecentChangesError(languageCode));
		};

		return errors;
	};

	function validateConsent(data) {
		var errors = [];

		if (isUndefined(data["google-android-content-guidelines"])) {
			errors.push(errorMessages.requiredGoogleAndroidTagMiss);
		};

		if (isUndefined(data["us-export-laws"])) {
			errors.push(errorMessages.requiredUSExportLawsTagMiss);
		};

		if (isUndefined(data["slideme-agreement"])) {
			errors.push(errorMessages.requiredSlideMeTagMiss);
		};

		if (isUndefined(data["free-from-third-party-copytighted-content"])) {
			errors.push(errorMessages.requiredFree3PartyTagMiss);
		};

		if (isUndefined(data["import-export"])) {
			errors.push(errorMessages.requiredImportExportTagMiss);
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
    
    function validateAvailabilityPeriod(data) {
        var errors = [];
        
        if (data["availability"] && data["availability"]["period"]) {
            var dataPeriod = data["availability"]["period"];
            if (isDefined(dataPeriod["since"]) && isDefined(dataPeriod["until"]) && dataPeriod["since"].valueOf()>=dataPeriod["until"].valueOf()) {
                errors.push(errorMessages.availabilityPerionError);
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


