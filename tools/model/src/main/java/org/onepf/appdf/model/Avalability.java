package org.onepf.appdf.model;

import java.util.List;

public class Avalability {

	public static class Period {
		private int year;
		private int month;
		private int day;
	}
	
	private List<String> includeContries;
	private List<String> excludeContries;
	private Period since;
	private Period until;
	
}
