$("#search-button").on("click", function() {
    event.preventDefault();
    var userInput = "Austin";
    console.log(userInput);
    $("#city-name").text(userInput);

    var weatherDiv = $("<div>");
    weatherDiv.addClass("daily");
    var day = "2019-09-20";
    console.log(day);
    var convertedDate = moment(day, "YYYY-MM-DD").format("dddd");
    console.log(convertedDate);
    var temp = "80";
    weatherDiv.append(convertedDate);
    weatherDiv.append(temp);
    $("#weather-display").append(weatherDiv);
})