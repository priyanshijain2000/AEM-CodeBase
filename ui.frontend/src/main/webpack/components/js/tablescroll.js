$.fn.tableScroll = function() {
    var _tableTag = $('table');
    var tableBrTag=$("table br");
    if(_tableTag.length > 0) {
        // _tableTag.attr('tabindex', 0);
        // _tableTag.attr('role', 'presentation');
        _tableTag.wrap( "<div class='table-scroll-enable'></div>" );
    }
    if(tableBrTag.length>0){
        $("table").each((i,element) => {
            element.querySelectorAll("br").forEach(el => {
                el.setAttribute("aria-hidden",true);
            });            
        });
    }
}
$(window).on('load', function() {
    $.fn.tableScroll();
});