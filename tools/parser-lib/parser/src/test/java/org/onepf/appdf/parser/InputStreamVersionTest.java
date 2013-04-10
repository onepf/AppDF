package org.onepf.appdf.parser;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.junit.Assert.assertThat;

/**
 * @author: nikolayivanov
 */
public class InputStreamVersionTest {

    private InputStream inputStream;

    @Before
    public void streamCreation() throws IOException {

        InputStream resourceStream = getClass().getResourceAsStream("yashell.appdf");
        if ( resourceStream.markSupported()){
            inputStream = resourceStream;
        }else{
            int size = resourceStream.available();
            byte[] buff = new byte[size];
            int count;
            int offset = 0;
            while((count = resourceStream.read(buff,offset,buff.length - offset)) > 0 ){
                offset += count;
            }
            inputStream = new ByteArrayInputStream(buff);
        }

    }


    @After
    public void closeStream() throws IOException {
        inputStream.close();
    }
    @Test
    public void testParser() throws IOException, ParserConfigurationException, SAXException {
        AppdfStreamParser streamParser = new AppdfStreamParser(inputStream);
        ParseResult parseResult = streamParser.parse();
        InputStream stream = parseResult.getEntryStream("description.xml");
        assertThat(stream,is(notNullValue()));
        //Making sure parsing wont fail
        DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(stream);

    }
}
