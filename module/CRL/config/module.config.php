<?php

return [
    'vufind' => [
        'plugin_managers' => [
            'ils_driver' => [
                'factories' => [
                    'CRL\\ILS\\Driver\\Folio' => 'VuFind\\ILS\\Driver\\FolioFactory',
                ],
                'aliases' => [
                    'VuFind\\ILS\\Driver\\Folio' => 'CRL\\ILS\\Driver\\Folio',
                ]
            ],
            'recorddriver' => [
                'factories' => [
                    'CRL\\RecordDriver\\SolrMarc' => 'VuFind\\RecordDriver\\SolrDefaultFactory'
                ],
                'aliases' => [
                    'VuFind\\RecordDriver\\SolrMarc' => 'CRL\\RecordDriver\\SolrMarc'
                ],
                'delegators' => [
                    'CRL\\RecordDriver\\SolrMarc' => [
                        0 => 'VuFind\\RecordDriver\\IlsAwareDelegatorFactory',
                    ],
                ],
            ],
        ],
    ],
];