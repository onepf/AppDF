<?php
/**
 * For AppDf version 0.97
 */
class AppDf_Parser
{
    /**
     * Language of the description section
     *
     * @var string
     */
    const MAIN_DESCRIPTION_LANG = 'en';

    /**
     * Contains default filenames of required files
     *
     * @var array
     */
    private static $_expected_names = array(
        'description_xml' => 'description.xml'
    );

    /**
     * Contains remote data files URLs
     *
     * @var array
     */
    private static $_data_files = array(
        'stores' => 'https://raw.github.com/onepf/AppDF/master/specification/data/stores.json',
        'countries' => 'https://raw.github.com/onepf/AppDF/master/specification/data/countries.json',
        'country_currencies' => 'https://raw.github.com/onepf/AppDF/master/specification/data/country_currencies.json',
        'country_languages' => 'https://raw.github.com/onepf/AppDF/master/specification/data/country_languages.json',
        'store_categories' => 'https://raw.github.com/onepf/AppDF/master/specification/data/store_categories.json',
        'currencies' => 'https://raw.github.com/onepf/AppDF/master/specification/data/currencies.json',
        'languages' => 'https://raw.github.com/onepf/AppDF/master/specification/data/languages.json',
        'screen_resolutions' => 'https://raw.github.com/onepf/AppDF/master/specification/data/screen_resolutions.json',
        'stores_localization' => 'https://raw.github.com/onepf/AppDF/master/specification/data/stores_localization.json',
        'description_schema' => 'https://raw.github.com/onepf/AppDF/master/specification/appdf-description.xsd'
    );

    /**
     * Contains validation rules for common package files
     *
     * @var array
     */
    private static $_files_validation = array(
        // [description && description-localization]/images/app-icon
        'app_icon' => array(
            'extensions' => array(
                'png'
            )
        ),
        // [description && description-localization]/images/large-promo
        'large_promo' => array(
            'extensions' => array(
                'jpg',
                'png'
            ),
            'image_sizes' => array(
                array(
                    'size_x' => 1024,
                    'size_y' => 500
                )
            )
        ),
        // [description && description-localization]/images/small-promo
        'small_promo' => array(
            'extensions' => array(
                'jpg',
                'png'
            ),
            'image_sizes' => array(
                array(
                    'size_x' => 180,
                    'size_y' => 120
                )
            )
        ),
        // [description &&
        // description-localization]/images/screenshots/screenshot
        'screenshot' => array(
            'extensions' => array(
                'png'
            ),
            'image_sizes' => array(
                array(
                    'size_x' => 480,
                    'size_y' => 800
                ),
                array(
                    'size_x' => 1080,
                    'size_y' => 1920
                ),
                array(
                    'size_x' => 1200,
                    'size_y' => 1920
                )
            )
        ),
        // [description && description-localization]/videos/video-file
        'video_file' => array(),
        // content-description/rating-certificates/rating-certificate/certificate(attr)
        'certificate' => array(),
        // content-description/rating-certificates/rating-certificate/mark(attr)
        'mark' => array(),
        // apk-files/apk-file
        'apk_file' => array(
            'extensions' => array(
                'apk'
            )
        )
    );

    /**
     * Contains parsed data
     *
     * @var array
     */
    private $_parsed_data = array();

    /**
     * Hard files validation switcher
     *
     * @var boolean
     */
    private $_hard_files_validation = true;

    /**
     * Errors list filled while running in "soft" validation mode
     *
     * @var array
     */
    private $_errors = array();

    /**
     * Store title
     *
     * @var string
     */
    private $_store = null;

    /**
     * Store code
     *
     * @var string
     */
    private $_store_code = null;

    /**
     * Path to the extracted application directory
     *
     * @var string
     */
    private $_directory = null;

    /**
     * Path to description.xml file
     *
     * @var string
     */
    private $_description_xml_file = null;

    /**
     * Description XML string
     *
     * @var string
     */
    private $_description_xml = null;

    /**
     * SimpleXMLElement description
     *
     * @var SimpleXMLElement
     */
    private $_description_obj = null;

    /**
     * AppDF and the store's categories trees relations
     *
     * @var array
     */
    private $_categories_map = array();

    /**
     *
     * @param string $directory
     * @param string $store_code
     * @throws AppDf_ParseException
     */
    public function __construct($directory, $store_code = null)
    {
        if (!is_dir($directory))
            throw new AppDf_ParseException(
                AppDf_ParseException::E_DIRECTORY_NOT_FOUND,
                array('dir' => $directory),
                'Package directory not found'
            );

        $this->_directory = $directory;

        if ($store_code)
            $this->_setStore($store_code);
    }

    /**
     * Returnes parsed data
     *
     * @return array
     */
    public function getData()
    {
        if (empty($this->_parsed_data)) $this->_parse();
        return $this->_parsed_data;
    }

    /**
     * Enables hard files validation.
     * In this mode an exception would be generated if
     * some of files is invalid.
     */
    public function enableHardValidation()
    {
        $this->_hard_files_validation = true;
    }

    /**
     * Disables hard files validation.
     */
    public function disableHardValidation()
    {
        $this->_hard_files_validation = false;
    }

    /**
     * Returnes $errors array
     *
     * @return array
     */
    public function getErrors()
    {
        return $this->_errors;
    }

    /**
     * Store code setter
     *
     * @param string $store_code
     * @throws AppDf_ParseException
     * @return AppDf_Parser
     */
    private function _setStore($store_code)
    {
        $stores_json = self::_getRemoteFileContent(self::$_data_files['stores']);

        if (false === $stores_json)
            throw new AppDf_ParseException(
                AppDf_ParseException::E_RFILE_ACCESS,
                array('subject' => self::$_data_files['stores']),
                'Unable to access stores file'
            );

        if (empty($stores_json))
            throw new AppDf_ParseException(
                AppDf_ParseException::E_RFILE_EMPTY,
                array('subject' => self::$_data_files['stores']),
                'Stores file is empty'
            );

        $stores = json_decode($stores_json, true);
        if (empty($stores))
            throw new AppDf_ParseException(
                AppDf_ParseException::E_RFILE_INVALID,
                array('subject' => self::$_data_files['stores']),
                'Unable to decode stores file'
            );

        if (array_key_exists($store_code, $stores))
        {
            $this->_store_code = $store_code;
            $this->_store = $stores[$store_code];
        }

        return $this;
    }

