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
 * Generating description.xml XML from the AppDF editor HTML5 page
 * Depends on: jquery.js, xmlgenerator.js,
 */

var appdfXMLSaver = (function() {

	function generateCategorizationXML(xml) {
		xml.addTag("<categorization>", function() {
			xml.addTag("<type>", $("#categorization-type").val());
			xml.addTag("<category>", $("#categorization-category").val());
			xml.addTag("<subcategory>", $("#categorization-subcategory").val());
		});
	};

	function generateOneLanguageTextDescription(languageCode, xml) {
		$parent = $("#localization-tab-" + languageCode);

		xml.addTag("<texts>", function() {
			//Title
			xml.addNonEmptyTextTag("<title>", $parent.find("#description-texts-title").val());
			$parent.find("input[id^=description-texts-title-more-]").each(function() {
				xml.addNonEmptyTextTag("<title>", $(this).val());
			});

			//Keywords
			var keywords = [];
			$parent.find("input[id^=description-texts-keywords]").each(function() {
				if ($(this).val() !== "") {
					keywords.push($(this).val());
				};
			});
			xml.addNonEmptyTextTag("<keywords>", keywords.join(","));

			//Short description
			xml.addNonEmptyTextTag("<short-description>", $parent.find("#description-texts-shortdescription").val());
			$parent.find("input[id^=description-texts-shortdescription-more-]").each(function() {
				xml.addNonEmptyTextTag("<short-description>", $(this).val());
			});

			//Full description
			xml.addNonEmptyTextTag("<full-description>", $parent.find("#description-texts-fulldescription").val());

			//Features
			var $features = $parent.find("input[id^=description-texts-features-]");
			var anyNonEmptyFeature = false;
			$features.each(function() {
				if ($(this).val()!="") {
					anyNonEmptyFeature = true;
				};
			});
			if (anyNonEmptyFeature) {
				xml.addTag("<features>", function() {
					$features.each(function() {
						xml.addNonEmptyTextTag("<feature>", $(this).val());
					});
				});
			};

			//Recent changes
			var strRecentChanges = $parent.find("#description-texts-recentchanges").val();
			if (strRecentChanges!="") {
				xml.addNonEmptyTextTag("<recent-changes>", strRecentChanges);		
			};

			//Privacy policy and EULA links
			var strPrivacyPolicy = $parent.find("#description-texts-privacypolicy").val();
			var strEULA = $parent.find("#description-texts-eula").val();
			if (strPrivacyPolicy!="") {
				xml.addNonEmptyTextTag("<privacy-policy>", strPrivacyPolicy);		
			};
			if (strEULA!="") {
				xml.addNonEmptyTextTag("<eula>", strEULA);		
			};
		});	
	};

	function generateOneLanguageImageDescription(languageCode, xml) {
		$parent = $("#localization-tab-" + languageCode);
		var $screenshots = $parent.find("input[id^=description-images-screenshot]").not('[value=]');

		//We calculate total number of images to check if this section is empty
		var numberOfImages = 0;
		numberOfImages += $screenshots.length;
		if ($parent.find("input[id^=description-images-appicon]").val()) {
			numberOfImages += 1;
		};
		if ($parent.find("#description-images-largepromo").val()) {
			numberOfImages += 1;
		};
		if ($parent.find("#description-images-smallpromo").val()) {
			numberOfImages += 1;
		};

		if (numberOfImages>0) {
			xml.addTag("<images>", function() {
				$parent.find("input[id^=description-images-appicon]").each(function() {
					xml.addNonEmptyTextTag("<app-icon>", appdfEditor.normalizeInputFileName($(this).val()));
				});

				xml.addNonEmptyTextTag("<large-promo>", appdfEditor.normalizeInputFileName($parent.find("#description-images-largepromo").val()));
				xml.addNonEmptyTextTag("<small-promo>", appdfEditor.normalizeInputFileName($parent.find("#description-images-smallpromo").val()));

				if ($screenshots.length>0) {
					xml.addTag("<screenshots>", function() {
						$screenshots.each(function() {
							xml.addNonEmptyTextTag("<sccreenshot>", appdfEditor.normalizeInputFileName($(this).val()));
						});
					});
				};
			});	
		};
	};

	function generateOneLanguageVideoDescription(languageCode, xml) {
		$parent = $("#localization-tab-" + languageCode);

		var numberOfVideos = 0;
		if ($parent.find("#description-videos-youtubevideo").val()) {
			numberOfVideos += 1;
		};
		if (numberOfVideos>0) {
			xml.addTag("<videos>", function() {
				xml.addNonEmptyTextTag("<youtube-video>", $parent.find("#description-videos-youtubevideo").val());
			});	
		};
	};

	function generateOneLanguageDescription(languageCode, xml) {
		generateOneLanguageTextDescription(languageCode, xml);
		generateOneLanguageImageDescription(languageCode, xml);
		generateOneLanguageVideoDescription(languageCode, xml);
	};

	function generateDescriptionXML(xml) {
		xml.addTag("<description>", function() {
			generateOneLanguageDescription("default", xml);
		});
	};

	function generateDescriptionLocalizationsXML(xml) {
		var languages = appdfLocalization.getDescriptionLanguages();
		for (var i=0; i<languages.length; i++) {
			var languageCode = languages[i];
			if (languageCode!="default") {
				xml.addTag("<description-localization language=\"" + languageCode + "\">", function() {
					generateOneLanguageDescription(languageCode, xml);
				});
			};
		};
	};

	function generateCustomerSupportXML(xml) {
		xml.addTag("<customer-support>", function() {
			xml.addTag("<phone>", $("#customersupport-phone").val());
			xml.addTag("<email>", $("#customersupport-email").val());
			xml.addTag("<website>", $("#customersupport-website").val());
		});
	};

	function isCheckboxChecked(id) {
		return document.getElementById(id).checked ? "yes" : "no";
	}

	function generateConsentXML(xml) {
		xml.addTag("<consent>", function() {
			xml.addTag("<google-android-content-guidelines>", isCheckboxChecked("consent-googleandroidcontentguidelines"));
			xml.addTag("<us-export-laws>", isCheckboxChecked("consent-usexportlaws"));
			xml.addTag("<slideme-agreement>", isCheckboxChecked("consent-slidemeagreement"));
			xml.addTag("<free-from-third-party-copytighted-content>", isCheckboxChecked("consent-freefromthirdpartycopytightedcontent"));
			xml.addTag("<import-export>", isCheckboxChecked("consent-importexportlaws"));
		});
	};

	function generateApkFilesXML(xml) {
		xml.addTag("<apk-files>", function() {
			$("section#section-apk-files").find("input:file").each(function() {
				xml.addTag("<apk-file>", appdfEditor.normalizeInputFileName($(this).val()));
			});
		});
	};

	function generatePriceXML(xml) {
		var free = $("section#section-price").find("li.active").find("a").attr("href") == "#tab-price-free";
		var freeAttribute = free ? "yes" : "no";
		xml.addTag("<price free=\"" + freeAttribute + "\">", function() {
			if (free) {
				var trialVersion = $("#price-free-trialversion").attr("checked");
				if (trialVersion=="checked") {
					if ($("#price-free-fullversion").val()!="") {
						xml.addTag("<trial-version full-version=\"" + $("#price-free-fullversion").val() + "\">", "");
					} else {
						xml.addTag("<trial-version>", "")
					};
				};
			} else {
				xml.addTag("<base-price>", $("#price-baseprice").val())
				$("section#section-price").find("input[id^=price-localprice-]").each(function() {
					var countryCode = $(this).closest("div.control-group").find("select").val();
					xml.addTag("<local-price country=\"" + countryCode + "\">", $(this).val());
				});
			};
		});
	};

	function generateContentDescriptionXML(xml) {
		xml.addTag("<content-description>", function() {
			xml.addTag("<content-rating>", $("#contentdescription-contentrating").val());

			var $certificateRatings = $("#contentdescription-ratingcertificates").find("select[id^=contentdescription-ratingcertificates-rating-]");
			var anyCertificate = false;
			$certificateRatings.each(function() {
				if ($(this).val()) {
					anyCertificate = true;
				};
			});		
			if (anyCertificate) {
				xml.addTag("<rating-certificates>", function() {
					$certificateRatings.each(function() {
						if ($(this).val()) {
							var $tr = $(this).closest("tr");
							var attributes = " type=\"" + $tr.find("a.contentdescription-ratingcertificates-type").text() + "\"";
							var $certificate = $tr.find("input[id^=contentdescription-ratingcertificates-certificate-]");
							if ($certificate.val()) {
								attributes += " certificate=\"" + appdfEditor.normalizeInputFileName($certificate.val()) + "\"";
							};
							var $mark = $tr.find("input[id^=contentdescription-ratingcertificates-mark-]");
							if ($mark.val()) {
								attributes += " mark=\"" + appdfEditor.normalizeInputFileName($mark.val()) + "\"";
							};
							xml.addTag("<rating-certificate" + attributes + ">", $(this).val());
						};
					});
				});
			};

			xml.addTag("<content-descriptors>", function() {
				xml.addTag("<cartoon-violence>", $("#contentdescription-contentdescriptors-cartoonviolence").val());
				xml.addTag("<realistic-violence>", $("#contentdescription-contentdescriptors-realisticviolence").val());
				xml.addTag("<bad-language>", $("#contentdescription-contentdescriptors-badlanguage").val());
				xml.addTag("<fear>", $("#contentdescription-contentdescriptors-fear").val());
				xml.addTag("<sexual-content>", $("#contentdescription-contentdescriptors-sexualcontent").val());
				xml.addTag("<drugs>", $("#contentdescription-contentdescriptors-drugs").val());
				xml.addTag("<gambling-reference>", $("#contentdescription-contentdescriptors-gamblingreference").val());
				xml.addTag("<alcohol>", $("#contentdescription-contentdescriptors-alcohol").val());
				xml.addTag("<smoking>", $("#contentdescription-contentdescriptors-smoking").val());
				xml.addTag("<discrimination>", $("#contentdescription-contentdescriptors-discrimination").val());
			});

			xml.addTag("<included-activities>", function() {
				xml.addTag("<in-app-billing>", isCheckboxChecked("contentdescription-includedactivities-inappbilling"));
				xml.addTag("<gambling>", isCheckboxChecked("contentdescription-includedactivities-gambling"));
				xml.addTag("<advertising>", isCheckboxChecked("contentdescription-includedactivities-advertising"));
				xml.addTag("<user-generated-content>", isCheckboxChecked("contentdescription-includedactivities-usergeneratedcontent"));
				xml.addTag("<user-to-user-communications>", isCheckboxChecked("contentdescription-includedactivities-usertousercommunications"));
				xml.addTag("<account-creation>", isCheckboxChecked("contentdescription-includedactivities-accountcreation"));
				xml.addTag("<personal-information-collection>", isCheckboxChecked("contentdescription-includedactivities-personalinformationcollection"));
			});
		});
	};

	function generateAvailabilityXML(xml) {
		xml.addString($("#availability").val());
	};

	function generateRequirementsXML(xml) {
		var anyFeatureChecked = $('#requirements-features-root:checked').size() || $('#requirements-features-gms:checked').size() 
			|| $('#requirements-features-online:checked').size();
		
		var $selectedSupportedLanguages = $('#section-requirements input:checked[id^="requirements-supportedlanguages-"][type="checkbox"]');
		var $unsupportedDevices = $('#section-requirements input[name^="unsupport-device-name-"]');
		var $selectedSupportedResolutions = $('#section-requirements input:checked[id^="requirements-supportedresolutions-"][type="checkbox"]');
		
		if (!anyFeatureChecked && !$selectedSupportedLanguages.size() && !$selectedSupportedResolutions.size()) {
			return;
		};
		
		xml.addTag("<requirements>", function() {
			if (anyFeatureChecked) {
				xml.addTag("<features>", function() {
					xml.addTag("<root>", isCheckboxChecked("requirements-features-root"));
					xml.addTag("<gms>", isCheckboxChecked("requirements-features-gms"));
					xml.addTag("<online>", isCheckboxChecked("requirements-features-online"));
				});
			};
			
			if ($selectedSupportedLanguages.size() && $('#requirements-supportedlanguages-type-custom:checked').size()) {
				xml.addTag("<supported-languages>", function() {
					var languageName;
					$selectedSupportedLanguages.each(function() {
						languageName = $(this).attr('id').split('-')[2];
						xml.addTag("<language>", languageName);
					});
				});
			};
			
			if ($unsupportedDevices.size()) {
				xml.addTag("<supported-devices>", function() {
					$unsupportedDevices.each(function() {
						xml.addTag("<exclude>", $(this).val());
					});
				});
			};
			
			if ($selectedSupportedResolutions.size() && $('#requirements-supportedresolutions-type-custom:checked').size()) {
				xml.addTag("<supported-resolutions>", function() {
					var supportedResolutionName;
					$selectedSupportedResolutions.each(function() {
						supportedResolutionName = $(this).attr('id').split('-')[2];
						xml.addTag("<include>", supportedResolutionName);
					});
				});
			};
			
		});
	};

	function generateTestingInstructionsXML(xml) {
		xml.addTag("<testing-instructions>", $("#testinginstructions").val());
	};

	function generateStoreSpecificXML(xml) {
		var $storeSpecific = $('input[name^="storespecific-name-"]');
		
		if (!$storeSpecific.size()) return false;
		
		var storeSpecificID, storeSpecificContent;
		xml.addTag("<store-specific>", function() {
			$storeSpecific.each(function() {
				storeSpecificID = $(this).val();
				storeSpecificContent = $(this).next().val();
				
				xml.addTag("<" + storeSpecificID + ">", function() {
					xml.addString(storeSpecificContent);
				});
			});
		});
	};

	function generateDescriptionFileXML() {
		var xml = new XMLGenerator();
		xml.addLine('<?xml version="1.0" encoding="UTF-8"?>');
		xml.addTag('<application-description-file version="1">', function() {
			xml.addTag('<application package="' + firstApkFileData.package + '">', function() {
				generateCategorizationXML(xml);
				generateDescriptionXML(xml);
				generateDescriptionLocalizationsXML(xml);
				generateContentDescriptionXML(xml);
				generateAvailabilityXML(xml);
				generatePriceXML(xml);
				generateApkFilesXML(xml);
				generateRequirementsXML(xml);
				generateTestingInstructionsXML(xml);
				generateConsentXML(xml);
				generateCustomerSupportXML(xml);
				generateStoreSpecificXML(xml);
			});
		});
		return xml.getXmlText();
	};

    return {
        generateDescriptionFileXML : generateDescriptionFileXML
    };
})();	