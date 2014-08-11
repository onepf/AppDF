package org.onepf.appdf.requierements;

/**
 * Requirements for publishing apk.
 * <p/>
 * For get instance use {@link GooglePlayRequirements#getInstance()}.
 * <p/>
 * Created by krozov on 05.08.14.
 */
public class GooglePlayRequirements extends DefaultStoreRequirements {

    private static final int FULL_DESCRIPTION_MAX_LENGTH = 4000;
    private static final int SHORT_DESCRIPTION_MAX_LENGTH = 80;
    private static final int TITLE_MAX_LENGTH = 30;
    private static final ContactDetail[] REQUIRED_CONTACT_DETAILS = {
            ContactDetail.CONTACT_DETAIL_WEBSITE,
            ContactDetail.CONTACT_DETAIL_EMAIL,
    };
    private static final ContactDetail[] SUPPORTED_CONTACT_DETAILS = {
            ContactDetail.CONTACT_DETAIL_WEBSITE,
            ContactDetail.CONTACT_DETAIL_EMAIL,
            ContactDetail.CONTACT_DETAIL_PHONE,
            ContactDetail.CONTACT_DETAIL_LANGUAGE
    };
    private static final int MIN_SCREENSHOTS_COUNT = 2;
    private static final int MAX_SCREENSHOTS_COUNT = 8;
    private static final ImageContentType[] SUPPORTED_IMAGE_CONTENT_TYPES = {
            ImageContentType.IMAGE_CONTENT_TYPE_JPEG,
            ImageContentType.IMAGE_CONTENT_TYPE_PNG24
    };
    private static final ImageDimension PROMO_IMAGE_DIMENSION = new ImageDimension(180, 120);
    private static final ImageDimension FEATURE_IMAGE_DIMENSION = new ImageDimension(1024, 500);
    private static final ImageDimension ICON_IMAGE_DIMENSION = new ImageDimension(512, 512);
    private static final ImageDimension SCREENSHOT_IMAGE_DIMENSION
            = new ImageDimension(320, 3840, 320, 3840);
    private static final long EXPANSION_MAX_SIZE = 2L * 1024 * 1024L * 1024L; //bytes in 2Gb

    @Override
    public int getShortDescriptionMaxLength() {
        return SHORT_DESCRIPTION_MAX_LENGTH;
    }

    @Override
    public int getFullDescriptionMaxLength() {
        return FULL_DESCRIPTION_MAX_LENGTH;
    }

    @Override
    public int getTitleMaxLength() {
        return TITLE_MAX_LENGTH;
    }

    @Override
    public boolean getImageSupported(ImageType imageType) {
        switch (imageType) {
            case IMAGE_TYPE_FEATURE_GRAPHIC:
            case IMAGE_TYPE_ICON:
            case IMAGE_TYPE_PHONE_SCREENSHOTS:
            case IMAGE_TYPE_PROMO_GRAPHICS:
            case IMAGE_TYPE_SEVEN_INCH_SCREENSHOTS:
            case IMAGE_TYPE_TEN_INCH_SCREENSHOTS:
                return true;

            case IMAGE_TYPE_PHONE_SCREENSHOT_LANDSCAPE:
            default:
                return false;
        }
    }

    @Override
    public boolean onlyYouTubeVideo() {
        return true;
    }

    @Override
    public ContactDetail[] getRequiredContactDetails() {
        return REQUIRED_CONTACT_DETAILS;
    }

    @Override
    public boolean expansionSupported() {
        return true;
    }

    @Override
    public long expansionMaxSize() {
        return EXPANSION_MAX_SIZE;
    }

    @Override
    public int getMinImagePerTypeCount(ImageType imageType) {
        switch (imageType) {
            case IMAGE_TYPE_PHONE_SCREENSHOTS:
                return MIN_SCREENSHOTS_COUNT;

            case IMAGE_TYPE_PROMO_GRAPHICS:
            case IMAGE_TYPE_TEN_INCH_SCREENSHOTS:
            case IMAGE_TYPE_SEVEN_INCH_SCREENSHOTS:
                return 0;

            case IMAGE_TYPE_ICON:
            case IMAGE_TYPE_FEATURE_GRAPHIC:
                return 1;

            case IMAGE_TYPE_ICON_SMALL:
            case IMAGE_TYPE_PHONE_SCREENSHOT_LANDSCAPE:
            default:
                return NOT_SUPPORTED;
        }
    }

    @Override
    public int getMaxImagePerTypeCount(ImageType imageType) {
        switch (imageType) {
            case IMAGE_TYPE_TEN_INCH_SCREENSHOTS:
            case IMAGE_TYPE_SEVEN_INCH_SCREENSHOTS:
            case IMAGE_TYPE_PHONE_SCREENSHOTS:
                return MAX_SCREENSHOTS_COUNT;

            case IMAGE_TYPE_PROMO_GRAPHICS:
            case IMAGE_TYPE_ICON:
            case IMAGE_TYPE_FEATURE_GRAPHIC:
                return 1;

            case IMAGE_TYPE_ICON_SMALL:
            default:
                return NOT_SUPPORTED;
        }
    }

    @Override
    public ImageDimension getImageTypeDimension(ImageType imageType) {
        switch (imageType) {
            case IMAGE_TYPE_PROMO_GRAPHICS:
                return PROMO_IMAGE_DIMENSION;

            case IMAGE_TYPE_FEATURE_GRAPHIC:
                return FEATURE_IMAGE_DIMENSION;

            case IMAGE_TYPE_ICON:
                return ICON_IMAGE_DIMENSION;

            case IMAGE_TYPE_TEN_INCH_SCREENSHOTS:
            case IMAGE_TYPE_SEVEN_INCH_SCREENSHOTS:
            case IMAGE_TYPE_PHONE_SCREENSHOTS:
                return SCREENSHOT_IMAGE_DIMENSION;

            case IMAGE_TYPE_ICON_SMALL:
            default:
                return null;
        }
    }

    @Override
    public boolean getImageRequired(ImageType imageType) {
        return false;
    }

    @Override
    public ContactDetail[] getSupportedContactDetails() {
        return SUPPORTED_CONTACT_DETAILS;
    }

    @Override
    public ImageContentType[] getSupportedImagesContent() {
        return SUPPORTED_IMAGE_CONTENT_TYPES;
    }

    private GooglePlayRequirements() {
        //Can't create instance;
    }

    public static GooglePlayRequirements getInstance() {
        return InstanceHolder.INSTANCE;
    }

    private static final class InstanceHolder {
        public static final GooglePlayRequirements INSTANCE = new GooglePlayRequirements();

        private InstanceHolder() {

        }
    }

    @Override
    public boolean supportKeywords() {
        return false;
    }
}
