$(document).on("click", "", function() {
    var search = "weather";
    console.log(search);
    var queryURL = "weather";

    $.ajax({
        url: queryURL,
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