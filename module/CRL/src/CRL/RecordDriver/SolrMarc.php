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

}

