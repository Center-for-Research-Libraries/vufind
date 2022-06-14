<?php
/**
 * ISO2709 MARC exchange format support class with CRL modifications.
 */
namespace CRL\Marc\Serialization;

/**
 * ISO2709 exchange format support class with CRL modifications.
 */
class Iso2709 extends \VuFind\Marc\Serialization\Iso2709 implements \VuFind\Marc\Serialization\SerializationInterface
{

    /**
     * Parse MARCXML string
     *
     * @param string $marc MARCXML
     *
     * @throws Exception
     * @return array
     */
    public static function fromString(string $marc): array
    {
        $leader = substr($marc, 0, 24);
        $fields = [];
        $dataStart = 0 + (int)substr($marc, 12, 5);
        $dirLen = $dataStart - self::LEADER_LEN - 1;

        $offset = 0;
        while ($offset < $dirLen) {
            $tag = substr($marc, self::LEADER_LEN + $offset, 3);
            $len = (int)substr($marc, self::LEADER_LEN + $offset + 3, 4);
            $dataOffset
                = (int)substr($marc, self::LEADER_LEN + $offset + 7, 5);

            $tagData = substr($marc, $dataStart + $dataOffset, $len);

            if (substr($tagData, -1, 1) == self::END_OF_FIELD) {
                $tagData = substr($tagData, 0, -1);          
            }
            // Tuncated field detected
            else {
                // CRL addition when corrupt field detected:
                // Before throwing an exception (that may not be gracefully
                // handled prior to a full critial request error) check for
                // cases where we can gracefully recover, such as MARC with
                // lots (thousands) of 952 fields that gets truncated. The
                // 952 data should be at end of the MARC, so when truncation
                // happens we can trust the completeness of fields already
                // processed and safely drop the truncated 952 and any others
                // that follow.
                if ($tag == 952) {
                  break;
                }
                throw new \Exception(
                    "Invalid MARC record (end of field not found): $marc"
                );
            }

            if (ctype_digit($tag) && $tag < 10) {
                $fields[$tag][] = $tagData;
            } else {
                $newField = [
                    'i1' => $tagData[0] ?? ' ',
                    'i2' => $tagData[1] ?? ' '
                ];
                $subfields = explode(
                    self::SUBFIELD_INDICATOR,
                    substr($tagData, 3)
                );
                foreach ($subfields as $subfield) {
                    if ('' === $subfield) {
                        continue;
                    }
                    $newField['s'][] = [
                        (string)$subfield[0] => substr($subfield, 1)
                    ];
                }
                $fields[$tag][] = $newField;
            }

            $offset += 12;
        }

        return [$leader, $fields];
    }

}
