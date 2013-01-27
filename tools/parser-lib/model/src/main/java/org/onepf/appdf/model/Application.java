package org.onepf.appdf.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents root application model info 
 * @author nivanov
 *
 */

public class Application implements ModelElement {
	
	private String packageName;
	private Categorisation categorisation;
	private Description mainDescription;
	private List<Description> descriptionLocalisations;
	private ContentDescription contentDescription;
	private Availability avalability;
	private ApkFilesInfo filesInfo;
	private Requirments requirments;
	private List<StoreSpecificInfo> storeSpecific;
	private String testingInstructions;
	private Consent consent;
	private PriceInfo priceInfo;

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
		return descriptionLocalisations;
	}

	public void setDescriptions(List<Description> descriptions) {
		this.descriptionLocalisations = descriptions;
	}

	public ContentDescription getContentDescription() {
		return contentDescription;
	}

	public void setContentDescription(ContentDescription contentDescription) {
		this.contentDescription = contentDescription;
	}

	public Availability getAvalability() {
		return avalability;
	}

	public void setAvalability(Availability avalability) {
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
	
	public void addDescriptionLocalisation(Description description){
	    if ( descriptionLocalisations == null ){
	        descriptionLocalisations = new ArrayList<Description>();
	    }
	    descriptionLocalisations.add(description);
	}

    public Description getMainDescription() {
        return mainDescription;
    }

    public void setMainDescription(Description mainDescription) {
        this.mainDescription = mainDescription;
    }

    public PriceInfo getPriceInfo() {
        return priceInfo;
    }

    public void setPriceInfo(PriceInfo priceInfo) {
        this.priceInfo = priceInfo;
    }

    public List<Description> getDescriptionLocalisations() {
        return descriptionLocalisations;
    }

}
