/*******************************************************************************
 * Copyright 2012 One Platform Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
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
 * Singleton serving as catalog for category info
 *
 * @author nivanov
 */
public enum CategoryCatalog {
    INSTANCE;

    private static final String CATEGORIES_RES = "categories.xml";
    private static final String STORE_CATEGORIES_RES = "store_categories.xml";

    private final Map<String,Category> categoryMap;

    private CategoryCatalog() {
        final Document categoriesDoc = ResourceLoader.getXmlResource(CATEGORIES_RES);
        Map<String, Category.Builder> buildersMap = new HashMap<>();
        Map<String, Map<String, Category.Builder>> subcategoriesMap = new HashMap<>();
        NodeList childNodes = categoriesDoc.getDocumentElement().getElementsByTagName("category");
        for (int i = 0; i < childNodes.getLength(); i++) {
            Node item = childNodes.item(i);
            if (item.getNodeType() != Node.ELEMENT_NODE) {
                continue;
            }
            Element elem = (Element) item;
            String typeLabel = ((Element) elem.getParentNode()).getAttribute("code");
            Categorisation.ApplicationType type = typeLabel.equals("application") ? Categorisation.ApplicationType.APPLICATION :
                    Categorisation.ApplicationType.GAME;
            String code = elem.getAttribute("code");
            Category.Builder builder = Category.builder().id(code).type(type);
            NodeList subCategoriesNodes = elem.getChildNodes();
            Map<String, Category.Builder> subcategoriesBuildres = new HashMap<>();
            for (int j = 0; j < subCategoriesNodes.getLength(); j++) {
                if (subCategoriesNodes.item(j).getNodeType() != Node.ELEMENT_NODE) {
                    continue;
                }
                Element subCategoryElem = (Element) subCategoriesNodes.item(j);
                String subCode = subCategoryElem.getAttribute("code");
                if ( "".equals(subCode)){
                    continue;
                }
                Category.Builder subbuilder = Category.builder().id(subCode);
                subcategoriesBuildres.put(subCode, subbuilder);
            }
            if (!subcategoriesBuildres.isEmpty()) {
                subcategoriesMap.put(code, subcategoriesBuildres);
            }
            buildersMap.put(code, builder);
        }
        loadLabels(buildersMap, subcategoriesMap);
        Map<String,Category> tmp = new HashMap<>();
        for(Map.Entry<String,Category.Builder> entry : buildersMap.entrySet() ){
            String code = entry.getKey();
            Category.Builder builder = entry.getValue();
            Map<String, Category.Builder> inner = subcategoriesMap.get(code);
            if ( inner != null && !inner.isEmpty()){
                for (Map.Entry<String,Category.Builder> innerEntry : inner.entrySet()){
                    builder.subcategory(innerEntry.getValue().build());
                }
            }
            tmp.put(code,builder.build());
        }
        categoryMap = Collections.unmodifiableMap(tmp);
    }

    private void loadLabels(Map<String, Category.Builder> buildersMap, Map<String, Map<String, Category.Builder>> subcategoriesMap) {
        final Document labelsDoc = ResourceLoader.getXmlResource(STORE_CATEGORIES_RES);
        NodeList labels = labelsDoc.getElementsByTagName("category");
        for ( int i = 0 ; i < labels.getLength() ; i++ ){
            if ( labels.item(i).getNodeType() != Node.ELEMENT_NODE){
                continue;
            }
            Element e = (Element)labels.item(i);
            String code = e.getAttribute("code");
            Element subcategoryElem = (Element) e.getElementsByTagName("subcategory").item(0);
            String scNode = subcategoryElem.getAttribute("code");
            final Category.Builder target;
            if ("".equals(scNode)){
                target = buildersMap.get(code);
            }else{
                target = subcategoriesMap.get(code).get(scNode);
            }
            NodeList childNodes = subcategoryElem.getChildNodes();
            for ( int j = 0 ; j < childNodes.getLength() ; j++ ){
                if ( childNodes.item(j).getNodeType() != Node.ELEMENT_NODE){
                    continue;
                }
                Element element = (Element)childNodes.item(j);
                target.storeMapping(element.getAttribute("id"),element.getTextContent());
            }
        }
    }

    public Category getById(String id){
        return categoryMap.get(id);
    }

    public Collection<Category> getAll(){
        return categoryMap.values();
    }
}
