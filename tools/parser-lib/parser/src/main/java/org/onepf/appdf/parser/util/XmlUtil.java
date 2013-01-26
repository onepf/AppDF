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
}
