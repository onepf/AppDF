function AppDFParserState(data) {
	this.data = data;
	this.errorMessage = null;
};

AppDFParserState.prototype.onerror = function(error) {
	this.errorMessage = error;
};

AppDFParserState.prototype.isError = function() {
	return false;
};

AppDFParserState.prototype.errorState = function() {
	return new stateError(this.errorMessage);
};

AppDFParserState.prototype.startTag = function(tag) {
	//Do nothing
	return this;
};

AppDFParserState.prototype.endTag = function(tag) {
	//Do nothing
	return this;
};

AppDFParserState.prototype.assertTagName = function(tag, expectedTagName) {
	if (tag.name==expectedTagName) {
		return true;
	} else {
		this.onerror("Expected tag <" + expectedTagName + "> instead of <" + tag.name + ">");
		return false;
	};
};

AppDFParserState.prototype.assertAttribute = function(tag, attributeName) {
	if (tag.attributes[attributeName]) {
		return true;
	} else {
		onerror("Attribute \"" + attributeName + "\" is missed in tag <" + tag.name + ">");
		return false;
	};
};

AppDFParserState.prototype.assertAttributeNumber = function(tag, attributeName) {
	if (this.assertAttribute(tag, attributeName)) {
		return true;
		//Todo check to be a number
	} else {
		return false;
	}
};


/////////////////////////////////////////////
// Error state

stateError.prototype = new AppDFParserState();

function stateError(error) {
	console.log("stateError: " + error);
	this.error = error;
};

stateError.prototype.isError = function() {
	return true;
};

/////////////////////////////////////////////
// stateReadTag

stateReadTag.prototype = new AppDFParserState();

function stateReadTag(data, tagName, ontag) {
	this.data = data;
	this.tagName = tagName;
	this.ontag = ontag;

	this.startTag = function(tag) {
		console.log("stateReadTag:startTag");
		if (this.assertTagName(tag, this.tagName)) {
			return this.ontag(tag);
		};
		return new stateError(this.errorMessage);
	};

	this.endTag = function(tag) {
		return new stateError("Expected tag <" + this.tagName + "> before end of <" + tag.name + ">");
	};
};


/////////////////////////////////////////////
// stateReadTextTag

stateReadTextTag.prototype = new AppDFParserState();

function stateReadTextTag(data, tagName, ontag) {
	this.data = data;
	this.tagName = tagName;
	this.ontag = ontag;
	this.tagIsAlreadyRead = false;

	this.startTag = function(tag) {
		console.log("stateReadTextTag:startTag");
		if (this.tagIsAlreadyRead) {
			return new stateError("Expected end of tag </" + this.tagName + "> instead of tag <" + tag.name + ">");
		};

		if (this.assertTagName(tag, this.tagName)) {
			this.tag = tag;
			this.tagIsAlreadyRead = true;
		};
		return new stateError(this.errorMessage);
	};

	this.endTag = function(tag) {
		if (tag.tagIsAlreadyRead) {
			if (tag.name!=this.tagName) {
				return new stateError("Expected end of tag </" + this.tagName + "> instead of end of tag </" + tag.name + ">");
			} else {
				return this.ontag(tag);
			};
		} else {
			return new stateError("Expected tag <" + this.tagName + "> before end of <" + tag.name + ">");
		};
	};
};


/////////////////////////////////////////////
// stateRoot

stateRoot.prototype = new AppDFParserState();

function stateRoot(data) {
	this.startTag = function(tag) {
		console.log("stateRoot.startTag");
		console.log(tag);
		if (this.assertTagName(tag, "application-description-file")) {
		if (this.assertAttributeNumber(tag, "version")) {
			data["version"] = tag.attributes["version"];
			return new stateReadApplication(data);
		};
		};
		return new stateError(this.errorMessage);
	};
};

/////////////////////////////////////////////
// stateReadApplication

stateReadApplication.prototype = new AppDFParserState();

function stateReadApplication(data) {

	this.startTag = function(tag) {
		if (this.assertTagName(tag, "application")) {
		if (this.assertAttributeNumber(tag, "package")) {
			data["package"] = tag.attributes["package"];
			return new stateReadCategorization(data);
		};
		};
		return new stateError(this.errorMessage);
	};
};

/////////////////////////////////////////////
// Categorization Section States

stateReadCategorization.prototype = new stateReadTag();

function stateReadCategorization(data) {
	this.tagName = "categorization";
	this.ontag = function (tag) {
		console.log("stateReadCategorization:ontag");
		data["categorization"] = {};
		return new stateReadCategorizationType(data);
	};
};


stateReadCategorizationType.prototype = new stateReadTextTag();

function stateReadCategorizationType(data) {
	this.tagName = "type";
	this.ontag = function (tag) {
		var type = tag.text;
		if (!allCategories[type]) {
			return new stateError("Unknown type \"" + type + "\"");
		};

		data["categorization"]["type"] = type;
		return new stateReadCategorizationCategory(data, type);
	};
};


stateReadCategorizationCategory.prototype = new stateReadTextTag();

function stateReadCategorizationCategory(data, type) {
	this.tagName = "category";
	this.ontag = function (tag) {
		var category = tag.text;
		if (!allCategories[type][category]) {
			return new stateError("Unknown category \"" + category + "\" for type \"" + type + "\"");
		};

		data["categorization"]["category"] = category;
		return new stateReadCategorizationSubcategory(data, type, category);
	};
};


stateReadCategorization.prototype = new stateReadTextTag();

function stateReadCategorizationSubcategory(data, type, category) {
	this.tagName = "subcategory";
	this.ontag = function (tag) {
		var subcategory = tag.text;
		if (allCategories[type][category].indexOf(subcategory)==-1) {
			return new stateError("Unknown subcategory \"" + subcategory + "\" for category \"" + category + "\"");
		};

		data["categorization"]["subcategory"] = subcategory;
		return new stateReadDescription(data);
	};
};

/////////////////////////////////////////////
// Parsing description.xml

function convertAttributesToMap(attributes) {
	var data = {};
	if (!attributes) {
		return data;
	};
	for (var i=0; i<attributes.length; i++) {
		data[attributes[i].name] = attributes[i].value;
	};
	return data;
};

function logTag(tag) {
	var s = "<" + tag.name;	
	for (a in tag.attributes) {
		s += " " + a + "=\"" + tag.attributes[a] + "\"";
	};
	s += ">";
	console.log(s);
};

function parseXMLRecursive($xml, state) {
	var curstate = state;

	$xml.each(function() {
		var tag = {
			"name": $(this)[0].tagName,
			"attributes": convertAttributesToMap($(this)[0].attributes),
			"text": $(this).text()
		};
		console.log(state);
		console.log($xml);

		curstate = curstate.startTag(tag);

		$(this).children().each(function() {
			curstate = parseXMLRecursive($(this), curstate);
		});

		curstate = curstate.endTag(tag);
	});

	return state;
};

function parseDescriptionXML(xmlText, onend, onerror) {
	data = {};
	var $xml = $($.parseXML(xmlText));

	var state = new stateRoot(data);

	$xml.children().each(function() {
		state = parseXMLRecursive($(this), state);
	});

	if (!state.isError) {
		onend(data);
	} else {
		onerror(state.errorMessage);
	};
};