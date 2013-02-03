/**
 * Parsing and validating description.xml XML and generating JSON
 * Depends on: jquery.js
 * 
 * Apache License, Version 2.0
 * http://www.apache.org/licenses/LICENSE-2.0.html
 *
 * Copyright (c) 2012 Vassili Philippov <vassiliphilippov@onepf.org>
 * Copyright (c) 2012 One Platform Foundation <www.onepf.org>
 * Copyright (c) 2012 Yandex <www.yandex.com>
 */

function getTagPath($xml) {
	var s = "<" + $xml[0].tagName + ">";
	var $cur = $xml.parent();
	while ($cur.length>0) {
		if ($cur[0].tagName) {
			s = "<" + $cur[0].tagName + "> / " + s; 
		};	
		$cur = $cur.parent();
	};
	return s;
};

function parseXMLTag($xml, tagName, optional, onerror, onend) {
	var $tags = $xml.children(tagName);
	if ($tags.length<1) {
		if (optional) {
			onend($(""));
		} else {
			onerror("<" + tagName + "> tag is missed in " + getTagPath($xml));
		};
	} else {
		onend($($tags[0]));
	};
};

function parseXMLTextTag($xml, tagName, optional, onerror, onend) {
	var $tags = $xml.children(tagName);
	if ($tags.length<1) {
		if (optional) {
			onend(null);
		} else {
			onerror("<" + tagName + "> tag is missed in " + getTagPath($xml));
		};
	} else {
		onend($($tags[0]).text());
	};
};

function parseXMLTextTags($xml, tagName, optional, onerror, onend) {
	var $tags = $xml.children(tagName);
	if ($tags.length<1 && !optional) {
		onerror("<" + tagName + "> tag is missed in " + getTagPath($xml));
	} else {
		var values = [];
		$tags.each(function() {
			values.push($(this).text());
		});
		onend(values);
	};
};

function parseXMLAttribute($xml, attributeName, onerror, onend) {
	var attributeValue = $xml.attr(attributeName);
	if (!attributeValue) {
		onerror("\"" + attributeName + "\" attribute is missed in " + getTagPath($xml));
		return;
	} else {
		onend(attributeValue);
	};
};

function parseCategorizationSection($xml, onerror, onend) {
	var data = {};
	parseXMLTag($xml, "categorization", false, onerror, function($categorization) {
		parseXMLTextTag($categorization, "type", false, onerror, function(type) {
		parseXMLTextTag($categorization, "category", false, onerror, function(category) {
		parseXMLTextTag($categorization, "subcategory", false, onerror, function(subcategory) {
			data["type"] = type;
			data["category"] = category;
			data["subcategory"] = subcategory;
			if (!allCategories[type]) {
				onerror("Unknown type \"" + type + "\"");
				return;
			};
			if (!allCategories[type][category]) {
				onerror("Unknown category \"" + category + "\" for type \"" + type + "\"");
				return;
			};
			if (allCategories[type][category].indexOf(subcategory)==-1) {
				onerror("Unknown subcategory \"" + subcategory + "\" for category \"" + category + "\"");
				return;
			};
			onend(data);
		});
		});
		});
	});
};

