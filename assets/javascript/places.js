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
    var queryURL = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + cityCoords + "&radius=1500&type=" + type + "&key=AIzaSyADAEzhWG-Zr1lJeCo5mJmk6Oh_JPIDjUI"
    
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
            var placeIDs = [];
            var resultsLength = maxPlaces(results);
            for (var i = 0; i < resultsLength; i++) {
            //   console.log(results[i].name);
            //   console.log(results[i].rating);
              // TODO: update formatting for index.html
              placeIDs.push(results[i].place_id);
              var nameDiv = $("<div>");
              var label = $("<span>");
              label.addClass("label");
              label.text(String(i + 1) + ". ");
              var place = $("<span>").text(results[i].name); 
              place.addClass("place-name");
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
            addURLs(placeIDs);    
      });
  };

  addURLs(placeIDs) {
      
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
  })
});