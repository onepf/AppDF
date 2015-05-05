## <a name="summary"/>Summary

Uploading Android application to several application stores could be time consuming. AppDF format is designed to simplify this process. A developer describes an Android application once by creating a simple AppDF archive that includes the XML description, APK file(s), screenshots, app icon, promo images, etc and just upload this AppDF file to all the stores that support AppDF uploading.

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

## <a name="appdf-file-structure"/>AppDF File Structure

An AppDF file is a ZIP archive where all the files describing the application are collected. Here is an example of a simple AppDF file content:
```
description.xml
Life.apk
icon.png
screenshot01.png
screenshot02.png
```

As you see there are just few files: APK file, application icon, screenshots and description.xml file that contains all the information about the application (title, description, category, parental control info, requirements, etc). 

Let's consider a more advanced example of AppDF:
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

As you can see the application could include several APK files, the images for different localizations and stores (different stores require different resolution for the app icon and screenshots). If you want fine tuning you could opt to include several sizes for the images though the AppDF will automatically rescale your images to the needed format.

The only naming convention for the files inside AppDF package is that the description XML file should be called `description.xml`. All other files could have any names supported by ZIP, could be placed in the top folder or in any of the subfolders. The names of the additional files are defined in the `description.xml` file.

## <a name="sample-descriptionxml-file"/>Sample Description.xml File

```xml
<?xml version="1.0" encoding="UTF-8"?>

<application-description-file version="1">

<application platform="android" package="ru.yandex.shell" distribution-type="production">

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
      <title>Yandex.Shell — Free Launcher + Dialer + Widgets</title>
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
      <!--May contain references to Nazi.-->
      <nazi-reference>no</nazi-reference>
    </content-descriptors>
    <included-activities>
      <in-app-billing>no</in-app-billing>
      <gambling>no</gambling>
      <advertising>no</advertising>
      <user-generated-content>no</user-generated-content>
      <user-to-user-communications>no</user-to-user-communications>
      <account-creation>no</account-creation>
      <personal-information-collection>no</personal-information-collection>
      <web-browser-or-search-engine>no</web-browser-or-search-engine>
      <user-location-sharing>no</user-location-sharing>
      <user-info-with-third-parties-sharing>no</user-info-with-third-parties-sharing>
      <user-to-user-content-exchange>no</user-to-user-content-exchange>
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

   <apk-file>
        <apk>yandexshell2.apk</apk>
        <patch-exp-file>patch.314159.com.yandex.shell.obb</patch-exp-file>
        <main-exp-file>main.314159.com.yandex.shell.obb</main-exp-file>
    </apk-file>

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
    <free-from-third-party-copyrighted-content>yes</free-from-third-party-copyrighted-content>
    <!--You confirm that you have all the rights for your application to import to and export from all the supported countries--> 
    <import-export>yes</import-export>
  </consent>

  <!--Required. Customer support information-->
  <customer-support>
    <email>support@yandex-team.ru</email>
    <!--Optional-->
    <phone>+1 (555) 1234-56-78</phone>
    <website>http://www.yandex.ru/support</website>
  </customer-support>

  <!--Optional tag that collects some store specific information-->
  <!--Top level subtags correspond to store ids, see the documentation for the list of these ids-->
  <!--The store tags could also include replacement of any of the subtags from the <application> tag. See -->
  <store-specific>
    <amazon>
      <!--Optional tag, default value is no-->
      <free-app-of-the-day-eligibility>yes</free-app-of-the-day-eligibility>
      <apply-amazon-drm>yes</apply-amazon-drm>
      <small-icon>amazon_small_icon.png</small-icon>
      <fire-phones-and-tablets-support>
        <kindle-fire-first-generation>yes</kindle-fire-first-generation>
        <kindle-fire>yes</kindle-fire>
        <kindle-fire-hd>yes</kindle-fire-hd>
        <kindle-fire-hd-8-9>yes</kindle-fire-hd-8-9>
      </fire-phones-and-tablets-support>
    </amazon>
    <slideme>
      <license-type>Apache License 2.0</license-type>
      <required-third-party-libraries>no</required-third-party-libraries>
      <subsubcategory>Other</subsubcategory>
      <default-language>English (United States)</default-language>
    </slideme>
  </store-specific>

</application>

</application-description-file>
```

## <a name="descriptionxml-structure"/>Description.xml Structure

