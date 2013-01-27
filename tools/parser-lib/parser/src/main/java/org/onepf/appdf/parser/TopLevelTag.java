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
import org.onepf.appdf.model.Availability;
import org.onepf.appdf.model.ContentDescription;
import org.onepf.appdf.model.PriceInfo;
import org.w3c.dom.Node;

public enum TopLevelTag implements NodeParser<Application> {

    CATEGORIZATION {

        @Override
        public void parse(Node node, Application application)
                throws ParsingException {
            (new CategorizationParser()).parse(node, application);
        }

    },
    DESCRIPTION {

        @Override
        public void parse(Node node, Application application)
                throws ParsingException {
            (new DescriptionParser(true)).parse(node, application);
        }

    },
    DESCRIPTION_LOCALIZATION {
        @Override
        public void parse(Node node, Application application)
                throws ParsingException {
            (new DescriptionParser(false)).parse(node, application);
        }

    },
    CONTENT_DESCRIPTION {

        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            ContentDescription contentDescription = new ContentDescription();
            (new ContentDescriptionParser()).parse(node, contentDescription);
            element.setContentDescription(contentDescription);
        }
    },
    AVAILABILITY {

        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            Availability availability = new Availability();
            (new AvailabilityParser()).parse(node, availability);
            element.setAvalability(availability);
        }

    },
    PRICE {

        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            PriceInfo priceInfo = new PriceInfo();
            Node freeAttr = node.getAttributes().getNamedItem("free");
            if ( freeAttr == null ){
                throw new ParsingException("Required attribute free is missing inside price tag");
            }
            priceInfo.setFree("yes".equalsIgnoreCase(freeAttr.getTextContent()));
            (new PriceParser()).parse(node, priceInfo);
            element.setPriceInfo(priceInfo);
        }

    };
}
