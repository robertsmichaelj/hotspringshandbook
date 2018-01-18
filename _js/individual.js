fallback = JSON.search(snapshot, "//activites");
//SET FALL BACK IF NOTHING IN THE URL TO SEARCH FOR
if (window.location.href.indexOf("?") <= -1) {
    var locale = fallback[0].hotsprings[0].index.fallback;
    window.location.href = "?" + locale;
}
var indivName = window.location.href.split("?")[1], index, featured, homeURL, headerBottom, headerTop, headerTopSet, all, activities, activity, activitySet, activityType, indivData, lat, lng, zoom, name, begin, i,
    pageType = $('#body').attr('class');
activity = JSON.search(snapshot, "//*[contains(condensedName, '" + indivName + "')]")[0];
activities = JSON.search(snapshot, "//*[activites]")[0].activites[0];
activityType = JSON.search(snapshot, "//*[condensedName='" + indivName + "']/type")[0];
if (pageType === "individual") {
    begin = activities[activityType][0];
}
//	SET HEADER TEXT
headerTopSet = new Vue({
    el: "#headerLink",
    data: {
        headerTop: begin.index.headerText,
        headerBottom: begin.index.headerSpanText,
        url: begin.index.headerLink
    }
});
//GET INFO ABOUT INDIVIDUAL SPRINGS
var indivInfo = new Vue({
    el: "#indivText",
    data: {
        name: activity.name,
        nearestTown: activity.nearestTown,
        walkingDist: activity.walkingDist,
        parkingCost: activity.parkingCost,
        elevation: activity.elevation,
        waterTemp: activity.waterTemp,
        accessSeasons: activity.accessableSeasons,
        nudes: activity.nudity,
        website: activity.website
    },
    created () {
        this.description = activity.longdescription;
        this.website = activity.website;
        this.personalNotes = activity.personalNotes;
    }
});

//IMAGE GALLERY BEGIN
var imageGallery = document.getElementById('imageGallery'),
    overlay = document.getElementById('overlay'),
    dirUrl = 'activities/' + activity.type + '/' + activity.condensedName + '/imgs/';

function createImg(imgurl, name, url) {
    if (name) {
        if (url) {
            $('#imageGallery').append('<div class="imageGalleryCell"><img src="' + imgurl + '"/><a href=' + url + '>Photo By: ' +  name[2] + ' ' + name[3] + '</a></div>');
        } else {
            $('#imageGallery').append('<div class="imageGalleryCell"><img src="' + imgurl + '"/><p>Photo By: ' +  name[2] + ' ' + name[3] + '</p></div>');
        }
    } else {
        $('#imageGallery').append('<div class="imageGalleryCell"><img src="' + imgurl + '"></div>');
    }
    
}
var imageArray = [];
$.ajax({
    url: dirUrl,
    cache: false,
    success: function (data) {
        $(data).find("a").each(function () {
            var imgUrl = $(this).attr('href');
            if (imgUrl.indexOf('/') >= 0 && imgUrl.indexOf('autoindex') < 0 && imgUrl.indexOf('.') >= 0 && imgUrl.indexOf('2000') < 0 && imgUrl.indexOf('500') < 0) {
                if (imgUrl.indexOf('credit') >= 0) {
                    var name = imgUrl.split('.');
                    if (imgUrl.indexOf('url') >= 0) {
                        var url = "";
                        createImg(imgUrl, name, url);
                    } else {
                        createImg(imgUrl, name);
                    }
                } else {
                    createImg(imgUrl);
                }
                imageArray.push(imgUrl);
            }
        });
        $('#imageGallery img').on('click', function () {
            var credit;
            var smallUrl = $(this).attr('src');
            var creditP = $(this).parent().find('p').text();
            var creditA = $(this).parent().find('a').html();
            if (!creditA === undefined) {
                credit = creditA;
            } else {
                credit = creditP;
            }
            $('body').append("<div class='galleryLarge'><img class='galleryImg' src='" + smallUrl + "'/><p>" + credit + "</p></div>");
            $('#overlay').fadeIn(300);
            $('.galleryLarge').fadeIn(300);
        });
        for (i = imageGallery.children.length; i >= 0; i--) {
            imageGallery.appendChild(imageGallery.children[Math.random() * i | 0]);
        }
    }
});
console.log(imageArray);

$('#overlay, .galleryLarge').on('click', function () {
    $('.galleryLarge').fadeOut(300);
    $('#overlay').fadeOut(300);
    $('.galleryLarge').remove();
});
//IMAGE GALLERY END





lat = activity.latitude;
lng = activity.longitude;
zoom = activity.zoom;
name = activity.name;
setTimeout(function () {
var center = {lat: lat, lng: lng},
    map = new google.maps.Map(document.getElementById('individualMapDiv'), {
        zoom: zoom,
        gestureHandling: 'auto',
        center: center,
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
    }),
    marker = new google.maps.Marker({
        position: center,
        map: map,
        label: {
            text: name,
            color: 'black',
            fontWeight: 'bold'
        }
    });
}, 300);

var g5 = new JustGage({
    id: "gaugeVistorScale",
    titlePosition: "below",
    titleMinFontSize: 15,
    titleFontColor: "#64706c",
    labelFontColor: "#000000",
    value: activity.peopleMeter,
    min: 0,
    max: 100,
    title: "Visitor Level",
    label: "Low - High",
    startAnimationTime: 1000,
    pointer: true,
    pointerOptions: {
      color: '#64706c',
    },
    customSectors: {
        percents: true,
        ranges: [{
          color : "#43bf58",
          lo : 0,
          hi : 50
        },{
          color : "#ff3b30",
          lo : 51,
          hi : 100
        }]
    },
    counter: true,
    gaugeWidthScale: 0.3
});

var g5 = new JustGage({
    id: "easeOfAccessScale",
    titlePosition: "below",
    titleMinFontSize: 15,
    titleFontColor: "#64706c",
    labelFontColor: "#000000",
    value: activity.easeOfAccess,
    min: 0,
    max: 100,
    title: "Ease Of Access",
    label: "Easy - Hard",
    startAnimationTime: 1000,
    pointer: true,
    pointerOptions: {
      color: '#64706c',
    },
    customSectors: {
        percents: true,
        ranges: [{
          color : "#43bf58",
          lo : 0,
          hi : 50
        },{
          color : "#ff3b30",
          lo : 51,
          hi : 100
        }]
    },
    counter: true,
    gaugeWidthScale: 0.3
});
$('.gauge').each(function () {
    $(this).find('text').eq(0).attr('y', "90");
});