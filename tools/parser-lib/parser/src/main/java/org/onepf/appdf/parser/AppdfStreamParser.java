package org.onepf.appdf.parser;

import org.onepf.appdf.model.Application;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * @author: nikolayivanov
 */
public class AppdfStreamParser {

    private static final String ROOT_FILE_NAME = "description.xml";

    private InputStream inputStream;

    public AppdfStreamParser(InputStream inputStream) throws IOException {
        this.inputStream = inputStream;
        if(!inputStream.markSupported()){
            throw new IllegalArgumentException("Only streams that supports mark/reset can be used as param");
        }
        inputStream.mark(inputStream.available());
    }

    public ParseResult parse() throws ParsingException, IOException {
        Application application = new Application();
        ApplicationParser applicationParser = new ApplicationParser();
        inputStream.reset();
        ZipInputStream zis = new ZipInputStream(inputStream);
        for ( ZipEntry entry = zis.getNextEntry() ; entry != null ; entry = zis.getNextEntry()){
            String name = entry.getName();
            if(ROOT_FILE_NAME.equals(name)){
                int size = (int) entry.getSize();
                byte[] buff = new byte[size];
                int count;
                int offset = 0;
                while((count = zis.read(buff,offset,size - offset)) > 0){
                    offset += count;
                }
                zis.closeEntry();
                applicationParser.parse(new ByteArrayInputStream(buff),application);
                break;
            }
        }
        return new StreamParseResult(application,inputStream);
    }
}
