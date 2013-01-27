package org.onepf.appdf.model;

import java.util.List;

public class Avalability implements ModelElement{

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

	private List<String> includeContries;
	private List<String> excludeContries;
	private Period since;
	private Period until;

	public List<String> getIncludeContries() {
		return includeContries;
	}

	public void setIncludeContries(List<String> includeContries) {
		this.includeContries = includeContries;
	}

	public List<String> getExcludeContries() {
		return excludeContries;
	}

	public void setExcludeContries(List<String> excludeContries) {
		this.excludeContries = excludeContries;
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
