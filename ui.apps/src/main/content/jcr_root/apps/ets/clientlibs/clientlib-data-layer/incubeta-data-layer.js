var dataLayer = window.dataLayer || [];
var adobeDataLayer = window.adobeDataLayer || [];

//User type
$('.data-layer-user-type a').on('click', function(){	
	let userType = $(this).data("userType");
	dataLayer.push( {
		"event" : "select_user_type",
		"user_type" : userType
	});
	adobeDataLayer.push({
		"event" : "select_user_type",
		"GAData": {
			"select_user_type": {
				"user_type": userType
			}
		}
	});
});

//Sign In
$('.data-layer-sign-in a.cmp-button').on('click', function(){	
	let brand = $(this).parent('.ctabutton').parent('.main-product__inner').children('.heading5').text();
	dataLayer.push( {
		"event" : "sign_in_click",
		"brand" : brand
	});
});

//Schedule test click
$('a[href*="schedule.html"]').on('click', function(){
	let brand = $(".ets-brand").data("brand");
	let location = "CMP Navigation Link";
	if($(this).parents(".mainheader").length){
		location = "Menu";
	}
	dataLayer.push({
		"event" : "schedule_your_test_click",
		"brand" : brand,
		"location_on_page" : location
	});
});

//Register
$('.data-layer-register a').on('click', function() {
	const brand = $(".ets-brand").data("brand");
	window.dataLayer.push({
		"event": "register",
		"brand": brand,
		"custom_timestamp": Date.now()
	});
	adobeDataLayer.push({
		"event": "register",
		"GAData": {
			"register": {
				"brand": brand
			}
		}
	});
});
