const tofelModernizationDialog = document.getElementById('toeflModernizationDailog');
const _getMT = $(tofelModernizationDialog).data('mt');
const _isSessionEnabled = $(tofelModernizationDialog).data("session");
$(window).on('load', function () {
    var OptanonAlertBoxClosed = document.cookie.search('OptanonAlertBoxClosed');
    var getModernizationDialog = sessionStorage.getItem(_getMT+"ModernizationDialogDisabled");
    if (OptanonAlertBoxClosed !== -1) {
        if (tofelModernizationDialog && $(tofelModernizationDialog).data("isenabled") && !getModernizationDialog) {
            tofelModernizationDialog.showModal();
            $('.root').addClass("dailog-light-box");
            $('.model-close-button').blur();
        }
    }
});
$(".model-close-button").on("click", function () {
    tofelModernizationDialog.close();
    $('.root').removeClass("dailog-light-box");
    if(_isSessionEnabled) {
        sessionStorage.setItem(_getMT+"ModernizationDialogDisabled", true);
    }
});
$(".model-close-button").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        tofelModernizationDialog.close();
        $('.root').removeClass("dailog-light-box");
        if(_isSessionEnabled) {
            sessionStorage.setItem(_getMT+"ModernizationDialogDisabled", true);
        }
    }
});
$(document).keydown(function(event){
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 27 && tofelModernizationDialog) {
        if(tofelModernizationDialog.open) {
            tofelModernizationDialog.close();
        }
        if(_isSessionEnabled) {
            sessionStorage.setItem(_getMT+"ModernizationDialogDisabled", true);
        }
        $('.root').removeClass('dailog-light-box');
    }
});


// Copy Text Fn
$(".copy-button").on("click", function () {
    $.fn.copyDataToClipBoard($(this).data('copytarget'));
});
$(".copy-button").keypress(function (event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        $.fn.copyDataToClipBoard($(this).data('copytarget'));
    }
});
$.fn.copyDataToClipBoard = function (e) {
    var copyText = document.getElementById(e);
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
}