    /**
     * Prepares parsed data
     *
     * @return AppDf_Parser
     */
    private function _parse()
    {
        $this->_parsed_data = array();

        $this->_inspectDescriptionFile();

        $this->_fillStoreSpecific();
        $this->_fillGeneralInfo();
        $this->_fillCategorization();
        $this->_fillDescriptions();
        $this->_fillContentDescription();
        $this->_fillAvailability();
        $this->_fillPrice();
        $this->_fillApkFiles();
        $this->_fillRequirements();
        $this->_fillTestingInstructions();
        $this->_fillConsent();
        $this->_fillCustomerSupport();

        $this->_validatePackageFiles();

        return $this;
    }

    /**
     * Generates mapping between AppDf and store categories
     *
     * @throws AppDf_ParseException
     * @return AppDf_Parser
     */
    private function _prepareCategoriesMap()
    {
        $store_categories_json =
            self::_getRemoteFileContent(self::$_data_files['store_categories']);

        if (false === $store_categories_json)
            throw new AppDf_ParseException(
                AppDf_ParseException::E_RFILE_ACCESS,
                array('subject' => self::$_data_files['store_categories']),
                'Unable to access categories file'
            );

        if (empty($store_categories_json))
            throw new AppDf_ParseException(
                AppDf_ParseException::E_RFILE_EMPTY,
                array('subject' => self::$_data_files['store_categories']),
                'Categories file is empty'
            );

        $store_categories = json_decode($store_categories_json, true);
        if (empty($store_categories))
            throw new AppDf_ParseException(
                AppDf_ParseException::E_RFILE_INVALID,
                array('subject' => self::$_data_files['store_categories']),
                'Unable to decode categories file'
            );

        foreach ($store_categories as $app_type => $data)
        {
            foreach ($data as $category => $category_data)
            {
                foreach ($category_data as $subcategory => $stores)
                {
                    if (empty($subcategory)) $category_name = $subcategory = $category;

                    $store_category = $stores[$this->_store_code];
                    $this->_categories_map[$app_type][$category_name][$subcategory] =
                        $store_category;
                }
            }
        }

        return $this;
    }

    /**
     * Checks if the description file is present and valid
     *
     * @throws AppDf_ParseException
     * @return AppDf_Parser
     */
    private function _inspectDescriptionFile()
    {
        $description = $this->_directory . '/' . self::$_expected_names['description_xml'];
        $description_xml_file = realpath($description);

        if (!is_file($description_xml_file))
            throw new AppDf_ParseException(
                AppDf_ParseException::E_DESCRIPTION_NOT_FOUND,
                array('subject' => $description),
                'Description file not found'
            );
        $this->_description_xml_file = $description_xml_file;

        if (!filesize($this->_description_xml_file))
            throw new AppDf_ParseException(
                AppDf_ParseException::E_DESCRIPTION_EMPTY,
                array('subject' => $this->_description_xml_file),
                'Description file is empty'
            );

        $this->_description_xml = file_get_contents($this->_description_xml_file);
        if (!$this->_description_xml)
            throw new AppDf_ParseException(
                AppDf_ParseException::E_FILE_ACCESS,
                array('subject' => $this->_description_xml_file),
                'Unable to open description file'
            );

         if (!$this->_validateDescriptionFile())
            throw new AppDf_ParseException(
                AppDf_ParseException::E_DESCTIPTION_INVALID_SHEMA,
                array('subject' => $this->_description_xml_file),
                'Description file is invalid against the schema'
            );

        $this->_description_obj = new SimpleXMLElement($this->_description_xml);
        if (!$this->_description_obj)
            throw new AppDf_ParseException(
                AppDf_ParseException::E_DESCRIPTION_INVALID_XML,
                array('subject' => $this->_description_xml_file),
                'Description file is invalid'
            );

        return $this;
    }

    /**
     * Validates a file
     *
     * @param string $filename
     * @param string $file_validation_code
     * @param string $file_type
     * @return boolean
     */
    private function _inspectFile(&$filename, $file_validation_code = null, $file_type = null)
    {
        $error_data = array();
        $file_type_text = $file_type ? "($file_type)" : '';

        $origin_filename = $filename;

        $error_data['subject'] = $origin_filename;

        $filename = realpath($filename);
        if (!$filename)
        {
            $error_data['message'] = 'File not found' . ' ' . $file_type_text;
            $error_data['exception_code'] = AppDf_ParseException::E_FILE_NOT_FOUND;
        }
        else
        {
            if (!filesize($filename))
            {
                $error_data['message'] = 'File is empty' . ' ' . $file_type_text;
                $error_data['exception_code'] = AppDf_ParseException::E_FILE_EMPTY;
            }
            $file_validation = self::$_files_validation[$file_validation_code];
            if (!empty($file_validation))
            {
                $error_data['validation'] = $file_validation;
                if (!empty($file_validation['extensions']) &&
                    !self::_validateFileExtension($filename, $file_validation['extensions']))
                {
                    $error_data['message'] =
                        'File has invalid extension' . ' ' . $file_type_text;
                    $error_data['exception_code'] = AppDf_ParseException::E_FILE_INVALID;
                }

                if (!empty($file_validation['image_sizes']))
                {
                    $image_size_is_valid = false;

                    foreach ($file_validation['image_sizes'] as $size)
                    {
                        $valid_x = $valid_y = false;
                        $image_size = getimagesize($filename);

                        if (empty($size['size_x']) || $image_size[0] == $size['size_x'])
                            $valid_x = true;

                        if (empty($size['size_y']) || $image_size[1] == $size['size_y'])
                            $valid_y = true;

                        if ($valid_x && $valid_y)
                        {
                            $image_size_is_valid = true;
                            break;
                        }
                    }

                    if (!$image_size_is_valid)
                    {
                        $error_data['message'] =
                          'Invalid image size' . ' ' . $file_type_text;
                        $error_data['exception_code'] =
                            AppDf_ParseException::E_FILE_INVALID;
                    }
                }
            }
        }

        if (!empty($error_data['message']))
        {
            if ($this->_hard_files_validation)
            {
                $exception_debug_data = $error_data;
                unset($exception_debug_data['message']);
                unset($exception_debug_data['exception_code']);
                throw new AppDf_ParseException(
                    $error_data['exception_code'],
                    $exception_debug_data,
                    $error_data['message']
                );
            }
            else
            {
                // check if this subject was already added
                $error_exists = false;
                foreach ($this->_errors as $error)
                {
                    if (isset($error['subject']) &&
                        $error['subject'] == $error_data['subject'])
                    {
                        $error_exists = true;
                        break;
                    }
                }

                if (!$error_exists) $this->_errors[] = $error_data;
            }

            return false;
        }

        return true;
    }

