AddDF Editor
-------------

This project is an open source implementation of AppDF editor. It is a clien-side only HTML5 page that can load/edit/save AppDF files.

Files
=====
<table>
  <tr>
    <th>File</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>index.html</td>
    <td>AppDF Editor itself, the main HTML file</td>
  </tr>
  <tr>
    <td>js/apkreader.js</td>
    <td>Parsing APK file and AndroidManifest.xml</td>
  </tr>
  <tr>
    <td>js/appdfeditor.js</td>
    <td>Main JavaScript for the AppDf editor, contains all the logic that is not moved to separate files (legacy version - we are in process of refactoring and moving from code from this file to appdfeditor2.js)</td>
  </tr>
  <tr>
    <td>js/appdfeditor2.js</td>
    <td>Main JavaScript for the AppDf editor, contains all the logic that is not moved to separate files (new version)</td>
  </tr>
  <tr>
    <td>js/addpfimages.js</td>
    <td>Images related logic of AppDF Editor</td>
  </tr>
  <tr>
    <td>js/appdflocalization.js</td>
    <td>Localization related logic of AppDF Editor</td>
  </tr>
  <tr>
    <td>js/appdfparser.js</td>
    <td>Parsers AppDF description.xml file and converts into JSON data</td>
  </tr>
  <tr>
    <td>js/appdfxmlloading.js</td>
    <td>Loading description.xml JSON into AppDF editor HTML5 page</td>
  </tr>
  <tr>
    <td>js/appdfxmlsaving.js</td>
    <td>Generating description.xml XML from the AppDF editor HTML5 page</td>
  </tr>
  <tr>
    <td>js/xmlgenerator.js</td>
    <td>A simple library for generating XML files</td>
  </tr>
</table>
