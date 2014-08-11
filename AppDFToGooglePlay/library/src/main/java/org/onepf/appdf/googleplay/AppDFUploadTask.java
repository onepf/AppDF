package org.onepf.appdf.googleplay;

import com.google.api.client.repackaged.com.google.common.base.Preconditions;
import org.onepf.appdf.model.Application;
import org.onepf.appdf.parser.AppdfFileParser;
import org.onepf.appdf.requierements.StoreRequirements;

import java.io.File;
import java.io.IOException;
import java.net.URI;

/**
 * Base task for upload AppDf to store.
 * For run task call {@link AppDFUploadTask#execute()}.
 * <p/>
 * Created by krozov on 06.08.14.
 */
public abstract class AppDFUploadTask {

    protected final StoreRequirements storeRequirements;
    protected final AppDFFile appDFFile;

    /**
     * @param appDFFileUri      URI of AppDF file.
     * @param storeRequirements Requirements for store in what upload apk.
     */
    public AppDFUploadTask(URI appDFFileUri, StoreRequirements storeRequirements) {
        Preconditions.checkArgument(storeRequirements != null, "Store requirements can't be null.");
        this.appDFFile = new AppDFFile(appDFFileUri);
        Preconditions.checkArgument(appDFFile.exists(), "AppDf file doesn't exist.");
        this.storeRequirements = storeRequirements;
    }

    /**
     * Execute uploading of AppDF file to store.
     *
     * @throws Exception
     */
    public abstract void execute() throws Exception;
}
