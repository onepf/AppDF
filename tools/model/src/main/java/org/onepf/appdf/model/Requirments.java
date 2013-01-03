package org.onepf.appdf.model;

import java.util.List;

public class Requirments {

	private Features features;
	
	private List<String> supportedLanguages;
	
	private List<String> excludedDevices;
	
	private List<Resolution> includedResolutions;
	
	private List<Resolution> excludedResolutions;

	public Features getFeatures() {
		return features;
	}

	public void setFeatures(Features features) {
		this.features = features;
	}

	public List<String> getSupportedLanguages() {
		return supportedLanguages;
	}

	public void setSupportedLanguages(List<String> supportedLanguages) {
		this.supportedLanguages = supportedLanguages;
	}

	public List<String> getExcludedDevices() {
		return excludedDevices;
	}

	public void setExcludedDevices(List<String> excludedDevices) {
		this.excludedDevices = excludedDevices;
	}

	public List<Resolution> getIncludedResolutions() {
		return includedResolutions;
	}

	public void setIncludedResolutions(List<Resolution> includedResolutions) {
		this.includedResolutions = includedResolutions;
	}

	public List<Resolution> getExcludedResolutions() {
		return excludedResolutions;
	}

	public void setExcludedResolutions(List<Resolution> excludedResolutions) {
		this.excludedResolutions = excludedResolutions;
	}
}
