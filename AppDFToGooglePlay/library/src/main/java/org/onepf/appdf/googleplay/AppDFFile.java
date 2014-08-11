package org.onepf.appdf.googleplay;

import org.onepf.appdf.model.Application;
import org.onepf.appdf.parser.AppdfFileParser;

import java.io.File;
import java.io.IOException;
import java.net.URI;

/**
 * Description of AppDF file.
 * <p/>
 * Created by krozov on 06.08.14.
 */
public class AppDFFile extends File {

    private Application application;
    private String appPackageName;

    public AppDFFile(String pathname) {
        super(pathname);
    }

    public AppDFFile(String parent, String child) {
        super(parent, child);
    }

    public AppDFFile(File parent, String child) {
        super(parent, child);
    }

    public AppDFFile(URI uri) {
        super(uri);
    }

    public Application getApplication() throws IOException {
        if (application == null) {
            application = new AppdfFileParser(this).parse().getApplication();
        }
        return application;
    }

    public String getAppPackageName() throws IOException {
        if (appPackageName == null) {
            appPackageName = getApplication().getPackageName();
        }
        return appPackageName;
    }
}
