<?php
return [
    'extends' => 'bootstrap3',
    'css' => [
      'compiled.css',
    ],
    'less' => array(
      'active' => false,
      'compiled.less'
    ),
    'favicon' => 'favicon.ico',
    'helpers' => [
      'factories' => [
        'CRL\View\Helper\CRL\RecordDataFormatter' => 'CRL\View\Helper\CRL\RecordDataFormatterFactory',
        'CRL\View\Helper\CRL\Record' => 'VuFind\View\Helper\Root\RecordFactory',
      ],
      'aliases' => [
        'recordDataFormatter' => 'CRL\View\Helper\CRL\RecordDataFormatter',
        'record' => 'CRL\View\Helper\CRL\Record',
      ],
    ],
];
