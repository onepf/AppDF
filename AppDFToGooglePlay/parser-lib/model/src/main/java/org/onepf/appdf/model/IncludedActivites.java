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

public class IncludedActivites {

	private boolean inAppBilling;
	
	private boolean gambling;
	
	private boolean advertising;
	
	private boolean userGeneratedContent;
	
	private boolean userToUserCommunications;
	
	private boolean accountCreation;
	
	private boolean personalInformationCollection;

	public boolean isInAppBilling() {
		return inAppBilling;
	}

	public void setInAppBilling(boolean inAppBilling) {
		this.inAppBilling = inAppBilling;
	}

	public boolean isGambling() {
		return gambling;
	}

	public void setGambling(boolean gambling) {
		this.gambling = gambling;
	}

	public boolean isAdvertising() {
		return advertising;
	}

	public void setAdvertising(boolean advertising) {
		this.advertising = advertising;
	}

	public boolean isUserGeneratedContent() {
		return userGeneratedContent;
	}

	public void setUserGeneratedContent(boolean userGeneratedContent) {
		this.userGeneratedContent = userGeneratedContent;
	}
	                
	public boolean isUserToUserCommunications() {
		return userToUserCommunications;
	}

	public void setUserToUserCommunications(boolean userToUserCommunucation) {
		this.userToUserCommunications = userToUserCommunucation;
	}

	
	public boolean isAccountCreation() {
		return accountCreation;
	}

	public void setAccountCreation(boolean accountCreation) {
		this.accountCreation = accountCreation;
	}

	public boolean isPersonalInformationCollection() {
		return personalInformationCollection;
	}

	public void setPersonalInformationCollection(
			boolean personalInformationCollection) {
		this.personalInformationCollection = personalInformationCollection;
	}
	
	
}
