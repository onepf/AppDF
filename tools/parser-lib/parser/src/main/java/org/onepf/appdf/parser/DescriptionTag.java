package org.onepf.appdf.parser;

import org.onepf.appdf.model.Description;

public enum DescriptionTag {
	TEXTS{
		@Override
		public NodeParser<Description> getParser() {
			return new TextsParser();
		}
	};
	public abstract NodeParser<Description> getParser();
}