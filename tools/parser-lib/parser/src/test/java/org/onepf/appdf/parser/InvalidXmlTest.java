package org.onepf.appdf.parser;

import org.junit.Before;
import org.junit.Test;
import org.onepf.appdf.model.Application;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

/**
 * @author: nikolayivanov
 */
public class InvalidXmlTest {
    private File resource;

    @Before
    public void initResource() throws URISyntaxException {
        URL resourceUrl = getClass().getResource("com.softspb.geo_game.appdf");
        resource = new File(resourceUrl.toURI());
    }

    public Application parseApplication() throws IOException, ParsingException {
        AppdfFileParser parser = new AppdfFileParser(resource);
        Application application = parser.parse().getApplication();
        return application;
    }

    @Test(expected = ParsingException.class)
    public void parseFailed() throws IOException {
        parseApplication();
    }
}

