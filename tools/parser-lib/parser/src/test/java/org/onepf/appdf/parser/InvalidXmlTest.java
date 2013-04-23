package org.onepf.appdf.parser;

import java.io.IOException;

import org.junit.Test;

/**
 * @author: nikolayivanov
 */
public class InvalidXmlTest extends AbstractResourceTest {

    private static final String COM_SOFTSPB_GEO_GAME_APPDF = "com.softspb.geo_game.appdf";

    @Test(expected = ParsingException.class)
    public void parseFailed() throws IOException {
        parseApplication();
    }

    @Override
    protected String getResourceName() {
        return COM_SOFTSPB_GEO_GAME_APPDF;
    }
}
