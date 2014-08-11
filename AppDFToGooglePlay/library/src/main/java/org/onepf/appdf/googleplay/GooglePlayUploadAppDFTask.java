package org.onepf.appdf.googleplay;

import com.google.api.client.http.InputStreamContent;
import com.google.api.client.repackaged.com.google.common.base.Preconditions;
import com.google.api.services.androidpublisher.AndroidPublisher;
import com.google.api.services.androidpublisher.model.Apk;
import com.google.api.services.androidpublisher.model.ApkListing;
import com.google.api.services.androidpublisher.model.AppDetails;
import com.google.api.services.androidpublisher.model.AppEdit;
import com.google.api.services.androidpublisher.model.ExpansionFile;
import com.google.api.services.androidpublisher.model.Listing;
import com.google.api.services.androidpublisher.model.Track;
import org.onepf.appdf.googleplay.track.ApkTrack;
import org.onepf.appdf.googleplay.track.Rollout;
import org.onepf.appdf.googleplay.util.AndroidPublisherHelper;
import org.onepf.appdf.googleplay.util.AppDFUtils;
import org.onepf.appdf.googleplay.util.ContentTypes;
import org.onepf.appdf.model.ApkFilesInfo;
import org.onepf.appdf.model.AppIcon;
import org.onepf.appdf.model.CustomerSupport;
import org.onepf.appdf.model.Description;
import org.onepf.appdf.requierements.ExpansionFileType;
import org.onepf.appdf.requierements.GooglePlayRequirements;
import org.onepf.appdf.requierements.ImageType;
import org.onepf.appdf.util.CollectionUtils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;

/**
 * Created by krozov on 05.08.14.
 */
public class GooglePlayUploadAppDFTask extends AppDFUploadTask {
    private final ApkTrack apkTrack;
    private final Mode mode;

    private AndroidPublisher.Edits edits;
    private AppEdit appEdit;

    public GooglePlayUploadAppDFTask(URI appDFFileUri) {
        this(appDFFileUri, ApkTrack.ALPHA, Mode.MODE_SIMPLE);
    }

    public GooglePlayUploadAppDFTask(URI appDFFileUri, ApkTrack apkTrack) {
        this(appDFFileUri, apkTrack, Mode.MODE_SIMPLE);
    }

    public GooglePlayUploadAppDFTask(URI appDFFileUri, ApkTrack apkTrack, Mode mode) {
        super(appDFFileUri, GooglePlayRequirements.getInstance());

        Preconditions.checkArgument(apkTrack != null, "Apk track can't be null.");
        Preconditions.checkArgument(mode != null, "Mode can't be null");

        this.apkTrack = apkTrack;
        this.mode = mode;
    }

    public void execute() throws IOException, GeneralSecurityException, URISyntaxException {
        init();

        List<Apk> apks = updateApks();
        updateRecentChanges(apks);
        updateDetails();
        updateListings();
        updateImages();

        edits.commit(appDFFile.getAppPackageName(), appEdit.getId());

        appEdit = null;
        edits = null;
    }

    protected void init() throws IOException, GeneralSecurityException, URISyntaxException {
        final AndroidPublisher service = AndroidPublisherHelper.init(appDFFile.getAppPackageName(), null);
        edits = service.edits();
        appEdit = edits.insert(appDFFile.getAppPackageName(), null).execute();
    }

    private void updateIcon(Description desc) throws IOException {
        AppIcon appIcon = desc.getImagesDescription().getAppIcon(storeRequirements);
        if (appIcon != null) {
            InputStream iconStream = AppDFUtils.getFileAsStream(appDFFile, appIcon.getName());
            edits.images()
                    .upload(appDFFile.getAppPackageName(),
                            appEdit.getId(),
                            desc.getLanguage().getBcp47Code(),
                            ImageType.IMAGE_TYPE_ICON.toString(),
                            new InputStreamContent(ContentTypes.MIME_TYPE_PNG, iconStream))
                    .execute();
        }
    }

