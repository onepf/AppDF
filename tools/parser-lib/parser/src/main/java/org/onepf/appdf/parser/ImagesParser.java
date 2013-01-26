package org.onepf.appdf.parser;

import org.onepf.appdf.model.Description;

public class ImagesParser extends BaseParser<Description, ImagesTag> {

    public ImagesParser() {
        super(ImagesTag.class, "images");
    }

}
