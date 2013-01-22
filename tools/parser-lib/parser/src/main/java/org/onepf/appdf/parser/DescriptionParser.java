package org.onepf.appdf.parser;

import java.util.List;
import java.util.Locale;

import org.onepf.appdf.model.Application;
import org.onepf.appdf.model.Description;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;

public class DescriptionParser {

	public DescriptionParser() {	
	}
	
	
	public void parse(Node node,Application application){
		Description description = new Description();
		NamedNodeMap attributes = node.getAttributes();
		Node languageAttr = attributes.getNamedItem("language");
		if (  languageAttr == null ){
			throw new ParsingException("Required language attribute is missing");
		}
		String language = languageAttr.getNodeValue();
		String[] langCountry = language.split("-");
		final Locale locale;
		if ( langCountry.length == 2){
			locale = new Locale(langCountry[0], langCountry[1]);
		}else {
			locale = new Locale(language);
		}
		description.setLanguage(locale);				
		List<Node> childNodes = XmlUtil.extractChildElements(node);
		for ( Node childNode : childNodes ){
			String tagName = childNode.getNodeName();
			System.out.println("tag:" + tagName);
		}
	}

}
