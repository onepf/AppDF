package org.onepf.appdf.parser;

import java.io.IOException;

import org.junit.Test;

public class AdditionalStoreSupportTest extends AbstractResourceTest {

    private final static String RESOURCE = "com.softspb.geo_game_additional_store.appdf";
    @Override
    protected String getResourceName() {
        return RESOURCE;
    }
    
    @Test
    public void basicParsing() throws ParsingException, IOException{
        parseApplication();
    }

}
