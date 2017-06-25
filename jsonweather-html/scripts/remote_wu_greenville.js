// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
       
url:"http://api.wunderground.com/api/b58ad7db802544af/geolookup/conditions/q/34.852618,-82.39401.json",
dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
  var state = parsed_json['location']['state'];
  var windMph = parsed_json['current_observation']['wind_mph'];
  var windDir = parsed_json['current_observation']['wind_dir'];
  var pressureIn = parsed_json['current_observation']['pressure_in'];

$("#currentTemp").html(temp_f);
$("#cityDisplay").html(location+","+state);
$("#windMph").html("Wind Speed "+windMph+" Mph")  
$("#windDir").html("Wind Direction "+windDir)
$("#pressureIn").html(+pressureIn+" In");

      
      $("#cover").fadeOut(250);
    }
    });

  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
