package org.onepf.appdf.model;

import org.w3c.dom.Element;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * @author: nikolayivanov
 */
public class Country {

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public List<Language> getLanguageList() {
        return languageList;
    }

    public Currency getCurrency() {
        return currency;
    }

    static class Builder {

       private  String code;
       private  String name;
       private  List<Language> languageList = new ArrayList<>();
       private  Currency currency;


       public String getCode() {
           return code;
       }

       Builder code(String code){
           this.code = code;
           return this;
       }

       Builder  name(String name){
           this.name = name;
           return this;
       }

       Builder lang(Language lang){
           this.languageList.add(lang);
           return this;
       }

       Builder currency(Currency currency){
           this.currency = currency;
           return this;
       }

       Country build(){
           return new Country(code,name, languageList,currency);
       }



   }

   static Builder fromElement(Element node){
       return new Builder()
               .code(node.getAttribute("code"))
               .name(node.getTextContent());
   }

   private final String code;
   private final String name;
   private final List<Language> languageList;
   private final Currency currency;


    private Country(String code, String name, List<Language> languageList, Currency currency) {
        this.code = code;
        this.name = name;
        this.languageList = Collections.unmodifiableList(languageList);
        this.currency = currency;
    }
}
