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
	 *TODO Do we beed an async version?}
	 * @return
	 */
	public Application parse(){
		Enumeration<? extends ZipEntry> entries = zipFile.entries();
		Application application = new Application();
		while ( entries.hasMoreElements()){
			ZipEntry elem = entries.nextElement();
			String name = elem.getName();
			if(ROOT_FILE_NAME.equals(name)){
				
			}
		}
		return application;		
	}
}
