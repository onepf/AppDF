import json
from zipfile import ZipFile
from lxml import etree

__DEFAULT_APPDF_LANGUAGE = 'en'
__ICONS_RESOLUTIONS = [(512, 512)]
__SCREENSHOT_SIDE_SIZE_MIN = 240
__SCREENSHOT_SIDE_SIZE_MAX = 1920


def __parse_categorization(product, categorization_node):
    category_type = categorization_node.find('type').text.lower()
    category_name = categorization_node.find('category').text.lower()
    product['category'] = (category_type, category_name)


def __parse_content_description(product, content_description_node):
    content_rating_age = int(content_description_node.find('content-rating').text)
    if content_rating_age < 14:
        product['age_limit'] = 0
    elif 14 <= content_rating_age < 18:
        product['age_limit'] = 2
    else:
        product['age_limit'] = 3


def __parse_texts(product, whats_new, texts_node, language):
    """
    @param texts_node, language: input
    @param product, whats_new: output
    """
    if 'title' not in product:
        product['title'] = {}
    for title_node in texts_node.findall('title'):
        if len(product['title'].get(language, '')) < len(title_node.text):
            product['title'][language] = title_node.text

    if 'description' not in product:
        product['description'] = {}
    full_description_node = texts_node.find('full-description')
    if full_description_node is not None:
        description = []
        description.append( full_description_node.text )
        for markup_node in full_description_node:
            if markup_node.tag == 'li':
                description.append('* ')
                description.append(markup_node.text)
            elif (markup_node.tag == 'a') and ('href' in markup_node.keys()):
                description.append(markup_node.text)
                description.append(' ( ')
                description.append(markup_node.get('href'))
                description.append(' )')
            else:
                description.append(markup_node.text)
            description.append(markup_node.tail)
        product['description'][language] = ''.join(description)

    recent_changes_node = texts_node.find('recent-changes')
    if recent_changes_node is not None:
        whats_new[language] = recent_changes_node.text


def __parse_images(product, images_node):
    to_upload = []

    max_icon_size = -1
    best_icon_file_name = None
    for icon_node in images_node.findall('app-icon'):
        icon_size = int(icon_node.get('width'))
        if (max_icon_size < icon_size) and ((icon_size, icon_size) in __ICONS_RESOLUTIONS):
            max_icon_size = icon_size
            best_icon_file_name = icon_node.text
    if best_icon_file_name:
        to_upload.append( ('icon', best_icon_file_name) )

    large_promo_node = images_node.find('large-promo')
    if large_promo_node is not None:
        to_upload.append(
                ('featured_screen', large_promo_node.text) )

    screenshots_files_names = {}
    screenshots_sizes = {}
    for screenshot_node in images_node.findall('screenshots/screenshot'):
        width = int(screenshot_node.get('width'))
        height = int(screenshot_node.get('height'))
        index = int(screenshot_node.get('index'))

        is_width_fit = (__SCREENSHOT_SIDE_SIZE_MIN <= width <= __SCREENSHOT_SIDE_SIZE_MAX)
        is_height_fit = (__SCREENSHOT_SIDE_SIZE_MIN <= height <= __SCREENSHOT_SIDE_SIZE_MAX)
        has_best_size = (screenshots_sizes.get(index, 0) < width * height)

        if is_width_fit and is_height_fit and has_best_size:
            screenshots_files_names[index] = screenshot_node.text
            screenshots_sizes[index] = width*height

    to_upload.extend(map(
            lambda screenshot_file_name: ('screenshot', screenshot_file_name),
            screenshots_files_names.values()
    ))

    return to_upload


def __parse_description(product, whats_new, description_node, is_default):
    """
    @param description_node, is_default: input
    @param product, whats_new: output
    """
    language = __DEFAULT_APPDF_LANGUAGE if is_default else description_node.get('language')

    texts_node = description_node.find('texts')
    if texts_node is not None:
        __parse_texts(product, whats_new, texts_node, language)

    if is_default:
        images_node = description_node.find('images')
        if images_node is not None:
            return __parse_images(product, images_node)
    return []


