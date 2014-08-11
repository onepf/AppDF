package org.onepf.appdf.googleplay.track;

/**
 * Created by krozov on 05.08.14.
 */
public class ApkTrack {

    public static final ApkTrack ALPHA = new ApkTrack("alpha");
    public static final ApkTrack BETA = new ApkTrack("beta");
    public static final ApkTrack PRODUCTION = new ApkTrack("production");

    private final String name;

    ApkTrack(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return name;
    }
}
