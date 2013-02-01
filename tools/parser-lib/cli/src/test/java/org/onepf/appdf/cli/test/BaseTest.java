package org.onepf.appdf.cli.test;

import java.io.IOException;
import java.util.logging.LogManager;

import org.junit.Before;


public abstract class BaseTest {

    
    @Before
    public void setupLogger() throws SecurityException, IOException{
        LogManager.getLogManager().readConfiguration(BaseTest.class.getResourceAsStream("logging.properties"));
    }

}
