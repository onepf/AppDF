package org.onepf.appdf.parser;

import org.onepf.appdf.model.ModelElement;
import org.w3c.dom.Node;

public interface NodeParser<T extends ModelElement> {
	void parse(Node node,T element) throws ParsingException;
}