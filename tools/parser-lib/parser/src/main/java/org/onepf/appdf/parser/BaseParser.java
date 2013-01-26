package org.onepf.appdf.parser;

import java.util.List;

import org.onepf.appdf.model.ModelElement;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.Node;

/**
 * Base class for parser using enums values as inner parsers
 * 
 * @author nivanov
 * 
 * @param <T>
 * @param <E>
 */
public abstract class BaseParser<T extends ModelElement, E extends Enum<E> & NodeParser<T>>
        implements NodeParser<T> {

    private final Class<E> enumClass;
    private final String enclosingTagName;

    public BaseParser(Class<E> enumClass, String enclosingTagName) {
        this.enumClass = enumClass;
        this.enclosingTagName = enclosingTagName;

    }
    

    @Override
    public void parse(Node node, T element) {
        List<Node> childNodes = XmlUtil.extractChildElements(node);
        for (Node childNode : childNodes) {
            String tagName = childNode.getNodeName();
            try {
                Enum.valueOf(enumClass, tagName.toUpperCase().replace('-', '_'))
                        .parse(childNode, element);
            } catch (IllegalArgumentException iae) {
                throw new ParsingException("Unsupported tag:" + tagName
                        + " inside of " + enclosingTagName);
            }
        }
    }

}
