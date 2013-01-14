var allCategories = {
	"application" : {
		"personalization" : [
			"personlalization A",
			"personlalization B",
			"personlalization C"
		],
		"finance" : [
			"Investment",
			"Banks",
			"Stocks"
		]
	},
	"game" : {
		"action" : [
			"",
			"Starwats",
			"Dooms"
		],
		"strategy" : [
			"Heroes",
			"2d strategy"
		]
	}    	
};

var allLanguages = {
	"ab" : "Abkhaz",
	"aa" : "Afar",
	"af" : "Afrikaans",
	"ak" : "Akan",
	"sq" : "Albanian",
	"am" : "Amharic",
	"ar" : "Arabic",
	"ar_eg" : "Arabic (Egypt)",
	"ar_il" : "Arabic (Israel)",
	"an" : "Aragonese",
	"hy" : "Armenian",
	"as" : "Assamese",
	"av" : "Avaric",
	"ae" : "Avestan",
	"ay" : "Aymara",
	"az" : "Azerbaijani",
	"bm" : "Bambara",
	"ba" : "Bashkir",
	"eu" : "Basque",
	"be" : "Belarusian",
	"bn" : "Bengali",
	"bh" : "Bihari",
	"bi" : "Bislama",
	"bs" : "Bosnian",
	"br" : "Breton",
	"bg" : "Bulgarian",
	"my" : "Burmese",
	"ca" : "Catalan; Valencian",
	"ch" : "Chamorro",
	"ce" : "Chechen",
	"ny" : "Chichewa; Chewa; Nyanja",
	"zh" : "Chinese",
	"zh_cn" : "Chinese (PRC)",
	"zh_tw" : "Chinese (Taiwan)",
	"cv" : "Chuvash",
	"kw" : "Cornish",
	"co" : "Corsican",
	"cr" : "Cree",
	"hr" : "Croatian",
	"cs" : "Czech",
	"da" : "Danish",
	"dv" : "Divehi; Dhivehi; Maldivian;",
	"nl" : "Dutch",
	"nl_be" : "Dutch (Belgium)",
	"nl_nl" : "Dutch (Netherlands)",
	"dz" : "Dzongkha",
	"en" : "English",
	"en_us" : "English (US)",
	"en_au" : "English (Australia)",
	"en_gb" : "English (Britain)",
	"en_cz" : "English (Canada)",
	"en_nz" : "English (New Zealand)",
	"en_sg" : "English (Singapore)",
	"en_cd" : "English (Canada)",
	"eo" : "Esperanto",
	"et" : "Estonian",
	"ee" : "Ewe",
	"fo" : "Faroese",
	"fj" : "Fijian",
	"fi" : "Finnish",
	"fr" : "French",
	"fr_be" : "French (Belgium)",
	"fr_ca" : "French (Canada)",
	"fr_fr" : "French (France)",
	"fr_ch" : "French (Switzerland)",
	"ff" : "Fula; Fulah; Pulaar; Pular",
	"gl" : "Galician",
	"ka" : "Georgian",
	"de" : "German",
	"de_at" : "German (Austria)",
	"de_de" : "German (Germany)",
	"de_li" : "German (Liechtenstein)",
	"de_ch" : "German (Switzerland)",
	"el" : "Greek, Modern",
	"gn" : "Guaraní",
	"gu" : "Gujarati",
	"ht" : "Haitian; Haitian Creole",
	"ha" : "Hausa",
	"he" : "Hebrew (modern)",
	"hz" : "Herero",
	"hi" : "Hindi",
	"ho" : "Hiri Motu",
	"hu" : "Hungarian",
	"ia" : "Interlingua",
	"id" : "Indonesian",
	"ie" : "Interlingue",
	"ga" : "Irish",
	"ig" : "Igbo",
	"ik" : "Inupiaq",
	"io" : "Ido",
	"is" : "Icelandic",
	"it" : "Italian",
	"it_it" : "Italian (Italy)",
	"it_ch" : "Italian (Switzerland)",
	"iu" : "Inuktitut",
	"ja" : "Japanese",
	"jv" : "Javanese",
	"kl" : "Kalaallisut, Greenlandic",
	"kn" : "Kannada",
	"kr" : "Kanuri",
	"ks" : "Kashmiri",
	"kk" : "Kazakh",
	"km" : "Khmer",
	"ki" : "Kikuyu, Gikuyu",
	"rw" : "Kinyarwanda",
	"ky" : "Kyrgyz",
	"kv" : "Komi",
	"kg" : "Kongo",
	"ko" : "Korean",
	"ku" : "Kurdish",
	"kj" : "Kwanyama, Kuanyama",
	"la" : "Latin",
	"lb" : "Luxembourgish, Letzeburgesch",
	"lg" : "Ganda",
	"li" : "Limburgish, Limburgan, Limburger",
	"ln" : "Lingala",
	"lo" : "Lao",
	"lt" : "Lithuanian",
	"lu" : "Luba-Katanga",
	"lv" : "Latvian",
	"gv" : "Manx",
	"mk" : "Macedonian",
	"mg" : "Malagasy",
	"ms" : "Malay",
	"ml" : "Malayalam",
	"mt" : "Maltese",
	"mi" : "Māori",
	"mr" : "Marathi (Marāṭhī)",
	"mh" : "Marshallese",
	"mn" : "Mongolian",
	"na" : "Nauru",
	"nv" : "Navajo, Navaho",
	"nb" : "Norwegian Bokmål",
	"nd" : "North Ndebele",
	"ne" : "Nepali",
	"ng" : "Ndonga",
	"nn" : "Norwegian Nynorsk",
	"no" : "Norwegian",
	"ii" : "Nuosu",
	"nr" : "South Ndebele",
	"oc" : "Occitan",
	"oj" : "Ojibwe, Ojibwa",
	"cu" : "Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",
	"om" : "Oromo",
	"or" : "Oriya",
	"os" : "Ossetian, Ossetic",
	"pa" : "Panjabi, Punjabi",
	"pi" : "Pāli",
	"fa" : "Persian",
	"pl" : "Polish",
	"ps" : "Pashto, Pushto",
	"pt" : "Portuguese",
	"pt_br" : "Portuguese (Brazil)",
	"pt_pt" : "Portuguese (Portugal)",
	"qu" : "Quechua",
	"rm" : "Romansh",
	"rn" : "Kirundi",
	"ro" : "Romanian, Moldavian(Romanian from Republic of Moldova)",
	"ru" : "Russian",
	"sa" : "Sanskrit (Saṁskṛta)",
	"sc" : "Sardinian",
	"sd" : "Sindhi",
	"se" : "Northern Sami",
	"sm" : "Samoan",
	"sg" : "Sango",
	"sr" : "Serbian",
	"gd" : "Scottish Gaelic; Gaelic",
	"sn" : "Shona",
	"si" : "Sinhala, Sinhalese",
	"sk" : "Slovak",
	"sl" : "Slovene",
	"so" : "Somali",
	"st" : "Southern Sotho",
	"es" : "Spanish; Castilian",
	"su" : "Sundanese",
	"sw" : "Swahili",
	"ss" : "Swati",
	"sv" : "Swedish",
	"ta" : "Tamil",
	"te" : "Telugu",
	"tg" : "Tajik",
	"th" : "Thai",
	"ti" : "Tigrinya",
	"bo" : "Tibetan Standard, Tibetan, Central",
	"tk" : "Turkmen",
	"tl" : "Tagalog",
	"tn" : "Tswana",
	"to" : "Tonga (Tonga Islands)",
	"tr" : "Turkish",
	"ts" : "Tsonga",
	"tt" : "Tatar",
	"tw" : "Twi",
	"ty" : "Tahitian",
	"ug" : "Uighur, Uyghur",
	"uk" : "Ukrainian",
	"ur" : "Urdu",
	"uz" : "Uzbek",
	"ve" : "Venda",
	"vi" : "Vietnamese",
	"vo" : "Volapük",
	"wa" : "Walloon",
	"cy" : "Welsh",
	"wo" : "Wolof",
	"fy" : "Western Frisian",
	"xh" : "Xhosa",
	"yi" : "Yiddish",
	"yo" : "Yoruba",
	"za" : "Zhuang, Chuang",
	"zu" : "Zulu"
};

