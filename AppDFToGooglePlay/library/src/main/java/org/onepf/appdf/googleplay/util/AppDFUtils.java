package org.onepf.appdf.googleplay.util;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.zip.ZipFile;

/**
 * Different utilities for AppDF file.
 * <p/>
 * Created by krozov on 06.08.14.
 */
public final class AppDFUtils {

    /**
     * Open stream to file that lie in AppDF file.
     *
     * @param appDFFile AppDF file in what lie file.
     * @param filePath  Relative path of file in AppDF file.
     * @return File stream.
     * @throws IOException When an IO error occurs.
     */
    public static InputStream getFileAsStream(File appDFFile, final String filePath) throws IOException {
        ZipFile zipFile = new ZipFile(appDFFile, ZipFile.OPEN_READ);
        return zipFile.getInputStream(zipFile.getEntry(filePath));
    }

    private AppDFUtils() {
        //Disable create instance of utility class.
    }
}
