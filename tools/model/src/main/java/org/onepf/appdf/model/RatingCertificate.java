package org.onepf.appdf.model;

public class RatingCertificate {

	public enum CertificateType {
		PEGI,
		ESRB,
		GRB,
		CERO,
		DEJUS,
		FSK
	}
	
	private String value;
	private String certificate;
	private String mark;
}
