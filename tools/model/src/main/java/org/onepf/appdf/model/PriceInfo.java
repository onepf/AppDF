package org.onepf.appdf.model;

import java.util.List;

public class PriceInfo {

	public static class Price {
		private String currencyCode;
		private String price;
		private String contryCode;
	}
	private boolean isFree;
	
	private Price basePrice;
	private List<Price> localPrices;
	private String fullVersionPackage;
	
}
