function loadJSON(callback) {

  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', '../../data.json', true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function fill_CRL_member_ILL_form_link_list() {
  // Lightbox provisioning.
  var el = document.getElementById('Illiad_arrow');
  el.addEventListener('click', function () {
    var e = document.getElementById("CRL_member_ILL_form_link_list");
    var link = e.value;
    // If we are in a lightbox, close it before directing the user to the
    // new window.
    if (VuFind.lightbox !== 'undefined') {
      VuFind.lightbox.close();
    }
    window.open(link, '_blank');
  }, false);

  // Builds select dropdown from data.json response.
  var select = document.getElementById('CRL_member_ILL_form_link_list');

  loadJSON(function(response) {
    var obj = JSON.parse(response);
    for (var key in obj.member_names_and_links) {
      var option = document.createElement('option');
      for (var prop in obj.member_names_and_links[key]) {
        if (prop = "value") {
          option.setAttribute('value', obj.member_names_and_links[key][prop]);
        }

        if (prop = "class") {
          option.setAttribute('class', obj.member_names_and_links[key][prop]);
        }

        if (prop = "text") {
          option.innerHTML = obj.member_names_and_links[key][prop];
        }
      }
      select.appendChild(option);
    }
  });
}
