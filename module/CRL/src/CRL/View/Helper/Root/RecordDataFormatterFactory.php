<?php

 namespace CRL\View\Helper\Root;

 use VuFind\View\Helper\Root\RecordDataFormatter\SpecBuilder;

 class RecordDataFormatterFactory extends \VuFind\View\Helper\Root\RecordDataFormatterFactory
 {

    /**
     * Get default specifications for displaying data in core metadata.
     *
     * @return array
     */
     public function getDefaultCoreSpecs()
     {
        $spec = new SpecBuilder(parent::getDefaultCoreSpecs());
        // Proof-of-concept for a custom field addition. May be removed upon
        // further evaluation.
        $spec->setLine('Key CRL Collections', 'getCRLScopes');
        // Add related links and continues.
        $spec->setTemplateLine(
            'Related Items', 'getAllRecordLinks', 'data-allRecordLinks.phtml'
        );
        return $spec->getArray();
     }

 }