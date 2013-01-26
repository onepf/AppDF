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