$('#myTab a').click(function (e) {
  e.preventDefault();
  $(this).tab('show');
});

$("#categorization-type").change(function() {
	fillCategories();
});

$("#categorization-category").change(function() {
	fillSubcategories();
});

function fillLanguages(element) {
	for (var code in allLanguages) {
 		element.append($("<option />").val(code).text(allLanguages[code]));
 	}
 	element.val("en");
 }

 function fillCategories() {
	var selectedType = $("#categorization-type").find(":selected").val();
	var categories = $("#categorization-category");
	var categoryHash = allCategories[selectedType];
	categories.empty();
	for (var k in categoryHash) {
 		categories.append($("<option />").val(k).text(k));
 	}
 }

 function fillSubcategories() {
	var selectedType = $("#categorization-type").find(":selected").val();
	var selectedCategory = $("#categorization-category").find(":selected").val();
	var subcategories = $("#categorization-subcategory");
	var subcategoryArray = allCategories[selectedType][selectedCategory];
	subcategories.empty();
	for (var i=0; i<subcategoryArray.length; i++) {
		var s = subcategoryArray[i];
		subcategories.append($("<option />").val(s).text(s));
	}
 }

 function addMoreTitles(e) {
 	var parent = $(e).closest(".control-group");
 	var strHtml = ' \
		<div class="control-group"> \
			<!-- description/texts/title --> \
			<label class="control-label"  for="description-texts-title-more">Longer title</label> \
			<div class="controls"> \
				<div class="input-append"> \
					<input type="text" id="description-texts-title-more" class="input-xxlarge"> \
					<button class="btn" type="button" onclick="removeControlGroup(this); return false;"><i class="icon-remove"></i></button> \
				</div> \
				<p class="help-block">Enter longer title and it will be used by those stores that support longer titles.</p> \
			</div> \
		</div><!--./control-group --> \
	';
 	parent.after($(strHtml));
 }

