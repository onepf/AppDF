package org.onepf.appdf.model;

public class AmazonInfo extends StoreSpecificInfo {

	public enum FormFactor {
		PHONE,
		TABLET,
		ALL
	}
	
	public static class KindleSupport {
		private boolean kindleFireFirstGen;
		private boolean kindleFire;
		private boolean kindleFireHD;
		private boolean kindleFireHD89;
	}
	private FormFactor formFactor;
	private boolean freeAppOfTheDayEligibility;
	private boolean applyDrm;
	private KindleSupport kindleSupport;
	private String binaryAlias;
	
}
