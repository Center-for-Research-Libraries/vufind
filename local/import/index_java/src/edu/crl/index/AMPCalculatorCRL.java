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
import org.marc4j.marc.ControlField;
import org.marc4j.marc.DataField;
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
    // Extract all codes from the 049
    List<String> result = new ArrayList<String>();
    DataField lc = (DataField) record.getVariableField("049");
    if (lc != null) {
      if (lc.getSubfield('a') != null) {
        String codes = lc.getSubfield('a').getData().toLowerCase();
        Matcher m = Pattern.compile("(crl[a-z]{1})").matcher(codes);
        while (m.find()) {
          result.add(m.group());
        }
      }
    }
    
    // Also look into the 952i, which is where FOLIO stashes individual item
    // Material Types
    List items = record.getVariableFields("952");
    Iterator itemsIter = items.iterator();
    if (items != null) {
      if (itemsIter.hasNext()) {
        DataField item = (DataField) itemsIter.next();
        if (item.getSubfield('i') != null) {
          result.add(item.getSubfield('i').getData().toLowerCase());
        }
      }
    }
    
    // Also look into the 998a, which is where CRL stashed Mil location codes
    List mils = record.getVariableFields("998");
    Iterator milsIter = mils.iterator();
    if (mils != null) {
      if (milsIter.hasNext()) {
        DataField mil = (DataField) milsIter.next();
        if (mil.getSubfield('a') != null) {
          String milResult = mil.getSubfield('a').getData().toLowerCase();
          // The "crlm" mil location code is a special case that we want to
          // exclue. Though it is a valid value here it collides with any 049
          // values of "crlm" (a 049 "crlm" signals "SEAM", but a 998 "crlm"
          // signals a CRL Monograph). As we are only interested in AMP codes,
          // and map eveything in one amp_map.properites map, we have to exclude
          // this.
          if (!milResult.equals("crlm")) {
            result.add(milResult);
          }
        }
      }
    }

    
    // Deduplicate list by converting to set:
    return new LinkedHashSet<String>(result);
  }
  
}