def __get_countries():
    countries = set(json.load(countries_file).keys())


def __parse_availability(product, availability_node):
    countries = __get_countries()
    countries_available = []

    countries_node = availability_node.find('countries')
    if countries_node.find('include') is not None: # White list of countries
        for include_node in countries_node.findall('include'):
            country = include_node.text.lower()
            if country in countries:
                countries_available.append(country)
            else:
                raise Exception('Unknown country of distribution')
    else: # Black list of countries
        countries_to_exclude = set()
        for exclude_node in countries_node.findall('exclude'):
            country = exclude_node.text.lower()
            if country in countries:
                countries_to_exclude.add(country)
            else:
                raise Exception('Unknown country of distribution')
        countries_available = filter(
                lambda c: c not in countries_to_exclude,
                __get_countries())

    product['countries_available'] = countries_available


def __parse_price(product, price_node):
    is_free_str = price_node.get('free')
    if is_free_str == 'yes':
        product['is_free'] = True
        product['price'] = '0.00'
    elif is_free_str == 'no':
        product['is_free'] = False
        product['price'] = price_node.find('base-price').text
    else:
        raise Exception('free != yes|no')


def __parse_apk_files(product, apk_files_node):
    apk_files = []
    for apk_file_node in apk_files_node.findall('apk-file'):
        apk_files.append(apk_file_node.text)
    return apk_files


def __parse_application(app_node, appdf):
    """
    Parses an application described by XML node.
    Returns object of product.
    """
    product = {
        'default_language' : __DEFAULT_APPDF_LANGUAGE,
        'whats_new' : {},
        'images_to_upload' : [],
    }

    if 'package' in app_node.keys():
        product['package_name'] = app_node.get('package')

    categorization_node = app_node.find('categorization')
    if categorization_node is not None:
        __parse_categorization(product, categorization_node)

    description_node = app_node.find('description')
    if description_node is not None:
        product['images_to_upload'].extend( __parse_description(product, product['whats_new'], description_node, True) )

    for description_localization_node in app_node.findall('description-localization'):
        product['images_to_upload'].extend( __parse_description(product, product['whats_new'], description_localization_node, False) )

    content_description_node = app_node.find('content-description')
    if content_description_node is not None:
        __parse_content_description(product, content_description_node)

    availability_node = app_node.find('availability')
    if availability_node is not None:
        __parse_availability(product, availability_node)

    price_node = app_node.find('price')
    if price_node is not None:
        __parse_price(product, price_node)

    apk_files_node = app_node.find('apk-files')
    if apk_files_node is not None:
        product['builds'] = __parse_apk_files(product, apk_files_node)
    return product


def __get_appdf_description_schema():
    """
    Loads appdf-description.xsd at first call and returns cached value at further calls
    """
    try:
        return __get_appdf_description_schema.schema
    except:
        __get_appdf_description_schema.schema = etree.XMLSchema(etree.parse('appdf-description.xsd'))
        return __get_appdf_description_schema.schema


def parse_appdf(file_name):
    try:
        appdf = ZipFile(file_name, 'r')
    except:
        raise Exception('Invalid zip file.')

    try:
        description_file = appdf.open('description.xml')
    except KeyError:
        raise Exception('There is no description.xml in AppDF.')
    try:
        description = etree.parse(description_file)
    except SyntaxError, e:
        raise Exception('description.xml is invalid: %s.' % e.message)
    description_schema = __get_appdf_description_schema()
    try:
        description_schema.assertValid(description)
    except Exception, e:
        raise Exception('description.xml does not match XML schema: %s' % e.message)

    products = []
    for application in description.getroot():
        products.append(__parse_application(application, appdf))
    if not products:
        raise Exception('There are no applications in uploaded AppDF.')

    appdf.close()
    return products
