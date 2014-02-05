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

	function generateDeveloperXML(xml) {
        xml.addNonEmptyTextTag("<developer>", $("#developer-name").val());
	};
    
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

			//Privacy policy
			var PrivacyPolicyLink = $parent.find("#description-texts-privacypolicy-link").val();
			var PrivacyPolicyText = $parent.find("#description-texts-privacypolicy-data").val();
			if (PrivacyPolicyText!="" && PrivacyPolicyLink!="") {
				xml.addNonEmptyTextTag("<privacy-policy href=\"" + PrivacyPolicyLink + "\">", PrivacyPolicyText);
			};
			
			//EULA
			var EULAlink = $parent.find("#description-texts-eula-link").val();
			var EULAtext = $parent.find("#description-texts-eula-data").val();
			if (EULAtext!="" && EULAlink!="") {
				xml.addNonEmptyTextTag("<eula href=\"" + EULAlink + "\">", EULAtext);
			};
		});	
	};

	function generateOneLanguageImageDescription(languageCode, xml) {
		$parent = $("#localization-tab-" + languageCode);
		var $screenshots = $parent.find("input[id^=description-images-screenshot]:not(.empty-image)");
        
		//We calculate total number of images to check if this section is empty
		var numberOfImages = $screenshots.length;
        var $appIcon = $parent.find("input[id^=description-images-appicon]")[0];
		if (!appdfEditor.isNoFile($appIcon)) {
			numberOfImages += 1;
		};
		var $largePromo = $parent.find("#description-images-largepromo");
		if ($largePromo.size() && !appdfEditor.isNoFile($largePromo[0])) {
			numberOfImages += 1;
            $largePromo = $largePromo[0];
        } else {
            $largePromo = null;
		};
        
        var $smallPromo = $parent.find("#description-images-smallpromo");
		if ($smallPromo && !appdfEditor.isNoFile($smallPromo[0])) {
			numberOfImages += 1;
            $smallPromo = $smallPromo[0];
		} else {
            $smallPromo = null;
        };
        
		if (numberOfImages>0) {
			xml.addTag("<images>", function() {
				$parent.find("input[id^=description-images-appicon]").each(function() {
                    if (!appdfEditor.isNoFile($(this)[0])) {
                        xml.addNonEmptyTextTag("<app-icon width=\"" + $(this).data("width") + "\" height=\"" + $(this).data("height") + "\">", 
                            appdfEditor.getFileName($(this)[0]));
                    };
				});

                if ($largePromo && !appdfEditor.isNoFile($largePromo)) {
                    xml.addNonEmptyTextTag("<large-promo width=\"" + $parent.find("#description-images-largepromo").data("width") + 
                        "\" height=\"" + $parent.find("#description-images-largepromo").data("height") + "\">", 
                        appdfEditor.getFileName($largePromo));
                };
                if ($smallPromo && !appdfEditor.isNoFile($smallPromo)) {
                    xml.addNonEmptyTextTag("<small-promo width=\"" + $parent.find("#description-images-smallpromo").data("width") + 
                        "\" height=\"" + $parent.find("#description-images-smallpromo").data("height") + "\">", 
                        appdfEditor.getFileName($smallPromo));
                };

				if ($screenshots.length>0) {
					xml.addTag("<screenshots>", function() {
						$screenshots.each(function() {
							xml.addNonEmptyTextTag("<screenshot width=\"" + $(this).data("width") + 
								"\" height=\"" + $(this).data("height") + 
								"\" index=\"" + $(this).closest(".image-input-group").data("index") + 
								"\">", appdfEditor.getFileName($(this)[0]));
						});
					});
				};
			});	
		};
	};

	function generateOneLanguageVideoDescription(languageCode, xml) {
		$parent = $("#localization-tab-" + languageCode);

		var youtubeVideoId = $parent.find("#description-videos-youtubevideo").val();
        
        var $videosList = $(".controls.video-file-control").not(".empty-video");
        var videoFileName;
        
		if (youtubeVideoId || $videosList.size()) {
			xml.addTag("<videos>", function() {
				if (youtubeVideoId) {
                    xml.addNonEmptyTextTag("<youtube-video>", youtubeVideoId);
                };
                
                if ($videosList.size()) {
                    $videosList.each(function() {
                        videoFileName = appdfEditor.getFileName($(this).find("input.hidden-video-file"));
                        xml.addNonEmptyTextTag("<video-file>", videoFileName);
                    });
                };
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
				xml.addTag("<apk-file>", appdfEditor.getFileName($(this)));
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
        var $selectedSupportedCountries = $('#availability-supportedcountries-include input:checked[id^="availability-supportedcountries-"][type="checkbox"]');
		var $selectedUnSupportedCountries = $('#availability-supportedcountries-exclude input:checked[id^="availability-supportedcountries-"][type="checkbox"]');
		var periodSinceValue = $("#section-availability input.availability-period-since").val();
        var periodUntilValue = $("#section-availability input.availability-period-until").val();
        var periodSinceDate = $("#section-availability input.availability-period-since").data("datepicker").date;
        var periodUntilDate = $("#section-availability input.availability-period-until").data("datepicker").date;
        
        var checkedSupportedCountries = $('#availability-supportedcountries-type-include:checked').size() && $selectedSupportedCountries.size();
        var checkedUnsupportedCountries = $('#availability-supportedcountries-type-exclude:checked').size() && $selectedUnSupportedCountries.size();
        if (checkedSupportedCountries || checkedUnsupportedCountries || periodSinceValue || periodUntilValue) {
            xml.addTag("<availability>", function() {
            
                if (checkedSupportedCountries) {
                    xml.addTag("<countries only-listed=\"yes\">", function() {
                        $selectedSupportedCountries.each(function() {
                            xml.addTag("<include>", $(this).attr('id').split('-')[2]);
                        });
                    });
                };
                if (checkedUnsupportedCountries) {
                    xml.addTag("<countries-resolutions only-listed=\"no\">", function() {
                        $selectedUnSupportedCountries.each(function() {
                            xml.addTag("<exclude>", $(this).attr('id').split('-')[2]);
                        });
                    });
                };
                
                if (periodSinceValue || periodUntilValue) {
                    xml.addTag("<period>", function() {
                        if (periodSinceValue) {
                            xml.addTag("<since year=\"" + periodSinceDate.getFullYear() + 
                                "\" month=\"" + periodSinceDate.getMonth() + "\" day=\"" + periodSinceDate.getDate() + "\">");
                        };
                        if (periodUntilValue) {
                            xml.addTag("<until year=\"" + periodUntilDate.getFullYear() + 
                                "\" month=\"" + periodUntilDate.getMonth() + "\" day=\"" + periodUntilDate.getDate() + "\">");
                        };
                    });
                };
            });
        };
	};

	function generateRequirementsXML(xml) {
		var anyFeatureChecked = $('#requirements-features-root:checked').size() || $('#requirements-features-gms:checked').size() 
			|| $('#requirements-features-online:checked').size();
		
		var $selectedSupportedLanguages = $('#section-requirements input:checked[id^="requirements-supportedlanguages-"][type="checkbox"]');
		var $unsupportedDevices = $('#section-requirements input[name^="unsupport-device-name-"]');
		var $selectedSupportedResolutions = $('#requirements-supportedresolutions-include input:checked[id^="requirements-supportedresolutions-"][type="checkbox"]');
		var $selectedUnSupportedResolutions = $('#requirements-supportedresolutions-exclude input:checked[id^="requirements-supportedresolutions-"][type="checkbox"]');
		
		if (!anyFeatureChecked && !$selectedSupportedLanguages.size() && !$selectedSupportedResolutions.size() && !$selectedUnSupportedResolutions.size() && !$unsupportedDevices.size()) {
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
			
			if ($('#requirements-supportedresolutions-type-include:checked').size() && $selectedSupportedResolutions.size()) {
				xml.addTag("<supported-resolutions only-listed=\"yes\">", function() {
					$selectedSupportedResolutions.each(function() {
						xml.addTag("<include>", $(this).attr('id').split('-')[2]);
					});
				});
			};
			if ($('#requirements-supportedresolutions-type-exclude:checked').size() && $selectedUnSupportedResolutions.size()) {
				xml.addTag("<supported-resolutions only-listed=\"no\">", function() {
					$selectedUnSupportedResolutions.each(function() {
						xml.addTag("<exclude>", $(this).attr('id').split('-')[2]);
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
			xml.addTag('<application platform="android" package="' + appdfEditor.firstApkFileData.package + '">', function() {
                generateDeveloperXML(xml);
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