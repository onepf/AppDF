package org.onepf.appdf.model;

public class AdditionalStore extends StoreSpecificInfo {

    private final String name;

    public AdditionalStore(String name) {
        this.name = name;
    }

    @Override
    public SupportedStore getStore() {
        return SupportedStore.EXTRA;
    }
    @Override
    public String getStoreName() {
        return name;
    }

}
