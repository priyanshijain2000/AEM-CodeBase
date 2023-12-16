$.fn.onetrust = function() {
    var _onetrustLabel = $('label.ot-scrn-rdr');
    if(_onetrustLabel.length > 0) {
        _onetrustLabel.html("Search");
    }
}
$(window).on('load', function() {
    setTimeout(() => {
        $.fn.onetrust();
    }, 3000);
});