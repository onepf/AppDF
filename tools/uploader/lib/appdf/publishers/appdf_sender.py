import os
import sys
import requests
import json


class AppdfSender(object):
    def __init__(self, username, password, url, command, package, file):
        self.username = username
        self.password = password
        
        self.command = command
        self.package = package
        self.file = file
        
        self.url = url+"/appdf?command=%s" % self.command
        
    
    def publish(self):
        if self.command == "submit":
            self.submit()
        elif self.command == "submit-and-activate":
            self.submitAndActivate()
        elif self.command == "activate":
            self.activate();
        elif self.command == "check":
            self.check()
        else:
            print "Unknown command received"
            
    def submit(self):
        self.connect()
        
    def submitAndActivate(self):
        self.connect()
        
    def activate(self):
        self.url+="&package=%s" % self.package
        self.connect()
        
    def check(self):
        self.url+="&package=%s" % self.package
        self.connect()
        
    
    def connect(self):
        data = {'test': 'test content'}
        self.url = 'http://antares-software.ru/metapoinTest/appdf/test.php'
        #self.url = 'http://httpbin.org/post'

        
        try:
            r = requests.post(self.url, files=self.file, data=data, auth=(self.username, self.password))
        except requests.exceptions.RequestException as e:
            print e
            sys.exit(1)
        
        try:
            result = json.loads(r.text)
        except ValueError, e:
            print "Invalid server answer"
        else:
            print "code: %s" % result["code"]
            print "message: %s" % result["message"]
            print "package: %s" % result["package"]
            print "version: %s" % result["version"]
            
            if result["code"]=="active":
                print "The application is successefully submitted to the appstore and is activated"
            elif result["code"]=="inactive":
                print "The application is successefully submitted and approved if needed but require additional developer activation in order to be published"
            elif result["code"]=="ownership-confirmation-required":
                print "The appstore has requested ownership confirmation, in most cases an email is sent to some address and reply is needed for confirmation"
            elif result["code"]=="aproval-pending-active":
                print "The application is successefully submitted and is waiting for appstore approval, when it is approved it will be automatically activated (published)"
            elif result["code"]=="aproval-pending-inactive":
                print "The application is successefully submitted and is waiting for appstore approval, after it is approved it will require additional developer activation in order to be published"
            elif result["code"]=="rejected":
                print "The application is successefully parsed but rejected by the appstore"
            elif result["code"]=="version-already-exists":
                print "The application with the same version already exist"
            elif result["code"]=="newer-version-exists":
                print "The application with the newer version already exist"
            elif result["code"]=="unsupported-appdf-version":
                print "The appstore does not support used AppDF version"
            elif result["code"]=="wrong-appdf-format":
                print "There is some mistake in AppDF file"
                
            print result["message"]
        
