package org.onepf.appdf.model;

import java.util.List;

public class ApkFilesInfo {

	public static class ApkFile {
		private String fileName;
		private List<String> exstension;

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
	}

	private List<ApkFile> apkFiles;

	public List<ApkFile> getApkFiles() {
		return apkFiles;
	}

	public void setApkFiles(List<ApkFile> apkFiles) {
		this.apkFiles = apkFiles;
	}
}