    /**
     * Validates files in batch
     *
     * @param array $files
     * @param string $file_validation_code
     * @return boolean
     */
    private function _inspectFiles(&$files, $file_validation_code = null)
    {
        $validation_result = true;

        foreach ($files as $n => $file)
        {
            if (!$this->_inspectFile($files[$n], $file_validation_code))
                $validation_result = false;
        }

        return $validation_result;
    }

    /**
     * Fills in general information such as directory, store, platform, package
     * name etc.
     *
     * @return AppDf_Parser
     */
    private function _fillGeneralInfo()
    {
        $this->_parsed_data['general'] = array();

        $this->_parsed_data['general']['directory'] = $this->_directory;
        $this->_parsed_data['general']['store'] = $this->_store;
        $this->_parsed_data['general']['store_code'] = $this->_store_code;
        $this->_parsed_data['general']['platform'] =
            (string) $this->_description_obj->application->attributes()->platform;
        $this->_parsed_data['general']['package'] =
            (string) $this->_description_obj->application->attributes()->package;

        return $this;
    }

    /**
     * Fills in categorization information
     *
     * @param boolean $store_specific
     * @return AppDf_Parser
     */
    private function _fillCategorization($store_specific = false)
    {
        // @todo throw exception if invalid category provided
        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $categorization = $this->_description_obj->application->{'store-specific'}->
                {$this->_store_code}->categorization;
            if (empty($categorization))
                return $this;

            $target = & $this->_parsed_data['store_specific']['categorization'];
        }
        else
        {
            $this->_parsed_data['categorization'] = array();

            $target = & $this->_parsed_data['categorization'];
            $categorization = $this->_description_obj->application->categorization;
        }

        if (!empty($categorization->type))
            $target['type'] = $app_type = (string) $categorization->type;

        if (!empty($categorization->category))
            $target['category'] = $app_category = (string) $categorization->category;

        if (!empty($categorization->subcategory))
            $app_subcategory = $target['subcategory'] =
                (string) $categorization->subcategory;
        else
            $app_subcategory = $target['category'];

            // substitution
        if ($store_specific)
        {
            if (!empty($app_type))
                $this->_parsed_data['categorization']['type'] = $app_type;

            if (!empty($app_category))
                $this->_parsed_data['categorization']['category'] = $app_category;

            if (!empty($app_subcategory))
                $this->_parsed_data['categorization']['subcategory'] = $app_subcategory;
            else
                $this->_parsed_data['categorization']['subcategory'] = $app_category;
        }

        // get store category
        if ($this->_store_code)
        {
            if (empty($this->_categories_map))
                $this->_prepareCategoriesMap();

            if (!empty($this->_categories_map[$app_type][$app_category][$app_subcategory]))
            {
                $this->_parsed_data['categorization']['store_category'] =
                    $this->_categories_map[$app_type][$app_category][$app_subcategory];
            }
        }

        if (!$store_specific)
            $this->_fillCategorization(true);

