Parser-lib
==========

Is a parser of AppDF format implemented in Java. It works with with zipped content (AppDf files) and produces model objects
as output. It also provides utility methods for extracting data from archive.

Building
========
We're using Gradle as our buildsystem so building is as simple as gradle jar. You also can install parser-lib artifacts 
to your local maven repository using gradle install command
Artifact Id
===========
```pom
  <groupId>org.onepf.appdf</groupId>
  <artifactId>parser</artifactId>
  <version>1.0-SNAPSHOT</version>
```

Usage example
==============
```java
  //appdf file location
  File appdfFile = ....
  //Parser creation
  AppdfFileParser parser = new AppdfFileParser(appdfFile);
  try{
    //actual parsing
    ParseResult parseResult = parser.parse();
    //Default application
    Application application = parseResult.getApplication();
    //Getting application projected to some specific store
    Application forPlay = application.project(SupportedStore.GOOGLE.name());
    //or
    Application forChinaMobile = application.project("chinamobile")
  } catch(ParsingException pe){
  //If parsing fails for thatever reason this exception will be thrown
  }
  
```


