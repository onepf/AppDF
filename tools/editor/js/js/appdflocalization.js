var MAX_LOCALIZATION_TABS = 5;

function getDescriptionLanguages() {
	var langs = [];
	$("#description-tab-header").find("a").each(function() {
		var strHref = $(this).attr("href").toLowerCase();
		if (strHref.indexOf("#localization-tab-")==0) {
			langs.push(strHref.substr(18));
		};
	});
	return langs;
};

function selectLanguage(languageCode) {
	var $tabHeader = $("#description-tab-header");
	$tabHeader.find('a[href="#localization-tab-' + languageCode + '"]').tab('show');
};

function addLocalization(languageCode, languageName) {
	console.log("addLocalization langaugeCode=" + languageCode + ", languageName=" + languageName);
	var descriptionLangs = getDescriptionLanguages();
	console.log(descriptionLangs);

	//Preventing adding one language twice
	if (descriptionLangs.indexOf(languageCode)>=0) {
		console.log("Language already exist, just select it");
		return;
	};

	var strHtmlHeader = '<li><a href="#localization-tab-' + languageCode + '" data-toggle="tab">' + languageName + '</a></li>';

	var $tabHeader = $("#description-tab-header");

	//We do not allow more than MAX_LOCALIZATION_TABS tabs, if more we add it to the "More" tab
	if ($tabHeader.children().length<MAX_LOCALIZATION_TABS) {
		$tabHeader.children("li:last").before($(strHtmlHeader));
	} else {
		$tabHeader.find('ul.dropdown-menu').append($(strHtmlHeader));
	};

	//Create new tab content container
	var strHtmlContent = '<div class="tab-pane" id="localization-tab-' + languageCode + '"></div>';
	$("#description-tab-content").append($(strHtmlContent));

	//Add copy of default langauge content to just created container 
	var strHtmlClone = $("#description-tab-content").children("div#localization-tab-default").html();
	$("#description-tab-content").children().last().append($(strHtmlClone));

	//Open just created tab and create a handler 
	$tabHeader.find('a[href="#localization-tab-' + languageCode + '"]').tab('show');
	$tabHeader.find('a[href="#localization-tab-' + languageCode + '"]').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
};

function removeSelectedLocalization() {
	var $tabHeader = $("#description-tab-header");
	var $tabContent = $("#description-tab-content");
	var strHref = $tabHeader.find(".active").children("a").attr("href");
	console.log("strHref");
	console.log(strHref);

	if (strHref=="#tab-default") {
		alert("Cannot remove default (English) localization");
		return;
	};

	//First we check if "More" is selected
	if (strHref=="#") {
		console.log($tabHeader.find(".active").find(".active"));
		strHref = $tabHeader.find(".active").find(".active").children("a").attr("href");
		$tabHeader.find(".active").find(".active").remove();
		$tabContent.children("div" + strHref).remove();
	} else {
		$tabHeader.find(".active").remove();
		$tabContent.children("div" + strHref).remove();
	};

	selectLanguage("default");
};

function showAllLocalizationDialog() {
	var $modal = $("#add-localization-modal");
	var $okButton = $modal.find(".btn-primary");
	$okButton.click(function(event) {
		event.preventDefault();
		console.log("OKButton Click");
		$modal.modal('hide');
		addLocalization($("#add-localization-modal-language").val(), $("#add-localization-modal-language").children(":selected").text());
	});

	$modal.modal("show");
};
