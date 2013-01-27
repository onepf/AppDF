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

public class Category {
	
	public static CategoryBuilder builder(){
		return new CategoryBuilder();
	}
	
	public static class CategoryBuilder {
		
		private String appdf;
		private String play;
		private String amazon;
		private String yandex;
		private String samsung;
		private String slideMe;
		private String opera;
		
		public CategoryBuilder appdf(String category){
			appdf = category;
			return this;
		}
		
		public CategoryBuilder play(String category){
			play = category;
			return this;
		}
		
		public CategoryBuilder amazon(String category){
			amazon = category;
			return this;
		}
		
		public CategoryBuilder yandex(String category){
			yandex = category;
			return this;
		}
		
		public CategoryBuilder slideMe(String category){
			slideMe = category;
			return this;
		}
		
		public CategoryBuilder samsung(String category){
			samsung = category;
			return this;
		}
		
		public CategoryBuilder opera(String category){
			opera = category;
			return this;
		}
		
		public Category create(){
			return new Category(appdf, play, amazon,opera, yandex, samsung, slideMe);
		}
	}

	private final String appdf;
	private final String play;
	private final String amazon;
	private final String yandex;
	private final String samsung;
	private final String slideMe;
	private final String opera;
	
	protected Category(String appdf, String play, String amazon,String opera, String yandex,
			String samsung, String slideMe) {
		this.appdf = appdf;
		this.play = play;
		this.amazon = amazon;
		this.opera = opera;
		this.yandex = yandex;
		this.samsung = samsung;
		this.slideMe = slideMe;
	}
	public String getAppdf() {
		return appdf;
	}
	public String getPlay() {
		return play;
	}
	public String getAmazon() {
		return amazon;
	}
	public String getYandex() {
		return yandex;
	}
	public String getSamsung() {
		return samsung;
	}
	public String getSlideMe() {
		return slideMe;
	}
	public String getOpera() {
		return opera;
	}
	
	
}
