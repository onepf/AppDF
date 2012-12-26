Sample Description.xml File
-------------

```xml
<?xml version="1.0" encoding="UTF-8"?>

<application-description-file version="1">

<!-- "update" is an optional attribute, if set to "yes" it will signal the store that missed information can be taken from the previous version-->
<application package="ru.yandex.shell" update="yes">

  <!--This tag is optional. If missed then this information is taken from the APK files. Options: phone, tablet, tv, all or any of combinations of these values separated by comma-->
  <form-factor>all</form-factor>

  <category>
    <!--Options: application, game-->
    <type>application</type>
    <!--See the list of AppDF categories and subcategories in the documentation-->
    <category>finance</category>
    <subcategory>investing</subcategory>
    <!--Optional: You can specify special handling for some stores by manully setting category name, in most cases it is not needed because the stores will be able to map AppDF category to their local category list-->
    <x-amazon>Finance / Banking</x-amazon>
  </category>

  <!--Language is set in two letter ISO 639-1 codes, default is an optional attribute, if set this information is used for other languages where a particular native text is missed-->
  <description language="en" default="yes">
    <!-- Maximum length of title: 30 symbols-->
    <title>Yandex.Shell</title>
    <keywords>shell, homescreen, launcher</keywords>
    <!--If several versions of short-description tag are presented the store will take the longest-->
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
    <!--This tag is shown as an example how custom store localizable text information can be added, for other store specific fields see "store-specific" top level tag-->
    <x-opera-app-registration-instructions>Sample text here</x-opera-app-registration-instructions>
    <youtube-video>x8723jw2KL</youtube-video>
  </description>

  <description language="ru">
    <title>Яндекс.Shell</title>
  </description>

  <!--Language is set in two letter ISO 639-1 codes, default is an optional attribute, if set this information is used for other languages where a particular image is missed-->
  <images language="en" default="yes">
    <app-icon>icon.png</app-icon>
    <promo>promo.png</promo>
    <feature>feature.png</feature>
    <!--Minimum two screenshots should be presented-->
    <screenshot>screenshot01_en.png</screenshot>
    <screenshot>screenshot02_en.png</screenshot>
    <screenshot>screenshot03_en.png</screenshot>
    <screenshot>screenshot04_en.png</screenshot>
    <screenshot>screenshot05_en.png</screenshot>
  </images>

  <images language="ru">
    <screenshot>screenshot01_ru.png</screenshot>
    <screenshot>screenshot02_ru.png</screenshot>
    <screenshot>screenshot03_ru.png</screenshot>
  </images>

  <!--All sub-tags are required, possible options are "no", "light", "strong"-->
  <content-rating>
    <age-restrictions>
      <minimum-age>12</minimum-age>
      <!--Possible values are 3, 7, 12, 16, 18. "certificate" attribute is optional-->
      <rating-certificate type="PEGI" certificate="whirl-pegi.pdf">7</rating-certificate>
      <!--Possible values are 3, 6, 10, 13, 17, 18. "certificate" attribute is optional-->
      <rating-certificate type="ESRB" certificate="whirl-pegi.pdf">7</rating-certificate>
      <!--Possible values are "all", 12 15, 18. "certificate" attribute is optional-->
      <rating-certificate type="GRB" certificate="whirl-pegi.pdf">all</rating-certificate>
      <!--Possible values are "all", 12, 15, 17, 18. "certificate" attribute is optional-->
      <rating-certificate type="CERO" certificate="whirl-pegi.pdf">all</rating-certificate>
      <!--Possible values are "l", 10, 12, 14, 16, 18. "certificate" attribute is optional-->
      <rating-certificate type="DEJUS" certificate="whirl-pegi.pdf" mark="dejus_mark.jpg">l</rating-certificate>
      <!--Possible values are 0, 6, 12, 16, 18. "certificate" attribute is optional-->
      <rating-certificate type="FSK" certificate="whirl-pegi.pdf">0</rating-certificate>
    </age-restrictions>
    <!--Set to "yes" if this application is a trial version of another application. Optional attribute full-version defines package name of the corresponding full version-->
    <trial-version full-version="com.yandex.shellfullversion">no</trial-version>
    <in-app-billing>no</in-app-billing>
    <gambling>no</gambling>
    <advertising>no</advertising>
    <user-generated-content>no</user-generated-content>
    <user-to-user-communications>no</user-to-user-communications>
    <account-creation>no</account-creation>
    <personal-information-collection>no</personal-information-collection>
    <content-properties>
      <cartoon-violence>no</cartoon-violence>
      <realistic-violence>no</realistic-violence>
      <!--May contain profanity, sexual innuendo, threats, and all manner of slurs and epithets.-->
      <bad-language>no</<bad-language>
      <!--May contain scenes that are considered too disturbing or frightening to younger or more emotionally vulnerable players.-->
      <fear>yes</fear>
      <!--Sexual and suggestive content. May contain references to sexual attraction or sexual intercourse. Also may contain nudity and characters dressed in suggestive clothing.-->
      <sexual-content>no</sexual-content>
      <!--May contain references to illegal drugs or a fictional substance that has parallels to real-life illegal drugs (in use, possession, or sale).-->
      <drugs>no</drugs>
      <!--May contain elements that encourage or teach gambling.-->
      <gambling-refference>no</gambling-refference>
      <!--May contain references to alcohol-->
      <alcohol>no</alcohol>
      <!--May contain references to smoking or tobacco-->
      <smoking>no</smoking>
      <!--May contain cruelty or harassment based on race, ethnicity, gender, or sexual preferences.-->
      <discrimination>no</discrimination>
    </content-properties>
  </content-rating>

  <!--Optional tag, if missed all the countries are included. exception attribute is optional, if true then the country list set the list of countries where app is NOT available-->
  <availability-country-list exception="true">
    <!--Two symbol ISO 3166-1 country code -->
    <country>en</country>
    <country>ru</country>
    <country>de</country>
  <availability-country-list>

  <!--Optional tag, if missed the app become available immediatly without experiation date-->
  <availability-period>
    <!--Optional tag, if missed the app become available immediatly -->
    <available-since year="2012" month="12" day="23"/>
    <!--Optional tag, if missed the app is without experiation date-->    
    <available-until year="2013" month="12" day="23"/>
  </availability-period>

  <!--If free attribute is set to "true" then all the subtags are ignored. -->
  <!--If app is not free then "base-price" is required. currency is set in three cappital letter ISO 4217 currency code -->
  <!--local-price tags are optional, if set they define local prices. Country is set in two letter ISO 3166-1 country code, currency is set in three cappital letter ISO 4217 currency code-->
  <!--Dot not comma should be used as decimal diliiter symbol-->
  <price free="false">
    <base-price currency="USD">4.95</base-price>
    <local-price country="de" currency="EUR">3.95</local-price>
    <local-price country="fr" currency="EUR">3.95</local-price>
    <local-price country="ru" currency="RUB">99</local-price>
  </price>

  <apk-files>
    <apk-file>yandexhell.apk</apk-file>
  </apk-files>

  <!--Optional tag, if missed the license is considered as proprietary-->
  <agreements>
    <license-type>apache2</license-type>
    <!--Optional tag, if presented it give custom EULA that some stores will show before installation-->
    <eula></eula>
  </agreements>

  <!--Optional tag, add it if the application has some special requirements-->
  <requirements>
    <features>
      <!--Optional tag, set to yes, if your application requires root access-->
      <root>no</root>
      <!--Optional tag, set to yes, if your application requires Google Mobile Services, will dramatically limit supported stores-->
      <gms>no</gms>
      <!--Optional tag, set to yes, if your application requires Samsung S-Pen. Example of store-specific tags-->
      <x-samsung-s-pen></x-samsung-s-pen> 
    </features>

    <!--Optional tag, if missed this information is taked from the APK files. All languages are defined by their two letter ISO 639-1 codes language codes-->
    <supported-languages>
      <language>en</language>
      <language>ru</language>
      <language>de</language>
      <language>fr</language>
      <language>it</language>
    </supported-languages>

    <!--Optional tag, if missed information about the supported devices is taken from APK file. Use his tag if you want to add some exceptions-->
    <supported-devices>
      <exclude>kyleopen</exclude>
      <exclude>SHW-M130K</exclude>
    </supported-devices>

    <!--Optional tag, if missed information about the supported screen resolutions is taken from APK file. Use his tag if you want to add some exceptions-->
    <supported-resolutions>
      <exclude>480x856</exclude>
      <include>240x400</include>
    </supported-resolutions>

  </requirements>

  <!--Optional tag that collects some store specific information, some store specific information could be a part of other tags with "x-" prefix-->
  <store-specific>
    <x-amazon>
      <free-app-of-the-day-eligibility>yes</free-app-of-the-day-eligibility>
      <apply-amazon-drm>yes</apply-amazon-drm>
      <kindle-support>
        <kindle-fire-first-generation>yes</kindle-fire-first-generation>
        <kindle-fire>yes</kindle-fire>
        <kindle-fire-hd>yes</kindle-fire-hd>
        <kindle-fire-hd-8-9>yes</kindle-fire-hd-8-9>
      </kindle-support>
      <binary-alias>Version 1</binary-alias>
    </x-amazon>
    <x-samsung>
      <contains-zirconia-protection>yes</contains-zirconia-protection>
      <!-- Samsung requires each app to have 2-5 tags -->
      <tags>
        <tag>Education / Video</tag>
        <tag>Music / Album</tag>
      </tags>
    </x-samsung>
  </store-specific>

  <!--Special requirements to test your app. maximum characters in case of Amazon: 4000-->
  <testing-instructions>
  </testing-instructions>

  <!--You must include these tags in order to confirm your agreement with the corresponding agreement-->
  <consent>
    <!--http://play.google.com/about/developer-content-policy.html-->
    <google-android-content-guidelines>yes</google-android-content-guidelines>
    <!--https://support.google.com/googleplay/android-developer/support/bin/answer.py?hl=en&answer=113770-->
    <us-export-laws>yes</us-export-laws>
  </consent>

  <!--Optional tag, if missed customer support info from the account is used-->
  <customer-support>
    <phone></phone>
    <email>support@yandex-team.ru</email>
    <website>http://www.yandex.ru/support</website>
    <privacy-policy>http://legal.yandex.com/privacy/</privacy-policy>
  </customer-support>

</application>

</application-description-file>
```