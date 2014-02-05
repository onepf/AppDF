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

public class ImagesDescription implements ModelElement {

	private List<AppIcon> appIcons;
	private LargePromo largePromo;
	private SmallPromo smallPromo;
	private List<Screenshot> screenShots;
	public List<AppIcon> getAppIcons() {
		return appIcons;
	}
	public void setAppIcons(List<AppIcon> appIcons) {
		this.appIcons = appIcons;
	}
	public LargePromo getLargePromo() {
		return largePromo;
	}
	public void setLargePromo(LargePromo largePromo) {
		this.largePromo = largePromo;
	}
	public SmallPromo getSmallPromo() {
		return smallPromo;
	}
	public void setSmallPromo(SmallPromo smallPromo) {
		this.smallPromo = smallPromo;
	}
	public List<Screenshot> getScreenShots() {
		return screenShots;
	}
	public void setScreenShots(List<Screenshot> screenShots) {
		this.screenShots = screenShots;
	}
	
	public void addAppIcon(AppIcon appIcon){
	    if ( appIcons == null ){
	        appIcons = new ArrayList<AppIcon>();
	    }
	    appIcons.add(appIcon);
	}
	
	public void addScreenshot(Screenshot screenshot){
	    if ( screenShots == null ){
	        screenShots = new ArrayList<Screenshot>();
	    }
	    screenShots.add(screenshot);
	}
	
}
