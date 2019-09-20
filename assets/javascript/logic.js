$(document).on("click", "", function() {
    var search = "";
    console.log(search);
    var queryURL = "";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function(response) {
            console.log(response);
        })
})