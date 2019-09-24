<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>Quoth the Giphy</title>
</head>

<body>
  <button data-person="Arnold Schwarzenegger">I'll be back</button>
  <button data-person="Michael J Fox">
    My happiness grows in direct proportionto my acceptance,
    and in inverse proportion to my expectations.
  </button>
  <!-- STEP TWO: between the dashed lines below
        * add three more buttons
        * add a data-person attribute of famous people you know
        * with a quote said by them -->

  <!--  -->

  <button data-person="Austin">
    Austin
  </button>
  <button data-person="Dallas">
    Dallas
  </button>
  

  <div id="gifs-appear-here">
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script type="text/javascript">
    // Event listener for all button elements
    $("button").on("click", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).attr("data-person");

      // Constructing a URL to search Giphy for the name of the person who said the quote
    //   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    //     person + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

        var queryURL =  "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyADAEzhWG-Zr1lJeCo5mJmk6Oh_JPIDjUI";

      // Performing our AJAX GET request
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After the data comes back from the API
        .then(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div for the gif
              var gifDiv = $("<div>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });
  </script>
</body>

</html>