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
public enum CurrencyCatalog {

    INSTANCE;

    private static final String RES_NAME = "currencies.xml";
    private final Map<String, Currency> currencyMap;

    private CurrencyCatalog() {
        Document document = ResourceLoader.getXmlResource(RES_NAME);
        NodeList childNodes = document.getDocumentElement().getChildNodes();
        HashMap<String, Currency> tmpMap = new HashMap<>();
        for (int i = 0; i < childNodes.getLength(); i++) {
            Node item = childNodes.item(i);
            if (item.getNodeType() == Node.ELEMENT_NODE) {
                Currency currency = Currency.builder().fromXml(item);
                tmpMap.put(currency.getCode(), currency);
            }
        }
        currencyMap = Collections.unmodifiableMap(tmpMap);
    }

    public Currency getByCode(String code){
        return currencyMap.get(code);
    }

    public Collection<Currency> getAll(){
        return currencyMap.values();
    }
}


