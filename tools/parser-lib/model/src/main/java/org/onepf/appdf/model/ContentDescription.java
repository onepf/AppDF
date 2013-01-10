package org.onepf.appdf.model;

import java.util.List;

public class ContentDescription {
	
	private ContentRating contentRating;
	
	private List<RatingCertificate> ratingCertificates;
	
	private IncludedActivites includedActivites;

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

	public IncludedActivites getIncludedActivites() {
		return includedActivites;
	}

	public void setIncludedActivites(IncludedActivites includedActivites) {
		this.includedActivites = includedActivites;
	}
	
	
}
