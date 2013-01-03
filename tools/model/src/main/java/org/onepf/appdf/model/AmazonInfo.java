package org.onepf.appdf.model;

public class AmazonInfo extends StoreSpecificInfo {

	public enum FormFactor {
		PHONE, TABLET, ALL
	}

	public static class KindleSupport {
		private boolean kindleFireFirstGen;
		private boolean kindleFire;
		private boolean kindleFireHD;
		private boolean kindleFireHD89;

		public boolean isKindleFireFirstGen() {
			return kindleFireFirstGen;
		}

		public void setKindleFireFirstGen(boolean kindleFireFirstGen) {
			this.kindleFireFirstGen = kindleFireFirstGen;
		}

		public boolean isKindleFire() {
			return kindleFire;
		}

		public void setKindleFire(boolean kindleFire) {
			this.kindleFire = kindleFire;
		}

		public boolean isKindleFireHD() {
			return kindleFireHD;
		}

		public void setKindleFireHD(boolean kindleFireHD) {
			this.kindleFireHD = kindleFireHD;
		}

		public boolean isKindleFireHD89() {
			return kindleFireHD89;
		}

		public void setKindleFireHD89(boolean kindleFireHD89) {
			this.kindleFireHD89 = kindleFireHD89;
		}
	}

	private FormFactor formFactor;
	private boolean freeAppOfTheDayEligibility;
	private boolean applyDrm;
	private KindleSupport kindleSupport;
	private String binaryAlias;

	public FormFactor getFormFactor() {
		return formFactor;
	}

	public void setFormFactor(FormFactor formFactor) {
		this.formFactor = formFactor;
	}

	public boolean isFreeAppOfTheDayEligibility() {
		return freeAppOfTheDayEligibility;
	}

	public void setFreeAppOfTheDayEligibility(boolean freeAppOfTheDayEligibility) {
		this.freeAppOfTheDayEligibility = freeAppOfTheDayEligibility;
	}

	public boolean isApplyDrm() {
		return applyDrm;
	}

	public void setApplyDrm(boolean applyDrm) {
		this.applyDrm = applyDrm;
	}

	public KindleSupport getKindleSupport() {
		return kindleSupport;
	}

	public void setKindleSupport(KindleSupport kindleSupport) {
		this.kindleSupport = kindleSupport;
	}

	public String getBinaryAlias() {
		return binaryAlias;
	}

	public void setBinaryAlias(String binaryAlias) {
		this.binaryAlias = binaryAlias;
	}

}