function parseDescriptionTextsSections($xml, optionalFields, onerror, onend) {
	var data = {};
	parseXMLTag($xml, "texts", optionalFields, onerror, function($texts) {
		parseXMLTextTags($texts, "title", optionalFields, onerror, function(titles) {
		parseXMLTextTag($texts, "keywords", optionalFields, onerror, function(keywords) {
		parseXMLTextTags($texts, "short-description", optionalFields, onerror, function(shortDescriptions) {
		parseXMLTextTag($texts, "full-description", optionalFields, onerror, function(fullDescription) {
		parseXMLTextTag($texts, "recent-changes", true, onerror, function(recentChanges) {
		parseXMLTextTag($texts, "privacy-policy", true, onerror, function(privacyPolicy) {
		parseXMLTextTag($texts, "eula", true, onerror, function(eula) {
		parseXMLTag($texts, "features", optionalFields, onerror, function($features) {
			parseXMLTextTags($features, "feature", optionalFields, onerror, function(features) {
				if (titles) {
					data["title"] = titles;
					if (titles[0] && titles[0].length>30) {
						onerror("The first title must be shorter than 30 symbols (in " + getTagPath($texts) + ")");
						return;
					};
				};
				data["keywords"] = keywords.split(/\s*,\s*/);
				if (shortDescriptions) {
					data["short-description"] = shortDescriptions;
					if (shortDescriptions[0].length>80) {
						onerror("The first short description must be shorter than 80 symbols (in " + getTagPath($texts) + ")");
						return;
					};
				};
				if (fullDescription) {
					data["full-description"] = fullDescription;
					if (fullDescription.length>4000) {
						onerror("The full description must be shorter than 80 symbols (in " + getTagPath($texts) + ")");
						return;
					};
				};
				if (features) {
					data["features"] = features;
					if (features.length>5) {
						onerror("More than five features (in " + getTagPath($features) + ")");
						return;
					};
					if (features.length<3) {
						onerror("There must be at least three features (in " + getTagPath($features) + ")");
						return;
					};
				};
				if (recentChanges) {
					data["recent-changes"] = recentChanges;
					if (recentChanges.length>500) {
						onerror("Recent changes must be shorted than 500 symbols (in " + getTagPath($features) + ")");
						return;
					};
				}
				if (privacyPolicy) {
					data["privacy-policy"] = privacyPolicy;
				}
				if (eula) {
					data["eula"] = eula;
				}
				onend(data);
			});
		});
		});
		});
		});
		});
		});
		});
		});
	});
};

function parseOneLanguageDescriptionSection($xml, optionalFields, onerror, onend) {
	var data = {};
	parseDescriptionTextsSections($xml, optionalFields, onerror, function(dataTexts) {
		data["texts"] = dataTexts;
		onend(data);
	});
};

function parseDescriptionSections($xml, onerror, onend) {
	var data = {};
	parseXMLTag($xml, "description", false, onerror, function($description) {
		parseOneLanguageDescriptionSection($description, false, onerror, function(dataDescription) {
			data["default"] = dataDescription;
			var $localizations = $xml.children("description-localization");
			var anyError = false;
			$localizations.each(function() {
				if (anyError) return;

				var languageCode = $(this).attr("language");
				if (!allLanguages[languageCode]) {
					onerror("Unknown language \"" + languageCode + "\" in &lt;description-localization&gt; tag attribute");
					return;
				};

				parseOneLanguageDescriptionSection($(this), true, function(error) {
					anyError = true;
					onerror(error);
				}, function(dataLocalizedDescription) {
					data[languageCode] = dataLocalizedDescription;
				});
			});
			if (!anyError) {
				onend(data);
			}
		});
	});
};

function parseApplicationSection($xml, onerror, onend) {
	var data = {};
	parseCategorizationSection($xml, onerror, function(dataCategorization) {
	parseDescriptionSections($xml, onerror, function(dataDescriptions) {
		data["categorization"] = dataCategorization;
		data["description"] = dataDescriptions;
		onend(data);
	});
	});
};

function parseDescriptionXML(xmlText, onend, onerror) {
	data = {};
	var $xml = $($.parseXML(xmlText));

	parseXMLTag($xml, "application-description-file", false, onerror, function($appdfFile) {
		parseXMLAttribute($appdfFile, "version", onerror, function(appdfFileVersion) {
			data["version"] = appdfFileVersion;
			parseXMLTag($appdfFile, "application", false, onerror, function($application) {
				parseXMLAttribute($application, "package", onerror, function(applicationPackage) {
					data["package"] = applicationPackage;
					parseApplicationSection($application, onerror, function(dataApplication) {
						for (key in dataApplication) {
							data[key] = dataApplication[key];
						};
						onend(data);
					});
				});
			});
		});
	});

	// var appdfFileVersion = $appdfFile.attr("version");
	// if (!appdfFileVersion) {
	// 	onerror("\"version\" attribute is missed in <application-description-file> tag");
	// 	return;
	// } else {
	// 	data["version"] = appdfFileVersion;
	// };

	// var $applications = $appdfFile.children("application");
	// if ($applications.length<1) {
	// 	onerror("<application> tag is missed");
	// 	return;
	// };

	// var $application = $($applications[0]);
	// var applicationPackage = $applications.attr("package");
	// if (!applicationPackage) {
	// 	onerror("\"package\" attribute is missed in <application> tag");
	// 	return;
	// } else {
	// 	data["package"] = applicationPackage;

	// };

	// console.log($application);

	// onend(data);
};

