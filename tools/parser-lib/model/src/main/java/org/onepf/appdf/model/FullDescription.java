package org.onepf.appdf.model;

public class FullDescription {

	private String text;
	private boolean withHtml;
	private boolean featereless;
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public boolean isWithHtml() {
		return withHtml;
	}
	public void setWithHtml(boolean withHtml) {
		this.withHtml = withHtml;
	}
	public boolean isFeatereless() {
		return featereless;
	}
	public void setFeatereless(boolean featereless) {
		this.featereless = featereless;
	}
}
