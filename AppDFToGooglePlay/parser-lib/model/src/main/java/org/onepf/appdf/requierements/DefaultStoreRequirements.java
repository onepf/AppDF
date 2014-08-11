package org.onepf.appdf.requierements;

/**
 * Created by krozov on 05.08.14.
 */
public abstract class DefaultStoreRequirements implements StoreRequirements {

    @Override
    public boolean getImageRequired(ImageType imageType) {
        return false;
    }

    @Override
    public boolean getImageSupported(ImageType imageType) {
        return false;
    }

    @Override
    public boolean expansionSupported() {
        return false;
    }

    @Override
    public long expansionMaxSize() {
        return NOT_SUPPORTED;
    }

    @Override
    public int getMinRequiredFeaturesCount() {
        return NOT_SUPPORTED;
    }

    @Override
    public int getMaxRequiredFeaturesCount() {
        return NOT_SUPPORTED;
    }

    @Override
    public boolean isFeaturesSupported() {
        return false;
    }
}
