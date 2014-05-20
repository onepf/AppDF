Summary
-------------

Uploading Android application to several appstores could be time consuming. AppDF format is designed to simplify this process. A developer describes an Android application once by creating a simple AppDF archive that includes the XML description, APK file(s), screenshots, app icon, promo images, etc and just upload this AppDF file to all the stores that support AppDF uploading.

Table of Contents:
* [AppDF File Structure](#appdf-file-structure)
* [Sample Description.xml File](#sample-descriptionxml-file)
* [Description.xml Structure](#descriptionxml-structure)
* [Application Store Support](#application-store-support)
* [Category List](#category-list)
* [Localization Support](#localization-support)
* [Status](#status)
* [Change History](#change-history)
* [License](#license)

AppDF File Structure
-------------

An AppDF file is a ZIP archive where all the files describing the application are collected. Here is an example of a simple AppDF file content:
```
description.xml
Life.apk
icon.png
screenshot01.png
screenshot02.png
screenshot03.png
screenshot04.png
```

As you see there are just few files: APK file, application icon, screenshot and description.xml file that contains all the information about the application (title, description, category, parental control info, requirements, etc). 

Let's consider more advanced example of AppDF package:
```
description.xml
Life_ics.apk
Life_fro.apk
images/icon114x114.png
images/icon135x135.png
images/icon512x512.png
images/en/screenshot01_en.png
images/en/screenshot02_en.png
images/en/screenshot03_en.png
images/en/screenshot04_en.png
images/en/largepromo_en.png
images/en/smallpromo_en.png
images/fr/screenshot01_fr.png
images/fr/screenshot02_fr.png
images/fr/screenshot03_fr.png
images/fr/screenshot04_fr.png
images/fr/largepromo_fr.png
images/fr/smallpromo_fr.png
images/de/screenshot01_de.png
images/de/screenshot02_de.png
images/de/screenshot03_de.png
images/de/screenshot04_de.png
images/en/screenshot01_kr.png
images/en/screenshot02_kr.png
images/en/screenshot03_kr.png
images/en/screenshot04_kr.png
images/en/largepromo_de.png
images/en/smallpromo_de.png
images/en/largepromo_kr.png
images/en/smallpromo_kr.png
```

As you can see the application could include several APK files, the images for different localizations and stores (different stores require different resolution for the app icon and screenshots).If you want fine tuning you could opt to include several sizes for the images though the AppDF will automatically rescale your images to the needed format.

The only naming convention for the files inside AppDF package is that the description XML file should be called `description.xml`. All other files could have any names supported by ZIP, could be placed in the top folder or in any of the subfolders. The names of the additional files are defined in the `description.xml` file.

Sample Description.xml File
-------------

```xml
<?xml version="1.0" encoding="UTF-8"?>

<application-description-file version="1">

<application platform="android" package="ru.yandex.shell">

  <categorization>
    <!--Options: application, game-->
    <type>application</type>
    <!--See the list of AppDF categories and subcategories in the documentation-->
    <category>finance</category>
    <subcategory>investing</subcategory>
  </categorization>

  <!--Application description in English (English US)-->
  <description>
    <texts>
      <!-- The first title must be 30 symbols or shorter, longer titles will be used by the stores that support longer titles -->
      <title>Yandex.Shell</title>
      <title>Yandex.Shell - Free Launcher + Dialer + Widgets</title>
      <keywords>shell, homescreen, launcher</keywords>
      <!--If several versions of short-description tag are presented the store will take the longest supported-->
      <short-description>My short description</short-description>
      <short-description>Slightly longer version of my short description</short-description>
      <short-description>Even more longer version of my short description text</short-description>
      <full-description>
        My full description here, some <b>bold text</b> or <a href="http://www.yahoo.com">a link</a> could be included.
        <features>
          You can optionally include a section that will be removed by the stores that support feature list.
          So you can dublicate features here and they will be shown in the product description but will not dublicate the feature list.
        </features>
      </full-description>
      <!--Will be used only be some stores, most of the stores do not use this tag-->
      <features>
        <feature>New dialer</feature>
        <feature>Home screen</feature>
        <feature>3D interface</feature>
      </features>
      <recent-changes>It is a description of what was changed in the latest version</recent-changes>

      <!--Optional tag, some stores require it for apps that collect personal information-->
      <!--Privacy policy text should be provided both as a link in "href" attribute and as a text-->
      <privacy-policy href="http://legal.yandex.com/privacy/">We won't share information about you, your account or your 
      email addresses with anyone. Period.</privacy-policy>

      <!--Optional tag, if presented it give custom EULA that some stores will show before installation-->
      <!--EULA text should be provided both as a link in "href" attribute and as a text-->
      <eula href="http://wwww.mysite.com/legal/eula.html">Don't violate copyright law and no matter what happens, including 
      damage to your equipment or even someone’s death, you agree not to blame us even if it is our fault.</eula>
    </texts>

    <images>
      <!--The first app icon should have 512x512 size-->
      <app-icon width="512" height="512">icon.png</app-icon>
      <!--Optionally you could include application icon in different sizes. If missed AppDF will automatically resize your icon-->
      <app-icon width="135" height="135">icon_135x135.png</app-icon>
      <app-icon width="144" height="144">icon_144x144.png</app-icon>
      <!--Large promo image (to be shown on website) must be in JPG or PNG format and have 1024x500 size-->
      <large-promo width="1024" height="500">promo.png</large-promo>
      <!--Small promo image (to be shown on a device) must be in JPG or PNG format and have 180x120 size-->
      <small-promo width="180" height="120">feature.png</small-promo>
      <!--Minimum four screenshots should be presented-->
      <!--If you want to add several resolutions of the same screenshot make sure these two tags will have the same "index" attribute-->
      <!--480x800 screen resolution in PNG format must be included for each screenshot-->
      <!--It is recommended to have 1080x1920 (HD) and 1920×1200 (tablets) resolutions for each screenshot as well-->
      <screenshots>
        <screenshot width="480" height="800" index="1">screenshot01_en.png</screenshot>
        <screenshot width="480" height="800" index="2">screenshot02_en.png</screenshot>
        <screenshot width="480" height="800" index="3">screenshot03_en.png</screenshot>
        <screenshot width="480" height="800" index="4">screenshot04_en.png</screenshot>
        <screenshot width="1920" height="1200" index="1">screenshot05_en.png</screenshot>
        <screenshot width="1920" height="1200" index="2">screenshot06_en.png</screenshot>
        <screenshot width="1920" height="1200" index="3">screenshot07_en.png</screenshot>
        <screenshot width="1920" height="1200" index="4">screenshot08_en.png</screenshot>
        <screenshot width="1080" height="1920" index="1">screenshot09_en.png</screenshot>
        <screenshot width="1080" height="1920" index="2">screenshot10_en.png</screenshot>
        <screenshot width="1080" height="1920" index="3">screenshot11_en.png</screenshot>
        <screenshot width="1080" height="1920" index="4">screenshot12_en.png</screenshot>
      </screenshots>
    </images>

    <videos>
      <youtube-video>x8723jw2KKL</youtube-video>
      <video-file>video1.mp4</video-file>
      <video-file>video2.mp4</video-file>
    </videos>

  </description>

  <!--Description can be localized to other languages using this tag-->
  <!--Language is set in two letter ISO 639-1 language code (like "en") or two letters language code + two letter ISO 3166‑1 country code (like "en-au")-->
  <!--This tag has the same structure as description but all subtags are optional-->
  <!--If some subtags are missed they are taken from the default language description-->
  <description-localization language="ru">
    <texts>
      <title>Яндекс.Shell</title>
    </texts>

    <images>
      <screenshots>
        <screenshot width="480" height="800" index="1">screenshot01_ru.png</screenshot>
        <screenshot width="480" height="800" index="2">screenshot02_ru.png</screenshot>
        <screenshot width="480" height="800" index="3">screenshot03_ru.png</screenshot>
        <screenshot width="480" height="800" index="4">screenshot04_ru.png</screenshot>
        <screenshot width="1920" height="1200" index="1">screenshot05_ru.png</screenshot>
        <screenshot width="1920" height="1200" index="2">screenshot06_ru.png</screenshot>
        <screenshot width="1080" height="1920" index="1">screenshot07_ru.png</screenshot>
        <screenshot width="1080" height="1920" index="2">screenshot08_ru.png</screenshot>
      </screenshots>
    </images>

  </description-localization>


  <content-description>
    <!--Minimum age according to ESRB rating system--> 
    <content-rating>13</content-rating>

    <rating-certificates>
      <!--Possible values are 3, 7, 12, 16, 18. "certificate" attribute is optional-->
      <rating-certificate type="PEGI" certificate="whirl-pegi.pdf">3</rating-certificate>
      <!--Possible values are 3, 6, 10, 13, 17, 18. "certificate" attribute is optional-->
      <rating-certificate type="ESRB" certificate="whirl-esrb.pdf">3</rating-certificate>
      <!--Possible values are 0, 12, 15, 18. "certificate" attribute is optional-->
      <rating-certificate type="GRB" certificate="whirl-gbr.pdf">0</rating-certificate>
      <!--Possible values are 0, 12, 15, 17, 18. "certificate" attribute is optional-->
      <rating-certificate type="CERO" certificate="whirl-cero.pdf">0</rating-certificate>
      <!--Possible values are 0, 10, 12, 14, 16, 18. "certificate" attribute is optional-->
      <rating-certificate type="DEJUS" certificate="whirl-dejus.pdf" mark="dejus_mark.jpg">0</rating-certificate>
      <!--Possible values are 0, 6, 12, 16, 18. "certificate" attribute is optional-->
      <rating-certificate type="FSK" certificate="whirl-fsk.pdf">0</rating-certificate>
    </rating-certificates>
    <!--All sub-tags are required, possible options are "no", "light", "strong"-->
    <content-descriptors>
      <cartoon-violence>no</cartoon-violence>
      <realistic-violence>no</realistic-violence>
      <!--May contain profanity, sexual innuendo, threats, and all manner of slurs and epithets.-->
      <bad-language>no</bad-language>
      <!--May contain scenes that are considered too disturbing or frightening to younger or more emotionally vulnerable players.-->
      <fear>light</fear>
      <!--Sexual and suggestive content. May contain references to sexual attraction or sexual intercourse. Also may contain nudity and characters dressed in suggestive clothing.-->
      <sexual-content>no</sexual-content>
      <!--May contain references to illegal drugs or a fictional substance that has parallels to real-life illegal drugs (in use, possession, or sale).-->
      <drugs>no</drugs>
      <!--May contain elements that encourage or teach gambling.-->
      <gambling-reference>no</gambling-reference>
      <!--May contain references to alcohol-->
      <alcohol>no</alcohol>
      <!--May contain references to smoking or tobacco-->
      <smoking>strong</smoking>
      <!--May contain cruelty or harassment based on race, ethnicity, gender, or sexual preferences.-->
      <discrimination>no</discrimination>
    </content-descriptors>
    <included-activities>
      <in-app-billing>no</in-app-billing>
      <gambling>no</gambling>
      <advertising>no</advertising>
      <user-generated-content>no</user-generated-content>
      <user-to-user-communications>no</user-to-user-communications>
      <account-creation>no</account-creation>
      <personal-information-collection>no</personal-information-collection>
    </included-activities>
  </content-description>

  <availability>
    <!--Optional tag, if missed all the countries are included-->
    <!--If attribute only-listed="yes" then this tag contains the list of countries in which the application is available-->
    <!--If attribute only-listed="yes" then the application is available in all the countries except the listed-->
    <countries only-listed="yes">
      <!--Two symbol ISO 3166-1 country code (upper case) -->
      <include>US</include>
      <include>GB</include>
      <include>DE</include>
    </countries>

    <!-- Example of countries tag the application is available in all the countries except the listed -->
    <!--
    <countries only-listed="no">
      <exclude>CU</exclude>
      <exclude>IM</exclude>
    </countries>
    -->

    <!--Optional tag, if missed the app become available immediatly without experiation date-->
    <period>
      <!--Optional tag, if missed the app become available immediatly -->
      <since year="2012" month="12" day="23"/>
      <!--Optional tag, if missed the app is without experiation date-->    
      <until year="2013" month="12" day="23"/>
    </period>
  </availability>   

  <!--If free attribute is set to "yes" then all the subtags except <trial-version> are ignored. -->
  <!--If app is not free then "base-price" is required -->
  <!--local-price tags are optional, if set they define local prices. Country is set in two letter ISO 3166-1 country code-->
  <!--Local prices are defined in local currency, see the documentation for list of country currencies -->
  <!--Dot not comma should be used as decimal dilimiter symbol-->
  <price free="no">
    <!-- Base price is defined in USD -->
    <base-price>4.95</base-price>
    <local-price country="DE">3.95</local-price>
    <local-price country="FR">3.95</local-price>
    <local-price country="RU">99</local-price>
  </price>

  <!-- Example of price tag for a free app -->
  <!--Trial version subtag is available for free apps only. Set to "yes" if this application is a trial version of another application. Optional attribute full-version defines package name of the corresponding full version-->
  <!--
  <price free="yes">
    <trial-version full-version="com.yandex.shellfullversion"/>
  </price>
  -->

  <apk-files>
    <apk-file>yandexshell2.apk</apk-file>
    <apk-file>yandexshell3.apk</apk-file>
  </apk-files>

  <!--Optional tag, add it if the application has some special requirements-->
  <requirements>
    <features>
      <!--Optional tag, set to yes, if your application requires root access-->
      <root>no</root>
      <!--Optional tag, set to yes, if your application requires Google Mobile Services, will dramatically limit supported stores-->
      <gms>no</gms>
      <!--Set to yes, if the application cannot work in offline more and requires internet connection-->
      <online>no</online>
    </features>

    <!--Optional tag, if missed this information is taked from the APK files. All languages are defined by their two letter ISO 639-1 language codes-->
    <supported-languages>
      <language>en</language>
      <language>ru</language>
      <language>de</language>
      <language>fr</language>
      <language>it</language>
    </supported-languages>

    <!--Optional tag, if missed information about the supported devices is taken from the APK file. Use this tag if you want to add some exceptions-->
    <supported-devices>
      <exclude>kyleopen</exclude>
      <exclude>SHW-M130K</exclude>
    </supported-devices>

    <!--Optional tag, if missed information about the supported screen resolutions is taken from the APK file. Use this tag if you want to add some exceptions-->
    <!--If attribute only-listed="yes" then this tag contains the list of screen resolutions that the application support-->
    <!--If attribute only-listed="yes" then the application supports all screen resolutions except the listed-->
    <supported-resolutions only-listed="yes">
      <include>320x480</include>
      <include>480x800</include>
      <include>540x960</include>
      <include>720x1280</include>
    </supported-resolutions>

    <!-- Example of the supported resolutions tag where the application supports all screen resolutions except the listed -->
    <!--
    <supported-resolutions only-listed="no">
      <exclude>2048x1536</exclude>
      <exclude>2560x1536</exclude>
      <exclude>2560x1600</exclude>
    </supported-resolutions>
    -->
  </requirements>

  <!--Special requirements to test your app. maximum characters in case of Amazon: 4000-->
  <testing-instructions>
  </testing-instructions>

  <!--You must include these tags in order to confirm your agreement with the corresponding agreement-->
  <consent>
    <!--http://play.google.com/about/developer-content-policy.html-->
    <google-android-content-guidelines>yes</google-android-content-guidelines>
    <!--https://support.google.com/googleplay/android-developer/support/bin/answer.py?hl=en&answer=113770-->
    <us-export-laws>yes</us-export-laws>
    <!--http://slideme.org/developers/dda-->
    <slideme-agreement>yes</slideme-agreement>
    <!--If your app uses third party copyrighted images, sounds, databases or other information--> 
    <free-from-third-party-copytighted-content>yes</free-from-third-party-copytighted-content>
    <!--You confirm that you have all the rights for your application to import to and export from all the supported countries--> 
    <import-export>yes</import-export>
  </consent>

  <!--Required. Customer support information-->
  <customer-support>
    <company>Yandex</company>
    <phone>+1 (555) 1234-56-78</phone>
    <email>support@yandex-team.ru</email>
    <website>http://www.yandex.ru/support</website>
  </customer-support>

  <!--Optional tag that collects some store specific information-->
  <!--Top level subtags correspond to store ids, see the documentation for the list of these ids-->
  <!--The store tags could also include replacement of any of the subtags from the <application> tag. See -->
  <store-specific>
    <amazon>
      <!--Options: phone, tablet, all-->
      <form-factor>all</form-factor>
      <!--Optional tag, default value is no-->
      <free-app-of-the-day-eligibility>yes</free-app-of-the-day-eligibility>
      <apply-amazon-drm>yes</apply-amazon-drm>
      <kindle-support>
        <kindle-fire-first-generation>yes</kindle-fire-first-generation>
        <kindle-fire>yes</kindle-fire>
        <kindle-fire-hd>yes</kindle-fire-hd>
        <kindle-fire-hd-8-9>yes</kindle-fire-hd-8-9>
      </kindle-support>
      <binary-alias>Version 1</binary-alias>
    </amazon>
    <samsung>
      <!--Options: tv, phone, tablet, or any combination in comma separated string-->
      <form-factor>phone,tablet</form-factor>
      <!--Optional tag, set to yes, if your application uses Samsung Zirconia DRM protection-->
      <contains-zirconia-protection>yes</contains-zirconia-protection>
      <!--Optional tag, set to yes, if your application requires Samsung S-Pen-->
      <s-pen>yes</s-pen> 
      <!-- Samsung requires each app to have 2-5 tags -->
      <tags>
        <tag>Education / Video</tag>
        <tag>Music / Album</tag>
      </tags>
    </samsung>
    <slideme>
      <!--Optional tag, if missed the license is considered as proprietary-->
      <license-type>apache2</license-type>
    </slideme>
  </store-specific>

</application>

</application-description-file>
```

Description.xml Structure
-------------

[Formal  XML Schema (XSD) description](http://www.onepf.org/appdf/appdf-description-1-0.xsd) of Description.xml file structure.

List of Tags:
* [categorization](#categorization)
	* [type](#categorizationtype)
	* [category](#categorizationcategory)
	* [subcategory](#categorizationsubcategory)
* [description](#description)
	* [texts](#descriptiontexts)
		* [title](#descriptiontextstitle)
		* [keywords](#descriptiontextskeywords)
		* [short-description](#descriptiontextsshort-description)
		* [full-description](#descriptiontextsfull-description)
		* [features](#descriptiontextsfeatures)
		* [recent-changes](#descriptiontextsrecent-changes)
		* [privacy-policy](#descriptiontextsprivacy-policy)
		* [eula](#descriptiontextseula)
	* [images](#descriptionimages)
		* [app-icon](#descriptionimagesapp-icon)
		* [large-promo](#descriptionimageslarge-promo)
		* [small-promo](#descriptionimagessmall-promo)
    * [screenshots](#descriptionimagesscreenshots)
      * [screenshot](#descriptionimagesscreenshotsscreenshot)
	* [videos](#descriptionvideos)
		* [youtube-video](#descriptionvideosyoutube-video)
		* [video-file](#descriptionvideosvideo-file)
* [description-localization](#description-localization)
* [content-description](#content-description)
	* [content-rating](#content-descriptioncontent-rating)
	* rating-certificates
		* [rating-certificate](#content-descriptionrating-certificatesrating-certificate)
	* [content-descriptors](#content-descriptioncontent-descriptors)
	* [included-activities](#content-descriptionincluded-activities)
* [availability](#availability)
	* [countries](#availabilitycountries)
	* period
		* [since](#availabilityperiodsince)
		* [until](#availabilityperioduntil)
* [price](#price)
	* [base-price](#pricebase-price)
	* [local-price](#pricelocal-price)
	* [trial-version](#pricetrial-version)
* [apk-files](#apk-files)
* [requirements](#requirements)
	* [features](#requirementsfeatures)
		* [root](#requirementsroot)
		* [gms](#requirementsgms)
		* [online](#requirementsonline)
	* [supported-languages](#requirementssupported-languages)
	* [supported-devices](#requirementssupported-devices)
	* [supported-resolutions](#requirementssupported-resolutions)
* [testing-instructions](#testing-instructions)
* [consent](#consent)
* [customer-support](#customer-support)
	* [company](#customer-supportcompany)
	* [phone](#customer-supportphone)
	* [email](#customer-supportemail)
	* [website](#customer-supportwebsite)
* [store-specific](#store-specific)
	* [amazon](#store-specificamazon)
	* [samsung](#store-specificsamsung)
	* [slideme](#store-specificslideme)


### categorization

Example:
```xml
<categorization>
  <type>application</type>
  <category>finance</category>
  <subcategory>investing</subcategory>
</categorization>
```

#### categorization/type

Required. No attributes. Value could be either `application` or `game`.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Possible values</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Categorization / Application Type</td>
    <td>Yes</td>
    <td>Applications, Games</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Additional Info / Category</td>
    <td>Yes</td>
    <td>Application, Games</td>
  </tr>  
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Category</td>
    <td>Yes</td>
    <td>Games is one item in the application category list</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Category</td>
    <td>Yes</td>
    <td>Games is one item in the application category list</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Category / Category / Primary</td>
    <td>Yes</td>
    <td>Games is one item in the application category list</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Category</td>
    <td>Yes</td>
    <td>Games is one item in the application category list</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Keywords &amp; Category / Categories</td>
    <td>Yes</td>
    <td>Games is one item in the application category list</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Application Category</td>
    <td>Yes</td>
    <td>Games is one item in the application category list</td>
  </tr>
</table>

#### categorization/category

Required. No attributes. AppDF format has its own list of categories for both games and applications. This [category list](#category-list) is developed to be easily mapped to any of the application store category lists.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Categorization / Category</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Additional Info / Category</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Category</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Category</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung App</td>
    <td>Yes</td>
    <td>Category / Category / Primary</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Category</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Keywords &amp; Category / Categories</td>
    <td>Yes</td>
    <td>Supports multiple categories</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Application Category</td>
    <td>Yes</td>
    <td></td>
  </tr>
</table>

#### categorization/subcategory

Optional. 
No attributes. 

Although some stores don't use subcategories AppDF includes as detailed category information as possible. It is always easy to broaden detailed AppDF category+subcategory information to a less detailed particular store category list. More information in the [category list](#category-list) section.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Category</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Category</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Keywords &amp; Category / Categories</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>

### description 
Required.

This section contains product description in text form as well as pictures and videos in English US language. A part of the main `<description>` tag there could be several `<description-localization>` tags for different languages. If some information is missing in the localized `<description-localization>` tag it will be taken from the default `<description>` section.

Example:
```xml
<description>
  <texts>
    <title>Yandex.Shell</title>
    <title>Yandex.Shell - Free Launcher + Dialer + Widgets</title>
    <keywords>shell, homescreen, launcher</keywords>
    <short-description>My short description</short-description>
    <short-description>Slightly longer version of my short description</short-description>
    <short-description>Even more longer version of my short description text</short-description>
    <full-description>My full description here</full-description>
    <features>
      <feature>New dialer</feature>
      <feature>Home screen</feature>
      <feature>3D interface</feature>
    </features>
    <recent-changes>It is a description of what was changed in the latest version</recent-changes>
    <privacy-policy href="http://legal.yandex.com/privacy/">We won't share information about you, your 
    account or your email addresses with anyone. Period.</privacy-policy>
    <eula href="http://wwww.mysite.com/legal/eula.html">Don't violate copyright law and no matter what happens, 
    including damage to your equipment or even someone’s death, you agree not to blame us even if it is our fault.</eula>
  </texts>

  <images>
    <app-icon width="512" height="512">icon.png</app-icon>
    <app-icon width="135" height="135">icon_135x135.png</app-icon>
    <app-icon width="144" height="144">icon_144x144.png</app-icon>
    <large-promo width="1024" height="500">promo.png</large-promo>
    <small-promo width="180" height="120">feature.png</small-promo>
    <screenshots>
      <screenshot width="480" height="800" index="1">screenshot01_en.png</screenshot>
      <screenshot width="480" height="800" index="2">screenshot02_en.png</screenshot>
      <screenshot width="480" height="800" index="3">screenshot03_en.png</screenshot>
      <screenshot width="480" height="800" index="4">screenshot04_en.png</screenshot>
      <screenshot width="1920" height="1200" index="1">screenshot05_en.png</screenshot>
      <screenshot width="1920" height="1200" index="2">screenshot06_en.png</screenshot>
      <screenshot width="1080" height="1920" index="1">screenshot07_en.png</screenshot>
      <screenshot width="1080" height="1920" index="2">screenshot08_en.png</screenshot>
    </screenshots>
  </images>

  <videos>
    <youtube-video>x8723jw2KL</youtube-video>
    <video-file>video1.mp4</video-file>
    <video-file>video2.mp4</video-file>
  </videos>

</description>
```

#### description/texts

Required. 
No attributes.

This tag contains all text assets. As everything inside the `<description>` tag can be localized using `<description-localization>` section. 

Example:
```xml
<texts>
  <title>Yandex.Shell</title>
  <title>Yandex.Shell - Free Launcher + Dialer + Widgets</title>
  <keywords>shell, homescreen, launcher</keywords>
  <short-description>My short description</short-description>
  <short-description>Slightly longer version of my short description</short-description>
  <short-description>Even more longer version of my short description text</short-description>
  <full-description>My full description here</full-description>
  <features>
    <feature>New dialer</feature>
    <feature>Home screen</feature>
    <feature>3D interface</feature>
  </features>
  <recent-changes>It is a description of what was changed in the latest version</recent-changes>
  <privacy-policy href="http://legal.yandex.com/privacy/">We won't share information about you, your account or your email addresses with anyone. Period.</privacy-policy>
  <eula href="http://wwww.mysite.com/legal/eula.html">Don't violate copyright law and no matter what happens, including damage to your equipment or even someone’s death, you agree not to blame us even if it is our fault.</eula>
</texts>
```

##### description/texts/title

Required. 
No attributes. 
Maximum length: the first tag must be 30 symbols or shorter.

The application name is shown in the application list. As everything inside the `<description>` tag can be localized using `<description-localization>` section. Different stores have different requirements for maximum title length. In order to have flexibility to get the best from each of the stores you can include several copies of title tag. The store will take the longest one that is fits in its maximum size. The first title must be 30 symbols or shorter in order to be supported by all the stores.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Maximum length</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Product Details / Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>30</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / General / Name</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Description / Display Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>250</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Binary & Device / Application Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No (imported from APK Android manifest file (android:label field)</td>
    <td>-</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>255</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Application Name</td>
    <td>Yes</td>
    <td>No</td>
    <td>100</td>
  </tr>   
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Application Name</td>
    <td>Yes</td>
    <td>No</td>
    <td>Unlimited</td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>Basic Information / App Title</td>
    <td>Yes</td>
    <td>No</td>
    <td>50</td>
  </tr>
</table>

##### description/texts/keywords

Required. 
No attributes. 

Comma separated the list of keywords. As everything inside the `<description>` tag can be localized using `<description-localization>` section.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Maximum length</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Description / Keywords</td>
    <td>No</td>
    <td>Yes</td>
    <td>80</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Keywords</td>
    <td>No</td>
    <td>No</td>
    <td>Unlimited</td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Display Information / Tags / Other Tags</td>
    <td>No</td>
    <td>Yes</td>
    <td>Maximum 10 keywords</td>
    <td>Not one string but a list of keywords</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Keywords</td>
    <td>No</td>
    <td>No</td>
    <td>Unlimited</td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Keywords &amp; Category / Keywords</td>
    <td>Yes</td>
    <td>No</td>
    <td>Unlimited number, maximum 50 symbols each</td>
    <td>Not one string but a list of keywords</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

##### description/texts/short-description

Required. 
No attributes. 
Maximum length: the first tag should be 80 symbols or shorter.

Short application description is used in the app lists next to the app title. Some stores include such short description to the lists, some do not. Different stores have different requirements for maximum short description length. In order to have flexibility to get the best from each of the stores you can include several copies of short description tag. The store will take the longest one that fits in its maximum size. As everything inside the `<description>` tag can be localized using `<description-localization>` section. The first short description must be 80 symbols or shorter in order to be supported by all the stores.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Maximum length</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Product Details / Promo Text</td>
    <td>No</td>
    <td>Yes</td>
    <td>80</td>
    <td>Is not shown in the app list but only on promotion pages</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Description / Short description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>1200</td>
    <td>A shorter version of your app description for use on mobile devices.</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Short Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td>Shown on the top of the product webpage, next to the app icon</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Short description</td>
    <td>Yes</td>
    <td>No</td>
    <td>500</td>
    <td>Shown in the list of the apps on the "big" website</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>App Detail / Summary</td>
    <td>Yes</td>
    <td>No</td>
    <td>32</td>
    <td>Shown below app name like a slogan</td>
  </tr>
</table>

##### description/texts/full-description

Required. 
Maximum length: 4000.

The full application description is shown on the product page. You can include simple HTML subset tags described below. Most stores support plain text full description only so they will ignore your markup. You can also include a special subtag `<features>`. Everything inside the `<features>` subtag will be shown only by the stores that do not support feature list. It is needed to avoid feature list duplication. As everything inside the `<description>` tag can be localized using `<description-localization>` section.

<table>
  <tr>
    <th>Supported markup tag</th>
    <th>Description</th>
    <th>Behaviour if unsupported</th>
  </tr>
  <tr>
    <td>&lt;b&gt;</td>
    <td>Bold (like in HTML)</td>
    <td>Simply ignored</td>
  </tr>
  <tr>
    <td>&lt;i&gt;</td>
    <td>Italic (like in HTML)</td>
    <td>Simply ignored</td>
  </tr>
  <tr>
    <td>&lt;ul&gt;</td>
    <td>Unordered list (like in HTML)</td>
    <td>Simply ignored</td>
  </tr>
  <tr>
    <td>&lt;li&gt;</td>
    <td>List item (like in HTML)</td>
    <td>Replaced with '*' symbol</td>
  </tr>
  <tr>
    <td>&lt;a&gt;</td>
    <td>Link (like in HTML)</td>
    <td>&lt;a href="http://wwww.yahoo.com"&gt;Yahoo&lt;/a&gt; is replaced with Yahoo (http://wwww.yahoo.com)</td>
  </tr>
  <tr>
    <td>&lt;features&gt;</td>
    <td>Features</td>
    <td>This tag must be removed by the store, its content is either included (if the store does not support a separate feature list) or ignored</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Maximum length</th>
    <th>Markup support</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Product Details / Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>4000</td>
    <td>simple HTML, no links</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / General / Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td>Plain text</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Description / Long description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>4000</td>
    <td>simple HTML, no links</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Full Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td>Some HTML subset</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Display Information / Display / Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>4000</td>
    <td>?</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Long Description</td>
    <td>Yes</td>
    <td>No</td>
    <td>Unlimited</td>
    <td>Some HTML subset</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Description / Application Description</td>
    <td>Yes</td>
    <td>No</td>
    <td>2500</td>
    <td>Plain text</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Application Description</td>
    <td>Yes</td>
    <td>No</td>
    <td>Unlimited</td>
    <td>Some HTML subset</td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>App Detail / Description</td>
    <td>Yes</td>
    <td>No</td>
    <td>1300 Korean words, or 4000 English symbols</td>
    <td>Some HTML subset</td>
  </tr>
</table>

##### description/texts/features
Required.
No attributes.

Some stores support separate feature list (most assumes that the feature list is included into the full description). Each `<feature>` subtag should contain one feature description. There should be between 3 to 5 `<feature>` subtags. As everything inside the `<description>` tag can be localized using `<description-localization>` section.

Example:
```xml
<features>
  <feature>New dialer</feature>
  <feature>Home screen</feature>
  <feature>3D interface</feature>
</features>
```

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Maximum length</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Description / Product feature bullets</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

##### description/texts/recent-changes

Optional. 
No attributes. 
Maximum length: 500.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Maximum length</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Product Details / Recent changes</td>
    <td>No</td>
    <td>Yes</td>
    <td>500</td>
    <td>Describes the changes of the latest version (version number is taken from APK file)</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Builds / What's new?</td>
    <td>No</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td>Describes the changes of the latest version (version number is taken from APK file)</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Revision information / Log message</td>
    <td>No</td>
    <td>No</td>
    <td>Unlimited</td>
    <td>This information will go in the application's changelog and can not be changed</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Upload APK file / Release Description</td>
    <td>Yes</td>
    <td>No</td>
    <td>Unlimited</td>
    <td></td>
  </tr>
</table>

##### description/texts/privacy-policy
Optional. 
Attributes: `href`. 
Maximum length: 5000.

Privacy policy for this application. It must include both a link to privacy policy webpage (in `href` attribute) and full privacy policy text. As everything inside the `<description>` tag it can be localized using `<description-localization>` section.

Example:
```xml
<privacy-policy href="http://legal.yandex.com/privacy/">We won't share information about 
you, your account or your email addresses with anyone. Period.</privacy-policy>
```

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>href</td>
    <td>URL</td>
    <td>Link to a webpage with your privacy policy for this application</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Privacy Policy / Link to policy</td>
    <td>No</td>
    <td>No</td>
    <td>Privacy policy URL</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Privacy policy URL</td>
    <td>No</td>
    <td>No</td>
    <td>Privacy policy URL</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Privacy Statement</td>
    <td>No</td>
    <td>No</td>
    <td>Full privacy policy text or URL</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>License / Privacy policy</td>
    <td>No</td>
    <td>No</td>
    <td>Only full privacy policy text is supported (no URL option)</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

##### description/texts/eula

Optional. 
Attributes: `href`. 
Maximum length: 5000.

End User License Agreement for this application. It must include both a link to EULA webpage (in `href` attribute) and full EULA text. As everything inside the `<description>` tag it can be localized using `<description-localization>` section.

Example:
```xml
<eula href="http://wwww.mysite.com/legal/eula.html">Don't violate copyright law and no matter 
what happens, including damage to your equipment or even someone’s death, you agree not to blame 
us even if it is our fault.</eula>
```

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>href</td>
    <td>URL</td>
    <td>Link to a webpage with your End User License Agreement for this application</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>EULA</td>
    <td>No</td>
    <td>No</td>
    <td>EULA text or URL</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>License / Terms and Conditions/Copyright</td>
    <td>No</td>
    <td>No</td>
    <td>Only text, not URL option</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Description / End User License Agreement</td>
    <td>No</td>
    <td>No</td>
    <td>Only text, no URL option, maximum 5000 symbols</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

#### description/images

Required. 
No attributes.

This tag contains all application image assets. As everything inside the `<description>` tag can be localized using `<description-localization>` section. If `<description-localization>` tag does not contains any particular image type then the corresponding image from the `<description>` section is taken. 

Example:
```xml
<images>
  <app-icon width="512" height="512">icon.png</app-icon>
  <app-icon width="135" height="135">icon_135x135.png</app-icon>
  <app-icon width="144" height="144">icon_144x144.png</app-icon>
  <large-promo width="1024" height="500">promo.png</large-promo>
  <small-promo width="180" height="120">feature.png</small-promo>
  <screenshots>
    <screenshot width="480" height="800" index="1">screenshot01_en.png</screenshot>
    <screenshot width="480" height="800" index="2">screenshot02_en.png</screenshot>
    <screenshot width="480" height="800" index="3">screenshot03_en.png</screenshot>
    <screenshot width="480" height="800" index="4">screenshot04_en.png</screenshot>
    <screenshot width="1920" height="1200" index="1">screenshot05_en.png</screenshot>
    <screenshot width="1920" height="1200" index="2">screenshot06_en.png</screenshot>
    <screenshot width="1080" height="1920" index="1">screenshot07_en.png</screenshot>
    <screenshot width="1080" height="1920" index="2">screenshot08_en.png</screenshot>
  </screenshots>
</images>
```

##### description/images/app-icon

Required. 
Attributes: `width`, `height`. 

High resolution application icon. Must be in PNG format. Different stores require different resolutions of this icon. You can include several versions of the `<app-icon>` tag with different `width` and `height` attributes. The store will automatically select right size. AppDF will automatically rescale your image if there is no needed size. Most of the stores use 512x512 PNG image, so you must include this size, other sizes are optional. The icon must be a square (`width`=`height`).

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Default</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>width</td>
    <td>a number</td>
    <td>Mandatory attribute</td>
    <td>The store selects the app icon in the most appropriate size. The first icon must be 512x512.</td>
  </tr>
  <tr>
    <td>height</td>
    <td>a number</td>
    <td>Mandatory attribute</td>
    <td>The store selects the app icon in the most appropriate size. The first icon must be 512x512.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Resolution</th>
    <th>Formats</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Graphic Assers / High-res icon</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>512x512</td>
    <td>32-bit PNG (with alpha)</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Images / Promo icon</td>
    <td>Yes</td>
    <td>No</td>
    <td>512x512</td>
    <td>32-bit PNG (with alpha), less than 1024KB</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Images & Multimedia / Small Icon, Large icon</td>
    <td>Yes</td>
    <td>No</td>
    <td>114x114 + 512x512</td>
    <td>PNG (with transparency)</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Thumbnail</td>
    <td>No</td>
    <td>No</td>
    <td>512x512</td>
    <td>PNG, JPG, GIF</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Display Information / Icon Image</td>
    <td>Yes</td>
    <td>No</td>
    <td>135x125</td>
    <td>JPG, GIF</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Promotion / Icon, High resolution icon</td>
    <td>No</td>
    <td>No</td>
    <td>150x150 - 500x500 for Icon, 512x512 for High resolution icon</td>
    <td>PNG, JPG, GIF</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Icons &amp; Screenshots / Icon</td>
    <td>Yes</td>
    <td>No</td>
    <td>300x300</td>
    <td>PNG, to transparency</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Application icon</td>
    <td>No</td>
    <td>No</td>
    <td>Any</td>
    <td>PNG</td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>App Image / Icon</td>
    <td>Yes</td>
    <td>No</td>
    <td>212x212</td>
    <td>JPEG, PNG, GIF or BMP</td>
  </tr>
</table>

##### description/images/large-promo
Optional. 
Attributes: `width`, `height`. 

Large promotion picture usually used by the stores on the PC websites, some stores use in on a device as well. Must be a 1024x500 PNG or JPG image.

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
  </tr>
  <tr>
    <td>width</td>
    <td>Must be `1024`</td>
  </tr>
  <tr>
    <td>height</td>
    <td>Must be `500`</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Resolution</th>
    <th>Formats</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Graphic Assers / Feature Graphic</td>
    <td>No</td>
    <td>Yes</td>
    <td>1024x500</td>
    <td>JPG or 24-bit PNG (no alpha)</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Images / Featured screen</td>
    <td>No</td>
    <td>No</td>
    <td>1024x500</td>
    <td>JPG or 24-bit PNG (no alpha)</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Images & Multimedia / Promotional image</td>
    <td>No</td>
    <td>No</td>
    <td>1024x500</td>
    <td>PNG or JPG</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Promotion / Promotional image</td>
    <td>No</td>
    <td>No</td>
    <td>1024x500</td>
    <td>PNG or JPG</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

##### description/images/small-promo

Optional. 
Attributes: `width`, `height`. 

A small promotion picture is usually used by the stores on a mobile device for promoted apps. Must be a 180x120 PNG or JPG image.

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
  </tr>
  <tr>
    <td>width</td>
    <td>Must be `180`</td>
  </tr>
  <tr>
    <td>height</td>
    <td>Must be `120`</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Resolution</th>
    <th>Formats</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Graphic Assers / Feature Graphic</td>
    <td>No</td>
    <td>Yes</td>
    <td>180x120</td>
    <td>JPG or 24-bit PNG (no alpha)</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Promotion / Small promotional image</td>
    <td>No</td>
    <td>No</td>
    <td>180x120</td>
    <td>PNG or JPG</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

##### description/images/screenshots
Required. 
No attributes. 

Contains several `<screenshot>` subtags. Each `<screenshot>` subtag describes one screenshot. Different stores use different number of screenshots. You should provide at least four screenshots to support all the stores. If you provide more screenshots than a store can use the first screenshots are used. 

##### description/images/screenshots/screenshot
Required. 
Attributes: `width`, `height`, `index`. 

A tag that describes one screenshot. Screenshots must be in PNG format. There could be several versions of each screenshot with different sizes, they should have the same `index` attribute in that case. 480x800 size must be presented for each screenshot. 1080x1920 (HD) and 1920x1200 (tablet) versions are recommended to have as well. Different stores use different screenshot sizes. Each store will choose one the best matching image size from each screenshot group (screenshot with the same `index` attribute).  

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>width</td>
    <td>A number</td>
    <td>Each store will choose one the best matching screen resolution from each screenshot group</td>
  </tr>
  <tr>
    <td>height</td>
    <td>A number</td>
    <td>Each store will choose one the best matching screen resolution from each screenshot group</td>
  </tr>
  <tr>
    <td>index</td>
    <td>A number</td>
    <td>If several screenshots have the same index attribute then they represent the same screenshot in different sizes</td>
  </tr>
</table>

Example:
```xml
<screenshots>
  <screenshot width="480" height="800" index="1">screenshot01_en.png</screenshot>
  <screenshot width="480" height="800" index="2">screenshot02_en.png</screenshot>
  <screenshot width="480" height="800" index="3">screenshot03_en.png</screenshot>
  <screenshot width="480" height="800" index="4">screenshot04_en.png</screenshot>
  <screenshot width="1920" height="1200" index="1">screenshot05_en.png</screenshot>
  <screenshot width="1920" height="1200" index="2">screenshot06_en.png</screenshot>
  <screenshot width="1080" height="1920" index="1">screenshot07_en.png</screenshot>
  <screenshot width="1080" height="1920" index="2">screenshot08_en.png</screenshot>
</screenshots>
```

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Resolution</th>
    <th>Formats</th>
    <th>Number</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Graphic Assers / Screenshots</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>320x480, 480x800, 480x854, 1280x720, 1280x800</td>
    <td>JPG or 24-bit PNG (no alpha)</td>
    <td>2+</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Images / Screenshots</td>
    <td>Yes</td>
    <td>No</td>
    <td>250x140 - 1920x1080</td>
    <td>JPG or 24-bit PNG (no alpha)</td>
    <td>2+</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Images & Multimedia / Screenshots</td>
    <td>Yes</td>
    <td>No</td>
    <td>800x480, 1024x600, 1280x720, 1280x800, or 1920x1200 (portrait or landscape)</td>
    <td>JPG or PNG</td>
    <td>3-10</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Main image, Images</td>
    <td>Yes</td>
    <td>No</td>
    <td>Any</td>
    <td>JPG, PNG, GIF</td>
    <td>1+</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Display Information / Screenshots</td>
    <td>Yes</td>
    <td>No</td>
    <td>480x800 or 800x480</td>
    <td>JPG, PNG, GIF, 500K maximum</td>
    <td>4</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Promotion / Screenshots</td>
    <td>Yes</td>
    <td>No</td>
    <td>240x180 - 640x480</td>
    <td>JPG, PNG, GIF</td>
    <td>1-3</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Icons &amp; Screenshots / Screenshots</td>
    <td>Yes</td>
    <td>No</td>
    <td>600x1024 or 1024x600</td>
    <td>PNG</td>
    <td>1-4</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Screenshots</td>
    <td>No</td>
    <td>No</td>
    <td>320x240,480x854</td>
    <td>JPG, PNG</td>
    <td>1-3</td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>App Image / Screenshots</td>
    <td>Yes</td>
    <td>No</td>
    <td>240x180 - 640x480</td>
    <td>JPG, PNG, GIF</td>
    <td>1-3</td>
  </tr>
</table>

#### description/videos

Optional. 
No attributes.

This tag contains all video assets. As everything inside the `<description>` tag can be localized using `<description-localization>` section. If `<description-localization>` tag does not contain any particular video type then the corresponding video from the `<description>` section is taken.

Example:
```xml
<videos>
  <youtube-video>x8723jw2KL</youtube-video>
  <video-file>video1.mp4</video-file>
  <video-file>video2.mp4</video-file>
</videos>
```

##### description/videos/youtube-video

Optional. 
No attributes. 

If you have a video about your product on YouTube you can include it here. Please include only ID not the entire URL. For example if your YouTube video URL is:
https://www.youtube.com/watch?v=4YcBHQ2fCDE

then tag value should be just `4YcBHQ2fCDE`. Like:
```xml
<youtube-video>4YcBHQ2fCDE</youtube-video>
```

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Graphic Assets / Promo Video</td>
    <td>No</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Display Information / Support / YouTube URL</td>
    <td>No</td>
    <td>No</td>
    <td>When you add YouTube video, the fourth screenshot will be replaced with YouTube video</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Promotion / Video</td>
    <td>No</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Video URL</td>
    <td>No</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>App Detail / Support URL</td>
    <td>No</td>
    <td>No</td>
    <td></td>
  </tr>
</table>

##### description/videos/video-file
Optional. 
No attributes. 

Some stores don't support including of YouTube videos but do support uploaded video files. You can use this tag to link to local video files about the product. You can include several different video files.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Number</th>
    <th>Format</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Images & Multimedia / Video(s)</td>
    <td>No</td>
    <td>No</td>
    <td>0-5</td>
    <td>MPEG-2, WMV, MOV, FLV, AVI, or H.264 MPEG-4, Minimum 720px wide (4:3 or 16:9); 1200 kbps or higher</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

### description-localization
Optional.
Attributes: `language`. 

You can use `<description-localization>` section to localize texts, images and videos in product description. This tag has the same structure as `<description>` but all subtags are optional. If some information is missing in the `<description-localization>` section it will be taken from the  `<description>` section.

Reference language list in [JSON](http://www.onepf.org/appdf/data/languages.json) and [XML](data/languages.xml) formats.

Reference country list in [JSON](http://www.onepf.org/appdf/data/countries.json) and [XML](data/countries.xml) formats.


<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Default</th>
  </tr>
  <tr>
    <td>language</td>
    <td>two letter ISO 639-1 language code (like "en", full language list in <a href="http://www.onepf.org/appdf/data/languages.json">JSON</a> and <a href="data/languages.xml">XML</a> formats) or two letters language code + two upper case letter ISO 3166‑1 country code (like "en-US", full country list in <a href="http://www.onepf.org/appdf/data/countries.json">JSON</a> and <a href="data/countries.xml">XML</a> formats)</td>
    <td>required tag</td>
  </tr>
</table>

Example:
```xml
<description-localization language="de">
  <texts>
    <short-description>Meine kurze Beschreibung</short-description>
    <full-description>Meine Sie hier</full-description>
  </texts>

  <images>
    <large-promo width="1024" height="500">promo_de.png</large-promo>
    <screenshots>
      <screenshot width="480" height="800" index="1">screenshot01_de.png</screenshot>
      <screenshot width="480" height="800" index="2">screenshot02_de.png</screenshot>
      <screenshot width="480" height="800" index="3">screenshot03_de.png</screenshot>
      <screenshot width="480" height="800" index="4">screenshot04_de.png</screenshot>
      <screenshot width="1920" height="1200" index="1">screenshot05_de.png</screenshot>
      <screenshot width="1920" height="1200" index="2">screenshot06_de.png</screenshot>
      <screenshot width="1080" height="1920" index="1">screenshot07_de.png</screenshot>
      <screenshot width="1080" height="1920" index="2">screenshot08_de.png</screenshot>
    </screenshots>
  </images>
</description-localization>
```

### content-description
Required.
No attributes.

This section describes what activities that could be considered questionable the program/game includes. The stores use this information for filtering to show the app only to allowed individuals. The three main subsections describe age restrictions and existing certificates, content descriptors that are used to calculate age restrictions and other questionable application activities that should require user and/or parent understanding but that are not covered by Android permissions.  

Example:
```xml
<content-description>
  <content-rating>13</content-rating>
  <rating-certificates>
    <rating-certificate type="PEGI" certificate="whirl-pegi.pdf">3</rating-certificate>
    <rating-certificate type="ESRB" certificate="whirl-esrb.pdf">3</rating-certificate>
    <rating-certificate type="GRB" certificate="whirl-grb.pdf">0</rating-certificate>
    <rating-certificate type="CERO" certificate="whirl-cero.pdf">0</rating-certificate>
    <rating-certificate type="DEJUS" certificate="whirl-dejus.pdf" mark="dejus_mark.jpg">0</rating-certificate>
    <rating-certificate type="FSK" certificate="whirl-fsk.pdf">0</rating-certificate>
  </rating-certificates>
  <content-descriptors>
    <cartoon-violence>no</cartoon-violence>
    <realistic-violence>no</realistic-violence>
    <bad-language>no</bad-language>
    <fear>light</fear>
    <sexual-content>no</sexual-content>
    <drugs>no</drugs>
    <gambling-reference>no</gambling-reference>
    <alcohol>no</alcohol>
    <smoking>strong</smoking>
    <discrimination>no</discrimination>
  </content-descriptors>
  <included-activities>
    <in-app-billing>no</in-app-billing>
    <gambling>no</gambling>
    <advertising>no</advertising>
    <user-generated-content>no</user-generated-content>
    <user-to-user-communications>no</user-to-user-communications>
    <account-creation>no</account-creation>
    <personal-information-collection>no</personal-information-collection>
  </included-activities>
</content-description>
```

#### content-description/content-rating
Required.
No attributes.

Each application must be labeled with a minimum age allowance according to [ESRB standard](http://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board). Tag value must be a number of minimum age which could be `3`, `6`, `10`, `13`, `17`, or `18`. 

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Categorization / Content rating</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Additional info / Age Rating</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Category / Age Restriction</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Application / Parental Rating</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Age Range</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>

There is no universal content rating system (aka parental control rating, aka minimum age). Different stores use different systems. AppDF uses ESRB standard but the more important thing is how this information is mapped out to the systems used in the appstores. The following table is used by AppDF to convert the rating to the systems of all the main application stores.

<table>
  <tr>
    <th>ESRB</th>
    <th>Google Play</th>
    <th>Amazon AppStore</th>
    <th>Opera Mobile Store</th>
    <th>Samsung Apps</th>
    <th>SlideME</th>
    <th>NOOK apps</th>
  </tr>
  <tr>
    <td>3</td>
    <td>Everyone</td>
    <td>n/a</td>
    <td>n/a</td>
    <td>Over age 0</td>
    <td>G: General Audiences (for all ages)</td>
    <td>Ages 0-4</td>
  </tr>
  <tr>
    <td>6</td>
    <td>Low maturity</td>
    <td>n/a</td>
    <td>n/a</td>
    <td>Over age 4</td>
    <td>G: General Audiences (for all ages)</td>
    <td>6+</td>
  </tr>
  <tr>
    <td>10</td>
    <td>Medium maturity</td>
    <td>n/a</td>
    <td>n/a</td>
    <td>Over age 12</td>
    <td>PG: Parental Guidance Suggested (may not be suitable for children)</td>
    <td>10+</td>
  </tr>
  <tr>
    <td>13</td>
    <td>Medium maturity</td>
    <td>n/a</td>
    <td>n/a</td>
    <td>Over age 16</td>
    <td>PG-13: Parents Strongly Cautioned (may not be suitable for children under 13)</td>
    <td>13+</td>
  </tr>
  <tr>
    <td>17</td>
    <td>High maturity</td>
    <td>n/a</td>
    <td>n/a</td>
    <td>Over age 18</td>
    <td>R: Restricted (under 17 requires accompanying adult guardian)</td>
    <td>17+</td>
  </tr>
  <tr>
    <td>18</td>
    <td>High maturity</td>
    <td>n/a</td>
    <td>n/a</td>
    <td>Over age 18</td>
    <td>NC-17: Not allowed for 17 and under</td>
    <td>18+</td>
  </tr>
</table>

There could be exceptional products for which a generic converting rule described in this table don't work. You can use the `<store-specific>` tag to specify a custom content rating for the stores in that case.

Here you can find more detailed information about content rating definitions used in different stores:
<table>
  <tr>
    <th>Store</th>
    <th>Link</th>
  </tr>
  <tr>
    <td>ESRB (used in AppDF)</td>
    <td>http://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board</td>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>http://support.google.com/googleplay/android-developer/support/bin/answer.py?hl=en&answer=188189</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Options are: Adults, Teenagers, Children</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Uses several content descriptors instead of one rating value</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Content rating is not used</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Samsung Age Rating Guide (link cannot be found)</td>
  </tr>
</table>

##### Notes:
1. Amazon doesn't have one field for application rating but uses several parameters (nudity, violation, etc)
2. Opera doesn't support content rating (except "Is Adult?" question)
3. Samsung uses minimum age parameter along with several other attributes that define application rating according to the standard certification systems (PEGI, ESRB, etc)

#### content-description/rating-certificates/rating-certificate
Optional.
Attributes: `type`, `certificat`, `mark`. 

If your application/game has a rating certificate issued by one of the authorities you can include it using the optional tag `<rating-certificate>`. Tag value should be rating given you, usually it is a minimum age number.
 
Example:
```xml
<rating-certificates>
  <rating-certificate type="PEGI" certificate="whirl-pegi.pdf">7</rating-certificate>
  <rating-certificate type="ESRB" certificate="whirl-esrb.pdf">7</rating-certificate>
  <rating-certificate type="GRB" certificate="whirl-grb.pdf">all</rating-certificate>
  <rating-certificate type="CERO" certificate="whirl-cero.pdf">all</rating-certificate>
  <rating-certificate type="DEJUS" certificate="whirl-dejus.pdf" mark="dejus_mark.jpg">l</rating-certificate>
  <rating-certificate type="FSK" certificate="whirl-fsk.pdf">0</rating-certificate>
</rating-certificates>
```

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>type</td>
    <td>PEGI, ESRB, GRB, CERO, DEJUS or FSK</td>
    <td>required</td>
    <td>Name of the content rating certificate</td>
  </tr>
  <tr>
    <td>certificate</td>
    <td>File name from the AppDF package</td>
    <td>optional</td>
    <td>If you have a scanned certificate you can add it there</td>
  </tr>
  <tr>
    <td>mark</td>
    <td>File name from the AppDF package</td>
    <td>optional</td>
    <td>If you have a special label you can add it there</td>
  </tr>
</table>

<table>
  <tr>
    <th>Type</th>
    <th>Possible rating values</th>
  </tr>
  <tr>
    <td>PEGI</td>
    <td>3, 7, 12, 16, 18</td>
  </tr>
  <tr>
    <td>ESRB</td>
    <td>3, 6, 10, 13, 17, 18</td>
  </tr>
  <tr>
    <td>GRB</td>
    <td>0, 12, 15, 18</td>
  </tr>
  <tr>
    <td>CERO</td>
    <td>0, 12, 15, 17, 18</td>
  </tr>
  <tr>
    <td>DEJUS</td>
    <td>0, 10, 12, 14, 16, 18</td>
  </tr>
  <tr>
    <td>FSK</td>
    <td>0, 6, 12, 16, 18</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Certificates</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Category / Rating Information</td>
    <td>PEGI, ESRB, GRB, MJ/DEJUS, FSK</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

#### content-description/content-descriptors
Required.
No attributes.

Contains several subtags each describing one of the content descriptors. Each content descriptor could have either `no`, `light` or `strong` value. Most of the stores do not use this information but rather use summary information from the `<minimum-age>` tag. You can read more detailed description of these categories in the articles about the content rating systems:
[ESRB](http://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board), [PEGI](http://en.wikipedia.org/wiki/Pan_European_Game_Information).

Example:
```xml
<content-descriptors>
  <cartoon-violence>no</cartoon-violence>
  <realistic-violence>no</realistic-violence>
  <bad-language>no</bad-language>
  <fear>light</fear>
  <sexual-content>no</sexual-content>
  <drugs>no</drugs>
  <gambling-reference>no</gambling-reference>
  <alcohol>no</alcohol>
  <smoking>strong</smoking>
  <discrimination>no</discrimination>
</content-descriptors>
```

<table>
  <tr>
    <th>Content descriptor</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>cartoon-violence</td>
    <td>Violent actions involving cartoon-like situations and characters. May include violence where a character is unharmed after the action has been inflicted</td>
  </tr>
  <tr>
    <td>realistic-violence</td>
    <td>May contain scenes of people getting injured or dying, often by use of weapons. Also may contain gore and blood-letting.</td>
  </tr>
  <tr>
    <td>fear</td>
    <td>May contain scenes that are considered too disturbing or frightening to younger or more emotionally vulnerable players.</td>
  </tr>
  <tr>
    <td>sexual-content</td>
    <td>May contain references to sexual attraction or sexual intercourse. Also may contain nudity and characters dressed in suggestive clothing.</td>
  </tr>
  <tr>
    <td>drugs</td>
    <td>May contain references to illegal drugs or a fictional substance that has parallels to real-life illegal drugs (in use, possession, or sale).</td>
  </tr>
  <tr>
    <td>gambling-reference</td>
    <td>May contain elements that encourage or teach gambling.</td>
  </tr>
  <tr>
    <td>alcohol</td>
    <td>The consumption of alcoholic beverages or references to and/or images or alcoholic beverages</td>
  </tr>
  <tr>
    <td>smoking</td>
    <td>References to and/or images of tobacco products</td>
  </tr>
  <tr>
    <td>discrimination</td>
    <td>May contain cruelty or harassment based on race, ethnicity, gender, or sexual preferences.</td>
  </tr>
  <tr>
    <td>bad-language</td>
    <td>May contain profanity, sexual innuendo, threats, and all manner of slurs and epithets.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Age rating</td>
    <td>Yes</td>
    <td>Possible values: Adults, Teenagers, Children</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Content Rating</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Is Adult?</td>
    <td>Yes</td>
    <td>Only adult descriptor is used</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Adult Content</td>
    <td>No</td>
    <td>Adult Content is one of the categories</td>
  </tr>
</table>

#### content-description/included-activities
Required.
No attributes.

Contains several subtags each describing one type of the application activities that may require user or parent understanding and permission but that is not covered by Android permission system. Each activity tag could have either `no`, `yes` value. 

Example:
```xml
<included-activities>
  <in-app-billing>no</in-app-billing>
  <gambling>no</gambling>
  <advertising>no</advertising>
  <user-generated-content>no</user-generated-content>
  <user-to-user-communications>no</user-to-user-communications>
  <account-creation>no</account-creation>
  <personal-information-collection>yes</personal-information-collection>
</included-activities>
```

<table>
  <tr>
    <th>Activity</th>
    <th>Explanation</th>
  </tr>
  <tr>
    <td>in-app-billing</td>
    <td>Either standard or custom in-app billing (aka In-App Purchases)</td>
  </tr>
  <tr>
    <td>gambling</td>
    <td>Gambling</td>
  </tr>
  <tr>
    <td>advertising</td>
    <td>Any form of advertising including banner or AirPush-like advertising</td>
  </tr>
  <tr>
    <td>user-generated-content</td>
    <td>User generated content</td>
  </tr>
  <tr>
    <td>user-to-user-communications</td>
    <td>User to user communications</td>
  </tr>
  <tr>
    <td>account-creation</td>
    <td>Account creation</td>
  </tr>
  <tr>
    <td>personal-information-collection</td>
    <td>Your application transfers to the server or collects locally on the device any personal information</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Content Rating</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Application / "In-App" billing, With advertisements</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / "Does your app invite a user to input personal...", </td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

### availability
Optional.
No attributes.

You can define country list of period of time where/when you application is distributed. By default your application is distributed to all the countries where language support allows.

Example 1:
```xml
<availability>
  <countries only-listed="yes">
    <include>US</include>
    <include>GB</include>
    <include>DE</include>
  </countries>

  <period>
    <since year="2012" month="12" day="23"/>
    <until year="2013" month="12" day="23"/>
  </period>
</availability>
```

Example 2:
```xml
<availability>
  <countries only-listed="no">
    <exclude>CU</exclude>
    <exclude>IM</exclude>
  </countries>
</availability>
```

#### availability/countries
Optional.
Attributes: `only-listed`. 

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>only-listed</td>
    <td>yes, no</td>
    <td>required</td>
    <td>If value is "yes" then only &lt;include&gt; subtags could be included, if "no" then only &lt;exclude&gt; subtags could be included</td>
  </tr>
</table>

Use either `<include>` or `<exclude>` (depending on the `only-listed` attribute value) subtags to define list of the countries where your application is distributed. Subtag value should be a two upper case symbol ISO 3166‑1 country code. Here is the country list in [JSON](http://www.onepf.org/appdf/data/countries.json) and [XML](data/countries.xml) formats.

Example 1:
```xml
<countries only-listed="yes">
  <include>US</include>
  <include>GB</include>
  <include>DE</include>
</countries>
```

Example 2:
```xml
<availability only-listed="no">
  <countries>
    <exclude>CU</exclude>
    <exclude>IM</exclude>
  </countries>
</availability>
```

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Pricing and Distribution / Distribute in These Countries</td>
    <td>No</td>
    <td>Supports only &lt;exclude&gt;. Many countries are united under "Rest of the world" block and cannot be checked/unchecked one by one</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Distribution</td>
    <td>Yes</td>
    <td>One can "Select All" or choose specific countries grouped by continents.</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Availability & Pricing / Where would you like this app to be available?</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Stores</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Sales / Country/Price / Detailed Country &amp; Price Settings</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td>Supports only US and UK today</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

#### availability/period/since
Optional.
Attributes: `year`, `month`, `day`. 

If presented this tag defines a date from which the application can be distributed. Stores that support this tag will not distribute the app before this date. 

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Default</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>year</td>
    <td>A number like 2012</td>
    <td>required</td>
    <td>Year of the date</td>
  </tr>
  <tr>
    <td>month</td>
    <td>Month number, Jan=1, Feb=2, ..., Dec=12</td>
    <td>required</td>
    <td>Month of the date</td>
  </tr>
  <tr>
    <td>day</td>
    <td>Number of the day between 1 and 31</td>
    <td>required</td>
    <td>Day of the date</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Availability & Pricing / When would you like this app to be available on Amazon?</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Sales / Selling Starts</td>
    <td>Yes, default "Selling starts on the day of approval"</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>

#### availability/period/until
Optional.
Optional.
Attributes: `year`, `month`, `day`. 

If presented this tag defines a final date of application distribution. Stores that support this tag will not distribute the app after this date. 

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Default</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>year</td>
    <td>A number like 2012</td>
    <td>required</td>
    <td>Year of the date</td>
  </tr>
  <tr>
    <td>month</td>
    <td>Month number, Jan=1, Feb=2, ..., Dec=12</td>
    <td>required</td>
    <td>Month of the date</td>
  </tr>
  <tr>
    <td>day</td>
    <td>Number of the day between 1 and 31</td>
    <td>required</td>
    <td>Day of the date</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Availability & Pricing / When would you like this app to be discontinued for sale?</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Sales / Selling Ends</td>
    <td>No</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>

### price
Required.
Attributes: `free`. 

This section describes whether the application is free or paid and if paid what its price is. It has also an option for free apps to mark them as trial version of another app.

Example 1:
```xml
<price free="yes">
  <trial-version full-version="com.yandex.shellfullversion"/>
</price>
```

Example 2:
```xml
<price free="no">
  <base-price>4.95</base-price>
  <local-price country="DE">3.95</local-price>
  <local-price country="FR">3.95</local-price>
  <local-price country="RU">99</local-price>
</price>
```

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Default</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>free</td>
    <td>yes or no</td>
    <td>yes</td>
    <td>&lt;base-price&gt; and &lt;local-price&gt; subtags are applicable for paid apps, &lt;trial-version&gt; subtag is applicable for free apps</td>
  </tr>
</table>

#### price/base-price
Required for paid apps.
No attributes. 

Application price. Tag value should be a dot-separated number. This price is set in USD used to automatically calculate the prices in other currencies unless you manually specify such prices using `<local-price>` tags.

This tag is ignored for free apps.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Currency</th>
    <th>Including sales tax</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Pricing and Distribution / Default Price</td>
    <td>USD</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Additional info / Price</td>
    <td>USD</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Availability & Pricing / Are you charging for this app?</td>
    <td>USD, EUR, GBR, JPY</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Price (USD)</td>
    <td>USD</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Sales / Country/Price / Standard price</td>
    <td>USD</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Price</td>
    <td>USD</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Application Price</td>
    <td>USD</td>
    <td>?</td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Application Price</td>
    <td>USD, other</td>
    <td>Yes</td>
    <td>20 currencies can be set as base one</td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>App Information / Price</td>
    <td>KRW</td>
    <td>Yes</td>
    <td></td>
  </tr>
</table>

#### price/local-price
Optional.
Attributes: `country`. 

The stores will use your default price defined in the `<base-price>` tag to automatically generate prices for other currencies and other countries. Nevertheless you can use `<local-price>` tags to manually define price for some countries. Tag value should be a dot-separated number.

Reference country list in [JSON](http://www.onepf.org/appdf/data/countries.json) and [XML](data/countries.xml) formats.

Reference currency list in [JSON](http://www.onepf.org/appdf/data/currencies.json) and [XML](data/currencies.xml) formats.

Currencies used in different countries in [JSON](http://www.onepf.org/appdf/data/country_currencies.json) and [XML](data/country_currencies.xml) formats. One currency per country. If there are several official currencies in a country one is selected. Local prices are set in a currency defined according to this table. 

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Default</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>country</td>
    <td>two letter ISO 3166-1 country code, see the list in <a href="http://www.onepf.org/appdf/data/countries.json">JSON</a> or <a href="data/countries.xml">XML</a> formats</td>
    <td>required</td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Including sales tax</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Pricing and Distribution / Country List / Price</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Availability & Pricing / Calculated prices</td>
    <td>Yes</td>
    <td>Only US, UK, DE, FR, ES, IT, JP are supported</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Stores</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Sales / Country/Price / Detailed Country &amp; Price Settings</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Application Price</td>
    <td>?</td>
    <td>Only UK price in GBP is supported now</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

#### price/trial-version
Optional.
Attributes: `full-version`. 

If presented this tag indicates that this free app is a trial/demo version of another application. `full-version` attribute defines package name of the corresponding full version application.

This tag is ignored for paid apps.

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Default</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>full-version</td>
    <td>package name (Android notation)</td>
    <td>required</td>
    <td></td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td>Opera has support for trial versions but trial version is not a separate application but a separate APK file inside a shareware product</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Application / Trial version</td>
    <td>There is no support for full version package name</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>

### apk-files
Required.
No attributes.

In this section you list your APK. Each application could consist of several APK files.  

Example:
```xml
<apk-files>
  <apk-file>yandexshell2.apk</apk-file>
  <apk-file>yandexshell3.apk</apk-file>
</apk-files>
```

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Maximum APK file size</th>
    <th>Multiple APK file support</th>
    <th>Extension file support</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>APK / Upload new APK</td>
    <td>50M</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Builds / Upload build</td>
    <td>Unlimited</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Binary File(s) / Binary file</td>
    <td>Unlimited</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>APK file:</td>
    <td>Unlimited</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Binary File / Binary Upload / Binary File</td>
    <td>Unlimited</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Application / Application file</td>
    <td>66M</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Application &amp; Trial/ Application APK</td>
    <td>100M</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Upload APK file / APK File</td>
    <td>Not indicated</td>
    <td>No</td>
    <td>No</td>
  </tr>
</table>

### requirements
Optional.
No attributes.

You can use this section if your application has some special requirements apart from requirements described in the APK file.

Example:
```xml
<requirements>
  <features>
    <root>no</root>
    <gms>no</gms>
    <online>yes</online>
  </features>

  <supported-languages>
    <language>en</language>
    <language>ru</language>
    <language>de</language>
    <language>fr</language>
    <language>it</language>
  </supported-languages>

  <supported-devices>
    <exclude>kyleopen</exclude>
    <exclude>SHW-M130K</exclude>
  </supported-devices>

  <supported-resolutions only-listed="no">
    <exclude>2048x1536</exclude>
    <exclude>2560x1536</exclude>
    <exclude>2560x1600</exclude>
  </supported-resolutions>
</requirements>
```

#### requirements/features
Optional.
No attributes.

Example:
```xml
<features>
  <root>no</root>
  <gms>no</gms>
</features>
```

#### requirements/features/root
Optional.
No attributes.

Set value of this tag to `yes` if your application requires root access for working.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opers Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Requirements / Requires 'rooted' device</td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>


#### requirements/features/gms
Optional.
No attributes.

Set value of this tag to `yes` if your application requires Google Play to be installed on device and Google account for LVL or other actions. Please note that most it will dramatically limit your distribution options. Most of the stores work on the devices that don't have Google Play installed on them.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opers Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Binary File / Binary Upload / Manual Input Details / Google Mobile Service</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Requirements / Requires Google Play and/or account</td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>


#### requirements/features/online
Optional.
No attributes.

Set value of this tag to `yes` if your application requires internet connection in order to work. In other words if it does not work in offline mode.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opers Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Category / Runs Offline?</td>
    <td>By default Samsung Apps assumes your application can work in offline mode</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>


#### requirements/supported-languages
Optional.
No attributes.

You can manually define the list of supported languages. Add `<language>` subtag with two letter ISO 639-1 language codes for each language the application supports.

Example:
```xml
<supported-languages>
  <language>en</language>
  <language>ru</language>
  <language>de</language>
  <language>fr</language>
  <language>it</language>
</supported-languages>
```

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Binary File(s) / Language Support</td>
    <td></td>
  </tr>
  <tr>
    <td>Opers Mobile Store</td>
    <td>Yes</td>
    <td>Languages</td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Display Information / Supported Languages</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td>Does not support other languages but Enlish</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>



#### requirements/supported-devices
Optional.
No attributes.

You can manually exclude some devices from the supported device list. Add `<exclude>` tag with device model name (aka [name of the industrial design](http://developer.android.com/reference/android/os/Build.html#DEVICE)) for each device you want to exclude from the compatibility list.

Example:
```xml
<supported-devices>
  <exclude>kyleopen</exclude>
  <exclude>SHW-M130K</exclude>
</supported-devices>
```

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>APK / Device Compatibility</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td>Have separate flags for Amazon Kidle models support in the store-specific section</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Advanced compatibility options / Enable device selection</td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Binary File / Detailed Device Settings</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td>Have separate flags for NOOK models support in the store-specific section</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>All Your Applications / Published/Unpublished</td>
    <td></td>
  </tr>
</table>


#### requirements/supported-resolutions
Optional.
Attributes: `only-listed`. 

Most of the stores take this information from the APK file. Some stores also support manual selection of supported screen resolutions. In most cases you do not need to specify this tag because AppDF can provide information about supported screen resolutions even for the stores that cannot extract this information from APK files themselves. Use either `<include>` or `<exclude>` (depending on the `only-listed` attribute value) subtags to define list of the screen resolutions your application supports. 

Example 1:
```xml
<supported-resolutions only-listed="yes">
  <include>320x480</include>
  <include>480x800</include>
  <include>540x960</include>
  <include>720x1280</include>
</supported-resolutions>
```

Example 2:
```xml
<supported-resolutions only-listed="no">
  <exclude>2048x1536</exclude>
  <exclude>2560x1536</exclude>
  <exclude>2560x1600</exclude>
</supported-resolutions>
```

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>only-listed</td>
    <td>yes, no</td>
    <td>required</td>
    <td>If value is "yes" then only &lt;include&gt; subtags could be included, if "no" then only &lt;exclude&gt; subtags could be included</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td>This information is taken from APK file</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td>This information is taken from APK file</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td></td>
    <td></td>
    <td>This information is taken from APK file</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Advanced compatibility options / Enable screen resolution selection</td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Basic Information / Binary File / Binary Upload / Resolution(s)</td>
    <td>Required tag, per APK file</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>

### testing-instructions
Required.
No attributes.
Maximum length: 4000.

Please detail any special requirements to test your app. If your application requires an account to use it please provide testing account information.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Maximum size</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Binary File(s) / Testing instructions</td>
    <td>No</td>
    <td>4000</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Display Information / Certification / Comments to Certification Team</td>
    <td>Yes</td>
    <td>4000</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Testing / Release Notes</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

### consent
Required.
No attributes.

You must consent with a number of statements in order for your application to be published. This section includes the list of such agreements. There are agreements some stores require you to accept every time you submit an application (not when you register an account).Some stores will not accept your application without this section.  Each subtag corresponds to one of the statements you consent with. Subtag values must always be `yes` if you want your application is accepted by the corresponding stores.

Example:
```xml
<consent>
  <google-android-content-guidelines>yes</google-android-content-guidelines>
  <slideme-agreement>yes</slideme-agreement>
  <us-export-laws>yes</us-export-laws>
  <free-from-third-party-copytighted-content>yes</free-from-third-party-copytighted-content>
  <import-export>yes</import-export>
</consent>
```

<table>
  <tr>
    <th>Subtag</th>
    <th>Statement</th>
    <th>Detailed information</th>
  </tr>
  <tr>
    <td>&lt;google-android-content-guidelines&gt;</td>
    <td>This application meets Android Content Guidelines</td>
    <td>http://play.google.com/about/developer-content-policy.html</td>
  </tr>
  <tr>
    <td>&lt;us-export-laws&gt;</td>
    <td>I acknowledge that my software application may be subject to United States export laws, regardless of my location or nationality. I agree that I have complied with all such laws, including any requirements for software with encryption functions. I hereby certify that my application is authorized for export from the United States under these laws. </td>
    <td>https://support.google.com/googleplay/android-developer/support/bin/answer.py?hl=en&answer=113770</td>
  </tr>
  <tr>
    <td>&lt;slideme-agreement&gt;</td>
    <td>You agree with the complete Developer/Publisher Distribution Agreement</td>
    <td>http://slideme.org/developers/dda</td>
  </tr>
  <tr>
    <td>&lt;free-from-third-party-copytighted-content&gt;</td>
    <td>You confirm that your application is free from third-party copyrighted picture, sounds, database or other types of information</td>
    <td>Used by SK T-Store, more: http://dev.tstore.co.kr/devpoc/iprCenter/iprCenterInfo.omp</td>
  </tr>
  <tr>
    <td>&lt;import-export&gt;</td>
    <td>You confirm that you have all the right for your application to import to and export from all the supported countries</td>
    <td>Used by Amazon AppStore. Amazon describes this as "I certify this App may be imported to and exported from the United States and all other countries in which we operate our program or in which you've authorized sales to end users (without the need for us to obtain any license or clearance or take any other action) and is in full compliance with all applicable laws and regulations governing imports and exports, including those applicable to software that makes use of encryption technology."</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Pricing and Distribution / Consent</td>
    <td>&lt;google-android-content-guidelines&gt;, &lt;us-export-laws&gt;</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Binary File(s) / Export Compliance</td>
    <td>&lt;import-export&gt;</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Agreement</td>
    <td>&lt;slideme-agreement&gt;</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / "This application does not contain export encryption</td>
    <td>&lt;slideme-agreement&gt;</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>Basic Information / Intellectual property rights</td>
    <td>&lt;free-from-third-party-copytighted-content&gt;</td>
  </tr>
</table>

### customer-support
Required.
No attributes.

Example:
```xml
<customer-support>
  <company>Yandex</company>
  <phone>+1 (555) 1234-56-78</phone>
  <email>support@yandex-team.ru</email>
  <website>http://www.yandex.ru/support</website>
</customer-support>
```

#### customer-support/company
Required.
No attributes.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Appland</td>
    <td>Yes</td>
    <td></td>
    <td>Yes</td>
    <td>No</td>
  </tr>
</table>

#### customer-support/phone
Required.
No attributes.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Contact Details / Phone</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Customer support phone</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Support Phone</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Appland</td>
    <td>Yes</td>
    <td></td>
    <td>No</td>
    <td>No</td>
  </tr>
</table>

#### customer-support/email
Required.
No attributes.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Contact Details / Email</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Customer support email address</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Contact Email</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Display Information / Support / Support E-Mail</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Support Email</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Appland</td>
    <td>Yes</td>
    <td></td>
    <td>No</td>
    <td>No</td>
  </tr>
</table>

#### customer-support/website
Required.
No attributes.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / Contact Details / Website</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Customer support website</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>Display Information / Support / Support URL</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Support URL</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>Appland</td>
    <td>Yes</td>
    <td></td>
    <td>No</td>
    <td>No</td>
  </tr>
</table>

### store-specific
Optional.
No attributes.

All store specific information is collected in this section. 

Example:
```xml
<store-specific>
  <amazon>
    <form-factor>all</form-factor>
    <free-app-of-the-day-eligibility>yes</free-app-of-the-day-eligibility>
    <apply-amazon-drm>yes</apply-amazon-drm>
    <kindle-support>
      <kindle-fire-first-generation>yes</kindle-fire-first-generation>
      <kindle-fire>yes</kindle-fire>
      <kindle-fire-hd>yes</kindle-fire-hd>
      <kindle-fire-hd-8-9>yes</kindle-fire-hd-8-9>
    </kindle-support>
    <binary-alias>Version 1</binary-alias>
  </amazon>
  <samsung>
    <form-factor>phone,tablet</form-factor>
    <contains-zirconia-protection>yes</contains-zirconia-protection>
    <s-pen>yes</s-pen> 
    <tags>
      <tag>Education / Video</tag>
      <tag>Music / Album</tag>
    </tags>
  </samsung>
  <slideme>
    <license-type>apache2</license-type>
  </slideme>
  <nook>
    <supported-platforms>
      <nook-color>yes</nook-color>
      <nook-tablet>yes</nook-tablet>
      <nook-hd>yes</nook-hd>
      <nook-hd-plus>yes</nook-hd-plus>
    </supported-platforms>
  </nook>
  <tstore>
    <seller-name>Yandex</seller-name>
  </tstore>
</store-specific>
```

Top level subtags correspond to the application AppDF ids from the following table:

<table>
  <tr>
    <th>Application Store</th>
    <th>AppDF store id</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>google</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>amazon</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>opera</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>yandex</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>slideme</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>samsung</td>
  </tr>
  <tr>
    <td>NOOK apps</td>
    <td>nook</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>appslib</td>
  </tr>
</table>

Each store subtag can replace any of the parameters from the entire description.xml by including a replacement for the corresponding tag starting from the `<application>` tag. For example if we want to use another large promotion picture for Amazon AppStore we can include the following code:
```xml
<store-specific>
  <amazon>
    <application>
      <description>
        <images>
          <large-promo>promo_amazon.png</large-promo>
        </images> 
    </application>
  </amazon>
</store-specific>
```

There are also some optional and required store specific parameters you can/must use if you want that your AppDF file is supported by the corresponding store. 

#### store-specific/amazon
Optional.
No attributes.

Example:
```xml
<amazon>
  <form-factor>all</form-factor>
  <free-app-of-the-day-eligibility>yes</free-app-of-the-day-eligibility>
  <apply-amazon-drm>yes</apply-amazon-drm>
  <kindle-support>
    <kindle-fire-first-generation>yes</kindle-fire-first-generation>
    <kindle-fire>yes</kindle-fire>
    <kindle-fire-hd>yes</kindle-fire-hd>
    <kindle-fire-hd-8-9>yes</kindle-fire-hd-8-9>
  </kindle-support>
  <binary-alias>Version 1</binary-alias>
</amazon>
```

<table>
  <tr>
    <th>Tag</th>
    <th>Required</th>
    <th>Amazon name</th>
    <th>Possible values</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>form-factory</td>
    <td>Yes</td>
    <td>General Information / Form Factor</td>
    <td>phone, tablet, all</td>
    <td></td>
  </tr>
  <tr>
    <td>free-app-of-the-day-eligibility</td>
    <td>No</td>
    <td>Availability & Pricing / Free App of the Day (FAD) eligibility</td>
    <td>yes, no</td>
    <td>If your app is being considered, we will contact you with more detail about the program and what to expect as your app goes through the approval process.</td>
  </tr>
  <tr>
    <td>apply-amazon-drm</td>
    <td>Yes</td>
    <td>Binary File(s) / Apply Amazon DRM?</td>
    <td>yes, no</td>
    <td>Protect your application from unauthorized use. Without DRM, your app can be used without restrictions by any user.</td>
  </tr>
  <tr>
    <td>binary-alias</td>
    <td>Yes</td>
    <td>Binary File(s) / Binary1</td>
    <td>Alphanumeric characters, dots (.), and underscores (_) only.</td>
    <td>This name is used to distinguish between multiple binary files</td>
  </tr>
  <tr>
    <td>kindle-support/kindle-fire-first-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support</td>
    <td>yes, no</td>
    <td>Kindle Fire (1st Generation) support</td>
  </tr>
  <tr>
    <td>kindle-support/kindle-fire</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support</td>
    <td>yes, no</td>
    <td>Kindle Fire support</td>
  </tr>
  <tr>
    <td>kindle-support/kindle-fire-hd</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support</td>
    <td>yes, no</td>
    <td>Kindle Fire HD support</td>
  </tr>
  <tr>
    <td>kindle-support/kindle-fire-hd-8-9</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support</td>
    <td>yes, no</td>
    <td>Kindle Fire HD 8.9 support</td>
  </tr>
</table>

#### store-specific/slideme
Optional.
No attributes.

Example:
```xml
<slideme>
  <license-type>Apache License 2.0</license-type>
</slideme>
```

<table>
  <tr>
    <th>Tag</th>
    <th>Required</th>
    <th>Amazon name</th>
    <th>Possible values</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>license-type</td>
    <td>No</td>
    <td>License / License</td>
    <td>One from the list below</td>
    <td>Default value is "All Rights Reserved"</td>
  </tr>
</table>

Possible `<license-type>` values:
* All Rights Reserved
* Apache License 2.0
* Commercial Royalty-Free
* Common Development and Distribution License (CDDL)
* Eclipse Public License (EPL)
* FREE Licensed Closed Source - Public Domain
* GNU AFFERO GENERAL PUBLIC LICENSE (AGPL) v3
* GNU General Public License (GPL) v2
* GNU General Public License (GPL) v3
* GNU Library General Public License (LGPL)
* GNU Library General Public License (LGPL)  v3
* Mozilla Public License 1.1 (MPL)
* New BSD License
* Other / Proprietary
* The MIT License

Application Store Support
-------------

### Google Play

<table>
<tr>
  <th>Parameter</th>
  <th>Value</th>
</tr>
<tr>
  <td>Registration URL</td>
  <td><a href="https://play.google.com/apps/publish/">https://play.google.com/apps/publish/</a></td>
</tr>
<tr>
  <td>Distribution agreement URL</td>
  <td><a href="http://play.google.com/intl/ALL_en/about/developer-distribution-agreement.html">http://play.google.com/intl/ALL_en/about/developer-distribution-agreement.html</a></td>
</tr>
<tr>
  <td>AppDF ID</td>
  <td>google</td>
</tr>
<tr>
  <td>Registration fee</td>
  <td>$25</td>
</tr>
<tr>
  <td>Content premoderation</td>
  <td>No</td>
</tr>
<tr>
  <td>Client Application</td>
  <td>Yes</td>
</tr>
<tr>
  <td>In-App Purchase Support</td>
  <td>Yes</td>
</tr>
<tr>
  <td>License verification support</td>
  <td>Yes</td>
</tr>
</table>

### Amazon AppStore

<table>
<tr>
  <th>Parameter</th>
  <th>Value</th>
</tr>
<tr>
  <td>Registration URL</td>
  <td><a href="https://developer.amazon.com/welcome.html">https://developer.amazon.com/welcome.html</a></td>
</tr>
<tr>
  <td>Distribution agreement URL</td>
  <td><a href="https://developer.amazon.com/help/da.html">https://developer.amazon.com/help/da.html</a></td>
</tr>
<tr>
  <td>AppDF ID</td>
  <td>amazon</td>
</tr>
<tr>
  <td>Registration fee</td>
  <td>free</td>
</tr>
<tr>
  <td>Content premoderation</td>
  <td>Yes</td>
</tr>
<tr>
  <td>Client Application</td>
  <td>Yes</td>
</tr>
<tr>
  <td>In-App Purchase Support</td>
  <td>Yes</td>
</tr>
<tr>
  <td>License verification support</td>
  <td>?</td>
</tr>
</table>

### Opera Mobile Store

<table>
<tr>
  <th>Parameter</th>
  <th>Value</th>
</tr>
<tr>
  <td>Registration URL</td>
  <td><a href="http://apps.opera.com/developers.php">http://apps.opera.com/developers.php</a></td>
</tr>
<tr>
  <td>Distribution agreement URL</td>
  <td><a href="http://apps.opera.com/docs/DistributionAgreementHandster_standard.pdf">http://apps.opera.com/docs/DistributionAgreementHandster_standard.pdf</a></td>
</tr>
<tr>
  <td>AppDF ID</td>
  <td>opera</td>
</tr>
<tr>
  <td>Registration fee</td>
  <td>free</td>
</tr>
<tr>
  <td>Content premoderation</td>
  <td>Yes</td>
</tr>
<tr>
  <td>Client Applicationo</td>
  <td>No</td>
</tr>
<tr>
  <td>In-App Purchase Support</td>
  <td>No</td>
</tr>
<tr>
  <td>License verification support</td>
  <td>RPN or serial numbers</td>
</tr>
</table>

### Yandex.Store

<table>
<tr>
  <th>Parameter</th>
  <th>Value</th>
</tr>
<tr>
  <td>Registration URL</td>
  <td><a href="https://developer.store.yandex.com/">https://developer.store.yandex.com/</a></td>
</tr>
<tr>
  <td>Distribution agreement URL</td>
  <td><a href="http://legal.yandex.com/store_developer_agreement/">http://legal.yandex.com/store_developer_agreement/</a></td>
</tr>
<tr>
  <td>AppDF ID</td>
  <td>yandex</td>
</tr>
<tr>
  <td>Registration fee</td>
  <td>free</td>
</tr>
<tr>
  <td>Content premoderation</td>
  <td>Yes</td>
</tr>
<tr>
  <td>Client Application</td>
  <td>Yes</td>
</tr>
<tr>
  <td>In-App Purchase Support</td>
  <td>No</td>
</tr>
<tr>
  <td>License verification support</td>
  <td>No</td>
</tr>
</table>

### SlideME

<table>
<tr>
  <th>Parameter</th>
  <th>Value</th>
</tr>
<tr>
  <td>Registration URL</td>
  <td><a href="http://slideme.org/developers">http://slideme.org/developers</a></td>
</tr>
<tr>
  <td>Distribution agreement URL</td>
  <td><a href="http://slideme.org/developers/dda">http://slideme.org/developers/dda</a></td>
</tr>
<tr>
  <td>AppDF ID</td>
  <td>slideme</td>
</tr>
<tr>
  <td>Registration fee</td>
  <td>free</td>
</tr>
<tr>
  <td>Content premoderation</td>
  <td>Yes</td>
</tr>
<tr>
  <td>Client Application</td>
  <td>Yes</td>
</tr>
<tr>
  <td>In-App Purchase Support</td>
  <td>No</td>
</tr>
<tr>
  <td>License verification support</td>
  <td>Yes</td>
</tr>
</table>

### Samsung App

<table>
<tr>
  <th>Parameter</th>
  <th>Value</th>
</tr>
<tr>
  <td>Registration URL</td>
  <td><a href="http://seller.samsungapps.com/">http://seller.samsungapps.com/</a></td>
</tr>
<tr>
  <td>Distribution agreement URL</td>
  <td><a href="http://seller.samsungapps.com/help/termsAndConditions.as">http://seller.samsungapps.com/help/termsAndConditions.as</a></td>
</tr>
<tr>
  <td>AppDF ID</td>
  <td>samsung</td>
</tr>
<tr>
  <td>Registration fee</td>
  <td>free</td>
</tr>
<tr>
  <td>Content premoderation</td>
  <td>Yes</td>
</tr>
<tr>
  <td>Client Application</td>
  <td>Yes</td>
</tr>
<tr>
  <td>In-App Purchase Support</td>
  <td>Yes</td>
</tr>
<tr>
  <td>License verification support</td>
  <td>Samsung DRM</td>
</tr>
</table>

### SK T-Store

<table>
<tr>
  <th>Parameter</th>
  <th>Value</th>
</tr>
<tr>
  <td>Registration URL</td>
  <td><a href="http://dev.tstore.co.kr/devpoc/main/main.omp">http://dev.tstore.co.kr/devpoc/main/main.omp</a></td>
</tr>
<tr>
  <td>Distribution agreement URL</td>
  <td>Public link cannot be found</a></td>
</tr>
<tr>
  <td>AppDF ID</td>
  <td>tstore</td>
</tr>
<tr>
  <td>Registration fee</td>
  <td>free</td>
</tr>
<tr>
  <td>Content premoderation</td>
  <td>Yes</td>
</tr>
<tr>
  <td>Client Application</td>
  <td>Yes</td>
</tr>
<tr>
  <td>In-App Purchase Support</td>
  <td>Yes</td>
</tr>
<tr>
  <td>License verification support</td>
  <td>[To be supplied.]</td>
</tr>
</table>


Category List
-------------
AppDF provides universal category list that could be matched to any appstore category list. When we chose categories for the AppDF we tried to create the most detailed list to archive unambiguous mapping for any appstore.

The AppDF category list is available as [JSON](http://www.onepf.org/appdf/data/categories.json) or [XML](data/categories.xml). You can also download a proposal mapping of the AppDF category list to some application stores as [JSON](http://www.onepf.org/appdf/data/store_categories.json) or [XML](data/store_categories.xml).

### Application Categories

<table>
<tr>
  <th>Category</th>
  <th>Google Play</th>
  <th>Amazon AppStore</th>
  <th>Opera Store</th>
  <th>Yandex.Store</th>
  <th>Samsung Apps</th>
  <th>SlideMe</th>
</tr>
<tr>
<td>Comics</td>
  <td>Comics</td>
  <td>Books &amp; Comic / Comic Strips</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Education/E-Book</td>
  <td>Publications / Comics</td>
</tr>
<tr>
<td>Books</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Other</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Education/E-Book</td>
  <td>Publications / E-books</td>
</tr>
<tr>
<td>Publications</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Other</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Education/E-Book</td>
  <td>Publications</td>
</tr>
<tr>
<td>Books &amp; Readers</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Books &amp; Readers</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Education/E-Book</td>
  <td>Publications / E-book readers</td>
</tr>
<tr>
<td>Children’s Books</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Children’s Books</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Education/E-Book</td>
  <td>Publications</td>
</tr>
<tr>
<td>Graphic Novels</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Graphic Novels</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Education/E-Book</td>
  <td>Publications</td>
</tr>
<tr>
<td>Reference</td>
  <td>Books &amp; Reference</td>
  <td>Reference</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Education/E-Book</td>
  <td>Publications</td>
</tr>
<tr>
<td>City Info</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Other</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>Country Guides</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Other</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / Country Guides</td>
</tr>
<tr>
<td>City Info / Boston</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Boston</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Chicago</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Chicago</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Dallas</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Dallas</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Los Angeles</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Los Angeles</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Miami</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Miami</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / New York</td>
  <td>Books &amp; Reference</td>
  <td>City Info / New York</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Philadelphia</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Philadelphia</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Phoenix</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Phoenix</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / San Francisco</td>
  <td>Books &amp; Reference</td>
  <td>City Info / San Francisco</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Seattle</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Seattle</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Reference</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>Weather</td>
  <td>Weather</td>
  <td>News &amp; Weather / Weather</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Weather</td>
  <td>News &amp; Weather / Weather</td>
</tr>
<tr>
<td>Travel / Transportation</td>
  <td>Transportation</td>
  <td>Travel / Transportation</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Travel</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Other</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel</td>
  <td>Travel &amp; Locality</td>
</tr>
<tr>
<td>Travel / Auto Rental</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Auto Rental</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Travel / Flight</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Flight</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Travel / Hotel</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Hotel</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Travel / Trip Planner</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Trip Planner</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Navigation</td>
  <td>Travel &amp; Local</td>
  <td>Navigation</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Navigation</td>
  <td>Travel &amp; Locality / Navigation</td>
</tr>
<tr>
<td>Religion</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Religion</td>
</tr>
<tr>
<td>Religion / Buddhism</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Religion / Buddhism</td>
</tr>
<tr>
<td>Religion / Chinese folk</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Religion / Chinese folk</td>
</tr>
<tr>
<td>Religion / Christianity</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Religion / Christianity</td>
</tr>
<tr>
<td>Religion / Hinduism</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Religion / Hinduism</td>
</tr>
<tr>
<td>Religion / Islam</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Religion / Islam</td>
</tr>
<tr>
<td>Religion / Other</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Religion / Other</td>
</tr>
<tr>
<td>Lifestyle</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle</td>
</tr>
<tr>
<td>Home &amp; Hobby</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Home &amp; Hobby</td>
</tr>
<tr>
<td>Home &amp; Hobby / Other</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Home &amp; Hobby / Other</td>
</tr>
<tr>
<td>Lifestyle / Advice</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Advice</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Astrology</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Astrology</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Celebrity</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrities</td>
</tr>
<tr>
<td>Lifestyle / Culture</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Culture</td>
</tr>
<tr>
<td>Lifestyle / Design</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Design</td>
</tr>
<tr>
<td>Lifestyle / Fashion</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Fashion</td>
</tr>
<tr>
<td>Lifestyle / Living</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Living</td>
</tr>
<tr>
<td>Lifestyle / Hair &amp; Beauty</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Hair &amp; Beauty</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Home &amp; Garden</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Home &amp; Garden</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Parenting</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Parenting</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Quizzes &amp; Games</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Quizzes &amp; Games</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Relationships</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Relationships</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Self Improvement</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Self Improvement</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Magazines</td>
  <td>News &amp; Magazines</td>
  <td>Magazines</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>Publications / Magazines</td>
</tr>
<tr>
<td>Newspapers</td>
  <td>News &amp; Magazines</td>
  <td>Newspapers</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>Publications</td>
</tr>
<tr>
<td>News</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Regional News</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / Regional News</td>
</tr>
<tr>
<td>News / Other</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / Other</td>
</tr>
<tr>
<td>News &amp; Weather</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather</td>
</tr>
<tr>
<td>News / Business</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Business</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Entertainment</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Health</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Health</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Politics</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Politics</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Science &amp; Tech</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Science &amp; Tech</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Sports</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Sports</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / US</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / US</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / World</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / World</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News/Magazine</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>Shopping</td>
  <td>Shopping</td>
  <td>Shopping</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Home &amp; Hobby / Shopping</td>
</tr>
<tr>
<td>Sports</td>
  <td>Sports</td>
  <td>Sports / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports</td>
</tr>
<tr>
<td>Sports / Athletic</td>
  <td>Sports</td>
  <td>Sports / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Athletic</td>
</tr>
<tr>
<td>Sports / Disabled</td>
  <td>Sports</td>
  <td>Sports / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Disabled</td>
</tr>
<tr>
<td>Sports / Extreme</td>
  <td>Sports</td>
  <td>Sports / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Extreme</td>
</tr>
<tr>
<td>Sports / Motor</td>
  <td>Sports</td>
  <td>Sports / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Motor</td>
</tr>
<tr>
<td>Sports / Baseball</td>
  <td>Sports</td>
  <td>Sports / Baseball</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Basketball</td>
  <td>Sports</td>
  <td>Sports / Basketball</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Boxing</td>
  <td>Sports</td>
  <td>Sports / Boxing</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Football</td>
  <td>Sports</td>
  <td>Sports / Football</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Golf</td>
  <td>Sports</td>
  <td>Sports / Golf</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Hockey</td>
  <td>Sports</td>
  <td>Sports / Hockey</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / NCAA
</td>
  <td>Sports</td>
  <td>Sports / NCAA
</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Soccer</td>
  <td>Sports</td>
  <td>Sports / Soccer</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Tennis</td>
  <td>Sports</td>
  <td>Sports / Tennis</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / UFC
</td>
  <td>Sports</td>
  <td>Sports / UFC
</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Novelty</td>
  <td>Entertainment</td>
  <td>Novelty</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
</tr>
<tr>
<td>Podcasts</td>
  <td>Entertainment</td>
  <td>Podcasts</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
</tr>
<tr>
<td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
</tr>
<tr>
<td>Entertainment / Comedy</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment / Comedy</td>
</tr>
<tr>
<td>Entertainment / Music</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment / Music</td>
</tr>
<tr>
<td>Entertainment / Sports</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment / Sports</td>
</tr>
<tr>
<td>Entertainment / Theatre</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment / Theatre</td>
</tr>
<tr>
<td>Entertainment / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment / Other</td>
</tr>
<tr>
<td>Video</td>
  <td>Media &amp; Video</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Music/Video</td>
  <td>Entertainment / Film</td>
</tr>
<tr>
<td>Kids</td>
  <td>Education</td>
  <td>Kids / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / All</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Alphabet</td>
  <td>Education</td>
  <td>Kids / Alphabet</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / Edutainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Animals</td>
  <td>Education</td>
  <td>Kids / Animals</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / Edutainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / History</td>
  <td>Education</td>
  <td>Kids / History</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / Edutainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Language</td>
  <td>Education</td>
  <td>Kids / Language</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / Edutainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Math</td>
  <td>Education</td>
  <td>Kids / Math</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / Edutainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Popular Characters</td>
  <td>Education</td>
  <td>Kids / Popular Characters</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / Edutainmenttd>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Reading</td>
  <td>Education</td>
  <td>Kids / Reading</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / Edutainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Science</td>
  <td>Education</td>
  <td>Kids / Science</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / Edutainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Writing</td>
  <td>Education</td>
  <td>Kids / Writing</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Kids / Edutainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Education</td>
  <td>Education</td>
  <td>Education / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education</td>
</tr>
<tr>
<td>Education / Higher</td>
  <td>Education</td>
  <td>Education / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education / Higher</td>
</tr>
<tr>
<td>Education / Primary</td>
  <td>Education</td>
  <td>Education / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education / Primary</td>
</tr>
<tr>
<td>Education / Secondary</td>
  <td>Education</td>
  <td>Education / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education / Secondary</td>
</tr>
<tr>
<td>Education / History</td>
  <td>Education</td>
  <td>Education / History</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Math</td>
  <td>Education</td>
  <td>Education / Math</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Reading</td>
  <td>Education</td>
  <td>Education / Reading</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Science</td>
  <td>Education</td>
  <td>Education / Science</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Test Guides</td>
  <td>Education</td>
  <td>Education / Test Guides</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Writing</td>
  <td>Education</td>
  <td>Education / Writing</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education/E-Book</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Language</td>
  <td>Education</td>
  <td>Education / Language</td>
  <td>Languages &amp; Translators</td>
  <td>Languages &amp; Translators</td>
  <td>Education/E-Book</td>
  <td>Languages</td>
</tr>
<tr>
<td>Education / Dictionaries</td>
  <td>Education</td>
  <td>Education / Language</td>
  <td>Languages &amp; Translators</td>
  <td>Languages &amp; Translators</td>
  <td>Education/E-Book</td>
  <td>Languages / Dictionaries</td>
</tr>
<tr>
<td>Education / Language learning</td>
  <td>Education</td>
  <td>Education / Language</td>
  <td>Languages &amp; Translators</td>
  <td>Languages &amp; Translators</td>
  <td>Education/E-Book</td>
  <td>Languages / Language learning</td>
</tr>
<tr>
<td>Web Browsers</td>
  <td>Communication</td>
  <td>Web Browsers</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Social Networking</td>
  <td>Tools &amp; Utilities / Browsers</td>
</tr>
<tr>
<td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Social Networking</td>
  <td>Communication</td>
</tr>
<tr>
<td>Communication / E-mail</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Social Networking</td>
  <td>Communication / E-mail</td>
</tr>
<tr>
<td>Communication / Instant Messaging</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Social Networking</td>
  <td>Communication / Instant Messaging</td>
</tr>
<tr>
<td>Communication / SMS
</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Social Networking</td>
  <td>Communication / SMS
</td>
</tr>
<tr>
<td>Communication / Other</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Social Networking</td>
  <td>Communication / Other</td>
</tr>
<tr>
<td>Social</td>
  <td>Social</td>
  <td>Social Networking</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Social Networking</td>
  <td>Communication / Social Networking</td>
</tr>
<tr>
<td>Real Estate</td>
  <td>Business</td>
  <td>Real Estate</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Business</td>
  <td>Finance / Other</td>
</tr>
<tr>
<td>Business</td>
  <td>Business</td>
  <td>Finance / Other</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; FinanceBusiness</td>
  <td>Business</td>
  <td>Finance / Other</td>
</tr>
<tr>
<td>Finance</td>
  <td>Finance</td>
  <td>Finance / Other</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Finance / Corporate</td>
  <td>Finance</td>
  <td>Finance / Other</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
  <td>Finance / Corporate</td>
</tr>
<tr>
<td>Finance / Other</td>
  <td>Finance</td>
  <td>Finance / Other</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
  <td>Finance / Other</td>
</tr>
<tr>
<td>Finance / Accounting</td>
  <td>Finance</td>
  <td>Finance / Accounting</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Finance / Banking</td>
  <td>Finance</td>
  <td>Finance / Banking</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Finance / Investing</td>
  <td>Finance</td>
  <td>Finance / Investing</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Finance / Money &amp; Currency</td>
  <td>Finance</td>
  <td>Finance / Money &amp; Currency</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Personal Finance</td>
  <td>Finance</td>
  <td>Finance / Personal Finance</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
  <td>Finance / Personal</td>
</tr>
<tr>
<td>Home &amp; Hobby / Budgeting</td>
  <td>Finance</td>
  <td>Finance / Personal Finance</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
  <td>Home &amp; Hobby / Budgeting</td>
</tr>
<tr>
<td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Other</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health/Fitness</td>
  <td>Health &amp; Fitness</td>
</tr>
<tr>
<td>Diet &amp; Weight Loss</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Diet &amp; Weight Loss</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health/Fitness</td>
  <td>Health &amp; Fitness / Calorie calculators</td>
</tr>
<tr>
<td>Health / Exercise</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Exercise &amp; Fitness</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health/Fitness</td>
  <td>Health &amp; Fitness / Fitness</td>
</tr>
<tr>
<td>Health / Medical</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Medical</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health/Fitness</td>
  <td>Health &amp; Fitness / Other</td>
</tr>
<tr>
<td>Health / Meditation</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Meditation</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health/Fitness</td>
  <td>Health &amp; Fitness / Other</td>
</tr>
<tr>
<td>Health / Pregnancy</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Pregnancy</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health/Fitness</td>
  <td>Health &amp; Fitness / Family Planning</td>
</tr>
<tr>
<td>Health / Sleep Trackers</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Sleep Trackers</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health/Fitness</td>
  <td>Health &amp; Fitness / Other</td>
</tr>
<tr>
<td>Cooking</td>
  <td>Health &amp; Fitness</td>
  <td>Cooking</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health/Fitness</td>
  <td>Home &amp; Hobby / Cooking</td>
</tr>
<tr>
<td>Utilities</td>
  <td>Libraries &amp; Demo</td>
  <td>Utilities / Other</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Tools &amp; Utilities</td>
</tr>
<tr>
<td>Utilities / Developer</td>
  <td>Libraries &amp; Demo</td>
  <td>Utilities / Other</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Tools &amp; Utilities / Developer – Programmer</td>
</tr>
<tr>
<td>Utilities / Other</td>
  <td>Libraries &amp; Demo</td>
  <td>Utilities / Other</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Tools &amp; Utilities / Other</td>
</tr>
<tr>
<td>Utilities / Security</td>
  <td>Libraries &amp; Demo</td>
  <td>Utilities / Other</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Tools &amp; Utilities / Security</td>
</tr>
<tr>
<td>Alarms &amp; Clocks</td>
  <td>Tools</td>
  <td>Utilities / Alarms &amp; Clocks</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Tools &amp; Utilities / Other</td>
</tr>
<tr>
<td>Battery Savers</td>
  <td>Tools</td>
  <td>Utilities / Battery Savers</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Tools &amp; Utilities / Other</td>
</tr>
<tr>
<td>Calculators</td>
  <td>Tools</td>
  <td>Utilities / Calculators</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Utilities</td>
  <td>Tools &amp; Utilities / Other</td>
</tr>
<tr>
<td>Calendars</td>
  <td>Tools</td>
  <td>Utilities / Calendars</td>
  <td>Organizers</td>
  <td>Organizers</td>
  <td>Utilities</td>
  <td>Tools &amp; Utilities / Other</td>
</tr>
<tr>
<td>Notes</td>
  <td>Tools</td>
  <td>Utilities / Notes</td>
  <td>Organizers</td>
  <td>Organizers</td>
  <td>Utilities</td>
  <td>Tools &amp; Utilities / Other</td>
</tr>
<tr>
<td>Productivity</td>
  <td>Productivity</td>
  <td>Productivity</td>
  <td>Organizers</td>
  <td>Organizers</td>
  <td>Productivity</td>
  <td>Productivity</td>
</tr>
<tr>
<td>Music</td>
  <td>Music &amp; Audio</td>
  <td>Music / Other</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music/Video</td>
  <td>Music</td>
</tr>
<tr>
<td>Music / Artists</td>
  <td>Music &amp; Audio</td>
  <td>Music / Artists</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music/Video</td>
  <td>Music / Other</td>
</tr>
<tr>
<td>Music / Instruments</td>
  <td>Music &amp; Audio</td>
  <td>Music / Instruments</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music/Video</td>
  <td>Music / Instruments</td>
</tr>
<tr>
<td>Music Players</td>
  <td>Music &amp; Audio</td>
  <td>Music / Music Players</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music/Video</td>
  <td>Music / Music players</td>
</tr>
<tr>
<td>Radio</td>
  <td>Music &amp; Audio</td>
  <td>Music / Radio</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music/Video</td>
  <td>Music / Radio</td>
</tr>
<tr>
<td>Music / Songbooks</td>
  <td>Music &amp; Audio</td>
  <td>Music / Songbooks</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music/Video</td>
  <td>Music / Other</td>
</tr>
<tr>
<td>Photography</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photo</td>
  <td>Photography</td>
</tr>
<tr>
<td>Photography / Camera</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photo</td>
  <td>Photography / Camera</td>
</tr>
<tr>
<td>Photography / Editing</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photo</td>
  <td>Photography / Editing</td>
</tr>
<tr>
<td>Photography / Gallery</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photo</td>
  <td>Photography / Gallery</td>
</tr>
<tr>
<td>Photography / Sharing</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photo</td>
  <td>Photography / Sharing</td>
</tr>
<tr>
<td>Personalization</td>
  <td>Personalization</td>
  <td>Themes</td>
  <td>Themes &amp; Skins</td>
  <td>Themes &amp; Skins</td>
  <td>Theme</td>
  <td>Themes</td>
</tr>
<tr>
<td>Live Wallpapers</td>
  <td>Personalization</td>
  <td>Themes</td>
  <td>Themes &amp; Skins</td>
  <td>Themes &amp; Skins</td>
  <td>Theme</td>
  <td>Themes / Live Wallpapers</td>
</tr>
<tr>
<td>Wallpapers</td>
  <td>Personalization</td>
  <td>Themes</td>
  <td>Themes &amp; Skins</td>
  <td>Themes &amp; Skins</td>
  <td>Theme</td>
  <td>Themes / Wallpapers</td>
</tr>
<tr>
<td>Ringtones</td>
  <td>Personalization</td>
  <td>Ringtones / Other</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Christian</td>
  <td>Personalization</td>
  <td>Ringtones / Christian</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Classical</td>
  <td>Personalization</td>
  <td>Ringtones / Classical</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Collegiate</td>
  <td>Personalization</td>
  <td>Ringtones / Collegiate</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Comedy</td>
  <td>Personalization</td>
  <td>Ringtones / Comedy</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Country</td>
  <td>Personalization</td>
  <td>Ringtones / Country</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Dance &amp; Electronic</td>
  <td>Personalization</td>
  <td>Ringtones / Dance &amp; Electronic</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Jazz &amp; Standards</td>
  <td>Personalization</td>
  <td>Ringtones / Jazz &amp; Standards</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Latin</td>
  <td>Personalization</td>
  <td>Ringtones / Latin</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Pop</td>
  <td>Personalization</td>
  <td>Ringtones / Pop</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Rap</td>
  <td>Personalization</td>
  <td>Ringtones / Rap</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Rock</td>
  <td>Personalization</td>
  <td>Ringtones / Rock</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Sound Effects</td>
  <td>Personalization</td>
  <td>Ringtones / Sound Effects</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Soundtracks</td>
  <td>Personalization</td>
  <td>Ringtones / Soundtracks</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Sports</td>
  <td>Personalization</td>
  <td>Ringtones / Sports</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / TV</td>
  <td>Personalization</td>
  <td>Ringtones / TV</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Voicetones</td>
  <td>Personalization</td>
  <td>Ringtones / Voicetones</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Music/Video</td>
  <td>Themes / Ringtones</td>
</tr>
</table>

### Game Categories
<table>
<tr>
  <th>Category</th>
  <th>Google Play</th>
  <th>Amazon AppStore</th>
  <th>Opera Store</th>
  <th>Yandex.Store</th>
  <th>Samsung Apps</th>
  <th>SlideMe</th>
</tr>
<tr>
<td>Games / Puzzles</td>
  <td>Brain &amp; Puzzle</td>
  <td>Games / Puzzles &amp; Trivia</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Puzzle</td>
  <td>Fun &amp; Games / Puzzle</td>
</tr>
<tr>
<td>Games / Trivia</td>
  <td>Brain &amp; Puzzle</td>
  <td>Games / Puzzles &amp; Trivia</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Word/Trivia</td>
  <td>Fun &amp; Games / Other</td>
</tr>
<tr>
<td>Games / Other</td>
  <td>Casual</td>
  <td>Games / Other</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Others</td>
  <td>Fun &amp; Games / Other</td>
</tr>
<tr>
<td>Games / Drawing</td>
  <td>Casual</td>
  <td>Games / Other</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Others</td>
  <td>Fun &amp; Games / Drawing</td>
</tr>
<tr>
<td>Games / Casual</td>
  <td>Casual</td>
  <td>Games / Casual</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Others</td>
  <td>Fun &amp; Games / Casual</td>
</tr>
<tr>
<td>Games / Educational</td>
  <td>Casual</td>
  <td>Games / Educational</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Others</td>
  <td>Fun &amp; Games / Educational</td>
</tr>
<tr>
<td>Games / Kids</td>
  <td>Casual</td>
  <td>Games / Kids</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Others</td>
  <td>Fun &amp; Games / Other</td>
</tr>
<tr>
<td>Games / Multiplayer</td>
  <td>Casual</td>
  <td>Games / Multiplayer</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Others</td>
  <td>Fun &amp; Games / Multiplayer</td>
</tr>
<tr>
<td>Games / Music</td>
  <td>Casual</td>
  <td>Games / Music</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Music</td>
  <td>Fun &amp; Games / Music</td>
</tr>
<tr>
<td>Games / Arcade</td>
  <td>Arcade &amp; Action</td>
  <td>Games / Board</td>
  <td>Games</td>
  <td>Arcade</td>
  <td>Game / Arcade</td>
  <td>Fun &amp; Games / Arcade</td>
</tr>
<tr>
<td>Games / Board</td>
  <td>Arcade &amp; Action</td>
  <td>Games / Arcade</td>
  <td>Games / Arcade</td>
  <td>Arcade</td>
  <td>Game / Board</td>
  <td>Fun &amp; Games / Board</td>
</tr>
<tr>
<td>Games / Action</td>
  <td>Arcade &amp; Action</td>
  <td>Games / Action</td>
  <td>Games / Action</td>
  <td>Action</td>
  <td>Game / Action</td>
  <td>Fun &amp; Games / Action</td>
</tr>
<tr>
<td>Games / Adventure</td>
  <td>Arcade &amp; Action</td>
  <td>Games / Adventure</td>
  <td>Games / Action</td>
  <td>Action</td>
  <td>Game / Adventure</td>
  <td>Fun &amp; Games / Adventure</td>
</tr>
<tr>
<td>Games / Role Playing</td>
  <td>Arcade &amp; Action</td>
  <td>Games / Role Playing</td>
  <td>Games / Strategy</td>
  <td>Strategy</td>
  <td>Game / Role Playing</td>
  <td>Fun &amp; Games / Role Playing</td>
</tr>
<tr>
<td>Games / Strategy</td>
  <td>Arcade &amp; Action</td>
  <td>Games / Strategy</td>
  <td>Games / Strategy</td>
  <td>Strategy</td>
  <td>Game / Strategy</td>
  <td>Fun &amp; Games / Strategy</td>
</tr>
<tr>
<td>Games / Cards</td>
  <td>Cards &amp; Casino</td>
  <td>Games / Cards</td>
  <td>Games / Cards</td>
  <td>Cards</td>
  <td>Game / Card/Casino</td>
  <td>Fun &amp; Games / Cards &amp; Casino</td>
</tr>
<tr>
<td>Games / Casino</td>
  <td>Cards &amp; Casino</td>
  <td>Games / Casino</td>
  <td>Games / Cards</td>
  <td>Cards</td>
  <td>Game / Card/Casino</td>
  <td>Fun &amp; Games / Cards &amp; Casino</td>
</tr>
<tr>
<td>Games / Racing</td>
  <td>Racing</td>
  <td>Games / Racing</td>
  <td>Games / Sports</td>
  <td>Sports</td>
  <td>Game / Sports</td>
  <td>Fun &amp; Games / Racing</td>
</tr>
<tr>
<td>Games / Sports</td>
  <td>Sports Games</td>
  <td>Games / Sports</td>
  <td>Games / Sports</td>
  <td>Sports</td>
  <td>Game / Sports</td>
  <td>Fun &amp; Games / Sports</td>
</tr>
</table>

Localization Support
-------------
AppDF supports localization to all the languages. Nevertheless not all languages supported by all the stores. 

Reference language list in [JSON](http://www.onepf.org/appdf/data/languages.json) and [XML](data/languages.xml) formats.

The following tables contain information about current language support status (updated January 14, 2013).

<table>
  <tr>
    <th>Application Store</th>
    <th>Supports Localization?</th>
    <th>Default Language</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>English US default (cannot be changed)</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>English is default (can be changed)</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>English US default (cannot be changed)</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>English is default (cannot be changed)</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>No default language (could be any combination)</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td>No localization</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td>No localization</td>
  </tr>
  <tr>
    <td>Samsung Apps</td>
    <td>Yes</td>
    <td>English is default and cannot be changed</td>
  </tr>
</table>

<table><tr>
  <th>AppDF Code</th>
  <th>AppDF Name</th>
  <th>Google Play</th>
  <th>Amazon AppStore</th>
  <th>Opera Mobile Store</th>
  <th>Samsung Apps</th>
  <th>Yandex.Store</th>
</tr>
<tr>
  <td>af</td>
  <td>Afrikaans</td>
  <td>Afrikaans</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>am</td>
  <td>Amharic</td>
  <td>Amharic</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>ar</td>
  <td>Arabic</td>
  <td>Arabic</td>
  <td></td>
  <td>ARABIC</td>
  <td>Arabic</td>
  <td>Arabic</td>
</tr>
<tr>
  <td>be</td>
  <td>Belarusian</td>
  <td>Belarusian</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>bn</td>
  <td>Bengali</td>
  <td></td>
  <td></td>
  <td>BENGALI</td>
  <td></td>
  <td>Bengali</td>
</tr>
<tr>
  <td>bg</td>
  <td>Bulgarian</td>
  <td>Bulgarian</td>
  <td></td>
  <td></td>
  <td>Bulgarian</td>
  <td></td>
</tr>
<tr>
  <td>ca</td>
  <td>Catalan</td>
  <td>Catalan</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>zh</td>
  <td>Chinese</td>
  <td></td>
  <td></td>
  <td>CHINESE</td>
  <td></td>
  <td>Chinese</td>
</tr>
<tr>
  <td>zh_cn</td>
  <td>Chinese (PRC)</td>
  <td>Chinese (Simplified)</td>
  <td>Chinese (Simplified)</td>
  <td></td>
  <td>Simplified Chinese</td>
  <td></td>
</tr>
<tr>
  <td>zh_tw</td>
  <td>Chinese (Taiwan)</td>
  <td>Chinese (Traditional)</td>
  <td></td>
  <td></td>
  <td>Traditional Chinese</td>
  <td></td>
</tr>
<tr>
  <td>hr</td>
  <td>Croatian</td>
  <td>Croatian</td>
  <td></td>
  <td></td>
  <td>Croatian</td>
  <td></td>
</tr>
<tr>
  <td>cs</td>
  <td>Czech</td>
  <td>Czech</td>
  <td></td>
  <td>CZECH</td>
  <td>Czech</td>
  <td>Czech</td>
</tr>
<tr>
  <td>da</td>
  <td>Danish</td>
  <td>Danish</td>
  <td></td>
  <td>DANISH</td>
  <td>Danish</td>
  <td>Danish</td>
</tr>
<tr>
  <td>nl</td>
  <td>Dutch</td>
  <td>Dutch</td>
  <td></td>
  <td>DUTCH</td>
  <td>Dutch</td>
  <td>Dutch</td>
</tr>
<tr>
  <td>en</td>
  <td>English</td>
  <td></td>
  <td></td>
  <td>ENGLISH</td>
  <td></td>
  <td>English</td>
</tr>
<tr>
  <td>en_us</td>
  <td>English (US)</td>
  <td>English (United States)</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>en_gb</td>
  <td>English (Britain)</td>
  <td>English (United Kingdom)</td>
  <td>English (U.K.)</td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>et</td>
  <td>Estonian</td>
  <td>Estonian</td>
  <td></td>
  <td></td>
  <td>Estonian</td>
  <td></td>
</tr>
<tr>
  <td>fo</td>
  <td>Faroese</td>
  <td></td>
  <td></td>
  <td>FARSI</td>
  <td></td>
  <td>Farsi</td>
</tr>
<tr>
  <td>fi</td>
  <td>Finnish</td>
  <td>Finnish</td>
  <td></td>
  <td></td>
  <td>Finnish</td>
  <td></td>
</tr>
<tr>
  <td>fr</td>
  <td>French</td>
  <td>French</td>
  <td>French</td>
  <td>FRENCH</td>
  <td>French</td>
  <td>French</td>
</tr>
<tr>
  <td>de</td>
  <td>German</td>
  <td>German</td>
  <td>German</td>
  <td>GERMAN</td>
  <td>German</td>
  <td>German</td>
</tr>
<tr>
  <td>el</td>
  <td>Greek</td>
  <td>Greek</td>
  <td></td>
  <td>GREEK</td>
  <td>Greek</td>
  <td>Greek</td>
</tr>
<tr>
  <td>he</td>
  <td>Hebrew</td>
  <td>Hebrew</td>
  <td></td>
  <td></td>
  <td>Hebrew</td>
  <td></td>
</tr>
<tr>
  <td>hi</td>
  <td>Hindi</td>
  <td>Hindi</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>hu</td>
  <td>Hungarian</td>
  <td>Hungarian</td>
  <td></td>
  <td>HUNGARIAN</td>
  <td>Hungarian</td>
  <td>Hungarian</td>
</tr>
<tr>
  <td>id</td>
  <td>Indonesian</td>
  <td></td>
  <td></td>
  <td>INDONESIA</td>
  <td>Indonesian</td>
  <td>Indonesia</td>
</tr>
<tr>
  <td>it</td>
  <td>Italian</td>
  <td>Italian</td>
  <td>Italian</td>
  <td>ITALIAN</td>
  <td>Italian</td>
  <td>Italian</td>
</tr>
<tr>
  <td>ja</td>
  <td>Japanese</td>
  <td>Japanese</td>
  <td>Japanese</td>
  <td>JAPANESE</td>
  <td>Japanese</td>
  <td>Japanese</td>
</tr>
<tr>
  <td>kk</td>
  <td>Kazakh</td>
  <td></td>
  <td></td>
  <td></td>
  <td>Kazakh</td>
  <td></td>
</tr>
<tr>
  <td>ko</td>
  <td>Korean</td>
  <td>Korean (South Korea)</td>
  <td></td>
  <td>KOREAN</td>
  <td>Korean</td>
  <td>Korean</td>
</tr>
<tr>
  <td>lt</td>
  <td>Lithuanian</td>
  <td>Lithuanian</td>
  <td></td>
  <td></td>
  <td>Lithuanian</td>
  <td></td>
</tr>
<tr>
  <td>lv</td>
  <td>Latvian</td>
  <td>Latvian</td>
  <td></td>
  <td></td>
  <td>Latvian</td>
  <td></td>
</tr>
<tr>
  <td>ms</td>
  <td>Malay</td>
  <td>Malay</td>
  <td></td>
  <td>MALAY</td>
  <td></td>
  <td>Malay</td>
</tr>
<tr>
  <td>ne</td>
  <td>Nepali</td>
  <td></td>
  <td></td>
  <td>NEPALESE</td>
  <td></td>
  <td>Nepalese</td>
</tr>
<tr>
  <td>no</td>
  <td>Norwegian</td>
  <td>Norwegian</td>
  <td></td>
  <td>NORWAY</td>
  <td>Norwegian</td>
  <td>Norway</td>
</tr>
<tr>
  <td>fa</td>
  <td>Persian</td>
  <td>Persian</td>
  <td></td>
  <td></td>
  <td>Persian</td>
  <td></td>
</tr>
<tr>
  <td>pl</td>
  <td>Polish</td>
  <td>Polish</td>
  <td></td>
  <td>POLISH</td>
  <td>Polish</td>
  <td>Polish</td>
</tr>
<tr>
  <td>pt</td>
  <td>Portuguese</td>
  <td></td>
  <td></td>
  <td>PORTUGUESE</td>
  <td>Portuguese</td>
  <td>Portuguese</td>
</tr>
<tr>
  <td>pt_br</td>
  <td>Portuguese (Brazil)</td>
  <td>Portuguese (Brazil)</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>pt_pt</td>
  <td>Portuguese (Portugal)</td>
  <td>Portuguese (Portugal)</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>rm</td>
  <td>Romansh</td>
  <td>Romansh</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>ro</td>
  <td>Romanian</td>
  <td>Romanian</td>
  <td></td>
  <td>ROMANIAN</td>
  <td>Romanian</td>
  <td>Romanian</td>
</tr>
<tr>
  <td>ru</td>
  <td>Russian</td>
  <td>Russian</td>
  <td></td>
  <td>RUSSIAN</td>
  <td>Russian</td>
  <td>Russian</td>
</tr>
<tr>
  <td>sr</td>
  <td>Serbian</td>
  <td>Serbian</td>
  <td></td>
  <td></td>
  <td>Serbian</td>
  <td></td>
</tr>
<tr>
  <td>gd</td>
  <td>Gaelic</td>
  <td></td>
  <td></td>
  <td></td>
  <td>Gaelic</td>
  <td></td>
</tr>
<tr>
  <td>sk</td>
  <td>Slovak</td>
  <td>Slovak</td>
  <td></td>
  <td>SLOVAK</td>
  <td>Slovak</td>
  <td>Slovak</td>
</tr>
<tr>
  <td>sl</td>
  <td>Slovene</td>
  <td>Slovenian</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>es</td>
  <td>Spanish</td>
  <td></td>
  <td>Spanish</td>
  <td>SPANISH</td>
  <td>Spanish</td>
  <td>Spanish</td>
</tr>
<tr>
  <td>es_es</td>
  <td>Spanish (Spain)</td>
  <td>Spanish (Spain)</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>es_us</td>
  <td>Spanish (US)</td>
  <td>Spanish (United States)</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>es_la</td>
  <td>Spanish (Latin America)</td>
  <td>Spanish (Latin America)</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>sw</td>
  <td>Swahili</td>
  <td>Swahili</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
<tr>
  <td>sv</td>
  <td>Swedish</td>
  <td>Swedish</td>
  <td></td>
  <td>SWEDISH</td>
  <td>Swedish</td>
  <td>Swedish</td>
</tr>
<tr>
  <td>th</td>
  <td>Thai</td>
  <td>Thai</td>
  <td></td>
  <td>THAI</td>
  <td>Thai</td>
  <td>Thai</td>
</tr>
<tr>
  <td>tl</td>
  <td>Tagalog</td>
  <td>Filipino</td>
  <td></td>
  <td>TAGALOG</td>
  <td></td>
  <td>Tagalog</td>
</tr>
<tr>
  <td>tr</td>
  <td>Turkish</td>
  <td>Turkish</td>
  <td></td>
  <td>TURKISH</td>
  <td>Turkish</td>
  <td>Turkish</td>
</tr>
<tr>
  <td>uk</td>
  <td>Ukrainian</td>
  <td>Ukrainian</td>
  <td></td>
  <td></td>
  <td>Ukrainian</td>
  <td></td>
</tr>
<tr>
  <td>vi</td>
  <td>Vietnamese</td>
  <td>Vietnamese</td>
  <td></td>
  <td>VIETNAMESE</td>
  <td>Vietnamese</td>
  <td>Vietnamese</td>
</tr>
<tr>
  <td>zu</td>
  <td>Zulu</td>
  <td>Zulu</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
</tr>
</table>

The following languages are currently not support by any of the stores:
* Abkhaz
* Afar
* Akan
* Albanian
* Arabic (Egypt)
* Arabic (Israel)
* Aragonese
* Armenian
* Assamese
* Avaric
* Avestan
* Aymara
* Azerbaijani
* Bambara
* Bashkir
* Basque
* Bihari
* Bislama
* Bosnian
* Breton
* Burmese
* Chamorro
* Chechen
* Chichewa
* Chuvash
* Cornish
* Corsican
* Cree
* Divehi
* Dutch (Belgium)
* Dutch (Netherlands)
* Dzongkha
* English (Australia)
* English (Canada)
* English (New Zealand)
* English (Singapore)
* English (Canada)
* Esperanto
* Ewe
* Fijian
* French (Belgium)
* French (Canada)
* French (France)
* French (Switzerland)
* Fula
* Galician
* Georgian
* German (Austria)
* German (Germany)
* German (Liechtenstein)
* German (Switzerland)
* GuaranГ­
* Gujarati
* Haitian
* Hausa
* Herero
* Hiri Motu
* Interlingua
* Interlingue
* Irish
* Igbo
* Inupiaq
* Ido
* Icelandic
* Italian (Italy)
* Italian (Switzerland)
* Inuktitut
* Javanese
* Kalaallisut
* Kannada
* Kanuri
* Kashmiri
* Khmer
* Kikuyu
* Kinyarwanda
* Kyrgyz
* Komi
* Kongo
* Kurdish
* Kwanyama
* Latin
* Luxembourgish
* Ganda
* Limburgish
* Lingala
* Lao
* Luba-Katanga
* Manx
* Macedonian
* Malagasy
* Malayalam
* Maltese
* Maori
* Marathi
* Marshallese
* Mongolian
* Nauru
* Navajo
* Norwegian BokmГҐl
* North Ndebele
* Ndonga
* Norwegian Nynorsk
* Nuosu
* South Ndebele
* Occitan
* Ojibwe
* Oromo
* Oriya
* Ossetian
* Panjabi
* PДЃli
* Pashto
* Quechua
* Kirundi
* Sanskrit
* Sardinian
* Sindhi
* Northern Sami
* Samoan
* Sango
* Shona
* Sinhala
* Somali
* Southern Sotho
* Sundanese
* Swati
* Tamil
* Telugu
* Tajik
* Tigrinya
* Tibetan Standard
* Turkmen
* Tswana
* Tonga
* Tsonga
* Tatar
* Twi
* Tahitian
* Uighur
* Urdu
* Uzbek
* Venda
* VolapГјk
* Walloon
* Welsh
* Wolof
* Western Frisian
* Xhosa
* Yiddish
* Yoruba
* Zhuang

Status
-------------
Current status: draft of version 2.0  
Specification version: 1.00
Last update: March 25, 2013  

Change History
-------------
### Version 1.01 (May 20, 2014)
* Added `company` to support information.

### Version 1.00 (April 08, 2013)
* Version 0.97 is accepted as 1.0 without changes

### Version 0.97 (March 23, 2013)

* `href` attribute is added to the `<eula>` tag, now the `<eula>` should include both a link to the EULA webpage as well as full EULA text. 
* Maximum length requirement is added for the `<eula>` tag (5000 symbols). 
* `href` attribute is added to the `<privacy-policy>` tag, now the `<privacy-policy>` should include both a link to the privacy policy webpage as well as full privacy policy text. 
* Maximum length requirement is added for the `<privacy-policy>` tag (5000 symbols). 
* `only-listed` attribute is added to the `<supported-resolutions>` tag to make it clear that either `<include>` or `<exclude>` subtags could be included but not both. 
* `width` and `height` attributes are added to the `<small-promo>` tag. 
* `width` and `height` attributes are added to the `<large-promo>` tag. 
* `size` attribute is removed and `width` and `height` attributes are added to the `<app-icon>` tag. 
* `width`, `height` and `index` attributes are added to the `<screenshot>` tag. 
* `<app-icon>` anf `<screenshot>` images must be in PNG format. 
* `<small-promo>` and `<large-promo>` images must be in PNG or JPG formats. 
* Exact size for the `<small-promo>` and `<large-promo>` images is specified (180x120 and 1024x500 correspondingly). 
* Each screenshot must be in 480x800 size, 1080x1920 and 1920x1200 sizes are recommended to have as well. 

### Version 0.96 (February 18, 2013)

* `testing-instructions` tag is made required because many stores require this information. 
* Maximum length requirements is added for the `testing-instructions` tag (4000 symbols). 
* Possible values for rating certificate depending on its type are added to the specification. 

### Version 0.95 (February 14, 2013)

* `platform` attribute is added to the `<application>` tag to potentially support other mobile platforms. 
* `only-listed` attribute is added to the `<countries>` tag to make it clear that either `<include>` or `<exclude>` subtags could be included but not both. 
* Country code should be written in upper case not in lower case. 

### Version 0.94 (February 05, 2013)

* Option to have multiple description.xml files inside one AppDF archive for localization purposes is removed. All localizations must be included in the main `description.xml` file.
* APK file extension support is removed because only Google Play supports this technology today and any application that uses APK extension files will not work in any of the alternative Android application stores.
* Now it is required for the first title to be 30 symbols or shorter (before requirement was that some of the titles is 30 symbols or shorter).
* Now it is required for the first short description to be 80 symbols or shorter (before requirement was that some of the short description is 80 symbols or shorter).
* Currency attribute is removed from the `description.xml` tag, now only country is defined in XML and currency is automatically detected using the predefined country currencies table.
* Links to the country and currency lists are added to the local price description section. 
* `<gambling-refference>` tag is renamed to `<gambling-reference>` (misstype in tag name is fixed).
* Links to the country and language lists are added to the description localization section. 
* `html` and `featureless` attributes are removed from the `<full-description>` tag.
* Only one copy of `<full-description>` tag can be presented (before it was possible to have multiple `<full-description>` tags).
* A special `<features>` section is added as an option inside the `<full-description>` tag to allow product description that contain the feature list but do not duplicate it on the stores that have a separate feature list.
* `<import-export>` tag is added to the `<consent>` section in order to support Amazon AppStore.
* `language` attribute is removed from the `<description>` tag. Now default description is always in English US.

License
-------------
This file is licensed under the Creative Commons Attribution 2.5 license:  
http://creativecommons.org/licenses/by/2.5/

Source code is licensed under Apache License, Version 2.0:  
http://www.apache.org/licenses/LICENSE-2.0.html
