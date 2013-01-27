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

import java.util.List;

public class PriceInfo implements ModelElement{

	public static class Price {
		private String currencyCode;
		private String price;
		private String countryCode;

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
			return countryCode;
		}

		public void setCountryCode(String contryCode) {
			this.countryCode = contryCode;
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
