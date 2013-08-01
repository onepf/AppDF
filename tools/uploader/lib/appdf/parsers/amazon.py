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
        content = [
            "false" if self.obj.application["content-description"]["included-activities"]["account-creation"] == "no" else "true", 
            "false" if self.obj.application["content-description"]["included-activities"]["advertising"] == "no" else "true", 
            "false" if self.obj.application["content-description"]["included-activities"]["gambling"] == "no" else "true", 
            "false" if self.obj.application["content-description"]["included-activities"]["personal-information-collection"] == "no" else "true", 
            "false" if self.obj.application["content-description"]["included-activities"]["user-to-user-communications"] == "no" 
                and self.obj.application["content-description"]["included-activities"]["user-generated-content"] == "no" else "true"
        ]
        return content
    
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

        
        