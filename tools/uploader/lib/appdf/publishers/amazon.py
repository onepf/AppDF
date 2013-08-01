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
            self.fill_description()
            #self.fill_images_multimedia()
            self.fill_content_rating()
            #self.fill_binary_files()
        else:
            self.create_application()
            self.fill_general_information()
            self.fill_availability()
            self.fill_description()
            #self.fill_images_multimedia()
            self.fill_content_rating()
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
            
        self._debug("general_info", "start")
        
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
            self.app.privacy_policy()
        ])
        
        #category selection
        xpath = "//select[@id=\"parentCategoryList\"]/option[contains(text(), \"{}\")]"
        #xpath = xpath.format(self.app.category())
        xpath = xpath.format("Cooking") #TEMPORARY DATA. REMOVE
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
            if self.session.at_xpath(xpath):
                subcategory_value = self.session.at_xpath(xpath).value()
                fill([
                    self.session.at_xpath("//select[@id=\"childCategoryList\"]")
                ], [
                    subcategory_value
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
        
        self._debug("fill_availability", "fill")
        
        xpath = "//input[@id=\"submit_button\"]"
        self.session.at_xpath(xpath).click();
        self._debug("fill_availability", "save")
        
    def fill_description(self):
        xpath = "//a[@id=\"header_nav_description_a\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        xpath = "//a[@id=\"edit_button\"]"
        if self.session.at_xpath(xpath):
            self._ensure(xpath).click();
        
        #follow localisation
        # ul#collectable_nav_list
        
        #save and add translation
        xpath = "//input[@id=\"save_and_add_button\"]"
        
        fill([
            self.session.at_xpath("//textarea[@id=\"dpShortDescription\"]"),
            self.session.at_xpath("//textarea[@id=\"publisherDescription\"]"),
            self.session.at_xpath("//textarea[@id=\"dpMarketingBulletsStr\"]"),
            self.session.at_xpath("//textarea[@id=\"keywordsString\"]")
        ], [
            self.app.short_description("default"),
            self.app.full_description("default"),
            self.app.features("default"),
            self.app.keywords("default")
        ])
        
        self._debug("description", "fill")
        
        xpath = "//input[@id=\"submit_button\"]"
        self.session.at_xpath(xpath).click();
        self._debug("description", "save")
        
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
        
        
        #maturityratingcategory.alcohol_tobacco_or_drug_use_or_references_0
        #maturityratingcategory.cartoon_or_fantasy_violence_0
        #maturityratingcategory.cultural_or_religious_intolerance_0
        #maturityratingcategory.nudity_0
        #maturityratingcategory.profanity_or_crude_humor_0
        #maturityratingcategory.realistic_violence_0
        #maturityratingcategory.sexual_and_suggestive_content_0
        
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

    