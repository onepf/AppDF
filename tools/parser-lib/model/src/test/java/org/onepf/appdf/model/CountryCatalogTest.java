package org.onepf.appdf.model;

import org.junit.Before;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.notNullValue;
import static org.junit.Assert.assertThat;

/**
 * @author: nikolayivanov
 */
public class CountryCatalogTest {
    private static final String RES_NAME = "countries.xml";

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
        assertThat(CountryCatalog.INSTANCE.getAll().size(),is(lineCount));
    }

    @Test
    public void checkUs(){
        Country us = CountryCatalog.INSTANCE.getByCode("US");
        assertThat(us,notNullValue());
        Currency usd = CurrencyCatalog.INSTANCE.getByCode("USD");
        assertThat(us.getCurrency(),is(usd));
        List<Language> languageList = us.getLanguageList();
        assertThat(languageList.size(),is(1));
        Language en = LanguageCatalog.INSTANCE.getByCode("en");
        assertThat(us.getLanguageList().iterator().next(),is(en));
    }


}
