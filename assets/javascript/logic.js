$("#search-button").on("click", function() {
    var userInput = "city";
    console.log(userInput);
    var googleQueryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + userInput + "&radius=1500&type=restaurant&keyword=cruise&key=" + googleAPIKey;
    var googleAPIKey = "AIzaSyADAEzhWG-Zr1lJeCo5mJmk6Oh_JPIDjUI";
    $("#city-name").text(userInput);

    $.ajax({
        url: googleQueryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(response);
            var dayWeather = response.day;
            $("#weather-display").empty();
            for (var i = 0; i < dayWeather.length; i++) {
                var weatherDiv = $("<div>");
                weatherDiv.addClass("daily");
                var day = dayWeather[i];
                weatherDiv.append(day);
                $("#weather-display").append(weatherDiv);
            }
        })
})