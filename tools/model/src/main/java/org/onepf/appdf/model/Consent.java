package org.onepf.appdf.model;

public class Consent {

	private boolean androidContentGuidelines;
	private boolean usExportLaw;

	public boolean isAndroidContentGuidelines() {
		return androidContentGuidelines;
	}

	public void setAndroidContentGuidelines(boolean androidContentGuidelines) {
		this.androidContentGuidelines = androidContentGuidelines;
	}

	public boolean isUsExportLaw() {
		return usExportLaw;
	}

	public void setUsExportLaw(boolean usExportLaw) {
		this.usExportLaw = usExportLaw;
	}
}
