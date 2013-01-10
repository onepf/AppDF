package org.onepf.appdf.model;

import java.util.ArrayList;
import java.util.List;

public class ApkFilesInfo {

	public static class ApkFile {
		private String fileName;
		private List<String> exstension = new ArrayList<String>();

		public String getFileName() {
			return fileName;
		}

		public void setFileName(String fileName) {
			this.fileName = fileName;
		}

		public List<String> getExstension() {
			return exstension;
		}

		public void setExstension(List<String> exstension) {
			this.exstension = exstension;
		}
		
		public void addExtension(String exstension){
			this.exstension.add(exstension);
		}
	}

	private List<ApkFile> apkFiles = new ArrayList<ApkFile>();

	public List<ApkFile> getApkFiles() {
		return apkFiles;
	}

	public void setApkFiles(List<ApkFile> apkFiles) {
		this.apkFiles = apkFiles;
	}
	
	public void addApkFile(ApkFile apkFile){
		apkFiles.add(apkFile);
	}
	
	public void removeApkFile(ApkFile apkFile){
		apkFiles.remove(apkFile);
	}
}
