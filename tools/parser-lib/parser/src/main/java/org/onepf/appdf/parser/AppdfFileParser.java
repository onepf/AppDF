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

import java.io.File;
import java.io.IOException;
import java.util.Enumeration;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import org.onepf.appdf.model.Application;



public class AppdfFileParser {
	
	/**
	 * This file <b>must</b> be present in appdf format
	 */
	
	private static final String ROOT_FILE_NAME = "description.xml";
	
	private final ZipFile zipFile;
	
	
	public AppdfFileParser(File file) throws  IOException{
		this.zipFile = new ZipFile(file,ZipFile.OPEN_READ);
	}
	
	public AppdfFileParser(String path) throws IOException{
		this(new File(path));
	}
	
	/**
	 *TODO Do we need an async version?
	 * @return
	 */
	public Application parse() throws ParsingException{
		Enumeration<? extends ZipEntry> entries = zipFile.entries();
		Application application = new Application();
		ApplicationParser applicationParser = new ApplicationParser();
		
		while ( entries.hasMoreElements()){
			ZipEntry elem = entries.nextElement();
			String name = elem.getName();			
			if(ROOT_FILE_NAME.equals(name)){
				applicationParser.parse(zipFile,elem,application);
			}
		}
		return application;		
	}
}
