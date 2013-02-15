/*******************************************************************************
 * Copyright 2012 One Platform Foundation
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
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
