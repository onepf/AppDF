package org.onepf.appdf.model;

import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.IOException;
import java.io.InputStream;

/**
 * @author: nikolayivanov
 */
class ResourceLoader {

    static Document getXmlResource(String name){
        InputStream resourceStream = ResourceLoader.class
                .getResourceAsStream(name);
        try {
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory
                    .newInstance();
            DocumentBuilder documentBuilder = documentBuilderFactory
                    .newDocumentBuilder();
            return documentBuilder.parse(resourceStream);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        finally {
            try {
                resourceStream.close();
            } catch (IOException e) {
                //ignore
            }
        }
    }
}
