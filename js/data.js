/*jslint devel: true, nomen: true, sloppy: true, browser: true, regexp: true*/
/*global $*/
//var getData = function (data) {
//    console.log(data);
//},
//    springsData = j().get('/js/springs-data.js', getData).end();
//console.log(springsData);
console.log(sitedata);
var i,
    menus = [],
    allAct = [],
    pop = [],
    rat = [],
    index,
    featured,
    featuredName,
    featuredHeaderText,
    featuredSection,
    mostPopular,
    highestRated,
    headerTopSet,
    mostPopularHeader,
    mostPopularHeaderSet,
    highestRatedHeader,
    highestRatedHeaderSet,
    all,
    subHeader,
    lat,
    lng,
    zoom,
    name,
    img,
    locations,
    map,
    markers,
    markerCluster,
    combo,
    marker,
    infowindow,
    type,
    menuBuild,
    footerText,
    fullList,
    indivName,
    mapStyles,
    allCatHeader,
    heroHead,
    pageType = document.querySelector('.hot__body').classList,
    menuIcon = document.querySelector('.menu__icon'),
    headerLinks = document.querySelector('.header__links');
console.log(pageType);
function getIndexDetails(data) {
    var key;
    for (key in sitedata.index) {
        if (key === data) {
            return sitedata.index[key];
        }
    }
}
function getMenuData(data) {
    var key, menu;
    for (key in sitedata.sitewide) {
        if (key === data) {
            menu = sitedata.sitewide[key];
            menus.push(menu);
        }
    }
}
function getActivity(name) {
    var key, keys, activity;
    for (key in sitedata.activites) {
        for (keys in sitedata.activites[key]) {
            for (i = 0; i < sitedata.activites[key][keys][0].options.length; i += 1) {
                if (name === sitedata.activites[key][keys][0].options[i].name || name === sitedata.activites[key][keys][0].options[i].condensedName) {
                    activity = sitedata.activites[key][keys][0].options[i];
                    return activity;
                }
            }
        }
    }
}
function getAllActivities() {
    var key, keys, allacts;
    for (key in sitedata.activites) {
        for (keys in sitedata.activites[key]) {
            for (i = 0; i < sitedata.activites[key][keys][0].options.length; i += 1) {
                allacts = sitedata.activites[key][keys][0].options[i];
                allAct.push(allacts);
                 
            }
        }
    }
}
function getAllActivityAttr(data) {
    var key, keys, pops, rats;
    for (key in sitedata.activites) {
        for (keys in sitedata.activites[key]) {
            for (i = 0; i < sitedata.activites[key][keys][0].options.length; i += 1) {
                if (data === "popular") {
                    if (sitedata.activites[key][keys][0].options[i][data] === true) {
                        pops = sitedata.activites[key][keys][0].options[i];
                        pop.push(pops);
                    }
                }
                if (data === "rating") {
                    if (sitedata.activites[key][keys][0].options[i][data] >= 70) {
                        rats = sitedata.activites[key][keys][0].options[i];
                        rat.push(rats);
                    }
                }
                
            }
        }
    }
}
function transparentRate(rating, element) {
    element.querySelector('.rating__color').style.right = ((rating / 100) * 80);
}
function colorRate(rating, element) {
    var r = element.querySelector('.rating__color').getBoundingClientRect().right,
        move = rating / 100 * (80 * -1);
	element.querySelector('.rating__color').style.right = move + "px";
	element.querySelector('.rating').style.opacity = 1;
}
function mapRate(rating) {
    document.querySelector('.rating__color').style.left = rating / 100 * (80);
    document.querySelector('.rating').style.opacity = 1;
}
function setIndivCellRatings(rating) {
    var cellColor = document.querySelector('.rating__color');
    cellColor.style.right = rating / 100 * (80 * -1) + "px";
}
//	SET TOP HEADER TEXT
headerTopSet = new Vue({
    el: ".header__main",
    data: {
        headerTop: getIndexDetails("headerText"),
        headerBottom: getIndexDetails("headerSpanText"),
        url: getIndexDetails("headerLink")
    }
});
//BUILD TOP MENU
getMenuData('menuItems');
menuBuild = new Vue({
    el: ".header__links",
    data: {
        menuItems: menus[0]
    },
    methods: {
        menu: function (index) {
            return (index);
        }
    }
});
//FOOTER
footerText = sitedata.sitewide.footerText;
document.querySelector('.site__footer').innerHTML = footerText;
document.querySelector('.site__footer').getElementsByTagName('span')[0].innerHTML = new Date().getFullYear();
//MAP STYLES
mapStyles = [
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
];


