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
	private CustomerSupport customerSupport;

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

    public CustomerSupport getCustomerSupport() {
        return customerSupport;
    }

    public void setCustomerSupport(CustomerSupport customerSupport) {
        this.customerSupport = customerSupport;
    }

    public void addStoreSpecificInfo(StoreSpecificInfo info){
        if ( storeSpecific == null ){
            storeSpecific = new ArrayList<StoreSpecificInfo>();
        }
        storeSpecific.add(info);
    }
}
