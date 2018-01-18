/*jslint devel: true, nomen: true, sloppy: true, browser: true, regexp: true*/
/*global $*/
var lat, lng, img, zoom, hotData, locations, map, markers, markerCluster, labels, combo, infos, marker, i, contentString, windowNames, infowindow, hotName, siteJSON, snapshot, activites, activity, activityType, type;
$(document).ready(function() {
    var index, featured, featuredCondensedName, featuredHeaderText, homeURL, headerBottom, headerTop, featuredData, featuredState, featuredMobileBackPos, featuredSection, mostPopular, highestRated, headerTopSet, mostPopularHeader, mostPopularHeaderSet, highestRatedHeader, highestRatedHeaderSet,
        pageType = $('#body').attr('class');
    function sizing() {
        
        var cellsDiv = $('#fullList');
        var mapDiv = $(".customMapDiv");
//        if ($(window).width() >= 1600) {
//            var cellWidth = $('.gridCell').width();
//            mapDiv.width($(window).width() - (cellWidth * 4));
//        }
    }
    sizing();
    $( window ).resize(function() {
        sizing();
    });
    
    activity = JSON.search(snapshot, "//*[name]");
    activites = JSON.search(snapshot, "//*[activites]")[0].activites[0];
    //	activityType = JSON.search(snapshot, "//*[condensedName='" + springName + "']/type")[0];
    locations = [];
    $.each(activity, function (i, value) {
        lat = value.latitude;
        lng = value.longitude;
        type = value.type;
        img = "activites/" + type + value.name + "/imgs/1-1200px.jpg";
        combo = {lat: lat, lng: lng, name: value.name, rating: value.rating, walking: value.walkingDist, url: value.condensedName, parking: value.parkingCost, accessable: value.accessableSeasons, description: value.description, img: img, peopleRating: value.peopleMeter};
        locations.push(combo);
    });
    var markers1 = [];
    var sw = new google.maps.LatLng(41.998470, -117.032036);
    var nw = new google.maps.LatLng(48.971047, -111.098873);
    var bounds = new google.maps.LatLngBounds(sw, nw);
    map = new google.maps.Map(document.getElementById('allMapDiv'), {
        zoom: 8,
        center: {lat: 45.058906, lng: -114.840410},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#232323"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },

            {
                "featureType": "road.highway",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "grey"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "color": "#3B4541"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#6DCDEC"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]
    });
    
    markers = locations.map(function (location, i, data) {
        infowindow = new google.maps.InfoWindow({
            maxWidth: 350
        });
        marker = new google.maps.Marker({
            position: location,
            map: map,
            label: {
                text: location.name,
                color: 'black',
                fontWeight: 'bold'
            }
        });
        marker.addListener('click', function () {
            infowindow.open(map, marker);
            infowindow.setContent("<div id='infoWindows'><div id='gauge'></div><h2>" + markers1[i] + "</h2><div class='rating ratingMap' data-rating=" + location.rating  + "><div class='ratingMapColor ratingColor'></div><img src='/icons/hollowStars.png'></h3></div><h3>Walking Distance: " + location.walking + "</h3><h3>Parking Cost: " + location.parking + "</h3><h3>Accessable Seasons: " + location.accessable + "</h3><div class='infoWindowDescription'><p>" + location.description + "</p></div><a href='/individual.html?" + location.url + "'>See More</a></div>");
            mapRate(location.rating, '.ratingMap');
            infowindow.setPosition(location);
            var g5 = new JustGage({
                id: "gauge",
                value: location.peopleRating,
                min: 0,
                max: 100,
                title: "Visitor Level",
                label: "",
                levelColorsGradient: false
            });
        });
        markers1.push(location.name);
        return marker;
    });
    markerCluster = new MarkerClusterer(map, markers, {
        imagePath: '/plugins/markerclusterer/images/m'
    });
    map.fitBounds(bounds);
});

//RUNS AT PAGE LOAD IMMEDIATELY