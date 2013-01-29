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

public class Requirments implements ModelElement{

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
	
	public void addSupportedLanguage(String lang){
	    if ( supportedLanguages == null ){
	        supportedLanguages = new ArrayList<String>();
	    }
	    supportedLanguages.add(lang);
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

    public void addSupportedLanguages(List<String> langs) {
       if ( this.supportedLanguages == null ){
           this.supportedLanguages = new ArrayList<String>(langs);
       }else{
          this.supportedLanguages.addAll(langs); 
       }
        
    }

    public void addExcludedDevices(List<String> excludedDevices) {
        if ( this.excludedDevices == null ){
            this.excludedDevices = new ArrayList<String>(excludedDevices);
        }else{
            this.excludedDevices.addAll(excludedDevices);
        }
        
    }
}
