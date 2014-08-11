package org.onepf.appdf.requierements;

/**
 * Created by krozov on 05.08.14.
 */
public class ImageDimension {
    private final int minWidth;
    private final int maxWidth;

    private final int minHeight;
    private final int maxHeight;

    public ImageDimension(int width, int height) {
        this.minWidth = width;
        this.maxWidth = width;

        this.minHeight = height;
        this.maxHeight = height;
    }

    public ImageDimension(int minWidth, int maxWidth, int minHeight, int maxHeight) {
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;

        this.minHeight = minHeight;
        this.maxHeight = maxHeight;
    }

    public boolean isFixedSize() {
        return minWidth == maxWidth && minHeight == maxHeight;
    }

    public int getMinWidth() {
        return minWidth;
    }

    public int getMaxWidth() {
        return maxWidth;
    }

    public int getMinHeight() {
        return minHeight;
    }

    public int getMaxHeight() {
        return maxHeight;
    }
}
