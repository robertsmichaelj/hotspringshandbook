//  SET HEADER TEXT
headerTop = sitedata.index.headerText;
headerBottom = sitedata.index.headerSpanText;
homeURL = sitedata.index.headerLink;
headerTopSet = new Vue({
    el: "#headerLink",
    data: {
        headerTop: headerTop,
        headerBottom: headerBottom,
        url: homeURL
    }
});

//EMAIL SUBMIT SCRIPT
$('#contactFormButton').click(function (e) {
	e.preventDefault();
	var name = $("#contactForm input[name='name']").val(),
		email = $("#contactForm input[name='email']").val(),
		message = $("#contactForm textarea").val();
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
            $('#contactForm').fadeOut(300, function () {
                $('.contactStatus').fadeIn();
            });
        },
        error: function (e) {
            console.log(e);
            $('.contactError').fadeIn();
        }
    });
});