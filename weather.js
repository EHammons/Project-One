
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
                var cityWeather = $("<div>");
                var temp = results[i].temp;
                console.log(temp);
                var weather = results[i].weather;
                console.log(weather)
                var wind = results[i].wind_spd;
                console.log(wind);
                
                cityWeather.append(temp);
                cityWeather.append(weather);
                cityWeather.append(wind);

                $("#weatherDisplay").append(temp + "degrees");
                $("#weatherDisplay").append(weather);
                $("#weatherDisplay").append(wind + "mph");
            }


        

            

        });






}
displayWeather ()