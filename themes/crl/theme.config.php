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
        'CRL\View\Helper\Root\RecordDataFormatter' => 'CRL\View\Helper\Root\RecordDataFormatterFactory',
        'CRL\View\Helper\Root\Record' => 'VuFind\View\Helper\Root\RecordFactory',
      ],
      'aliases' => [
        'recordDataFormatter' => 'CRL\View\Helper\Root\RecordDataFormatter',
        'record' => 'CRL\View\Helper\Root\Record',
      ],
    ],
];
