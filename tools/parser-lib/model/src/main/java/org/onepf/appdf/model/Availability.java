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
