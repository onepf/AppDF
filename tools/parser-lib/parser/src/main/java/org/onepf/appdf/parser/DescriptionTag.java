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

import org.onepf.appdf.model.Description;
import org.w3c.dom.Node;

public enum DescriptionTag implements NodeParser<Description> {
    TEXTS {
        @Override
        public void parse(Node node, Description description) {
            (new TextsParser()).parse(node, description);

        }
    },
    IMAGES {
        @Override
        public void parse(Node node, Description element) {
            (new ImagesParser()).parse(node, element);
        }

    },
    VIDEOS{

        @Override
        public void parse(Node node, Description element)
                throws ParsingException {
          (new VideosParser()).parse(node, element);            
        }
        
    };
}
