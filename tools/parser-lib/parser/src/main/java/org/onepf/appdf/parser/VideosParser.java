package org.onepf.appdf.parser;

import org.onepf.appdf.model.Description;

public class VideosParser extends BaseParser<Description, VideoTag> {

    public VideosParser() {
        super(VideoTag.class,"videos");
    }

}
