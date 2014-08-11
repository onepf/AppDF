package org.onepf.appdf.googleplay.track;

/**
 * Created by krozov on 05.08.14.
 */
public final class Rollout extends ApkTrack {
    public static final String NAME = "rollout";
    private final double userFraction;

    Rollout(double userFraction) {
        super(NAME);
        if (userFraction < 5 || 50 < userFraction) {
            throw new IllegalArgumentException("Illegal userFraction " + userFraction + "%.");
        }
        this.userFraction = userFraction;
    }

    public double getUserFraction() {
        return userFraction;
    }

    @Override
    public String toString() {
        return NAME + ":" + userFraction;
    }
}
