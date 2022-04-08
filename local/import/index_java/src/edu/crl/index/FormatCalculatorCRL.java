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
     * Determine whether a record is a government document.
     *
     * @param Record record
     * @return boolean
     */
    protected boolean isGovernmentDocument(Record record) {
        // Check both the results of parent method and the 008/28
        boolean ResultMarc008 = false;
        ControlField marc008 = (ControlField) record.getVariableField("008");
        if (marc008 != null) {
          char marc00828 = marc008.getData().toLowerCase().charAt(28);
          if (marc00828 != ' ' && marc00828 != 'u') {
            ResultMarc008 = true;
          }
        }
        return (super.isGovernmentDocument(record) || ResultMarc008);
    }

    /**
     * Determine whether a record is a conference proceeding.
     *
     * @param Record record
     * @return boolean
     */
    protected boolean isConferenceProceeding(Record record) {
        // Check both the results of parent method and the 008/29
        boolean ResultMarc008 = false;
        ControlField marc008 = (ControlField) record.getVariableField("008");
        if (marc008 != null) {
          if (marc008.getData().toLowerCase().charAt(29) == '1') {
            ResultMarc008 = true;
          }
        }
        return (super.isConferenceProceeding(record) || ResultMarc008);
    }

    /**
     * Determine whether a record is a CRL Dissertation.
     *
     * @param Record record
     * @return boolean
     */
    protected boolean isDissertation(Record record) {
        DataField callNum = (DataField) record.getVariableField("099");
        if (callNum != null) {
            if (callNum.getSubfield('a') != null) {
                if (callNum.getSubfield('a').getData().contains("P-")) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Determine whether a record is a CRL JSTOR.
     *
     * @param Record record
     * @return boolean
     */
    protected boolean isJSTOR(Record record) {
        DataField callNum = (DataField) record.getVariableField("099");
        if (callNum != null) {
            if (callNum.getSubfield('a') != null) {
                if (callNum.getSubfield('a').getData().contains("J-")) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Return the best format string based on bib level in leader; return
     * blank string for ambiguous/irrelevant results.
     *
     * @param Record record
     * @param char bibLevel
     * @param char formatCode
     * @param ControlField marc008
     * @param boolean couldBeBook
     * @return String
     */
    protected String getFormatFromBibLevel(Record record, char bibLevel, char formatCode, ControlField marc008, boolean couldBeBook) {
        switch (bibLevel) {
            // Monograph
            case 'm':
                if (couldBeBook) {
                    return (formatCode == 'c') ? "eBook" : "Book";
                }
                break;
            // Component parts
            case 'a':
                return "BookComponentPart";
            case 'b':
                return "SerialComponentPart";
            // Integrating resources (e.g. loose-leaf binders, databases)
            case 'i':
                return (formatCode == 'c')
                    ? "OnlineIntegratingResource" : "PhysicalIntegratingResource";
            // Serial
            case 's':
                // Look in 008 to determine what type of Continuing Resource
                if (marc008 != null) {
                    // General Newspapers
                    if (marc008.getData().toLowerCase().charAt(21) == 'n') {
                      return "Newspaper";
                    }
                    // Catch publications that start as a newspaper and
                    // later switch formats.
                    if (marc008.getData().toLowerCase().charAt(22) == 'e') {
                      return ("Newspaper");
                    }
                    // Else are serials.
                    return "Serial";
                }
                break;
        }
        return "";
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
        // Custom CRL check for dissertation.
        if (isDissertation(record)) {
          result.add("Dissertation");
        }
        // Custom CRL check for JSTOR.
        if (isJSTOR(record)) {
          result.add("JSTOR");
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
                // Note VuFind tries to get Microfilm type from 007, but at CRL
                // we use our own separate 008 check for this, so be sure to
                // ignore 007 "Microfilm" result here.
                if (formatFrom007.length() > 0 && formatFrom007 != "Microfilm") {
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

        // Catch special CRL cases that are based off of 008 data and are not
        // mutually exclusive with logic in standard FormatCalculator.java
        if (marc008 != null) {
          // Flag "Online" material as well as various types of film
          switch (marc008.getData().toLowerCase().charAt(23)) {
            case 'o':
              result.add("Online");
              break;
            case 'a':
              result.add("Microfilm");
              break;
            case 'b':
              result.add("Microfiche");
              break;
            case 'c':
              result.add("Microopaque");
              break;
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
