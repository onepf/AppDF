import os  
import sys
import argparse
import zipfile 
import xml.etree.ElementTree as ET

import codecs

import json
import re

#from urllib import urlretrieve
import urllib
    
import time
import dryscrape

from getimageinfo import getImageInfo


def parse_args():
    argument_parser = argparse.ArgumentParser(description="AppDF publisher")
    
    argument_parser.add_argument("file", metavar="FILE", help="AppDF file to store")
    argument_parser.add_argument("--application", help="Application name")
    argument_parser.add_argument("--username", help="Username")
    #argument_parser.add_argument("--password", help="Password")
    argument_parser.add_argument("--debug-dir", 
                                 help="Directory for browser screenshots")
    
    return argument_parser.parse_args()


def main():
    args = parse_args()
    
    args.password = raw_input("Password: ")
    
    root = ET.Element("application-description-file")
    root.set("version", "1")
    root.set("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance")
    root.set("xsi:noNamespaceSchemaLocation", "../../../specification/appdf-description.xsd")
    
    test = googleScrape(root, args.application, args.file, args.username, args.password)
    root = test.scrape()
    filelist = test.getFileList()
    
    tree = ET.ElementTree(root)
    tree.write("desc.xml", xml_declaration = True, method = "xml", encoding="utf-8")
    
    zf = zipfile.PyZipFile(args.file, mode='w')
    try:
        zf.debug = 3
        print 'Adding python files'
        #zf.writepy('.')
        zf.write("desc.xml", "description.xml")
        for filename in filelist:
            zf.write(filename)
    finally:
        zf.close()
    #for name in zf.namelist():
    #    print name
        
    for filename in filelist:
        os.remove(filename)
    os.remove("desc.xml")
    print sys.path.insert(0, args.file)


    
