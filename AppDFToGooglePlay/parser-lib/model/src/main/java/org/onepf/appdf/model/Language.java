package org.onepf.appdf.model;

import org.w3c.dom.Element;
import org.w3c.dom.Node;

/**
 * @author: nikolayivanov
 */
public class Language {

    public static final Language MAIN_LANGUAGE = new Language("en_us", "English (US)");

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

        Language build() {
            return new Language(code, name);
        }

        Language fromXml(Node node) {
            if (node.getNodeType() != Node.ELEMENT_NODE) {
                throw new IllegalArgumentException();
            }
            Element element = (Element) node;
            return name(element.getTextContent())
                    .code(element.getAttribute(CODE_ATTR))
                    .build();
        }


    }

    static Builder builder() {
        return new Builder();
    }

    private final String code;
    private final String name;
    private final String bcp47Code;

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    /**
     * Country code in BCP47 format.
     * Need use for Google Play API for language code.
     *
     * @return Country code in BCP47 format.
     */
    public String getBcp47Code() {
        return bcp47Code;
    }

    private Language(String code, String name) {
        this.code = code;
        this.name = name;

        int slashIndex = code.indexOf('_');
        if (slashIndex != -1) {
            bcp47Code = code.substring(0, slashIndex) + '-'
                    + code.substring(slashIndex + 1).toUpperCase();
        } else {
            bcp47Code = code;
        }
    }


    @Override
    public String toString() {
        return name + '(' + code + ')';
    }
}
