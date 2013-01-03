package org.onepf.appdf.model;

import java.util.List;

public class ApkFilesInfo {

	public static class Extension {
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

	private List<String> apkFiles;

	private List<Extension> extensions;

	public List<String> getApkFiles() {
		return apkFiles;
	}

	public void setApkFiles(List<String> apkFiles) {
		this.apkFiles = apkFiles;
	}

	public List<Extension> getExtensions() {
		return extensions;
	}

	public void setExtensions(List<Extension> extensions) {
		this.extensions = extensions;
	}

}
