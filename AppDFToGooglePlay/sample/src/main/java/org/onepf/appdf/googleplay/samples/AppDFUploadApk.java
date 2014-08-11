package org.onepf.appdf.googleplay.samples;

import com.google.api.client.repackaged.com.google.common.base.Preconditions;
import com.google.api.client.repackaged.com.google.common.base.Strings;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.onepf.appdf.googleplay.GooglePlayUploadAppDFTask;

import javax.security.auth.login.CredentialException;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.security.GeneralSecurityException;

/**
 * Created by krozov on 05.08.14.
 */
public class AppDFUploadApk {
    private static final Log LOG = LogFactory.getLog(AppDFUploadApk.class);

    /**
     * Relative path to AppDF file like "/sample.appdf"
     */
    static final String APP_DF_PATH = "";

    public static void main(String[] args) throws URISyntaxException {
        Preconditions.checkArgument(!Strings.isNullOrEmpty(APP_DF_PATH),
                                    "Path to AppDF file can't be null or empty.");

        URL resource = AppDFUploadApk.class.getResource(APP_DF_PATH);
        GooglePlayUploadAppDFTask task = new GooglePlayUploadAppDFTask(resource.toURI());
        try {
            task.execute();
        } catch (IOException | GeneralSecurityException | URISyntaxException e) {
            LOG.error(
                    String.format("Exception was thrown while uploading apk to %s track",
                                  task.getApkTrack().getName()),
                    e);
        }
    }
}