//SET UP BY PAGE TYPE
all = sitedata;
index = sitedata.index;
featured = sitedata.index.featured;
featuredHeaderText = featured.featuredHeader;
featuredName = featured.featuredName;
mostPopularHeader = index.sectionHeaders.mostPopHeader;
highestRatedHeader = index.sectionHeaders.highRateHeader;
allCatHeader = index.sectionHeaders.allCategories;
heroHead = index.heroHeader;
subHeader = all.fullListAndMap.fullListHeader;

if (pageType[0] === "main__index") {
//MAIN INDEX
//MAIN INDEX
//MAIN INDEX
    var actObj = getActivity(featuredName);
    //SET FEATURED TEXT
    featuredSection = new Vue({
        el: ".featured",
        data: {
            herohead: heroHead,
            header: featuredHeaderText,
            name: actObj.name,
            nearbyTown: actObj.nearestTown,
            shortDescription: actObj.description,
            url: "/individual/" + actObj.condensedName,
            backgroundImg: "activities/" + actObj.type + "/" + actObj.condensedName + "/header/header.jpg"
        }
    });
    //SET MOST POPULAR HEADER
    mostPopularHeaderSet = new Vue({
        el: ".most__popular__header",
        data: {
            headerTop: mostPopularHeader
        }
    });
    //CREATE MOST POPULAR
    getAllActivityAttr('popular');
    mostPopular = new Vue({
        el: ".most__popular",
        data: {
            numOfPop: pop
        },
        methods: {
            pop: function (index) {
                return (index);
            }
        }
    });
    //SET ALL CATEGORIES HEADER
    var allCatHeaderSet = new Vue({
        el: ".index__all__categories__header",
        data: {
            headerTop: allCatHeader
        }
    });
    //CREATE ALL CATEGORIES
    var allCategories = new Vue({
        el: ".all__categories__grid",
        data: {
            catData: index.allCategories
        },
        methods: {
            pop: function (index) {
                return (index);
            }
        }
    });
    //SET HIGHEST RATED HEADER
    highestRatedHeaderSet = new Vue({
        el: ".highest__rated__header",
        data: {
            headerTop: highestRatedHeader
        }
    });
    //CREATE HIGHEST RATED
    getAllActivityAttr('rating');
    highestRated = new Vue({
        el: ".highest__rated",
        data: {
            numOfRate: rat
        },
        methods: {
            rate: function (index) {
                return (index);
            }
        }
    });
    //SORT POPULAR GRID ITEMS RANDOMLY
    var gridSortPopular = document.querySelector('.most__popular');
    for (i = gridSortPopular.children.length; i >= 0; i--) {
        gridSortPopular.appendChild(gridSortPopular.children[Math.random() * i | 0]);
    }
    //SORT HIGHEST RATED WITH HIGHEST AT TOP
    var gridSortRated = $('.highest__rated');
    
    gridSortRated.find('.grid__cell').sort(function (a, b) {
        return +b.dataset.rating - +a.dataset.rating;
    }).appendTo(gridSortRated);
    colorRate(actObj.rating, document.querySelector('.featured'));

    var i,
        gridCell = document.querySelectorAll('.grid__cell');
    for (i = 0; i < gridCell.length; i += 1) {
        var cell = gridCell[i];
        colorRate(cell.getAttribute('data-rating'), cell);
    }
} else if (pageType[0] === "full__list") {
//FULL LIST PAGES
//FULL LIST PAGES
//FULL LIST PAGES
    getAllActivities();
    fullList = new Vue({
        el: ".all__springs__list",
        data: {
            numOfActivites: allAct
        },
        methods: {
            pop: function (index) {
                return (index);
            }
        }
    });
    var headers = new Vue({
        el: ".full__list__sub__header",
        data: {
            headerTop: subHeader
        }
    });
    locations = [];
    $.each(allAct, function (i, value) {
        lat = value.latitude;
        lng = value.longitude;
        type = value.type;
        img = "activites/" + type + value.name + "/imgs/1-1200px.jpg";
        combo = {lat: lat, lng: lng, name: value.name, rating: value.rating, walking: value.walkingDist, url: value.condensedName, parking: value.parkingCost, accessable: value.accessableSeasons, description: value.description, img: img, peopleRating: value.peopleMeter};
        locations.push(combo);
    });
    var markers1 = [],
        sw = new google.maps.LatLng(41.998470, -117.032036),
        nw = new google.maps.LatLng(48.971047, -111.098873),
        bounds = new google.maps.LatLngBounds(sw, nw);
    map = new google.maps.Map(document.querySelector('.all__map__div'), {
        zoom: 7,
        center: {lat: 45.058906, lng: -114.840410},
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: mapStyles
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
            infowindow.setContent("<div class='info__windows'><div id='gauge'></div><h2>" + markers1[i] + "</h2><div class='rating rating__map' data-rating=" + location.rating  + "><div class='rating__map--color rating__color'></div><img src='/icons/hollowStars.png'></h3></div><h3>Walking Distance: " + location.walking + "</h3><h3>Parking Cost: " + location.parking + "</h3><h3>Accessable Seasons: " + location.accessable + "</h3><div class='info__window__description'><p>" + location.description + "</p></div><a href='/individual/" + location.url + "'>See More</a></div>");
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
    var i;
    var gridCell = document.querySelectorAll('.grid__cell');
    for (i = 0; i < gridCell.length; i += 1) {
        var cell = gridCell[i];
        colorRate(cell.getAttribute('data-rating'), cell);
    }
} else if (pageType[0] === "individual") {
    
//INDIVIDUAL PAGES
//INDIVIDUAL PAGES
//INDIVIDUAL PAGES
    if (window.location.href.indexOf("hotspringshandbook") !== -1) {
        //IF ON LIVE SITE
        indivName = window.location.href.split("/")[4];
    } else if (window.location.href.indexOf("?") !== -1) {
        //IF IN DEV MODE
        indivName = window.location.href.split("?")[1];
    } else {
        //SET FALL BACK IF NOTHING IN THE URL TO SEARCH FOR
        indivName = sitedata.activites[0].hotsprings[0].index.fallback;
        window.location.href = "?" + indivName;
    }
    var actObj = getActivity(indivName);
    //GET INFO ABOUT INDIVIDUAL SPRINGS
    var indivInfo = new Vue({
        el: ".indiv__content",
        data: {
            name: actObj.name,
            nearestTown: actObj.nearestTown,
            walkingDist: actObj.walkingDist,
            parkingCost: actObj.parkingCost,
            elevation: actObj.elevation,
            waterTemp: actObj.waterTemp.description,
            accessSeasons: actObj.accessableSeasons,
            nudes: actObj.nudity.title,
            website: actObj.website,
            imgHeader: actObj.images.header,
            vidHeader: actObj.videos.header
        },
        created: function () {
            this.description = actObj.longdescription;
            this.website = actObj.website;
            this.personalNotes = actObj.personalNotes;
        }
    });
    var rating = actObj.rating;
    setIndivCellRatings(rating);
    //ADD DISQUS COMMENT SECTION
    var disqus_config = function () {
        var PAGE_URL = window.location.href;
        this.page.url = PAGE_URL;
        this.page.identifier = actObj.condensedName;
        this.page.title = actObj.name;
    };

    (function () { // SETS UP COMMENTING SYSTEM
        var d = document, s = d.createElement('script');
        s.src = 'https://hot-springs-handbook.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
    }());
    document.querySelector('.comment__section').querySelector('span').textContent = actObj.name;
    //IMAGE GALLERY BEGIN
    var imageGallery = document.querySelector('.js__image__gallery'),
        overlay = document.querySelector('.image__overlay'),
        dirUrl = '../activities/' + actObj.type + '/' + actObj.condensedName + '/imgs/';
    var createImg = function (imgurl, name, url) {
        var imgCell = document.createElement('div'),
            img = document.createElement('img'),
            imgGal = document.querySelector('.image__gallery'),
            anc;
        imgCell.classList.add('image__gallery__cell');
        img.setAttribute('src', imgurl);
        imgCell.appendChild(img);
        if (name) {
            anc = document.createElement('a');
            anc.innerHTML = "Photo By" + name[2] + ' ' + name[3];
            if (url) {
                anc.href = url;
            }
            imgGal.appendChild(imgCell);
        } else {
            imgGal.appendChild(imgCell);
        }
    },
        imageArray = [],
        setImgs = function (data) {
            var response = data.responseXML,
                anchors = response.getElementsByTagName('a'),
                i;
            for (i = 0; i < anchors.length; i += 1) {
                var anc = anchors[i],
                    ancHref = anc.href;
                if (ancHref.indexOf('jpg') >= 0) {
                    if (ancHref.indexOf('credit') >= 0) {
                        var name = ancHref.split('.');
                    } else {
                        createImg(ancHref);
                    }
                    imageArray.push(ancHref);
                }
            }
        },
        dirData = j().get(dirUrl, setImgs, 'html');
    //IMAGE GALLERY END
    
    //MAPPING BEGIN
    //MAPPING BEGIN
    //MAPPING BEGIN
    lat = actObj.latitude;
    lng = actObj.longitude;
    zoom = actObj.zoom;
    name = actObj.name;
    setTimeout(function () {
        var center = {lat: lat, lng: lng},
            map = new google.maps.Map(document.querySelector('.individual__map__container'), {
                zoom: zoom,
                gestureHandling: 'auto',
                center: center,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: mapStyles
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
        id: "gauge__visitor__scale",
        titlePosition: "below",
        titleMinFontSize: 16,
        titleFontColor: "#64706c",
        labelFontColor: "#64706c",
        value: actObj.peopleMeter,
        min: 0,
        max: 100,
        title: "Visitor Level",
        label: "Low - High",
        startAnimationTime: 1000,
        pointer: true,
        pointerOptions: {
            color: '#64706c'
        },
        customSectors: {
            percents: true,
            ranges: [{
                color : "#43bf58",
                lo : 0,
                hi : 50
            }, {
                color : "#ff3b30",
                lo : 51,
                hi : 100
            }]
        },
        counter: true,
        gaugeWidthScale: 0.4
    });
    var g5 = new JustGage({
        id: "gauge__ease__access",
        titlePosition: "below",
        titleMinFontSize: 16,
        titleFontColor: "#64706c",
        labelFontColor: "#64706c",
        value: actObj.easeOfAccess,
        min: 0,
        max: 100,
        title: "Ease Of Access",
        label: "Easy - Hard",
        startAnimationTime: 1000,
        pointer: true,
        pointerOptions: {
            color: '#64706c'
        },
        customSectors: {
            percents: true,
            ranges: [{
                color : "#43bf58",
                lo : 0,
                hi : 50
            }, {
                color : "#ff3b30",
                lo : 51,
                hi : 100
            }]
        },
        counter: true,
        gaugeWidthScale: 0.4
    });
    var g5 = new JustGage({
        id: "gauge__water__temp",
        titlePosition: "below",
        titleMinFontSize: 16,
        titleFontColor: "#64706c",
        labelFontColor: "#64706c",
        value: actObj.waterTemp.comfortMeter,
        min: 0,
        max: 100,
        title: "Water Temp",
        label: "Cold - Hot",
        startAnimationTime: 1000,
        pointer: true,
        pointerOptions: {
            color: '#64706c'
        },
        customSectors: {
            percents: true,
            ranges: [{
                color : "#43bf58",
                lo : 0,
                hi : 50
            }, {
                color : "#ff3b30",
                lo : 51,
                hi : 100
            }]
        },
        counter: true,
        gaugeWidthScale: 0.4
    });
    var g5 = new JustGage({
        id: "gauge__nude__scale",
        titlePosition: "below",
        titleMinFontSize: 16,
        titleFontColor: "#64706c",
        labelFontColor: "#64706c",
        value: actObj.nudity.nudeMeter,
        min: 0,
        max: 100,
        title: "Nudity Forecast",
        label: "Prude - Nude",
        startAnimationTime: 1000,
        pointer: true,
        pointerOptions: {
            color: '#64706c'
        },
        customSectors: {
            percents: true,
            ranges: [{
                color : "#43bf58",
                lo : 0,
                hi : 50
            }, {
                color : "#ff3b30",
                lo : 51,
                hi : 100
            }]
        },
        counter: true,
        gaugeWidthScale: 0.4
    });
    $('.gauge').each(function () {
        $(this).find('text').eq(0).attr('y', "114");
    });
    document.addEventListener("DOMContentLoaded", function () {
        setTimeout(function () {
            $('.image__gallery').slick({
                lazyLoad: 'ondemand',
                infinite: true,
                dots: true,
                appendDots: $('.individual__image__gallery'),
                arrows: false,
                centerMode: true,
                centerPadding: '60px',
                draggable: false,
                swipeToSlide: true,
                variableWidth: true,
                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            centerPadding: '40px'
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            centerPadding: '40px',
                            slidesToShow: 2
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            swipe: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 500,
                        settings: {
                            swipe: true,
                            dots: false
                        }
                    }
                ]
            });
            document.querySelector('.individual__image__gallery').style.opacity = 1;
        }, 300);
    });
} else if (pageType === "about") {
    //EMAIL SUBMIT SCRIPT
    $('.contact__formButton').on('click', function (e) {
        e.preventDefault();
        var name = $(".contact__form input[name='name']").val(),
            email = $(".contact__form input[name='email']").val(),
            message = $(".contact__form textarea").val();
        $.ajax({
            url: '../php/contactForm.php',
            type: 'POST',
            data:
                {
                    name: name,
                    email: email,
                    message: message
                },
            success: function () {
                console.log('asdfa');
                $('.contact__form').fadeOut(300, function () {
                    $('.contactStatus').fadeIn();
                });
            },
            error: function (e) {
                console.log(e);
                $('.contactError').fadeIn();
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var winWidth = window.innerWidth;
    setTimeout(function () { //COME BACK AND FIX THIS TIMING ISSUE WITH SLICK CAROUSEL
        j('.menu__icon').on('click', function () {
            
            var links = document.querySelector('.header__links');
            if (links.classList.contains('show__menu')) {
                console.log('adsf1');
                links.classList.remove('show__menu');
            } else {
                console.log('adsf2');
                links.classList.add('show__menu');
            }
        });
        if (winWidth > 600) {
            j('.js__image__gallery, .image__overlay').on('click', function () {
                var gallery = document.querySelector('.js__image__gallery');
                j('.js__image__gallery, .image__overlay').fadeOut(300).end();
            });
            j('.image__gallery__cell').on('click', function () {
                var imgGall = document.querySelector('.js__image__gallery'),
                    smallUrl = this.getElementsByTagName('img')[0].getAttribute('src');
                imgGall.querySelector('.js__image__gallery__img').setAttribute('src', smallUrl);
                j('.js__image__gallery').fadeIn(300).end();
                j('.image__overlay').fadeTo(300, 0.7).end();
                if (this.getElementsByTagName('p').length > 0) {
                    document.querySelector('.js__image__gallery__para').textContent = this.getElementsByTagName('p')[0].textContent;
                }

            });
        }
    }, 1000);
});