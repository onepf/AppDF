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

import org.onepf.appdf.model.Features;
import org.onepf.appdf.model.Requirments;
import org.w3c.dom.Node;

import java.util.List;

import static org.onepf.appdf.parser.util.XmlUtil.collectNodeValues;
import static org.onepf.appdf.parser.util.XmlUtil.mapChildsToBean;


public enum RequirmentTags implements NodeParser<Requirments>{
    FEATURES{

        @Override
        public void parse(Node node, Requirments element)
                throws ParsingException {
            Features features = new Features();
            mapChildsToBean(node, Features.class,features);
            element.setFeatures(features);
        }
        
    },
    SUPPORTED_LANGUAGES {
        
        private final static String LANGUAGE_TAG = "language";

        @Override
        public void parse(Node node, Requirments element)
                throws ParsingException {
           List<String> langs = collectNodeValues(node, LANGUAGE_TAG);
           element.addSupportedLanguages(langs);
           element.addSupportedLanguages(langs);
        }
        
    },
    SUPPORTED_DEVICES {

        
        private final static String EXCLUDE_TAG = "exclude";
        
        @Override
        public void parse(Node node, Requirments element)
                throws ParsingException {
            List<String> excludedDevices = collectNodeValues(node, EXCLUDE_TAG);
            element.addSupportedDevices(excludedDevices);
        }
        
    }
    ;
}
