$.fn.headerSticky = function(target) {
    const _target = $('.'+target);
    $(window).on('scroll', function() {
        if(_target.innerHeight() < window.scrollY) {
            _target.addClass('sticky-header');
        } else {
            _target.removeClass('sticky-header');
        }
    });
};

$(window).on('load', function() {
    if(document.getElementsByClassName('header-lite')) {
        $.fn.headerSticky('header-lite');
    }
});