    private void updateImages() throws IOException {
        Description mainDescription = appDFFile.getApplication().getMainDescription();
        updatePromoGraphic(mainDescription, false);
        updatePromoGraphic(mainDescription, true);
        updateScreenshots(mainDescription);
        updateIcon(mainDescription);

        List<Description> descriptions = appDFFile.getApplication().getDescriptions();
        if (!CollectionUtils.isEmpty(descriptions)) {
            for (Description desc : descriptions) {
                updatePromoGraphic(desc, false);
                updatePromoGraphic(desc, true);
                updateIcon(desc);
                updateScreenshots(desc);
            }
        }
    }

    private void updatePromoGraphic(Description desc, boolean small) throws IOException {
        String promo = small ? desc.getImagesDescription().getSmallPromo() :
                desc.getImagesDescription().getLargePromo();
        if (promo != null) {
            final String imageType = (small ? ImageType.IMAGE_TYPE_PROMO_GRAPHICS :
                    ImageType.IMAGE_TYPE_FEATURE_GRAPHIC).toString();
            InputStream iconStream = AppDFUtils.getFileAsStream(appDFFile, promo);
            edits.images()
                    .upload(appDFFile.getAppPackageName(),
                            appEdit.getId(),
                            desc.getLanguage().getBcp47Code(),
                            imageType,
                            new InputStreamContent(ContentTypes.MIME_TYPE_PNG, iconStream))
                    .execute();
        }
    }

    private void updateScreenshots(Description desc) throws IOException {
        AndroidPublisher.Edits.Images images = edits.images();
        images.deleteall(appDFFile.getAppPackageName(),
                         appEdit.getId(),
                         desc.getLanguage().getBcp47Code(),
                         ImageType.IMAGE_TYPE_PHONE_SCREENSHOTS.toString())
                .execute();
        List<String> screenshots = desc.getImagesDescription().getScreenShots();
        if (!CollectionUtils.isEmpty(screenshots)) {
            for (String screenshot : screenshots) {
                InputStream screenshotStream = AppDFUtils.getFileAsStream(appDFFile, screenshot);
                images.upload(appDFFile.getAppPackageName(),
                              appEdit.getId(),
                              desc.getLanguage().getBcp47Code(),
                              ImageType.IMAGE_TYPE_PHONE_SCREENSHOTS.toString(),
                              new InputStreamContent(ContentTypes.MIME_TYPE_PNG, screenshotStream))
                        .execute();
            }
        }
    }

    private void updateRecentChanges(Collection<Apk> apks) throws IOException {
        Collection<Integer> versionCodes;
        if (CollectionUtils.isEmpty(apks)) {
            return;
        } else {
            if (mode == Mode.MODE_ADVANCED) {
                versionCodes = new HashSet<>(apks.size());
                for (Apk apk : apks) {
                    versionCodes.add(apk.getVersionCode());
                }
            } else {
                int maxVersionCodes = Integer.MIN_VALUE;
                for (Apk apk : apks) {
                    if (apk.getVersionCode() > maxVersionCodes) {
                        maxVersionCodes = apk.getVersionCode();
                    }
                }
                if (maxVersionCodes > 0) {
                    versionCodes = Arrays.asList(maxVersionCodes);
                } else {
                    return;
                }
            }
        }

        updateRecentChange(appDFFile.getApplication().getMainDescription(), versionCodes);

        List<Description> descriptions = appDFFile.getApplication().getDescriptions();
        if (!CollectionUtils.isEmpty(descriptions)) {
            for (Description description : descriptions) {
                updateRecentChange(description, versionCodes);
            }
        }
    }

    private void updateRecentChange(Description description, Collection<Integer> versionCodes) throws IOException {
        ApkListing apkListing = new ApkListing().setRecentChanges(description.getRecentChanges());
        apkListing.setLanguage(description.getLanguage().getBcp47Code());
        edits.apks().list(appDFFile.getAppPackageName(), appEdit.getId());
        for (Integer versionCode : versionCodes) {
            edits.apklistings()
                    .update(appDFFile.getAppPackageName(),
                            appEdit.getId(),
                            versionCode, //TODO set apk version codes
                            description.getLanguage().getBcp47Code(),
                            apkListing)
                    .execute();
        }
    }

