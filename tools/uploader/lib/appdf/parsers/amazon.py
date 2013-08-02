from __future__ import absolute_import

import os
import json
import re
from appdf.parsers import AppDF


class Amazon(AppDF):
    def type(self):
        return super(Amazon, self).type().upper()

    def category(self):
        type = super(Amazon, self).type()
        category = super(Amazon, self).category()
        subcategory = super(Amazon, self).subcategory()
        
        current_dir = os.path.dirname(os.path.realpath(__file__))
        categories_file = os.path.join(current_dir, "..", "..", "..", "spec",
                                       "store_categories.json")
        
        with open(categories_file, "r") as fp:
            categories = json.load(fp)
            amazon_category = self.replace(categories[type][category][subcategory]["amazon"])
            return amazon_category.split("/")[0]

    def subcategory(self):
        type = super(Amazon, self).type()
        category = super(Amazon, self).category()
        subcategory = super(Amazon, self).subcategory()
        
        current_dir = os.path.dirname(os.path.realpath(__file__))
        categories_file = os.path.join(current_dir, "..", "..", "..", "spec",
                                       "store_categories.json")
        
        with open(categories_file, "r") as fp:
            categories = json.load(fp)
            amazon_category = self.replace(categories[type][category][subcategory]["amazon"])
            return amazon_category.split("/")[1] if len(amazon_category.split("/")) == 2 else ""
    
    def replace(self, category):
        category = re.sub("(\s*/\s*)", "/", category)
        category = re.sub("^(\s*)", "", category)
        category = re.sub("(\s*)$", "", category)
        return category
    
    def include_content(self):
        content_inc = self.obj.application["content-description"]["included-activities"]
        return [
            "false" if content_inc["account-creation"] == "no" else "true", 
            "false" if content_inc["advertising"] == "no" else "true", 
            "false" if content_inc["gambling"] == "no" else "true", 
            "false" if content_inc["personal-information-collection"] == "no" else "true", 
            "false" if content_inc["user-to-user-communications"] == "no" 
                and content_inc["user-generated-content"] == "no" else "true"
        ]
    
    def free_app_of_day(self):
        if hasattr(self.obj.application, "store-specific"):
            if hasattr(self.obj.application["store-specific"], "amazon"):
                if hasattr(self.obj.application["store-specific"]["amazon"], "free-app-of-the-day-eligibility"):
                    amazon = self.obj.application["store-specific"]["amazon"]["free-app-of-the-day-eligibility"]
                    return "true" if amazon == "yes" else "false"
        return "false"
        
    def content_desc(self):
        content = self.obj.application["content-description"]["content-descriptors"]
        alchohol = [
            self.exchange(content["drugs"]),
            self.exchange(content["alcohol"]),
            self.exchange(content["smoking"])
        ]
        cartoon_violance = self.exchange(content["cartoon-violence"])
        intolerance = self.exchange(content["discrimination"])
        real_violance = self.exchange(content["realistic-violence"])
        sexual_content = self.exchange(content["sexual-content"])
        nudity = sexual_content;
        #bad-language
        #fear
        #gambling-reference
        
        return [
            str(max(alchohol)),
            str(cartoon_violance),
            str(intolerance),
            str(nudity),
            "0", #Profanity or crude humor
            str(real_violance),
            str(sexual_content),
        ]
    def exchange(self, data):
        return 0 if data == "no" else 1 if data == "light" else 2
    
    def rating(self):
        rating = super(Amazon, self).rating()

        return {
            "3": "SUITABLE_FOR_ALL",
            "6": "PRE_TEEN",
            "10": "TEEN",
            "13": "TEEN",
            "17": "MATURE",
            "18": "MATURE"
        }[rating]

        
        