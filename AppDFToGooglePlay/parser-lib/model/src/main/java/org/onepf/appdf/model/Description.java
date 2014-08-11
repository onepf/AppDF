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

import org.jetbrains.annotations.NotNull;
import org.onepf.appdf.requierements.StoreRequirements;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class Description implements ModelElement {

    private Language language;

    private boolean isDefault;

    private List<String> titles;

    private List<String> keywords;

    private List<String> shortDescriptions;

    private List<FullDescription> fullDescriptions;

    private List<String> features;

    private String recentChanges;

    private String privacyPolicy;

    private String eula;

    private ImagesDescription imagesDescription;

    private String youTubeVideo;

    private List<String> videos;

    @NotNull
    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean isDefault) {
        this.isDefault = isDefault;
    }

    public List<String> getTitles() {
        return titles;
    }

    private static final Comparator<String> DESC_COMPARATOR = new TextLengthComparator();

    public String getTitle(StoreRequirements requirements) {
        if (titles == null || titles.isEmpty()) {
            return null;
        }

        Collections.sort(titles, DESC_COMPARATOR);

        if (requirements.getTitleMaxLength() == StoreRequirements.NO_LIMIT_COUNT) {
            return titles.get(titles.size() - 1);
        } else {
            String result = titles.get(0);
            if (result.length() > requirements.getTitleMaxLength()) {
                throw new IllegalArgumentException(
                        "Can't select title for store " + requirements);
            } else {
                for (int i = 1, cnt = titles.size(); i < cnt; i++) {
                    if (titles.get(i).length() <= requirements.getTitleMaxLength()) {
                        result = titles.get(i);
                    } else {
                        break;
                    }
                }
                return result;
            }
        }
    }

    public void setTitles(List<String> title) {
        this.titles = title;
    }

    public void addTitle(String title) {
        if (titles == null) {
            titles = new ArrayList<>();
        }
        this.titles.add(title);
    }


    public void removeTitle(String title) {
        if (titles != null) {
            titles.remove(title);
        }
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

    public String getShortDescriptions(StoreRequirements requirements) {
        if (shortDescriptions == null || shortDescriptions.isEmpty()) {
            return null;
        }

        Collections.sort(shortDescriptions, DESC_COMPARATOR);

        if (requirements.getShortDescriptionMaxLength() == StoreRequirements.NO_LIMIT_COUNT) {
            return shortDescriptions.get(shortDescriptions.size() - 1);
        } else {
            String result = shortDescriptions.get(0);
            if (result.length() > requirements.getShortDescriptionMaxLength()) {
                return null;
            } else {
                for (int i = 1, cnt = shortDescriptions.size(); i < cnt; i++) {
                    if (shortDescriptions.get(i).length() <=
                            requirements.getShortDescriptionMaxLength()) {
                        result = shortDescriptions.get(i);
                    } else {
                        break;
                    }
                }
                return result;
            }
        }
    }

    public void setShortDescriptions(List<String> shortDescriptions) {
        this.shortDescriptions = shortDescriptions;
    }

    public List<FullDescription> getFullDescriptions() {
        return fullDescriptions;
    }

    public FullDescription getFullDescription(StoreRequirements requirements) {
        if (fullDescriptions == null || fullDescriptions.isEmpty()) {
            return null;
        }

        Collections.sort(fullDescriptions);

        if (requirements.getShortDescriptionMaxLength() == StoreRequirements.NO_LIMIT_COUNT) {
            return fullDescriptions.get(fullDescriptions.size() - 1);
        } else {
            FullDescription result = fullDescriptions.get(0);
            if (result.getText().length()
                    > requirements.getFullDescriptionMaxLength()) {
                return null;
            } else {
                for (int i = 1, cnt = fullDescriptions.size(); i < cnt; i++) {
                    if (fullDescriptions.get(i).getText().length() <=
                            requirements.getShortDescriptionMaxLength()) {
                        result = fullDescriptions.get(i);
                    } else {
                        break;
                    }
                }
                return result;
            }
        }
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

    public List<String> getVideos() {
        return videos;
    }

    public void setVideo(List<String> videos) {
        this.videos = videos;
    }

    public void addVideo(String video) {
        if (videos == null) {
            videos = new ArrayList<String>();
        }
        videos.add(video);
    }

    public void addKeyword(String keyWord) {
        if (keywords == null) {
            keywords = new ArrayList<String>();
        }
        keywords.add(keyWord);

    }

    public void addShortDescription(String textContent) {
        if (shortDescriptions == null) {
            shortDescriptions = new ArrayList<String>();
        }
        shortDescriptions.add(textContent);

    }

    public void addFullDescription(FullDescription fullDescription) {
        if (fullDescriptions == null) {
            fullDescriptions = new ArrayList<FullDescription>();
        }
        fullDescriptions.add(fullDescription);
    }

    public void addFeature(String feature) {
        if (features == null) {
            features = new ArrayList<String>();
        }
        features.add(feature);

    }

    public void addFeatures(List<String> features) {
        if (this.features == null) {
            this.features = new ArrayList<>(features);
        } else {
            this.features.addAll(features);
        }

    }

    private static class TextLengthComparator implements Comparator<String> {
        @Override
        public int compare(String o1, String o2) {
            return Integer.compare(o1.length(), o2.length());
        }
    }
}
