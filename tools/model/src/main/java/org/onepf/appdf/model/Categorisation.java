package org.onepf.appdf.model;

public class Categorisation {

	public enum ApplicationType{
		APPLICATION,
		GAME
	}
	
	private ApplicationType applicationType;
	
	private String category;
	
	private String subCategory;
	
}
