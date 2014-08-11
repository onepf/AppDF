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

public class Availability implements ModelElement{

	public static class Period {
		private int year;
		private int month;
		private int day;

		public int getYear() {
			return year;
		}

		public void setYear(int year) {
			this.year = year;
		}

		public int getMonth() {
			return month;
		}

		public void setMonth(int month) {
			this.month = month;
		}

		public int getDay() {
			return day;
		}

		public void setDay(int day) {
			this.day = day;
		}
	}

	private List<String> includeCountries;
	private List<String> excludeCountries;
	private Period since;
	private Period until;
	
	public void addIncludeCountry(String country){
	    if ( includeCountries == null ){
	        includeCountries = new ArrayList<String>();
	    }
	    includeCountries.add(country);
	}
	
	public void addExcludeCountry(String country){
	    if ( excludeCountries == null ){
	        excludeCountries = new ArrayList<String>();
	    }
	    excludeCountries.add(country);
	}

	public List<String> getIncludeContries() {
		return includeCountries;
	}

	public void setIncludeContries(List<String> includeContries) {
		this.includeCountries = includeContries;
	}

	public List<String> getExcludeContries() {
		return excludeCountries;
	}

	public void setExcludeContries(List<String> excludeContries) {
		this.excludeCountries = excludeContries;
	}

	public Period getSince() {
		return since;
	}

	public void setSince(Period since) {
		this.since = since;
	}

	public Period getUntil() {
		return until;
	}

	public void setUntil(Period until) {
		this.until = until;
	}

}
