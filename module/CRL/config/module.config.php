<?php

return array (
  'vufind' => 
  array (
    'plugin_managers' => 
    array (
      'ils_driver' => 
      array (
        'factories' => 
        array (
          'CRL\\ILS\\Driver\\Folio' => 'VuFind\\ILS\\Driver\\FolioFactory',
        ),
        'aliases' => 
        array (
          'VuFind\\ILS\\Driver\\Folio' => 'CRL\\ILS\\Driver\\Folio',
        ),
      ),
      'recorddriver' => 
      array (
        'factories' => 
        array (
          'CRL\\RecordDriver\\SolrMarc' => 'VuFind\\RecordDriver\\SolrDefaultFactory',
        ),
        'aliases' => 
        array (
          'VuFind\\RecordDriver\\SolrMarc' => 'CRL\\RecordDriver\\SolrMarc',
        ),
        'delegators' => 
        array (
          'CRL\\RecordDriver\\SolrMarc' => 
          array (
            0 => 'VuFind\\RecordDriver\\IlsAwareDelegatorFactory',
          ),
        ),
      ),
    ),
  ),
  'router' => 
  array (
    'routes' => 
    array (
      'redirects' => 
      array (
        'type' => 'Laminas\\Router\\Http\\Segment',
        'options' => 
        array (
          'route' => '/Controller/Action/:123',
          'constraints' => 
          array (
            'controller' => '[a-zA-Z][a-zA-Z0-9_-]*',
            'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
          ),
          'defaults' => 
          array (
            'controller' => 'Controller',
            'action' => 'Action',
          ),
        ),
      ),
    ),
  ),
);