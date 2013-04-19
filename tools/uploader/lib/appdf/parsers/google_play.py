from __future__ import absolute_import

import os
import json
from appdf.parsers import AppDF


class GooglePlay(AppDF):
    def type(self):
        return super(GooglePlay, self).type().upper()

    def category(self):
        category_pieces = super(GooglePlay, self).category().split("/")

        category = category_pieces[0]
        subcategory = category_pieces[1] if len(category_pieces) == 2 else ""

        type = super(GooglePlay, self).type()

        current_dir = os.path.dirname(os.path.realpath(__file__))
        categories_file = os.path.join(current_dir, "..", "..", "..", "spec",
                                       "store_categories.json")

        with open(categories_file, "r") as fp:
            categories = json.load(fp)
            google_category = categories[type][category][subcategory]["google"]
            return google_category.upper().replace(" ", "_").replace("&", "AND")

    def rating(self):
        rating = super(GooglePlay, self).rating()

        return {
            "3": "SUITABLE_FOR_ALL",
            "6": "PRE_TEEN",
            "10": "TEEN",
            "13": "TEEN",
            "17": "MATURE",
            "18": "MATURE"
        }[rating]
