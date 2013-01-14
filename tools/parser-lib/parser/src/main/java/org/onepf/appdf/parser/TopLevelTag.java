package org.onepf.appdf.parser;

import java.util.zip.ZipFile;

import org.onepf.appdf.model.Application;
import org.w3c.dom.Node;

public enum TopLevelTag {

	CATEGORIZATION{

		@Override
		public void parseNode(Node nodeList, Application application,
				ZipFile zipFile) throws ParsingException {	
			throw new UnsupportedOperationException();
		}
		
	};
	
	
	public abstract void parseNode(Node node,Application application,ZipFile zipFile) throws ParsingException;
	
}
