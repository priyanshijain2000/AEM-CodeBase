var emailSearched = false;
$(document).ready(function () {
    $(".subscribe_link").click(function (e) {
        e.preventDefault();
        $("#subscribeSearch").slideToggle("slow");
        $("#subscribe-email").val("");
        $(".socialLinksIcons:not(.subscribe_link)").toggleClass("opacity-50");

    });
    // $("#subscribeSearch").fadeIn(1500).css("display", "block").fadeOut(500);

});

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    var email = $(".subscribe_input").val();
    if (!re.test(email)) {

        $(".error-message").css({
            "color": "#A80005",
            " align-items": "start"
        });
        $(".subscribe_input").css({
            "border-color": "#A80005",
            "color": "#A80005",
            "background": "#F4DCDD"
        });
        return false;
    } else {
        $(".subscribe_input").css({
            "border-color": "#ffffff",
            "color": "#ffffff",
            "background": "transparent"
        });

    }
    return re.test(email);
}

$(function () {
    //press enter on text area..
    $('#subscribe-email').on('keypress',
        function (e) {
            var key = e.which;

            if (key == 13) // the enter key code
            {
                $('#submit-button').click();
                return false;
            }
            //     $(".subscribe_input").removeClass("errorplaceholder");
            //  $(".subscribe_input").removeClass("error_icon");
            var $email = $("#subscribe-email").val();
            if (emailSearched) {
                if (validateEmail($email)) {
                    //alert("Valid email!");
                    // $("#form_subscribe").hide();
                    $('.error_icon').hide();
                    $(".error-message").html(" ");
                    $(".subscribe_input").removeClass("errorplaceholder");
                } else {
                    //alert("Invalid email!");
                    $('.error_icon').show();
                    $(".error-message").html("E-mail address is not valid.");
                    $(".subscribe_input").addClass("errorplaceholder");

                }
            }


        });

});




// $(".subscribe_input" ).keypress(function(){
//     $(".subscribe_input").removeClass("errorplaceholder");
//      $(".subscribe_input").removeClass("error_icon");
// }
// );



$("#submit-button").click(function (e) {
    var $email = $("#subscribe-email").val();
    emailSearched = true;
    if (validateEmail($email)) {
        //alert("Valid email!");
        $("#form_subscribe").hide();
        $('.error_icon').hide();
        $(".message-content").removeClass("d-none");

    } else {
        //alert("Invalid email!");
        $('.error_icon').show();
        $(".error-message").removeClass("d-none");
        $(".subscribe_input").addClass("errorplaceholder");

    }

    // $(".message-content").fadeIn(1500).css("display", "block").delay(2000).fadeOut(500);
    e.preventDefault();
});



// $('a').click(function (e) {
//     e.preventDefault();
// });