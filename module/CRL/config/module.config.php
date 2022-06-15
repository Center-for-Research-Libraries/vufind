<?php

return [
    'controllers' => [
        'factories' => [
            'CRL\Controller\RedirectController' => 'VuFind\Controller\AbstractBaseFactory',
        ],
        'aliases' => [
            'Redirect' => 'CRL\Controller\RedirectController',
        ],
    ],
    'router' => [
        'routes' => [
            'legacy-redirect' => [
                'type'    => 'Laminas\Router\Http\Segment',
                'options' => [
                    'route'    => '/redirect/:type/:id',
                    'constraints' => [
                        'type'     => '[a-zA-Z0-9]+',
                        'id'     => '[a-zA-Z0-9]+',
                    ],
                    'defaults' => [
                        'controller' => 'Redirect',
                        'action'     => 'redirect',
                    ]
                ],
            ],
        ],
    ],
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