<?php

namespace CRL\ILS\Driver;

class Folio extends \VuFind\ILS\Driver\Folio
{



    /**
     * This method queries the ILS for holding information.
     *
     * @param string $bibId   Bib-level id
     * @param array  $patron  Patron login information from $this->patronLogin
     * @param array  $options Extra options (not currently used)
     *
     * @return array An array of associative holding arrays
     *
     * @SuppressWarnings(PHPMD.UnusedFormalParameter)
     */
    public function getHolding($bibId, array $patron = null, array $options = [])
    {
        $instance = $this->getInstanceByBibId($bibId);
        $query = [
            'query' => '(instanceId=="' . $instance->id
                . '" NOT discoverySuppress==true)'
        ];
        $items = [];
        foreach ($this->getPagedResults(
            'holdingsRecords',
            '/holdings-storage/holdings',
            $query
        ) as $holding) {
            $query = [
                'query' => '(holdingsRecordId=="' . $holding->id
                    . '" NOT discoverySuppress==true)'
            ];
            $notesFormatter = function ($note) {
                return !($note->staffOnly ?? false)
                    && !empty($note->note) ? $note->note : '';
            };
            $textFormatter = function ($supplement) {
                $format = '%s %s';
                $supStat = $supplement->statement;
                $supNote = $supplement->note;
                $statement = trim(sprintf($format, $supStat, $supNote));
                return $statement ?? '';
            };
            $holdingNotes = array_filter(
                array_map($notesFormatter, $holding->notes ?? [])
            );
            $hasHoldingNotes = !empty(implode($holdingNotes));
            $holdingsStatements = array_map(
                $textFormatter,
                $holding->holdingsStatements ?? []
            );
            $holdingsSupplements = array_map(
                $textFormatter,
                $holding->holdingsStatementsForSupplements ?? []
            );
            $holdingsIndexes = array_map(
                $textFormatter,
                $holding->holdingsStatementsForIndexes ?? []
            );
            $holdingCallNumber = $holding->callNumber ?? '';
            $holdingCallNumberPrefix = $holding->callNumberPrefix ?? '';
            foreach ($this->getPagedResults(
                'items',
                '/item-storage/items',
                $query
            ) as $item) {
                $itemNotes = array_filter(
                    array_map($notesFormatter, $item->notes ?? [])
                );
                $locationId = $item->effectiveLocationId;
                $locationData = $this->getLocationData($locationId);
                $locationName = $locationData['name'];
                $locationCode = $locationData['code'];
                $callNumberData = $this->chooseCallNumber(
                    $holdingCallNumberPrefix,
                    $holdingCallNumber,
                    $item->itemLevelCallNumberPrefix ?? '',
                    $item->itemLevelCallNumber ?? ''
                );
                $items[] = $callNumberData + [
                    'id' => $bibId,
                    'item_id' => $item->id,
                    'holding_id' => $holding->id,
                    'number' => count($items) + 1,
                    'barcode' => $item->barcode ?? '',
                    'status' => $item->status->name, 
                    'availability' => $item->status->name == 'Available',
                    'is_holdable' => $this->isHoldable($locationName),
                    'holdings_notes'=> $hasHoldingNotes ? $holdingNotes : null,
                    'item_notes' => !empty(implode($itemNotes)) ? $itemNotes : null,
                    'issues' => $holdingsStatements,
                    'supplements' => $holdingsSupplements,
                    'indexes' => $holdingsIndexes,
                    'location' => $locationName,
                    'location_code' => $locationCode,
                    'reserve' => 'TODO',
                    'addLink' => true,
                    // CRL additions
                    'volume' => $item->volume ?? '',
                ];
            }
        }
        return $items;
    }


}
