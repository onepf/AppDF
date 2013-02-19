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

function loadDescriptionLocalizationSection(languageCode, data) {
	var $container = $("#localization-tab-" + languageCode);

	$container.find("input[id^=description-texts-title-more-]").closest(".control-group").remove();
	var titles = data["texts"]["title"];
	for (var i=0; i<titles.length; i++) {
		var title = titles[i];
		if (i==0) {
			$container.find("#description-texts-title").val(title);
		} else {
			addMoreTitles($container.find("#description-texts-title"), title);
		};
	};	

	$container.find("input[id^=description-texts-keywords-more-]").closest(".keyword-countainer").remove();
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
			addMoreShortDescriptions($container.find("#description-texts-shortdescription"), shortDescription);
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

function loadDescriptionXML(xml, onend, onerror) {
	parseDescriptionXML(xml, function(data) {
		console.log("Description.XML is parsed");
		console.log(data);

		//Set control values in the categorization section
		$("#categorization-type").val(data["categorization"]["type"]);
		fillCategories();

		$("#categorization-category").val(data["categorization"]["category"]);
		fillSubcategories();

		$("#categorization-subcategory").val(data["categorization"]["subcategory"]);
		fillCategoryStoresInfo();

		//Set control values in the description/texts
		removeAllLocalizations();
		for (languageCode in data["description"]) {
			if (languageCode!="default") {
				addLocalization(languageCode, allLanguages[languageCode]);
			};
			loadDescriptionLocalizationSection(languageCode, data["description"][languageCode]);
		};

		//Select default language as open tab
		selectLanguage("default");

		//Price
		$("input[id^=price-localprice-]").closest(".control-group").remove();
		$("#price-free-fullversion").val("");
		$("#price-baseprice").val("0");
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
				addMoreLocalPrice($("#price-baseprice"), data["price"]["local-price"][countryCode], countryCode);
			};
		};

		//Consent
		$("#consent-googleandroidcontentguidelines").attr("checked", data["consent"]["google-android-content-guidelines"]);
		$("#consent-usexportlaws").attr("checked", data["consent"]["us-export-laws"]);
		$("#consent-importexportlaws").attr("checked", data["consent"]["us-export-laws"]);
		$("#consent-slidemeagreement").attr("checked", data["consent"]["slideme-agreement"]);
		$("#consent-freefromthirdpartycopytightedcontent").attr("checked", data["consent"]["free-from-third-party-copytighted-content"]);

		//Customer support
		$("#customersupport-phone").val(data["customer-support"]["phone"]);
		$("#customersupport-email").val(data["customer-support"]["email"]);
		$("#customersupport-website").val(data["customer-support"]["website"]);
		

		//Content description / content rating
		$("#contentdescription-contentrating").val(data["content-description"]["content-rating"]);

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

		//Content description / rating-certificates
		var certificates = data["content-description"]["rating-certificates"];
		var sc = "#contentdescription-ratingcertificates-rating-"
		for (var i=0; i<certificates.length; i++) {
			var typeId = certificates[i]["type"].toLowerCase();
			$(sc + typeId).val(certificates[i]["rating"]);
		};

		//Testing instructions
		$("#testinginstructions").val(data["testing-instructions"]);

		//Todo: temporary work with XML
		$("#availability").val(data["availability"]);
		$("#requirements").val(data["requirements"]);
		$("#storespecific").val(data["store-specific"]);

		onend();
	}, onerror);
};