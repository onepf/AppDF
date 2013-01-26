package org.onepf.appdf.parser;

import java.util.List;

import org.onepf.appdf.model.AppIcon;
import org.onepf.appdf.model.Description;
import org.onepf.appdf.model.ImagesDescription;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.Node;

public enum ImagesTag implements NodeParser<Description> {
    APP_ICON {

        private static final String SIZE_ATTR = "size";

        @Override
        public void parse(Node node, Description element) {
            Node sizeAttr = node.getAttributes().getNamedItem(SIZE_ATTR);
            if (sizeAttr == null) {
                throw new ParsingException("Required attribute size is missing");
            }
            int size = Integer.parseInt(sizeAttr.getTextContent());
            AppIcon appIcon = new AppIcon();
            appIcon.setSize(size);
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
                imagesDescription.addScreenshot(node.getTextContent());
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
