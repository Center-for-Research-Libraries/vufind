<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                              xmlns:marc="http://www.loc.gov/MARC21/slim"
                              exclude-result-prefixes="marc">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <xsl:apply-templates/>
  </xsl:template>

  <xsl:template match="marc:record">
      <table class="citation table table-striped">
        <tr class="pace-car">
          <th width="15%"/>
          <td width="5%"/>
          <td width="5%"/>
          <td width="*"/>
        </tr>
        <tr class="marc-row-LEADER">
          <th>LEADER</th>
          <td colspan="3"><xsl:value-of select="//marc:leader"/></td>
        </tr>
        <xsl:apply-templates select="marc:datafield|marc:controlfield"/>
      </table>
  </xsl:template>

  <xsl:template match="//marc:controlfield">
      <tr class="marc-row-{@tag}">
        <th>
          <xsl:value-of select="@tag"/>
        </th>
        <td colspan="3"><xsl:value-of select="."/></td>
      </tr>
  </xsl:template>
  
  <xsl:template match="//marc:datafield">
      <tr class="marc-row-{@tag}">
        <th>
          <xsl:value-of select="@tag"/>
        </th>
        <td><xsl:value-of select="@ind1"/></td>
        <td><xsl:value-of select="@ind2"/></td>
        <td>
          <xsl:apply-templates select="marc:subfield"/>
        </td>
      </tr>
  </xsl:template>

  <xsl:template match="marc:subfield">
      <strong>|<xsl:value-of select="@code"/></strong>&#160;<xsl:value-of select="."/>&#160;
  </xsl:template>
  
  <!-- Remove any 952 values by declaring a blank transformation -->
  <xsl:template match="//marc:datafield[@tag=952]">
  </xsl:template>

</xsl:stylesheet>