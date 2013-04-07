package org.onepf.appdf.parser;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

import org.junit.Before;
import org.onepf.appdf.model.Application;

public abstract class AbstractResourceTest {

    protected File resource;

    @Before
    public void initResource() throws URISyntaxException {
    	URL resourceUrl = ParserTest.class.getResource(getResourceName());
    	resource = new File(resourceUrl.toURI());
    }

    protected abstract String getResourceName();

    public Application parseApplication() throws IOException, ParsingException {
        AppdfFileParser parser = new AppdfFileParser(resource);
        Application application = parser.parse().getApplication();
        return application;
    }
}