package org.onepf.appdf.parser;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.zip.ZipException;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.onepf.appdf.model.Application;

/**
 * Test covers top level functionality of AppdfFileParser class
 * @author nivanov
 *
 */
public class ParserTest {
	
	private File resource;
	
	@Before
	public void initResource() throws URISyntaxException{
		URL resourceUrl = ParserTest.class.getResource("life.appdf");
		resource = new File(resourceUrl.toURI());
	}
	
	@Test
	public void parserCreation() throws IOException{
		AppdfFileParser parser = new AppdfFileParser(resource);
	}
	
	@Test
	public void parseDontFail() throws IOException {
		AppdfFileParser parser = new AppdfFileParser(resource);
		Application application = parser.parse();
		Assert.assertNotEquals(null, application);
	}
	@Test(expected=ZipException.class)
	public void failsOnNonZip() throws IOException, URISyntaxException{
		URL nonZipResourceURL = ParserTest.class.getResource("not.appdf");
		File file = new File(nonZipResourceURL.toURI());
		AppdfFileParser parser = new AppdfFileParser(file);
	}
}
