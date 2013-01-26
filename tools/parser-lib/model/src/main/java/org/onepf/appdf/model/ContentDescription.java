package org.onepf.appdf.model;

import java.util.ArrayList;
import java.util.List;

public class ContentDescription implements ModelElement {
	
	private ContentRating contentRating;
	
	private List<RatingCertificate> ratingCertificates;
	
	private IncludedActivites includedActivites;
	
	private ContentDescriptor contentDescriptor;

	public ContentRating getContentRating() {
		return contentRating;
	}

	public void setContentRating(ContentRating contentRating) {
		this.contentRating = contentRating;
	}

	public List<RatingCertificate> getRatingCertificates() {
		return ratingCertificates;
	}

	public void setRatingCertificates(List<RatingCertificate> ratingCertificates) {
		this.ratingCertificates = ratingCertificates;
	}

	
	public void addRatingCertificate(RatingCertificate ratingCertificate){
	    if ( ratingCertificates == null ){
	        ratingCertificates = new ArrayList<RatingCertificate>();
	    }
	    ratingCertificates.add(ratingCertificate);
	}
	public IncludedActivites getIncludedActivites() {
		return includedActivites;
	}

	public void setIncludedActivites(IncludedActivites includedActivites) {
		this.includedActivites = includedActivites;
	}

    public ContentDescriptor getContentDescriptor() {
        return contentDescriptor;
    }

    public void setContentDescriptor(ContentDescriptor contentDescriptor) {
        this.contentDescriptor = contentDescriptor;
    }
	
	
}
