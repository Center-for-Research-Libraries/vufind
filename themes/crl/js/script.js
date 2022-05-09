

/*******************************************************************************
  2021-02-02 function to fill the elements of the toplogo `CRL_member_ILL_form_link_list`
  original select/options preserved in top_logo_CRL_member_ILL_form_link_list.20210125.html:
*/
function fill_CRL_member_ILL_form_link_list() {

  var select = document.getElementById('CRL_member_ILL_form_link_list');
  /*
  if (select != null && select.value == '') { // if the select object does not exist, bail out
    console.log('crlFunctions, fill_CRL_member_ILL_form_link_list; object #CRL_member_ILL_form_link_list does not exist.');
    console.debug('fill_CRL_member_ILL_form_link_list does not exist, will not be filled, no ILL links');
    return false;
  } // end if
  */
/*
2021-02-05 new batch: via Teams:
[12:47 PM] Darmon Lewis
    So I notice there seems to be a few institutions not yet input to the drop-down menu,
    all joins from later FY20 and into '21: McMaster and Ryerson (two CRKNs) and San Diego State.
    Following is info:
		Institution name|ILL URL
		McMaster University|ZPORTAL Search (scholarsportal.info) = https://racer1.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage
		Ryerson University|ZPORTAL Search (scholarsportal.info) = https://racer2.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage
		San Diego State University|ILLiad Logon (sdsu.edu) = https://illiad.sdsu.edu/illiad/logon.html

        {value: "https://racer1.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "McMaster University"},
        {value: "https://racer2.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "Ryerson University"},
        {value: "https://illiad.sdsu.edu/illiad/logon.html", class: "illiadYES", text: "San Diego State University"},




*/


    // value in array = select option value (link to ILL form page when selected and button pushed)
    // text in array = select option text (member name displayed)
    // class in array = select option class (CSS, retained here but whatever we were trying never worked?)
  //console.log('begin fill_CRL_member_ILL_form_link_list');
  var member_names_and_links = [
      // {value: "val1", class: "", text: "text 1"}, // sample
      //<select name="CRL_member_ILL_form_link_list"
      //id="CRL_member_ILL_form_link_list"
      // class: "CRL_member_ILL_form_link_list"
        {value: "http://www.oclc.org/illiad.en.html", class: "illiadNO", text: "Choose CRL member"},
        {value: "https://adler.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Adler University"},
        {value: "https://uakron.illiad.oclc.org/illiad/AKR/logon.html", class: "illiadYES", text: "University of Akron"},
        {value: "https://ua.illiad.oclc.org/illiad/", class: "illiadYES", text: "University of Alabama"},
        {value: "https://uablh.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "University of Alabama at Birmingham"},
        {value: "https://www.library.ualberta.ca/services/interlibrary-loan", class: "illiadNO", text: "University of Alberta"},
        {value: "https://www.aub.edu.lb/ULIBRARIES/FORMS/Pages/index.aspx", class: "illiadNO", text: "American University of Beirut"},
        {value: "https://atlasilliad.amherst.edu/illiad/", class: "illiadYES", text: "Amherst College"},
        {value: "https://weblogin.asu.edu/cas/login?service=https%3a%2f%2filliad.lib.asu.edu%2filliad%2filliad.dll", class: "illiadYES", text: "Arizona State University"},
        {value: "https://azilliad.library.arizona.edu/illiad/illiad.dll?Action%3D10&Form%3D81", class: "illiadYES", text: "University of Arizona"},
        {value: "http://dbellis.library.astate.edu/vwebv/login", class: "illiadNO", text: "Arkansas State University"},
        {value: "https://uark.illiad.oclc.org/illiad/AFU/logon.html", class: "illiadYES", text: "University of Arkansas"},

        {value: "http://forms.saic.edu/flaxmanlibrary/interlibrary-loan-request-a-book/", class: "illiadNO", text: "The School of the Art Institute of Chicago"},
        {value: "https://www.ashland.edu/administration/content/interlibrary-loan-request-book", class: "illiadNO", text: "Ashland University"},
        {value: "http://www.ala.org/Template.cfm?Section=interlibraryloan&template=/ContentManagement/ContentDisplay.cfm&ContentID=104201", class: "illiadNO", text: "Association of Research Libraries"},
        {value: "http://www.bsu.edu/libraries/forms/ill.php", class: "illiadNO", text: "Ball State University"},

        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=BA&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "Baltimore Area Libraries Consortium"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=UB&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "University of Baltimore"},
				{value: "https://pds.lib.umd.edu/pds?func=load-login&institute=BL&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "University of Baltimore Law Library"},

        {value: "https://bard.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Bard College"},
        {value: "https://ill.baruch.cuny.edu/", class: "illiadYES", text: "Baruch College - CUNY"},
        {value: "https://illiad.bates.edu/illiad/", class: "illiadYES", text: "Bates College"},
        {value: "https://illiad.baylor.edu/illiad/logon.html", class: "illiadYES", text: "Baylor University"},
        {value: "https://beloit.on.worldcat.org/discovery", class: "illiadNO", text: "Beloit College"},
        {value: "http://libweb.ben.edu/login?url=https://illiad.ben.edu/illiad/illiad.dll", class: "illiadYES", text: "Benedictine University"},
        {value: "https://illiad.lib.binghamton.edu/illiad/", class: "illiadYES", text: "Binghamton University"},
        {value: "https://illiad.bc.edu/illiad/bxm/logon.html", class: "illiadYES", text: "Boston College"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=BS&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "Bowie State University"},
        {value: "https://bgsu.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Bowling Green State University"},
        {value: "https://search.library.brandeis.edu/discovery/login?vid=01BRAND_INST:BRAND", class: "illiadNO", text: "Brandeis University"},
        {value: "https://illiad.lib.byu.edu/ILLiad/", class: "illiadYES", text: "Brigham Young University"},
        {value: "http://services.library.ubc.ca/borrowing-services/ill/", class: "illiadNO", text: "University of British Columbia"},
        {value: "https://racer1.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "Brock University"},
        {value: "https://acu.relais-host.com/user/login.html?group=patron&LS=ACU", class: "illiadNO", text: "University of Calgary"},
        {value: "https://illiad.lib.calpoly.edu/illiad/logon.html", class: "illiadYES", text: "California Polytechnic State University"},
        {value: "https://berkeley.worldcat.org/", class: "illiadNO", text: "University of California, Berkeley"},
        {value: "http://ucelinks.cdlib.org:8888/sfx_local/cgi/core/citation-linkerVDX.cgi", class: "illiadNO", text: "University of California, Davis"},
        {value: "https://uci.worldcat.org/", class: "illiadNO", text: "University of California, Irvine"},
        {value: "https://ucla.worldcat.org/", class: "illiadNO", text: "University of California, Los Angeles"},
        {value: "http://ucelinks.cdlib.org:8888/sfx_local/cgi/core/citation-linker.cgi?rft.genre=book", class: "illiadNO", text: "University of California, Merced"},

        {value: "http://ucr.worldcat.org/", class: "illiadNO", text: "University of California, Riverside"},
        /*
          University of California, Riverside 2021-12-09 no one has told me about Riverside yet
          try:
            http://ucr.worldcat.org/ on model of other UC schools.
            That redirects to https://ucr.on.worldcat.org/discovery.
        */

        {value: "http://ucsd.worldcat.org/", class: "illiadNO", text: "University of California, San Diego"},
        {value: "https://ucsf.worldcat.org/", class: "illiadNO", text: "University of California, San Francisco"},
        {value: "https://www.library.ucsb.edu/search-research/citation-linker", class: "illiadNO", text: "University of California, Santa Barbara"},
        {value: "https://ucsc.worldcat.org/", class: "illiadNO", text: "University of California, Santa Cruz"},
        {value: "https://illiad.canisius.edu/", class: "illiadYES", text: "Canisius College"},
        {value: "https://carleton.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Carleton College"},
        {value: "https://racer2.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "Carleton University"},
        {value: "https://login.cmu.edu/idp/profile/SAML2/Redirect/SSO;jsessionid=72E9724024B4123D79588BEB43849FC3?execution=e1s1", class: "illiadYES", text: "Carnegie Mellon University"},
        {value: "https://carthage.illiad.oclc.org/illiad/", class: "illiadYES", text: "Carthage College"},
        {value: "http://cwru.hosts.atlas-sys.com/ILLiad/ILL/logon.html", class: "illiadYES", text: "Case Western Reserve University"},

				{value: "https://login.ezproxy.library.ucf.edu/login?url=https://ucf.illiad.oclc.org/illiad/illiad.dll/openurl?", class: "illiadYES", text: "University of Central Florida"},
        //2021-10-12 Central Florida changed per Tina Buck <Tina.Buck@ucf.edu>, via crlsupport@CRL.EDU ; old was: https://idp-prod.cc.ucf.edu/idp/Authn/UserPassword


        {value: "http://library.csu.edu/ill/bookloanrequest.php", class: "illiadNO", text: "Chicago State University"},
        {value: "http://requests.lib.uchicago.edu/illiad/illiad.dll", class: "illiadYES", text: "University of Chicago"},
        {value: "http://illiad.uc.edu/illiad/", class: "illiadYES", text: "University of Cincinnati"},
        {value: "https://webauth.claremont.edu/cas/login?entityId=https://ccl.idm.oclc.org/shibboleth&service=https://webauth.claremont.edu/idp/Authn/Cas", class: "illiadNO", text: "The Claremont Colleges"},
        {value: "https://colgate.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Colgate University"},
        {value: "https://csi.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "College of Staten Island - CUNY"},
        {value: "https://coloradocollege.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Colorado College"},
        {value: "https://colorado.idm.oclc.org/login?url=https://colorado.illiad.oclc.org/illiad/COD/illiad.dll", class: "illiadYES", text: "University of Colorado"},
        {value: "https://colum.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Columbia College Chicago"},
        {value: "https://columbia.illiad.oclc.org/illiad/zcu/Lending/LendingLogon.html", class: "illiadYES", text: "Columbia University"},
        {value: "https://library.concordia.ca/find/interlibrary-loans/?guid=request", class: "illiadNO", text: "Concordia University"},
        {value: "https://uconn.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "University of Connecticut"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=CS&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "Coppin State University"},
        {value: "http://cornell.hosts.atlas-sys.com/nonetid/logon.html", class: "illiadYES", text: "Cornell University"},

        {value: "https://illiad.davidson.edu/logon.html", class: "illiadYES", text: "Davidson College"},
        // 2021-12-10 using link I just went and found ; Marie says they want '*.htm' but that's a 404 @ 10:58:11

        {value: "https://dartmouth.illiad.oclc.org/illiad/berry/logon.html", class: "illiadYES", text: "Dartmouth College"},
        {value: "https://udayton.illiad.oclc.org/illiad/logon.html#illiad", class: "illiadYES", text: "University of Dayton"},
        {value: "https://udel.illiad.oclc.org/illiad/lending/lendinglogon.html", class: "illiadYES", text: "University of Delaware"},
        {value: "https://lib-europa.cair.du.edu/illiad/DVP/illiad.dll", class: "illiadYES", text: "University of Denver"},
        {value: "https://depaullib.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "DePaul University"},
        {value: "https://shib.oit.duke.edu/idp/authn/external?conversation=e1s1", class: "illiadNO", text: "Duke University"},
        {value: "https://illiad.library.emory.edu/illiad/illiad.dll", class: "illiadYES", text: "Emory University"},
        {value: "https://fau.illiad.oclc.org/illiad/Logon.html", class: "illiadYES", text: "Florida Atlantic University"},
        {value: "https://fiu.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Florida International University"},
        {value: "https://fsu.illiad.oclc.org/illiad/TECSRV/logon.html", class: "illiadYES", text: "Florida State University"},
        {value: "https://uflib.illiad.oclc.org/illiad/FUG/logon.html", class: "illiadYES", text: "University of Florida"},
        {value: "https://usmai.illiad.oclc.org/illiad/mfs/logon.html", class: "illiadNO", text: "Frostburg State University"},
        {value: "https://furman.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Furman University"},
        {value: "https://gmu.illiad.oclc.org/illiad/VGM/logon.html", class: "illiadYES", text: "George Mason University"},
        {value: "https://webill.lib.georgiasouthern.edu/illiad/illiad.dll?Action=99", class: "illiadYES", text: "Georgia Southern University"},
        {value: "https://gsu.illiad.oclc.org/illiad/gsu/logon.html", class: "illiadYES", text: "Georgia State University"},
        {value: "https://illiad.libs.uga.edu/illiad/Logon.html", class: "illiadYES", text: "University of Georgia"},
        {value: "https://gc-cuny.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Graduate Center - CUNY"},
        {value: "https://grinnell.illiad.oclc.org/illiad/", class: "illiadYES", text: "Grinnell College"},
        {value: "https://hamilton.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Hamilton College"},
        {value: "https://login.proxy2.hampshire.edu/login?url=https://hampshire.illiad.oclc.org/illiad/illiad.dll", class: "illiadYES", text: "Hampshire College"},
        {value: "https://illiad.hul.harvard.edu/illbasicauth/HLS/lending/lendinglogon.html", class: "illiadYES", text: "Harvard University"},
        {value: "http://lund.highpoint.edu/illiad/", class: "illiadYES", text: "High Point University"},
        {value: "https://hku.illiad.oclc.org/illiad/HUA/Lending/lendinglogon.html", class: "illiadYES", text: "University of Hong Kong"},
        {value: "http://www.hope.edu/library/help-services/", class: "illiadNO", text: "Hope College"},
        {value: "https://my.ico.edu/library/services", class: "illiadNO", text: "Illinois College of Optometry"},
        {value: "https://iit.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Illinois Institute of Technology"},
        {value: "https://illiad.iwu.edu/illiad/logon.html", class: "illiadYES", text: "Illinois Wesleyan University"},
        {value: "https://uic.illiad.oclc.org/illiad/IAY/logon.html", class: "illiadYES", text: "University of Illinois at Chicago"},
        {value: "https://loanshark.library.illinois.edu/illiad/lending/lendinglogon.html", class: "illiadYES", text: "University of Illinois at Urbana-Champaign"},
        {value: "https://ill.ulib.iupui.edu/ILLiad/IUM/logon.html", class: "illiadYES", text: "Indiana University"},
        {value: "http://www.lib.iastate.edu/info/6961", class: "illiadYES", text: "Iowa State University"},
        {value: "https://login.proxy.lib.uiowa.edu/login?url=https://uiowa.illiad.oclc.org/illiad/illiad.dll", class: "illiadYES", text: "University of Iowa"},
        {value: "https://www.monticello.org/site/research-and-collections/interlibrary-loan-request-form", class: "illiadNO", text: "Jefferson Library, Thomas Jefferson Foundation"},
        {value: "https://1457.account.worldcat.org/profile/route/openurl?", class: "illiadYES", text: "Kalamazoo College"},
        {value: "https://illiad.lib.ku.edu/ILLiad/KKU/", class: "illiadYES", text: "University of Kansas"},
        {value: "https://er.lib.k-state.edu/login?url=https://ksu.illiad.oclc.org/illiad/illiad.dll", class: "illiadYES", text: "Kansas State University"},
        {value: "https://kennesaw.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Kennesaw State University"},
        {value: "https://kent.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Kent State University"},
        {value: "https://lib.uky.edu/wtyill/", class: "illiadYES", text: "University of Kentucky"},
        {value: "https://kenyon.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Kenyon College"},
        {value: "https://knox.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Knox College"},
        {value: "https://www.kpu.ca/library/services/interlibraryloan", class: "illiadYES", text: "Kwantlen Polytechnic University"},
        {value: "http://ezproxy.lafayette.edu/login?url=https://lafayette.illiad.oclc.org/illiad/illiad.dll", class: "illiadYES", text: "Lafayette College"},
        {value: "https://lakeforest.illiad.oclc.org/illiad/logon.html", class: "illiadNO", text: "Lake Forest College"},
        {value: "https://racer1.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "Lakehead University"},
        {value: "https://fr.crepuq.vdxhost.com/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "Universite Laval"},
        {value: "https://1941.account.worldcat.org/profile/", class: "illiadNO", text: "Le Moyne College"},
        {value: "https://login.uleth.ca/cas/login?service=https://darius.uleth.ca/illb~S1/", class: "illiadNO", text: "University of Lethbridge"},
        {value: "https://www.liberty.edu/library/interlibrary-loan-account/", class: "illiadYES", text: "Liberty University"},
        {value: "https://illiad.luc.edu/illiad/IAL/logon.html", class: "illiadYES", text: "Loyola University of Chicago"},

        {value: "https://loyola-illiad-oclc-org.proxy-ln.researchport.umd.edu/illiad/illiad.dll", class: "illiadNO", text: "Loyola University Maryland"},
        /*2021-04-30 via MWaltz: Loyola University Maryland + Notre Dame of Maryland University share one catalog + link */

        {value: "https://macalester.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Macalester College"},
        {value: "https://apps.lib.umanitoba.ca/forms/docdel/request/?LS=MWU", class: "illiadNO", text: "University of Manitoba"},
        {value: "http://libguides.marquette.edu/ill", class: "illiadYES", text: "Marquette University"},

        // bgn U. of MD section 2021-02-02
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=BC&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "University of Maryland, Baltimore County (UMBC)"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=CE&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "University of Maryland, Center for Environmental Science"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=CP&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "University of Maryland, College Park"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=ES&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "University of Maryland, Eastern Shore"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=UC&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "University of Maryland Global Campus (UMGC)"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=HS&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "University of Maryland Health Sciences and Human Services Library"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=ML&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "University of Maryland Law Library"},
        // end U. of MD section

        {value: "https://illiad.library.umass.edu/illiad/AMH/", class: "illiadYES", text: "University of Massachusetts Amherst"},
        {value: "https://umb.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "University of Massachusetts-Boston"},
        {value: "https://login.ezproxy.mpib-berlin.mpg.de/login?url=http://intra.mpib-berlin.mpg.de/en/i/service-departments/library", class: "illiadNO", text: "Max Planck Institute for Human Development"},
        {value: "https://www.mcgill.ca/library/services/otherloans/interlibrary", class: "illiadNO", text: "McGill University"},
				{value: "https://racer1.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "McMaster University"},
        {value: "https://ill.lib.miamioh.edu/illiad/logon.html", class: "illiadYES", text: "Miami University of Ohio"},
        {value: "https://caneid.miami.edu/cas/login?service=https://triton.library.miami.edu/illiad/illiad.dll", class: "illiadYES", text: "University of Miami"},
        {value: "http://interlib.lib.msu.edu/lending/lendinglogon.html", class: "illiadYES", text: "Michigan State University"},
        {value: "https://weblogin.umich.edu/?cosign-ill.lib.umich.edu&https://ill.lib.umich.edu/illiad/lending/lending.asp", class: "illiadYES", text: "University of Michigan"},
        {value: "https://ill.middlebury.edu/illiad/mdy/logon.html", class: "illiadYES", text: "Middlebury College"},
        {value: "https://login.millikin.edu/cas/login?service=https%3A%2F%2Fmy.millikin.edu%2Fmuportal%2Fsecure%2Fsso%2Fproxy%2FilliadLogin.jsp", class: "illiadYES", text: "Millikin University"},
        {value: "http://www.d.umn.edu/lib/ill/", class: "illiadYES", text: "University of Minnesota-Twin Cities"},
        {value: "https://ill.mul.missouri.edu/", class: "illiadNO", text: "University of Missouri-Columbia"},
        {value: "https://monm.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Monmouth College"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=MS&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "Morgan State University"},
        {value: "https://caul-cbua.relais-host.com/user/login.html?group=patron&LS=NBSAM", text: "Mount Allison University"},
        {value: "https://proxy.mtholyoke.edu:2443/login?url=https://mtholyoke.illiad.oclc.org/illiad/illiad.dll", class: "illiadYES", text: "Mount Holyoke College"},
        {value: "http://www.nalandauniv.edu.in/library/", class: "illiadNO", text: "Nalanda University"},
        {value: "https://request.nal.usda.gov/access/loginp.jsp", class: "illiadNO", text: "National Agricultural Library"},
        {value: "http://nationalhumanitiescenter.org/library-guide/", class: "illiadNO", text: "National Humanities Center"},
        {value: "https://unl.illiad.oclc.org/illiad/Lending/LendingLogon.html", class: "illiadYES", text: "University of Nebraska - Lincoln"},
        {value: "https://usf.hosts.atlas-sys.com/nonauth/logon.html", class: "illiadYES", text: "The New College of Florida"},
        {value: "https://illiad.unm.edu/illiad/ill/", class: "illiadYES", text: "University of New Mexico"},
        {value: "https://nypl.illiad.oclc.org/illiad/NYP/logon.html", class: "illiadYES", text: "New York Public Library"},
        {value: "https://ill.library.nyu.edu", class: "illiadNO", text: "New York University"},
        {value: "https://www.newberry.org/interlibrary-loan", class: "illiadNO", text: "The Newberry Library"},
        {value: "https://www.lib.ncsu.edu/tripsaver", class: "illiadNO", text: "North Carolina State University"},
        {value: "https://illiad.lib.unc.edu/NOH/", class: "illiadYES", text: "University of North Carolina at Chapel Hill"},
        {value: "https://libids1.uncg.edu/illiad/", class: "illiadNO", text: "University of North Carolina at Greensboro"},
        {value: "https://ndsu.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "North Dakota State University"},
        {value: "https://unf.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "University of North Florida"},
        {value: "https://unt.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "University of North Texas"},
        {value: "https://ill.lib.neu.edu/illiad/snell/", class: "illiadYES", text: "Northeastern University"},
        {value: "https://niu.illiad.oclc.org/illiad/JNA/logon.html", class: "illiadYES", text: "Northern Illinois University"},
        {value: "http://www.library.northwestern.edu/find-borrow-request/requests-interlibrary-loan/requesting-unavailable-items.html", class: "illiadNO", text: "Northwestern University"},
        {value: "https://norwich.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Norwich University"},


        /*2021-09-22 new link, general Illiad for NON-CRL member; existence and contents per Marie Waltz */
        {value: "https://illiad.crl.edu/", class: "illiadYES", text: "Non-Member"},

        {value: "https://nd.illiad.oclc.org/illiad/IND/illiad.dll", class: "illiadYES", text: "University of Notre Dame"},

        {value: "https://loyola-illiad-oclc-org.proxy-ln.researchport.umd.edu/illiad/illiad.dll", class: "illiadNO", text: "Notre Dame of Maryland University"},
        /*shared catalog, see note abv*/

        {value: "https://login.ezproxy.oberlin.edu/login?qurl=http%3ahttp%3a%2f%2filliad.oberlin.edu%2filliad%2flogon.html", class: "illiadYES", text: "Oberlin College"},
        {value: "https://oxy.idm.oclc.org/login?url=https://oxy.illiad.oclc.org/illiad/illiad.dll?Action=10&Form=21", class: "illiadYES", text: "Occidental College"},

        /*{value: "https://library.osu.edu/find/borrowing-and-lending/interlibrary-services/borrowing-from-non-osu-collections/", class: "illiadYES", text: "Ohio State University"}, */
        {value: "https://library.osu.edu/ill/borrowing", class: "illiadYES", text: "Ohio State University"},

        {value: "https://ohio.hosts.atlas-sys.com/illiad/", class: "illiadYES", text: "Ohio University"},
        {value: "https://illiad-s.library.okstate.edu/illiad/logon.html", class: "illiadYES", text: "Oklahoma State University"},
        {value: "https://libraries.ou.edu/illiad_login", class: "illiadYES", text: "University of Oklahoma"},
        {value: "http://library.olivet.edu/forms/interlibrary-loan-request/index.php", class: "illiadNO", text: "Olivet Nazarene University"},
        {value: "http://osulibrary.oregonstate.edu/ill", class: "illiadNO", text: "Oregon State University"},
        {value: "https://illiad.uoregon.edu/illiad/oru/logon.html", class: "illiadYES", text: "University of Oregon"},
        {value: "https://racer1.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "University of Ottawa"},
        {value: "https://libraries.psu.edu/services/interlibrary-loan-services", class: "illiadYES", text: "Pennsylvania State University"},
        {value: "https://weblogin.pennkey.upenn.edu/login?factors=UPENN.EDU&cosign-library-accountsvcs-0&https://dla.library.upenn.edu/ils/resourcesharing/", class: "illiadNO", text: "University of Pennsylvania"},
        {value: "https://366.account.worldcat.org/profile/route/openurl?", class: "illiadYES", text: "Pepperdine University"},
        {value: "https://pitt.idm.oclc.org/login?url=https://pitt.illiad.oclc.org/illiad/illiad.dll", class: "illiadYES", text: "University of Pittsburgh"},
        {value: "https://library.ptsem.edu/interlibrary-loan-request", class: "illiadNO", text: "Princeton Theological Seminary"},
        {value: "https://library.princeton.edu/services/interlibrary-services", class: "illiadNO", text: "Princeton University"},
        {value: "https://login.ezproxy.lib.purdue.edu/login?qurl=https%3a%2f%2fpurdue.illiad.oclc.org%2filliad%2filliad.dll", class: "illiadYES", text: "Purdue University"},
        {value: "http://qc.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Queens University"},
        {value: "https://illiad.lib.rochester.edu/min/", class: "illiadYES", text: "University of Rochester"},
        {value: "https://rollins.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Rollins College"},
        {value: "http://law-new.rutgers.edu/screens/ill.html", class: "illiadNO", text: "Rutgers, The State University of New Jersey"},
				{value: "https://racer2.scholarsportal.info/en/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "Ryerson University"},
        {value: "https://illiad.stlawu.edu/illiad/", class: "illiadYES", text: "Saint Lawrence University"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=SM&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "St. Mary's College of Maryland"},
        {value: "https://stolaf.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Saint Olaf College"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=SU&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "Salisbury University"},
        {value: "https://sandiego.illiad.oclc.org/illiad/copley/illiad.dll?Action=99", class: "illiadYES", text: "University of San Diego"},
        {value: "https://illiad.sdsu.edu/illiad/logon.html", class: "illiadYES", text: "San Diego State University"},
        {value: "https://usask.vdxhost.com/zportal/zengine?VDXaction=LoginPage", class: "illiadNO", text: "University of Saskatchewan"},
        {value: "http://saisill.jhu.edu/", class: "illiadNO", text: "Paul H Nitze School of Advanced International Studies at Johns Hopkins University"},
        {value: "http://www.lib.sfu.ca/borrow/request-materials/ill/request-form", class: "illiadNO", text: "Simon Fraser University"},
        {value: "https://smithcollege.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Smith College"},
        {value: "http://ill3.tcl.sc.edu/illiad/colum/logon.html", class: "illiadYES", text: "University of South Carolina"},
        {value: "https://webauth.usf.edu/login?service=https%3A%2F%2Fshibboleth.usf.edu%2Fidp%2FAuthn%2FExtCas%3Fconversation%3De1s2%26entityId%3Dhttps%3A%2F%2Fusf.hosts.atlas-sys.com%2Fshibboleth&entityId=https%3A%2F%2Fusf.hosts.atlas-sys.com%2Fshibboleth", class: "illiadYES", text: "University of South Florida"},
        {value: "https://sewanee.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "University of the South"},
        {value: "http://libproxy2.usc.edu/login?url=http://usc.illiad.oclc.org/illiad/illiad.dll", class: "illiadYES", text: "University of Southern California"},
        {value: "https://ill.libraries.smu.edu/logon.html", class: "illiadYES", text: "Southern Methodist University"},
        {value: "https://sul-illiad.stanford.edu/illiad/ST2/lending/lendinglogon.html", class: "illiadYES", text: "Stanford University"},
        {value: "https://sso.cc.stonybrook.edu/cas/login?service=https%3A%2F%2Fsso.cc.stonybrook.edu%2Fidp%2FAuthn%2FRemoteUser", class: "illiadYES", text: "Stony Brook University"},
        {value: "https://illiad.geneseo.edu/", class: "illiadYES", text: "SUNY Geneseo"},
        {value: "https://temple.illiad.oclc.org/illiad/paley/logon.html", class: "illiadYES", text: "Temple University"},
        {value: "https://www.lib.utk.edu/ils/", class: "illiadYES", text: "University of Tennessee"},
        {value: "http://getitforme.library.tamu.edu/MSLLocal/lending/LendingLogon.html", class: "illiadYES", text: "Texas A & M University"},
        {value: "https://eraider.ttu.edu/signin.asp?redirect=http%3A%2F%2Frequest-it.lib.ttu.edu%2Filliad.dll", class: "illiadYES", text: "Texas Tech University"},
        {value: "https://login.ezproxy.lib.utexas.edu/login?qurl=https%3a%2f%2flib-pclcz020.austin.utexas.edu%2fIlliad%2fIXA%2filliad.dll", class: "illiadYES", text: "University of Texas at Austin"},
				{value: "https://www.utdallas.edu/library/services/ill/", class: "illiadYES", text: "University of Texas at Dallas"},
        {value: "https://sso.it.utsa.edu/idp/profile/SAML2/Redirect/SSO;jsessionid=196vxk5r3zvf21xrvhwkq8jn23?execution=e1s1", class: "illiadNO", text: "University of Texas at San Antonio"},
        {value: "https://onesearch.library.utoronto.ca/ill", class: "illiadNO", text: "University of Toronto"},
        {value: "https://pds.lib.umd.edu/pds?func=load-login&institute=TU&calling_system=aleph&url=https://catalog.umd.edu/F?func=", class: "illiadNO", text: "Towson University"},
        {value: "https://www.trentu.ca/library/ill", class: "illiadNO", text: "Trent University"},
        {value: "https://tulane.primo.exlibrisgroup.com/openurl/01TUL_INST/01TUL_INST:Tulane?", class: "illiadYES", text: "Tulane University"},
        {value: "https://union.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Union College"},
        {value: "https://usmalibrary.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "United States Military Academy"},
        {value: "https://utah.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "University of Utah"},
        {value: "https://valpo.illiad.oclc.org/illiad/IVU/logon.html", class: "illiadYES", text: "Valparaiso University"},
        {value: "https://illiad.library.vanderbilt.edu/illiad/ill/", class: "illiadYES", text: "Vanderbilt University"},
        {value: "https://vassar.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Vassar College"},
        {value: "https://webauth.uvm.edu/webauth/login?RT=WAfWjAz%2F4EpVHAmx79RG7S6UyHWFzQ7zBC%20XERfLSz3jbFCb2obRrcHgcxWChuVUd1ATsvQEnsP6AFjdO%2FVjy3qlfSvS3GznCefoTMxjy3tT0nD3OWLMDbMe9KUNou4NGXyIW%2F1Ee5Tt0LlHLN%20nPor4ehEglva6Ywf6n5YuA4sJWZbp%20KHAuMwE71BHqmVOu7Tp6hLsLD19MqPL2PnnYWseTud2ryHURehwsMKOl6K5o7KqfyZDhQ%20NHcHAEjn3qY3U3xy%20NBJbDzWSC9YnF2MuCxTzo5dLXCDuFvKURXdH9hCkNHdFI%2FQhRbqHBcsc%2F3urz1lP7J%20WKuGjngnYhbNTyrulfmPcRhqA2WZQ9BsZy%2FIy;ST=WATVn92EzHVq%209gBWB3bZmTQ5Fk7mj5BvUorssaRWrc%20IOTcZvr41xNvcp85A6j70ley4ZSFXBEwiffKoEz9ga0PpeamwGgf6OxDSkchI%2FJevY7%2Ff1E1e9G3t%20gd5GbwEo0%2FdDpuOifPz4FHRVdKWbcDwbKXipsLSQT21S2OFh%2063cpA;test_cookie=1", class: "illiadYES", text: "University of Vermont"},
        {value: "http://www.uvic.ca/library/use/borrow/illo/not_at_uvic.php", class: "illiadNO", text: "University of Victoria"},
        {value: "https://vcu.illiad.oclc.org/illiad/AtlasAuthPortal", class: "illiadYES", text: "Virginia Commonwealth University"},
        {value: "https://login.vt.edu/profile/SAML2/Redirect/SSO;jsessionid=16ugbtza26i381tj4we6exfuam?execution=e1s1", class: "illiadYES", text: "Virginia Tech"},
        {value: "http://www.library.virginia.edu/services/ils/ill/", class: "illiadNO", text: "University of Virginia"},
        {value: "https://illiad.wustl.edu/illiad/logon.html", class: "illiadYES", text: "Washington University"},
        {value: "http://www.lib.washington.edu/ill", class: "illiadNO", text: "University of Washington"},
        {value: "https://wayne.illiad.oclc.org/illiad/illiad.dll", class: "illiadYES", text: "Wayne State University"},


        {value: "https://wesleyan.hosts.atlas-sys.com/logon", class: "illiadYES", text: "Wesleyan University"},  /*2021-07-28 */

				{value: "https://illiad.wcupa.edu/illiad/", class: "illiadYES", text: "West Chester University"}, //2022-03-28 per mwaltz email

        {value: "https://uwf.illiad.oclc.org/illiad/ill_new.htm", class: "illiadYES", text: "University of West Florida"},
        {value: "https://illiad.lib.wvu.edu/", class: "illiadYES", text: "West Virginia University"},
        {value: "https://wmich.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Western Michigan University"},
        {value: "https://illiad.westernu.edu/illiad/logon.html", class: "illiadYES", text: "Western University"},
        {value: "https://library.wlu.ca/services/request-from-other-libraries", class: "illiadNO", text: "Wilfrid Laurier University"},
        {value: "https://illiad.swem.wm.edu/Illiad.dll", class: "illiadYES", text: "William & Mary"},
        {value: "https://williams.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "Williams College"},
        {value: "https://madison.hosts.atlas-sys.com/illiad/logon.html", class: "illiadYES", text: "University of Wisconsin-Madison"},
        {value: "https://2358.account.worldcat.org/profile", class: "illiadYES", text: "College of Wooster"},
        {value: "https://ill.library.yale.edu/illlogin/default.aspx?service=https%3a%2f%2fill.library.yale.edu%2fILLiad%2flogin.ashx%3fReturnUrl%3d%2filliad%2filliad.dll", class: "illiadYES", text: "Yale University"},
        {value: "https://york-cuny.illiad.oclc.org/illiad/logon.html", class: "illiadYES", text: "York University"} // no comma on last
      // end of toplogo options
  ]; // end member_names_and_links

  //console.info('next fill_CRL_member_ILL_form_link_list for i < member_names_and_links.length:', member_names_and_links.length);
  // was length 218 on 2021-02-02 13:10:14

  for (var i = 0; i < member_names_and_links.length; i += 1) {
  //for (var i = 0; i < 10; i += 1) {
    //console.debug('for ILL_form, i=',i, ' of len=', member_names_and_links.length, ' ; from array, value', member_names_and_links[i].value, ' ; class', member_names_and_links[i].class, ' ; text:', member_names_and_links[i].text);
    var option = document.createElement('option');
      option.setAttribute('value', member_names_and_links[i].value);
      option.setAttribute('class', member_names_and_links[i].class);
      //option.appendChild(document.createTextNode("SCRIPT_APPENDING_BLORT_" + member_names_and_links[i].text));
      option.appendChild(document.createTextNode(member_names_and_links[i].text));
      //console.debug('this option.text:', option.text);
      select.appendChild(option); // attach the option to the list
      //console.info('i=',i, ' of len=', member_names_and_links.length, ' ; from array, value', member_names_and_links[i].value, ' ; class', member_names_and_links[i].class, ' ; text:', member_names_and_links[i].text);
  } // end for i
  console.info('crlFunctions, fill_CRL_member_ILL_form_link_list, member_names_and_links.length:', member_names_and_links.length );
} /* end fill_CRL_member_ILL_form_link_list
*******************************************************************************/



document.addEventListener("DOMContentLoaded", function(event) {

  var el = document.getElementById('Illiad_arrow');

  el.addEventListener('click', function () {
    console.log("el", el);
    var e = document.getElementById("CRL_member_ILL_form_link_list");
    var link = e.value;
    console.log('link:', link);
    window.open(link, '_blank');
  }, false);

  //do work
  fill_CRL_member_ILL_form_link_list()
});
