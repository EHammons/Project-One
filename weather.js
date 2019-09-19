
function displayWeather() {

    var cityName = Austin // $("element").val().trim()
    var queryUrl = "https://api.weatherbit.io/v2.0/forecast/3hourly?city=" + cityName + "&key=7169e5ccc01a4702a01e93ee6982101a&"
    

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data

        for (var i = 0; i < results.length; i++) 
            var weather = $("<div>")
            console.log(austin)

            var cityWeather = 


        }


















}