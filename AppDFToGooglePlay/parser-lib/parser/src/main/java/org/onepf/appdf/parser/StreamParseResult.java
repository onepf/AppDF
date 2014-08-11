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
public class StreamParseResult extends ParseResult {

    private InputStream stream;

    protected StreamParseResult(Application application, InputStream stream) {
        super(application, null);
        this.stream = stream;
    }

    @Override
    public InputStream getEntryStream(String path) throws IOException {
        stream.reset();
        ZipInputStream zis = new ZipInputStream(stream);
        for(ZipEntry entry = zis.getNextEntry() ; entry != null ; entry = zis.getNextEntry()){
            if ( entry.getName().equals(path)){
                int size = (int)entry.getSize();//we don't support files longer than Integer.MAX_INT
                byte[] buff = new byte[size];
                int count;
                int offset = 0;
                while ( (count = zis.read(buff,offset,buff.length - offset)) > 0){
                    offset += count;
                }
                ByteArrayInputStream resultStream = new ByteArrayInputStream(buff);
                zis.closeEntry();
                return resultStream;
            }
        }
        return null;
    }
}
