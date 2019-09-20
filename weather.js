
function displayWeather() {

    var cityName = "Austin" // $("element").val().trim()


    var queryURL = "https://api.weatherbit.io/v2.0/forecast/daily?city=Raleigh,NC&key=7169e5ccc01a4702a01e93ee6982101a&units=I&days=5"
   

    // var queryUrl = "https://api.weatherbit.io/v2.0/forecast/daily?city=" + cityName + "&key=7169e5ccc01a4702a01e93ee6982101a&units=I&days=5"
    

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data
            console.log(results);

            for (var i = 0; i < results.length; i++) {
                var cityWeather = $("<p>");
                var temp = results[i].temp;

                console.log(temp);
                var weatherDescript = results[i].weather.description;
                console.log(weatherDescript);
                var weatherIcon = results[i].weather.icon;
                console.log(weatherIcon)
                var wind = results[i].wind_spd;
                console.log(wind);
                
                // cityWeather.append(temp);
                // cityWeather.append(weatherDescript);
                // cityWeather.append(weatherIcon);
                // cityWeather.append(wind);
                

                cityWeather.append(temp + " °F");
                
                cityWeather.append(weatherDescript);

                var icon = $("<img>");
                icon.attr("src", "https://www.weatherbit.io/static/img/icons/" + weatherIcon + ".png")
                cityWeather.append(icon);
               
                cityWeather.append(wind + " mph");

                $("#weatherDisplay").append(cityWeather);

                
            }


        

            

        });






}
displayWeather ()