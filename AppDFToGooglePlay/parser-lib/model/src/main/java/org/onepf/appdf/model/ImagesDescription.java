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

import org.onepf.appdf.requierements.ImageDimension;
import org.onepf.appdf.requierements.ImageType;
import org.onepf.appdf.requierements.StoreRequirements;
import org.onepf.appdf.util.CollectionUtils;

import java.util.ArrayList;
import java.util.List;

public class ImagesDescription implements ModelElement {

    private List<AppIcon> appIcons;
    private String largePromo;
    private String smallPromo;
    private List<String> screenShots;

    public List<AppIcon> getAppIcons() {
        return appIcons;
    }

    public AppIcon getAppIcon(StoreRequirements requirements) {
        if (CollectionUtils.isEmpty(appIcons)) {
            return null;
        }

        ImageDimension iconDim = requirements.getImageTypeDimension(ImageType.IMAGE_TYPE_ICON);
        if (iconDim.isFixedSize()) {
            for (AppIcon appIcon : appIcons) {
                if (appIcon.getWidth() == iconDim.getMinWidth()
                        && appIcon.getHeight() == iconDim.getMinHeight()) {
                    return appIcon;
                }
            }
        } else {
            AppIcon result = null;
            for (AppIcon appIcon : appIcons) {
                if (appIcon.getWidth() >= iconDim.getMinWidth() &&
                        appIcon.getWidth() <= iconDim.getMaxWidth() &&
                        appIcon.getHeight() >= iconDim.getMinHeight() &&
                        appIcon.getHeight() <= iconDim.getMaxHeight()) {
                    if (result == null ||
                            result.getWidth() * result.getHeight() <
                                    appIcon.getWidth() * appIcon.getHeight()) {
                        result = appIcon;
                    }
                }
            }
            return result;
        }
        return null;
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

    public void addAppIcon(AppIcon appIcon) {
        if (appIcons == null) {
            appIcons = new ArrayList<>();
        }
        appIcons.add(appIcon);
    }

    public void addScreenshot(String screenshot) {
        if (screenShots == null) {
            screenShots = new ArrayList<>();
        }
        screenShots.add(screenshot);
    }

}
