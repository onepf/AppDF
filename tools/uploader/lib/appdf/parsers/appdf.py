import os
import zipfile
import lxml.etree
import lxml.objectify

import sys

# @silent_normalize
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
        return self.obj.application["customer-support"].website

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
        if local=="default":
            result = ""
            for feature in self.obj.application.description.texts.features.feature:
                result += feature + "\n"
            return result
        else:
            for desc in self.obj.application["description-localization"]:
                if desc.attrib["language"]==local:
                    if hasattr(desc, "texts") and hasattr(desc.texts, "features"):
                        result = ""
                        for feature in desc.texts.features.feature:
                            result += feature + "\n"
                        return result
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

