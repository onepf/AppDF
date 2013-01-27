package org.onepf.appdf.parser;

import static org.onepf.appdf.parser.util.XmlUtil.extractChildElements;

import java.beans.PropertyDescriptor;
import java.util.List;

import org.onepf.appdf.model.Availability;
import org.onepf.appdf.model.Availability.Period;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;

public enum AvailabilityTag implements NodeParser<Availability> {

    COUNTRIES {

        private final String INCLUDE_TAG = "include";
        private final String EXCLUDE_TAG = "exclude";

        @Override
        public void parse(Node node, Availability element)
                throws ParsingException {
            List<Node> children = extractChildElements(node);
            for (Node child : children) {
                String tagName = child.getNodeName();
                if (INCLUDE_TAG.equals(tagName)) {
                    element.addIncludeCountry(child.getTextContent());
                } else if (EXCLUDE_TAG.equals(tagName)) {
                    element.addExcludeCountry(child.getTextContent());
                } else {
                    throw new ParsingException("Unsupported tag:" + tagName);
                }
            }
        }

    },
    
    PERIOD {
        private static final String SINCE_TAG = "since";
        private static final String UNTIL = "until";
        
         
        
        @Override
        public void parse(Node node, Availability element)
                throws ParsingException {        
            List<Node> children = extractChildElements(node);
            for ( Node child : children){
                String tagName = child.getNodeName();
                Period period = new Period();
                NamedNodeMap attributes = child.getAttributes();
                for ( int i = 0 ; i < attributes.getLength() ; i++){
                    Node item = attributes.item(i);
                    try {
                        PropertyDescriptor pd  = new PropertyDescriptor(item.getNodeName(), Period.class);
                        int value = Integer.parseInt(item.getTextContent());
                        pd.getWriteMethod().invoke(period, value);
                    } catch (Exception e) {//generic catch block
                        throw new ParsingException(e);
                    }
                }
                if ( SINCE_TAG.equals(tagName)){
                    element.setSince(period);
                }else if ( UNTIL.equals(tagName)){
                    element.setUntil(period);
                } else {
                    throw new ParsingException("Unsupported tag:" + tagName);
                }
            }
        }
    }

    ;
}
