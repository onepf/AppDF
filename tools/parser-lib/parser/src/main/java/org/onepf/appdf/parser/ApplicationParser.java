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

import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.onepf.appdf.model.Application;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.DOMException;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class ApplicationParser {

	private static final String APPLICATION_TAG = "application";

	/**
	 * Parses provided zip entry as main desription.xml and fills provided application model with values
	 * @param zipFile 
	 * @param elem
	 * @param application
	 * @throws A RuntimeException as a wrapper around any inner exception this is mostly a temporary solution
	 */
	public  void parse(ZipFile zipFile, ZipEntry elem, Application application) {
		InputStream inputStream = null;
		try {			
			inputStream = zipFile.getInputStream(elem);
			DocumentBuilderFactory builderFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder documentBuilder = builderFactory.newDocumentBuilder();
			Document document = documentBuilder.parse(inputStream);
			parseApplicationDocument(document, application, zipFile);
		} catch (Exception e) {//TODO:Proper exception handling
			throw new RuntimeException(e);
		}finally {
			if ( inputStream != null ){
				try {
					inputStream.close();
				} catch (IOException e) {
					//ignore
				}
			}
		}
		
	}
	
	private void parseApplicationDocument(Document document,Application application,ZipFile zipFile){
		NodeList applicationNodeList = document.getElementsByTagName(APPLICATION_TAG);
		if ( applicationNodeList.getLength() == 0 ){
			throw new ParsingException("Application elem is missing");
		}else{
			Node applicationNode = applicationNodeList.item(0);
			String packageName = XmlUtil.getOptionalAttributeValue(applicationNode.getAttributes(), "package");
			if ( packageName == null ){
			    throw new ParsingException("Package is missing");
			}
			application.setPackageName(packageName);
			parseApplicationNode(application, applicationNode);				
		}
	}

    public void parseApplicationNode(Application application,
            Node applicationNode) throws ParsingException, DOMException {
        NodeList childNodes = applicationNode.getChildNodes();
        
        for ( int i = 0 ; i < childNodes.getLength() ; i++ ){
        	Node child = childNodes.item(i);
        	if ( child.getNodeType() != Node.ELEMENT_NODE){
        		continue;
        	}
        	String childTagName = child.getNodeName().toUpperCase().replace('-', '_');
        	boolean found = false;
        	for ( TopLevelTag tag : TopLevelTag.values()){
        		if ( childTagName.equals(tag.name())){
        			tag.parse(child, application);
        			found = true;
        			break;
        		}
        	
        	}
        	if ( !found ){
        		throw new ParsingException("Unexpected tag:" + childTagName + " node.text=" + child.getTextContent());
        	}
        }
    }

}
