package org.onepf.appdf.parser;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.core.IsNull.notNullValue;
import static org.junit.Assert.assertThat;

import java.io.IOException;
import java.util.Set;

import org.junit.Test;
import org.onepf.appdf.model.ApkFilesInfo;
import org.onepf.appdf.model.Application;

public class AdditionalStoreSupportTest extends AbstractResourceTest {

    private final static String RESOURCE = "com.softspb.geo_game_additional_store.appdf";
    @Override
    protected String getResourceName() {
        return RESOURCE;
    }
    
    @Test
    public void basicParsing() throws ParsingException, IOException{
        parseApplication();
    }

    @Test
    public void chinaMobilePresence() throws ParsingException, IOException {
        Application parseApplication = parseApplication();      
        Set<String> supportedStores = parseApplication.getSupportedStores();       
        assertThat(supportedStores.contains("chinamobile"),is(true));        
    }
    
 
    public void projectionCheck() throws ParsingException, IOException {
        Application parseApplication = parseApplication();
        Application projection = parseApplication.project("chinamobile");
        ApkFilesInfo filesInfo = projection.getFilesInfo();        
        assertThat(filesInfo.getApkFiles().size(),is(1));
        assertThat(filesInfo.getApkFiles().get(0),notNullValue());
        assertThat(filesInfo.getApkFiles().get(0).getFileName(),is("SPBGeoGameChinaMobile.apk"));
    }
}
