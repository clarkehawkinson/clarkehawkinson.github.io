var returned;
$('#query').keyup(function () {
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");
    $.getJSON("https://autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data);
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
// Get weather data from wunderground.com

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
});

function getData(input) {
  // Get the data from the wunderground API
  $.ajax({
    url: "//api.wunderground.com/api/b58ad7db802544af/geolookup/conditions/q/"
    + input + ".json"
    , dataType: "jsonp"
    , success: function (data) {
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp_f = data.current_observation.temp_f;
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#cityDisplay").text(location);
      $("title").html(location + " | Weather Center");
      $("#currentTemp").html(Math.round(temp_f) + '°');
      $("#summary").text(toTitleCase(data.current_observation.icon));
      $("#cover").fadeOut(250);
    }
  });
}