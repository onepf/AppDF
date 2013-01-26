package org.onepf.appdf.parser;

import org.onepf.appdf.model.Description;

public class TextsParser extends BaseParser<Description, TextsTags>{
	public static final String TAG = "texts";
	
	public TextsParser(){
	    super(TextsTags.class,"texts");
	}	
}