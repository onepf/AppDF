package org.onepf.appdf.parser;

import java.util.List;

import org.onepf.appdf.model.Description;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.Node;

public final class TextsParser implements NodeParser<Description>{
	public static final String TAG = "texts";
	
	private enum TextsTags{
		
	}

	@Override
	public void parse(Node node, Description description) {
		List<Node> childNodes = XmlUtil.extractChildElements(node);		
	}
}