[Formal  XML Schema (XSD) description](https://github.com/onepf/AppDF/blob/2.x-appdf/specification/2.1/appdf-description.xsd) of Description.xml file structure.

List of Tags:
* [application](#application)
	* [distribution-type](#application-attr-distribution-type)
	* [categorization](#categorization)
		* [type](#categorization-type)
		* [category](#categorization-category)
		* [subcategory](#categorization-subcategory)
	* [description](#description)
		* [texts](#description-texts)
			* [title](#description-texts-title)
			* [keywords](#description-texts-keywords)
			* [short-description](#description-texts-short-description)
			* [full-description](#description-texts-full-description)
			* [features](#description-texts-features)
			* [recent-changes](#description-texts-recent-changes)
			* [privacy-policy](#description-texts-privacy-policy)
			* [eula](#description-texts-eula)
		* [images](#description-images)
			* [app-icon](#description-images-app-icon)
			* [large-promo](#description-images-large-promo)
			* [small-promo](#description-images-small-promo)
			* [screenshots](#description-images-screenshots)
				* [screenshot](#description-images-screenshots-screenshot)
		* [videos](#description-videos)
			* [youtube-video](#description-videos-youtube-video)
			* [video-file](#description-videos-video-file)
	* [description-localization](#description-localization)
	* [content-description](#content-description)
		* [content-rating](#content-description-content-rating)
		* [rating-certificates](#content-description-rating-certificates)
			* [rating-certificate](#content-description-rating-certificates-rating-certificate)
		* [content-descriptors](#content-description-content-descriptors)
		* [included-activities](#content-description-included-activities)
	* [availability](#availability)
		* [countries](#availability-countries)
		* [period](#availability-period)
			* [since](#availability-period-since)
			* [until](#availability-period-until)
	* [price](#price)
		* [base-price](#price-base-price)
		* [local-price](#price-local-price)
		* [trial-version](#price-trial-version)
	* [apk-files](#apk-files)
	* [requirements](#requirements)
		* [features](#requirements-features)
			* [root](#requirements-features-root)
			* [gms](#requirements-features-gms)
			* [online](#requirements-features-online)
		* [supported-languages](#requirements-supported-languages)
		* [supported-devices](#requirements-supported-devices)
		* [supported-resolutions](#requirements-supported-resolutions)
	* [testing-instructions](#testing-instructions)
	* [consent](#consent)
	* [customer-support](#customer-support)
		* [email](#customer-support-email)
		* [phone](#customer-support-phone) 
		* [website](#customer-support-website)
	* [store-specific](#store-specific)
		* [amazon](#store-specific-amazon)
		* [slideme](#store-specific-slideme)
	* [in-app-purchases](#in-app-purchases)   
		* [item | subscription](#in-app-item--sub)
			* [Attributes](#in-app-item--sub-attrs)
				* [Common attributes for item and subscription](#in-app-item--sub-attrs-common)
					* [published](#in-app-item--sub-attrs-common-published)
				* [Item-specific attributes](#in-app-item--sub-attrs-item-spec)
					* [type](#in-app-item--sub-attrs-item-spec-type)
			* [id](#in-app-item--sub-id)
			* [description](#in-app-item--sub-desc)
				* [title](#in-app-item--sub-title)
				* [text](#in-app-item--sub-desc-text)
				* [small-icon](#in-app-item--sub-desc-small-icon)
				* [large-icon](#in-app-item--sub-desc-large-icon)
				* [store-specific](#in-app-item--sub-desc-store-spec)
					* [amazon](#in-app-item--sub-desc-store-spec-amazon)
					* [slideme](#in-app-item--sub-desc-store-spec-slideme)
			* [description-localization](#in-app-item--sub-desc-store-spec-desc-loc)
			* [price](#in-app-item--sub-price)
				* [free](#in-app-item--sub-price-attrs-free)
				* [base-price](#in-app-item--sub-price-base-price)
				* [local-price](#in-app-item--sub-price-local-price)
					* [country](#in-app-item--sub-price-local-price)
			* [subscription-specific elements](#in-app-item--sub-sub-spec-elements)
				* [subs-period](#in-app-item--sub-sub-spec-elements-subs-period)
				* [trial-period](#in-app-item--sub-sub-spec-elements-trial-period)

## <a name="application"/>application
Required.  
Attributes: `platform`, `package`, `distribution-type`.

The main tag. Contains all information required for publishing.

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>platform</td>
    <td>android | tizen</td>
    <td>Yes</td>
    <td>The supported platform.</td>
  </tr>
  <tr>
    <td>package</td>
    <td>String with the pattern: ([_a-zA-Z0-9\-]+\.)+[_a-zA-Z0-9\-]+</td>
    <td>Yes</td>
    <td>The package name of the application.</td>
  </tr>
  <tr>
    <td>distribution-type</td>
    <td>alpha | beta | rollout | production</td>
    <td>No</td>
    <td>The default value is production.</td>
 </tr>
</table>

###### <a name="application-attr-distribution-type"/>distribution-type

<table>
  <tr>
    <th>Store</th>
    <th>draft</th>
    <th>alpha</th>
    <th>beta</th>
    <th>rollout</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>supported</td>
    <td>supported, "ALPHA"</td>
    <td>supported, "BETA"</td>
    <td>suported</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>supported</td>
    <td>N/S</td>
    <td>N/S</td>
    <td>N/S</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>supported</td>
    <td>N/S</td>
    <td>N/S</td>
    <td>N/S</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>supported</td>
    <td>N/S</td>
    <td>N/S</td>
    <td>N/S</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>supported</td>
    <td>N/S</td>
    <td>N/S</td>
    <td>N/S</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>supported</td>
    <td>N/S</td>
    <td>N/S</td>
    <td>N/S</td>
  </tr>
</table>

### <a name="categorization"/>categorization

Required.  
No attributes.

Contains information about the type, categories and, if applicable, subcategories of the application.

Example
```xml
<categorization>
  <type>application</type>
  <category>finance</category>
  <subcategory>investing</subcategory>
</categorization>
```

#### <a name="categorization-type"/>categorization/type

Required.  
No attributes.  

Value could be either `application` or `game`.

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Possible values</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / CATEGORIZATION / Application type</td>
    <td>Yes</td>
    <td>Applications, Games</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Additional Info / Category</td>
    <td>Yes</td>
    <td>Apps, Games</td>
  </tr>  
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Category</td>
    <td>No</td>
    <td>Games is an item in the application category list</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Category</td>
    <td>No</td>
    <td>Games is an item in the application category list</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Category</td>
    <td>No</td>
    <td>Games is an item in the application category list</td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Keywords &amp; Category / Categories</td>
    <td>Yes</td>
    <td>Games is an item in the application category list</td>
  </tr>
<tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Application Category</td>
    <td>Yes</td>
    <td>Games is an item in the application category list</td>
  </tr>
  -->
</table>

#### <a name="categorization-category"/>categorization/category

Required.  
No attributes.

AppDF format has its own list of categories for both games and applications. This [category list](#category-list) is developed to be easily mapped to any of the application store category lists.

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
    <td>Store Listing / CATEGORIZATION / Category</td>
    <td>Yes</td>
    <td>Games: Action | Adventure | Arcade | Board | Card | Casino | Casual | Educational | Family | Music | Puzzle | Racing | Role Playing|  Simulation | Sports | Strategy | Trivia | Word<br>Applications: Books &amp; Reference | Business | Comics | Communication | Education | Entertainment | Finance 
| Health &amp; Fitness | Libraries &amp; Demo | Lifestyle | Media &amp; Video | Medical | Music &amp; Audio | News &amp; Magazines | Personalization | Photography | Productivity | Shopping | Social | Sports | Tools | Transportation | Travel &amp; Local | Weather
    </td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Additional Info / Category</td>
    <td>Yes</td>
    <td>Games: Racing | Strategy | Sports | Arcade | Trivia | Gambling | Action | Educational | Family | Puzzle | Adventure | Simulation | Board | Casual<br>Apps: Customization | Language and translation | Utilities | Health | Entertainment | Communication | Organizers | Books and guides | Multimedia and video | Travel | Business and finance | Music and audio | Social | News & Magazines | Education</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Category</td>
    <td>Yes</td>
    <td>Books & Comic | City Info | Communication | Cooking | Education | Entertainment | Finance | Games | Health & Fitness | Kids | Lifestyle | Magazines | Music | Navigation | News & Weather | Newspapers | Novelty | Photography | Podcasts | Productivity | Real Estate | Reference | Ringtones | Shopping | Social Networking | Sports | Themes | Travel | Utilities | Web Browsers</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Category</td>
    <td>Yes</td>
    <td>Business &amp; Finance | Communication | eBooks | Education | Entertainment | Games | Health | Languages &amp; Translators | Lifestyle | Multimedia | Organizers | Productivity | Social | Sports | Travel | Utilities | Wallpapers &amp; Themes</td>
  </tr>
  <tr>
    <td>GALAXY App</td>
    <td>Yes</td>
    <td>App Information / Category</td>
    <td>Yes</td>
    <td>Main Category, GALAXY Specials</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Category</td>
    <td>Yes</td>
    <td>Communication | Education | Entertainment | Finance | Fun & Games | Health & Fitness | Home & Hobby | Languages | Lifestyle | Music | News & Weather | Photography | Productivity | Publications | Religion | Sports | Themes | Tools & Utilities | Travel & Locality | Other</td>
  </tr>
  <!--
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
  -->
</table>

#### <a name="categorization-subcategory"/>categorization/subcategory

Optional.  
No attributes. 

Although some stores don't use subcategories AppDF includes as detailed category information as possible. It is always easy to broaden detailed AppDF category+subcategory information to a less detailed particular store category list. More information in the [category list](#category-list) section.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Comment</th>
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
    <td>General Information / Category</td>
    <td>Yes</td>
    <td>Books & Comic: Books &amp; Readers | Children's Books | Comic Strips | Graphic Novels | Manga | Other
<br>City Info:  Boston | Chicago | Dallas | Los Angeles | Miami | New York | Philadelphia | Phoenix | San Francisco | Seattle | Other
<br>Communication: 
<br>Cooking:
<br>Education: History | Language | Math | Reading | Science | Test Guides | Writing | Other
<br>Entertainment:
<br>Finance: Accounting | Banking | Finance | Investing | Money &amp; Currency | Personal Finance | Other
<br>Games: Action | Adventure | Arcade | Board | Cards | Casino | Casual | Educational | Kids | Multiplayer | Music | Puzzles &amp; Trivia | Racing | Role Playing | Sports | Strategy| Other
<br>Health & Fitness: Diet &amp; Weight Loss | Exercise &amp; Fitness | Medical | Meditation | Pregnancy | Sleep Trackers | Other
<br>Kids: Alphabet | Animals | History | Language | Math | Popular Characters | Reading | Science | Writing | Other
<br>Lifestyle: Advice | Astrology | Celebrity | Hair &amp; Beauty | Home &amp; Garden | Parenting | Quizzes &amp; Games | Relationships | Self Improvement | Other
<br>Magazines:
<br>Music: Artists | Instruments | Music Players | Music Players | Radio | Songbooks | Other
<br>Navigation:
<br>News & Weather: Business | Entertainment | Health | Politics | Science &amp; Tech | Sports | US | Weather | World | Other
<br>Newspapers:
<br>Novelty:
<br>Photography:
<br>Podcasts:
<br>Productivity:
<br>Real Estate:
<br>Reference:
<br>Rigtones: Christian | Classical | Collegiate | Comedy | Country | Dance &amp; Electronic | Jazz &amp; Standards | Latin | Pop | Pop??? | Rap | Rock | Sound Effects | Soundtracks | Sports | TV | Voicetones | Other
<br>Shopping:
<br>Social Networking:
<br>Sports: Baseball | Basketball | Boxing | Football | Golf | Hockey | NCAA | Soccer | Tennis | UFC | Other
<br>Themes:
<br>Travel: Auto Rental | Flight | Hotel | Transportation | Trip Planner | Other
<br>Utilities: Alarms &amp; Clocks | Battery Savers | Calculators | Calendars | Notes | Other
<br>Web Browsers:</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Category</td>
    <td>Yes</td>
    <td>Business &amp; Finance
<br>Communication:
<br>eBooks: Comics | News &amp; Magazines
<br>Education:
<br>Games: Action | Adventure | Arcade | Cards | Casino | Casual | Games for Kids | Puzzle | Racing | Role Playing | Simulation | Sports | Strategy
<br>Health:
<br>Languages &amp; Translators:
<br>Lifestyle:
<br>Multimedia:
<br>Organizers:
<br>Productivity:
<br>Social:
<br>Sports:
<br>Travel:
<br>Utilities:
<br>Wallpapers &amp; Themes:
</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Category</td>
    <td>Required for GALAXY Specials</td>
    <td>GALAXY Specials: Multi Window | Data Sharing | S Pen | Other</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Category</td>
    <td>Yes</td>
    <td>Communication: E-mail | Instant Messaging | Phone | SMS | Social Networking | Other
<br>Education: Early Childhood | Higher | Primary | Secondary | Other
<br>Entertainment: Comedy | Film | Music | Sports | Theatre | Other
<br>Finance: Corporate | Personal | Other
<br>Fun & Games: Action | Adventure | Arcade | Board | Cards &amp; Casino | Casual | Drawing | Educational | Multiplayer | Music | Puzzle | Racing | Role Playing | Sports | Strategy | Other
<br>Health & Fitness: Calorie calculators | Family Planning | Fitness | Other
<br>Home & Hobby: Budgeting | Cooking | Shopping | Other
<br>Languages: Dictionaries | Language learning | Other
<br>Lifestyle: Celebrities | Culture | Design | Fashion | Living | Other
<br>Music: Instruments | Music players | Radio | Other
<br>News & Weather:  News | Regional News | Weather | Other
<br>Photography: Camera | Editing | Gallery | Sharing | Other
<br>Productivity: Android OS | Calculator | Management | Telephony | Other
<br>Publications: Comics | E-book readers | E-books | Magazines | Other
<br>Religion: Buddhism | Chinese folk | Christianity | Hinduism | Islam | Other
<br>Sports:  Athletic | Disabled | Extreme | Motor | Other
<br>Themes: Launcher Theme | Live Wallpapers | Ringtones | Wallpapers | Other
<br>Tools & Utilities: Browsers | Developer/Programmer | Location-based | Security | Other
<br>Travel & Locality: City Guides | Country Guides | Navigation | Other
<br>Other: <></td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Keywords &amp; Category / Categories</td>
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
  -->
</table>

### <a name="description"/>description 

Required.  
No attributes.

This section contains product description in text form as well as pictures and videos in English US language. A part of the main `<description>` tag there could be several `<description-localization>` tags for different languages. If some information is missing in the localized `<description-localization>` tag it will be taken from the default `<description>` section.

Example
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

#### <a name="description-texts"/>description/texts

Required.  
No attributes.

This tag contains all text assets. As everything inside the `<description>` tag can be localized using `<description-localization>` section. 

Example
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

##### <a name="description-texts-title"/>description/texts/title

Required.  
No attributes.  
Maximum length: the first tag must be 30 characters or shorter.

The application name is shown in the application list. As everything inside the `<description>` tag can be localized using `<description-localization>` section. Different stores have different requirements for maximum title length. In order to have flexibility to get the best from each of the stores you can include several copies of title tag. The store will take the longest one that is fits in its maximum size. The first title must be 30 symbols or shorter in order to be supported by all the stores.

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
    <td>Store Listing / PRODUCT DETAILS / Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>30 characters</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / General / Name</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Description / Display Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>250 characters</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Application Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>200 byte</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>+-</td>
    <td></td>
    <td>Yes</td>
    <td>Yes</td>
    <!--todo wtf-->
    <td>255???</td>
    <td>Default value seems to be imported from APK Android manifest file (android:label field). Could be localized in the Translations tab.</td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Application Name</td>
    <td>Yes</td>
    <td>No</td>
    <td>100</td>
    <td></td>
  </tr> 
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Application Name</td>
    <td>Yes</td>
    <td>No</td>
    <td>Unlimited</td>
    <td></td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>Basic Information / App Title</td>
    <td>Yes</td>
    <td>No</td>
    <td>50</td>
    <td></td>
  </tr>
  -->
</table>

##### <a name="description-texts-keywords"/>description/texts/keywords

Optional.  
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
    <td>Max 30 keywords</td>
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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Tags</td>
    <td>No</td>
    <td>Yes</td>
    <td>Max 15 keywords</td>
    <td>Available only in Advanced Mode.</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Keywords</td>
    <td>Yes</td>
    <td>No</td>
    <td>Max 6 keywords</td>
    <td>2 — 6 keywords required</td>
  </tr>
  <!--
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
    <td>No</td>sh
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  -->
</table>

##### <a name="description-texts-short-description"/>description/texts/short-description

Required.  
No attributes.  
Maximum length: the first tag should be 80 characters or shorter.

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
    <td>Store Listing / PRODUCT DETAILS / Short description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>80 characters</td>
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
    <td><!--todo find the string Shown on the top of the product webpage, next to the app icon--></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
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
    <td>Yes</td>
    <td>500 characters</td>
    <td></td>
  </tr>
  <!--
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
  -->
</table>

##### <a name="description-texts-full-description"/>description/texts/full-description

Required.  
No attributes.  
Maximum length: 4000 characters.

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
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / PRODUCT DETAILS / Full description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>4000 characters</td>
    <!---todo check HTML-->
    <td>simple HTML, no links</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / General / Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td>Plain text</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Description / Long description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>4000 characters</td>
    <td>simple HTML, no links</td>
    <td>A description of your app for use on the Amazon.com website</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Full Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td>Some HTML subset</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>4000 byte</td>
    <td>?</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Long Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>4000 characters</td>
    <td>Some HTML subset http://slideme.org/filter/tips</td>
    <td></td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Description / Application Description</td>
    <td>Yes</td>
    <td>No</td>
    <td>2500</td>
    <td>Plain text</td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Application Description</td>
    <td>Yes</td>
    <td>No</td>
    <td>Unlimited</td>
    <td>Some HTML subset</td>
    <td></td>
  </tr>
  <tr>
    <td>SK T-Store</td>
    <td>Yes</td>
    <td>App Detail / Description</td>
    <td>Yes</td>
    <td>No</td>
    <td>1300 Korean words, or 4000 English symbols</td>
    <td>Some HTML subset</td>
    <td></td>
  </tr>
  -->
</table>

##### <a name="description-texts-features"/>description/texts/features

Optional.  
No attributes.

Some stores support separate feature list (most assumes that the feature list is included into the full description). Each `<feature>` subtag should contain one feature description. There should be between 3 to 5 `<feature>` subtags. As everything inside the `<description>` tag can be localized using `<description-localization>` section.

Example
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
    <td>Three to five concise app features, each on a new line. These product features will appear on the Amazon.com website.</td>
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
    <td>GALAXY Apps</td>
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
  <!--
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
  -->
</table>

##### <a name="description-texts-recent-changes"/>description/texts/recent-changes

Optional.  
No attributes.  
Maximum length: 500 characters.

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
    <td>APK / APK Details / What's new in this version?</td>
    <td>No</td>
    <td>Yes</td>
    <td>500 characters</td>
    <td>Briefly list and describe new features in this version. You can specify this information for each APK if you have multiple APKs or you are using alpha/beta testing.</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Builds / Active builds / *choose any* / What's new?</td>
    <td>No</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td>Describes the changes of the latest version (version number is taken from APK file)</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Release Note</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>4000 characters</td>
    <td>Release notes are required for all provided translations. English (U.S.) will be used in all marketplaces where a translation has not been provided.</td>
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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / New Feature</td>
    <td>No</td>
    <td>Yes</td>
    <td>4000 byte</td>
    <td>Describe the changes you made to the application.</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Public revision information / What's New message (for this update only)</td>
    <td>No</td>
    <td>No</td>
    <!--todo check unlimited-->
    <td>Unlimited</td>
    <td>"Please provide a short explanation about the reasons you are updating this application, which will be displayed to users as "What's new" for your application in SAM. This information will go in the changelog of the application and can not be changed or removed."</td>
  </tr>
  <!--
  <tr>
    <td>AppsLib</td>
    <td>Yes</td>
    <td>Upload APK file / Release Description</td>
    <td>Yes</td>
    <td>No</td>
    <td>Unlimited</td>
    <td></td>
  </tr>
  -->
</table>

##### <a name="description-texts-privacy-policy"/>description/texts/privacy-policy

Optional.  
Attributes: `href`.  
Maximum length: 5000 characters.

Privacy policy for this application. It must include both a link to privacy policy webpage (in `href` attribute) and full privacy policy text. As everything inside the `<description>` tag it can be localized using `<description-localization>` section.

Example
```xml
<privacy-policy href="http://legal.yandex.com/privacy/">We won't share information about 
you, your account or your email addresses with anyone. Period.</privacy-policy>
```

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>href</td>
    <td>URL</td>
    <td>Yes</td>
    <td>Link to a webpage with your privacy policy for this application.</td>
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
    <td>Store Listing / PRIVACY POLICY</td>
    <td>Yes</td>
    <td>No</td>
    <td>If you wish to provide a privacy policy URL for the application, enter its URL. If you do not want to add a privacy policy at the moment, you can check the box next to Not submitting a privacy policy URL at this time on the Store Listings screen of your application in the Google Play Developer Console.</td>
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
    <td>Content Rating / Additional Information / Privacy policy URL</td>
    <td>No</td>
    <td>No</td>
    <td></td>
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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information  / Privacy Policy URL</td>
    <td>No</td>
    <td>No</td>
    <td>"This information must be entered if it is intended for the Kids category. The category may change if there is no input."</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>License / Privacy policy</td>
    <td>No</td>
    <td>No</td>
    <td>Only full privacy policy text is supported (no URL option)</td>
  </tr>
  <!--
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
  -->
</table>

##### <a name="description-texts-eula"/>description/texts/eula

Optional.  
Attributes: `href`.  
Maximum length: 5000 characters.

End User License Agreement for this application. It must include both a link to EULA webpage (in `href` attribute) and full EULA text. As everything inside the `<description>` tag it can be localized using `<description-localization>` section.

Example
```xml
<eula href="http://wwww.mysite.com/legal/eula.html">Don't violate copyright law and no matter 
what happens, including damage to your equipment or even someone’s death, you agree not to blame 
us even if it is our fault.</eula>
```

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Requied</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>href</td>
    <td>URL</td>
    <td>Yes</td>
    <td>Link to a webpage with your End User License Agreement for this application.</td>
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
    <td>Upload custom EULA / EULA</td>
    <td>No</td>
    <td>No</td>
    <td>EULA text or URL</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
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
  <!--
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
  -->
</table>

#### <a name="description-images"/>description/images

Required.  
No attributes.

This tag contains all application image assets. As everything inside the `<description>` tag can be localized using `<description-localization>` section. If `<description-localization>` tag does not contains any particular image type then the corresponding image from the `<description>` section is taken. 

Example
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

##### <a name="description-images-app-icon"/>description/images/app-icon

Required.  
Attributes: `width`, `height`. 

High resolution application icon. Must be in PNG format. Different stores require different resolutions of this icon. You can include several versions of the `<app-icon>` tag with different `width` and `height` attributes. The store will automatically select right size. AppDF will automatically rescale your image if there is no needed size. Most of the stores use 512x512 PNG image, so you must include this size, other sizes are optional. The icon must be a square (`width`=`height`).

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>width</td>
    <td>A positive integer</td>
    <td>Yes</td>
    <td>The store selects the app icon in the most appropriate size. The first icon must be 512x512, PNG.</td>
  </tr>
  <tr>
    <td>height</td>
    <td>A positive integer</td>
    <td>Yes</td>
    <td>The store selects the app icon in the most appropriate size. The first icon must be 512x512, PNG.</td>
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
    <td>Store Listing / GRAPHIC ASSETS / Hi-res icon</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>512x512</td>
    <td>32-bit PNG</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Images / Promo icon</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>512x512</td>
    <td>32-bit PNG, less than 1 MB</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Images & Multimedia / Small Icon, Large icon</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>114x114, 512x512</td>
    <td>PNG</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Thumbnail</td>
    <td>No</td>
    <td>No</td>
    <td>512x512</td>
    <td><!--todo check types PNG, JPG, GIF--></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Icon</td>
    <td>Yes</td>
    <td>No</td>
    <td>512x512</td>
    <td>PNG, less than 1 MB</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Promotion / Icon</td>
    <td>Yes</td>
    <td>No</td>
    <td>512x512</td>
    <td>PNG, JPG</td>
  </tr>
  <!--
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
    <td>PNG, GIF or BMP</td>
  </tr>
  -->
</table>

##### <a name="description-images-large-promo"/>description/images/large-promo

Optional.  
Attributes: `width`, `height`. 

Large promotion picture usually used by the stores on the PC websites, some stores use in on a device as well. Must be a 1024x500 PNG or JPG image.

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>width</td>
    <td>Must be `1024`</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>height</td>
    <td>Must be `500`</td>
    <td>Yes</td>
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
    <td>Store Listing / GRAPHIC ASSETS / Feature Graphic</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>1024 w x 500 h</td>
    <td>JPG, 24-bit PNG</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Images / Featured screen</td>
    <td>No</td>
    <td>Yes</td>
    <td>1024x500</td>
    <td>JPG, 24-bit PNG</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Images & Multimedia / Promotional image</td>
    <td>No</td>
    <td>No</td>
    <td>1024x500 (landscape only)</td>
    <td>PNG, JPG</td>
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
    <td>GALAXY Apps</td>
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
    <td>PNG, JPG</td>
  </tr>
  <!--
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
  -->
</table>

##### <a name="description-images-small-promo"/>description/images/small-promo

Optional.  
Attributes: `width`, `height`. 

A small promotion picture is usually used by the stores on a mobile device for promoted apps. Must be a 180x120 PNG or JPG image.

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>width</td>
    <td>Must be `180`</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>height</td>
    <td>Must be `120`</td>
    <td>Yes</td>
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
    <td>Store Listing / GRAPHIC ASSETS / Feature Graphic</td>
    <td>No</td>
    <td>Yes</td>
    <td>180 w x 120 h</td>
    <td>JPG, 24-bit PNG</td>
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
    <td>GALAXY Apps</td>
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
    <td>PNG or JPG, max 256 KB</td>
  </tr>
  <!--
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
  -->
</table>

##### <a name="description-images-screenshots"/>description/images/screenshots

Required.  
No attributes. 

Contains several `<screenshot>` subtags. Each `<screenshot>` subtag describes one screenshot. Different stores use different number of screenshots. The required by AppDF minimum is two screenshots but you should provide at least four screenshots to support all the stores. If you provide more screenshots than a store can use the first screenshots are used. 

##### <a name="description-images-screenshots-screenshot"/>description/images/screenshots/screenshot
Required.  
Attributes: `width`, `height`, `index`. 

A tag that describes one screenshot. Screenshots must be in PNG format. There could be several versions of each screenshot with different sizes, they should have the same `index` attribute in that case. 480x800 size must be presented for each screenshot. 1080x1920 (HD) and 1920x1200 (tablet) versions are recommended to have as well. Different stores use different screenshot sizes. Each store will choose one the best matching image size from each screenshot group (screenshot with the same `index` attribute).  

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>width</td>
    <td>A positive integer</td>
    <td>Yes</td>
    <td>Each store will choose one the best matching screen resolution from each screenshot group.</td>
  </tr>
  <tr>
    <td>height</td>
    <td>A positive integer</td>
    <td>Yes</td>
    <td>Each store will choose one the best matching screen resolution from each screenshot group.</td>
  </tr>
  <tr>
    <td>index</td>
    <td>A positive integer</td>
    <td>Yes</td>
    <td>If several screenshots have the same index attribute then they represent the same screenshot in different sizes.</td>
  </tr>
</table>

Example
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
    <td>Store Listing / GRAPHIC ASSETS / Screenshots</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Min length for any side: 320 px. Max length for any side: 3840 px</td>
    <td>JPG, 24-bit PNG</td>
    <td>2+. Max 8 screenshots per type (Phone, 7-inch tablet, 10-inch tablet, TV).</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Images / Screenshots</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>from 250×140 to 1920×1080 px, no frame</td>
    <td>JPG, 24-bit PNG</td>
    <!--todo check max number Lesha-->
    <td>2+</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Images & Multimedia / Screenshots</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>800x480 px, 1024x600 px, 1280x720 px,
1280x800 px, 1920x1080 px, 1920x1200 px,
or 2560x1600 px (portrait or landscape)</td>
    <td>JPG, PNG</td>
    <td>3 — 10</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Images</td>
    <td>No</td>
    <td>Yes</td>
    <td>Any</td>
    <td><!-- todo check JPG, PNG, GIF--></td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Screenshots</td>
    <td>Yes</td>
    <td>No</td>
    <td>Min 320 pixels, Max 3840 pixels, Image ratio 2:1</td>
    <td>JPG, PNG</td>
    <td>4 — 8</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Promotion / Screenshots</td>
    <td>Yes</td>
    <td>No</td>
    <td>Images must be between 180x180 pixels and 1600x1600. Maximum file size: 1 MB</td>
    <td>JPG, PNG, GIF</td>
    <!-- todo do they have a limit? didn't find it-->
    <td>2+</td>
  </tr>
  <!--
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
  -->
</table>

#### <a name="description-videos"/>description/videos

Optional.  
No attributes.

This tag contains all video assets. As everything inside the `<description>` tag can be localized using `<description-localization>` section. If `<description-localization>` tag does not contain any particular video type then the corresponding video from the `<description>` section is taken.

Example
```xml
<videos>
  <youtube-video>x8723jw2KL</youtube-video>
  <video-file>video1.mp4</video-file>
  <video-file>video2.mp4</video-file>
</videos>
```

##### <a name="description-videos-youtube-video"/>description/videos/youtube-video

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
    <td>Store Listing / GRAPHIC ASSETS / Promo Video</td>
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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / YouTube URL</td>
    <td>No</td>
    <td>No</td>
    <td>Available only in Advanced Mode. When you register a link to a YouTube video, a screenshot of the video along with the link will be displayed on the Mobile Store</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Promotion / Video</td>
    <td>No</td>
    <td>No</td>
    <td></td>
  </tr>
  <!--
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
  -->
</table>

##### <a name="description-videos-video-file"/>description/videos/video-file

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
    <td>MPEG-2, WMV, MOV, FLV, AVI, or H.264 MPEG-4
720 - 1080 px wide (4:3 or 16:9); 1200 kbps or higher; SFTP files larger than 150 MB</td>
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
    <td>GALAXY Apps</td>
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
  <!--
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
  -->
</table>

### <a name="description-localization"/>description-localization

Optional.  
Attributes: `language`. 

You can use `<description-localization>` section to localize texts, images and videos in product description. This tag has the same structure as `<description>` but all subtags are optional. If some information is missing in the `<description-localization>` section it will be taken from the  `<description>` section.

Reference language list in [JSON](http://www.onepf.org/appdf/data/languages.json) and [XML](data/languages.xml) formats.

Reference country list in [JSON](http://www.onepf.org/appdf/data/countries.json) and [XML](data/countries.xml) formats.


<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
  </tr>
  <tr>
    <td>language</td>
    <td>two letter ISO 639-1 language code (like "en", full language list in <a href="http://www.onepf.org/appdf/data/languages.json">JSON</a> and <a href="data/languages.xml">XML</a> formats) or two letters language code + two upper case letter ISO 3166‑1 country code (like "en-US", full country list in <a href="http://www.onepf.org/appdf/data/countries.json">JSON</a> and <a href="data/countries.xml">XML</a> formats)</td>
    <td>Yes</td>
  </tr>
</table>

Example
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


### <a name="content-description"/>content-description

Required.  
No attributes.

This section describes what activities that could be considered questionable the program/game includes. The stores use this information for filtering to show the app only to allowed individuals. The three main subsections describe age restrictions and existing certificates, content descriptors that are used to calculate age restrictions and other questionable application activities that should require user and/or parent understanding but that are not covered by Android permissions.  

Example
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
    <nazi-reference>no</nazi-reference>
  </content-descriptors>
  <included-activities>
    <in-app-billing>no</in-app-billing>
    <gambling>no</gambling>
    <advertising>no</advertising>
    <user-generated-content>no</user-generated-content>
    <user-to-user-communications>no</user-to-user-communications>
    <account-creation>no</account-creation>
    <personal-information-collection>no</personal-information-collection>
    <web-browser-or-search-engine>no</web-browser-or-search-engine>
    <user-location-sharing>no</user-location-sharing>
    <user-info-with-third-parties-sharing>no</user-info-with-third-parties-sharing>
    <user-to-user-content-exchange>no</user-to-user-content-exchange>
  </included-activities>
</content-description>
```

#### <a name="content-description-content-rating"/>content-description/content-rating

Required.  
No attributes.

Each application must be labeled with a minimum age allowance according to [ESRB standard](http://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board). Tag value must be a number of minimum age which could be `3`, `6`, `10`, `13`, `17`, or `18`. 

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Comment</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Calculated basing on params</td>
    <td>Store Listing / CATEGORIZATION / Content rating - fields to define the content rating</td>
    <td>Yes</td>
    <td>https://support.google.com/googleplay/android-developer/answer/188189</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Additional info / Age Rating</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Content Rating / Addtional Information / Child Directed</td>
    <td>Yes</td>
    <td>https://developer.amazon.com/public/support/faq#Why%20do%20I%20need%20to%20declare%20whether%20or%20not%20my%20app%20is%20directed%20to%20children%20under%2013?</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Age Restriction</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Application / Parental Rating</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Age Range</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  -->
</table>

There is no universal content rating system (aka parental control rating, aka minimum age). Different stores use different systems. AppDF uses ESRB standard but the more important thing is how this information is mapped out to the systems used in the appstores. The following table is used by AppDF to convert the rating to the systems of all the main application stores.

<table>
  <tr>
    <th>ESRB</th>
    <th>Amazon AppStore</th>
    <th>Opera Mobile Store</th>
    <th>GALAXY Apps</th>
    <th>SlideME</th>
    <!--<th>NOOK apps</th>-->
  </tr>
  <tr>
    <td>3</td>
    <td>Child Directed</td>
    <td>n/a</td>
    <td>Over age 0</td>
    <td>Early Childhood (age 3 — 6)</td>
    <!--<td>Ages 0-4</td>-->
  </tr>
  <tr>
    <td>6</td>
    <td>Child Directed</td>
    <td>n/a</td>
    <td>Over age 4</td>
    <td>Everyone (age 6 and over)</td>
    <!--<td>6+</td>-->
  </tr>
  <tr>
    <td>10</td>
    <td>Child Directed</td>
    <td>n/a</td>
    <td>Over age 12</td>
    <td>Everyone 10+ (age 10 and over)</td>
    <!--<td>10+</td>-->
  </tr>
  <tr>
    <td>13</td>
    <td>Not Child Directed</td>
    <td>n/a</td>
    <td>Over age 16</td>
    <td>Teen (age 13 and over)</td>
    <!--<td>13+</td>-->
  </tr>
  <tr>
    <td>17</td>
    <td>Not Child Directed</td>
    <td>n/a</td>
    <td>Over age 18</td>
    <td>Mature (age 17 and over)</td>
    <!--<td>17+</td>-->
  </tr>
  <tr>
    <td>18</td>
    <td>Not Child Directed</td>
    <td>n/a</td>
    <td>Over age 18</td>
    <td>Adults Only (age 18 and over)</td>
    <!--<td>18+</td>-->
  </tr>
</table>

There could be exceptional products for which a generic converting rule described in this table don't work. You can use the `<store-specific>` tag to specify a custom content rating for the stores in that case.

Here you can find more detailed information about content rating definitions used in different stores:
<table>
  <tr>
    <th>Format provider</th>
    <th>Link</th>
  </tr>
  <tr>
    <td>AppDF</td>
    <td>http://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board</td>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>http://support.google.com/googleplay/android-developer/support/bin/answer.py?hl=en&answer=188189</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Options: Adults, Teenagers, Children</td>
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
    <td>GALAXY Apps</td>
    <td>Samsung Age Rating Guide (link cannot be found)</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>http://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board#Ratings</td>
  </tr>
</table>

##### Notes:
1. Google Play doesn't have one field for application rating but uses several params to calculate it.
2. Amazon doesn't have one field for application rating but uses "Child Directed" (Yes, No) to indictate that the app is directed to children under 13.
3. Opera doesn't support content rating (except "Is Adult?" question without specifying the precise age).
4. Samsung uses minimum age parameter along with several other attributes that define application rating according to the standard certification systems (PEGI, ESRB, etc).

### <a name="content-description-rating-certificates"/>content-description/rating-certificates
Optional.  
No attributes.  

Parent tag for a set of rating certificates for the application.

#### <a name="content-description-rating-certificates-rating-certificate"/>content-description/rating-certificates/rating-certificate

Optional.  
Attributes: `type`, `certificate`, `mark`. 

If your application/game has a rating certificate issued by one of the authorities you can include it using the optional tag `<rating-certificate>`. Tag value should be rating given you, usually it is a minimum age number.
 
Example
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
    <td>Yes</td>
    <td>Name of the content rating certificate.</td>
  </tr>
  <tr>
    <td>certificate</td>
    <td>File name from the AppDF package</td>
    <td>No</td>
    <td>If you have a scanned certificate you can add it there.</td>
  </tr>
  <tr>
    <td>mark</td>
    <td>File name from the AppDF package</td>
    <td>No</td>
    <td>If you have a special label you can add it there.</td>
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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Rating Certificate for Available Countries</td>
    <td>PEGI, ESRB, GRB, MJ/DEJUS, FSK, ETC</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <!--
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
  -->
</table>

#### <a name="content-description-content-descriptors"/>content-description/content-descriptors

Required.  
No attributes.

Contains several subtags each describing one of the content descriptors. Each content descriptor could have either `no`, `light` or `strong` value. Most of the stores do not use this information but rather use summary information from the `<minimum-age>` tag. You can read more detailed description of these categories in the articles about the content rating systems:
[ESRB](http://en.wikipedia.org/wiki/Entertainment_Software_Rating_Board), [PEGI](http://en.wikipedia.org/wiki/Pan_European_Game_Information).

Example
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
  <nazi-reference>no</nazi-reference>
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
  <tr>
    <td>nazi-reference</td>
    <td>May contain Nazi symbols or references</td>
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
    <td>Yes</td>
    <td>Content Rating</td>
    <td>Yes</td>
    <td>Base set is: Violence | Fear | Sexuality | Gambling | Language | Controlled Substance | Crude Humor | Miscellaneous. Depends on a category of the app: Reference, News, or Educational | Social Networking, Forums, and UGC Sharing | Consumer Store or Commercial Streaming Service | GAME | Entertainment | Utility, Productivity, Communication, or Other</td>
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
    <td>Subject Matter: Violence | Cartoon Violence | Drugs | Nudity | Sex | Intolerance | Profanity | Academic
    <br>Additional Information: Account creation or other personal information collected? |  Advertisements |  Child Directed | Gambling | Location detection or Location Based Services | User Generated Content or User to User Communication</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Is Adult?</td>
    <td>Yes</td>
    <td>Only adult descriptor is used.</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
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
  <!--
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
  -->
</table>

#### <a name="content-description-included-activities"/>content-description/included-activities

Required.  
No attributes.

Contains several subtags each describing one type of the application activities that may require user or parent understanding and permission but that is not covered by Android permission system. Each activity tag could have either `no`, `yes` value. 

Example
```xml
<included-activities>
  <in-app-billing>no</in-app-billing>
  <gambling>no</gambling>
  <advertising>no</advertising>
  <user-generated-content>no</user-generated-content>
  <user-to-user-communications>no</user-to-user-communications>
  <account-creation>no</account-creation>
  <personal-information-collection>yes</personal-information-collection>
  <web-browser-or-search-engine>no</web-browser-or-search-engine>
  <user-location-sharing>no</user-location-sharing>
  <user-info-with-third-parties-sharing>no</user-info-with-third-parties-sharing>
  <user-to-user-content-exchange>no</user-to-user-content-exchange>
</included-activities>
```

<table>
  <tr>
    <th>Activity</th>
    <th>Explanation.</th>
  </tr>
  <tr>
    <td>in-app-billing</td>
    <td>Either standard or custom in-app billing (aka In-App Purchases).</td>
  </tr>
  <tr>
    <td>gambling</td>
    <td>Gambling.</td>
  </tr>
  <tr>
    <td>advertising</td>
    <td>Any form of advertising including banner or AirPush-like advertising.</td>
  </tr>
  <tr>
    <td>user-generated-content</td>
    <td>User generated content.</td>
  </tr>
  <tr>
    <td>user-to-user-communications</td>
    <td>User to user communications.</td>
  </tr>
  <tr>
    <td>account-creation</td>
    <td>Account creation.</td>
  </tr>
  <tr>
    <td>personal-information-collection</td>
    <td>Your application transfers to the server or collects locally on the device any personal information.</td>
  </tr>
  <tr>
    <td>web-browser-or-search-engine</td>
    <td>Your application is a web browser or a search engine.</td>
  </tr>
  <tr>
    <td>user-location-sharing</td>
    <td>Your application shares the user's current physical location to other users.</td>
  </tr>
  <tr>
    <td>user-info-with-third-parties-sharing</td>
    <td>Your applicaion shares user-provided personal information with any third party (other than the app's developer or publisher).</td>
  </tr>
   <tr>
    <td>user-to-user-content-exchange</td>
    <td>Your applicaion allows users to exchange content they have created.</td>
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
    <td>Yes</td>
    <td>Content Rating</td>
    <td>Yes</td>
    <td>Questions in the Content Rating section.</td>
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
    <td>Subject Matter: Violence |  Cartoon Violence | Drugs | Nudity | Sex | Intolerance | Profanity | Academic
<br>Additional Information: Account creation or other personal information collected? | Advertisements |  Child Directed | Gambling |  Location detection or Location Based Services | User Generated Content or User to User Communication</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
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
  <!--
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
  -->
</table>

### <a name="availability"/>availability

Optional.  
No attributes.

You can define country list of period of time where/when you application is distributed. By default your application is distributed to all the countries where language support allows.

Example 1
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

Example 2
```xml
<availability>
  <countries only-listed="no">
    <exclude>CU</exclude>
    <exclude>IM</exclude>
  </countries>
</availability>
```

#### <a name="availability-countries"/>availability/countries

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
    <td>yes | no</td>
    <td>Yes</td>
    <td>If value is "yes" then only &lt;include&gt; subtags could be included, if "no" then only &lt;exclude&gt; subtags could be included.</td>
  </tr>
</table>

Use either `<include>` or `<exclude>` (depending on the `only-listed` attribute value) subtags to define list of the countries where your application is distributed. Subtag value should be a two upper case symbol ISO 3166‑1 country code. Here is the country list in [JSON](http://www.onepf.org/appdf/data/countries.json) and [XML](data/countries.xml) formats.

Example 1
```xml
<countries only-listed="yes">
  <include>US</include>
  <include>GB</include>
  <include>DE</include>
</countries>
```

Example 2
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
    <th>Supported countries</th>
    <th>Banned countries</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Pricing & Distribution / DISTRIBUTE IN THESE COUNTRIES</td>
    <td>Yes</td>
    <td>You need to target at least one country.  
    Albania | Algeria | Angola | Antigua and Barbuda | Argentina | Armenia | Aruba | Australia | Austria | Azerbaijan | Bahamas | Bahrain | Bangladesh | Belarus | Belgium | Belize | Benin | Bolivia | Bosnia and Herzegovina | Botswana | Brazil | Bulgaria | Burkina Faso | Cambodia | Cameroon | Canada | Cape Verde | Chile | Colombia | Costa Rica | Côte d’Ivoire | Croatia | Cyprus | Czech Republic | Denmark | Dominican Republic | Ecuador | Egypt | El Salvador | Estonia | Fiji | Finland | France | Gabon | Germany | Ghana | Greece | Guatemala	 | Guinea-Bissau	 | Haiti | Honduras | Hong Kong SAR China | Hungary | Iceland | India | Indonesia | Ireland | Israel | Italy | Jamaica | Japan | Jordan | Kazakhstan | Kenya | Kuwait | Kyrgyzstan | Laos | Latvia | Lebanon | Lithuania | Luxembourg | Macedonia (FYROM) | Malaysia | Mali | Malta | Mauritius | Mexico | Moldova | Morocco | Mozambique | Namibia | Nepal | Netherlands | Netherlands Antilles | New Zealand | Nicaragua | Niger | Nigeria | Norway | Oman | Pakistan | Panama | Papua New Guinea | Paraguay | Peru | Philippines | Poland | Portugal | Qatar | Romania | Russia | Rwanda | Saudi Arabia | Senegal | Serbia | Singapore | Slovakia | Slovenia | South Africa | South Korea | Spain | Sri Lanka | Sweden | Switzerland | Taiwan | Tajikistan | Tanzania | Thailand | Togo | Trinidad and Tobago | Tunisia | Turkey | Turkmenistan | Uganda | Ukraine | United Arab Emirates | United Kingdom | United States | Uruguay | Uzbekistan | Venezuela | Vietnam | Yemen | Zambia</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Distribution</td>
    <td>Yes</td>
    <td>"In all countries and regions where Amazon sells apps" or choose specific countries grouped by continents.
    <br>Africa: Algeria | Angola | Benin | Botswana | Burkina Faso | Burundi | Cameroon | Cape Verde | Central African Republic | Chad | Comoros | Congo | Côte d'Ivoire | Democratic Republic of the Congo | Djibouti | Equatorial Guinea | Eritrea | Ethiopia | Gabon | Gambia | Ghana | Guinea | Guinea-Bissau | Kenya | Lesotho | Liberia | Libya | Madagascar | Malawi | Mali | Mauritania | Mauritius | Morocco | Mozambique | Namibia | Niger | Nigeria | Rwanda | Sahrawi Arab Democratic Republic | Senegal | Seychelles | Sierra Leone | Somalia | South Africa | South Sudan | Sudan | Swaziland | São Tomé and Príncipe | Tanzania | Togo | Tunisia | Uganda | Zambia | Zimbabwe
<br>Asia: Abkhasia | Afghanistan | Armenia | Azerbaijan | Bahrain | Bangladesh | Bhutan | Brunei | Cambodia | China | East Timor | Egypt | Georgia | India | Indonesia | Iran | Iraq | Israel | Japan | Jordan | Kazakhstan | Kuwait | Kyrgyzstan | Laos | Lebanon | Malaysia | Maldives | Mongolia | Myanmar | Nepal | North Korea | Oman | Pakistan | Palestinian Territory | Philippines | Qatar | Saudi Arabia | Singapore | South Korea | South Ossetia | Sri Lanka | Syria | Taiwan | Tajikistan | Thailand | Turkmenistan | United Arab Emirates | Uzbekistan | Vietnam | Yemen
<br>Australia and Oceania: Australia | Cocos Islands | Cook Islands | Fiji | French Polynesia | Guam | Kiribati | Nauru | New Caledonia | New Zealand | Niue | Norfolk Island | Palau | Papua New Guinea | Samoa | Solomon Islands | The Federated States of Micronesia | The Marshall Islands | Tonga | Tuvalu | Vanuatu
<br>Europe: Albania | Andorra | Austria | Belarus | Belgium | Bosnia and Herzegovina | Bulgaria | Croatia | Cyprus | Czech Republic | Denmark | Estonia | Finland | France | Germany | Gibraltar | Greece | Hungary | Iceland | Ireland | Italy | Latvia | Liechtenstein | Lithuania | Luxembourg | Macedonia | Malta | Moldova | Monaco | Montenegro | Netherlands | Norway | Poland | Portugal | Romania | Russia | San Marino | Serbia | Slovakia | Slovenia | Spain | Sweden | Switzerland | Turkey | Ukraine | United Kingdom | Vatican City
<br>North America: Antigua and Barbuda | Aruba | Bahamas | Barbados | Belize | Bermuda | British Virgin Islands | Canada | Costa Rica | Cuba | Curacao | Dominica | Dominican Republic | El Salvador | Greenland | Grenada | Guatemala | Haiti | Honduras | Jamaica | Martinique | Mexico | Montserrat | Nicaragua | Panama | Puerto Rico | Saint Kitts and Nevis | Saint Lucia | Saint Vincent and the Grenadines | Sint Maarten | The Cayman Islands | The United States Virgin Islands | Trinidad and Tobago | Turks and Caicos Islands | United States
<br>South America: Argentina | Bolivia | Brazil | Chile | Colombia | Ecuador | Falkland Islands | French Guiana | Guyana | Paraguay | Peru | Suriname | Uruguay | Venezuela</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Availability & Pricing / Where would you like this app to be available?</td>
    <td>Yes</td>
    <td>
Africa: Algeria | Angola | Benin | Botswana | Burkina Faso | Burundi | Cameroon | Cape Verde | Central African Republic | Chad | Comoros | Congo | Democratic Republic of Congo | Djibouti | Egypt | Equatorial Guinea | Eritrea | Ethiopia | Gabon | Gambia | Ghana | Guinea | Guinea-Bissau | Ivory Coast | Kenya | Lesotho | Liberia | Libyan Arab Jamahiriya | Madagascar | Malawi | Mali | Mauritania | Mauritius | Mayotte | Morocco | Mozambique | Namibia | Niger | Nigeria | Reunion | Rwanda | Saint Helena, Ascension and Tristan da Cunha | Sao Tome and Principe | Senegal | Seychelles | Sierra Leone | Somalia | South Africa | Swaziland | Tanzania | Togo | Tunisia | Uganda | Western Sahara | Zambia | Zimbabwe
<br>Antarctica: Antarctica | Bouvet Island | French Southern Territories | Heard Island and McDonald Islands | South Georgia and the South Sandwich Islands
<br>Asia: Afghanistan | Armenia | Azerbaijan | Bahrain | Bangladesh | Bhutan | British Indian Ocean Territory | Brunei Darussalam | Cambodia | China | Christmas Island | Cocos (Keeling) Islands | Georgia | Hong Kong (region) | India | Indonesia | Iraq | Israel | Japan | Jordan | Kazakhstan | South Korea | Kuwait | Kyrgyzstan | Laos | Lebanon | Macao | Malaysia | Maldives | Mongolia | Myanmar | Nepal | Oman | Pakistan | Palestinian Territory (Occupied) | Philippines | Qatar | Saudi Arabia | Singapore | Sri Lanka | Taiwan | Tajikistan | Thailand | Turkey | Turkmenistan | United Arab Emirates | Uzbekistan | Vietnam | Yemen
<br>Europe: Aland Islands | Albania | Andorra | Austria | Belarus | Belgium | Bosnia and Herzegovina | Bulgaria | Croatia | Cyprus | Czech Republic | Denmark | Estonia | Faroe Islands | Finland | France | Germany | Gibraltar | Greece | Guernsey | Holy See (Vatican City State) | Hungary | Iceland | Ireland | Isle of Man | Italy | Jersey | Latvia | Liechtenstein | Lithuania | Luxembourg | Macedonia | Malta | Moldova | Monaco | Montenegro | Netherlands | Norway | Poland | Portugal | Romania | Russian Federation | San Marino | Serbia | Slovakia | Slovenia | Spain | Svalbard and Jan Mayen | Sweden | Switzerland | Ukraine | United Kingdom
<br>North America: Anguilla | Antigua and Barbuda | Aruba | Bahamas | Barbados | Belize | Bermuda | Canada | Cayman Islands | Costa Rica | Dominica | Dominican Republic | El Salvador | Greenland | Grenada | Guadeloupe | Guatemala | Haiti | Honduras | Jamaica | Martinique | Mexico | Montserrat | Netherlands Antilles | Nicaragua | Panama | Saint Barthelemy | Saint Kitts and Nevis | Saint Lucia | Saint Martin (French part) | Saint Pierre and Miquelon | Saint Vincent and the Grenadines | Trinidad and Tobago | Turks and Caicos Islands | United States (including territories and possessions) | Virgin Islands, British
<br>Oceania: Australia | Cook Islands | Fiji | French Polynesia | Kiribati | Marshall Islands | Micronesia | Nauru | New Caledonia | New Zealand | Niue | Norfolk Island | Palau | Papua New Guinea | Pitcairn | Samoa | Solomon Islands | Timor-Leste | Tokelau | Tonga | Tuvalu | Vanuatu | Wallis and Futuna
<br>South America: Argentina | Bolivia | Brazil | Chile | Colombia | Ecuador | Falkland Islands (Malvinas) | French Guiana | Guyana | Paraguay | Peru | Suriname | Uruguay | Venezuela, Bolivarian Republic of</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Territories</td>
    <td>No</td>
    <td></td>
    <td>Other worldwide | All partner stores distribution | Argentina | Armenia | Asia | Australia | Bangladesh | Beeline | Beeline KG | Belarus | Blackberry App World | Brazil | Canada | China | Econet | Egypt | Europe | Germany | India | India with carrier billing | Indonesia | Italy | Kazakhstan | Kenya | Latvia | Malaysia | Mexico | Middle East | Morocco | OpenMobile for Intel/Tizen store | Philippines | Poland | Russia | South & Central America | South Africa | Sri Lanka | Tajikistan, Turkmenistan, Uzbekistan | Tele2 | Thailand | Turkey | Ukraine | United Kingdom | United States | United States with carrier billing | Vietnam | Yandex.Store partners</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Country & Price / Country</td>
    <td>No</td>
    <td>Available only in Advanced Mode.<br>Europe: Austria | Belgium | Bulgaria | Croatia | Czech | Denmark | Estonia | Finland | France | Germany | Greece | Hungary | Ireland | Italy | Latvia | Lithuania | Luxembourg | Netherlands | Norway | Poland | Portugal | Romania | Serbia | Slovakia | Spain | Sweden | Switzerland | United Kingdom
<br>CIS: Belarus | Kazakhstan | Russia | Ukraine 
<br>Asia: Australia | China | Hong Kong | India | Indonesia | Japan | Korea | Malaysia | New Zealand | Philippines | Singapore | Taiwan | Thailand | Turkey | Vietnam 
<br>America: Argentina | Brazil | Canada | Chile | Mexico | Peru | USA 
<br>Middle East & Africa: Algeria | Bahrain | Egypt | Iran | Iraq | Israel | Jordan | Kenya | Kuwait | Lebanon | Libya | Morocco | Nigeria | Oman | Qatar | Saudi Arabia | South Africa | Tunisia | United Arab Emirates | Yemen
<br>Global A: Afghanistan | Albania | Armenia | Azerbaijan | Bangladesh | Bosnia and Herzegovina | Cambodia | FYROM | Georgia | Jamaica | Kyrgyzstan | Laos | Macao | Moldova | Mongolia | Montenegro | Nepal | Pakistan | Sri Lanka | Tajikistan | Trinidad and Tobago | Turkmenistan | Uzbekistan
<br>Pan-Latin: Bolivia | Colombia | Costa Rica | Dominican Republic | Ecuador | El Salvador | Guatemala | Honduras | Nicaragua | Panama | Paraguay | Puerto Rico | Uruguay | Venezuela
<br>Pan-Africa: Angola | Benin | Botswana | Burkina Faso | Burundi | Cameroon | Central African Rep. | Congo | Cote D'Ivoire | DR Congo | Ethiopia | Gabon | Gambia | Ghana | Guinea | Lesotho | Liberia | Madagascar | Malawi | Mali | Mauritania | Mauritius | Mozambique | Namibia | Rwanda | Senegal | Sierra Leone | Somalia | Swaziland | Tanzania | Togo | Uganda | Zambia | Zimbabwe
<br>Global Free: Anguilla | Antigua and Barbuda | Aruba | Bahamas | Barbados | Belize | Bermuda | British Virgin Islands | Brunei Darussalam | Cayman Islands | Cook Islands | Curacao | Cyprus | Dominica | Fiji | Greenland | Grenada | Guyana | Haiti | Iceland | Malta | Monaco | Montserrat | Myanmar | Papua New Guinea | Samoa | Slovenia | Solomon Islands | St. Kitts and Nevis | St. Lucia | St. Vincent and the Grenadines | Sudan | Suriname | Syria | Tonga | Turks and Caicos | Vanuatu</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Distribution</td>
    <!--todo all countries can be unchecked-->
    <td>No</td>
    <td>Africa: Algeria | Angola | Benin | Botswana | Burkina Faso | Burundi | Cameroon | Cape Verde | Central African Republic | Chad | Comoros | Congo (Brazzaville) | Congo (Kinshasa) | Djibouti | Egypt | Equatorial Guinea | Eritrea | Ethiopia | Gabon | Gambia | Ghana | Guinea | Guinea-Bissau | Ivory Coast | Kenya | Lesotho | Liberia | Libya | Madagascar | Malawi | Mali | Mauritania | Mauritius | Mayotte | Morocco | Mozambique | Namibia | Niger | Nigeria | Reunion | Rwanda | Saint Helena | Sao Tome and Principe | Senegal | Seychelles | Sierra Leone | Somalia | South Africa | Sudan | Swaziland | Tanzania | Togo | Tunisia | Uganda | Western Sahara | Zambia | Zimbabwe
<br>Antarctica: Antarctica | Bouvet Island | French Southern Territories | Heard Island and McDonald Islands | South Georgia and the South Sandwich Islands
<br>Asia: Afghanistan | Armenia | Azerbaijan | Bahrain | Bangladesh | Bhutan | British Indian Ocean Territory | Brunei | Cambodia | China | Christmas Island | Cocos (Keeling) Islands | Cyprus | Georgia | Hong Kong S.A.R., China | India | Indonesia | Iran | Iraq | Israel | Japan | Jordan | Kazakhstan | Kuwait | Kyrgyzstan | Laos | Lebanon | Macao S.A.R., China | Malaysia | Maldives | Mongolia | Myanmar | Nepal | North Korea | Oman | Pakistan | Palestinian Territory | Philippines | Qatar | Russia | Saudi Arabia | Singapore | South Korea | Sri Lanka | Syria | Taiwan | Tajikistan | Thailand | Timor-Leste | Turkey | Turkmenistan | United Arab Emirates | Uzbekistan | Vietnam | Yemen
<br>Europe: Aland Islands | Albania | Andorra | Austria | Belarus | Belgium | Bosnia and Herzegovina | Bulgaria | Croatia | Czech Republic | Denmark | Estonia | Faroe Islands | Finland | France | Germany | Gibraltar | Greece | Guernsey | Hungary | Iceland | Ireland | Isle of Man | Italy | Jersey | Latvia | Liechtenstein | Lithuania | Luxembourg | Macedonia | Malta | Moldova | Monaco | Montenegro | Netherlands | Norway | Poland | Portugal | Romania | San Marino | Serbia | Slovakia | Slovenia | Spain | Svalbard and Jan Mayen | Sweden | Switzerland | Ukraine | United Kingdom | Vatican
<br>North America: Anguilla | Antigua and Barbuda | Aruba	 | Bahamas | Barbados | Belize | Bermuda | British Virgin Islands | Canada | Cayman Islands | Costa Rica | Cuba | Dominica | Dominican Republic | El Salvador | Greenland | Grenada | Guadeloupe | Guatemala | Haiti | Honduras | Jamaica | Martinique | Mexico | Montserrat | Netherlands Antilles | Nicaragua | Panama | Puerto Rico | Saint Kitts and Nevis | Saint Lucia | Saint Pierre and Miquelon | Saint Vincent and the Grenadines | Trinidad and Tobago | Turks and Caicos Islands | U.S. Virgin Islands | United States
<br>Oceania: American Samoa | Australia | Cook Islands | Fiji | French Polynesia | Guam | Kiribati | Marshall Islands | Micronesia | Nauru | New Caledonia | New Zealand | Niue | Norfolk Island | Northern Mariana Islands | Palau | Papua New Guinea | Pitcairn | Samoa | Solomon Islands | Tokelau | Tonga | Tuvalu | United States Minor Outlying Islands | Vanuatu | Wallis and Futuna
<br>South America: Argentina | Bolivia | Brazil | Chile | Colombia | Curaçao | Ecuador | Falkland Islands | French Guiana | Guyana | Paraguay | Peru | Saint Barthélemy | Saint Martin (French part) | Suriname | Uruguay | Venezuela
</td>
    <td>Cuba, Iran, North Korea, Sudan, Syria</td>
  </tr>
  <!--
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
  -->
</table>

### <a name="availability-period"/>availability/period

Optional.  
No attributes.

#### <a name="availability-period-since"/>availability/period/since

Optional.  
Attributes: `year`, `month`, `day`. 

If presented this tag defines a date from which the application can be distributed. Stores that support this tag will not distribute the app before this date. 

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>year</td>
    <td>A positive integer like 2012</td>
    <td>Yes</td>
    <td>Year of the date.</td>
  </tr>
  <tr>
    <td>month</td>
    <td>Month number, Jan=1, Feb=2, ..., Dec=12</td>
    <td>Yes</td>
    <td>Month of the date.</td>
  </tr>
  <tr>
    <td>day</td>
    <td>Number of the day between 1 and 31</td>
    <td>Yes</td>
    <td>Day of the date.</td>
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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Country & Price / Selling Starts</td>
    <td>No, default "Selling starts on the day of approval"</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <!--
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
  -->
</table>

#### <a name="availability-period-until"/>availability/period/until

Optional.  
Attributes: `year`, `month`, `day`. 

If presented this tag defines a final date of application distribution. Stores that support this tag will not distribute the app after this date. 

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>year</td>
    <td>A positive integer like 2012</td>
    <td>Yes</td>
    <td>Year of the date.</td>
  </tr>
  <tr>
    <td>month</td>
    <td>Month number, Jan=1, Feb=2, ..., Dec=12</td>
    <td>Yes</td>
    <td>Month of the date.</td>
  </tr>
  <tr>
    <td>day</td>
    <td>Number of the day between 1 and 31</td>
    <td>Yes</td>
    <td>Day of the date.</td>
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
    <td>No</td>
    <!--todo prev value was Availability & Pricing / When would you like this app to be discontinued for sale? -->
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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Country & Price / Selling Ends</td>
    <td>No, default "Permanent"</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <!--
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
  -->
</table>

### <a name="price"/>price

Required.  
Attributes: `free`. 

This section describes whether the application is free or paid and if paid what its price is. It has also an option for free apps to mark them as trial version of another app.

Example 1
```xml
<price free="yes">
  <trial-version full-version="com.yandex.shellfullversion"/>
</price>
```

Example 2
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
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>free</td>
    <td>yes | no</td>
    <td>Yes</td>
    <td>&lt;base-price&gt; and &lt;local-price&gt; subtags are applicable for paid apps, &lt;trial-version&gt; subtag is applicable for free apps.</td>
  </tr>
</table>

#### <a name="price-base-price"/>price/base-price

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
    <td>Pricing & Distribution / Default price</td>
    <td>No default</td>
    <td>No</td>
    <td>The default price applies to all countries without local prices.</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Additional info / Price</td>
    <td>USD</td>
    <td>Yes</td>
    <td>http://api.yandex.com/store/doc/pricing.xml</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Availability & Pricing / Are you charging for this app?</td>
    <td>AUD, USD, CAD, EUR, GBR, JPY, BRL</td>
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Price (USD)</td>
    <td>USD</td>
    <!--todo check taxes-->
    <td>Yes</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Country & Price / Price / Standard Price</td>
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
  <!--
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
  -->
</table>

#### <a name="price-local-price"/>price/local-price

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
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>country</td>
    <td>two letter ISO 3166-1 country code, see the list in <a href="http://www.onepf.org/appdf/data/countries.json">JSON</a> or <a href="data/countries.xml">XML</a> formats.</td>
    <td>Yes</td>
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
    <td>Pricing & Distribution  / Distribute in these countries  / Price</td>
    <td>Depends on</td>
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
    <td>USD, GBP, EUR, JPY, CDN, BRL, AUD</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Territories</td>
    <!--todo check taxes-->
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Country & Price / Price / Price</td>
    <!--todo check prices-->
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
  <!--
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
  -->
</table>

#### <a name="price-trial-version"/>price/trial-version

Optional.  
Attributes: `full-version`. 

If presented this tag indicates that this free app is a trial/demo version of another application. `full-version` attribute defines package name of the corresponding full version application.

This tag is ignored for paid apps.

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>full-version</td>
    <td>package name (Android notation)</td>
    <td>Yes</td>
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
    <td>Opera has support for trial versions but trial version is not a separate application but a separate APK file inside a shareware product.<br>"Use "Full" if build can be downloaded only after the payment. "Trial" and "Demo" can be downloaded by the customer before payment is made"</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
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
  <!--
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  -->
</table>

### <a name="apk-files"/>apk-files

Required.  
Optional.  

Each application could have 1+ APK files. All APK files must have the same package name.  

#### <a name="apk-files-apk-file"/>apk-files/apk-file  

Example 1
```xml
<apk-files>
   <apk-file>
        <apk>yandexshell4.apk</apk>
    </apk-file>
    <apk-file>
        <apk>yandexshell4_2.apk</apk>
    </apk-file>
</apk-files>
```
Example 2
```xml
<apk-files>
   <apk-file>
        <apk>yandexshell2.apk</apk>
        <patch-exp-file>patch.314159.com.yandex.shell.obb</patch-exp-file>
        <main-exp-file>main.314159.com.yandex.shell.obb</main-exp-file>
    </apk-file>
</apk-files>
```
<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Maximum APK file size</th>
    <th>Multiple APK file support</th>
    <th>Expansion file support</th>
    <th>APK alias</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>APK / Upload new APK to Production|Beta|Alpha</td>
    <td>50M</td>
    <td>Yes</td>
    <td>Yes (2 files, max 2GB)</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Builds / Upload build</td>
    <td>700M</td>
    <td>Yes</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Binary File(s) / Binary file</td>
    <td>Unlimited</td>
    <td>Yes</td>
    <td>No</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>APK file</td>
    <td>Unlimited</td>
    <!-- todo check multiple again-->
    <td>No</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Binary</td>
    <!-- todo check size-->
    <td>Unlimited</td>
    <td>Yes (up to 10)</td>
    <td>No</td>
    <td>No</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Application / Application file</td>
    <td>99M</td>
    <td>No</td>
    <td>Yes (2 files, max 512M)</td>
    <td>No</td>
  </tr>
  <!--
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
  -->
</table>

##### <a name="apk-files-apk-file"/>apk-files/apk-file/apk  

Required.  
No attributes.  

The local path to the apk file.  

##### <a name="apk-files-apk-file"/>apk-files/apk-file/patch-exp-file  

Optional.  
No attributes.  

The patch expansion file is optional and intended for small updates to the main expansion file. The patch expansion file is optional and intended for small updates to the main expansion file.

##### <a name="apk-files-apk-file"/>apk-files/apk-file/main-exp-file  

Optional.  
No attributes.  

The local path to the main expansion file, must be in the main.app-version-code.package-name.obb format. The main expansion file is the primary expansion file for additional resources required by your application.  

##### <a name="apk-files-apk-file"/>apk-files/apk-file/apk-alias  

Optional.  
No attributes.  
Pattern:  [a-zA-Z0-9_.]+

This name is used to distinguish between multiple binary files. 

### <a name="requirements"/>requirements

Optional.  
No attributes.

You can use this section if your application has some special requirements apart from requirements described in the APK file.

Example
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

#### <a name="requirements-features"/>requirements/features

Optional.  
No attributes.

Example
```xml
<features>
  <root>no</root>
  <gms>no</gms>
</features>
```

#### <a name="requirements-features-root"/>requirements/features/root

Optional.  
No attributes.

Set value of this tag to `yes` if your application requires root access for working.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>Opers Mobile Store</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Requirements / Requires 'rooted' device</td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
  </tr>
  -->
</table>


#### <a name="requirements-features-gms"/>requirements/features/gms

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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Binary / Add binary / Google Mobile Service</td>
    <td>Since the sale of applications containing services provided by Google such as Google map, Gmail and Google Talk are prohibited in China, China will be automatically excluded from target countries when Yes is selected.</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Requirements / Requires Google Play and/or account</td>
    <td></td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  -->
</table>


#### <a name="requirements-features-online"/>requirements/features/online

Optional.  
No attributes.

Set value of this tag to `yes` if your application requires internet connection in order to work. In other words if it does not work in offline mode.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Opers Mobile Store</td>
    <td>No</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>No</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>No</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>No</td>
  </tr>
  -->
</table>


#### <a name="requirements-supported-languages"/>requirements/supported-languages

Optional.  
No attributes.

You can manually define the list of supported languages. Add `<language>` subtag with two letter ISO 639-1 language codes for each language the application supports.

Example
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
    <td>Arabic | Chinese | Cornish | Czech | Dutch | English | French | German | Greek | Hebrew | Hindi | Italian | Japanese | Kazakh | Korean | Polish | Portuguese | Russian | Spanish | Tagalog | Vietnamese</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>{build} / Languages</td>
    <td>en ru de it fr sp dt tr sv da zh el pt cs sk pl id vn no bn fa hu ja ko ms ne ro tl th ar</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Supported Languages</td>
    <td>Arabic | Armenian | Assamese | Azerbaijani | Basque | Bengali | Bulgarian | Catalan | Croatian | Czech | Danish | Dutch | English | Estonian | Farsi | Finnish | French | Galician | Georgian | German | Greek | Gujarati | Hausa | Hebrew | Hindi | Hungarian | Icelandic | Igbo | Indonesian | Irish | Italian | Japanese | Kannada | Kazakh | Khmer | Korean | Lao | Latvian | Lithuanian | Macedonian | Malay | Malayalam | Marathi | Mongolian | Myanmar | Nepali | Norwegian | Oriya | Polish 
 Portuguese | Punjabi | Romanian | Russian | Serbian | Simplified Chinese | Sinhala | Slovakian | Slovenian | Spanish | Spanish_Latin | Swedish | Tamil | Telugu | Thai | Traditional Chinese | Turkish | Ukrainian | Urdu | Uzbek | Vietnamese | Yoruba | Other(s)</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <!--
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
  -->
</table>



#### <a name="requirements-supported-devices"/>requirements/supported-devices

Optional.  
No attributes.

You can manually exclude some devices from the supported device list. Add `<exclude>` tag with device model name (aka [name of the industrial design](http://developer.android.com/reference/android/os/Build.html#DEVICE)) for each device you want to exclude from the compatibility list.

Example
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
    <td>Yes</td
    <!---todo check Alpha,  Beta-->
    <td>APK / PRODUCTION CONFIGURATION / CURRENT APK / Supported devices</td>
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
    <td>Binary File(s) / Device Support</td>
    <td></td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Advanced compatibility options / Enable device selection</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Binary / Selected Device(s)</td>
    <td>Each of the binary files has its own set of Samsung devices</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <!--
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
  -->
</table>


#### <a name="requirements-supported-resolutions"/>requirements/supported-resolutions

Optional.  
Attributes: `only-listed`. 

Most of the stores take this information from the APK file. Some stores also support manual selection of supported screen resolutions. In most cases you do not need to specify this tag because AppDF can provide information about supported screen resolutions even for the stores that cannot extract this information from APK files themselves. Use either `<include>` or `<exclude>` (depending on the `only-listed` attribute value) subtags to define list of the screen resolutions your application supports. 

Example 1
```xml
<supported-resolutions only-listed="yes">
  <include>320x480</include>
  <include>480x800</include>
  <include>540x960</include>
  <include>720x1280</include>
</supported-resolutions>
```

Example 2
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
    <td>yes | no</td>
    <td>Yes</td>
    <td>If value is "yes" then only &lt;include&gt; subtags could be included, if "no" then only &lt;exclude&gt; subtags could be included.</td>
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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Binary / Resolution(s)</td>
    <td>240x320 (LQVGA/QVGA) | 360x640 (QHD) | 480x800 (WVGA) | 240x400 (WQVGA) | 320x320 | 320x480 (HVGA) | 1024x600 (WSVGA) | 1280x800 (WXGA) | 1280x720 (WXGA HD) | 960X540 (WXGA qHD) | 360X480 (LHVGA) | 1080X1920 (FHD) | 1600x2560 (WQXGA) | 1440x2560 (WQHD) | 1024x768 (XGA)</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <!--
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
  -->
</table>

### <a name="testing-instructions"/>testing-instructions

Optional.  
No attributes.  
Maximum length: 4000 characters.

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
    <td>4000 characters</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td
    <!--todo check-->
    <td>Yes???</td>
    <td>App registration instructions</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Certification</td>
    <td>No</td>
    <td>4000 byte</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <!--
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
  -->
</table>

### <a name="consent"/>consent

Optional.  
No attributes.

You must consent with a number of statements in order for your application to be published. This section includes the list of such agreements. There are agreements some stores require you to accept every time you submit an application (not when you register an account).Some stores will not accept your application without this section.  Each subtag corresponds to one of the statements you consent with. Subtag values must always be `yes` if you want your application is accepted by the corresponding stores.

Example
```xml
<consent>
  <google-android-content-guidelines>yes</google-android-content-guidelines>
  <slideme-agreement>yes</slideme-agreement>
  <us-export-laws>yes</us-export-laws>
  <free-from-third-party-copyrighted-content>yes</free-from-third-party-copyrighted-content>
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
    <td>&lt;free-from-third-party-copyrighted-content&gt;</td>
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
    <td>Pricing & Distribution / CONSENT</td>
    <td>Content guidelines &lt;google-android-content-guidelines&gt; (req), US export laws  &lt;us-export-laws&gt; (req),
    Marketing opt-out (Do not promote my application except in Google Play and in any Google-owned online or mobile properties. I understand that any changes to this preference may take sixty days to take effect).</td>
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
    <td>GALAXY Apps</td>
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
  <!--
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
    <td>&lt;free-from-third-party-copyrighted-content&gt;</td>
  </tr>
  -->
</table>

### <a name="customer-support"/>customer-support

Required.  
No attributes.

Example
```xml
<customer-support>
  <email>support@yandex-team.ru</email>
  <phone>+1 (555) 1234-56-78</phone>
  <website>http://www.yandex.ru/support</website>
</customer-support>
```

#### <a name="customer-support-email"/>customer-support/email

Required.  
No attributes.

<table>
  <tr>
    <th>Store support</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Maximum length</th>
    <th>Localizable</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Store Listing / CONTACT DETAILS / Email</td>
    <td>Yes</td>
    <td></td>
    <td>No</td>
    <td>"Please provide an email address where you may be contacted. This address will be publicly displayed with your app." </td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>General / Additional Info / Support e-mail</td>
    <td>No (could be taken from the dev profile)</td>
    <td></td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>General Information / Customer support email address</td>
    <td>Yes</td>
    <td></td>
    <td>No</td>
    <td>Could be taken from default support information.</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>Yes</td>
    <td>Contact Email</td>
    <td>No</td>
    <td></td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Support E-Mail</td>
    <td>Yes</td>
    <td>100 byte</td>
    <td>No</td>
    <td>Could be taken from default support information.</td>
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
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>Yes</td>
    <td>Basic / Support Email</td>
    <td>Yes</td>
    <td></td>
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
    <td></td>
  </tr>
  -->
</table>


#### <a name="customer-support-phone"/>customer-support/phone

Optional.  
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
    <td>Store Listing / CONTACT DETAILS / Phone</td>
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
    <td>GALAXY Apps</td>
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
  <!--
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
  -->
</table>


#### <a name="customer-support-website"/>customer-support/website

Optional.  
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
    <td>Store Listing / CONTACT DETAILS / Website</td>
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
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>App Information / Support URL</td>
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
  <!--
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
  -->
</table>

### <a name="store-specific"/>store-specific

Optional.  
No attributes.

All store specific information is collected in this section. 

Example
```xml
<store-specific>
  <amazon>
    <free-app-of-the-day-eligibility>yes</free-app-of-the-day-eligibility>
    <small-icon>amazon_small_icon.png</small-icon>
    <apply-amazon-drm>yes</apply-amazon-drm>
    <fire-phones-and-tablets-support only-listed="yes">
      <kindle-fire-first-generation>yes</kindle-fire-first-generation>
    </fire-phones-and-tablets-support>
  </amazon>
  <slideme>
    <license-type>Apache License 2.0</license-type>
    <required-third-party-libraries>no</required-third-party-libraries>
    <subsubcategory>Other</subsubcategory>
    <default-language>English (United States)</default-language>
</slideme>
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
    <td>GALAXY Apps</td>
    <td>samsung</td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>nook</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>appslib</td>
  </tr>
  -->
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

#### <a name="store-specific-amazon"/>store-specific/amazon

Optional.  
No attributes.

Example
```xml
<amazon>
  <free-app-of-the-day-eligibility>yes</free-app-of-the-day-eligibility>
  <small-icon>amazon_small_icon.png</small-icon>
  <apply-amazon-drm>yes</apply-amazon-drm>
  <fire-phones-and-tablets-support only-listed="no">
    <kindle-fire-first-generation>yes</kindle-fire-first-generation>
  </fire-phones-and-tablets-support>
  <fire-tv-support only-listed="yes">
    <fire-tv>yes</fire-tv>
  </fire-tv>
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
    <td>small-icon</td>
    <td>Yes</td>
    <td>Images & Mutltimedia / Small icon</td>
    <td>114x114 px, PNG</td>
    <td></td>
  </tr>
  <tr>
    <td>previous-release</td>
    <td>Yes</td>
    <td>Binary File(s) / Has this app already been released?</td>
    <td>if yes: &lt;previously-released month="" day="" year=""/&gt;<br>
    if no: &lt;first-time-released/&gt;</td>
    <td>Google Maps v1 API — Amazon Maps redirection.</td>
  </tr>
  <tr>
    <td>use-amazon-maps-redirection</td>
    <td>Yes</td>
    <td>Binary File(s) / Use Amazon Maps Redirection</td>
    <td>yes | no</td>
    <td>Google Maps v1 API — Amazon Maps redirection. Yes is the default value.</td>
  </tr>
  <tr>
    <td>free-app-of-the-day-eligibility</td>
    <td>No</td>
    <td>Availability & Pricing / Free App of the Day (FAD) eligibility</td>
    <td>yes | no</td>
    <td>If your app is being considered, we will contact you with more detail about the program and what to expect as your app goes through the approval process. The default value is yes.</td>
  </tr>
  <tr>
    <td>apply-amazon-drm</td>
    <td>Yes</td>
    <td>Binary File(s) / Apply Amazon DRM?</td>
    <td>yes | no</td>
    <td>Protect your application from unauthorized use. Without DRM, your app can be used without restrictions by any user. The default value is yes.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/kindle-fire-first-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Kindle Fire (1st Gen)</td>
    <td>yes | no</td>
    <td>Kindle Fire (1st Gen) support.</td>
  </tr>
   <tr>
    <td>fire-phones-and-tablets-support/kindle-fire-second-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Kindle Fire (2nd Gen)</td>
    <td>yes | no</td>
    <td>Kindle Fire (2nd Gen) support.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/kindle-fire-hd-7-second-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Kindle Fire HD 7 (2nd Gen)</td>
    <td>yes | no</td>
    <td>Kindle Fire HD 7 (2nd Gen) support.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/kindle-fire-hd-8-9-second-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Kindle Fire HD 8.9 (2nd Gen)</td>
    <td>yes | no</td>
    <td>Kindle Fire HD 8.9 (2nd Gen) support.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/kindle-fire-hd-7-third-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Kindle Fire HD 7 (3rd Gen)</td>
    <td>yes | no</td>
    <td>Kindle Fire HD 7 (3rd Gen) support.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/kindle-fire-hdx-7-third-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Kindle Fire HDX 7 (3rd Gen)</td>
    <td>yes | no</td>
    <td>Kindle Fire HDX 7 (3rd Gen) support.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/kindle-fire-hdx-8-9-third-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Kindle Fire HDX 8.9 (3rd Gen)</td>
    <td>yes | no</td>
    <td>Kindle Fire HDX 8.9 (3rd Gen) support.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/fire-hd-4-fourth-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Fire HD 6 (4th Gen)</td>
    <td>yes | no</td>
    <td>Fire HD 6 (4th Gen) support.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/fire-hd-7-fourth-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Fire HD 7 (4th Gen)</td>
    <td>yes | no</td>
    <td>Fire HD 7 (4th Gen) support.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/fire-hdx-8-9-fourth-generation</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Fire HDX 8.9 (4th Gen)</td>
    <td>yes | no</td>
    <td>Fire HDX 8.9 (4th Gen) support.</td>
  </tr>
  <tr>
    <td>fire-phones-and-tablets-support/fire-phone</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire Phones and Tablets / Amazon Fire Phone</td>
    <td>yes | no</td>
    <td>Amazon Fire Phone support.</td>
  </tr>
  <tr>
    <td>fire-tv-support/fire-tv</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire TV / Amazon Fire TV</td>
    <td>yes | no</td>
    <td>Fire TV support.</td>
  </tr>
  <tr>
    <td>fire-tv-support/fire-tv-stick</td>
    <td>Yes</td>
    <td>Binary File(s) / Device Support / Amazon Fire TV / Fire TV Stick</td>
    <td>yes | no</td>
    <td>Fire TV Stick support.</td>
  </tr>
</table>

#### <a name="store-specific-slideme"/>store-specific/slideme

Optional.  
No attributes.

Example
```xml
<slideme>
  <license-type>Apache License 2.0</license-type>
  <required-third-party-libraries>no</required-third-party-libraries>
  <subsubcategory>Other</subsubcategory>
  <default-language>English (United States)</default-language>
</slideme>
```

<table>
  <tr>
    <th>Tag</th>
    <th>Required</th>
    <th>Possible values</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>license-type</td>
    <td>Yes</td>
    <td>All Rights Reserved | Apache License 2.0 | Commercial Royalty-Free | Common Development and Distribution License (CDDL) | Eclipse Public License (EPL) | FREE Licensed Closed Source - Public Domain | GNU AFFERO GENERAL PUBLIC LICENSE (AGPL) v3 | GNU General Public License (GPL) v2 | GNU General Public License (GPL) v3 | GNU Library General Public License (LGPL) | GNU Library General Public License (LGPL)  v3 | Mozilla Public License 1.1 (MPL) | New BSD License | Other / Proprietary | The MIT License</td>
    <td>Default value is "All Rights Reserved"</td>
  </tr>
    <tr>
    <td>required-third-party-libraries</td>
    <td>Yes</td>
    <td>yes | no</td>
    <td>Select Yes if the application requires third-party libraries (e.g. non-preloaded libraries).<br>Default value is "no".</td>
  </tr>
  </tr>
    <tr>
    <td>subsubcategory</td>
    <td>Depends on a subcategory</td>
    <td>Finance/Corporate/ <b><i>Budgeting | Investments | Tax | Other</i></b>
<br>Finance/Personal/ <b><i>Budgeting | Investments | Tax | Other
<br>Fun & Games/Action/ <b><i>Hack-And-Slash | Platformer | Rail Shooter | Shooter | Third-Person Shooter | Thriller | Other</i></b>
<br>Fun & Games/Adventure/ <b><i>Roleplaying | Third Person Shooter | Other</i></b>
<br>Fun & Games/Arcade/ <b><i>Shooter | Fighting | Flight | Hack-And-Slash | Racing | Rail Shooter | Third Person Shooter | Other</i></b>
<br>Fun & Games/Cards & Casino/ <b><i>Betting | Blackjack | Bridge | Euchre | Freecell | Gin | Hearts | Poker | Rummy | Slots | Solitaire | Spades | Other</i></b>
<br>Fun & Games/Casual/ <b><i>Physics-Based | Social Gaming | Other</i></b>
<br>Fun & Games/Educational/ <b><i>Arithmetic | Geography | Grammar | Kids | Science | Other</i></b>
<br>Fun & Games/Multiplayer/ <b><i>Online Roleplaying | Social Gaming | Other</i></b>
<br>Fun & Games/Music/ <b><i>Karaoke | Party | Rhythm | Simulation | Other</i></b>
<br>Fun & Games/Puzzle/ <b><i>Hidden Object | Jigsaw | Physics | Pictures | Sokoban | Sudoku | Trivia | Words | Other</i></b>
<br>Fun & Games/Racing/ <b><i>Arcade Racing | Betting | Dog | Horse | Simulation Racing | Other</i></b>
<br>Fun & Games/Role Playing/ <b><i>Action Rpg | Mmorpg | Social Rpg | Other</i></b>
<br>Fun & Games/Sports/ <b><i>Basketball | Cricket | Football | Soccer | Swimming | Other</i></b>
<br>Fun & Games/Strategy/ <b><i>Moba | Realtime Strategy | Simulation | Tower Defense | Other</i></b>
<br>Home & Hobby/Cooking/ <b><i>African | Arabic | Asian | Chinese | French | Fusion | Greek | International | Italian | Japanese | Mediterranean | Mexican | Middle East | Oriental | Thai | Vietnamese | Other</i></b>
<br>Home & Hobby/Shopping/ <b><i>Beauty | Decoration | Fashion | Gadgets | Knitting | Sports | Other</i></b>
<br>Music/Instruments/ <b><i>Drums | Piano | Other</i></b>
<br>News & Weather/News/ vPolitics | Sports | Technology | Other</i></b>
<br>News & Weather/Weather/ <b><i>Local Forecast | Widget | Other</i></b>
<br>Publications/Comics/ <b><i>Comic Book | Comic Strip | Comix | Doujinshi | Graphic Novel | Manga | Motion Comic | Other</i></b>
<br>Publications/E-books/ <b><i>Biography | Business | Children | Cooking | Fantasy | Fiction | Health | History | Humor | Lifestyle | Mystery | Non-Fiction | Parenting | Politics | Reference | Religion | Romance | Science | Sports | Technology | Travel | Other</i></b>
<br>Publications/Magazines/ <b><i>Beauty | Cooking | Fashion | Gadgets | Knitting | Photography | Sports | Other</i></b>
<br>Themes/Live Wallpapers/ <b><i>Animation | Fantasy | Holidays | Nature | Sports | Other</i></b>
<br>Themes/Wallpapers/ <b><i>Fantasy | Holidays | Nature | Sports | Other</i></b>
<br>Tools & Utilities/Security/ <b><i>Ad Scanning | Antivirus | Other</i></b>
<br>Travel & Locality/Navigation/ <b><i>GPS | Maps | Other</i></b></td>
    <td>Default value is "Other".</td>
  </tr>
  <tr>
    <td>default-language</td>
    <td>Yes</td>
    <td>Afrikaans |
Afrikaans (Namibia) |
Afrikaans (South Africa) |
Akan |
Akan (Ghana) |
Albanian |
Albanian (Albania) |
Amharic |
Amharic (Ethiopia) |
Arabic |
Arabic (Algeria) |
Arabic (Bahrain) |
Arabic (Egypt) |
Arabic (Iraq) |
Arabic (Israel) |
Arabic (Jordan) | 
Arabic (Kuwait) |
Arabic (Lebanon) |
Arabic (Libya) |
Arabic (Morocco) |
Arabic (Oman) |
Arabic (Qatar) |
Arabic (Saudi Arabia) |
Arabic (Sudan) |
Arabic (Syria) |
Arabic (Tunisia) |
Arabic (United Arab Emirates) |
Arabic (Yemen) |
Armenian |
Armenian (Armenia) |
Assamese |
Assamese (India) |
Asu |
Asu (Tanzania) |
Azerbaijani |
Azerbaijani (Cyrillic) |
Azerbaijani (Cyrillic, Azerbaijan) |
Azerbaijani (Latin) |
Azerbaijani (Latin, Azerbaijan) |
Bambara |
Bambara (Mali) |
Basque |
Basque (Spain) |
Belarusian |
Belarusian (Belarus) |
Bemba |
Bemba (Zambia) |
Bena |
Bena (Tanzania) |
Bengali |
Bengali (Bangladesh) |
Bengali (India) |
Bosnian |
Bosnian (Bosnia and Herzegovina) |
Bulgarian |
Bulgarian (Bulgaria) |
Burmese |
Burmese (Myanmar [Burma]) |
Catalan |
Catalan (Spain) |
Central Morocco Tamazight |
Central Morocco Tamazight (Latin) |
Central Morocco Tamazight (Latin, Morocco) |
Cherokee |
Cherokee (United States) |
Chiga |
Chiga (Uganda) |
Chinese |
Chinese (China) |
Chinese (Hong Kong SAR China) |
Chinese (Simplified Han) |
Chinese (Simplified Han, China) |
Chinese (Simplified Han, Hong Kong SAR China) |
Chinese (Simplified Han, Macau SAR China) |
Chinese (Simplified Han, Singapore) |
Chinese (Taiwan) |
Chinese (Traditional Han) |
Chinese (Traditional Han, Hong Kong SAR China) |
Chinese (Traditional Han, Macau SAR China) |
Chinese (Traditional Han, Taiwan) |
Cornish |
Cornish (United Kingdom) |
Croatian |
Croatian (Croatia) |
Czech |
Czech (Czech Republic) |
Danish |
Danish (Denmark) |
Dutch |
Dutch (Belgium) |
Dutch (Netherlands) |
Embu |
Embu (Kenya) |
 selected=English |
English (American Samoa) |
English (Australia) |
English (Belgium) |
English (Belize) |
English (Botswana) |
English (Canada) |
English (Guam) |
English (Hong Kong SAR China) |
English (India) |
English (Ireland) |
English (Jamaica) |
English (Malta) |
English (Marshall Islands) |
English (Mauritius) |
English (Namibia) |
English (New Zealand) |
English (Northern Mariana Islands) |
English (Pakistan) |
English (Philippines) |
English (Singapore) |
English (South Africa) |
English (Trinidad and Tobago) |
English (U.S. Minor Outlying Islands) |
English (U.S. Virgin Islands) |
English (United Kingdom) |
English (United States) |
English (United States, Computer) |
English (Zimbabwe) |
Esperanto |
Estonian |
Estonian (Estonia) |
Ewe |
Ewe (Ghana) |
Ewe (Togo) |
Faroese |
Faroese (Faroe Islands) |
Filipino |
Filipino (Philippines) |
Finnish |
Finnish (Finland) |
French |
French (Belgium) |
French (Benin) |
French (Burkina Faso) |
French (Burundi) |
French (Cameroon) |
French (Canada) |
French (Central African Republic) |
French (Chad) |
French (Comoros) |
French (Congo - Brazzaville) |
French (Congo - Kinshasa) |
French (Côte d’Ivoire) |
French (Djibouti) |
French (Equatorial Guinea) |
French (France) |
French (Gabon) |
French (Guadeloupe) |
French (Guinea) |
French (Luxembourg) |
French (Madagascar) |
French (Mali) |
French (Martinique) |
French (Monaco) |
French (Niger) |
French (Réunion) |
French (Rwanda) |
French (Saint Barthélemy) |
French (Saint Martin) |
French (Senegal) |
French (Switzerland) |
French (Togo) |
Fulah |
Fulah (Senegal) |
Galician |
Galician (Spain) |
Ganda |
Ganda (Uganda) |
Georgian |
Georgian (Georgia) |
German |
German (Austria) |
German (Belgium) |
German (Germany) |
German (Liechtenstein) |
German (Luxembourg) |
German (Switzerland) |
Greek |
Greek (Cyprus) |
Greek (Greece) |
Gujarati |
Gujarati (India) |
Gusii |
Gusii (Kenya) |
Hausa |
Hausa (Latin) |
Hausa (Latin, Ghana) |
Hausa (Latin, Niger) |
Hausa (Latin, Nigeria) |
Hawaiian |
Hawaiian (United States) |
Hebrew |
Hebrew (Israel) |
Hebrew (legacy iw locale) |
Hindi |
Hindi (India) |
Hungarian |
Hungarian (Hungary) |
Icelandic |
Icelandic (Iceland) |
Igbo |
Igbo (Nigeria) |
Indonesian |
Indonesian (Indonesia) |
Indonesian (legacy in code) |
Irish |
Irish (Ireland) |
Italian |
Italian (Italy) |
Italian (Switzerland) |
Japanese |
Japanese (Japan) |
Kabuverdianu |
Kabuverdianu (Cape Verde) |
Kabyle |
Kabyle (Algeria) |
Kalaallisut |
Kalaallisut (Greenland) |
Kalenjin |
Kalenjin (Kenya) |
Kamba |
Kamba (Kenya) |
Kannada |
Kannada (India) |
Kazakh |
Kazakh (Cyrillic) |
Kazakh (Cyrillic, Kazakhstan) |
Khmer |
Khmer (Cambodia) |
Kikuyu |
Kikuyu (Kenya) |
Kinyarwanda |
Kinyarwanda (Rwanda) |
Konkani |
Konkani (India) |
Korean |
Korean (South Korea) |
Koyra Chiini |
Koyra Chiini (Mali) |
Koyraboro Senni |
Koyraboro Senni (Mali) |
Langi |
Langi (Tanzania) |
Latvian |
Latvian (Latvia) |
Lithuanian |
Lithuanian (Lithuania) |
Luo |
Luo (Kenya) |
Luyia |
Luyia (Kenya) |
Macedonian |
Macedonian (Macedonia) |
Machame |
Machame (Tanzania) |
Makonde |
Makonde (Tanzania) |
Malagasy |
Malagasy (Madagascar) |
Malay |
Malay (Brunei) |
Malay (Malaysia) |
Malayalam |
Malayalam (India) |
Maltese |
Maltese (Malta) |
Manx |
Manx (United Kingdom) |
Marathi |
Marathi (India) |
Masai |
Masai (Kenya) |
Masai (Tanzania) |
Meru |
Meru (Kenya) |
Morisyen |
Morisyen (Mauritius) |
Nama |
Nama (Namibia) |
Nepali |
Nepali (India) |
Nepali (Nepal) |
North Ndebele |
North Ndebele (Zimbabwe) |
Norwegian |
Norwegian Bokmål |
Norwegian Bokmål (Norway) |
Norwegian Nynorsk |
Norwegian Nynorsk (Norway) |
Nyankole |
Nyankole (Uganda) |
Oriya |
Oriya (India) |
Oromo |
Oromo (Ethiopia) |
Oromo (Kenya) |
Pashto |
Pashto (Afghanistan) |
Persian |
Persian (Afghanistan) |
Persian (Iran) |
Polish |
Polish (Poland) |
Portuguese |
Portuguese (Brazil) |
Portuguese (Guinea-Bissau) |
Portuguese (Mozambique) |
Portuguese (Portugal) |
Punjabi |
Punjabi (Arabic) |
Punjabi (Arabic, Pakistan) |
Punjabi (Gurmukhi) |
Punjabi (Gurmukhi, India) |
Romanian |
Romanian (Moldova) |
Romanian (Romania) |
Romansh |
Romansh (Switzerland) |
Rombo |
Rombo (Tanzania) |
Russian |
Russian (Moldova) |
Russian (Russia) |
Russian (Ukraine) |
Rwa |
Rwa (Tanzania) |
Samburu |
Samburu (Kenya) |
Sango |
Sango (Central African Republic) |
Sena |
Sena (Mozambique) |
Serbian |
Serbian (Cyrillic) |
Serbian (Cyrillic, Bosnia and Herzegovina) |
Serbian (Cyrillic, Montenegro) |
Serbian (Cyrillic, Serbia) |
Serbian (Latin) |
Serbian (Latin, Bosnia and Herzegovina) |
Serbian (Latin, Montenegro) |
Serbian (Latin, Serbia) |
Shona |
Shona (Zimbabwe) |
Sichuan Yi |
Sichuan Yi (China) |
Sinhala |
Sinhala (Sri Lanka) |
Slovak |
Slovak (Slovakia) |
Slovenian |
Slovenian (Slovenia) |
Soga |
Soga (Uganda) |
Somali |
Somali (Djibouti) |
Somali (Ethiopia) |
Somali (Kenya) |
Somali (Somalia) |
Spanish |
Spanish (Argentina) |
Spanish (Bolivia) |
Spanish (Chile) |
Spanish (Colombia) |
Spanish (Costa Rica) |
Spanish (Dominican Republic) |
Spanish (Ecuador) |
Spanish (El Salvador) |
Spanish (Equatorial Guinea) |
Spanish (Guatemala) |
Spanish (Honduras) |
Spanish (Latin America) |
Spanish (Mexico) |
Spanish (Nicaragua) |
Spanish (Panama) |
Spanish (Paraguay) |
Spanish (Peru) |
Spanish (Puerto Rico) |
Spanish (Spain) |
Spanish (United States) |
Spanish (Uruguay) |
Spanish (Venezuela) |
Swahili |
Swahili (Kenya) |
Swahili (Tanzania) |
Swedish |
Swedish (Finland) |
Swedish (Sweden) |
Swiss German |
Swiss German (Switzerland) |
Tachelhit |
Tachelhit (Latin) |
Tachelhit (Latin, Morocco) |
Tachelhit (Tifinagh) |
Tachelhit (Tifinagh, Morocco) |
Tagalog |
Taita |
Taita (Kenya) |
Tamil |
Tamil (India) |
Tamil (Sri Lanka) |
Telugu |
Telugu (India) |
Teso |
Teso (Kenya) |
Teso (Uganda) |
Thai |
Thai (Thailand) |
Tibetan |
Tibetan (China) |
Tibetan (India) |
Tigrinya |
Tigrinya (Eritrea) |
Tigrinya (Ethiopia) |
Tonga |
Tonga (Tonga) |
Turkish |
Turkish (Turkey) |
Ukrainian |
Ukrainian (Ukraine) |
Urdu |
Urdu (India) |
Urdu (Pakistan) |
Uzbek |
Uzbek (Arabic) |
Uzbek (Arabic, Afghanistan) |
Uzbek (Cyrillic) |
Uzbek (Cyrillic, Uzbekistan) |
Uzbek (Latin) |
Uzbek (Latin, Uzbekistan) |
Vietnamese |
Vietnamese (Vietnam) |
Vunjo |
Vunjo (Tanzania) |
Welsh |
Welsh (United Kingdom) |
Yoruba |
Yoruba (Nigeria) |
Zulu |
Zulu (South Africa)</td>
    <td>Default value is "English (United States)".</td>
  </tr>
</table>

### <a name="in-app-purchases"/>in-app-purchases

Optional.  
No attributes.  

This section describes in-app products that can be paid at once - items (`<item>`) and in-app products that are paid periodically with a specified period of time - subscriptions (`<subscription>`).


Example
```xml
<in-app-purchases>
    <item published="yes" type="nonconsumable">
        <id>org.onepf.sample.trivialdrive.sku_premium</id>
        <description>
            <title>Red skin</title>
            <text>Cool red skin for your car.</text>
            <!--Optional:-->
            <small-icon height="135" width="135">images/en/sku_res_skin_small_icon.png
            </small-icon>
            <!--Optional:-->
            <large-icon height="512" width="512">images/en/sku_res_skin_large_icon.png
            </large-icon>
            <store-specific>
                <!--Optional:-->
                <amazon>
                    <additional-file-delivered>no</additional-file-delivered>
                    <small-icon height="114" width="114">
                        images/en/amazon/sku_res_skin_small_icon.png
                    </small-icon>
                    <large-icon height="512" width="512">
                        images/en/amazon/sku_res_skin_large_icon.png
                    </large-icon>
                    <calculated-prices>yes</calculated-prices>
                </amazon>
                <!--Optional:-->
                <slideme>
                    <test-mode>success</test-mode>
                </slideme>
            </store-specific>
        </description>
        <!--Optional:-->
        <description-localization locale="ru_RU">
            <title>Красный скин</title>
            <text>Классный красный скин для вашей машины.</text>
            <!--Optional:-->
            <small-icon height="135" width="135">images/ru/sku_res_skin_icon.png
            </small-icon>
            <!--Optional:-->
            <large-icon height="512" width="512">images/ru/sku_res_skin_image.png
            </large-icon>
            <store-specific>
                <!--Optional:-->
                <amazon>
                    <additional-file-delivered>no</additional-file-delivered>
                    <small-icon height="114" width="114">
                        images/ru/amazon/sku_res_skin_small_icon.png
                    </small-icon>
                    <large-icon height="512" width="512">
                        images/ru/amazon/sku_res_skin_large_icon.png
                    </large-icon>
                    <calculated-prices>yes</calculated-prices>
                </amazon>
                <!--Optional:-->
                <slideme>
                    <license-type>Apache License 2.0</license-type>
  		    <required-third-party-libraries>no</required-third-party-libraries>
                    <subsubcategory>Other</subsubcategory>
                    <default-language>English (United States)</default-language>
                </slideme>
            </store-specific>
        </description-localization>
        <price>
            <base-price>1.00</base-price>
            <!--Optional:-->
            <local-price country="RU">1.00</local-price>
        </price>
    </item>
    <subscription published="yes">
        <id>org.onepf.sample.trivialdrive.sku_infinite_gas</id>
        <subs-period>oneMonth</subs-period>
        <!--Optional:-->
        <trial-period>7</trial-period>
        <description>
            <title>Some gas</title>
            <text>Some gas to drive your car.</text>
            <!--Optional:-->
            <small-icon height="135" width="135">images/en/sku_infinite_gas_icon.png
            </small-icon>
            <!--Optional:-->
            <large-icon height="512" width="512">images/en/sku_infinite_gas_image.png
            </large-icon>
        </description>
        <!--Optional:-->
        <description-localization locale="ru_RU">
            <title>Топливо</title>
            <text>Топливо для поездки.</text>
            <!--Optional:-->
            <small-icon height="135" width="135">images/ru/sku_infinite_gas_icon.png
            </small-icon>
            <!--Optional:-->
            <large-icon height="512" width="512">images/ru/sku_infinite_gas_image.png
            </large-icon>
        </description-localization>
        <price>
            <base-price>2.00</base-price>
            <!--Optional:-->
            <local-price country="RU">2.00</local-price>
        </price>
    </subscription>
</in-app-purchases>
```

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Items supported</th>
    <th>Subs supported</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>In-app Products</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>In-App purchases</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>In-App Items</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>Opera Mobile Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>In app purchase</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Manage IAP</td>
    <td>Yes</td>
    <td>No</td>
  </tr>
</table>  


### <a name="in-app-purchases-section-structure">In-app Section Structure

* [in-app-purchases](#in-app-purchases)
	* [item | subscription](#in-app-item--sub)
		* [Attributes](#in-app-item--sub-attrs)
			* [Common attributes for item and subscription](#in-app-item--sub-attrs-common)
				* [published](#in-app-item--sub-attrs-common-published)
			* [Item-specific attributes](#in-app-item--sub-attrs-item-spec)
				* [type](#in-app-item--sub-attrs-item-spec-type)
		* [id](#in-app-item--sub-id)
		* [description](#in-app-item--sub-desc)
			* [title](#in-app-item--sub-title)
			* [text](#in-app-item--sub-desc-text)
			* [small-icon](#in-app-item--sub-desc-small-icon)
			* [large-icon](#in-app-item--sub-desc-large-icon)
			* [store-specific](#in-app-item--sub-desc-store-spec)
				* [amazon](#in-app-item--sub-desc-store-spec-amazon)
				* [slideme](#in-app-item--sub-desc-store-spec-slideme)
		* [description-localization](#in-app-item--sub-desc-store-spec-desc-loc)
		* [price](#in-app-item--sub-price)
			* [free](#in-app-item--sub-price-attrs-free)
			* [base-price](#in-app-item--sub-price-base-price)
			* [local-price](#in-app-item--sub-price-local-price)
				* [country](#in-app-item--sub-price-local-price)
		* [subscription-specific elements](#in-app-item--sub-sub-spec-elements)
			* [subs-period](#in-app-item--sub-sub-spec-elements-subs-period)
			* [trial-period](#in-app-item--sub-sub-spec-elements-trial-period)
			
			
#### <a name="in-app-item--sub"/>item | subscription

#### <a name="in-app-item--sub-attrs"/>Attributes

##### <a name="in-app-item--sub-attrs-common"/>Common attributes for item and subscription

The following attributes are common for `<item>` and `<subscription>` elements.

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>published</td>
    <td>yes | no</td>
    <td>Yes</td>
    <td>Is the in-app product published or not (is it visible to the end users).</td>
  </tr>
</table>

###### <a name="in-app-item--sub-attrs-common-published"/>published

Is the in-app product active or not.

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>In-app Products / In-app Products / Status</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>In-App purchases / (In)active purchases</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Managed IAP / Published</td>
    <td>(un)checked checkbox</td>
  </tr>
</table>

##### <a name="in-app-item--sub-attrs-item-spec"/>Item-specific attributes

The following attributes are `<item>`-specific.

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
   <tr>
    <td>type</td>
    <td>consumable |  nonconsumable</td>
    <td>Yes</td>
    <td>Is the in-app product consumable or not.</td>
  </tr>
</table>


###### <a name="in-app-item--sub-attrs-item-spec-type"/>type

Type of the in-app product. Can be ``consumable`` and ``non-consumable``. ``Consumable`` can be purchased the infinite number of times, e.g. tips, lives, power, etc. ``Non-consumable`` can be purchased only once, e.g. a level in a game, a text of a book, etc.

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Possible values</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Managed product | Unmanaged product</td>
    <td>Unmanaged products behave differently if you are using in-app billing v3 rather than in-app billing v2. If you are using in-app billing v3, Unmanaged products are treated as Managed products and will need to be explicitly consumed.</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Purchase</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>Consumable | Entitlement</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>Consumable | Non-consumable</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Consumable</td>
    <td></td>
  </tr>
</table>


### <a name="in-app-item--sub-id"/>id  

Required.  
No attributes.  
Max length: 139 characters.  

Regexp to describe: ([a-z]|[0-9]){1}[a-z0-9._]*  
Unique identifier of the in-app product. Also known as `SKU`, store keeping unit. Non-localizable.

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Requirements</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>In-app Products / Add new product / Product ID</td>
    <td>Yes</td>
    <td>Max 139 characters. An ID should be composed of lower-case letters(a-z), numbers(0-9), underline(_) and dot(.). It should also start with lower-case letters or numbers.</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>New In-App Purchase / ID</td>
    <td>Yes</td>
    <td>The in-app ID can contain only characters from a to z, numbers, dots or underscocres and can begin from character or number.</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>In-App Items / General Information / SKU</td>
    <td>Yes</td>
    <td>SKU may be 150 characters or less and contain only alphanumeric, dash, dot, or underscore characters.</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>In App Purchase / Add Item / Item ID</td>
    <td>Yes</td>
    <td>English characters, numbers, and special characters (.-_)</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Product ID</td>
    <td>Yes</td>
    <td>No requirements.</td>
  </tr>
</table>  

Example 1

```xml
<id>org.onepf.sample.trivialdrive.sku_infinite_gas</id>
```

Example 2

```xml
<id>sku1</id>
```

### <a name="in-app-item--sub-desc"/>description 

Required.  
No attributes. 

This section has the same structure for `<item>` and `<subscription>`.

The section contains in-app description in text form as well as pictures in English US language. A part of the main <description> tag there could be several <description-localization> tags for different languages. If some information is missing in the localized <description-localization> tag it will be taken from the default <description-base> section.

Example  
```xml
<description>
    <title>Red skin</title>
    <text>Cool red skin for your car.</text>
    <!--Optional:-->
    <small-icon height="135" width="135">images/en/sku_res_skin_small_icon.png
    </small-icon>
    <!--Optional:-->
    <large-icon height="512" width="512">images/en/sku_res_skin_large_icon.png
    </large-icon>
    <store-specific>
        <!--Optional:-->
        <amazon>
            <additional-file-delivered>no</additional-file-delivered>
            <small-icon height="114" width="114">
                images/en/amazon/sku_res_skin_small_icon.png
            </small-icon>
            <large-icon height="512" width="512">
                images/en/amazon/sku_res_skin_large_icon.png
            </large-icon>
            <calculated-prices>yes</calculated-prices>
        </amazon>
        <!--Optional:-->
        <slideme>
            <test-mode>success</test-mode>
        </slideme>
    </store-specific>
</description>
```

#### <a name="in-app-item--sub-title"/>description/title

Required.  
No attributes.  
Min length: 1 character.  

The in-app title is used a human-readable id of an in-app item.  
As everything inside the <description> tag can be localized using <description-localization> section. Different stores have different requirements for maximum title length. In order to have flexibility to get the best from each of the stores you can include several copies of title tag. The store will take the longest one that is fits in its maximum size. The first title must be 55 symbols or longer in order to be supported by all the stores.

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Max length</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Managed product details / Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>55 characters</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Purchase / Name</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>In-App Items / Description / Display Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>250 characters</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>In App Purchase / Item Title</td>
    <td>Yes</td>
    <td>No</td>
    <td>100 byte</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Manage IAP / Title</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
  </tr>
</table>

#### <a name="in-app-item--sub-desc-text"/>description/text  

Required.  
No attributes.  
Min length: 1 character.

In-app text description is used to describe the product. Different stores have different requirements for maximum description length. In order to have flexibility to get the best from each of the stores you can include several copies of text tag. The store will take the longest one that fits in its maximum size. As everything inside the <description> tag can be localized using <description-localization> section. The first text tag value must be 80 symbols or longer in order to be supported by all the stores.

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Max length</th>
    <th>Comments</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>Managed product details / Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>80 characters</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>Purchase / Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Unlimited</td>
    <td></td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>In-App Items / Description / Description</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>1200 characters</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>In App Purchase / Description</td>
    <td>Yes</td>
    <td></td>
    <td>1000 byte</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>Existed only for translations as "Product Description"</td>
  </tr>
</table>

#### <a name="in-app-item--sub-desc-small-icon"/>description/small-icon

Optional.  
Attributes: `width`, `height`.  

Small in-app icon. Must be in PNG format. As everything inside the `<description>` tag it can be localized using `<description-localization>` section. Different stores require different resolutions of this icon. You can include several versions of the `<small-icon>` tag with different `width` and `height` attributes. The store will automatically select right size. AppDF will automatically rescale your image if there is no needed size. The icon must be a square (`width`=`height`).

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>width</td>
    <td>A positive integer</td>
    <td>Yes</td>
    <td>The store selects the small icon in the most appropriate size. The first icon must be 135x135, PNG.</td>
  </tr>
  <tr>
    <td>height</td>
    <td>A positive integer</td>
    <td>Yes</td>
    <td>The store selects the app icon in the most appropriate size. The first icon must be 135x135, PNG.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Size</th>
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
    <td>In-App Items  / Images / Small icon</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>114x114 px, PNG</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>In App Purchase / Item Image</td>
    <td>No</td>
    <td>No</td>
    <td>135x135 px, JPG/GIF (under 500 KB)</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>

#### <a name="in-app-item--sub-desc-large-icon"/>description/large-icon

Optional.  
Attributes: `width`, `height`.   

Large in-app icon. Must be in PNG format. As everything inside the `<description>` tag it can be localized using `<description-localization>` section. Different stores require different resolutions of this icon. You can include several versions of the `<large-icon>` tag with different `width` and `height` attributes. The store will automatically select right size. AppDF will automatically rescale your image if there is no needed size. The icon must be a square (`width`=`height`).

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>width</td>
    <td>A positive integer</td>
    <td>Yes</td>
    <td>The store selects the large icon in the most appropriate size. The first icon must be 512x512, PNG.</td>
  </tr>
  <tr>
    <td>height</td>
    <td>A positive integer</td>
    <td>Yes</td>
    <td>The store selects the large icon in the most appropriate size. The first icon must be 512x512, PNG.</td>
  </tr>
</table>


<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Required</th>
    <th>Localizable</th>
    <th>Size</th>
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
    <td>In-App Items  / Images / Large icon</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>512x512 px, PNG</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
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
</table>

#### <a name="in-app-item--sub-desc-store-spec"/>description/store-specific  

Optional.  
No attributes.

All store specific information is collected in this section.  

Example
```xml
<store-specific>
  <amazon>
    <additional-file-delivered>yes</additional-file-delivered>
  </amazon>
  <slideme>
    <test-mode>disabled</test-mode> 
  </slideme>
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
    <td>Yandex.Store</td>
    <td>yandex</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>slideme</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>samsung</td>
  </tr>
  <!--
  <tr>
    <td>NOOK apps</td>
    <td>nook</td>
  </tr>
  <tr>
    <td>AppsLib</td>
    <td>appslib</td>
  </tr>
  -->
</table>

Each store subtag can replace any of the non-store specific parameters from the`<description>` tag. For example if we want to use another title for for the in-app for Amazon AppStore we can include the following code:
```xml
<store-specific>
  <amazon>
    <title>Really red skin.</title>
  </amazon>
</store-specific>
```

There are also some optional and required store specific parameters you can/must use if you want that your AppDF file is supported by the corresponding store.

##### <a name="in-app-item--sub-desc-store-spec-amazon"/>description/store-specific/amazon

Optional.  
No attributes.

All Amazon Appstore - specific information is collected in this section.

<table>
 <tr>
    <th>Tag</th>
    <th>Required</th>
    <th>Amazon name</th>
    <th>Possible values</th>
    <th>Comments</th>
 </tr>
 <tr>
    <td>additional-file-delivered</td>
    <td>Yes</td>
    <td>General Information / Content delivery</td>
    <td>yes | no</td>
    <td>This element describes whether you'll deliver additional assets after purchasing or not.</td>
  </tr>
  <tr>
    <td>small-icon</td>
    <td>Yes</td>
    <td>Images / Small icon</td>
    <td>PNG icon</td>
    <td>The icon must be 114x114, PNG.</td>
  </tr>
  <tr>
    <td>large-icon</td>
    <td>Yes</td>
    <td>Images / Large icon</td>
    <td>PNG icon</td>
    <td>The icon must be 512x512, PNG.</td>
  </tr>
</table> 
 
 
##### <a name="in-app-item--sub-desc-store-spec-slideme"/>description/store-specific/slideme

Optional.  
No attributes.

All SlideME-specific information is collected in this section.  

<table>
 <tr>
    <th>Tag</th>
    <th>Required</th>
    <th>Amazon name</th>
    <th>Possible values</th>
    <th>Comments</th>
 </tr>
 <tr>
    <td>test-mode</td>
    <td>Yes</td>
    <td>Test mode</td>
    <td>disabled | success | failure</td>
    <td>Test mode to check the app behaviour under different scenarios.</td>
  </tr>
</table> 

### <a name="in-app-item--sub-desc-store-spec-desc-loc"/>description-localization

Required.  
Attributes: `locale`.  

This section contains in-app description in text form as well as pictures and videos in different languages.  

Example  

```xml
<description-localization locale="ru_RU">
    <title>Красный скин</title>
    <text>Классный красный скин для вашей машины.</text>
    <!--Optional:-->
    <small-icon height="135" width="135">images/ru/sku_res_skin_icon.png
    </small-icon>
    <!--Optional:-->
    <large-icon height="512" width="512">images/ru/sku_res_skin_image.png
    </large-icon>
    <store-specific>
        <!--Optional:-->
        <amazon>
            <additional-file-delivered>no</additional-file-delivered>
            <small-icon height="114" width="114">
                images/ru/amazon/sku_res_skin_small_icon.png
            </small-icon>
            <large-icon height="512" width="512">
                images/ru/amazon/sku_res_skin_large_icon.png
            </large-icon>
            <calculated-prices>yes</calculated-prices>
        </amazon>
        <!--Optional:-->
        <slideme>
            <test-mode>success</test-mode>
        </slideme>
    </store-specific>
</description-localization>
```

### <a name="in-app-item--sub-price"/>price

Required.  
Attributes: `free`.   

This section describes whether the in-app is free or paid and if paid what its price is.

###### <a name="in-app-item--sub-price-attrs-free"/>free

<table>
  <tr>
    <th>Attribute</th>
    <th>Possible values</th>
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>free</td>
    <td>yes | no</td>
    <td>No</td>
    <td>Default value is "no". Currently only Amazon Appstore supports this option in the raw.</td>
  </tr>
</table>

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>0.0 can be set as the price</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>No</td>
    <td></td>
    <td>No</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td>No</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>In-App Items / Availability & Pricing / Are you charging for this consumable?</td>
    <td>Yes (the box changes to free automatically)</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>No</td>
    <td></td>
    <td>Yes</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td>Yes</td>
  </tr>
</table>  

Example
```xml
<price>
    <base-price>2.00</base-price>
    <!--Optional:-->
    <local-price country="RU">2.00</local-price>
</price>
```

#### <a name="in-app-item--sub-price-base-price"/>price/base-price

Required.  
No attributes.  

In-app price. Tag value should be a dot-separated number. This price is set in USD used to automatically calculate the prices in other currencies unless you manually specify such prices using `<local-price>` tags.

This tag is ignored for free in-apps.

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
    <td>In-app Products / Pricing  / Default price</td>
    <td>Depends on???</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>In-App purchases / (In)active purchases / Price</td>
    <td>Yes</td>
    <td>http://api.yandex.com/store/doc/pricing.xml</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>In-App Items / Availability & Pricing / Yes, my base list price is...</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>In App Purchase / Price</td>
    <td>Yes???</td>
    <td></td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>Yes</td>
    <td>Manage IAP / Price</td>
    <td>Yes</td>
    <td></td>
  </tr>
</table>

#### <a name="in-app-item--sub-price-local-price"/>price/local-price

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
    <th>Required</th>
    <th>How it works</th>
  </tr>
  <tr>
    <td>country</td>
    <td>two letter ISO 3166-1 country code, see the list in <a href="http://www.onepf.org/appdf/data/countries.json">JSON</a> or <a href="data/countries.xml">XML</a> formats.</td>
    <td>Yes</td>
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
    <td>In-app Products / PRICING / Local prices</td>
    <td>Depends on</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>No</td>
    <td></td>
    <td></td>
    <td>http://api.yandex.com/store/doc/pricing.xml</td>
  </tr>
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>In-App Items / Availability & Pricing / Calculated prices</td>
    <td>No</td>
    <td></td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>In App Purchase / Country</td>
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
</table>

### <a name="in-app-item--sub-sub-spec-elements"/>subscription-specific elements

#### <a name="in-app-item--sub-sub-spec-elements-subs-period"/>subs-period  

Required.  
No attributes.  
Possible values: `oneWeek`, `oneMonth`, `twoMonth`, `threeMonth`, `sixMonth`, `oneYear`.  

A subscription duration, a period when the feature/product is available to the user.

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Possible values</th>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>In-app Products / Pricing  / Billing period</td>
    <td>Monthly, Yearly, Seasonal</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>In-App purchases / (In)active purchases / Subscription period</td>
    <td>Annualy, Monthly</td>
  </tr>  
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>In-App Items / Subscription periods</td>
    <td>Weekly, BiWeekly, Monthly, BiMonthly, Quarterly, SemiAnnualy, Annualy</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
    <td>Yes</td>
    <td>In app purchase / Duration</td>
    <td>1 Month, 3 Month, 6 Month, 12 Month</td>
  </tr>
  <tr>
    <td>SlideME</td>
    <td>No</td>
    <td></td>
    <td></td>
  </tr>
</table>

#### <a name="in-app-item--sub-sub-spec-elements-trial-period"/>trial-period

Optional.  
No attributes.  

A trial period of the subscription, in days.

<table>
  <tr>
    <th>Store</th>
    <th>Supported</th>
    <th>Name</th>
    <th>Possible values</h>
  </tr>
  <tr>
    <td>Google Play</td>
    <td>Yes</td>
    <td>In-app Products / Pricing  / Billing period / Free Trial Period</td>
    <td>Number of days</td>
  </tr>
  <tr>
    <td>Yandex.Store</td>
    <td>Yes</td>
    <td>In-App purchases / (In)active purchases / Subscription periods / Free trial</td>
    <td>Number of days</td>
  </tr>  
  <tr>
    <td>Amazon AppStore</td>
    <td>Yes</td>
    <td>In-App Items / Subscription periods</td>
    <td>Yes, 7 or 14 Days, 1 or 2 or 3 Months</td>
  </tr>
  <tr>
    <td>GALAXY Apps</td>
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
</table>


### Summary tables

#### Required for publishing  

<table>
  <tr>
    <th>Fields/Format Providers</th>
    <th>Google Play</th>
    <th>Amazon</th>
    <th>Opera Mobile Store</th>
    <th>GALAXY Apps</th>
    <th>SlideME</th>
  </tr>
  <tr>
    <th>type</th>
    <td>yes</td>
    <td>no</td>
    <td>no</td>
    <td>no</td>
    <td>no</td>
  </tr>
  <tr>
    <th>category</th>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
  </tr>
  <tr>
    <th>title</th>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
  </tr>
  <tr>
    <th>short-description</th>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>no</td>
    <td>yes</td>
  </tr>
  <tr>
    <th>full-description</th>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
  </tr>
  <tr>
    <th>app-icon</th>
    <td>yes</td>
    <td>yes</td>
    <td>no</td>
    <td>yes</td>
    <td>yes</td>
  </tr>
  <tr>
    <th>screenshots</th>
    <td>yes</td>
    <td>yes</td>
    <td>no</td>
    <td>yes</td>
    <td>yes</td>
  </tr>
  <tr>
    <th>content-rating</th>
    <td>yes</td>
    <td>yes</td>
    <td>no</td>
    <td>yes</td>
    <td>yes</td>
  </tr>
  <tr>
    <th>content-descriptors</th>
    <td>yes</td>
    <td>yes</td>
    <td>yes</td>
    <td>no</td>
    <td>no</td>
  </tr>
  <tr>
    <th>included-activities</th>
    <td>yes</td>
    <td>yes</td>
    <td>no</td>
    <td>no</td>
    <td>???</td>
  </tr>
  <tr>
    <th>price</th>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td>yes</td>
  </tr>
  <tr>
    <th>customer-support/email</th>
    <td>yes</td>
    <td>yes</td>
    <td>no</td>
    <td>yes</td>
    <td>no</td>
  </tr>
  <tr>
    <th>store-specific obligatory requirements that have direct mapping in AppDF</th>
    <td>large promo<br>privacy-policy<br>availability/countries<br>consent<br>content-rating<br>content-descriptors<br>consent/us-export-laws<br>consent/google-android-content-guidelines</td>
    <td><categorization/subcategory<br>description/texts/features<br>description/texts/recent-changes<br>description/images/screenshots/screenshot (3+ vs 2+)<br>content-description/content-rating<br>content-description/content-descriptors<br>content-description/included-activities<br>availability/countries<br>customer-support/phone<br>customer-support/website<br>apk-files/apk-file/apk-alias</td>
    <td>categorization/subcategory</td>
    <td>categorization/subcategory<br>description/images/screenshots/screenshot (4+ vs 2+)<br>requirements/supported-languages<br>requirements/supported-resolutions<br>requirements/features</td>
    <td>categorization/subcategory<br>description/texts/keywords<br>price/trial-version<br>
content-description/content-rating<br>content-description/included-activities/in-app-billing<br>content-description/included-activities/advertising<br>requirements/features/root<br>requirements/features/gms</td>
  </tr>
  <tr>
  </tr>
   <tr>
    <th>store-specific obligatory requirements that have no direct mapping in AppDF</th>
    <td>Marketing opt-out</td>
    <td>App title (can be taken fron description/text/title)<br>Apply Amazon DRM?<br>Images & Multimedia / Small icon<br>Content Rating / Intolerance<br>Content Rating / Academic<br>Content Rating / Rude Humor<br><import-export></td>
    <td></td>
    <td></td>
    <td>Default language<br>Licence ( All Rights Reserved | Apache License 2.0 | Commercial Royalty-Free | Common Development and Distribution License (CDDL) | Eclipse Public License (EPL) | FREE Licensed Closed Source - Public Domain | GNU AFFERO GENERAL PUBLIC LICENSE (AGPL) v3 | GNU General Public License (GPL) v2 | GNU General Public License (GPL) v3 | GNU Library General Public License (LGPL) | GNU Library General Public License (LGPL) v3 | Mozilla Public License 1.1 (MPL) | New BSD License | Other / Proprietary | The MIT License)<br>Requires third-party libraries (yes | no)<br>subsubcategory for certain items</td>
  </tr>
  <tr>
  </tr>
</table>

#### Required for publishing with in-apps  

<table>
  <tr>
    <th>Fields/Format Providers</th>
    <th>Google Play</th>
    <th>Amazon</th>
    <th>GALAXY Apps</th>
    <th>SlideME</th>
  </tr>
  <tr>
    <th>id</th>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <th>type</th>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes (only Consumable)</td>
  </tr>
  <tr>
    <th>title</th>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <th>text</th>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>N/S</td>
  </tr>
  <tr>
    <th>base price</th>
    <td>Yes</td>
    <td>Yes (Are you charging for this consumable?/Yes, my base list price is...)</td>
    <td>Yes</td>
    <td>Yes</td>
  </tr>
  <tr>
    <th>subs period</th>
    <td>Yes</td>
    <td>Yes</td>
    <td>Yes</td>
    <td>N/S</td>
  </tr>
  <tr>
    <th>store-specific requirements</th>
    <td></td>
    <td>Title | Content delivery (No additional file required | I'll deliver the required asset(s)) | Calculated prices | Small icon | Large icon</td>
    <td>Payment Method: Credit Card | Micropayment | Phone Bill | Cyber Cash | Pre-Paid Card (in the Advanced Mode)</td>
    <td>Test mode (Disabled | Simulate success | Simulate failure)</td>
  </tr>
  <tr>
  </tr>
</table>

## <a name="application-store-support"/>Application Store Support

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
  <td><a href="https://play.google.com/intl/ALL_en/about/developer-distribution-agreement.html">https://play.google.com/intl/ALL_en/about/developer-distribution-agreement.html</a></td>
</tr>
<tr>
  <td>AppDF ID</td>
  <td>google</td>
</tr>
<tr>
  <td>Registration fee</td>
  <td><a href="http://developer.android.com/distribute/googleplay/start.html">$25</a></td>
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
  <td><a href="http://developer.android.com/google/play/billing/index.html">Yes</a></td>
</tr>
<tr>
  <td>License verification support</td>
  <td><a href="http://developer.android.com/google/play/licensing/index.html">Yes</a></td>
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
  <td><a href="https://developer.amazon.com/appsandservices">https://developer.amazon.com/appsandservices</a></td>
</tr>
<tr>
  <td>Distribution agreement URL</td>
  <td><a href="https://developer.amazon.com/appsandservices/support/legal/da">https://developer.amazon.com/appsandservices/support/legal/da</a></td>
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
  <td><a href="https://developer.amazon.com/appsandservices/apis/earn/in-app-purchasing">Yes</a></td>
</tr>
<tr>
  <td>License verification support</td>
  <td><a href="https://developer.amazon.com/appsandservices/community/post/Tx16GPJPAW8IKLC/Amazon-Appstore-Digital-Rights-Management-simplifies-life-for-developers-and-cus.html">Yes</a></td>
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
  <td><a href="https://publishers.apps.opera.com/">https://publishers.apps.opera.com/</a></td>
</tr>
<tr>
  <td>Distribution agreement URL</td>
  <td><a href="https://apps.opera.com/docs/DistributionAgreementHandster_standard.pdf">https://apps.opera.com/docs/DistributionAgreementHandster_standard.pdf</a></td>
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
  <td>Client Application</td>
  <td>No</td>
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
  <td>No</td>
</tr>
<tr>
  <td>Client Application</td>
  <td>Yes</td>
</tr>
<tr>
  <td>In-App Purchase Support</td>
  <td><a href="https://api.yandex.com/store/doc/subscription.xml">Yes</a></td>
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
  <td><a href="http://slideme.org/developers/iap">Yes</a></td>
</tr>
<tr>
  <td>License verification support</td>
  <td><a href="http://slideme.org/slidelock">Yes</a></td>
</tr>
</table>

### GALAXY Apps

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
  <td><a href="http://developer.samsung.com/in-app-purchase">Yes</a></td>
</tr>
<tr>
  <td>License verification support</td>
  <td><a href="http://developer.samsung.com/technical-doc/view.do?v=T000000066">Yes</a></td>
</tr>
</table>

<!--
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
-->

## <a name="category-list"/>Category List

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
  <th>SlideMe</th>
</tr>
<tr>
<td>Comics</td>
  <td>Comics</td>
  <td>Books &amp; Comic / Comic Strips</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Publications / Comics</td>
</tr>
<tr>
<td>Books</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Other</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Publications / E-books</td>
</tr>
<tr>
<td>Publications</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Other</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Publications</td>
</tr>
<tr>
<td>Books &amp; Readers</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Books &amp; Readers</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Publications / E-book readers</td>
</tr>
<tr>
<td>Children’s Books</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Children’s Books</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Publications</td>
</tr>
<tr>
<td>Graphic Novels</td>
  <td>Books &amp; Reference</td>
  <td>Books &amp; Comic / Graphic Novels</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Publications</td>
</tr>
<tr>
<td>Reference</td>
  <td>Books &amp; Reference</td>
  <td>Reference</td>
  <td>eBooks</td>
  <td>eBooks</td>
  <td>Publications</td>
</tr>
<tr>
<td>City Info</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Other</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>Country Guides</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Other</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / Country Guides</td>
</tr>
<tr>
<td>City Info / Boston</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Boston</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Chicago</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Chicago</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Dallas</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Dallas</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Los Angeles</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Los Angeles</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Miami</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Miami</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / New York</td>
  <td>Books &amp; Reference</td>
  <td>City Info / New York</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Philadelphia</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Philadelphia</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Phoenix</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Phoenix</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / San Francisco</td>
  <td>Books &amp; Reference</td>
  <td>City Info / San Francisco</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>City Info / Seattle</td>
  <td>Books &amp; Reference</td>
  <td>City Info / Seattle</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / City Guides</td>
</tr>
<tr>
<td>Weather</td>
  <td>Weather</td>
  <td>News &amp; Weather / Weather</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>News &amp; Weather / Weather</td>
</tr>
<tr>
<td>Travel / Transportation</td>
  <td>Transportation</td>
  <td>Travel / Transportation</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Travel</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Other</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality</td>
</tr>
<tr>
<td>Travel / Auto Rental</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Auto Rental</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Travel / Flight</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Flight</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Travel / Hotel</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Hotel</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Travel / Trip Planner</td>
  <td>Travel &amp; Local</td>
  <td>Travel / Trip Planner</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / Other</td>
</tr>
<tr>
<td>Navigation</td>
  <td>Travel &amp; Local</td>
  <td>Navigation</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Maps</td>
  <td>Travel &amp; Locality / Navigation</td>
</tr>
<tr>
<td>Religion</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Religion</td>
</tr>
<tr>
<td>Religion / Buddhism</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Religion / Buddhism</td>
</tr>
<tr>
<td>Religion / Chinese folk</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Religion / Chinese folk</td>
</tr>
<tr>
<td>Religion / Christianity</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Religion / Christianity</td>
</tr>
<tr>
<td>Religion / Hinduism</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Religion / Hinduism</td>
</tr>
<tr>
<td>Religion / Islam</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Religion / Islam</td>
</tr>
<tr>
<td>Religion / Other</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Religion / Other</td>
</tr>
<tr>
<td>Lifestyle</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle</td>
</tr>
<tr>
<td>Home &amp; Hobby</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Home &amp; Hobby</td>
</tr>
<tr>
<td>Home &amp; Hobby / Other</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Home &amp; Hobby / Other</td>
</tr>
<tr>
<td>Lifestyle / Advice</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Advice</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Astrology</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Astrology</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Celebrity</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Celebrities</td>
</tr>
<tr>
<td>Lifestyle / Culture</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Culture</td>
</tr>
<tr>
<td>Lifestyle / Design</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Design</td>
</tr>
<tr>
<td>Lifestyle / Fashion</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Fashion</td>
</tr>
<tr>
<td>Lifestyle / Living</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Celebrity</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Living</td>
</tr>
<tr>
<td>Lifestyle / Hair &amp; Beauty</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Hair &amp; Beauty</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Home &amp; Garden</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Home &amp; Garden</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Parenting</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Parenting</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Quizzes &amp; Games</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Quizzes &amp; Games</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Relationships</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Relationships</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Lifestyle / Self Improvement</td>
  <td>Lifestyle</td>
  <td>Lifestyle / Self Improvement</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Lifestyle / Other</td>
</tr>
<tr>
<td>Magazines</td>
  <td>News &amp; Magazines</td>
  <td>Magazines</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Publications / Magazines</td>
</tr>
<tr>
<td>Newspapers</td>
  <td>News &amp; Magazines</td>
  <td>Newspapers</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Publications</td>
</tr>
<tr>
<td>News</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Regional News</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / Regional News</td>
</tr>
<tr>
<td>News / Other</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / Other</td>
</tr>
<tr>
<td>News &amp; Weather</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather</td>
</tr>
<tr>
<td>News / Business</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Business</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Entertainment</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Health</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Health</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Politics</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Politics</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Science &amp; Tech</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Science &amp; Tech</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / Sports</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / Sports</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / US</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / US</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>News / World</td>
  <td>News &amp; Magazines</td>
  <td>News &amp; Weather / World</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>News &amp; Weather / News</td>
</tr>
<tr>
<td>Shopping</td>
  <td>Shopping</td>
  <td>Shopping</td>
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
</tr>
<tr>
<td>Sports / Athletic</td>
  <td>Sports</td>
  <td>Sports / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Athletic</td>
</tr>
<tr>
<td>Sports / Disabled</td>
  <td>Sports</td>
  <td>Sports / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Disabled</td>
</tr>
<tr>
<td>Sports / Extreme</td>
  <td>Sports</td>
  <td>Sports / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Extreme</td>
</tr>
<tr>
<td>Sports / Motor</td>
  <td>Sports</td>
  <td>Sports / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Motor</td>
</tr>
<tr>
<td>Sports / Baseball</td>
  <td>Sports</td>
  <td>Sports / Baseball</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Basketball</td>
  <td>Sports</td>
  <td>Sports / Basketball</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Boxing</td>
  <td>Sports</td>
  <td>Sports / Boxing</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Football</td>
  <td>Sports</td>
  <td>Sports / Football</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Golf</td>
  <td>Sports</td>
  <td>Sports / Golf</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Hockey</td>
  <td>Sports</td>
  <td>Sports / Hockey</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / NCAA
</td>
  <td>Sports</td>
  <td>Sports / NCAA</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Soccer</td>
  <td>Sports</td>
  <td>Sports / Soccer</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / Tennis</td>
  <td>Sports</td>
  <td>Sports / Tennis</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Sports / UFC
</td>
  <td>Sports</td>
  <td>Sports / UFC</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Sports / Other</td>
</tr>
<tr>
<td>Novelty</td>
  <td>Entertainment</td>
  <td>Novelty</td>
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
</tr>
<tr>
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
  <td>Entertainment / Comedy</td>
</tr>
<tr>
<td>Entertainment / Music</td>
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
  <td>Entertainment / Sports</td>
</tr>
<tr>
<td>Entertainment / Theatre</td>
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
  <td>Entertainment / Other</td>
</tr>
<tr>
<td>Video</td>
  <td>Media &amp; Video</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Entertainment / Film</td>
</tr>
<tr>
<td>Kids</td>
  <td>Education</td>
  <td>Kids / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Alphabet</td>
  <td>Education</td>
  <td>Kids / Alphabet</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Animals</td>
  <td>Education</td>
  <td>Kids / Animals</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / History</td>
  <td>Education</td>
  <td>Kids / History</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Language</td>
  <td>Education</td>
  <td>Kids / Language</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Math</td>
  <td>Education</td>
  <td>Kids / Math</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Popular Characters</td>
  <td>Education</td>
  <td>Kids / Popular Characters</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Reading</td>
  <td>Education</td>
  <td>Kids / Reading</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Science</td>
  <td>Education</td>
  <td>Kids / Science</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Kids / Writing</td>
  <td>Education</td>
  <td>Kids / Writing</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Early Childhood</td>
</tr>
<tr>
<td>Education</td>
  <td>Education</td>
  <td>Education / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education</td>
</tr>
<tr>
<td>Education / Higher</td>
  <td>Education</td>
  <td>Education / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Higher</td>
</tr>
<tr>
<td>Education / Primary</td>
  <td>Education</td>
  <td>Education / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Primary</td>
</tr>
<tr>
<td>Education / Secondary</td>
  <td>Education</td>
  <td>Education / Other</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Secondary</td>
</tr>
<tr>
<td>Education / History</td>
  <td>Education</td>
  <td>Education / History</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Math</td>
  <td>Education</td>
  <td>Education / Math</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Reading</td>
  <td>Education</td>
  <td>Education / Reading</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Science</td>
  <td>Education</td>
  <td>Education / Science</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Test Guides</td>
  <td>Education</td>
  <td>Education / Test Guides</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Writing</td>
  <td>Education</td>
  <td>Education / Writing</td>
  <td>Entertainment</td>
  <td>Entertainment</td>
  <td>Education / Other</td>
</tr>
<tr>
<td>Education / Language</td>
  <td>Education</td>
  <td>Education / Language</td>
  <td>Languages &amp; Translators</td>
  <td>Languages &amp; Translators</td>
  <td>Languages</td>
</tr>
<tr>
<td>Education / Dictionaries</td>
  <td>Education</td>
  <td>Education / Language</td>
  <td>Languages &amp; Translators</td>
  <td>Languages &amp; Translators</td>
  <td>Languages / Dictionaries</td>
</tr>
<tr>
<td>Education / Language learning</td>
  <td>Education</td>
  <td>Education / Language</td>
  <td>Languages &amp; Translators</td>
  <td>Languages &amp; Translators</td>
  <td>Languages / Language learning</td>
</tr>
<tr>
<td>Web Browsers</td>
  <td>Communication</td>
  <td>Web Browsers</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Tools &amp; Utilities / Browsers</td>
</tr>
<tr>
<td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
</tr>
<tr>
<td>Communication / E-mail</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication / E-mail</td>
</tr>
<tr>
<td>Communication / Instant Messaging</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication / Instant Messaging</td>
</tr>
<tr>
<td>Communication / SMS
</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication / SMS
</td>
</tr>
<tr>
<td>Communication / Other</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication / Other</td>
</tr>
<tr>
<td>Social</td>
  <td>Social</td>
  <td>Social Networking</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication / Social Networking</td>
</tr>
<tr>
<td>Real Estate</td>
  <td>Business</td>
  <td>Real Estate</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance / Other</td>
</tr>
<tr>
<td>Business</td>
  <td>Business</td>
  <td>Finance / Other</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; FinanceBusiness</td>
  <td>Finance / Other</td>
</tr>
<tr>
<td>Finance</td>
  <td>Finance</td>
  <td>Finance / Other</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Finance / Corporate</td>
  <td>Finance</td>
  <td>Finance / Other</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance / Corporate</td>
</tr>
<tr>
<td>Finance / Other</td>
  <td>Finance</td>
  <td>Finance / Other</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance / Other</td>
</tr>
<tr>
<td>Finance / Accounting</td>
  <td>Finance</td>
  <td>Finance / Accounting</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Finance / Banking</td>
  <td>Finance</td>
  <td>Finance / Banking</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Finance / Investing</td>
  <td>Finance</td>
  <td>Finance / Investing</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Finance / Money &amp; Currency</td>
  <td>Finance</td>
  <td>Finance / Money &amp; Currency</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance</td>
</tr>
<tr>
<td>Personal Finance</td>
  <td>Finance</td>
  <td>Finance / Personal Finance</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Finance / Personal</td>
</tr>
<tr>
<td>Home &amp; Hobby / Budgeting</td>
  <td>Finance</td>
  <td>Finance / Personal Finance</td>
  <td>Business &amp; Finance</td>
  <td>Business &amp; Finance</td>
  <td>Home &amp; Hobby / Budgeting</td>
</tr>
<tr>
<td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Other</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health &amp; Fitness</td>
</tr>
<tr>
<td>Diet &amp; Weight Loss</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Diet &amp; Weight Loss</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health &amp; Fitness / Calorie calculators</td>
</tr>
<tr>
<td>Health / Exercise</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Exercise &amp; Fitness</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health &amp; Fitness / Fitness</td>
</tr>
<tr>
<td>Health / Medical</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Medical</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health &amp; Fitness / Other</td>
</tr>
<tr>
<td>Health / Meditation</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Meditation</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health &amp; Fitness / Other</td>
</tr>
<tr>
<td>Health / Pregnancy</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Pregnancy</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health &amp; Fitness / Family Planning</td>
</tr>
<tr>
<td>Health / Sleep Trackers</td>
  <td>Health &amp; Fitness</td>
  <td>Health &amp; Fitness / Sleep Trackers</td>
  <td>Health</td>
  <td>Health</td>
  <td>Health &amp; Fitness / Other</td>
</tr>
<tr>
<td>Cooking</td>
  <td>Health &amp; Fitness</td>
  <td>Cooking</td>
  <td>Health</td>
  <td>Health</td>
  <td>Home &amp; Hobby / Cooking</td>
</tr>
<tr>
<td>Utilities</td>
  <td>Libraries &amp; Demo</td>
  <td>Utilities / Other</td>
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
  <td>Tools &amp; Utilities / Developer – Programmer</td>
</tr>
<tr>
<td>Utilities / Other</td>
  <td>Libraries &amp; Demo</td>
  <td>Utilities / Other</td>
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
  <td>Tools &amp; Utilities / Security</td>
</tr>
<tr>
<td>Alarms &amp; Clocks</td>
  <td>Tools</td>
  <td>Utilities / Alarms &amp; Clocks</td>
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
  <td>Tools &amp; Utilities / Other</td>
</tr>
<tr>
<td>Calculators</td>
  <td>Tools</td>
  <td>Utilities / Calculators</td>
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
  <td>Tools &amp; Utilities / Other</td>
</tr>
<tr>
<td>Notes</td>
  <td>Tools</td>
  <td>Utilities / Notes</td>
  <td>Organizers</td>
  <td>Organizers</td>
  <td>Tools &amp; Utilities / Other</td>
</tr>
<tr>
<td>Productivity</td>
  <td>Productivity</td>
  <td>Productivity</td>
  <td>Organizers</td>
  <td>Organizers</td>
  <td>Productivity</td>
</tr>
<tr>
<td>Music</td>
  <td>Music &amp; Audio</td>
  <td>Music / Other</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music</td>
</tr>
<tr>
<td>Music / Artists</td>
  <td>Music &amp; Audio</td>
  <td>Music / Artists</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music / Other</td>
</tr>
<tr>
<td>Music / Instruments</td>
  <td>Music &amp; Audio</td>
  <td>Music / Instruments</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music / Instruments</td>
</tr>
<tr>
<td>Music Players</td>
  <td>Music &amp; Audio</td>
  <td>Music / Music Players</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music / Music players</td>
</tr>
<tr>
<td>Radio</td>
  <td>Music &amp; Audio</td>
  <td>Music / Radio</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music / Radio</td>
</tr>
<tr>
<td>Music / Songbooks</td>
  <td>Music &amp; Audio</td>
  <td>Music / Songbooks</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Music / Other</td>
</tr>
<tr>
<td>Photography</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photography</td>
</tr>
<tr>
<td>Photography / Camera</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photography / Camera</td>
</tr>
<tr>
<td>Photography / Editing</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photography / Editing</td>
</tr>
<tr>
<td>Photography / Gallery</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photography / Gallery</td>
</tr>
<tr>
<td>Photography / Sharing</td>
  <td>Photography</td>
  <td>Photography</td>
  <td>Multimedia</td>
  <td>Multimedia</td>
  <td>Photography / Sharing</td>
</tr>
<tr>
<td>Personalization</td>
  <td>Personalization</td>
  <td>Themes</td>
  <td>Themes &amp; Skins</td>
  <td>Themes &amp; Skins</td>
  <td>Themes</td>
</tr>
<tr>
<td>Live Wallpapers</td>
  <td>Personalization</td>
  <td>Themes</td>
  <td>Themes &amp; Skins</td>
  <td>Themes &amp; Skins</td>
  <td>Themes / Live Wallpapers</td>
</tr>
<tr>
<td>Wallpapers</td>
  <td>Personalization</td>
  <td>Themes</td>
  <td>Themes &amp; Skins</td>
  <td>Themes &amp; Skins</td>
  <td>Themes / Wallpapers</td>
</tr>
<tr>
<td>Ringtones</td>
  <td>Personalization</td>
  <td>Ringtones / Other</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Christian</td>
  <td>Personalization</td>
  <td>Ringtones / Christian</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Classical</td>
  <td>Personalization</td>
  <td>Ringtones / Classical</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Collegiate</td>
  <td>Personalization</td>
  <td>Ringtones / Collegiate</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Comedy</td>
  <td>Personalization</td>
  <td>Ringtones / Comedy</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Country</td>
  <td>Personalization</td>
  <td>Ringtones / Country</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Dance &amp; Electronic</td>
  <td>Personalization</td>
  <td>Ringtones / Dance &amp; Electronic</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Jazz &amp; Standards</td>
  <td>Personalization</td>
  <td>Ringtones / Jazz &amp; Standards</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Latin</td>
  <td>Personalization</td>
  <td>Ringtones / Latin</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Pop</td>
  <td>Personalization</td>
  <td>Ringtones / Pop</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Rap</td>
  <td>Personalization</td>
  <td>Ringtones / Rap</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Rock</td>
  <td>Personalization</td>
  <td>Ringtones / Rock</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Sound Effects</td>
  <td>Personalization</td>
  <td>Ringtones / Sound Effects</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Soundtracks</td>
  <td>Personalization</td>
  <td>Ringtones / Soundtracks</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Sports</td>
  <td>Personalization</td>
  <td>Ringtones / Sports</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / TV</td>
  <td>Personalization</td>
  <td>Ringtones / TV</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
<tr>
<td>Ringtones / Voicetones</td>
  <td>Personalization</td>
  <td>Ringtones / Voicetones</td>
  <td>Ringtones</td>
  <td>Ringtones</td>
  <td>Themes / Ringtones</td>
</tr>
</table>

### <a name="game-categories"/>Game Categories
<table>
<tr>
  <th>Category</th>
  <th>Google Play</th>
  <th>Amazon AppStore</th>
  <th>Opera Store</th>
  <th>Yandex.Store</th>
  <th>GALAXY Apps</th>
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

## <a name="localization-support"/>Localization Support

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
  <!--
  <tr>
    <td>AppsLib</td>
    <td>No</td>
    <td>No localization</td>
  </tr>
  -->
  <tr>
    <td>GALAXY Apps</td>
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
  <th>GALAXY Apps</th>
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

## <a name="status"/>Status

Current status: final specification  
Specification version: 1.00
Last update: March 25, 2013  

## <a name="change-history"/>Change History

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
* APK file extension support is removed because only Google Play supports this technology today and any application that uses APK extension files will not workApplication Store Support in any of the alternative Android application stores.
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

## <a name="license"/>License

This file is licensed under the Creative Commons Attribution 2.5 license:  
http://creativecommons.org/licenses/by/2.5/

Source code is licensed under Apache License, Version 2.0:  
http://www.apache.org/licenses/LICENSE-2.0.html
