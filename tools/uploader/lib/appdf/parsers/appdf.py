import os
import zipfile
import json
import lxml.etree
import lxml.objectify
import re

import sys

def silent_normalize(f):
    def decorate(self, local="default"):
        try:
            if local=="default":
                node = f(self)
            else:
                node = f(self, local)
            return node.text.encode("utf-8")
        except AttributeError:
            return None

    return decorate


class AppDF(object):
    def __init__(self, file_path):
        self.file_path = file_path
        self.archive = None

    def parse(self):
        with zipfile.ZipFile(self.file_path, "r") as archive:
            if archive.testzip():
                raise RuntimeError("AppDF file `{}' is broken".format(file))

            if "description.xml" not in archive.namelist():
                raise RuntimeError("Invalid AppDF file `{}'".format(file))

            self.archive = archive
            self.xml = archive.read("description.xml")
            self.obj = lxml.objectify.fromstring(self.xml)
    
    def validate(self):
        current_dir = os.path.dirname(os.path.realpath(__file__))
        xsd_file = os.path.join(current_dir, "..", "..", "..", "spec",
                                "appdf-description.xsd")
        schema = lxml.etree.XMLSchema(lxml.etree.parse(xsd_file))
        schema.assertValid(lxml.etree.fromstring(self.xml))

    @silent_normalize
    def title(self, local="default"):
        if local == "default":
            return self.obj.application.description.texts.title #required tag
        elif hasattr(self.obj.application, "description-localization"): #optional tags
            for desc in self.obj.application["description-localization"]:
                if desc.attrib["language"] == local:
                    if hasattr(desc, "texts") and hasattr(desc.texts, "title"):  #optional tags
                        return desc.texts.title
                    else:
                        return ""
        else:
            return ""
            
    def video(self): #optional tags
        if hasattr(self.obj.application.description, "videos") and hasattr(self.obj.application.description, "youtube-video") and self.obj.application.description.videos["youtube-video"]:
            video_id = self.obj.application.description.videos["youtube-video"]
            url = "http://www.youtube.com/watch?v={}".format(video_id)
            return url
        else:
            return ""

    @silent_normalize
    def website(self): #required tags
        site = str(self.obj.application["customer-support"].website)
        if re.search("http", str(site)) == None:
            site.append("http://")
        return site

    @silent_normalize
    def email(self): #required tags
        return self.obj.application["customer-support"].email

    @silent_normalize
    def phone(self): #required tags
        return self.obj.application["customer-support"].phone

    @silent_normalize
    def privacy_policy(self): #optional tag
        if hasattr(self.obj.application.description.texts, "privacy-policy"):
            return self.obj.application.description.texts["privacy-policy"]
        else:
            return ""

    def privacy_policy_link(self): #optional tag
        if hasattr(self.obj.application.description.texts, "privacy-policy"):
            return self.obj.application.description.texts["privacy-policy"].attrib["href"]
        else:
            return ""

    @silent_normalize
    def full_description(self, local="default"):
        try:
            if local=="default": #required tag
                return self.obj.application.description.texts["full-description"]
            elif hasattr(self.obj.application, "description-localization"): #optional tag
                for desc in self.obj.application["description-localization"]:
                    if desc.attrib["language"]==local:
                        if hasattr(desc, "texts") and hasattr(desc.texts, "full-description"):
                            return desc.texts["full-description"]
                        else:
                            return ""
        except AttributeError:
            return ""

    @silent_normalize
    def short_description(self, local="default"):
        try:
            if local=="default": #required tag
                return self.obj.application.description.texts["short-description"]
            elif hasattr(self.obj.application, "description-localization"): #optional tag
                for desc in self.obj.application["description-localization"]:
                    if desc.attrib["language"]==local:
                        if hasattr(desc, "texts") and hasattr(desc.texts, "short-description"):
                            return desc.texts["short-description"]
                        else:
                            return ""
        except AttributeError:
            return ""

    #@silent_normalize
    def features(self, local="default"):
        result = ""
        if local=="default":
            for feature in self.obj.application.description.texts.features.feature:
                result += feature + "\n"
            return result.encode("utf-8")
        else:
            for desc in self.obj.application["description-localization"]:
                if desc.attrib["language"]==local:
                    if hasattr(desc, "texts") and hasattr(desc.texts, "features") and hasattr(desc.texts.features, "feature"):
                        for feature in desc.texts.features.feature:
                            result += feature + "\n"
                        return result.encode("utf-8")
                    else:
                        return ""
    
    @silent_normalize
    def recent_changes(self, local="default"):
        if local=="default": #optional tag
            if hasattr(self.obj.application.description.texts, "recent-changes"):
                return self.obj.application.description.texts["recent-changes"]
            else:
                return ""
        elif hasattr(self.obj.application, "description-localization"): #optional tag
            for desc in self.obj.application["description-localization"]:
                if desc.attrib["language"]==local:
                    if hasattr(desc, "texts") and hasattr(desc.texts, "recent-changes"):
                        return desc.texts["recent-changes"]
                    else:
                        return ""

    @silent_normalize
    def type(self): #required tag
        return self.obj.application.categorization.type

    @silent_normalize
    def category(self): #required tag
        return self.obj.application.categorization.category
        
    @silent_normalize
    def subcategory(self): #optional tag
        if hasattr(self.obj.application.categorization, "subcategory"):
            return self.obj.application.categorization.subcategory
        else:
            return ""

    @silent_normalize
    def rating(self): #required tag
        return self.obj.application["content-description"]["content-rating"]
    
    def price(self):
        return "yes" if self.obj.application.price.attrib["free"]=="yes" else "no"
    
    def base_price(self):
        return self.obj.application.price["base-price"]
    
    def local_price(self, local="default"):
        if hasattr(self.obj.application.price, "local-price"):
            for local_price in self.obj.application.price["local-price"]:
                if local_price.attrib["country"] == local:
                    return local_price
        return -1
    
    def countries(self):
        result = []
        if hasattr(self.obj.application, "availability") and hasattr(self.obj.application.availability, "countries"):
            country = self.obj.application.availability.countries
            if country.attrib["only-listed"] == "yes":
                return "include"
            else:
                return "exclude"
        else: 
            return ""
            
    def countries_list(self):
        result = []
        if hasattr(self.obj.application, "availability") and hasattr(self.obj.application.availability, "countries"):
            current_dir = os.path.dirname(os.path.realpath(__file__))
            countries_file = os.path.join(current_dir, "..", "..", "..", "spec",
                                           "amazon_countries.json")
            
            with open(countries_file, "r") as fp:
                countries_json = json.load(fp)
                country = self.obj.application.availability.countries
                if country.attrib["only-listed"] == "yes":
                    for include in country.include:
                        if include in countries_json:
                            result.append(countries_json[include])
                    return result
                else:
                    for exclude in country.exclude:
                        if exclude in countries_json:
                            result.append(countries_json[exclude])
                    return result
        else: 
            return result

    def period_since(self):
        if hasattr(self.obj.application, "availability") and hasattr(self.obj.application.availability, "period"):
            if hasattr(self.obj.application.availability.period, "since"):
                since = self.obj.application.availability.period.since
                return since.attrib["month"] + "/" + since.attrib["day"] + "/" + since.attrib["year"][2:4]
        return None
        
    def period_until(self):
        if hasattr(self.obj.application, "availability") and hasattr(self.obj.application.availability, "period"):
            if hasattr(self.obj.application.availability.period, "until"):
                until = self.obj.application.availability.period.until
                return until.attrib["month"] + "/" + until.attrib["day"] + "/" + until.attrib["year"][2:4]
        return None
        
    @silent_normalize
    def keywords(self, local="default"):
        if local=="default": #optional tag
            if hasattr(self.obj.application.description.texts, "keywords"):
                return self.obj.application.description.texts["keywords"]
            else:
                return ""
        elif hasattr(self.obj.application, "description-localization"): #optional tag
            for desc in self.obj.application["description-localization"]:
                if desc.attrib["language"]==local:
                    if hasattr(desc, "texts") and hasattr(desc.texts, "keywords"):
                        return desc.texts["keywords"]
                    else:
                        return ""

