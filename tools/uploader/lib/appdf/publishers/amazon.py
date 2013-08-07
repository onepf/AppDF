#coding: utf-8
import os
import re
import time
import dryscrape


def fill(elements, values):
    for i, value in enumerate(values):
        if value:
            element = elements[i]
            element.set(value)
            element.eval_script("""
                var event = document.createEvent("HTMLEvents");
                event.initEvent("change", true, true);
                node.dispatchEvent(event);
            """)


class Amazon(object):
    def __init__(self, app, username, password, debug_dir=None):
        self.app = app
        self.username = username
        self.password = password
        self._debug_dir = debug_dir

        self.session = dryscrape.Session()
        #self.driver = dryscrape.driver.webkit.Driver()

        if self._debug_dir:
            if not os.path.exists(self._debug_dir):
                os.mkdir(self._debug_dir)

    def publish(self):
        self.open_console()
        self.login()
        
        if self.ensure_application_listed():
            self.open_application()
            self.fill_general_information()
            self.fill_availability()
            #self.fill_description()
            #self.fill_content_rating()
            
            #self.fill_images_multimedia()
            #self.fill_binary_files()
        else:
            self.create_application()
            self.fill_general_information()
            self.fill_availability()
            #self.fill_description()
            #self.fill_content_rating()
            
            #self.fill_images_multimedia()
            #self.fill_binary_files()
            
        
    # Actions
    def open_console(self):
        self.session.visit("https://developer.amazon.com/welcome.html")
        self._debug("open_console", "opened")

    def login(self):
        xpath = "//a[@id=\"header_login_link\"]"
        self.session.at_xpath(xpath).click()
        
        email_field = self.session.at_css("#ap_email")
        #radio_button
        self.session.at_css("#ap_signin_existing_radio").click()
        password_field = self.session.at_css("#ap_password")
        submit_button = self.session.at_css("#signInSubmit-input")
        
        self.password = re.sub("\^", "", self.password)
        #TEMPORARY PASSWORD DATA. REMOVE
        self.password = "SIjsEDFk83&3l"
        
        email_field.set(self.username)
        password_field.set(self.password)
        self._debug("login", "filled")
        
        email_field.form().submit()
        self._debug("login", "submited")    
        
    
    def open_application(self):
        xpath = "//span[@class=\"itemTitle\" and contains(text(), '{}')]"
        self._ensure(xpath.format(self.app.title())).click()
        self._debug("open_application", "open")
        
    def create_application(self):
        xpath = "//a[@id=\"add_new_app_link\"]"
        self._ensure(xpath).click()
        self._debug("create_application", "create")
        
        
        
        
    def fill_general_information(self):
        xpath = "//a[@id=\"header_nav_general_information_a\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
            
        xpath = "//a[@id=\"edit_button\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        self._debug("general_info", "edit")
        
        if self.session.at_xpath("//input[@id=\"same\" and @checked]"):
            self.session.at_xpath("//input[@id=\"same\" and @checked]").click()
        
        fill([
            self.session.at_xpath("//input[@id=\"title\"]"),
            self.session.at_xpath("//input[@id=\"email\"]"),
            self.session.at_xpath("//input[@id=\"phone\"]"),
            self.session.at_xpath("//input[@id=\"website\"]"),
            self.session.at_xpath("//input[@id=\"privacyPolicyUrl\"]")
        ], [
            self.app.title("default"),
            self.app.email(),
            self.app.phone(),
            self.app.website(),
            self.app.privacy_policy_link()
        ])
        
        #category selection
        xpath = "//select[@id=\"parentCategoryList\"]/option[contains(text(), \"{}\")]"
        #xpath = xpath.format("Cooking") #TEMPORARY. REMOVE
        xpath = xpath.format(self.app.category())
        category_value = self.session.at_xpath(xpath).value()
        fill([
            self.session.at_xpath("//select[@id=\"parentCategoryList\"]")
        ], [
            category_value
        ])
        
        #subcategory selection
        if self.app.subcategory() != "":
            xpath = "//select[@id=\"childCategoryList\"]/option[contains(text(), \"{}\")]"
            xpath = xpath.format(self.app.subcategory())
            if self._ensure(xpath):
                subcategory_value = self.session.at_xpath(xpath).value()
                fill([
                    self.session.at_xpath("//select[@id=\"childCategoryList\"]")
                ], [
                    subcategory_value #u"M1E6O3ZVOOL35E"
                ])
        
        self._debug("general_info", "fill")
        
        xpath = "//input[@id=\"submit_button\"]"
        self.session.at_xpath(xpath).click();
        self._debug("general_info", "save")
        
    def fill_availability(self):
        xpath = "//a[@id=\"header_nav_availability_pricing_a\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        xpath = "//a[@id=\"edit_button\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        self._debug("fill_availability", "edit")
        
        #countries
        if self.app.countries()=="include":
            #remove selection
            for selection in ["AF", "AN", "AS", "EU", "NA", "OC", "SA"]:
                self.session.at_xpath("//div[@id=\"" + selection + "\"]/label[1]/input").click()
                if self.session.at_xpath("//div[@id=\"" + selection + "\"]/label[1]/input[@checked]"):
                    self.session.at_xpath("//div[@id=\"" + selection + "\"]/label[1]/input[@checked]").click()
            
            #only listed
            for country in self.app.countries_list():
                pass #TODO
            
        elif self.app.countries()=="exclude":
            self.session.at_xpath("//input[@id=\"availableWorldWide2\"]").click()
            
            #set selection
            for selection in ["AF", "AN", "AS", "EU", "NA", "OC", "SA"]:
                self.session.at_xpath("//div[@id=\"" + selection + "\"]/label[1]/input").click()
                if self.session.at_xpath("//div[@id=\"" + selection + "\"]/label[1]/input[@checked]"):
                    pass
                else:
                    self.session.at_xpath("//div[@id=\"" + selection + "\"]/label[1]/input").click()
            
            #all except
            for country in self.app.countries_list():
                pass #TODO
            
        else:
            self.session.at_xpath("//input[@id=\"availableWorldWide1\"]").click()
            
        self._debug("fill_availability", "countries")
        
        #prices
        if self.app.price()=="yes":
            self.session.at_xpath("//input[@id=\"charging-no-free-app\"]").click()
        else:
            self.session.at_xpath("//input[@id=\"charging-yes\"]").click()
            fill([
                self.session.at_xpath("//select[@id=\"base_currency\"]"),
                self.session.at_xpath("//input[@id=\"price\"]")
            ],[
                "USD", #base currency
                self.app.base_price()
            ])
            
            self.session.at_xpath("//input[@id=\"pricing_custom\"]").click()
            
            currency = self.app.currency()
            for country in currency:
                local_price = self.app.local_price(country)
                if local_price != -1:
                    fill([
                        self.session.at_xpath("//input[@id=\"" + currency[country] + "_" + country + "\"]")
                    ],[
                        local_price
                    ])
        
        self._debug("fill_availability", "prices")
        
        #free app of day
        fill([
            self.session.at_xpath("//input[@id=\"fad\"]")
        ], [
            self.app.free_app_of_day()
        ])
        
        self._debug("fill_availability", "fill")
        
        xpath = "//input[@id=\"submit_button\"]"
        self.session.at_xpath(xpath).click();
        self._debug("fill_availability", "save")
        
    def fill_description(self):
        xpath = "//a[@id=\"header_nav_description_a\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        self.form_description("default")
        
        if hasattr(self.app.obj.application, "description-localization"):
            language_json = self.app.language()
            for desc in self.app.obj.application["description-localization"]:
                language = desc.attrib["language"]
                if language in language_json:
                    xpath = "//ul[@id=\"collectable_nav_list\"]/li/a[contains(text(), \"{}\")]"
                    xpath = xpath.format(language_json[language])
                    if self.session.at_xpath(xpath):
                        self.session.at_xpath(xpath).click()
                        self.form_description(language)
                    else:
                        xpath = "//ul[@id=\"collectable_nav_list\"]/li[last()]/a"
                        self.session.at_xpath(xpath).click()
                        self.form_description(language, language_json[language])
        
    def form_description(self, local="default", localeLabel=""):
        xpath = "//a[@id=\"edit_button\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        elif localeLabel != "":
            xpath = "//select[@id=\"locale\"]/option[contains(text(), \"{}\")]"
            xpath = xpath.format(localeLabel)
            fill([
                self.session.at_xpath("//select[@id=\"locale\"]")
            ], [
                self.session.at_xpath(xpath).value()
            ])
        
        fill([
            self.session.at_xpath("//textarea[@id=\"dpShortDescription\"]"),
            self.session.at_xpath("//textarea[@id=\"publisherDescription\"]"),
            self.session.at_xpath("//textarea[@id=\"dpMarketingBulletsStr\"]"),
            self.session.at_xpath("//textarea[@id=\"keywordsString\"]")
        ], [
            self.app.short_description(local),
            self.app.full_description(local),
            self.app.features(local),
            self.app.keywords(local)
        ])
        self._debug("description", "fill_"+local)
        
        xpath = "//input[@id=\"submit_button\"]"
        self.session.at_xpath(xpath).click();
        self._debug("description", "store_"+local)
    
    def fill_images_multimedia(self):
        xpath = "//a[@id=\"header_nav_multimedia_a\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        xpath = "//a[@id=\"edit_button\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        
        self._debug("images_multimedia", "fill")
        
        xpath = "//input[@id=\"submit_button\"]"
        self.session.at_xpath(xpath).click();
        self._debug("images_multimedia", "save")
        
    def fill_content_rating(self):
        xpath = "//a[@id=\"header_nav_rating_a\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        xpath = "//a[@id=\"edit_button\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        content_desc = self.app.content_desc()
        
        xpath = "//input[@id=\"maturityratingcategory.alcohol_tobacco_or_drug_use_or_references_" + content_desc[0] + "\"]"
        self.session.at_xpath(xpath).click()
        xpath = "//input[@id=\"maturityratingcategory.cartoon_or_fantasy_violence_" + content_desc[1] + "\"]"
        self.session.at_xpath(xpath).click()
        xpath = "//input[@id=\"maturityratingcategory.cultural_or_religious_intolerance_" + content_desc[2] + "\"]"
        self.session.at_xpath(xpath).click()
        xpath = "//input[@id=\"maturityratingcategory.nudity_" + content_desc[3] + "\"]"
        self.session.at_xpath(xpath).click()
        xpath = "//input[@id=\"maturityratingcategory.profanity_or_crude_humor_" + content_desc[4] + "\"]"
        self.session.at_xpath(xpath).click()
        xpath = "//input[@id=\"maturityratingcategory.realistic_violence_" + content_desc[5] + "\"]"
        self.session.at_xpath(xpath).click()
        xpath = "//input[@id=\"maturityratingcategory.sexual_and_suggestive_content_" + content_desc[6] + "\"]"
        self.session.at_xpath(xpath).click()
        
        fill([
            self.session.at_xpath("//input[@id=\"maturityratingcategory.account_creation\"]"),
            self.session.at_xpath("//input[@id=\"maturityratingcategory.advertisements\"]"),
            self.session.at_xpath("//input[@id=\"maturityratingcategory.gambling\"]"),
            self.session.at_xpath("//input[@id=\"maturityratingcategory.location_detection\"]"),
            self.session.at_xpath("//input[@id=\"maturityratingcategory.user_generated_content_or_user_to_user_communication\"]")
        ], 
            self.app.include_content()
        )
        
        self._debug("content_rating", "fill")
        
        xpath = "//input[@id=\"submit_button\"]"
        self.session.at_xpath(xpath).click();
        self._debug("content_rating", "save")
        
    def fill_binary_files(self):
        xpath = "//a[@id=\"header_nav_binary_a\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        xpath = "//a[@id=\"edit_button\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        
        self._debug("binary_files", "fill")
        
        xpath = "//input[@id=\"submit_button\"]"
        self.session.at_xpath(xpath).click();
        self._debug("binary_files", "save")
        
        
    # Checks
    def ensure_application_listed(self):
        xpath = "//span[@class=\"itemTitle\" and contains(text(), '{}')]"
        return self._ensure(xpath.format(self.app.title()))
    
    def _ensure(self, xpath):
        return self.session.at_xpath(xpath, timeout=5)
    
        
    
    # Helpers
    def _debug(self, action, state):
        print action + " : " + state
        
        #if self._debug_dir:
        file_name = "{}-{}-{}.png".format(time.time(), action, state)
            #self.session.render(os.path.join(self._debug_dir, file_name))
        self.session.render(file_name)

    