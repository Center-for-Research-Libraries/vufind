

function loadJSON(callback) {

   var xobj = new XMLHttpRequest();
       xobj.overrideMimeType("application/json");
   xobj.open('GET', '../../data.json', true);
   xobj.onreadystatechange = function () {
         if (xobj.readyState == 4 && xobj.status == "200") {
           // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
           callback(xobj.responseText);
         }
   };
   xobj.send(null);
}

function fill_CRL_member_ILL_form_link_list() {
var select = document.getElementById('CRL_member_ILL_form_link_list');

 loadJSON(function(response) {
  // Parse JSON string into object
    // var member_names_and_links = JSON.parse(response);
    // console.log("member_names_and_links", response);


    var obj = JSON.parse(response);
    // json object contains two properties: "line" and "total".
    // iterate "line" property (which is an array but that can be iterated)

    // console.log("obj:", obj);

    console.log("--OUTTER LOOP BEGIN--");
    for (var key in obj.member_names_and_links) {
        // key here is the index of line array
        console.log("key:", key);
        // result.innerHTML += "<br/>" + key + ": ";
        // each element of line array is an object
        // so we can iterate over its properties
        console.log("--INNER LOOP BEGIN--");
        console.log("CREATE NEW OPTION");
        var option = document.createElement('option');
        for (var prop in obj.member_names_and_links[key]) {
            // prop here is the property
            // obj.line[key][prop] is the value at this index and for this prop
            console.log("PROP:", prop);
            // result.innerHTML += "<br/>" + prop + " = " + obj.member_names_and_links[key][prop];
            console.log("obj.member_names_and_links[key][prop]:", obj.member_names_and_links[key][prop]);


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
        console.log("--INNER LOOP END--");
        console.log("APPEND OPTION");
        select.appendChild(option);
    }
    console.log("--OUTTER LOOP END--");



    // console.log("value:", value);
    // console.log("value:", class);
    // console.log("value:", text);


 });
}
