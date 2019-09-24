var apiKey = "AIzaSyADAEzhWG-Zr1lJeCo5mJmk6Oh_JPIDjUI"

function findPlaces(cityCoords) {
    // In this case, the "this" keyword refers to the button that was clicked

    $("#search-bar").empty();
    var cityCoords = cityCoords;
    var type = $("#dropdownMenuButton").val();
    console.log(type);
    // default to restaurant
    if (type === "") {
        type = "restaurant";
    }
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cityCoords + "&radius=1500&type=" + type + "&key=" + apiKey;
    
    console.log(queryURL);

    // Performing our AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After the data comes back from the API
      .then(function (response) {
          $("#place-list").empty();
            // Storing an array of results in the results variable
            var results = response.results;
            console.log(response);
            // console.log(JSON.stringify(response.results[0]));
            var placeIDs = {};
            var resultsLength = maxPlaces(results);
            for (var i = 0; i < resultsLength; i++) {
            //   console.log(results[i].name);
            //   console.log(results[i].rating);
              // TODO: update formatting for index.html
              placeIDs[i + 1] = results[i].place_id;
              var nameDiv = $("<div>");
              var label = $("<span>");
              label.addClass("label");
              label.text(String(i + 1) + ". ");
              var place = $("<a>").text(results[i].name); 
              place.addClass("place-name");
              place.attr("id", "place-name-" + (i + 1));
              nameDiv.append(label, place);
              var ratingPriceDiv = $("<div>");
              if (results[i].rating !== undefined) {
                var rating = $("<span>").text(results[i].rating + " ");
                rating.addClass("rating");
                ratingPriceDiv.append(rating);
              }
              if (results[i].price_level !== undefined) {
                  var price = $("<span>").text(priceToDollar(results[i].price_level));
                  price.addClass("price");
                  ratingPriceDiv.append(price);
              }
              var placeDiv = $("<div>");
              placeDiv.attr("id", "place-" + (i +1));
              placeDiv.addClass("place-info");
              placeDiv.addClass("card-body");
              placeDiv.append(nameDiv);
              placeDiv.append(ratingPriceDiv);
              $("#place-list").append(placeDiv);
            }        
            pinPlaces(results);  
            
            // add the url of each place given its placeID. this requires a separate api call
            addURLs(placeIDs);    
      });
  };

  
  function addURLs(placeIDs) {
      // loop through our places
      for (var j = 1; j <= MAX_PLACES; j++) {
        // get the query string with the place ID
        var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placeIDs[j] + "&key=" + apiKey;
        // clojure to lock in the value of j when we make the .then call
        (function(j) {
            $.ajax({
                method: "GET",
                url: queryURL
            }).then( function(response) {
                // set the href of the place to its site
                var site = response.result.website;
                var placeName = $("#place-name-" + j);
                placeName.attr("href", site);
                
            });
        })(j);
      }
  }

  // convert our price value to a dolar amount, $/$$/$$$ etc
  function priceToDollar(price) {
      var prices = "";
      for (var i = 0; i < price; i++) {
          prices += "$";
      }
      return prices;
  }

// dropdown listener for category
$(document).ready(function() { 
  $("#dropdown-list a").on("click", function() {
      var val = $(this).attr("value");
      var text = $(this).text();
      $("#dropdownMenuButton").val(val);
      $("#dropdownMenuButton").text(text);
  });

  $(".city-carousel").on("click", function(event) {
    console.log($(this));
    searchCity( $(this).attr("city-name") );
  });

  searchCity(randomCity());
});


// pick a random city to display on page load
function randomCity() {
    var cities = ["Hong Kong", "Paris", "Sydney", "Tokyo", "New York City"];

    return cities[Math.floor(Math.random() * 5)];
}