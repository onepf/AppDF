package org.onepf.appdf.parser;

import org.onepf.appdf.model.Description;
import org.w3c.dom.Node;

public enum VideoTag implements NodeParser<Description> {

    YOUTUBE_VIDEO{

        @Override
        public void parse(Node node, Description element)
                throws ParsingException {
            element.setYouTubeVideo(node.getTextContent());            
        }        
    },
    VIDEO_FILE{

        @Override
        public void parse(Node node, Description element)
                throws ParsingException {
            element.addVideo(node.getTextContent());            
        }
        
    };
}
