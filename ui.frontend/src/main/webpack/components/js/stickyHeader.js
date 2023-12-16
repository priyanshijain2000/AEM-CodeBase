(function($) {
    'use strict';
    var defaults = {
        topOffset: 150, 
         hideDuration: 300, 
         stickyClass: 'sticky'
        };
         $.fn.stickyPanel = function(options) {
            if (this.length == 0) return this; 
             var self = $(this);
             var settings;
              var isFixed = false; 
              var stickyClass;
              var animation = {
                normal: self.css('animationDuration'),
                 reverse: '', 
                  getStyle: function(type) {
                     return {
                        animationDirection: type,
                        animationDuration: this[type]
                    };
                }
             };

function onScroll() {
    if (window.pageYOffset > settings.topOffset) {
        if (!isFixed) {
            const targetElement = document.getElementsByClassName('headerSearch');
            if(!targetElement   || !targetElement[0].classList.contains('show')){
            isFixed = true;
            self.addClass(stickyClass)
            .css(animation.getStyle('normal'));
        }
            }
        } else {
            if (isFixed) {
                isFixed = false;
                self.removeClass(stickyClass)
                .each(function(index, e) {
                     void e.offsetWidth;
                    })
                    .addClass(stickyClass)
                    .css(animation.getStyle('reverse'));
                    setTimeout(function() {
                        self.removeClass(stickyClass);
                    }, settings.hideDuration);
                }
            }
        }

function init() {
    settings = $.extend({}, defaults, options);
    animation.reverse = settings.hideDuration + 'ms';
    stickyClass = settings.stickyClass;
    $(window).on('scroll', onScroll).trigger('scroll');
    setTimeout(() => {
        var  _getHeaderHeight = $('.headerSection>.cmp-container').innerHeight();
        $('.headerSection').css('min-height', _getHeaderHeight);
    }, 500);
    
    

}
init();
return this;
}
})(jQuery);

$(function() {
    $('.headerSection>.cmp-container').stickyPanel();
});

window.addEventListener('DOMContentLoaded', function() {
    if(window.location.hash){
        var headerHeight = document.querySelector('.mainheader').offsetHeight;
        hash = $(window.location.hash);
        if(hash.length) {
            setTimeout(function() {
                $("html, body").animate({ scrollTop: hash.offset().top - headerHeight });
            },1500);
        }
    }
});
