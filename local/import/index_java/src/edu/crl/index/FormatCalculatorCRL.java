package edu.crl.index;
/**
 * Format determination logic.
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

/**
 * Format determination logic - overrides for CRL.
 */
public class FormatCalculatorCRL extends org.vufind.index.FormatCalculator
{

    /**
     * Determine whether a record is electronic in format.
     *
     * @param Record record
     * @return boolean
     */
    protected boolean isElectronic(Record record) {
        /* Example from Villanova of how to use holdings locations to detect online status;
         * You can override this method in a subclass if you wish to use this approach.
        List holdingsFields = record.getVariableFields("852");
        Iterator holdingsIterator = holdingsFields.iterator();
        while (holdingsIterator.hasNext()) {
            DataField holdingsField = (DataField) holdingsIterator.next();
            if (holdingsField.getSubfield('b') != null) {
                String holdingsLocation = holdingsField.getSubfield('b').getData().toLowerCase();
                if (holdingsLocation.equals("www") || holdingsLocation.equals("e-ref")) {
                    return true;
                }
            }
        }
         */

        // Check 006 for format
        ControlField marc006 = (ControlField) record.getVariableField("006");
        if (marc006 != null) {
          char format006 = marc006.getData().toLowerCase().charAt(6);
          if (format006 == 'o' || format006 == 'q' || format006 == 's') {
            return true;
          }
        }

        // Legacy check 245
        DataField title = (DataField) record.getVariableField("245");
        if (title != null) {
            if (title.getSubfield('h') != null) {
                if (title.getSubfield('h').getData().toLowerCase().contains("[electronic resource]")) {
                    return true;
                }
            }
        }
        return false;
    }


    /**
     * Determine Record Format(s)
     *
     * @param  Record record
     * @return Set format(s) of record
     */
    protected List<String> getFormatsAsList(Record record) {
        List<String> result = new ArrayList<String>();
        String leader = record.getLeader().toString();
        ControlField marc008 = (ControlField) record.getVariableField("008");
        String formatString;
        char formatCode = ' ';

        // This record could be a book... until we prove otherwise!
        boolean couldBeBook = true;

        // Some format-specific special cases:
        if (isGovernmentDocument(record)) {
            result.add("GovernmentDocument");
        }
        if (isThesis(record)) {
            result.add("Thesis");
        }
        if (isElectronic(record)) {
            result.add("Electronic");
        }
        if (isConferenceProceeding(record)) {
            result.add("ConferenceProceeding");
        }

        // check the 007 - this is a repeating field
        List fields = record.getVariableFields("007");
        Iterator fieldsIter = fields.iterator();
        if (fields != null) {
            ControlField formatField;
            while(fieldsIter.hasNext()) {
                formatField = (ControlField) fieldsIter.next();
                formatString = formatField.getData().toLowerCase();
                formatCode = formatString.length() > 0 ? formatString.charAt(0) : ' ';
                if (definitelyNotBookBasedOn007(formatCode)) {
                    couldBeBook = false;
                }
                if (formatCode == 'v') {
                    // All video content should get flagged as video; we will also
                    // add a more detailed value in getFormatFrom007 to distinguish
                    // different types of video.
                    result.add("Video");
                }
                String formatFrom007 = getFormatFrom007(formatCode, formatString);
                if (formatFrom007.length() > 0) {
                    result.add(formatFrom007);
                }
            }
        }

        // check the Leader at position 6
        char recordType = Character.toLowerCase(leader.charAt(6));
        if (definitelyNotBookBasedOnRecordType(recordType, marc008)) {
            couldBeBook = false;
        }
        String formatFromRecordType = getFormatFromRecordType(record, recordType);
        if (formatFromRecordType.length() > 0) {
            result.add(formatFromRecordType);
        }

        // check the Leader at position 7
        char bibLevel = Character.toLowerCase(leader.charAt(7));
        String formatFromBibLevel = getFormatFromBibLevel(
            record, bibLevel, formatCode, marc008, couldBeBook
        );
        if (formatFromBibLevel.length() > 0) {
            result.add(formatFromBibLevel);
        }


        /////// PLAY LOGIC HERE FOR TESTING ///////////

        // Sub-versions of digital/electronic
        ControlField marc006 = (ControlField) record.getVariableField("006");
        if (marc006 != null) {
          char format006 = marc006.getData().toLowerCase().charAt(6);
          if (format006 == 'o') {
            result.add("DigitalO");
          }
          if (format006 == 'q') {
            result.add("DigitalQ");
          }
          if (format006 == 's') {
            result.add("DigitalS");
          }
        }
        // Theseis lookup based on location code
        DataField callNum = (DataField) record.getVariableField("099");
        if (callNum != null) {
            if (callNum.getSubfield('a') != null) {
                if (callNum.getSubfield('a').getData().contains("P-")) {
                    result.add("DissertationP");
                }
            }
        }


        // Nothing worked -- time to set up a value of last resort!
        if (result.isEmpty()) {
            // If the leader bit indicates a "Collection," treat it as a kit for now;
            // this is a rare case but helps cut down on the number of unknowns.
            result.add(bibLevel == 'c' ? "Kit" : "Unknown");
        }

        return result;
    }


}
