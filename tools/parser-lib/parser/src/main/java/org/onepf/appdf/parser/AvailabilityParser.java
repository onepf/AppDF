package org.onepf.appdf.parser;

import org.onepf.appdf.model.Availability;

public class AvailabilityParser extends BaseParser<Availability,AvailabilityTag> {

    public AvailabilityParser() {
        super(AvailabilityTag.class, "availability");
    }

}
