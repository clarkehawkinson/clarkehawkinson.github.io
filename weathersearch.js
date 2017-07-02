var returned;
function getData(input) {
  // Get the data from the wunderground API
  $.ajax({
    url: "https://api.wunderground.com/api/b58ad7db802544af/geolookup/forecast/conditions/q/"
    + input + ".json"
    , dataType: "jsonp"
    , success: function (parsed_json) {
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp_f = data.current_observation.temp_f;
      var dew = data.current_observation.dewpoint_f;
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      
      $("#cityDisplay").text(location);
      $("#title").text(location + " | Weather Center");
      $("#currentTemp").text(Math.round(temp_f) + '°');
      $("#add1").text(toTitleCase(data.current_observation.icon));
      $("#add2").text(dew); 
  }});
}
;

$('#query').keyup(function () {
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");
    $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data);
        returned = data;
        //Begin Building Output
        var output = '<ol>';
        $.each(data.RESULTS, function (key, val) {
            if (val.name.search(rExp) != -1) {
                output += "<li>";
                output += '<a href="https://www.wunderground.com' + val.l + '" title="See Results for ' + val.name + '">' + val.name + '</a>';
                output += '</li>';
            }
        });
        output += '</ol>';
        $('#searchResults').html(output);
    });
});
// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
  evt.preventDefault();
  // With the text value get the needed value from the weather.json file
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
    index = $(this).index("a");
    getData(returned.RESULTS[index].name);
    //hide search results
    document.getElementById('searchResults').style.display = 'none';

// Get weather data from wunderground.com

  });

function toTitleCase(str){
    return str.replace(/\w+/g, function (txt){
        return txt.charAt(0).toUpperCase()+
            txt.substr(1).toLowerCase();
    })
}
// Intercept the menu link clicks
//$("#searchResults").on("click", "a", function (evt) {
//  evt.preventDefault();
//  // With the text value get the needed value from the weather.json file
//  var jsonCity = $(this).text(); // Franklin, etc...
//  console.log(jsonCity);
//    index = $(this).index("a");
//    getData(returned.RESULTS[index].name);
//    //hide search results
//    document.getElementById('searchResults').style.display = 'none';
//});

