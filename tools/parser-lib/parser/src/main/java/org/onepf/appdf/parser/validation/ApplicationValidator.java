package org.onepf.appdf.parser.validation;

import org.onepf.appdf.model.Application;

import static org.onepf.appdf.parser.validation.rules.CollectionRules.exists;
import static org.onepf.appdf.parser.validation.rules.NullRules.notNull;
import static org.onepf.appdf.parser.validation.rules.StringRules.lessThan;


/**
 * @author: nikolayivanov
 */
public class ApplicationValidator{

    public ValidatorResult validate(Application app){
      return Validator.builder()
       .target("categorisation",app.getCategorisation(),notNull())
       .target("categorisation/type", app.getCategorisation(), notNull())
       .target("categorisation/category",app.getCategorisation().getCategory(),notNull())
       .target("description", app.getMainDescription(), notNull())
       .target("description/titles", app.getMainDescription().getTitles(),notNull())
       .target("description/titles", app.getMainDescription().getTitles(),exists(lessThan(30)))
       .target("description/keywords",app.getMainDescription().getKeywords(),notNull())
       .target("description/short-description",app.getMainDescription().getShortDescriptions(),notNull())
       .target("description/short-description",app.getMainDescription().getShortDescriptions(),exists(lessThan(80)))
       .target("description/full-description",app.getMainDescription().getFullDescriptions().get(0).getText(),lessThan(4000))
       .target("description/recent-changes",app.getMainDescription().getRecentChanges(),lessThan(500))
       .target("description/images",app.getMainDescription().getImagesDescription(),notNull())
       .build().validate();
    }

}
