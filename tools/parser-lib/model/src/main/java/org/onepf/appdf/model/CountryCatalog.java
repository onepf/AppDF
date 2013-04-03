package org.onepf.appdf.model;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * @author: nikolayivanov
 */
public enum CountryCatalog {
    INSTANCE;

    private static final String COUNTRY_RES = "countries.xml";
    private static final String COUNTRY_CURRENCY_RES = "country_currencies.xml";
    private static final String COUNTRY_LANGS_RES = "country_languages.xml";

    private final Map<String,Country> countryMap;

    private CountryCatalog(){
        Map<String,Country.Builder> builderMap = createBuildersMap();
        readCurrencies(builderMap);
        readLanguages(builderMap);
        Map<String,Country> tmp = new HashMap<>();
        for (Map.Entry<String,Country.Builder> entry : builderMap.entrySet()){
            tmp.put(entry.getKey(),entry.getValue().build());
        }
        countryMap = Collections.unmodifiableMap(tmp);
    }

    private Map<String,Country.Builder> createBuildersMap() {
        Document countriesDocument = ResourceLoader.getXmlResource(COUNTRY_RES);
        Map<String,Country.Builder> buildersMap = new HashMap<>();
        NodeList nodes = countriesDocument.getDocumentElement().getChildNodes();
        for ( int i = 0 ; i < nodes.getLength() ; i++) {
            Node n = nodes.item(i);
            if ( n.getNodeType() == Node.ELEMENT_NODE ){
                Country.Builder builder = Country.fromElement((Element)n);
                buildersMap.put(builder.getCode(),builder);
            }
        }
        return buildersMap;
    }

    private void readCurrencies(Map<String,Country.Builder> builderMap){
        Document resource = ResourceLoader.getXmlResource(COUNTRY_CURRENCY_RES);
        NodeList nodes = resource.getDocumentElement().getChildNodes();
        for(int i = 0 ; i < nodes.getLength() ; i ++){
            Node n = nodes.item(i);
            if ( n.getNodeType() == Node.ELEMENT_NODE){
                Element e = (Element)n;
                String countryCode = e.getAttribute("country");
                String currencyCode = e.getAttribute("currency");
                Country.Builder builder = builderMap.get(countryCode);
                if ( builder == null ){
                    throw new IllegalArgumentException("Unsupported country:" + countryCode);
                }
                builder.currency(CurrencyCatalog.INSTANCE.getByCode(currencyCode));
            }
        }
    }

    private void readLanguages(Map<String,Country.Builder> builderMap){
        Document resource = ResourceLoader.getXmlResource(COUNTRY_LANGS_RES);
        NodeList nodes = resource.getDocumentElement().getChildNodes();
        for(int i = 0 ; i < nodes.getLength() ; i ++){
            Node n = nodes.item(i);
            if ( n.getNodeType() == Node.ELEMENT_NODE){
                Element e = (Element)n;
                String countryCode = e.getAttribute("code");
                Country.Builder builder = builderMap.get(countryCode);
                if ( builder == null ){
                    throw new IllegalArgumentException("Unsupported country:" + countryCode);
                }
                NodeList childNodes = e.getChildNodes();
                for(int j = 0 ; j < childNodes.getLength() ; j++){
                    Node langNode = childNodes.item(j);
                    if ( langNode.getNodeType() == Node.ELEMENT_NODE){
                        String langCode = langNode.getTextContent();
                        Language lang = LanguageCatalog.INSTANCE.getByCode(langCode);
                        if ( lang == null ){
                            throw new IllegalArgumentException("Unsupported lang:" + lang);
                        }
                        builder.lang(lang);
                    }
                }
            }
        }
    }


    public Country getByCode(String code){
        return countryMap.get(code);
    }

    public Collection<Country> getAll(){
        return countryMap.values();
    }

}