class googleScrape(object):
    def __init__(self, xml, app, file, username, password):
        self.xml = xml
        self.app = app
        self.file = file
        self.username = username
        self.password = password
        
        self.filelist = []
        self.locale = None
    
    
    def scrape(self):
        self.store_locale()
        self.run()
        self.restore_locale()
        return self.xml
        
        
    def run(self):
        application = ET.SubElement(self.xml, "application")
        application.set("platform", "android")
        
        self.session = dryscrape.Session()
        self.open_console()
        self.login()
        
        xpath = "//sidebar/nav/ul/li/a"
        if self._ensure(xpath):
            self._ensure(xpath).click()
        
        self.open_app()
        #self.fillCategorization(application)
        #self.fillDescription(application)
        #self.fillContentDesctiption(application)
        #self.fillCustomerSupport(application)
        self.fillPrices(application)
        #self.getAPK(application)
        
        self._debug("scrape", "finish")
        
        return self.xml
    
    def getFileList(self):
        return self.filelist
        
        
    def _ensure(self, xpath):
        return self.session.at_xpath(xpath, timeout=5)   
        
        
    def open_account(self):
        self.session.visit("https://accounts.google.com/ServiceLogin")
        self.session.wait()
        self._debug("open_account", "opened")
        
    def open_console(self):
        self.session.visit("https://play.google.com/apps/publish/v2/")
        self.session.wait()
        self._debug("open_console", "opened")

    def store_locale(self):
        self.session = dryscrape.Session()
        self.open_account()
        self.login()
        #store current language
        xpath = "//body/div[4]/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div[2]/div/div/div[3]/div[2]/div/div[1]/div[1]"
        self._debug("store_local", "1")
        if self.session.at_xpath(xpath):
            self.locale = self.session.at_xpath(xpath).text()
            
            xpath = "//body/div[4]/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div[2]/div/div/div[3]/div[2]/div/div[1]/div[2]/a"
            self.session.at_xpath(xpath).click()
            
            xpath = "//div[@role=\"dialog\"]/div[2]/div/div/div/span[contains(text(), \"English (United States)\")]"
            self.session.at_xpath(xpath).click()
        else:
            self.store_locale()
        
    def restore_locale(self):
        self.session = dryscrape.Session()
        self.open_account()
        self.login()
        #restore previous language
        xpath = "//body/div[4]/div[2]/div[1]/div[1]/div/div/div/div[1]/div/div[2]/div/div/div[3]/div[2]/div/div[1]/div[2]/a"
        self.session.at_xpath(xpath).click()
        
        xpath = "//div[@role=\"dialog\"]/div[2]/div/div/div[count(span[contains(text(), \"{}\")])=1]".format(self.locale)
        self.session.at_xpath(xpath).click()
        #if self.session.at_xpath(xpath):
            #self.session.at_xpath(xpath).click()
        
        
    def login(self):
        login_url = "https://accounts.google.com/ServiceLogin"

        if self.session.url().startswith(login_url): 
            email_field = self.session.at_css("#Email")
            password_field = self.session.at_css("#Passwd")
            email_field.set(self.username)
            password_field.set(self.password)
            self._debug("login", "filled")
            
            email_field.form().submit()
            self._debug("login", "submited")
            
            self.session.wait()
            xpath = "//span[@role=\"alert\" and @class=\"errormsg\"]"
            if self.session.at_xpath(xpath):
                print "Login error"
                self._quit()
        else:
            print "Login error"
            self._quit()
            
            
    def open_app(self):
        xpath = "//p[@data-column='TITLE']/span[contains(text(), '{}')]"
        xpath = xpath.format(self.app)
        
        if self._ensure(xpath):
            self._ensure(xpath).click()
        else:
            print "Error. Application does not exist."
            self._quit()
        
        self._debug("open_app", "opened")
    
    
    def fillCategorization(self, application):
        self._debug("categorization", "start")
        
        categorization = ET.SubElement(application, "categorization")
        
        xpath = "//fieldset/label/div/select[@class=\"gwt-ListBox\"]"
        type = ET.SubElement(categorization, "type")
        type.text = self.session.at_xpath(xpath).value().lower()
        
        xpath = "//fieldset/label/div/div/select[@class=\"gwt-ListBox\"]"
        category = ET.SubElement(categorization, "category")
        categoryValue = self.session.at_xpath(xpath).value().lower()
        categoryValue = re.sub("_and_", " & ", categoryValue)
        categoryValue = re.sub("_", " ", categoryValue)
        
        current_dir = os.path.dirname(os.path.realpath(__file__))
        categories_file = os.path.join(current_dir, "spec",
                                       "store_categories.json")
        with open(categories_file, "r") as fp:
            categories = json.load(fp)
            for cat in categories[type.text]:
                for subcat in categories[type.text][cat]:
                    text = categories[type.text][cat][subcat]["google"].lower()
                    text = re.sub("(\s*/\s*)", "/", text)
                    text = re.sub("^(\s*)", "", text)
                    text = re.sub("(\s*)$", "", text)
                    if text == categoryValue:
                        category.text = cat
                        break
        
        self._debug("categorization", "finish")
    
    
    def fillDescription(self, application):
        self._debug("description", "start")
        
        description = ET.SubElement(application, "description")
        texts = ET.SubElement(description, "texts")
        
        xpath = "//section/div[4]/div[3]/fieldset/label/div/div/input[@class=\"gwt-TextBox\"]"
        privacyPolicyValue = self.session.at_xpath(xpath).value()
        if privacyPolicyValue != "":
            privacyPolicy = ET.SubElement(texts, "privacy-policy")
            privacyPolicy.set("href", privacyPolicyValue)
        
        self.fillLanguage(description, texts, "en_us")
        
        xpath = "//section/div[3]/div[2]/div[1]/div[1]/div[1]/div[1]"
        
        current_dir = os.path.dirname(os.path.realpath(__file__))
        languages_file = os.path.join(current_dir, "spec",
                                       "languages.json")
        with open(languages_file, "r") as fp:
            languages = json.load(fp)
        
        i = 2
        while self.session.at_xpath(xpath+"/button[" + str(i) + "]"):
            lang = self.session.at_xpath(xpath+"/button[" + str(i) + "]/div/span").text().lower()
            lang_lng = re.sub("-", "_", lang[4:])
            lang_shrt = re.sub("-", "_", lang[4:6])
            if lang_lng in languages:
                self._ensure(xpath+"/button[" + str(i) + "]").click()
                description = ET.SubElement(application, "description-localization")
                description.set("language", lang_lng)
                texts = ET.SubElement(description, "texts")
                self.fillLanguage(description, texts, lang_lng)
            elif lang_shrt in languages:
                self._ensure(xpath+"/button[" + str(i) + "]").click()
                description = ET.SubElement(application, "description-localization")
                description.set("language", lang_shrt)
                texts = ET.SubElement(description, "texts")
                self.fillLanguage(description, texts, lang_shrt)
            i += 1
            
        self._debug("description", "finish")
        
    def fillLanguage(self, description, texts, lang=None):
        #self._debug("fillLanguage", lang)
        #texts
        xpath = "//section/div[3]/div[2]/div[3]/div[1]/fieldset/label[1]/div/div/div/input"
        if self.session.at_xpath(xpath).value() != "":
            title = ET.SubElement(texts, "title")
            value = self.session.at_xpath(xpath).value()
            title.text = value.decode("utf-8")
            
        
        xpath = "//section/div[3]/div[2]/div[3]/div[1]/fieldset/label[2]/div/div/div/div/textarea"
        if self.session.at_xpath(xpath).value() != "":
            fullDesc = ET.SubElement(texts, "full-description")
            value = self.session.at_xpath(xpath).value()
            fullDesc.text = value.decode("utf-8")
        
        xpath = "//section/div[3]/div[2]/div[3]/div[1]/fieldset/label[3]/div/div/div/textarea"
        if self.session.at_xpath(xpath).value() != "":
            shortDesc = ET.SubElement(texts, "short-description")
            value = self.session.at_xpath(xpath).value()
            shortDesc.text = value.decode("utf-8")
        
        xpath = "//section/div[3]/div[2]/div[3]/div[1]/fieldset/label[4]/div/div/div/div/textarea"
        if self.session.at_xpath(xpath).value() != "":
            recentChanges = ET.SubElement(texts, "recent-changes")
            value = self.session.at_xpath(xpath).value()
            recentChanges.text = value.decode("utf-8")
        
        #images
        images = None
        
        #app-icon
        xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/@style"
        if self.session.at_xpath(xpath).value() == "":
            xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/img/@src"
            imgSrc = self.session.at_xpath(xpath).value()
            filename = "appIcon_" + lang + "."
            width, height, filename = self.storeRes(imgSrc, filename, True)
            
            if images == None:
                images = ET.SubElement(description, "images")
            
            appIcon = ET.SubElement(images, "app-icon")
            appIcon.text = filename
            appIcon.set("width", str(width))
            appIcon.set("height", str(height))
        
        #large-promo
        xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[2]/div[3]/@style"
        if self.session.at_xpath(xpath).value() == "":
            xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[2]/div[2]/div[2]/div[3]/img/@src"
            imgSrc = self.session.at_xpath(xpath).value()
            filename = "largePromo_" + lang + "."
            width, height, filename = self.storeRes(imgSrc, filename, True)
            
            if images == None:
                images = ET.SubElement(description, "images")
            
            largePromo = ET.SubElement(images, "large-promo")
            largePromo.text = filename
            largePromo.set("width", str(width))
            largePromo.set("height", str(height))
            
        #small-promo
        xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[2]/div[3]/div[2]/div[3]/@style"
        if self.session.at_xpath(xpath).value() == "":
            xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[2]/div[3]/div[2]/div[3]/img/@src"
            imgSrc = self.session.at_xpath(xpath).value()
            filename = "smallPromo_" + lang + "."
            width, height, filename = self.storeRes(imgSrc, filename, True)
            
            if images == None:
                images = ET.SubElement(description, "images")
            
            smallPromo = ET.SubElement(images, "small-promo")
            smallPromo.text = filename
            smallPromo.set("width", str(width))
            smallPromo.set("height", str(height))
            
            
        #screenshots
        screenshots = None
        xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[2]/@style"
        if self.session.at_xpath(xpath).value() != "":
            xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2][count(div)>1]"
            if self.session.at_xpath(xpath):
                if images == None:
                    images = ET.SubElement(description, "images")
                if screenshots == None:
                    screenshots = ET.SubElement(images, "screenshots")
                xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]"
                self.getScreenshots(screenshots, xpath, "phone", lang)
                
            xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2][count(div)>1]"
            if self.session.at_xpath(xpath):
                if images == None:
                    images = ET.SubElement(description, "images")
                if screenshots == None:
                    screenshots = ET.SubElement(images, "screenshots")
                xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]"
                self.getScreenshots(screenshots, xpath, "tablet7", lang)
                
            xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[2][count(div)>1]"
            if self.session.at_xpath(xpath):
                if images == None:
                    images = ET.SubElement(description, "images")
                if screenshots == None:
                    screenshots = ET.SubElement(images, "screenshots")
                xpath = "//section/div[3]/div[2]/div[3]/div[2]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[2]"
                self.getScreenshots(screenshots, xpath, "tablet10", lang)
            
        
        #videos
        xpath = "//section/div[3]/div[2]/div[3]/div[2]/fieldset/label/div[2]/div/input"
        if self.session.at_xpath(xpath).value() != "":
            videos = ET.SubElement(description, "videos")
            youtubeVideo = ET.SubElement(videos, "youtube-video")
            value = self.session.at_xpath(xpath).value()
            youtubeVideo.text = value.decode("utf-8")
        
    def getScreenshots(self, screenshots, xpath, name, lang):
        i = 1
        while self.session.at_xpath(xpath+"/div[" + str(i) + "]/div[1][contains(@style,'display: none;')]"):
            imageXPath = xpath + "/div[" + str(i) + "]/div[3]/img/@src"
            imgSrc = self.session.at_xpath(imageXPath).value()
            filename = name + "_screenshot_" + lang + "_" + str(i) + "."
            width, height, filename = self.storeRes(imgSrc, filename, True)
            
            screenshot = ET.SubElement(screenshots, "screenshot")
            screenshot.text = filename
            screenshot.set("width", str(width))
            screenshot.set("height", str(height))
            screenshot.set("index", str(i))
            i+=1
    
    
    def fillContentDesctiption(self, application):
        self._debug("content_desctiption", "start")
        
        content = ET.SubElement(application, "content-description")
        
        xpath = "//fieldset/label/div/div/div/select[@class=\"gwt-ListBox\"]"
        rateValue = self.session.at_xpath(xpath).value()
        rating = ET.SubElement(content, "content-rating")
        rating.text = {
            "SUITABLE_FOR_ALL" : "3",
            "PRE_TEEN" : "6",
            "TEEN" : "13",
            "MATURE" : "18"
        }[rateValue]
            
        self._debug("content_desctiption", "finish")
    
    
    def fillCustomerSupport(self, application):
        self._debug("customer_support", "start")
        
        custom = ET.SubElement(application, "customer-support")
        
        xpath = "//section/div[4]/div[2]/fieldset/label[1]/div/div/input"
        website = ET.SubElement(custom, "website")
        website.text = self.session.at_xpath(xpath).value()
        
        xpath = "//section/div[4]/div[2]/fieldset/label[2]/div/div/input"
        email = ET.SubElement(custom, "email")
        email.text = self.session.at_xpath(xpath).value()
        
        xpath = "//section/div[4]/div[2]/fieldset/label[3]/div/div/input"
        phone = ET.SubElement(custom, "phone")
        phone.text = self.session.at_xpath(xpath).value()
        
        self._debug("customer_support", "finish")
    
    
    def fillPrices(self, application):
        xpath = "//sidebar/nav/ol[2]/li[3]/a"
        self.session.at_xpath(xpath).click()
        
        consent = ET.SubElement(application, "consent")
        contentGuide = ET.SubElement(consent, "google-android-content-guidelines")
        xpath = "//section/div[2]/div[5]/fieldset/label[2]/div[2]/div/div/span/input[@type=\"checkbox\" and @value=\"on\"]"
        if self.session.at_xpath(xpath):
            contentGuide.text = "yes"
        else:
            contentGuide.text = "no"
            
        USExportLaws = ET.SubElement(consent, "us-export-laws")
        xpath = "//section/div[2]/div[5]/fieldset/label[3]/div[2]/div/span/input[@type=\"checkbox\" and @value=\"on\"]"
        if self.session.at_xpath(xpath):
            USExportLaws.text = "yes"
        else:
            USExportLaws.text = "no"
        
        countries = None
        price = ET.SubElement(application, "price")
        xpath = "//section/div[2]/div[2]/fieldset/label[1]/div[2]/div[1]/div[1]/div/button[1][@aria-pressed=\"true\"]"
        if self.session.at_xpath(xpath):
            price.set("free", "no")
            
            xpath = "//section/div[2]/div[2]/fieldset/label[2]/div[2]/div/div[1]/div/label/input"
            if self.session.at_xpath(xpath).value()!="":
                basePrice = ET.SubElement(price, "base-price")
                basePrice.text = self.session.at_xpath(xpath).value()
                
            xpath = "//section/div[2]/div[3]/div/div[1]/div/div[3]/div/div[2]/div/div/table/tbody/tr"
            
            current_dir = os.path.dirname(os.path.realpath(__file__))
            countries_file = os.path.join(current_dir, "spec",
                                           "google_countries.json")
            with open(countries_file, "r") as fp:
                countries_list = json.load(fp)
                for country in countries_list:
                    xpath = "//td[div/label[@data-country-checkbox][contains(text(), \"{}\")] \
                    [count(input[@type=\"checkbox\"][@checked])>0]]/following-sibling::td/div/label/input"
                    country_name = countries_list[country].encode("utf-8")
                    if self.session.at_xpath(xpath.format(country_name)):
                        value = self.session.at_xpath(xpath.format(country_name)).value()
                        if value != "":
                            localPrice = ET.SubElement(price, "local-price")
                            localPrice.set("country", country)
                            localPrice.text = value
        else:
            price.set("free", "yes")
            
            
        xpath = "//section/div[2]/div[3]/div/div[1]/div/div[3]/div/div[2]/div/div/table/tbody/tr"
        
        current_dir = os.path.dirname(os.path.realpath(__file__))
        countries_file = os.path.join(current_dir, "spec",
                                       "google_countries.json")
        with open(countries_file, "r") as fp:
            countries_list = json.load(fp)
            for country in countries_list:
                xpath = "//label[@data-country-checkbox][contains(text(), \"{}\")][count(input[@type=\"checkbox\"][@checked])>0]"
                country_name = countries_list[country].encode("utf-8")
                if self.session.at_xpath(xpath.format(country_name)):
                    if countries == None:
                        availability = ET.SubElement(application, "availability")
                        countries = ET.SubElement(availability, "countries")
                        countries.set("only-listed", "yes")
                                        
                    include = ET.SubElement(countries, "include")
                    include.text = country
        
        
    def getAPK(self, application):
        xpath = "//sidebar/nav/ol[2]/li[1]/a"
        self.session.at_xpath(xpath).click()
        
        xpath = "//section/div[2]/div[1]/div[1]/div[2]/div[3]/table/tbody[1]/tr[1]/td"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click()
            
            xpath = "//div[@class=\"gwt-PopupPanel\"]/div[@class=\"popupContent\"]/div[1]/div[1]/div[1]"
            package = self.session.at_xpath(xpath).text()
            application.set("package", package)
            
            self._debug("package", "finish")
            
            xpath = "//div[@class=\"gwt-PopupPanel\"]/div[@class=\"popupContent\"]/div/nav/button"
            if self.session.at_xpath(xpath):
                self.session.at_xpath(xpath).click()
        
        xpath = "//div[@role=\"tabpanel\"][1]/div[3]/div[1]/div[3]/div/div[2]/a"
        if self.session.at_xpath(xpath):
            self.session.at_xpath(xpath).click()
            
            i = 1
            xpath = "//div[@class=\"gwt-PopupPanel\"]/div[@class=\"popupContent\"]/div/div/ol//"
            if self.session.at_xpath(xpath+"li[@data-device-id][count(span[@aria-checked=\"true\"])][1]"):
                requirements = ET.SubElement(application, "requirements")
                supportedDevices = ET.SubElement(requirements, "supported-devices")
                
                while self.session.at_xpath(xpath+"li[@data-device-id][count(span[@aria-checked=\"true\"])]["+str(i)+"]"):
                    value = self.session.at_xpath(xpath+"li[@data-device-id][count(span[@aria-checked=\"true\"])]["+ \
                        str(i)+"]/@data-device-id").value()
                    exclude = ET.SubElement(supportedDevices, "exclude")
                    exclude.text = value
                    i+=1
            
            self._debug("supportedDevices", "finish")
            
            xpath = "//div[@class=\"gwt-PopupPanel\"]/div[@class=\"popupContent\"]/div/footer/button[2]"
            if self.session.at_xpath(xpath):
                self.session.at_xpath(xpath).click()
            


    def storeRes(self, src, filename, image=None):
        src = re.sub("-rw$", "", src)
        src = re.sub("\d*$", "9999", src)
        
        data = urllib.urlopen(src).read()
        #check image size/type
        if image != None:
            type, width, height = getImageInfo(data)
            type = re.sub("image/", "", type)
        filename += type
        f = open(filename, "wb")
        f.write(data)
        f.close()
        
        self.filelist.append(filename)
        if image != None:
            return (width, height, filename)

    def _debug(self, action, state):
        print action + " : " + state
        file_name = "{}-{}-{}.png".format(time.time(), action, state)
        self.session.render(file_name)
    
    def _quit(self):
        if self.locale != None:
            self.restore_locale()
        sys.exit(1)
    


if __name__ == "__main__":
    main()