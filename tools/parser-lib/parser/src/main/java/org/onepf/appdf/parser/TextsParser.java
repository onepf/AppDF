package org.onepf.appdf.parser;

import java.util.List;

import org.onepf.appdf.model.Description;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.Node;

public final class TextsParser implements NodeParser<Description>{
	public static final String TAG = "texts";
	
	@Override
	public void parse(Node node, Description description) {
		List<Node> nodes = XmlUtil.extractChildElements(node);
		for (Node innerNode : nodes){
			String tagName = innerNode.getNodeName();
			try{
				TextsTags.valueOf(tagName.toUpperCase().replace('-', '_')).parse(innerNode, description);
			}catch(IllegalArgumentException e){
				throw new ParsingException("Unexpected tag:" + tagName);
			}
		}
	}
}