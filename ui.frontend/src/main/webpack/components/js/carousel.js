function postionArrow() {
	var _vW = $(window).width();
	if (_vW < 1025) {
		setTimeout(function() {
			$(".carousel-v2 .cmp-carousel__item.cmp-carousel__item--active .videoText").each(function() {
				var _finalHeight = $(this).height() + 30;
				$(this).parents(".cmp-carousel").children(".cmp-carousel__actions").css("top", _finalHeight);
			});
			$(".carousel-v2 .cmp-carousel__item--active .carousel-img").each(function() {
				var _finalHeight = $(this).height() + 30;
				$(this).parents(".cmp-carousel").children(".cmp-carousel__actions").css("top", _finalHeight);
			});
			$(".carousel-v2 .cmp-carousel__item--active .cmp-articlebanner .cmp-image__image").each(function() {
				var _finalHeight = $(this).height() + 30;
				$(this).parents(".cmp-carousel").children(".cmp-carousel__actions").css("top", _finalHeight);
			});
		}, 100);
	}
	else {
		$(".cmp-carousel__actions").removeAttr("style");
	}
}

$(window).resize(function() {
	postionArrow();
});

$(".cmp-carousel__actions").ready(setTimeout(function() {
	var carouselActionObjects = $(".cmp-carousel__actions");
	carouselActionObjects.each(function() {
		var prevButton = $(this).children(".cmp-carousel__action--previous");
		var nxtButton = $(this).children(".cmp-carousel__action--next");
		var carouselContainerElement = $(this).next();
		var firstItem = carouselContainerElement.children(".cmp-carousel__item").first();
		var lastItem = carouselContainerElement.children(".cmp-carousel__item").last();
		var firstBanner = firstItem.children();
		var bannerVariant = firstBanner.attr('class').split(' ')[0];
		$(this).addClass(bannerVariant + "-actions");
		prevButton.prop("disabled", false);
		nxtButton.prop("disabled", false);
		if (firstItem.hasClass('cmp-carousel__item--active')) {
			prevButton.prop("disabled", true);
		} else if (lastItem.hasClass('cmp-carousel__item--active')) {
			nxtButton.prop("disabled", true);
		}
	});
	postionArrow();
}, 300));

$(".cmp-carousel__action").click(function() {
	postionArrow();
	var actionButtonsDiv = $(this).parent();
	var previousButton = actionButtonsDiv.children(".cmp-carousel__action--previous");
	var nextButton = actionButtonsDiv.children(".cmp-carousel__action--next");
	var carouselContainerElement = actionButtonsDiv.next();
	setTimeout(function() {
		var firstItem = carouselContainerElement.children(".cmp-carousel__item").first();
		var lastItem = carouselContainerElement.children(".cmp-carousel__item").last();
		previousButton.prop("disabled", false);
		nextButton.prop("disabled", false);
		if (firstItem.hasClass('cmp-carousel__item--active')) {
			previousButton.prop("disabled", true);
		} else if (lastItem.hasClass('cmp-carousel__item--active')) {
			nextButton.prop("disabled", true);
		}
	}, 300);
});