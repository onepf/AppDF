package org.onepf.appdf.model;

import java.util.List;

public class PriceInfo implements ModelElement{

	public static class Price {
		private String currencyCode;
		private String price;
		private String contryCode;

		public String getCurrencyCode() {
			return currencyCode;
		}

		public void setCurrencyCode(String currencyCode) {
			this.currencyCode = currencyCode;
		}

		public String getPrice() {
			return price;
		}

		public void setPrice(String price) {
			this.price = price;
		}

		public String getContryCode() {
			return contryCode;
		}

		public void setContryCode(String contryCode) {
			this.contryCode = contryCode;
		}
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
