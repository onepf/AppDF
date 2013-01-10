package org.onepf.appdf.parser;

import java.io.File;
import java.io.IOException;
import java.util.zip.ZipFile;

import org.onepf.appdf.model.Application;

public class AppdfFileParser {
	
	private final ZipFile zipFile;
	
	
	public AppdfFileParser(File file) throws  IOException{
		this.zipFile = new ZipFile(file,ZipFile.OPEN_READ);
	}
	
	public AppdfFileParser(String path) throws IOException{
		this(new File(path));
	}
	
	public Application parse(){
		throw new UnsupportedOperationException();
	}
}
