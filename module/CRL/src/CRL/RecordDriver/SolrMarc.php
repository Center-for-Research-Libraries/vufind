<?php

namespace CRL\RecordDriver;

class SolrMarc extends \VuFind\RecordDriver\SolrMarc
{

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
        return (array_search("Online Access", $formats) !== FALSE);
    }

}
