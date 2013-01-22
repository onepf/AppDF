function XMLGenerator() {
	this.xml = "";
	this.indent = 0;
}

XMLGenerator.prototype.addIndent = function () {
	for (var i=0; i<this.indent; i++) {
		this.xml += "  ";
	}
}

XMLGenerator.prototype.addNewLine = function () {
	this.xml += "\n";
}

XMLGenerator.prototype.addString = function (s) {
	this.xml += s;
}

XMLGenerator.prototype.addLine = function (s) {
	this.addIndent();
	this.addString(s);
	this.addNewLine();
}

XMLGenerator.prototype.increaseIndent =function () {
	this.indent += 1;
};

XMLGenerator.prototype.decreaseIndent = function () {
	this.indent -= 1;
};

XMLGenerator.prototype.escapeForXml = function (s) {
    return s.replace(/\"/g, '&quot;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/&/g, '&amp;');
};

XMLGenerator.prototype.addTag = function(tagText, next) {
	this.addIndent();
	this.addString(tagText);
	if (next) {
		if (typeof(next) == "function") {
			this.addNewLine();
			this.increaseIndent();
			next();
			this.decreaseIndent();
			this.addIndent();
		} else {
			this.addString("" + this.escapeForXml(next));
		}
	}
	this.addString("</" + tagText.split(/[ >]/)[0].substr(1) + ">");
	this.addNewLine();
};

XMLGenerator.prototype.getXmlText = function () {
	return this.xml;
};

