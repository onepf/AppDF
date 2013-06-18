import os
import time
# import urlparse
# import urllib
# import urllib2
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


class GooglePlay(object):
    def __init__(self, app, username, password, debug_dir=None):
        self.app = app
        self.username = username
        self.password = password
        self.debug_dir = debug_dir

        self.session = dryscrape.Session()

        if self.debug_dir:
            if not os.path.exists(self.debug_dir):
                os.mkdir(self.debug_dir)

    # Publication process
    def publish(self):
        self.open_console()
        self.login()

        # assert bool(self.ensure_all_applications_header())

        # select All applications menu
        xpath = "//sidebar/nav/ul/li/a"
        self.session.at_xpath(xpath).click()
        
        if self.ensure_application_listed():
            self.open_app()
            self.add_languages()
        else:
            self.create_app()
            self.add_languages()
        
        # assert bool(self.ensure_application_header())
        # assert bool(self.ensure_store_listing_header())

        # self.fill_store_listing()
        self.load_apk()

    # Checks
    def ensure_all_applications_header(self):
        xpath = "//h2[normalize-space(text()) = 'All applications']"
        # TODO All applications == VSE PRILOZHENIYA
        return self._ensure(xpath)

    def ensure_application_listed(self):
        xpath = "//p[@data-column='TITLE']/span[contains(text(), '{}')]"
        return self._ensure(xpath.format(self.app.title()))

    def ensure_application_header(self):
        xpath = "//h2/span[contains(text(), '{}')]".format(self.app.title())
        return self._ensure(xpath)

    def ensure_store_listing_header(self):
        xpath = "//h3[contains(text(), 'Store Listing')]"
        # TODO Store Listing == DANNIE DLY GOOGLE PLAY
        return self._ensure(xpath)

    def ensure_saved_message(self):
        xpath = "//*[normalize-space(text()) = 'Saved']"
        # TODO Saved == Sohraneno
        return self._ensure(xpath)

    def ensure_add_language_header(self):
        xpath = "//"
        return self._ensure(xpath)
    
    def _ensure(self, xpath):
        return self.session.at_xpath(xpath, timeout=5)

    # Actions
    def open_console(self):
        self.session.visit("https://play.google.com/apps/publish/v2/")
        self._debug("open_console", "opened")

    def login(self):
        login_url = "https://accounts.google.com/ServiceLogin"

        if self.session.url().startswith(login_url):
            email_field = self.session.at_css("#Email")
            password_field = self.session.at_css("#Passwd")
            email_field.set(self.username)
            password_field.set(self.password)
            self._debug("login", "filled")

            email_field.form().submit()
            self.ensure_all_applications_header()
            self._debug("login", "submited")

    def open_app(self):
        xpath = "//p[@data-column='TITLE']/span[contains(text(), '{}')]"
        self.session.at_xpath(xpath.format(self.app.title())).click()
        
        # TODO select default language
        
        self.ensure_application_header()
        self._debug("open_app", "opened")
        

    def create_app(self):
        # xpath = "//*[normalize-space(text()) = 'Add new application']"
        # self.session.at_xpath(xpath).click()
        xpath = "//body/div/div/div/div/div/div/div/div/div/div/div/div/div/div/div/h2/button[position()=1]"
        self.session.at_xpath(xpath).click()
        self._debug("create_app", "popup_opened")

        self.session.at_css("div.popupContent input").set(self.app.title())
        self._debug("create_app", "filled")
        
        self.session.at_css("div.popupContent select").set("en-US")
        self._debug("create_app", "default_language_set['en-US']")
        
        # xpath = "//*[normalize-space(text()) = 'Prepare Store Listing']"
        # self.session.at_xpath(xpath).click()
        xpath = "//div[@class='gwt-PopupPanel']/div[@class='popupContent']//footer/button[position()=2]"
        self.session.at_xpath(xpath).click()
        
        self.ensure_application_header()
        self._debug("create_app", "created")
        
    
    def add_languages(self):
        xpath = "//section/div/div/div/div/div/button"
        self.session.at_xpath(xpath).click()
        self.ensure_application_header()
        self._debug("add_languages", "popup_opened")
        new_local = 0
        
        for desc in self.app.obj.application["description-localization"]:
            xpath = "//div[@class='popupContent']//tr/td/div/label/span[contains(text(), ' {}')]"
            xpath = xpath.format(desc.attrib["language"])
            
            if self.session.at_xpath(xpath) != None:
                new_local = 1
                self.session.at_xpath(xpath).click()
                # self._debug("add_languages", desc.attrib["language"])
            
        if new_local == 0:
            xpath = "//div[@class='popupContent']//footer/button[last()]"
            self.session.at_xpath(xpath).click()
        else:
            xpath = "//div[@class='popupContent']//footer/button[position()=1]"
            self.session.at_xpath(xpath).click()
            
        self._debug("add_languages", "finished")
        
    
    def fill_store_listing(self):
        self._debug("fill_store_listing", "start")
        xpath = "//button[contains(@data-lang-code, 'en-US')]"
        self.session.at_xpath(xpath).click()
        self.fill_localization("default")
        
        for desc in self.app.obj.application["description-localization"]:
            xpath = "//button[contains(@data-lang-code, '{}')]"
            xpath = xpath.format(desc.attrib["language"])
            self.session.at_xpath(xpath).click()
            self.fill_localization(desc.attrib["language"])
    
    def fill_localization(self, local):
        inputs = self.session.css("fieldset input")
        textareas = self.session.css("fieldset textarea")
        selects = self.session.css("fieldset select")

        assert len(inputs) == 7
        assert len(textareas) == 3
        assert len(selects) == 3

        fill(inputs, [
            self.app.title(local),
            self.app.video(),
            self.app.website(),
            self.app.email(),
            self.app.phone(),
            self.app.privacy_policy()
        ])

        fill(textareas, [
            self.app.full_description(local),
            self.app.short_description(local),
            self.app.recent_changes(local)
        ])

        if local=="default":
            fill(selects, [
                self.app.type(),
                self.app.category(),
                self.app.rating()
            ])
        
        # TODO screenshots ???
        
        # self.session.at_xpath("//*[normalize-space(text()) = 'Save']").click()
        self.session.at_xpath("//section/h3/button").click()
        self.ensure_saved_message()
        self._debug("fill_store_listing['"+local+"']", "saved")

    def load_apk(self):
        xpath = "//sidebar/ol[@aria-hidden='false']/li/a"
        self.session.at_xpath(xpath).click()
        self.ensure_application_header()
        self._debug("load_apk", "select_apk_folder")
        
        xpath = "//section/div/div/div/div/div/div/div/button"
        self.session.at_xpath(xpath).click()
        self.ensure_application_header()
        self._debug("load_apk", "click_apk_button")
        
        #xpath = "//div[@class='gwt-PopupPanel']/div[@class='popupContent']/div/div/div/div/button"
        #self.session.at_xpath(xpath).click()
        xpath = "//div[@class='gwt-PopupPanel']/div[@class='popupContent']/div/div/div/div/button"
        
        # self.session.at_xpath(xpath).drag_to(self.session.at_xpath(xpath1))
        self.session.at_xpath(xpath).eval_script('document.getElementByTag("body").innerHTML="TEST"')
        
        # TODO apk file ???
        
    # Helpers
    def _debug(self, action, state):
        print action + " : " + state
        if self.debug_dir:
            file_name = "{}-{}-{}.png".format(time.time(), action, state)
            self.session.render(os.path.join(self.debug_dir, file_name))
