package org.onepf.appdf.parser;

import org.onepf.appdf.model.ContentDescription;

public class ContentDescriptionParser extends BaseParser<ContentDescription, ContentDescriptionTag>{

    public ContentDescriptionParser() {
        super(ContentDescriptionTag.class,"content-descripion");
    }

}
