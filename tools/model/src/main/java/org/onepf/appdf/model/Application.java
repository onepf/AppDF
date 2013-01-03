package org.onepf.appdf.model;

import java.util.List;

/**
 * Represents root application model info 
 * @author nivanov
 *
 */

public class Application {
	
	private String packageName;
	private Categorisation categorisation;
	private List<Description> descriptions;
	private ContentDescription contentDescription;
	private Avalability avalability;
	private ApkFilesInfo filesInfo;
	private Requirments requirments;
	private List<StoreSpecificInfo> storeSpecific;
	private String testingInstructions;
	private Consent consent;

}
