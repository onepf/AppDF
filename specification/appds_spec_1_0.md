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

Category List
-------------
AppDF provides universal category list that could be matched to any appstore category list. When we chose categories for the AppDF we tried to create the most detailed list to archive unambiguous mapping for any appstore.

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
<td>Category</td>
  <td>Google</td>
  <td>Amazon</td>
  <td>Opera</td>
  <td>Yandex</td>
  <td>SamsungApps</td>
  <td>SlideMe</td>
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
<td>Sports / <span class="caps">NCAA</span>
</td>
  <td>Sports</td>
  <td>Sports / <span class="caps">NCAA</span>
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
<td>Sports / <span class="caps">UFC</span>
</td>
  <td>Sports</td>
  <td>Sports / <span class="caps">UFC</span>
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
<td>Communication / <span class="caps">SMS</span>
</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Communication</td>
  <td>Social Networking</td>
  <td>Communication / <span class="caps">SMS</span>
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
