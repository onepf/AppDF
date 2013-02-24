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
 * A simple library for generating XML files
 * Depends on: nothing - it is very simple ;)
 */

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
    return s.replace(/&/g, '&amp;')
            .replace(/>/g, '&gt;')
            .replace(/</g, '&lt;')
            .replace(/\"/g, '&quot;');
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

XMLGenerator.prototype.addNonEmptyTextTag = function(tagText, text) {
	if (!text || text=="") {
		return;
	};

	this.addTag(tagText, text);
};

XMLGenerator.prototype.getXmlText = function () {
	return this.xml;
};