function addMoreShortDescriptions(e) {
	var parent = $(e).closest(".control-group");
	var strHtml = ' \
		<div class="control-group"> \
			<!-- description/texts/title --> \
			<label class="control-label"  for="description-texts-shortdescription-more">Longer short description</label> \
			<div class="controls"> \
				<div class="input-append"> \
					<input type="text" id="description-texts-shortdescription-more" class="input-xxlarge"> \
					<button class="btn" type="button" onclick="removeControlGroup(this); return false;"><i class="icon-remove"></i></button> \
				</div> \
				<p class="help-block">Enter longer short description and it will be used by those stores that support longer short descriptions.</p> \
			</div> \
		</div><!--./control-group --> \
	';
 	parent.after($(strHtml));
 }

function addMoreKeywords(e) {
	var parent = $(e).closest(".input-append");
	var strHtml = ' \
		<div class="keyword-countainer"> \
				<div class="input-append"> \
				<input type="text" id="description-texts-keywords-more"> \
				<button class="btn" type="button" onclick="removeKeyword(this); return false;"><i class="icon-remove"></i></button> \
			</div> \
		</div> \
	';
 	parent.after($(strHtml));
 }

function removeControlGroup(e) {
	$(e).closest(".control-group").remove();
}

function removeKeyword(e) {
	$(e).closest(".keyword-countainer").remove();
}


//Initial filling
fillLanguages($("#description-attrlanguage"));
fillCategories();
fillSubcategories();

//Add validations
//	$(function () { $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(); } );

$("input,textarea,select").jqBootstrapValidation(
    {
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // Here I do nothing, but you could do something like display 
            // the error messages to the user, log, etc.
        },
        submitSuccess: function($form, event) {
            alert("OK");
            event.preventDefault();
        },
        filter: function() {
            return $(this).is(":visible");
        }
    }
);