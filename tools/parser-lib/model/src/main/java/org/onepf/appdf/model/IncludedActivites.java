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
