Application Submit Protocol Specification
-------------

In order to make it easier for application developers to submit their apps the appstores support an HTTP(s) based 
protocol to submit AppDF files from a command line tool. It is a very simple REST based protocol that includes digest
authorization and status and error reporting. 


Samples
-------------

### Sample 1
#### Request:
```
http://mylogin:mypassword@www.myappstore.com/appdf?command=submit-and-activate
```

#### Response:
```
{
    "code" : "aproval-pending-active", 
    "message" : "",
    "package" : "com.mydomain.myapp",
    "version" : "2.12"
}
```

### Sample 2
#### Request:
```
http://mylogin:mypassword@www.myappstore.com/appdf?command=check&package=com.mydomain.myapp
```

#### Response:
```
{
    "code" : "active", 
    "message" : "",
    "package" : "com.mydomain.myapp",
    "version" : "2.12"
}
```
Authentification
----------------

User authentification uses basic or digest http authorization according to [rfc2617](http://tools.ietf.org/html/rfc2617).
Most of http libraries and web servers do it transparently.


Parameters
-------------

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>command</td>
    <td></td>
  </tr>
  <tr>
    <td>package</td>
    <td>Application package name (like <code>com.mydomain.myapp</code>), only needed for <code>activate</code> or <code>check</code> commands</td>
  </tr>
</table>

### Commands
<table>
  <tr>
    <th>Command</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>submit</td>
    <td>Submite AppDF file. Please note that some appstores do not support postponed activation for updates, such appstores will make </td>
  </tr>
  <tr>
    <td>submit-and-activate</td>
    <td>Submite AppDF file and automatically make the program active after aproval</td>
  </tr>
  <tr>
    <td>activate</td>
    <td>Activate previously submitted application, <code>package</code> parameters is required for this command, AppDF file is not passed for this command</td>
  </tr>
  <tr>
    <td>check</td>
    <td>Check what is status of a previously submitted application, <code>package</code> parameters is required for this command, AppDF file is not passed for this command</td>
  </tr>
</table>

Result Format
-------------

REST call should return JSON with the following parameters:
<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>code</td>
    <td>See the list of return codes below</td>
  </tr>
  <tr>
    <td>message</td>
    <td>Optional message that described details in human readable format</td>
  </tr>
  <tr>
    <td>package</td>
    <td>Application package, if AppDF file was not parsed then <code>package</code> parameters could be empty</td>
  </tr>
  <tr>
    <td>version</td>
    <td>Version of the application refered</td>
  </tr>
</table>

### Return Codes
<table>
  <tr>
    <th>Code</th>
    <th>Description</th>
    <th>What is described in the message</th>
  </tr>
  <tr>
    <td>active</td>
    <td>The application is successefully submitted to the appstore and is activated</td>
    <td>Empty</td>
  </tr>
  <tr>
    <td>inactive</td>
    <td>The application is successefully submitted and approved if needed but require additional developer activation in order to be published</td>
    <td></td>
  </tr>
  <tr>
    <td>ownership-confirmation-required</td>
    <td>The appstore has requested ownership confirmation, in most cases an email is sent to some address and reply is needed for confirmation</td>
    <td>Information about what actions are needed in order to confirm ownership</td>
  </tr>
  <tr>
    <td>aproval-pending-active</td>
    <td>The application is successefully submitted and is waiting for appstore aproval, when it is aproved it will be automatically activated (published)</td>
    <td>Empty</td>
  </tr>
  <tr>
    <td>aproval-pending-inactive</td>
    <td>The application is successefully submitted and is waiting for appstore aproval, after it is aproved it will require additional developer activation in order to be published</td>
    <td></td>
  </tr>
  <tr>
    <td>rejected</td>
    <td>The application is successefully parsed but rejected by the appstore</td>
    <td>Reason why application is rejected</td>
  </tr>
  <tr>
    <td>version-already-exists</td>
    <td></td>
    <td>Empty</td>
  </tr>
  <tr>
    <td>newer-version-exists</td>
    <td></td>
    <td>Package name and version number of the version in the appstore</td>
  </tr>
  <tr>
    <td>unsupported-appdf-version</td>
    <td>The appstore does not support used AppDF version</td>
    <td>Information which versions of AppDF standard are supported</td>
  </tr>
  <tr>
    <td>wrong-appdf-format</td>
    <td>There is some mistake in AppDF file</td>
    <td></td>
  </tr>
</table>

Security
-------------
[Information about HTTPS to bu supplied.]

Status
-------------
Current status: draft  
Specification version: 0.90
Last update: April 11, 2013  

License
-------------
This file is licensed under the Creative Commons Attribution 2.5 license:  
http://creativecommons.org/licenses/by/2.5/

Source code is licensed under Apache License, Version 2.0:  
http://www.apache.org/licenses/LICENSE-2.0.html
