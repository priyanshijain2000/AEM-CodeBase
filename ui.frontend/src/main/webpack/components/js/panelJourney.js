function scaleAnimation() {
    const inViewport = (entries) => {
        entries.forEach((entry) => {
            entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
        });
    };
    const Obs = new IntersectionObserver(inViewport);
    const obsOptions = {};
    // Attach observer to every [data-inviewport] element:
    const ELsinViewport = document.querySelectorAll("[data-inviewport]");
    ELsinViewport.forEach((EL) => {
        Obs.observe(EL, obsOptions);
    });
};

function mainProductCardsResize() {
    $(".main-product__container").hover(function(){
        $(this).removeAttr("data-inviewport","scale-in");
    });
}

function scrollTopPosition() {
    $('html, body').animate({
        scrollTop: $('body').offset().top
    }, 'slow');
}

function panelNavigation() {
	var adobeDataLayer = window.adobeDataLayer || [];
    $(".panelJourney").on("click keypress",function() {
        // $("#panels").addClass("p-b70x40");
        var urls = $(this).attr('data-panel-path');
        // console.log(urls);
        $.ajax({
            url: urls,
            success: function(result) {
                $("#panels").html(result);
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("body").offset().top
                }, 1000);
            },
            complete: function() { panelNavigation(); }
        });
    });
    $('.data-layer-panel-user-type a.panelJourney').on('click', function(){	
		const userType = $(this).data("userType");
		window.dataLayer.push( {
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
    $('.spaContainer .data-layer-register a').on('click', function(){
		const brand = $(".ets-brand").data("brand");
		window.dataLayer.push({
		    "event" : "register",
		    "brand" : brand,
		    "custom_timestamp" : Date.now()
		});
		adobeDataLayer.push({
			"event" : "register",
			"GAData": {
				"register": {
					"brand": brand
				}
			}
		});
	});
	$('.spaContainer a.etsALLearnMoreTrigger').on('click', function(){
		const brand = $(".ets-brand").data("brand");
		const ariaLabelValue = $(this).attr("aria-label");
		window.dataLayer.push({
            "event": "learn_more_click",
            "topic_name": "Learn More - "+ariaLabelValue,
            "brand": brand,
            "custom_timestamp": Date.now()
        });
		adobeDataLayer.push({
			"event": "learn_more_click",
			"GAData": {
				"learn_more_click": {
					"brand": brand,
					"topic_name": "Learn More - "+ariaLabelValue
				}
			}
		});
	});
    scaleAnimation();
    mainProductCardsResize();
}

var initialPath = $("#panels").attr("data-initial-path");
if(initialPath){
	$.ajax({
	    url: initialPath,
	    success: function(result) {
	        $("#panels").html(result);
	    },
	    complete: function() { panelNavigation(); }
	});
}

$(window).on('load', function() {
    mainProductCardsResize();
});
