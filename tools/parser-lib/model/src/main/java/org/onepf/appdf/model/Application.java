package org.onepf.appdf.model;

import java.util.List;

/**
 * Represents root application model info 
 * @author nivanov
 *
 */

public class Application {
	
	private String packageName;
	private Categorisation categorisation;
	private List<Description> descriptions;
	private ContentDescription contentDescription;
	private Avalability avalability;
	private ApkFilesInfo filesInfo;
	private Requirments requirments;
	private List<StoreSpecificInfo> storeSpecific;
	private String testingInstructions;
	private Consent consent;

	public String getPackageName() {
		return packageName;
	}

	public void setPackageName(String packageName) {
		this.packageName = packageName;
	}

	public Categorisation getCategorisation() {
		return categorisation;
	}

	public void setCategorisation(Categorisation categorisation) {
		this.categorisation = categorisation;
	}

	public List<Description> getDescriptions() {
		return descriptions;
	}

	public void setDescriptions(List<Description> descriptions) {
		this.descriptions = descriptions;
	}

	public ContentDescription getContentDescription() {
		return contentDescription;
	}

	public void setContentDescription(ContentDescription contentDescription) {
		this.contentDescription = contentDescription;
	}

	public Avalability getAvalability() {
		return avalability;
	}

	public void setAvalability(Avalability avalability) {
		this.avalability = avalability;
	}

	public ApkFilesInfo getFilesInfo() {
		return filesInfo;
	}

	public void setFilesInfo(ApkFilesInfo filesInfo) {
		this.filesInfo = filesInfo;
	}

	public Requirments getRequirments() {
		return requirments;
	}

	public void setRequirments(Requirments requirments) {
		this.requirments = requirments;
	}

	public List<StoreSpecificInfo> getStoreSpecific() {
		return storeSpecific;
	}

	public void setStoreSpecific(List<StoreSpecificInfo> storeSpecific) {
		this.storeSpecific = storeSpecific;
	}

	public String getTestingInstructions() {
		return testingInstructions;
	}

	public void setTestingInstructions(String testingInstructions) {
		this.testingInstructions = testingInstructions;
	}

	public Consent getConsent() {
		return consent;
	}

	public void setConsent(Consent consent) {
		this.consent = consent;
	}

}
