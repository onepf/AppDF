package org.onepf.appdf.model;

import java.util.List;

import org.junit.Test;
import static org.junit.Assert.*;



public class CategoryCatalogTestCase{

	/**
	 * Tests if parsing is working at all
	 * Warning is suppressed since call to class is a call to constructor witch do
	 * most of work
	 */
	@Test
	public void basicWorking(){
		@SuppressWarnings("unused")
		CategoryCatalog catalog = CategoryCatalog.CATALOG;		
	}
	/**
	 * Do we have some categories
	 */
	@Test
	public void categoryListIsNotEmpty(){
		CategoryCatalog catalog = CategoryCatalog.CATALOG;
		assertFalse(catalog.getAllCategories().isEmpty());
	}
	
	@Test(expected=UnsupportedOperationException.class)
	public void cantModifyCategoryList(){
		CategoryCatalog catalog = CategoryCatalog.CATALOG;
		List<Category> allCategories = catalog.getAllCategories();
		allCategories.remove(0);
	}
}
