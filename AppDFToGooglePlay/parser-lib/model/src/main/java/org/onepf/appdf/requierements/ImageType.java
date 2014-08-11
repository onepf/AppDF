package org.onepf.appdf.requierements;

/**
 * Created by krozov on 05.08.14.
 */
public enum ImageType {
    IMAGE_TYPE_ICON("icon"),
    IMAGE_TYPE_ICON_SMALL("iconSmall"),
    IMAGE_TYPE_FEATURE_GRAPHIC("featureGraphic"),
    IMAGE_TYPE_PHONE_SCREENSHOTS("phoneScreenshots"),
    IMAGE_TYPE_PROMO_GRAPHICS("promoGraphic"),
    IMAGE_TYPE_SEVEN_INCH_SCREENSHOTS("sevenInchScreenshots"),
    IMAGE_TYPE_TEN_INCH_SCREENSHOTS("tenInchScreenshots"),
    IMAGE_TYPE_PHONE_SCREENSHOT_LANDSCAPE("phoneScreenshotsLandscape");

    private final String imageType;

    private ImageType(String imageType) {
        this.imageType = imageType;
    }

    @Override
    public String toString() {
        return imageType;
    }
}
