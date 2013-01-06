package org.onepf.appdf.model;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.onepf.appdf.model.Category.CategoryBuilder;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

/**
 * Singleton serving as catalog for category info
 * 
 * @author nivanov
 * 
 */
public enum CategoryCatalog {
	CATALOG;

	private static final String CATEGORY_TAG = "category";
	private static final String RESOURCE_NAME = "categories.xml";
	private List<Category> categoryList = new ArrayList<Category>();
	private Map<String, Category> appdfMapping = new HashMap<String, Category>();

	CategoryCatalog() {

		InputStream resourceStream = CategoryCatalog.class
				.getResourceAsStream(RESOURCE_NAME);
		try {
			DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory
					.newInstance();
			DocumentBuilder documentBuilder = documentBuilderFactory
					.newDocumentBuilder();
			Document document = documentBuilder.parse(resourceStream);
			NodeList categoriesElements = document
					.getElementsByTagName(CATEGORY_TAG);
			for (int i = 0; i < categoriesElements.getLength(); i++) {
				CategoryBuilder builder = Category.builder();
				Node node = categoriesElements.item(i);
				NodeList childNodes = node.getChildNodes();
				for (int j = 0; j < childNodes.getLength(); j++) {
					Node child = childNodes.item(j);
					String nodeName = child.getNodeName();
					String childText = child.getTextContent();
					switch (nodeName) {
					case "appdf":
						builder.appdf(childText);
						break;
					case "play":
						builder.play(childText);
						break;
					case "amazon":
						builder.amazon(childText);
						break;
					case "opera":
						builder.opera(childText);
						break;
					case "yandex":
						builder.yandex(childText);
						break;
					case "samsung":
						builder.samsung(childText);
						break;
					case "slideme":
						builder.slideMe(childText);
						break;
					default:
						break;
					}
				}
				addCategory(builder.create());
			}
		} catch (Exception e) {
			throw new RuntimeException("Failed to parse categories", e);
		} finally {
			if (resourceStream != null) {
				try {
					resourceStream.close();
				} catch (IOException e) {
					// ignore
				}
			}
		}
	}

	private void addCategory(Category category) {
		categoryList.add(category);
		appdfMapping.put(category.getAppdf(), category);
	}

	public Category getCategoryByAppdfName(String name) {
		return appdfMapping.get(name);
	}

	public List<Category> getAllCategories() {
		return Collections.unmodifiableList(categoryList);
	}
}
