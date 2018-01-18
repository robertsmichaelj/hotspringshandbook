/*jslint devel: true, nomen: true, sloppy: true, browser: true, regexp: true*/
/*global $*/
var i, className;
var index, featured, featuredCondensedName, featuredHeaderText, homeURL, headerBottom, headerTop, featuredData, featuredState, featuredMobileBackPos, featuredSection, mostPopular, highestRated, headerTopSet, mostPopularHeader, mostPopularHeaderSet, highestRatedHeader, highestRatedHeaderSet, fullListHeaderSet, activites, begin, all, subHeader, fullList, type,
    pageType = $('#body').attr('class');
if (pageType === "mainIndex") {
    begin = sitedata.index;
    featured = sitedata.index.featured;
    featuredHeaderText = featured.featuredHeader;
    featuredCondensedName = featured.featuredCondensedName;
    activityData(featuredCondensedName);
    featuredState = activity[0].state;
    featuredMobileBackPos = activity[0].images.mobileBackPos;
    type = activity[0].type;
} else if (pageType === "fullList") {
    begin = sitedata.index;
    all = sitedata;
    activites = JSON.search(snapshot, "//*[name]");
    subHeader = all.fullListAndMap.fullListHeader;
}
headerTop = begin.headerText;
headerBottom = begin.headerSpanText;
homeURL = begin.headerLink;
mostPopularHeader = begin.sectionHeaders.mostPopHeader;
highestRatedHeader = begin.sectionHeaders.highRateHeader;
//	SET TOP HEADER TEXT
headerTopSet = new Vue({
    el: "#headerLink",
    data: {
        headerTop: headerTop,
        headerBottom: headerBottom,
        url: homeURL
    }
});

if (pageType === "mainIndex") {
//	SET FEATURED TEXT
    featuredSection = new Vue({
        el: "#featured",
        data: {
            header: featuredHeaderText,
            name: activity[0].name,
            nearbyTown: activity[0].nearestTown,
            shortDescription: activity[0].description,
            url: "/individual.html?" + activity[0].condensedName,
            backgroundImg: "activities/" + type + "/" + activity[0].condensedName + "/header/header.jpg"
//            backgroundPos: featuredMobileBackPos
        }
    });
    colorRate(activity[0].rating, '#featured');
//  SET MOST POPULAR HEADER
    mostPopularHeaderSet = new Vue({
        el: "#mostPopularHeader",
        data: {
            headerTop: mostPopularHeader
        }
    });
//  CREATE MOST POPULAR
    var mostPop = JSON.search(snapshot, "//*[contains(popular, 'true')]");
    mostPopular = new Vue({
        el: "#mostPopular",
        data: {
            numOfPop: mostPop
        },
        methods: {
            pop: function (index) {
                return (index);
            }
        }
    });
//  SET HIGHEST RATED HEADER
    highestRatedHeaderSet = new Vue({
        el: "#highestRatedHeader",
        data: {
            headerTop: highestRatedHeader
        }
    });
//  CREATE HIGHEST RATED
    var highRate = JSON.search(snapshot, "//*[rating >= 65]");
    highestRated = new Vue({
        el: "#highestRated",
        data: {
            numOfRate: highRate
        },
        methods: {
            rate: function (index) {
                return (index);
            }
        }
    });
    //SORT POPULAR GRID ITEMS RANDOMLY
    var gridSortPopular = document.querySelector('.mostPopular');
    for (i = gridSortPopular.children.length; i >= 0; i--) {
        gridSortPopular.appendChild(gridSortPopular.children[Math.random() * i | 0]);
    }
    //SORT HIGHEST RATED WITH HIGHEST AT TOP
    var gridSortRated = $('#highestRated');
    gridSortRated.find('.gridCell').sort(function (a, b) {
        return +b.dataset.rating - +a.dataset.rating;
    }).appendTo(gridSortRated);
} else if (pageType === "fullList") {
//  SET FULL LIST HEADER
    fullListHeaderSet = new Vue({
        el: "#listSubHeader",
        data: {
            headerTop: subHeader
        }
    });
    //  CREATE MOST POPULAR
    fullList = new Vue({
        el: "#fullList",
        data: {
            numOfActivites: activites
        },
        methods: {
            pop: function (index) {
                return (index);
            }
        }
    });
}
//GET RATINGS AND SLIDE YELLOW DIV TO CREATE STARS IN CELLS
$('.gridCell').each(function (i) {
    $(this).find('.ratingColor').animate({right: $(this).data('rating') / 100 * (80 * -1)});
    $(this).find('.rating').css({opacity: 1});
});