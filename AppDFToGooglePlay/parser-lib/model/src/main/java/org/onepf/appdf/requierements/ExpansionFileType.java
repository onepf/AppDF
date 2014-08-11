package org.onepf.appdf.requierements;

/**
 * Created by krozov on 05.08.14.
 */
public enum ExpansionFileType {

    EXPANSION_FILE_TYPE_MAIN("main"),
    EXPANSION_FILE_TYPE_PATCH("patch");

    private final String name;

    ExpansionFileType(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return name;
    }
}
