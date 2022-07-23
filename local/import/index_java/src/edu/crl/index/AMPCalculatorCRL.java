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
    // The 952 can have many values
    DataField conference2 = (DataField) null;
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
    // Deduplicate list by converting to set:
    return new LinkedHashSet<String>(result);
  }
  
}
