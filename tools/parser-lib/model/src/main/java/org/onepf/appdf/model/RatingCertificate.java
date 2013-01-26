package org.onepf.appdf.model;

public class RatingCertificate {

	public enum CertificateType {
		PEGI, ESRB, GRB, CERO, DEJUS, FSK
	}

	private String value;
	private String certificate;
	private String mark;
	private CertificateType type;

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getCertificate() {
		return certificate;
	}

	public void setCertificate(String certificate) {
		this.certificate = certificate;
	}

	public String getMark() {
		return mark;
	}

	public void setMark(String mark) {
		this.mark = mark;
	}

    public CertificateType getType() {
        return type;
    }

    public void setType(CertificateType type) {
        this.type = type;
    }
}
