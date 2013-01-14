package org.onepf.appdf.parser;

import java.util.List;

import org.onepf.appdf.model.Application;
import org.onepf.appdf.model.Categorisation;
import org.onepf.appdf.model.Categorisation.ApplicationType;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.Node;

public class CategorizationParser {

	private static final String CATEGORY_TAG = "category";
	private static final String TYPE_TAG = "type";

	public void parse(Node node,Application application) throws ParsingException{
		List<Node> childElements = XmlUtil.extractChildElements(node);
		if ( childElements.size() < 2){
			throw new ParsingException("Minimum categorization child count is 2");
		}
		Categorisation categorisation = new Categorisation();
		for ( Node n : childElements ){
			String nodeName = n.getNodeName();
			if ( TYPE_TAG.equals(nodeName)){
				String typeValue = n.getTextContent().trim();
				ApplicationType appType = Categorisation.ApplicationType.valueOf(typeValue.toUpperCase());
				if ( categorisation.getApplicationType() != null ) {
					throw new ParsingException("Multiple application type tags");
				}
				categorisation.setApplicationType(appType);
			}else if ( CATEGORY_TAG.equals(nodeName)){
				String category = n.getTextContent().trim();
				if ( categorisation.getCategory() != null  ){
					throw new ParsingException("Multiple categories set");
				}
				categorisation.setCategory(category);
			}else if ( "subcategory".equals(nodeName)){
				String subcategory = n.getTextContent();
				if ( categorisation.getSubCategory() != null ){
					throw new ParsingException("Subcategory allready set");					
				}
				categorisation.setSubCategory(subcategory);
			}else{
				throw new ParsingException("Unexpected tag in categorization:" + nodeName);
			}
		}
		application.setCategorisation(categorisation);
	}

}
