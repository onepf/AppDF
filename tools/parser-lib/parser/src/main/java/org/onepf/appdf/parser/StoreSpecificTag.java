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

import static org.onepf.appdf.parser.util.XmlUtil.*;

import java.util.Arrays;
import java.util.List;

import org.onepf.appdf.model.AmazonInfo;
import org.onepf.appdf.model.Application;
import org.onepf.appdf.model.AmazonInfo.KindleSupport;
import org.onepf.appdf.model.GoogleInfo;
import org.onepf.appdf.model.SamsungInfo;
import org.onepf.appdf.model.SlidemeInfo;
import org.onepf.appdf.model.StoreSpecificInfo;
import org.w3c.dom.Node;

public enum StoreSpecificTag implements NodeParser<Application> {
    AMAZON {

        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            AmazonInfo info = new AmazonInfo();
            List<Node> skippedNodes = mapChildsToBean(node, AmazonInfo.class,
                    info, Arrays.asList(KINDLE_SUPPORT_TAG, APPLICATION_TAG));
            for (Node n : skippedNodes) {
                String tag = n.getNodeName();
                if (KINDLE_SUPPORT_TAG.equals(tag)) {
                    KindleSupport support = new KindleSupport();
                    mapChildsToBean(n, KindleSupport.class, support);
                    info.setKindleSupport(support);
                } else {
                    handleApplicationTag(n, info);
                }
            }
            element.addStoreSpecificInfo(info);

        }

    },
    SLIDEME {

        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            SlidemeInfo info = new SlidemeInfo();
            for (Node n : extractChildElements(node)) {
                String tag = node.getNodeName();
                if (LICENSE_TYPE_TAG.equals(tag)) {
                    info.setLicenseType(n.getTextContent());
                } else if (APPLICATION_TAG.equals(tag)) {
                    handleApplicationTag(n, info);
                } else {
                    throw new ParsingException("Unsupported tag:" + tag);
                }
            }
            element.addStoreSpecificInfo(info);

        }

    },
    SAMSUNG {

        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            // spec is missing for now so handling only
            SamsungInfo info = new SamsungInfo();
            defaultHandle(node, element, info);
        }

    },
    GOOGLE {

        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            defaultHandle(node, element, new GoogleInfo());
        }

    },
    OPERA {
        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            defaultHandle(node, element, new GoogleInfo());
        }
    },
    YANDEX {
        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            defaultHandle(node, element, new GoogleInfo());
        }
    },
    NOOK {
        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            defaultHandle(node, element, new GoogleInfo());
        }
    };

    private static final String KINDLE_SUPPORT_TAG = "kindle-support";
    private static final String LICENSE_TYPE_TAG = "license-type";
    private static final String APPLICATION_TAG = "application";

    protected void handleApplicationTag(Node n, StoreSpecificInfo info) {
        ApplicationParser parser = new ApplicationParser();
        Application app = new Application();
        parser.parseApplicationNode(app, n);
        info.setApplication(app);
    }

    protected void defaultHandle(Node node, Application element,
            StoreSpecificInfo info) {
        for (Node n : extractChildElements(node)) {
            String tag = n.getNodeName();
            if (APPLICATION_TAG.equals(tag)) {
                handleApplicationTag(n, info);
            }
        }
        element.addStoreSpecificInfo(info);
    }

}
