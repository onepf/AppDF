package org.onepf.appdf.model;

import java.util.List;
import java.util.Locale;

public class Description {
	
	private Locale language;
	
	private boolean isDefault;
	
	private String title;
	
	private List<String> keywords;
	
	private List<String> shortDescriptions;
	
	private List<FullDescription> fullDescriptions;
	
	private List<String> features;
	
	private String recentChanges;
	
	private String privacyPolicy;
	
	private String eula;
	
	private ImagesDescription imagesDescription;
	
	private String youTubeVideo;
	
	private String video;

	public Locale getLanguage() {
		return language;
	}

	public void setLanguage(Locale language) {
		this.language = language;
	}

	public boolean isDefault() {
		return isDefault;
	}

	public void setDefault(boolean isDefault) {
		this.isDefault = isDefault;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<String> getKeywords() {
		return keywords;
	}

	public void setKeywords(List<String> keywords) {
		this.keywords = keywords;
	}

	public List<String> getShortDescriptions() {
		return shortDescriptions;
	}

	public void setShortDescriptions(List<String> shortDescriptions) {
		this.shortDescriptions = shortDescriptions;
	}

	public List<FullDescription> getFullDescriptions() {
		return fullDescriptions;
	}

	public void setFullDescriptions(List<FullDescription> fullDescriptions) {
		this.fullDescriptions = fullDescriptions;
	}

	public List<String> getFeatures() {
		return features;
	}

	public void setFeatures(List<String> features) {
		this.features = features;
	}

	public String getRecentChanges() {
		return recentChanges;
	}

	public void setRecentChanges(String recentChanges) {
		this.recentChanges = recentChanges;
	}

	public String getPrivacyPolicy() {
		return privacyPolicy;
	}

	public void setPrivacyPolicy(String privacyPolicy) {
		this.privacyPolicy = privacyPolicy;
	}

	public String getEula() {
		return eula;
	}

	public void setEula(String eula) {
		this.eula = eula;
	}

	public ImagesDescription getImagesDescription() {
		return imagesDescription;
	}

	public void setImagesDescription(ImagesDescription imagesDescription) {
		this.imagesDescription = imagesDescription;
	}

	public String getYouTubeVideo() {
		return youTubeVideo;
	}

	public void setYouTubeVideo(String youTubeVideo) {
		this.youTubeVideo = youTubeVideo;
	}

	public String getVideo() {
		return video;
	}

	public void setVideo(String video) {
		this.video = video;
	}
	
}
