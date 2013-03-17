/*******************************************************************************
 * Copyright 2012 One Platform Foundation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
package org.onepf.appdf.model;

public class AmazonInfo extends StoreSpecificInfo {

	public enum FormFactor {
		PHONE, TABLET, ALL
	}

	public static class KindleSupport {
		private boolean kindleFireFirstGen;
		private boolean kindleFire;
		private boolean kindleFireHd;
		private boolean kindleFireHd89;

		public boolean isKindleFireFirstGeneration() {
			return kindleFireFirstGen;
		}

		public void setKindleFireFirstGeneration(boolean kindleFireFirstGen) {
			this.kindleFireFirstGen = kindleFireFirstGen;
		}

		public boolean isKindleFire() {
			return kindleFire;
		}

		public void setKindleFire(boolean kindleFire) {
			this.kindleFire = kindleFire;
		}

		public boolean isKindleFireHd() {
			return kindleFireHd;
		}

		public void setKindleFireHd(boolean kindleFireHD) {
			this.kindleFireHd = kindleFireHD;
		}

		public boolean isKindleFireHd89() {
			return kindleFireHd89;
		}

		public void setKindleFireHd89(boolean kindleFireHD89) {
			this.kindleFireHd89 = kindleFireHD89;
		}
	}

	private FormFactor formFactor;
	private boolean freeAppOfTheDayEligibility;
	private boolean applyAmazonDrm;
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

	public boolean isApplyAmazonDrm() {
		return applyAmazonDrm;
	}

	public void setApplyAmazonDrm(boolean applyDrm) {
		this.applyAmazonDrm = applyDrm;
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

    @Override
    public SupportedStore getStore() {
       return SupportedStore.AMAZON;
    }

}
