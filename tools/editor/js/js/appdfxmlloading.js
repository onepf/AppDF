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
 * Loading description.xml JSON into AppDF editor HTML5 page
 * Depends on: jquery.js, xmlgenerator.js, appdfeditor.js, appdflocalization.js
 */

var appdfXMLLoader = (function() {
	function loadDescriptionLocalizationSection(languageCode, data) {
		var $container = $("#localization-tab-" + languageCode);

		$container.find("input[id^=description-texts-title-more-]").closest(".control-group").remove();
		var titles = data["texts"]["title"];
		for (var i=0; i<titles.length; i++) {
			var title = titles[i];
			if (i==0) {
				$container.find("#description-texts-title").val(title);
			} else {
				appdfEditor.addMoreTitles($container.find("#description-texts-title"), title);
			};
		};	

		$container.find("input[id^=description-texts-keywords-more-]").closest(".input-container").remove();
		var keywords = data["texts"]["keywords"];
		for (var i=0; i<keywords.length; i++) {
			var keyword = keywords[i];
			if (i==0) {
				$container.find("#description-texts-keywords").val(keyword);
			} else {
				appdfEditor.addMoreKeywords($container.find("#description-texts-keywords"), keyword);
			};
		};	

		$container.find("input[id^=description-texts-shortdescription-more-]").closest(".control-group").remove();
		var shoftDescriptions = data["texts"]["short-description"];
		for (var i=0; i<shoftDescriptions.length; i++) {
			var shortDescription = shoftDescriptions[i];
			if (i==0) {
				$container.find("#description-texts-shortdescription").val(shortDescription);
			} else {
				appdfEditor.addMoreShortDescriptions($container.find("#description-texts-shortdescription"), shortDescription);
			};
		};	

		$container.find("#description-texts-fulldescription").val(data["texts"]["full-description"]);

		$container.find("input[id^=description-texts-features-]").val("");
		var features = data["texts"]["features"];
		for (var i=0; i<features.length; i++) {
			var feature = features[i];
			if (i<5) {
				$container.find("#description-texts-features-" + (i+1)).val(feature);
			};
		};	

		if (data["texts"]["recent-changes"]) {
			$container.find("#description-texts-recentchanges").val(data["texts"]["recent-changes"]);
		} else {
			$container.find("#description-texts-recentchanges").val("");		
		};

		if (data["texts"]["privacy-policy"]) {
			$container.find("#description-texts-privacypolicy").val(data["texts"]["privacy-policy"]);
		} else {
			$container.find("#description-texts-privacypolicy").val("");		
		};

		if (data["texts"]["eula"]) {
			$container.find("#description-texts-eula").val(data["texts"]["eula"]);
		} else {
			$container.find("#description-texts-eula").val("");		
		};

		if (data["videos"]["youtube-video"]) {
			$container.find("#description-videos-youtubevideo").val(data["videos"]["youtube-video"]);
		} else {
			$container.find("#description-videos-youtubevideo").val("");
		};
	};

	function loadDescriptionXML(xml, onend, onerror, onprogress) {
		appdfParser.parseDescriptionXML(xml, function(data) {
			//Calculate total number of actions to do
			var totalProgressItems = 22;
			var passedProgressItems = 0;
			for (languageCode in data["description"]) {
				totalProgressItems += 20;
			};

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

			console.log("Description.XML is parsed");
			console.log(data);

			//Set control values in the categorization section
			$("#categorization-type").val(data["categorization"]["type"]);
			appdfEditor.fillCategories();
			progress();

			$("#categorization-category").val(data["categorization"]["category"]);
			appdfEditor.fillSubcategories();
			progress();

			$("#categorization-subcategory").val(data["categorization"]["subcategory"]);
			appdfEditor.fillCategoryStoresInfo();
			progress();

			//Set control values in the description/texts
			appdfLocalization.removeAllLocalizations();
			progress(3);
			for (languageCode in data["description"]) {
				if (languageCode!="default") {
					appdfLocalization.addLocalization(languageCode, dataLanguages[languageCode]);
				};
				loadDescriptionLocalizationSection(languageCode, data["description"][languageCode]);
				progress(20);
			};

			//Select default language as open tab
			appdfLocalization.selectLanguage("default");

			//Price
			$("input[id^=price-localprice-]").closest(".control-group").remove();
			$("#price-free-fullversion").val("");
			$("#price-baseprice").val("0");
			progress();
			if (data["price"]["free"]) {
				$('a[href="#tab-price-free"]').tab('show');
				$("#price-free-trialversion").attr("checked", data["price"]["trial-version"]);
				if (data["price"]["trial-version"]) {
					$("#price-free-fullversion").removeAttr('disabled');
				} else {
					$("#price-free-fullversion").attr('disabled', 'disabled');
				};
				if (typeof data["price"]["full-version"] != 'undefined') {
					$("#price-free-fullversion").val(data["price"]["full-version"]);
				};		
			} else {
				$('a[href="#tab-price-paid"]').tab('show');
				$("#price-baseprice").val(data["price"]["base-price"]);			

				$("#price-free-trialversion").attr("checked", false);
				$("#price-free-fullversion").attr('disabled', 'disabled');

				for (countryCode in data["price"]["local-price"]) {
					appdfEditor.addMoreLocalPrice($("#price-baseprice"), data["price"]["local-price"][countryCode], countryCode);
				};
			};
			progress(3);

			//Consent
			$("#consent-googleandroidcontentguidelines").attr("checked", data["consent"]["google-android-content-guidelines"]);
			$("#consent-usexportlaws").attr("checked", data["consent"]["us-export-laws"]);
			$("#consent-importexportlaws").attr("checked", data["consent"]["us-export-laws"]);
			$("#consent-slidemeagreement").attr("checked", data["consent"]["slideme-agreement"]);
			$("#consent-freefromthirdpartycopytightedcontent").attr("checked", data["consent"]["free-from-third-party-copytighted-content"]);
			progress();

			//Customer support
			$("#customersupport-phone").val(data["customer-support"]["phone"]);
			$("#customersupport-email").val(data["customer-support"]["email"]);
			$("#customersupport-website").val(data["customer-support"]["website"]);
			progress();
			

			//Content description / content rating
			$("#contentdescription-contentrating").val(data["content-description"]["content-rating"]);
			progress();

			//Content description / content descriptors
			var dcd = data["content-description"]["content-descriptors"];
			var scd = "#contentdescription-contentdescriptors-"
			$(scd + "cartoonviolence").val(dcd["cartoon-violence"]);
			$(scd + "realisticviolence").val(dcd["realistic-violence"]);
			$(scd + "badlanguage").val(dcd["bad-language"]);
			$(scd + "fear").val(dcd["fear"]);
			$(scd + "sexualcontent").val(dcd["sexual-content"]);
			$(scd + "drugs").val(dcd["drugs"]);
			$(scd + "gamblingreference").val(dcd["gambling-reference"]);
			$(scd + "alcohol").val(dcd["alcohol"]);
			$(scd + "smoking").val(dcd["smoking"]);
			$(scd + "discrimination").val(dcd["discrimination"]);
			progress(2);

			//Content description / included-activities
			var dia = data["content-description"]["included-activities"];
			var sia = "#contentdescription-includedactivities-"
			$(sia + "inappbilling").attr("checked", dia["in-app-billing"]);
			$(sia + "gambling").attr("checked", dia["gambling"]);
			$(sia + "advertising").attr("checked", dia["advertising"]);
			$(sia + "usergeneratedcontent").attr("checked", dia["user-generated-content"]);
			$(sia + "usertousercommunications").attr("checked", dia["user-to-user-communications"]);
			$(sia + "accountcreation").attr("checked", dia["account-creation"]);
			$(sia + "personalinformationcollection").attr("checked", dia["personal-information-collection"]);
			progress(2);

			//Content description / rating-certificates
			var certificates = data["content-description"]["rating-certificates"];
			var sc = "#contentdescription-ratingcertificates-rating-"
			for (var i=0; i<certificates.length; i++) {
				var typeId = certificates[i]["type"].toLowerCase();
				$(sc + typeId).val(certificates[i]["rating"]);
			};
			progress(3);
			
			//Testing instructions
			$("#testinginstructions").val(data["testing-instructions"]);
			progress();
			
			
			//Store specify
			//remove current store specify list
			$('#section-store-specific .store-specific').remove();
			//add loaded store specify data
			var storeSpecificData = data["store-specific"];
			if (storeSpecificData) {
				for (var i in storeSpecificData) {
					appdfEditor.addMoreStoreSpecific($(".storespecific-addmore"), i, storeSpecificData[i]);
				};
			};
			progress();
			
			
			//Requirements
			var featuresTagsAndIDsList = [ 
				{tag:"root", id:"#requirements-features-root"},
				{tag:"gms", id:"#requirements-features-gms"},
				{tag:"online", id:"#requirements-features-online"}
			];
			//clear supported languages list
			$("#requirements-supportedlanguages-type-default").click();
			appdfEditor.fillSupportedLanguages();
			//clear supported resolutions list
			$("#requirements-supportedresolutions-type-default").click();
			appdfEditor.fillScreenResolutions();
			
			var dataRequirements = data["requirements"];
			if (dataRequirements["features"]) {
				for (var i in featuresTagsAndIDsList) {
					if (dataRequirements["features"][featuresTagsAndIDsList[i].tag]) {
						$(featuresTagsAndIDsList[i].id).attr("checked", "checked");
					} else {
						$(featuresTagsAndIDsList[i].id).removeAttr("checked");
					};
				};
			};
			
			if (dataRequirements["supported-languages"] && dataRequirements["supported-languages"]["language"]) {
				$("#requirements-supportedlanguages-type-custom").click();
				var $el, supportedLanguages = dataRequirements["supported-languages"]["language"];
				
				for (var i in supportedLanguages) {
					$el = $('#requirements-supportedlanguages input[id="requirements-supportedlanguages-' + supportedLanguages[i] + '"]');
					if ($el.size()) {
						$el.attr("checked", "checked");
					};
				};
			};
			
			if (dataRequirements["supported-devices"] && dataRequirements["supported-devices"]["exclude"]) {
				var unsupportedDevices = dataRequirements["supported-devices"]["exclude"], $el = $(".requirements-supporteddevices-addmore");
				
				for (var i in unsupportedDevices) {
					appdfEditor.addMoreUnsupportedDevices($el, unsupportedDevices[i]);
				};
			};
			
			if (dataRequirements["supported-resolutions"] && dataRequirements["supported-resolutions"]["include"]) {
				$("#requirements-supportedresolutions-type-custom").click();
				var $el, supportedResolutions = dataRequirements["supported-resolutions"]["include"];
				
				for (var i in supportedResolutions) {
					$el = $('#requirements-supportedresolutions input[id="requirements-supportedresolutions-' + supportedResolutions[i] + '"]');
					if ($el.size()) {
						$el.attr("checked", "checked");
					};
				};
			};
			//progress();
			
			
			
			
			//Todo: temporary work with XML
			$("#availability").val(data["availability"]);
			
			
			onend();
		}, onerror);
	};

	function loadAppdfFile(file, onend, onerror, onprogress) {
		onprogress(0, 100);
		var requestFileSystem = window.webkitRequestFileSystem || window.mozRequestFileSystem || window.requestFileSystem;
		var fileReader = new FileReader();

		zip.createReader(new zip.BlobReader(file), function(zipReader) {
			zipReader.getEntries(function(entries) {
				var appdfEntries = {};
				entries.forEach(function(entry) {
					appdfEntries[entry.filename] = entry;
				});
				var writer = new zip.BlobWriter();
				var descriptionXmlEntry = appdfEntries["description.xml"];
				if (descriptionXmlEntry) {
					descriptionXmlEntry.getData(writer, function(blob) {
	            		fileReader.onload = function(event) {
							var contents = event.target.result;
							onprogress(20, 100);
							loadDescriptionXML(contents, onend, onerror, function(current, total) {
								//on progress
								onprogress(20 + 80*current/total, 100);
							});
						};

						fileReader.onerror = function(event) {
							onerror(["description.xml file could not be read. Code " + event.target.error.code]);
						};

	            		fileReader.readAsText(blob);
					}, function() {
						//On progress
					});
				} else {
					onerror(["description.xml file is not found inside AppDF container"]);
				};
			});
		}, onerror);

		if (!file) {
			onerror(["Please select AppDF file"]);
			return;
		};
	};

    return {
        loadDescriptionXML : loadDescriptionXML,
        loadAppdfFile : loadAppdfFile
    };
})();