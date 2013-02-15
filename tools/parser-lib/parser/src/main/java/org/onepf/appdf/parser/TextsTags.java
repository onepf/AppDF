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

import java.util.List;

import org.onepf.appdf.model.Description;
import org.onepf.appdf.model.FullDescription;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;

public enum TextsTags implements NodeParser<Description> {
    TITLE {
        @Override
        public void parse(Node node, Description description) {
            description.addTitle(node.getTextContent());
        }

    },
    KEYWORDS {

        @Override
        public void parse(Node node, Description description) {
            String keywords = node.getTextContent();
            String[] splitedKeywords = keywords.split(",");
            for (String keyWord : splitedKeywords) {
                description.addKeyword(keyWord);
            }
        }

    },
    SHORT_DESCRIPTION {

        @Override
        public void parse(Node node, Description description) {
            description.addShortDescription(node.getTextContent());
        }

    },
    FULL_DESCRIPTION {
        private static final String HTML = "html";
        private static final String FEATURELESS = "featureless";

        @Override
        public void parse(Node node, Description description) {
            FullDescription fd = new FullDescription();
            fd.setText(node.getTextContent());
            NamedNodeMap attributes = node.getAttributes();
            boolean[] attrValue = new boolean[2];
            String[] attrName = new String[] { HTML, FEATURELESS };
            for (int i = 0; i < attrName.length; i++) {
                Node attribute = attributes.getNamedItem(attrName[i]);
                attrValue[i] = attribute == null ? false : "yes"
                        .equalsIgnoreCase(attribute.getTextContent());
            }
            fd.setWithHtml(attrValue[0]);
            fd.setFeatereless(attrValue[1]);
            description.addFullDescription(fd);
        }

    },
    FEATURES {

        @Override
        public void parse(Node node, Description element) {
            List<String> features = XmlUtil.collectNodeValues(node, FEATURE_TAG);
            element.addFeatures(features);
        }

    },
    RECENT_CHANGES {

        @Override
        public void parse(Node node, Description description) {
            description.setRecentChanges(node.getTextContent());
        }
    },
    PRIVACY_POLICY {

        @Override
        public void parse(Node node, Description description) {
            description.setPrivacyPolicy(node.getTextContent());
        }
    },
    EULA {

        @Override
        public void parse(Node node, Description description) {
            description.setEula(node.getTextContent());
        }
    };

    private static final String FEATURE_TAG = "feature";
}
