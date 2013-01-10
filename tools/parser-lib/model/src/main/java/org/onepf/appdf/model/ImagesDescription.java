package org.onepf.appdf.model;

import java.util.List;

public class ImagesDescription {

	private List<AppIcon> appIcons;
	private String largePromo;
	private String smallPromo;
	private List<String> screenShots;
	public List<AppIcon> getAppIcons() {
		return appIcons;
	}
	public void setAppIcons(List<AppIcon> appIcons) {
		this.appIcons = appIcons;
	}
	public String getLargePromo() {
		return largePromo;
	}
	public void setLargePromo(String largePromo) {
		this.largePromo = largePromo;
	}
	public String getSmallPromo() {
		return smallPromo;
	}
	public void setSmallPromo(String smallPromo) {
		this.smallPromo = smallPromo;
	}
	public List<String> getScreenShots() {
		return screenShots;
	}
	public void setScreenShots(List<String> screenShots) {
		this.screenShots = screenShots;
	}
	
	
}
