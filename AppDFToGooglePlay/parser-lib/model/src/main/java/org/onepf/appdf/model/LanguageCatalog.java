package org.onepf.appdf.model;

import org.onepf.appdf.util.ResourceLoader;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * @author: nikolayivanov
 */
public enum LanguageCatalog {
    INSTANCE;

    private static final String RES_NAME = "languages.xml";
    /**
     * Maps codes to languages instances
     */
    private final Map<String, Language> languageMap;

    private LanguageCatalog() {
        Document document = ResourceLoader.getXmlResource(RES_NAME);
        NodeList childNodes = document.getDocumentElement().getChildNodes();
        final int cnt = childNodes.getLength();
        HashMap<String, Language> tmpMap = new HashMap<>(cnt);
        for (int i = 0; i < cnt; i++) {
            Node item = childNodes.item(i);
            if (item.getNodeType() == Node.ELEMENT_NODE) {
                Language lang = Language.builder().fromXml(item);
                tmpMap.put(lang.getCode(), lang);
            }
        }
        languageMap = Collections.unmodifiableMap(tmpMap);
    }

    public Language getByCode(String code) {
        return languageMap.get(code);
    }

    public Collection<Language> getAll() {
        return languageMap.values();
    }
}
