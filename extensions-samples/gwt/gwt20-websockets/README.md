GWT Webockets
=============

Command-Line Users
==================
First run the samples/websocket-stream example
- mvn jetty:run

Verify streaming operation at this URL: http://localhost:8080. You should see a client page built using jQuery, with a streaming JSON 
message containing two keys: time and count.  These should increment once per second.

Next run this sample as a gwt application:
- mvn gwt:run

This should launch the GWT designer page, starting Jetty to serve the GWT application.  Launch the default browser page through this
user-interface.  The full URL to launch this page is: http://127.0.0.1:8888/GwtWebsocketsDemo.html?gwt.codesvr=127.0.0.1:9997
The first time launch will take a few seconds because GWT is compiling code for the javascript of the
page.

This should show a page titled "GWT Websockets Demo", with a streamed JSON message as above, but with a page built using GWT.
Note that the streams on the two pages are independent of each other, they have different times and counts.

Eclipse Users
=============
Eclipse users can use the .launch configuration files to run the websocket-stream and gwt-websockets
examples directly from the workspace, provided you have the m2 eclipse plugin. Right-click|Run As on the 
.launch files to bring them up.