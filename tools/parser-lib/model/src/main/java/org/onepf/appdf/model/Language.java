package org.onepf.appdf.model;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

/**
 * @author: nikolayivanov
 */
public class Language {

    static class Builder {
        public static final String CODE_ATTR = "code";
        String code;
        String name;

        Builder code(String code) {
            this.code = code;
            return this;
        }

        Builder name(String name) {
            this.name = name;
            return this;
        }

        Language build(){
            return  new Language(code,name);
        }

        Language fromXml(Node node){
            if ( node.getNodeType() != Node.ELEMENT_NODE){
                throw new IllegalArgumentException();
            }
            Element element = (Element)node;
            return name(element.getTextContent())
                  .code(element.getAttribute(CODE_ATTR))
                  .build();
        }


    }

    static Builder builder(){
        return new Builder();
    }

    private final String code;
    private final String name;

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    private Language(String code,String name){
        this.code = code;
        this.name = name;
    }

}
