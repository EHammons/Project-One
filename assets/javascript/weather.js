
function displayWeather() {

    var cityName = $("#search-bar").val().trim();

        function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    cityName = capitalizeFirstLetter(cityName);
    
    $("#city-name").text(cityName);

    
    var queryUrl = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + cityName + "&key=7169e5ccc01a4702a01e93ee6982101a&units=I&days=5";


    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        var results = response.data;
        console.log(results)
        

        var weatherDisplay = $("#weather-display")
            

        for (var i = 0; i < results.length; i++) {
            var dayWeather = $("<div>");
            var day = results[i].datetime;
            dayWeather.addClass("card-body")
            dayWeather.addClass("text-center");
            dayWeather.addClass("day-weather")
            dayWeather.addClass("col")


            var maxTemp = results[i].max_temp;
            var minTemp = results[i].min_temp;
            

            var weatherIcon = results[i].weather.icon;
            

            var convertedDate = moment(day, "YYYY-MM-DD").format("dd");
            dayWeather.append(convertedDate);


            var icon = $("<img>");

            icon.attr("src", "https://www.weatherbit.io/static/img/icons/" + weatherIcon + ".png")
            dayWeather.append(icon);

            dayWeather.append(Math.floor(maxTemp) + "° ");
            dayWeather.append(Math.floor(minTemp) + "° ");

            weatherDisplay.append(dayWeather);

        }

    });

}
// displayWeather ()
$("#search-button").on("click", function (event) {
    $("#weather-display").empty()
    event.preventDefault();
    
    displayWeather();
})