    private void updateDetails() throws IOException {
        CustomerSupport customerSupport = appDFFile.getApplication().getCustomerSupport();
        AppDetails details =
                new AppDetails()
                        .setContactEmail(customerSupport.getEmail())
                        .setContactPhone(customerSupport.getPhone())
                        .setContactWebsite(customerSupport.getWebsite());
//        details.setDefaultLanguage()
        edits.details()
                .update(appDFFile.getAppPackageName(), appEdit.getId(), details)
                .execute();
    }

    public ApkTrack getApkTrack() {
        return apkTrack;
    }

    private List<Apk> updateApks() throws IOException {
        ApkFilesInfo filesInfo = appDFFile.getApplication().getFilesInfo();
        if (filesInfo == null) {
            return null;
        }

        List<ApkFilesInfo.ApkFile> apkFiles = filesInfo.getApkFiles();
        if (CollectionUtils.isEmpty(apkFiles)) {
            return null;
        }

        final List<Apk> apks = new ArrayList<>(apkFiles.size());
        for (ApkFilesInfo.ApkFile apkFile : apkFiles) {
            apks.add(updateApk(apkFile));
        }
        return apks;
    }

    private Apk updateApk(ApkFilesInfo.ApkFile apkFile) throws IOException {
        InputStream apkStream = AppDFUtils.getFileAsStream(appDFFile, apkFile.getFileName());
        AndroidPublisher.Edits.Apks.Upload uploadRequest = edits.apks()
                .upload(appDFFile.getAppPackageName(), appEdit.getId(),
                        new InputStreamContent(ContentTypes.MIME_TYPE_APK, apkStream));
        final Apk apk = uploadRequest.execute();

        Track track = new Track();
        if (this.apkTrack instanceof Rollout) {
            track.setUserFraction(((Rollout) this.apkTrack).getUserFraction());
        }
        track.setVersionCodes(Arrays.asList(apk.getVersionCode()));
        edits.tracks()
                .update(appDFFile.getAppPackageName(),
                        appEdit.getId(),
                        this.apkTrack.getName(),
                        track)
                .execute();
        return apk;
    }

    private void updateListings() throws IOException {
        updateListing(appDFFile.getApplication().getMainDescription());
        List<Description> descriptions = appDFFile.getApplication().getDescriptions();
        if (!CollectionUtils.isEmpty(descriptions)) {
            for (Description description : descriptions) {
                updateListing(description);
            }
        }
    }

    private void updateListing(Description description) throws IOException {
        Listing listing = new Listing()
                .setShortDescription(description.getShortDescriptions(storeRequirements))
                .setTitle(description.getTitle(storeRequirements))
                .setFullDescription(
                        description.getFullDescription(storeRequirements).getText());
        listing.setLanguage(description.getLanguage().getBcp47Code());
        if (storeRequirements.onlyYouTubeVideo()) {
            listing.setVideo(description.getYouTubeVideo());
        }
        edits.listings()
                .update(appDFFile.getAppPackageName(),
                        appEdit.getId(),
                        description.getLanguage().getBcp47Code(),
                        listing)
                .execute();
    }

    /**
     * Mode for Google Play console.
     *
     * @see <a href="http://developer.android.com/google/play/publishing/multiple-apks.html">
     * Multiple APK Support</a>
     */
    public static enum Mode {

        /**
         * Advanced mode of console. Multiple apks can be active in same time.
         *
         * @see <a href="http://developer.android.com/google/play/publishing/multiple-apks.html#HowItWorks">
         * How Multiple APKs Work</a>
         */
        MODE_ADVANCED,

        /**
         * Simple mode of console. Only one apk can be active in one time.
         *
         * @see <a href="http://developer.android.com/google/play/publishing/multiple-apks.html#SingleAPK">
         * Using a Single APK</a>
         */
        MODE_SIMPLE
    }
}
