package org.onepf.appdf.model;

public class ContentDescriptor {

	public enum DescriptorValue {
		NO,
		LIGHT,
		STRONG
	}
	
	private DescriptorValue cartoonViolence;
	
	private DescriptorValue realisticViolence;
	
	private DescriptorValue badLanguage;
	
	private DescriptorValue fear;
	
	private DescriptorValue sexualContent;
	
	private DescriptorValue drugs;
	
	private DescriptorValue gamblingReference;
	
	private DescriptorValue alcohol;
	
	private DescriptorValue smoking;
	
	private DescriptorValue discrimination;
}
