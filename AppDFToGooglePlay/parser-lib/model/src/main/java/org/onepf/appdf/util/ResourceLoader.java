package org.onepf.appdf.util;

import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.IOException;
import java.io.InputStream;

/**
 * @author: nikolayivanov
 */
public class ResourceLoader {

    public static Document getXmlResource(String name) {
        InputStream is = ResourceLoader.class.getResourceAsStream(name);
        try {
            return DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(is);
        } catch (Exception e) {
            throw new RuntimeException(e);
        } finally {
            try {
                if (is != null) {
                    is.close();
                }
            } catch (IOException ignored) {

            }
        }
    }

    private ResourceLoader() {

    }
}
