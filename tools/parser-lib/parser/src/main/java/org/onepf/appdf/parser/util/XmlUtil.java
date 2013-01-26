package org.onepf.appdf.parser.util;

import java.util.ArrayList;
import java.util.List;

import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class XmlUtil {

	private XmlUtil() { 
	}
	
	public static List<Node> extractChildElements(Node parent){
		List<Node> result = new ArrayList<Node>();
		NodeList childNodes = parent.getChildNodes();
		for ( int i = 0 ; i < childNodes.getLength() ; i++ ){
			Node child = childNodes.item(i);
			if ( child.getNodeType() == Node.ELEMENT_NODE){
				result.add(child);
			}
		}
		return result;
	}
	
	

	
	public static String getOptionalAttributeValue(NamedNodeMap attrs,String name) {
	
	    Node namedItem = attrs.getNamedItem(name);
        if (namedItem == null) {
            return "";
        }else{
            return namedItem.getTextContent();
        }
	}

    public static String tagNameToFieldName(String tagName) {
        int minusIndex = tagName.indexOf('-');
        while ( minusIndex != -1){
            char nextChar = tagName.charAt(minusIndex + 1);
            char upper = Character.toUpperCase(nextChar);
            StringBuilder sb = new StringBuilder(tagName);
            sb.replace(minusIndex + 1, minusIndex + 2, new String(new char[]{upper}));
            sb.replace(minusIndex, minusIndex + 1, "");
            tagName = sb.toString();
            minusIndex = tagName.indexOf('-');
        }
        return tagName;
    }
}
