package org.onepf.appdf.parser;

import org.onepf.appdf.model.Application;
import org.onepf.appdf.model.Availability;
import org.onepf.appdf.model.ContentDescription;
import org.w3c.dom.Node;

public enum TopLevelTag implements NodeParser<Application> {

	CATEGORIZATION{

		@Override
		public void parse(Node node, Application application) throws ParsingException {	
			(new CategorizationParser()).parse(node, application);
		}
		
	},
	DESCRIPTION{

		@Override
		public void parse(Node node, Application application) throws ParsingException {
			(new DescriptionParser(true)).parse(node, application);			
		}
		
	},
	DESCRIPTION_LOCALIZATION{
	    @Override
        public void parse(Node node, Application application) throws ParsingException {
            (new DescriptionParser(false)).parse(node, application);         
        }
        
	},
	CONTENT_DESCRIPTION{

        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
           ContentDescription contentDescription = new ContentDescription();
           (new ContentDescriptionParser()).parse(node, contentDescription);
           element.setContentDescription(contentDescription);
        }	    
	},
	AVAILABILITY{

        @Override
        public void parse(Node node, Application element)
                throws ParsingException {
            Availability availability = new Availability();
            (new AvailabilityParser()).parse(node, availability);
            element.setAvalability(availability);
        }
	    
	}
	;		
}
