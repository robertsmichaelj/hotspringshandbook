/*jslint devel: true, nomen: true, sloppy: true, browser: true, regexp: true*/
/*global $*/
var url, springName, i, hotSprings, i, className, grid, springsData, len, imageCell, backgroundPosition, description, state, gridCell, backgroundImg, starsNum, cellData, featData, featuredSprings, name, indivData, nameArray, randomName, initialData, jsonData, data, menuBuild;

function transparentRate(rating, element) {
	$(element).find('.rating .ratingColor').css({right: (((rating / 100) * 80) - 80)});
	$(element).find('.rating').css({opacity: 1});
}
function colorRate(rating, element) {
	$(element).find('.ratingColor').css({right: rating / 100 * (80 * -1)});
	$(element).find('.rating').css({opacity: 1});
}
function mapRate(rating, element) {
	$('.ratingColor').css({left: rating / 100 * (80)});
	$('.rating').css({opacity: 1});
}

var searchHead = JSON.search(snapshot, "//menuItems['menuItemURL']");
console.log(searchHead);
footerText = sitedata.sitewide.footerText;
menuBuild = new Vue({
    el: "#headerLinks",
    data: {
        menuItems: searchHead
    },
    methods: {
        menu: function (index) {
            return (index);
        }
    }
});
//	//FOOTER
document.getElementById('footerText').innerHTML = footerText;
document.getElementById('footerText').getElementsByTagName('span')[0].innerHTML = new Date().getFullYear();


//EVENT LISTENERS
$(document).on('click', '#menuIcon', function (event) {
    console.log($('#headerLinks'));
//    $('#headerLinks').toggleClass('showMenu');
    if ($('#headerLinks').hasClass('showMenu')) {
        $('#headerLinks').removeClass('showMenu');
    } else {
        $('#headerLinks').addClass('showMenu');
    }
});
//PAGE EVENTS
$(document).on('click', '.pageOverlay', function () {
	$('.pageOverlay').fadeOut(300, function () {
		$('.pageOverlay').fadeTo(300, 0, function () {
			$('.pageOverlay').remove();
		});
	});
});