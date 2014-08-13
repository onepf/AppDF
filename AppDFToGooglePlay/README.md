Before run sample you must put in `sample/src/main/resources/` your generated AppDF file and set
path to it in org.onepf.appdf.googleplay.samples.AppDFUploadApk.APP_DF_PATH.

AppDF file can be generated on [AppDF Editor](http://www.onepf.org/editor/)

### Configure OAuth2 with Installed application

1. Edit the `sample/src/main/resources/client_secrets.json` file and add the client ID, client secret and redirect
uris.

2. Execute sample class using gradle task like `gradle run`:

  If you didn't login early, a browser window will open and ask you to login. Make sure the account has
  appropriate permissions in the Google Play Developer console.

3. Accept the permissions dialog. The browser should display

  `The authentication flow has completed.`

  Close the window and go back into your IDE and check the console output.

4. The script will output a list of apks.

5. The tokens will be stored in `.store/android_publisher_api` in your home folder. Remove this file
to restart the auth flow.
