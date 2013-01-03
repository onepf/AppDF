package org.onepf.appdf.model;

public class Categorisation {

	public enum ApplicationType{
		APPLICATION,
		GAME
	}
	
	private ApplicationType applicationType;
	
	private String category;
	
	private String subCategory;

	public ApplicationType getApplicationType() {
		return applicationType;
	}

	public void setApplicationType(ApplicationType applicationType) {
		this.applicationType = applicationType;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}
	
}
