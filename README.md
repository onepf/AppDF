AppDF
=====

Uploading Android application to several appstores could be time consuming. AppDF format is designed to simplify this process. You describe your Android application once, create a simple AppDF file that includes description, APK file(s), screenshots, app icon, promo images, etc and just upload this AppDF file to all the stores that support AppDF uploading.

What Is AppDF
=====
AppDF file is a ZIP archive with <code>.appdf</code> extension. This archive must contain <code>description.xml</code> file with
application description (title, description text, category, price, requirements, etc.). This <code>description.xml</code> file contains
links to the other files in the archive like APK file(s), screenshots, promo graphics, video, etc. The main sections
of the description.xml file are:
* Category information
* Text description (title, short description, full description, keywords, etc)
* Images (app icon, screenshots, promo images)
* Videos
* Content rating information
* Availability (country list, etc)
* Price
* Requirements (you can specify supported devices if different from the APK file manifest)
* Testing instructions
* Consent
* Customer-support information
* Store specific section

How AppDF Works
=====
There are more than <a href="https://github.com/onepf/AppDF/wiki/Android-Application-Stores">15 alternative Android appstores</a>. All of them have their own audience. You loose many millions of potential addressable users by submitting your application to Google Play only.
But submitting an app to all the appstores could take you several days, and then you need to upload each update to all the stores as well. AppDF allows you to submit your application as easy as uploading one file. You simply create an AppDF file using HTML5 AppDF Editor and submit the generated AppDF file to all the appstores. 

![AppDF Diagram](http://www.onepf.org/img/appdfdiagram.png "AppDF Diagram")

1. Create AppDF file for your application either using <a href="http://www.onepf.org/editor/">AppDF Editor</a> or just follow <a href="http://www.onepf.org/appdf/specification/">the specification</a> to create an AppDF file manually
2. Submit your AppDF file to the supporting appstores

No Middle Man
=====
AppDF is an open file format. It is not an aggregator. There is no middle man in the process. The app developers work directly with the appstores as before.
There is just a common file format that makes it easier.

Appstores
=====
We have just started the AppDF project. The following Android application stores already support AppDF format (you can go to their developer portals and submit AppDF files):
* <a href="http://apps.opera.com/">Opera Mobile Store</a>
* <a href="http://store.yandex.com/">Yandex.Store</a>
* <a href="http://slideme.org/">SlideME</a>
* <a href="http://www.applandinc.com/">Appland</a>

The following appstores are working on AppDF support but not ready with implementation yet:

* <a href="http://www.aptoide.com/">Aptoide</a>

Specification
=====

Current AppDF specification status is 1.0. It can be found here:  
http://www.onepf.org/appdf/specification/

Current version of AppDF specification in work can be found here:  
https://github.com/onepf/AppDF/blob/master/specification/appds_spec_1_0.md

AppDF Samples
=====
You can download four AppDF samples: 

* [SPB Geo Game](http://www.onepf.org/appdf/samples/com.softspb.geo_game.appdf) - a simple paid game
* [MX Player](http://www.onepf.org/appdf/samples/mxplayer.appdf) - a free video player localized to three languages
* [SPB Swedish Cards](http://www.onepf.org/appdf/samples/spbswedishcards.appdf) - a paid application localized to many languages
* [Yandex.Shell](http://www.onepf.org/appdf/samples/yandex.shell.appdf) - a free application limited to several countries

There are two ways to explore the samples:  
1. Open a sample in <a href="http://www.onepf.org/editor/">AppDF Editor</a>  
2. Download a sample, rename it to .zip file, unzip it, check description.xml file  

AppDF Editor 
=====
We are developing an HTML5 AppDF editor (client-side only code). Current preview version that does not support several important features yet could be found at:
http://onepf.org/editor

Source code here:
https://github.com/onepf/AppDF-tools-editor

License 
=====

Source code of the AppDF Editor and the reference parser libs is available under the terms of the Apache License, Version 2.0:<br>
<a href="http://www.apache.org/licenses/LICENSE-2.0">http://www.apache.org/licenses/LICENSE-2.0</a>

The AppDF specification and the related texts are available under the terms of the Creative Commons Attribution 2.5 license:<br>
<a href="http://creativecommons.org/licenses/by/2.5/">http://creativecommons.org/licenses/by/2.5/</a>


How Can I Help?
=====
1. Join [our mailing list](http://groups.google.com/group/appdf).
2. Choose an open task from [the task list](https://github.com/onepf/AppDF/issues?labels=open+tasks&page=1&state=open) or propose a new one.
3. Email the group that you want to work on this task and let's discuss on how to do it the best way.


What's Next (AppDF Roadmap)
=====
* In-App Billing support in the next version of AppDF
* Add a feature to the AppDF Editor to automatically download application description from Google Play
* Add "What's Next" section to the AppDF Editor that explains how the generated AppDF file could be submitted to appstores
* Add better documentation about AppDF parser reference source code