        return $this;
    }

    /**
     * Fills descriptions
     *
     * @param boolean $store_specific
     * @return AppDf_Parser
     */
    private function _fillDescriptions($store_specific = false)
    {
        // data that should be obtained from main description if it is missed in
        // local
        $data_to_complete = array(
            'texts->title',
            'texts->titles',
            'texts->keywords',
            'texts->short_description',
            'texts->short_descriptions',
            'texts->full_description',
            'texts->full_descriptions',
            'texts->features',
            'texts->recent_changes',
            'texts->privacy_policy',
            'texts->eula',
            'images->app_icons',
            'images->large_promo',
            'images->small_promo',
            'images->screenshots',
            'videos->youtube_video',
            'videos->video_file',
            'videos->video_files'
        );

        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $target = & $this->_parsed_data['store_specific'];
            $main_description = $this->_description_obj->application->{'store-specific'}->
                {$this->_store_code}->description;
            $localized = $this->_description_obj->application->{'store-specific'}->
                {$this->_store_code}->{'description-localization'};
        }
        else
        {
            $target = & $this->_parsed_data;
            $main_description = $this->_description_obj->application->description;
            $localized = $this->_description_obj->application->{'description-localization'};
        }

        $target['descriptions'] = array();
        $descriptions = array();

        // main description
        $descriptions[self::MAIN_DESCRIPTION_LANG] = $main_description;
        if (!empty($localized))
        {
            foreach ($localized as $desc)
            {
                $language = (string) $desc->attributes()->language;
                if (!empty($language))
                    $descriptions[$language] = $desc;
            }
        }

        foreach ($descriptions as $language => $description)
        {
            $parsed_description = array();
            /*
             * texts/title
             */
            if (!empty($description->texts->title))
            {
                foreach ($description->texts->title as $title)
                {
                    $parsed_description['texts']['titles'][] = (string) $title;
                }
                $parsed_description['texts']['title'] =
                    $parsed_description['texts']['titles'][0];
            }

            /*
             * texts/keywords
             */
            if (!empty($description->texts->keywords))
                $parsed_description['texts']['keywords'] =
                    (string) $description->texts->keywords;

            /*
             * texts/short description
             */
            if (!empty($description->texts->{'short-description'}))
            {
                foreach ($description->texts->{'short-description'}
                    as $short_description)
                {
                    $parsed_description['texts']['short_descriptions'][] =
                        (string) $short_description;
                }
                $parsed_description['texts']['short_description'] =
                    $parsed_description['texts']['short_descriptions'][0];
            }

            /*
             * texts/full description
             */
            if (!empty($description->texts->{'full-description'}))
            {
                foreach ($description->texts->{'full-description'} as $full_description)
                {
                    $parsed_description['texts']['full_descriptions'][] =
                        (string) $full_description;
                }
                $parsed_description['texts']['full_description'] =
                    $parsed_description['texts']['full_descriptions'][0];
            }

            /*
             * description/texts/features
             */
            if (!empty($description->texts->features->feature))
            {
                foreach ($description->texts->features->feature as $feature)
                {
                    $parsed_description['texts']['features'][] = (string) $feature;
                }
            }

            /*
             * texts/recent-changes
             */
            if (!empty($description->texts->{'recent-changes'}))
                $parsed_description['texts']['recent_changes'] =
                    (string) $description->texts->{'recent-changes'};

                /*
             * texts/privacy-policy
             */
            if (!empty($description->texts->{'privacy-policy'}))
            {
                $parsed_description['texts']['privacy_policy']['text'] =
                    (string) $description->texts->{'privacy-policy'};
                $parsed_description['texts']['privacy_policy']['href'] =
                    (string) $description->texts->{'privacy-policy'}->attributes()->href;
            }

            /*
             * texts/eula
             */
            if (!empty($description->texts->eula))
            {
                $parsed_description['texts']['eula']['text'] =
                    (string) $description->texts->eula;
                $parsed_description['texts']['eula']['href'] =
                    (string) $description->texts->eula->attributes()->href;
            }

            /*
             * images/app-icon
             */
            if (!empty($description->images->{'app-icon'}))
            {
                foreach ($description->images->{'app-icon'} as $app_icon)
                {
                    $new_icon = array();
                    $new_icon['src'] =
                        $this->_directory . DIRECTORY_SEPARATOR . (string) $app_icon;
                    $new_icon['width'] = (string) $app_icon->attributes()->width;
                    $new_icon['height'] = (string) $app_icon->attributes()->height;

                    $parsed_description['images']['app_icons'][] = $new_icon;
                }
            }

            /*
             * images/large-promo
             */
            if (!empty($description->images->{'large-promo'}))
            {
                $parsed_description['images']['large_promo'] = $this->_directory .
                    DIRECTORY_SEPARATOR . (string) $description->images->{'large-promo'};
            }

            /*
             * images/small-promo
             */
            if (!empty($description->images->{'small-promo'}))
            {
                $parsed_description['images']['small_promo'] = $this->_directory .
                    DIRECTORY_SEPARATOR . (string) $description->images->{'small-promo'};
            }

            /*
             * images/screenshots
             */
            if (!empty($description->images->screenshots->screenshot))
            {
                foreach ($description->images->screenshots->screenshot as $screenshot)
                {
                    $new_screenshot = array();
                    $new_screenshot['src'] = $this->_directory .
                        DIRECTORY_SEPARATOR . (string) $screenshot;
                    $new_screenshot['index'] = (string) $screenshot->attributes()->index;
                    $new_screenshot['width'] = (string) $screenshot->attributes()->width;
                    $new_screenshot['height'] = (string) $screenshot->attributes()->height;

                    $parsed_description['images']['screenshots'][] = $new_screenshot;
                }
            }

            /*
             * videos/youtube-video
             */
            if (!empty($description->videos->{'youtube-video'}))
            {
                $parsed_description['videos']['youtube_video'] =
                    (string) $description->videos->{'youtube-video'};
            }

            /*
             * videos/video-file
             */
            if (!empty($description->videos->{'video-file'}))
            {
                foreach ($description->videos->{'video-file'} as $video_file)
                {
                    $parsed_description['videos']['video_files'][] = $this->_directory .
                        DIRECTORY_SEPARATOR . (string) $video_file;
                }
                $parsed_description['videos']['video_file'] =
                    $parsed_description['videos']['video_files'][0];
            }

            $target['descriptions'][$language] = $parsed_description;

            if ($store_specific)
            {
                foreach ($data_to_complete as $path)
                {
                    $this->_substituteStoreSpecificDescriptionElement($path, $language);
                }
            }
        }

        if ($store_specific)
        {
            foreach ($this->_parsed_data['descriptions'] as $language => $description)
            {
                if ($language != self::MAIN_DESCRIPTION_LANG)
                {
                    foreach ($data_to_complete as $path)
                    {
                        $this->_completeLocalizedDescription(
                            $this->_parsed_data['descriptions'][$language],
                            $path
                        );
                    }
                }
            }
        }

        if (!$store_specific)
            $this->_fillDescriptions(true);

        return $this;
    }

    /**
     * Fills in the content description data
     *
     * @param boolean $store_specific
     * @return AppDf_Parser
     */
    private function _fillContentDescription($store_specific = false)
    {
        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $content_description = $this->_description_obj->application->
                {'store-specific'}->{$this->_store_code}->{'content-description'};
            if (empty($content_description))
                return $this;

            $target = & $this->_parsed_data['store_specific']['content_description'];
        }
        else
        {
            $this->_parsed_data['content_description'] = array();

            $target = & $this->_parsed_data['content_description'];
            $content_description = $this->_description_obj->application->
                {'content-description'};
        }

        /*
         * content-rating
         */
        $target['content_rating'] = (string) $content_description->{'content-rating'};

        /*
         * rating-certificates
         */
        if (!empty($content_description->{'rating-certificates'}->{'rating-certificate'}))
        {
            foreach ($content_description->{'rating-certificates'}->{'rating-certificate'}
                as $rating_certificate)
            {
                $value = (string) $rating_certificate;
                $type = (string) $rating_certificate->attributes()->type;
                $certificate = (string) $rating_certificate->attributes()->certificate;
                $mark = (string) $rating_certificate->attributes()->mark;

                $parsed_certificate = array();
                if ($value)
                    $parsed_certificate['value'] = $value;
                if ($type)
                    $parsed_certificate['type'] = $type;
                if ($certificate)
                {
                    $parsed_certificate['certificate'] =
                        $this->_directory . DIRECTORY_SEPARATOR . $certificate;
                }
                if ($mark)
                    $parsed_certificate['mark'] =
                        $this->_directory . DIRECTORY_SEPARATOR . $mark;

                if (!empty($parsed_certificate))
                    $target['rating_certificates'][] = $parsed_certificate;
            }
        }

        /*
         * content-descriptors
         */
        foreach ($content_description->{'content-descriptors'}->children()
            as $descriptor => $value)
        {
            $descriptor_key = self::_generateKey($descriptor);
            $target['content_descriptors'][$descriptor_key] = (string) $value;
        }

        /*
         * included-activities
         */
        foreach ($content_description->{'included-activities'}->children()
            as $activity => $value)
        {
            $activity_key = self::_generateKey($activity);
            $target['included_activities'][$activity_key] = (string) $value;
        }

        // store-specific substitution
        if ($store_specific)
        {
            $ss_cont_descript =
                $this->_parsed_data['store_specific']['content_description'];
            $orig_cont_descript = & $this->_parsed_data['content_description'];
            /*
             * content-rating
             */
            if (!empty($ss_cont_descript['content_rating']))
                $orig_cont_descript['content_rating'] =
                    $ss_cont_descript['content_rating'];

            /*
             * rating-certificates
             */
            if (!empty($ss_cont_descript['rating_certificates']))
                $orig_cont_descript['rating_certificates'] =
                    $ss_cont_descript['rating_certificates'];

            /*
             * content-descriptors
             */
            if (!empty($ss_cont_descript['content_descriptors']))
            {
                foreach ($ss_cont_descript['content_descriptors'] as $key => $value)
                {
                    $orig_cont_descript['content_descriptors'][$key] = $value;
                }
            }

            /*
             * included-activities
             */
            if (!empty($ss_cont_descript['included_activities']))
            {
                foreach ($ss_cont_descript['included_activities'] as $key => $value)
                {
                    $orig_cont_descript['included_activities'][$key] = $value;
                }
            }
        }
        else
            $this->_fillContentDescription(true);

        return $this;
    }

    /**
     * Fills in availability data
     *
     * @param boolean $store_specific
     * @throws AppDf_ParseException
     * @return AppDf_Parser
     */
    private function _fillAvailability($store_specific = false)
    {
        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $availability = $this->_description_obj->application->{'store-specific'}->
                {$this->_store_code}->availability;
            if (empty($availability))
                return $this;

            $target = & $this->_parsed_data['store_specific']['availability'];
        }
        else
        {
            $this->_parsed_data['availability'] = array();

            $target = & $this->_parsed_data['availability'];
            $availability = $this->_description_obj->application->availability;
        }

        /*
         * countries
         */
        if (!empty($availability->countries))
        {
            $only_listed =
                (string) $availability->countries->attributes()->{'only-listed'};
            if ('yes' == $only_listed)
                $target['countries'] = (array) $availability->countries->include;
            else
            {
                $all_countries_list_json =
                    self::_getRemoteFileContent(self::$_data_files['countries']);

                if (false === $all_countries_list_json)
                    throw new AppDf_ParseException(
                        AppDf_ParseException::E_RFILE_ACCESS,
                        array('subject' => self::$_data_files['countries']),
                        'Unable to access countries file'
                    );

                if (empty($all_countries_list_json))
                    throw new AppDf_ParseException(
                        AppDf_ParseException::E_RFILE_EMPTY,
                        array('subject' => self::$_data_files['countries']),
                        'Countries file is empty'
                    );

                $all_countries_list = json_decode($all_countries_list_json, true);
                if (empty($all_countries_list))
                    throw new AppDf_ParseException(
                        AppDf_ParseException::E_RFILE_INVALID,
                        array('subject' => self::$_data_files['countries']),
                        'Unable to decode countries file'
                    );

                $all_countries_codes = array_keys($all_countries_list);

                $excluded = (array) $availability->countries->exclude;

                $target['countries'] =
                    array_values(array_diff($all_countries_codes, $excluded));
            }
        }

        /*
         * period/since
         */
        if (isset($availability->period->since))
        {
            $since = array();
            $since['year'] = (string) $availability->period->since->attributes()->year;
            $since['month'] = (string) $availability->period->since->attributes()->month;
            $since['day'] = (string) $availability->period->since->attributes()->day;
            $since['date'] = $since['day'] . '-' . $since['month'] . '-' . $since['year'];
            $since['timestamp'] = strtotime($since['date']);

            $target['period']['since'] = $since;
        }

        /*
         * period/until
         */
        if (isset($availability->period->until))
        {
            $until = array();
            $until['year'] = (string) $availability->period->until->attributes()->year;
            $until['month'] = (string) $availability->period->until->attributes()->month;
            $until['day'] = (string) $availability->period->until->attributes()->day;
            $until['date'] = $until['day'] . '-' . $until['month'] . '-' . $until['year'];
            $until['timestamp'] = strtotime($until['date']);

            $target['period']['until'] = $until;
        }

        // store-specific substitution
        if ($store_specific)
        {
            if (!empty($target['countries']))
                $this->_parsed_data['availability']['countries'] = $target['countries'];

            if (!empty($target['period']['since']))
                $this->_parsed_data['availability']['period']['since'] =
                    $target['period']['since'];

            if (!empty($target['period']['until']))
                $this->_parsed_data['availability']['period']['until'] =
                    $target['period']['until'];
        }
        else
            $this->_fillAvailability(true);

        return $this;
    }

    /**
     * Fills in price data
     *
     * @param boolean $store_specific
     * @throws AppDf_ParseException
     * @return AppDf_Parser
     */
    private function _fillPrice($store_specific = false)
    {
        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $price = $this->_description_obj->application->{'store-specific'}->
                {$this->_store_code}->price;
            if (empty($price))
                return $this;

            $target = & $this->_parsed_data['store_specific']['price'];
        }
        else
        {
            $this->_parsed_data['price'] = array();

            $target = & $this->_parsed_data['price'];
            $price = $this->_description_obj->application->price;
        }

        $is_free = 'yes' == (string) $price->attributes()->free;
        if ($is_free)
        {
            $target['is_free'] = true;

            if (isset($price->{'trial-version'}))
            {
                $target['is_trial'] = true;

                if (isset($price->{'trial-version'}->attributes()->{'full-version'}))
                {
                    $target['full_version'] = (string) $price->{'trial-version'}->
                        attributes()->{'full-version'};
                }
            }
        }
        else
        {
            $target['is_free'] = false;
            $target['is_trial'] = false;

            if (empty($price->{'base-price'}))
                throw new AppDf_ParseException(
                    AppDf_ParseException::E_NO_PRICE_FOR_PAID,
                    array('subject' => 'price->base-price tag'),
                    'Price is required for paid apps'
                );

            $target['base_price'] = (float) $price->{'base-price'};

            if (!empty($price->{'local-price'}))
            {
                $country_currencies_json =
                    self::_getRemoteFileContent(self::$_data_files['country_currencies']);

                if (false === $country_currencies_json)
                    throw new AppDf_ParseException(
                        AppDf_ParseException::E_RFILE_ACCESS,
                        array('subject' => self::$_data_files['country_currencies']),
                        'Unable to access country_currencies file'
                    );

                if (empty($country_currencies_json))
                    throw new AppDf_ParseException(
                        AppDf_ParseException::E_RFILE_EMPTY,
                        array('subject' => self::$_data_files['country_currencies']),
                        'Country_currencies file is empty'
                    );

                $country_currencies = json_decode($country_currencies_json, true);
                if (empty($country_currencies))
                    throw new AppDf_ParseException(
                        AppDf_ParseException::E_RFILE_INVALID,
                        array('subject' => self::$_data_files['country_currencies']),
                        'Unable to decode country_currencies file'
                    );

                foreach ($price->{'local-price'} as $local_price)
                {
                    $parsed_local_price = array();
                    $parsed_local_price['value'] = (float) $local_price;
                    $parsed_local_price['country'] =
                        (string) $local_price->attributes()->country;
                    $parsed_local_price['currency'] =
                        $country_currencies[$parsed_local_price['country']];

                    $target['local_prices'][] = $parsed_local_price;
                }
            }
        }

        // store-specific substitution
        if ($store_specific)
        {
            if (!empty($this->_parsed_data['store_specific']['price']))
                $this->_parsed_data['price'] =
                    $this->_parsed_data['store_specific']['price'];
        }
        else
            $this->_fillPrice(true);

        return $this;
    }

    /**
     * Fills in apk-files list
     *
     * @param boolean $store_specific
     * @return AppDf_Parser
     */
    private function _fillApkFiles($store_specific = false)
    {
        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $apk_files = $this->_description_obj->application->{'store-specific'}->
                {$this->_store_code}->{'apk-files'};

            $target = & $this->_parsed_data['store_specific'];
        }
        else
        {
            $target = & $this->_parsed_data;
            $apk_files = $this->_description_obj->application->{'apk-files'};
        }

        if (!empty($apk_files))
        {
            foreach ($apk_files->{'apk-file'} as $apk_file)
            {
                $target['apk_files'][] =
                    $this->_directory . DIRECTORY_SEPARATOR .(string) $apk_file;
            }

            if ($store_specific)
                $this->_parsed_data['apk_files'] = $target['apk_files'];
        }

        if (!$store_specific)
            $this->_fillApkFiles(true);

        return $this;
    }

    /**
     * Fills in requirenments
     *
     * @param boolean $store_specific
     * @return AppDf_Parser
     */
    private function _fillRequirements($store_specific = false)
    {
        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $requirements = $this->_description_obj->application->{'store-specific'}->
                {$this->_store_code}->requirements;
            if (empty($requirements))
                return $this;

            $target = & $this->_parsed_data['store_specific']['requirements'];
        }
        else
        {
            $this->_parsed_data['requirements'] = array();

            $target = & $this->_parsed_data['requirements'];
            $requirements = $this->_description_obj->application->requirements;
        }

        if (!empty($requirements))
        {
            /*
             * features
             */
            if (!empty($requirements->features))
            {
                foreach ($requirements->features->children() as $feature => $value)
                {
                    $target['features'][$feature] = (string) $value;
                }
            }

            /*
             * supported-languages
             */
            if (!empty($requirements->{'supported-languages'}))
            {
                $target['supported_languages'] =
                    (array) $requirements->{'supported-languages'}->language;
            }

            /*
             * supported-devices
             */
            if (!empty($requirements->{'supported-devices'}))
            {
                $target['supported_devices']['exclude'] =
                    (array) $requirements->{'supported-devices'}->exclude;

                $target['supported_devices']['include'] =
                    (array) $requirements->{'supported-devices'}->include;
            }

            /*
             * supported-resolutions
             */
            if (!empty($requirements->{'supported-resolutions'}))
            {
                $only_listed = (string) $requirements->{'supported-resolutions'}->
                    attributes()->{'only-listed'};
                if ('yes' == $only_listed)
                {
                    $target['supported_resolutions'] =
                        (array) $requirements->{'supported-resolutions'}->include;
                }
                else
                {
                    $all_resolutions_list_json =
                        self::_getRemoteFileContent(self::$_data_files['screen_resolutions']);

                    if (false === $all_resolutions_list_json)
                        throw new AppDf_ParseException(
                            AppDf_ParseException::E_RFILE_ACCESS,
                            array('subject' => self::$_data_files['screen_resolutions']),
                            'Unable to access resolutions file'
                        );

                    if (empty($all_resolutions_list_json))
                        throw new AppDf_ParseException(
                            AppDf_ParseException::E_RFILE_EMPTY,
                            array('subject' => self::$_data_files['screen_resolutions']),
                            'Resolutions file is empty'
                        );

                    $all_resolutions_list = json_decode($all_resolutions_list_json, true);
                    if (empty($all_resolutions_list))
                        throw new AppDf_ParseException(
                            AppDf_ParseException::E_RFILE_INVALID,
                            array('subject' => self::$_data_files['screen_resolutions']),
                            'Unable to decode resolutions file'
                        );

                    $all_resolutions_codes = array_keys($all_resolutions_list);

                    $excluded = (array) $requirements->{'supported-resolutions'}->exclude;

                    $target['supported_resolutions'] =
                        array_values(array_diff($all_resolutions_codes, $excluded));
                }
            }
        }

        // store-specific substitution
        if ($store_specific)
        {
            /*
             * features
             */
            if (!empty($target['features']))
            {
                foreach ($target['features'] as $feature => $value)
                {
                    $this->_parsed_data['requirements']['features'][$feature] = $value;
                }
            }

            /*
             * supported-languages
             */
            if (!empty($target['supported_languages']))
            {
                $this->_parsed_data['requirements']['supported_languages'] =
                    $target['supported_languages'];
            }

            /*
             * supported-devices
             */
            if (!empty($target['supported_devices']['include']))
            {
                $this->_parsed_data['requirements']['supported_devices']['include'] =
                    $target['supported_devices']['include'];
            }

            if (!empty($target['supported_devices']['exclude']))
            {
                $this->_parsed_data['requirements']['supported_devices']['exclude'] =
                    $target['supported_devices']['exclude'];
            }

            /*
             * supported-resolutions
             */
            if (!empty($target['supported_resolutions']))
            {
                $this->_parsed_data['requirements']['supported_resolutions'] =
                    $target['supported_resolutions'];
            }
        }
        else
            $this->_fillRequirements(true);

        return $this;
    }

    /**
     * Fills in testing instructions
     *
     * @param boolean $store_specific
     * @return AppDf_Parser
     */
    private function _fillTestingInstructions($store_specific = false)
    {
        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $testing_instructions = $this->_description_obj->application->
                {'store-specific'}->{$this->_store_code}->{'testing-instructions'};
            if (empty($testing_instructions))
                return $this;

            $target = & $this->_parsed_data['store_specific']['testing_instructions'];
        }
        else
        {
            $this->_parsed_data['testing_instructions'] = array();

            $target = & $this->_parsed_data['testing_instructions'];
            $testing_instructions = $this->_description_obj->application->
                {'testing-instructions'};
        }

        $target = (string) $testing_instructions;

        // store-specific substitution
        if ($store_specific)
        {
            if (!empty($target))
                $this->_parsed_data['testing_instructions'] = $target;
        }
        else
            $this->_fillTestingInstructions(true);

        return $this;
    }

    /**
     * Fills in consent data
     *
     * @param boolean $store_specific
     * @return AppDf_Parser
     */
    private function _fillConsent($store_specific = false)
    {
        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $consent = $this->_description_obj->application->{'store-specific'}->
                {$this->_store_code}->consent;
            if (empty($consent))
                return $this;

            $target = & $this->_parsed_data['store_specific']['consent'];
        }
        else
        {
            $this->_parsed_data['consent'] = array();

            $target = & $this->_parsed_data['consent'];
            $consent = $this->_description_obj->application->consent;
        }

        foreach ($consent->children() as $statement => $value)
        {
            if ((string) $value == 'yes')
            {
                $statement_key = self::_generateKey($statement);
                $target[] = $statement_key;
            }
        }

        // store-specific substitution
        if ($store_specific)
        {
            $this->_parsed_data['consent'] = $target;
        }
        else
            $this->_fillConsent(true);

        return $this;
    }

    /**
     * Fills in customer support information
     *
     * @param boolean $store_specific
     * @return AppDf_Parser
     */
    private function _fillCustomerSupport($store_specific = false)
    {
        if ($store_specific)
        {
            if (empty($this->_store_code))
                return $this;

            $customer_support = $this->_description_obj->application->
                {'store-specific'}->{$this->_store_code}->{'customer-support'};
            if (empty($customer_support))
                return $this;

            $target = & $this->_parsed_data['store_specific']['customer_support'];
        }
        else
        {
            $this->_parsed_data['customer_support'] = array();

            $target = & $this->_parsed_data['customer_support'];
            $customer_support = $this->_description_obj->application->{'customer-support'};
        }

        if (!empty($customer_support->phone))
            $target['phone'] = (string) $customer_support->phone;

        if (!empty($customer_support->email))
            $target['email'] = (string) $customer_support->email;

        if (!empty($customer_support->website))
            $target['website'] = (string) $customer_support->website;

            // store-specific substitution
        if ($store_specific)
        {
            if (!empty($target['phone']))
                $this->_parsed_data['customer_support']['phone'] = $target['phone'];

            if (!empty($target['email']))
                $this->_parsed_data['customer_support']['email'] = $target['email'];

            if (!empty($target['website']))
                $this->_parsed_data['customer_support']['website'] = $target['website'];
        }
        else
            $this->_fillCustomerSupport(true);

        return $this;
    }

    /**
     * Fills in store specific data
     *
     * @return AppDf_Parser
     */
    private function _fillStoreSpecific()
    {
        if ($this->_store_code)
        {
            $store_specific = $this->_description_obj->application->{'store-specific'}->
                {$this->_store_code};
            if (!empty($store_specific))
            {
                $this->_parsed_data['store_specific'] = array();

                switch ($this->_store_code)
                {
                    case 'amazon':
                        $this->_fillAmazonStoreSpecific($store_specific);
                        break;
                    case 'samsung':
                        $this->_fillSamsungStoreSpecific($store_specific);
                        break;
                    case 'slideme':
                        $this->_fillSlidemeStoreSpecific($store_specific);
                        break;
                    default:
                        break;
                }
            }
        }

        return $this;
    }

    /**
     * Fills in Amazon store specific data
     *
     * @param SimpleXMLElement $store_specific_tag
     * @return AppDf_Parser
     */
    private function _fillAmazonStoreSpecific(SimpleXMLElement $store_specific_tag)
    {
        $this->_parsed_data['store_specific']['form_factor'] =
            (string) $store_specific_tag->{'form-factor'};

        if (!empty($store_specific_tag->{'free-app-of-the-day-eligibility'}))
        {
            $this->_parsed_data['store_specific']['free_app_of_the_day_eligibility'] =
                (string) $store_specific_tag->{'free-app-of-the-day-eligibility'};
        }

        $this->_parsed_data['store_specific']['apply_amazon_drm'] =
            (string) $store_specific_tag->{'apply-amazon-drm'};

        foreach ($store_specific_tag->{'kindle-support'}->children()
            as $device => $support)
        {
            if ('yes' == (string) $support)
                $this->_parsed_data['store_specific']['kindle_support'][] = $device;
        }

        $this->_parsed_data['store_specific']['binary_alias'] =
            (string) $store_specific_tag->{'binary-alias'};

        return $this;
    }

    /**
     * Fills in Samsung store specific data
     *
     * @param SimpleXMLElement $store_specific_tag
     * @return AppDf_Parser
     */
    private function _fillSamsungStoreSpecific(SimpleXMLElement $store_specific_tag)
    {
        // @todo fill methods body when AppDf will support samsung store specific tags
        return $this;
    }

    /**
     * Fills in Slideme store specific data
     *
     * @param SimpleXMLElement $store_specific_tag
     * @return AppDf_Parser
     */
    private function _fillSlidemeStoreSpecific(SimpleXMLElement $store_specific_tag)
    {
        if (!empty($store_specific_tag->{'license-type'}))
        {
            $this->_parsed_data['store_specific']['license_type'] =
                (string) $store_specific_tag->{'license-type'};
        }

        return $this;
    }

    /**
     * Validates the package files
     *
     * @return AppDf_Parser
     */
    private function _validatePackageFiles()
    {
        $this->_inspectFiles($this->_parsed_data['apk_files'], 'apk_file', 'APK');
        foreach ($this->_parsed_data['descriptions'] as $description)
        {
            foreach ($description['images']['app_icons'] as $icon_data)
            {
                $this->_inspectFile($icon_data['src'], 'app_icon', 'App icon');
            }

            if (!empty($description['images']['large_promo']))
                $this->_inspectFile(
                    $description['images']['large_promo'],
                    'large_promo',
                    'Large promo'
                );

            if (!empty($description['images']['small_promo']))
                $this->_inspectFile(
                    $description['images']['small_promo'],
                    'small_promo',
                    'Small promo'
                );

            foreach ($description['images']['screenshots'] as $screenshot_data)
            {
                $this->_inspectFile($screenshot_data['src'], 'screenshot', 'Screenshot');
            }

            if (!empty($description['videos']['video_file']))
                $this->_inspectFile(
                    $description['videos']['video_file'],
                    'video_file',
                    'Video file'
                );

            if (!empty($description['videos']['video_files']))
                $this->_inspectFiles(
                    $description['videos']['video_files'],
                    'video_file',
                    'Video file'
                );
        }

        return $this;
    }

    /**
     * Generates an array key for $parsed_data from string (xml tag)
     *
     * @param string $string
     * @return mixed
     */
    private static function _generateKey($string)
    {
        return str_replace('-', '_', $string);
    }

    /**
     * Sets localized description element value using the main description
     *
     * @param array $parsed_description
     * @param mixed:array|string $path
     */
    private function _completeLocalizedDescription(&$parsed_description, $path)
    {
        $source = $this->_parsed_data;

        $current_value = self::_getXpathElement($parsed_description, $path);
        $main_value = self::_getXpathElement(
            $source['descriptions'][self::MAIN_DESCRIPTION_LANG],
            $path
        );

        if (empty($current_value) && !empty($main_value))
            self::_setXpathElement($parsed_description, $path, $main_value);
    }

    /**
     * Replaced description element with the store specific one
     *
     * @param mixed:array|string $path
     * @param string $language
     * @return AppDf_Parser
     */
    private function _substituteStoreSpecificDescriptionElement($path, $language)
    {
        $store_specific_element = self::_getXpathElement(
            $this->_parsed_data['store_specific']['descriptions'][$language],
            $path
        );

        if (!empty($store_specific_element))
            self::_setXpathElement(
                $this->_parsed_data['descriptions'][$language],
                $path,
                $store_specific_element
            );

        return $this;
    }

    /**
     * Returnes an array element by "xpath" or NULL if element was not found
     *
     * @param array $array
     * @param mixed:array|string $path
     * @return mixed
     */
    private static function _getXpathElement($array, $path)
    {
        if (!$path)
            return null;
        $result = $array;
        $segments = is_array($path) ? $path : explode('->', $path);
        foreach ($segments as $segment)
        {
            if (isset($result[$segment]))
                $result = $result[$segment];
            else
                return null;
        }

        return $result;
    }

    /**
     * Sets an array element value by "xpath"
     *
     * @param array $array
     * @param mixed:array|string $path
     * @param mixed $value
     * @return mixed
     */
    private static function _setXpathElement(&$array, $path, $value)
    {
        if (!$path)
            return null;
        $segments = is_array($path) ? $path : explode('->', $path);
        $cur = & $array;
        foreach ($segments as $segment)
        {
            if (!isset($cur[$segment]))
                $cur[$segment] = array();
            $cur = & $cur[$segment];
        }
        $cur = $value;
    }

    /**
     * Returnes file extension of FALSE if filename is invalid
     *
     * @param string $filename
     * @return boolean mixed
     */
    private static function _getFileExtension($filename)
    {
        $filename_array = explode('.', $filename);
        if (empty($filename_array))
            return false;
        $extension = array_pop($filename_array);

        return $extension;
    }

    /**
     * Returnes TRUE if $filename extension is valid against $suitable_extensions
     *
     * @param string $filename
     * @param mixed $suitable_extensions
     * @return boolean
     */
    private static function _validateFileExtension($filename, $suitable_extensions)
    {
        $extension = self::_getFileExtension($filename);
        if (!$extension)
            return false;

        if (empty($suitable_extensions))
            return true;

        if (!is_array($suitable_extensions))
            $suitable_extensions = array(
                    $suitable_extensions
            );

        return in_array($extension, $suitable_extensions);
    }

    /**
     * Returns TRUE if the description file is valid against it's schema
     *
     * @throws AppDf_ParseException
     * @return boolean
     */
    private function _validateDescriptionFile()
    {
        $description_schema =
            self::_getRemoteFileContent(self::$_data_files['description_schema']);

        if (false === $description_schema)
            throw new AppDf_ParseException(
                AppDf_ParseException::E_RFILE_ACCESS,
                array('subject' => self::$_data_files['description_schema']),
                'Unable to access desctiption schema file'
            );

        $desc_xml = new DOMDocument();
        if (!@$desc_xml->load($this->_description_xml_file))
            throw new AppDf_ParseException(
                AppDf_ParseException::E_DESCRIPTION_INVALID_XML,
                array('subject' => $this->_description_xml_file),
                'Description file is invalid'
            );

        return @$desc_xml->schemaValidateSource($description_schema);
    }

    /**
     * Returnes content of a remote file
     *
     * @param string $url
     * @return boolean mixed
     */
    private static function _getRemoteFileContent($url)
    {
        $localcopy = dirname(__FILE__) . '/' . pathinfo(PATHINFO_FILENAME);
        if (is_file($localcopy)) {
          return file_get_contents($localcopy);
        }
            
        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $result = curl_exec($ch);
        $info = curl_getinfo($ch);

        if ($info['http_code'] != 200)
            return false;

        return $result;
    }
}