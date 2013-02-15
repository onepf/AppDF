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

import org.onepf.appdf.model.PriceInfo;
import org.onepf.appdf.model.PriceInfo.Price;
import org.onepf.appdf.parser.util.XmlUtil;

import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;

public enum PriceTag implements NodeParser<PriceInfo> {

    BASE_PRICE {

        @Override
        public void parse(Node node, PriceInfo element) throws ParsingException {
            String priceValue = node.getTextContent();
            Price price = new Price();
            price.setCurrencyCode("usd");
            price.setPrice(priceValue);
            element.setBasePrice(price);
        }
    },
    LOCAL_PRICE {

        @Override
        public void parse(Node node, PriceInfo element) throws ParsingException {
            NamedNodeMap attrs = node.getAttributes();
            String countryCode = XmlUtil.getOptionalAttributeValue(attrs,
                    "country");
            String currencyCode = XmlUtil.getOptionalAttributeValue(attrs,
                    "currency");
            if (countryCode == null) {
                throw new ParsingException("Country code missing");
            }
            if (currencyCode == null) {
                throw new ParsingException("Currency code missing");
            }
            Price p = new Price();
            p.setCountryCode(countryCode);
            p.setCurrencyCode(currencyCode);
            p.setPrice(node.getTextContent());
            element.addLocalPrice(p);
        }

    },
    TRIAL_VERSION {

        @Override
        public void parse(Node node, PriceInfo element) throws ParsingException {
            String fullVersionPackage = XmlUtil.getOptionalAttributeValue(node.getAttributes(), "full-version");
            if ( fullVersionPackage == null ){
                throw new ParsingException("Full version package attribute is missing");
            }
            element.setFullVersionPackage(fullVersionPackage);
        }
        
    }
    ;
}
