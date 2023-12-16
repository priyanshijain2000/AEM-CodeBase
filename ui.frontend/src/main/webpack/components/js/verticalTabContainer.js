function videoLoader() {
  const m = $(".vertical-tab-container--pane .video-container__video");
  for(let l = 0; l< m.length; l++){
     if(m[l].children[0].classList.value == 'kWidgetIframeContainer'){
            m[l].style.paddingTop = '3rem';
       }
   }
}

function tabControl() {
  var tabs = $('.tabbed-content').find('.tabs');
          tabs.find('a').on('click', function(event) {
          event.preventDefault();
          var target = $(this).attr('href'),
          tabs = $(this).parents('.tabs'),
          buttons = tabs.find('a'),
          item = tabs.parents('.tabbed-content').find('.item');
          buttons.removeClass('active');
          item.removeClass('active');
          item.css('display','none')
          $(this).css("display","block");
          $(this).addClass('active');
          $(target).addClass('active');
    });
   $('.item').on('click', function() {
       $(this).addClass("active-link");
       $(this).siblings().removeClass("active-link");
       if($(this).hasClass("active")){
           $(this).removeClass("active");
       }
       else{
           $(this).addClass("active");
           $(this).siblings().removeClass("active");
       }
    });
 }

$(window).on("load resize", function() {
    if (this.matchMedia("(max-width: 767.5px)").matches) {
        $(".vertical-tab-container--pane").addClass('opacity');
        $(".tabbed-content").find(".active").removeClass("active");
    }
    else {
        $(".vertical-tab-container--pane").removeClass('opacity');
          $('.vertical-tab-container .nav-link').on('click', function() {
              const naviId = $(this)[0].dataset.bsTarget;
              const navIdValue =  naviId.slice(1);
              $(".vertical-tab-container--pane").each(function() {
                  const verticalId = $(this)[0].id;
                  if (navIdValue == verticalId){ 
                    videoLoader();
                  }
                });
          })
    }
});

tabControl();
videoLoader();
var resizeTimer;
$(window).on('resize', function(e) {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    tabControl();
  }, 250);
});


