package org.onepf.appdf.parser;

import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.onepf.appdf.model.Application;
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
		}else if ( applicationNodeList.getLength() > 1 ){
			throw new ParsingException("More than one application elem in description.xml");
		}else{
			Node applicationNode = applicationNodeList.item(0);
			
			NodeList childNodes = applicationNode.getChildNodes();
			
			for ( int i = 0 ; i < childNodes.getLength() ; i++ ){
				Node child = childNodes.item(i);
				if ( child.getNodeType() != Node.ELEMENT_NODE){
					continue;
				}
				String childTagName = child.getNodeName();
				boolean found = false;
				System.out.println("Tag:" + childTagName);
				for ( TopLevelTag tag : TopLevelTag.values()){
					if ( childTagName.equalsIgnoreCase(tag.name())){
						tag.parseNode(child, application, zipFile);
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

}
