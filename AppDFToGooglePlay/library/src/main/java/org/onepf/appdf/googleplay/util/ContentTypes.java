package org.onepf.appdf.googleplay.util;

/**
 * Different content types that upload in Google Play.
 * <p/>
 * Created by krozov on 06.08.14.
 */
public interface ContentTypes {
    /**
     * Apk file content type.
     */
    String MIME_TYPE_APK = "application/vnd.android.package-archive";

    /**
     * Png image content type.
     */
    String MIME_TYPE_PNG = "image/png";

    /**
     * Expansion file content type.
     */
    String MIME_TYPE_EXPANSION = "application/octet-stream";
}
