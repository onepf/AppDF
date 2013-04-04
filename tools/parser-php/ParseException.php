<?php
/**
 * Exception class for AppDf parser
 */
class AppDf_ParseException extends Exception
{
    /**
     * Error code.
     * Package error: description file not found
     *
     * @var int
     */
    const E_DESCRIPTION_NOT_FOUND = 1;

    /**
     * Error code.
     * Package error: description file is empty
     *
     * @var int
     */
    const E_DESCRIPTION_EMPTY = 2;

    /**
     * Error code.
     * Package error: description file is invalid XML document
     *
     * @var int
     */
    const E_DESCRIPTION_INVALID_XML = 3;

    /**
     * Error code.
     * Package error: description file is invalid against schema
     *
     * @var int
     */
    const E_DESCTIPTION_INVALID_SHEMA = 4;

    /**
     * Error code.
     * Package error: mentioned file not found
     *
     * @var int
     */
    const E_FILE_NOT_FOUND = 5;

    /**
     * Error code.
     * Package error: mentioned file is empty
     *
     * @var int
     */
    const E_FILE_EMPTY = 6;

    /**
     * Error code.
     * Package error: mentioned file is invalid
     *
     * @var int
     */
    const E_FILE_INVALID = 7;


    /**
     * Error code.
     * Package error: no price for paid app
     *
     * @var int
     */
    const E_NO_PRICE_FOR_PAID = 8;


    /**
     * Error code.
     * Parse error: package directory not found
     *
     * @var int
     */
    const E_DIRECTORY_NOT_FOUND = - 1;

    /**
     * Error code.
     * Parse error: unable to open file
     *
     * @var int
     */
    const E_FILE_ACCESS = - 2;

    /**
     * Error code.
     * Parse error: unable to access remote data file
     *
     * @var int
     */
    const E_RFILE_ACCESS = - 3;

    /**
     * Error code.
     * Parse error: remote data file is empty
     *
     * @var int
     */
    const E_RFILE_EMPTY = - 4;

    /**
     * Error code.
     * Parse error: unable to parse remote data file
     *
     * @var int
     */
    const E_RFILE_INVALID = - 5;

    /**
     * Error code.
     * Unexpected error: any other error
     *
     * @var int
     */
    const E_ERROR = 0;

    /**
     * List of error types
     *
     * @var array
     */
    private static $_codes = array(
        self::E_ERROR,
        self::E_DESCRIPTION_NOT_FOUND,
        self::E_DESCRIPTION_EMPTY,
        self::E_DESCRIPTION_INVALID_XML,
        self::E_DESCTIPTION_INVALID_SHEMA,
        self::E_FILE_NOT_FOUND,
        self::E_FILE_EMPTY,
        self::E_FILE_INVALID,
        self::E_DIRECTORY_NOT_FOUND,
        self::E_FILE_ACCESS,
        self::E_RFILE_ACCESS,
        self::E_RFILE_EMPTY,
        self::E_RFILE_INVALID,
        self::E_DESCRIPTION_INVALID_XML,
        self::E_NO_PRICE_FOR_PAID,
    );

    /**
     * Additional exception data
     *
     * @var array
     */
    protected $_data;

    /**
     *
     * @param int $code
     * @param array $data
     * @param string $message
     * @param mixed $previous
     */
    public function __construct($code, $data = null, $message = null, $previous = null)
    {
        $code = (int) $code;
        $this->_data = $data;
        if (!in_array($code, self::$_codes))
            $code = self::E_ERROR;

        $this->_data['code'] = $code;
        if ($message)
            $this->_data['message'] = $message;

        parent::__construct($message, $code, $previous);
    }

    /**
     * Returnes $data or it's particular element
     *
     * @param string $index
     * @return mixed:array string
     */
    public function getData($index = null)
    {
        if ($index) return empty($this->_data) ? null : $this->_data[$index];
        return $this->_data;
    }
}