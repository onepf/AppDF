/*******************************************************************************
 * Copyright 2012 One Platform Foundation
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 ******************************************************************************/
package org.onepf.appdf.parser;

import org.onepf.appdf.model.Application;
import org.onepf.appdf.model.Categorisation;
import org.onepf.appdf.model.Categorisation.ApplicationType;
import org.onepf.appdf.model.Category;
import org.onepf.appdf.model.CategoryCatalog;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.Node;

import java.util.List;

public class CategorizationParser implements NodeParser<Application> {

    private static final String SUBCATEGORY_TAG = "subcategory";
    private static final String CATEGORY_TAG = "category";
    private static final String TYPE_TAG = "type";

    public void parse(Node node, Application application) throws ParsingException {
        List<Node> childElements = XmlUtil.extractChildElements(node);
        if (childElements.size() < 2) {
            throw new ParsingException("Minimum categorization child count is 2");
        }
        Categorisation categorisation = new Categorisation();
        String pendingSubCategoryId = null;
        for (Node n : childElements) {
            String nodeName = n.getNodeName();
            switch (nodeName) {
                case TYPE_TAG:
                    String typeValue = n.getTextContent().trim();
                    ApplicationType appType = ApplicationType.valueOf(typeValue.toUpperCase());
                    if (categorisation.getApplicationType() != null) {
                        throw new ParsingException("Multiple application type tags");
                    }
                    categorisation.setApplicationType(appType);
                    break;

                case CATEGORY_TAG:
                    String category = n.getTextContent().trim();
                    if (categorisation.getCategory() != null) {
                        throw new ParsingException("Multiple categories set");
                    }
                    Category byId = CategoryCatalog.INSTANCE.getById(category);
                    categorisation.setCategory(byId);
                    if (pendingSubCategoryId != null) {
                        Category subCategory = byId.getSubCategory(pendingSubCategoryId);
                        categorisation.setSubCategory(subCategory);
                        pendingSubCategoryId = null;
                    }
                    break;

                case SUBCATEGORY_TAG:
                    String subcategoryCode = n.getTextContent();
                    if (categorisation.getSubCategory() != null) {
                        throw new ParsingException("Subcategory allready set");
                    }
                    if (categorisation.getCategory() != null) {
                        Category subCategory = categorisation.getCategory().getSubCategory(subcategoryCode);
                        categorisation.setSubCategory(subCategory);
                    } else {
                        pendingSubCategoryId = subcategoryCode;
                    }
                    break;

                default:
                    throw new ParsingException("Unexpected tag in categorization:" + nodeName);
            }
        }
        application.setCategorisation(categorisation);
    }

}
