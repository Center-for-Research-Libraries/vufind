package edu.crl.index;
/**
 * Get Amp code from recrod
 *
 * Copyright (C) Villanova University 2017.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 2,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

import org.marc4j.marc.Record;
import org.marc4j.marc.DataField;
import org.marc4j.marc.Subfield;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * AMP determination logic.
 */
public class AMPCalculatorCRL
{
  /**
   * Determine Record Format(s)
   *
   * @param  record MARC record
   * @return set of record formats
   */
  public Set<String> getAMPS(final Record record) {
    List<String> result = new ArrayList<String>();
    
    // Extract all codes from the 049. Note that 049s can be repeated.
    List lcs = record.getVariableFields("049");
    Iterator lcsIter = lcs.iterator();
    while (lcsIter.hasNext()) {
      DataField lc = (DataField) lcsIter.next();
      // It's unlikly to have multiple 049a subfields, but allow for it to be
      // forward compatible.
      List lcSubs = lc.getSubfields('a');
      Iterator lcSubsIter = lcSubs.iterator();
      while (lcSubsIter.hasNext()) {
        Subfield lcSub = (Subfield) lcSubsIter.next();
        // Individual 049a's can contain multiple codes in the form "crl*".
        // We need to extract them all.
        String codes = lcSub.getData().toLowerCase();
        Matcher m = Pattern.compile("(crl[a-z]{1})").matcher(codes);
        while (m.find()) {
          result.add(m.group());
        }
      }
    }
    
    // Also look into the 952i, which is where FOLIO stashes individual item
    // Material Types. Note that this is multivalued (one 952 per item)
    List items = record.getVariableFields("952");
    Iterator itemsIter = items.iterator();
    while (itemsIter.hasNext()) {
      DataField item = (DataField) itemsIter.next();
      if (item.getSubfield('i') != null) {
        result.add(item.getSubfield('i').getData().toLowerCase());
      }
    }
    
    // Also look into the 998a, which is where CRL stashed Mil location codes
    DataField mil = (DataField) record.getVariableField("998");
    if (mil != null) {
      // The 998a subfield can be multivalued
      List milSubs = mil.getSubfields('a');
      Iterator milSubsIter = milSubs.iterator();
      while (milSubsIter.hasNext()) {
        Subfield milSub = (Subfield) milSubsIter.next();
        String milSubResult = milSub.getData().toLowerCase();
        // "crl*" mil location codes are a special cases that we want to
        // exclue. Though some crl* values are valid here they may collides with
        // 049 values. For example a 049 "crlm" signals "SEAM", but a 998 "crlm"
        // signals a CRL Monograph. As we are only interested in AMP codes,
        // and map eveything in one amp_map.properites map, we have to exclude
        // these.
        if (!milSubResult.contains("crl")) {
          result.add(milSubResult);
        }
      }
    }
    
    // Deduplicate list by converting to set:
    return new LinkedHashSet<String>(result);
  }
  
}
