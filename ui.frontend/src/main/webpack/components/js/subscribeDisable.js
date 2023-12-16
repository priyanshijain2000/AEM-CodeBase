document.addEventListener("DOMContentLoaded", function(event) {
	if($(".socialLinksIconsContainer").is('[data-disable-subscribe="true"]')){
	    $(".subscribe_link").addClass("d-none");
	}
	$('a[target="_blank"]').attr('rel', 'noopener noreferrer');
});

$('.cmp-teaser--resource .cmp-teaser__content .cmp-teaser__description').on('click', "a", function() {
    var hrefValue = $(this).attr('href').split('.');
    if (hrefValue.length > 1) {
        if (hrefValue[1] == 'pdf') {
            $(this).attr('target', '_blank');
        }
    }
})
