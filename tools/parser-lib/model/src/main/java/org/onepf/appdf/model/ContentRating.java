package org.onepf.appdf.model;

public enum ContentRating {
	
	EVERYONE(3),
	
	LOW_MATURITY(6),
	
	MEDIUM_MATURITY_TEN(10),//need to think better name for these ones
	
	MEDIUM_MATURITY_THIRTEEN(13),
	
	HIGH_MATURITY_SEVENTEEN(17),
	
	HIGH_MATURITY_EIGHTEEN(18)
	;

	private final int value;
	
	public int getDigitalValue() {
		return value;
	}

	private ContentRating(int value) {
		this.value = value;
	}
	
	public static ContentRating getByDigital(int value){
	    for ( ContentRating cr : values()){	        
	        if ( cr.value == value ){
	            return cr;
	        }
	    }
	    return null;
	}
}
