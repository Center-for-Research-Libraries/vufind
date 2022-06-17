<?php

namespace CRL\RecordDriver;

class SolrMarc extends \VuFind\RecordDriver\SolrMarc
{
  
    /**
     * Override MARC reader
     * 
     * CRL Implements some custom MARC reader logic. The reader is not a Lamias
     * service or plugin, so we have to do a brute-force override by changing
     * the class originally specified in
     * VuFind\RecordDriver\Feature\MarcReaderTrait
     *
     * @return array
     */
    protected $marcReaderClass = \CRL\Marc\MarcReader::class;

    /**
     * Get the CRL scope of the current record.
     *
     * @return array
     */
    public function getCRLScopes()
    {
        return (array) $this->fields['crl_scope'] ?? [];
    }

    /**
     * Check if the record contains the online format.
     *
     * @return array
     */
    public function isOnline()
    {
        $formats = (array)($this->fields['format'] ?? []);
        return (array_search(\CRL\Module::ONLINE_FORMAT, $formats) !== FALSE);
    }

}
