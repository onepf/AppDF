package org.onepf.appdf.requierements;

/**
 * Description of requirements for apps that need for public app.
 * <p/>
 * Created by krozov on 05.08.14.
 */
public interface StoreRequirements {

    /**
     * Constant that must return for count of length params that support bot not limited.
     */
    int NO_LIMIT_COUNT = -1;

    /**
     * Constant that must return for count of length params that no supported.
     */
    int NOT_SUPPORTED = -2;

    int getTitleMaxLength();

    /**
     * Maximum length of short description.
     *
     * @return Number of symbols, or {@link StoreRequirements#NO_LIMIT_COUNT} if no any limits.
     */
    int getShortDescriptionMaxLength();

    /**
     * Maximum length of full description in store listing.
     *
     * @return Number of symbols, or {@link StoreRequirements#NO_LIMIT_COUNT} if no any limits.
     */
    int getFullDescriptionMaxLength();

    /**
     * Min number of screenshots that must be in store listing.
     *
     * @return Number of images, or {@link StoreRequirements#NO_LIMIT_COUNT} if no any screenshots need.
     */
    int getMinImagePerTypeCount(ImageType imageType);

    int getMaxImagePerTypeCount(ImageType imageType);

    boolean getImageRequired(ImageType imageType);

    boolean getImageSupported(ImageType imageType);

    ImageDimension getImageTypeDimension(ImageType imageType);

    /**
     *
     * @return Is only youtube video can contain store listing.
     */
    boolean onlyYouTubeVideo();

    ContactDetail[] getRequiredContactDetails();

    ContactDetail[] getSupportedContactDetails();

    boolean expansionSupported();

    long expansionMaxSize();

    ImageContentType[] getSupportedImagesContent();

    boolean isFeaturesSupported();

    int getMinRequiredFeaturesCount();

    int getMaxRequiredFeaturesCount();

    boolean supportKeywords();
}
