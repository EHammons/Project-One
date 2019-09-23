var map;
var service;
var infowindow;
var geocoder;

let MAX_PLACES = 5;

function init() {
    geocoder = new google.maps.Geocoder;
    // TODO: change to selected preview city instead of Austin
    var cityLat = 30.2672;
    var cityLng = -97.7431;
    var city = new google.maps.LatLng(cityLat, cityLng);
    infowindow = new google.maps.InfoWindow();
    map = new google.maps.Map(document.getElementById("map"), {
        center: city,
        zoom: 14.5
    });
}

function geocodeLatLng(address) {
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
        if (results[0]) {
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            displayCity(lat, lng);
            var latlng = lat + "," + lng
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

function displayCity(lat, lng) {
    var cityLat = parseFloat(lat);
    var cityLng = parseFloat(lng);
    var city = new google.maps.LatLng(cityLat, cityLng);
    map = new google.maps.Map(document.getElementById("map"), {
        center: city,
        zoom: 14.5
    });
}


function pinPlaces(places) {
    var placesLength = maxPlaces(places);
    for (var i = 0; i < placesLength; i++) {
        createMarker(places[i]);
    }
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
    });

    google.maps.event.addListener(marker, "click", function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}

$("#search-button").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#search-bar").val();
    geocodeLatLng(cityName);
});

function maxPlaces(places) {
    if (places.length < MAX_PLACES) {
        return places.length;
    }
    return MAX_PLACES;
}