/*******************************************************************************
 * Copyright 2012 One Platform Foundation
 * 
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 * 
 *        http://www.apache.org/licenses/LICENSE-2.0
 * 
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 ******************************************************************************/
package org.onepf.appdf.parser;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.zip.ZipException;

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
		URL resourceUrl = ParserTest.class.getResource("yshell.appdf");
		resource = new File(resourceUrl.toURI());
	}
	
	@Test
	public void parserCreation() throws IOException{
		@SuppressWarnings("unused")
		AppdfFileParser parser = new AppdfFileParser(resource);
	}
	
	@Test
	public void parseDontFail() throws IOException {
		AppdfFileParser parser = new AppdfFileParser(resource);
		Application application = parser.parse();
		assertNotEquals(null, application);
	}
	@Test(expected=ZipException.class)
	public void failsOnNonZip() throws IOException, URISyntaxException{
		URL nonZipResourceURL = ParserTest.class.getResource("not.appdf");
		File file = new File(nonZipResourceURL.toURI());
		@SuppressWarnings("unused")
		AppdfFileParser parser = new AppdfFileParser(file);
	}
	
	@Test
	public void checkPackage() throws IOException{
	    AppdfFileParser parser = new AppdfFileParser(resource);
        Application application = parser.parse();
        assertThat(application.getPackageName(), is("ru.yandex.shell"));
	}
}
