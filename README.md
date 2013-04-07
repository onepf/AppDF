      <div class="hero-unit">
        <h1>AppDF</h1>
        <p>
          Uploading Android application to several appstores could be time consuming. AppDF format is designed to simplify this process. You describe your Android application once, create a simple AppDF file that includes description, APK file(s), screenshots, app icon, promo images, etc and just upload this AppDF file to all the stores that support AppDF uploading.
        </p>
        <p>
          <a href="/editor/" class="btn btn-primary">AppDF Editor</a>
          <a href="https://github.com/onepf/AppDF" class="btn btn-primary">View AppDF on GitHub</a>
        </p>
      </div>

      <section id="whatisappdf">
        <legend>What Is AppDF</legend>
        <p>
          AppDF file is a ZIP archive with <code>.appdf</code> extension. This archive must contain <code>description.xml</code> file with
          application description (title, description text, category, price, requirements, etc.). This <code>description.xml</code> file contains
          links to the other files in the archive like APK file(s), screenshots, promo graphics, video, etc. The main sections
          of the description.xml file are:
          <ul>
            <li>Category information</li>
            <li>Text description (title, short description, full description, keywords, etc)</li>
            <li>Images (app icon, screenshots, promo images)</li>
            <li>Videos</li>
            <li>Content rating information</li>
            <li>Availability (country list, etc)</li>
            <li>Price</li>
            <li>Requirements (you can specify supported devices if different from the APK file manifest)</li>
            <li>Testing instructions</li>
            <li>Consent</li>
            <li>Customer-support information</li>
            <li>Store specific section</li>
          </ul>
        </p>
      </section>      

      <section id="howitworks">
        <legend>How AppDF Works</legend>
        <p>
          There are more than <a href="https://github.com/onepf/AppDF/wiki/Android-Application-Stores">15 alternative Android appstores</a>. All of them have their own audience. You loose many millions of potential addressable users by submitting your application to Google Play only.
          But submitting an app to all the appstores could take you several days, and then you need to upload each update to all the stores as well. AppDF allows you to submit your application as easy as uploading one file. You simply create an AppDF file using HTML5 AppDF Editor and submit the generated AppDF file to all the appstores. 
        </p>
        <p>
          <img src="../img/appdfdiagram.png" width="600">
        </p>
        <ol>
          <li>Create AppDF file for your application either using <a href="../editor/">AppDF Editor</a> or just follow <a href="/appdf/specification/">the specification</a> to create an AppDF file manually</li>
          <li>Submit your AppDF file to the supporting appstores</li>
        </ol>
      </section>      

      <section id="nomiddleman">
        <legend>No Middle Man</legend>
        <p>
          AppDF is an open file format. It is not an aggregator. There is no middle man in the process. The app developers work directly with the appstores as before.
          There is just a common file format that makes it easier.
        </p>
      </section>    

      <section id="appstores">
        <legend>Appstores</legend>
        <p>
          We have just started the AppDF project. The following Android application stores already support AppDF format (you can go to their developer portals and submit AppDF files):
          <ul>
            <li><a href="http://apps.opera.com/">Opera Mobile Store</a></li>
            <li><a href="http://store.yandex.com/">Yandex.Store</a></li>
          </ul>
        </p>
        <p>
          The following appstores are working on AppDF support but not ready with implementation yet:
          <ul>
            <li><a href="http://www.appland.se/">Appland</a></li>
            <li><a href="http://www.aptoide.com/">Aptoide</a></li>
            <li><a href="http://slideme.org/">SlideME</a></li>
          </ul>
        </p>
      </section>    

      <section id="specification">
        <legend>Specification</legend>
        <p>
          <a href="https://github.com/onepf/AppDF/blob/master/specification/appds_spec_1_0.md">AppDF Specification 1.0</a>.
          Date: April 8th, 2013
        </p>
      </section>    
  
      <section id="samples">
        <legend>AppDF Samples</legend>
        <ul>
          <li><a href="/appdf/samples/com.softspb.geo_game.appdf">SPB Geo Game</a> - a simple paid game</li>
          <li><a href="/appdf/samples/mxplayer.appdf">MX Player</a> - a free video player localized to three languages</li>
          <li><a href="/appdf/samples/spbswedishcards.appdf">SPB Swedish Cards</a> - a paid application localized to many languages</li> 
          <li><a href="/appdf/samples/yandex.shell.appdf">Yandex.Shell</a> - a free application limited to several countries</li>          
        </ul>
      </section>    
  
      <section id="license">
        <legend>License</legend>
        <p>
          Source code of the AppDF Editor and the reference parser libs is available under the terms of the Apache License, Version 2.0:<br>
          <a href="http://www.apache.org/licenses/LICENSE-2.0">http://www.apache.org/licenses/LICENSE-2.0</a>
        </p>
        <p>
          The AppDF specification and the related texts are available under the terms of the Creative Commons Attribution 2.5 license:<br>
          <a href="http://creativecommons.org/licenses/by/2.5/">http://creativecommons.org/licenses/by/2.5/</a>
        </p>
      </section>    
  
      <section id="roadmap">
        <legend>What's Next</legend>
        <ul>
          <li>In-App Billing support in the next version of AppDF</li>
          <li>Add a feature to the AppDF Editor to automatically download application description from Google Play</li>
          <li>Add "What's Next" section to the AppDF Editor that explains how the generated AppDF file could be submitted to appstores</li> 
          <li>Add better documentation about AppDF parser reference source code</li>
        </ul>
      </section> 
