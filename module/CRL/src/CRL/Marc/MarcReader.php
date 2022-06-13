<?php
/**
 * MARC record reader class with CRL overrides.
 */
namespace CRL\Marc;

/**
 * MARC record reader class.
 */
class MarcReader extends \VuFind\Marc\MarcReader
{
    /**
     * Supported serialization formats
     *
     * @var array
     */
    protected $serializations = [
        // Impliment custom ISO2709 handling for CRL, but maintain native VuFind
        // handling for XML
        'ISO2709' => \CRL\Marc\Serialization\Iso2709::class,
        'MARCXML' => \VuFind\Marc\Serialization\MarcXml::class,
    ];
}
