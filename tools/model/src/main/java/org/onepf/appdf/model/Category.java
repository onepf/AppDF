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
		
		public Category create(){
			return new Category(appdf, play, amazon, yandex, samsung, slideMe);
		}
	}

	private final String appdf;
	private final String play;
	private final String amazon;
	private final String yandex;
	private final String samsung;
	private final String slideMe;
	
	protected Category(String appdf, String play, String amazon, String yandex,
			String samsung, String slideMe) {
		this.appdf = appdf;
		this.play = play;
		this.amazon = amazon;
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
	
	
}
