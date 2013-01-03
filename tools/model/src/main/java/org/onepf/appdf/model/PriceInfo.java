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

	public boolean isFree() {
		return isFree;
	}

	public void setFree(boolean isFree) {
		this.isFree = isFree;
	}

	public Price getBasePrice() {
		return basePrice;
	}

	public void setBasePrice(Price basePrice) {
		this.basePrice = basePrice;
	}

	public List<Price> getLocalPrices() {
		return localPrices;
	}

	public void setLocalPrices(List<Price> localPrices) {
		this.localPrices = localPrices;
	}

	public String getFullVersionPackage() {
		return fullVersionPackage;
	}

	public void setFullVersionPackage(String fullVersionPackage) {
		this.fullVersionPackage = fullVersionPackage;
	}

}
