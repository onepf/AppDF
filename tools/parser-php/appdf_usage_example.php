<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

require_once 'Parser.php';
require_once 'ParseException.php';

// Unzip AppDf file
$unzipped_file_dir = 'test/';

// If AppDf supports your store (categories, store specific information etc.)
// set your store-code
$store_code = 'slideme';

try
{
    // Creaete AppDf instance
    $appdf = new AppDf_Parser($unzipped_file_dir, $store_code);

    // Parser works in hard validation mode by default. It means that if
    // file is not found the AppDfParseException will be thrown.
    // You can disable this mode so the errors can be obtained using
    // getErrors method
    $appdf->disableHardValidation();

    // Retrieving parsed data
    $data = $appdf->getData();
    // ... and errors
    $errors = $appdf->getErrors();

    echo "\n", 'Parsing results:';
    print_r($data);

    if (!empty($errors))
    {
        echo "\n", 'Errors:';
        print_r($errors);
    }
}
catch (AppDf_ParseException $e)
{
    echo "\n\n", 'Error [', $e->getCode(), ']: ', $e->getMessage(), "\n";
    print_r($e->getData());
}
