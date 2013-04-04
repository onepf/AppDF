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

import org.junit.Test;

import java.util.Collection;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;



public class CategoryCatalogTestCase{

	/**
	 * Tests if parsing is working at all
	 * Warning is suppressed since call to class is a call to constructor witch do
	 * most of work
	 */
	@Test
	public void basicWorking(){
		@SuppressWarnings("unused")
		CategoryCatalog catalog = CategoryCatalog.INSTANCE;
	}
	/**
	 * Do we have some categories
	 */
	@Test
	public void categoryListIsNotEmpty(){
		CategoryCatalog catalog = CategoryCatalog.INSTANCE;
		assertFalse(catalog.getAll().isEmpty());
	}
	
	@Test(expected=UnsupportedOperationException.class)
	public void cantModifyCategoryList(){
		CategoryCatalog catalog = CategoryCatalog.INSTANCE;
		Collection<Category> allCategories = catalog.getAll();
		allCategories.remove(0);
	}
	/**
	 * This one is based upon current categories.xml
	 */
	@Test
	public void properParsing(){
		String appdfCategory = "Comics";
		CategoryCatalog catalog = CategoryCatalog.INSTANCE;
		assertNotNull(catalog.getById(appdfCategory));
	}
}
