package org.onepf.appdf.model;

import org.junit.Before;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.assertThat;

/**
 * @author: nikolayivanov
 */
public class CurrencyCatalogTest {


    private static final String RES_NAME = "currencies.xml";

    private int lineCount;

    @Before
    public void lineCount() throws Exception{
        InputStream resourceAsStream = getClass().getResourceAsStream(RES_NAME);
        BufferedReader reader = new BufferedReader(new InputStreamReader(resourceAsStream));
        try{
            int lineCount = 0;
            while( reader.readLine() != null ){
                lineCount++;
            }
            this.lineCount = lineCount - 2;//Not counting opening and ending tags
        }finally {
            resourceAsStream.close();
            reader.close();
        }
    }

    /**
     * Checks that count is same
     */
    @Test
    public void checkLanguageCount(){
        assertThat(CurrencyCatalog.INSTANCE.getAll().size(),is(lineCount));
    }

    @Test
    public void checkUSDollarPresence(){
        assertThat(CurrencyCatalog.INSTANCE.getByCode("USD"),notNullValue());
    }

    @Test
    public void checkUsDollarName(){
        assertThat(CurrencyCatalog.INSTANCE.getByCode("USD").getName(),is("United States dollar"));
    }
}
