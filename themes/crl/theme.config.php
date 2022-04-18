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
        'VuFind\View\Helper\Root\RecordDataFormatter' => 'CRL\View\Helper\Root\RecordDataFormatterFactory'
      ],
      'aliases' => [
        'recordDataFormatter' => 'VuFind\View\Helper\Root\RecordDataFormatter',
      ],
    ],
];
