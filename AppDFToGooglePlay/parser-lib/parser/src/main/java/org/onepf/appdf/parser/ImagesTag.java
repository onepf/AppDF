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

import org.onepf.appdf.model.AppIcon;
import org.onepf.appdf.model.Description;
import org.onepf.appdf.model.ImagesDescription;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.Node;

import java.util.List;

public enum ImagesTag implements NodeParser<Description> {
    APP_ICON {

        private static final String WIDTH_ATTR = "width";
        private static final String HEIGHT_ATTR = "height";

        @Override
        public void parse(Node node, Description element) {
            Node widthAttr = node.getAttributes().getNamedItem(WIDTH_ATTR);
            Node heightAttr = node.getAttributes().getNamedItem(HEIGHT_ATTR);
            if (widthAttr == null) {
                throw new ParsingException("Required attribute width is missing");
            }
            if ( heightAttr == null ){
                throw new ParsingException("Required attribute height is missing");
            }
            int width = Integer.parseInt(widthAttr.getTextContent());
            int height = Integer.parseInt(heightAttr.getTextContent());
            AppIcon appIcon = new AppIcon();
            appIcon.setHeight(height);
            appIcon.setWidth(width);
            appIcon.setName(node.getTextContent());
            ImagesDescription imagesDescription = getImagesDescription(element);
            imagesDescription.addAppIcon(appIcon);
        }

    },
    LARGE_PROMO {

        @Override
        public void parse(Node node, Description element)
                throws ParsingException {
            ImagesDescription imagesDescription = getImagesDescription(element);
            if (imagesDescription.getLargePromo() != null) {
                throw new ParsingException("Multiple large promos");
            }
            imagesDescription.setLargePromo(node.getTextContent());
        }

    },
    SCREENSHOTS {

        private static final String SCREENSHOT_TAG = "screenshot";
        
        @Override
        public void parse(Node node, Description element)
                throws ParsingException {
            List<Node> screenshots = XmlUtil.extractChildElements(node);
            ImagesDescription imagesDescription = getImagesDescription(element);
            for (Node screenshotNode : screenshots){
                if ( !SCREENSHOT_TAG.equalsIgnoreCase(screenshotNode.getNodeName())){
                    throw new ParsingException("Unexpected tag inside screenshots:" + screenshotNode.getNodeName());
                }
                String content = screenshotNode.getTextContent();
                imagesDescription.addScreenshot(content);
            }
            
        }

    };

    protected ImagesDescription getImagesDescription(Description element) {
        ImagesDescription imagesDescription = element.getImagesDescription();
        if (imagesDescription == null) {
            imagesDescription = new ImagesDescription();
            element.setImagesDescription(imagesDescription);
        }
        return imagesDescription;
    }
}
