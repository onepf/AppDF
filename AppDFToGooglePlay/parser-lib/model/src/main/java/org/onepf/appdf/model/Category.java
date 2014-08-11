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

import java.util.*;

public class Category {

    static class Builder {
        private String id;

        private Categorisation.ApplicationType type;

        private List<Category> subcategories = new ArrayList<>();

        private Map<String, String> storesMapping = new HashMap<>();

        public String getId() {
            return id;
        }

        Builder id(String id) {
            this.id = id;
            return this;
        }

        Builder subcategory(Category subcategory) {
            subcategories.add(subcategory);
            return this;
        }

        Builder storeMapping(String store, String label) {
            storesMapping.put(store, label);
            return this;
        }

        Category build() {
            return new Category(id, subcategories, type, storesMapping);
        }

        public Builder type(Categorisation.ApplicationType type) {
            this.type = type;
            return this;
        }
    }

    static Builder builder() {
        return new Builder();
    }

    private final String id;

    private final Map<String,Category> subcategories;

    private final Map<String, String> storesMapping;

    private final Categorisation.ApplicationType type;

    public String getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Category category = (Category) o;
        return id.equals(category.id);

    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    public Collection<Category> getSubcategories() {
        return subcategories.values();
    }

    public Map<String, String> getStoresMapping() {
        return storesMapping;
    }

    public Categorisation.ApplicationType getType() {
        return type;
    }

    private Category(String id, List<Category> subcategories, Categorisation.ApplicationType type, Map<String, String> storesMapping) {
        this.id = id;
        Map<String,Category> tmpMap = new HashMap<>();
        for(Category sub : subcategories){
            tmpMap.put(sub.getId(),sub);
        }
        this.subcategories = Collections.unmodifiableMap(tmpMap);
        this.type = type;
        this.storesMapping = storesMapping;
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder();
        sb.append("Category");
        sb.append("{id='").append(id).append('\'');
        sb.append(", type=").append(type);
        sb.append('}');
        return sb.toString();
    }

    public Category getSubCategory(String id){
        return subcategories.get(id);
    }
}
