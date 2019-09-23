var map;
var service;
var infowindow;
var geocoder;

function init() {
    geocoder = new google.maps.Geocoder;
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map();
}

function geocodeLatLng(address) {
    // var latlngStr = latlng.split(',', 2);
    // var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
        if (results[0]) {
        console.log(results[0]);
        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        var latlng = lat + "," + lng
        console.log(latlng);
        // here is where we can call other functions, it's the 'good' path
        findPlaces(latlng);
        return latlng;
        } else {
        window.alert('No results found');
        }
    } else {
        window.alert('Geocoder failed due to: ' + status);
    }
    });
}

// $(document).ready(function() {
//     init();
// });

$("#search-button").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#search-bar").val();
    geocodeLatLng(cityName);
});