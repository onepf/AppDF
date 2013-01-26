package org.onepf.appdf.parser;

import java.util.Locale;

import org.onepf.appdf.model.Application;
import org.onepf.appdf.model.Description;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;

public class DescriptionParser  implements NodeParser<Application> {
	
	
    private static final class InnerTagsParser extends BaseParser<Description, DescriptionTag>{

        public InnerTagsParser() {
            super(DescriptionTag.class, "description");         
        }
        
    }
    
	private static final String LANGUAGE_ATTR_NAME = "language";
	
	public DescriptionParser() {		
	}
	
	
	public void parse(Node node,Application application){
		Description description = new Description();
		NamedNodeMap attributes = node.getAttributes();
		Node languageAttr = attributes.getNamedItem(LANGUAGE_ATTR_NAME);
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
		(new InnerTagsParser()).parse(node, description);
	}

}
