const $dropdown = $(".mega-nav-bg .dropdown");
const $dropdownToggle = $(".mega-nav-bg .dropdown-toggle");
const $dropdownMenu = $(".mega-nav-bg .dropdown-menu");
const showClass = "show";

$(window).on("load resize", function() {
    if (this.matchMedia("(min-width: 1200px)").matches) {
        $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
        );
        $("#megaMenu .dropdown:not(.lang-dropdown)").on(
            "show.bs.dropdown",
            function() {
                $("#megaMenu .dropdown:not(.mobileonly)").show();
                $(this).addClass("active").show();
            }
        );
    } else {
        $dropdown.off("mouseenter mouseleave");
        $("#megaMenu .dropdown:not(.lang-dropdown)").on(
            "show.bs.dropdown",
            function() {
                $("#megaMenu .dropdown").hide();
                $(this).addClass("active").show();
            }
        );

        $("#megaMenu .dropdown:not(.lang-dropdown)").on(
            "hide.bs.dropdown",
            function() {
                $(this).removeClass("active").hide();
                $("#megaMenu .dropdown").show();
            }
        );
    }
});
$(".navbar-toggler").on("click", function() {
    $("#megaMenu").parent("nav.navbar").toggleClass("main-nav");
    $("html").css("overflow", "hidden");
    $("body").css("overflow", "hidden");
});
$(".close-nav").on("click", function() {
    $("#megaMenu").parent("nav.navbar").removeClass("main-nav");
    $("html").css("overflow", "auto");
    $("body").css("overflow", "auto");
});

$('.alertmsgClose').click(function () {
    $('#alertBox').addClass('d-none');
    sessionStorage.setItem('alertclosed', 'true');
});


$(".alert-close-image").on("click", function() {
    var element = $(this);
    var parentElement = $(element).parent();
    $(parentElement).parent(".alert-dialog-container").css("display", "none");
});
$("#MenuButton").on("click", function() {
    var element = document.querySelector(".mobile-overlay");
    $(element).toggleClass("active");
});
$(".menu-close-button").on("click", function() {
    var element = document.querySelector(".menu-slide");
    $(element).toggleClass("active");
});

function setCookie(name, value, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    var cookiestring = name + "=" + value + ";path=/" + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    console.log(cookiestring);
    document.cookie = name.toString().concat('=', value, ';');
}

function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
        begin = dc.indexOf(prefix);
        if (begin != 0) return null;
    } else {
        begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
        end = dc.length;
    }
    return decodeURI(dc.substring(begin + prefix.length, end));
}
$(".language-dropdown  .dropdown-item").on("click", function() {
    var element = $(this);
    var parentElement = $(element).parents(".dropdown-menu");
    var previousSelectedElement = parentElement[0].querySelector(".item-selected");
    $(previousSelectedElement).removeClass('item-selected');
    var parentElement = $(element).parents(".dropdown-menu");
    var langeDropdownElement = $(element).parents(".language-dropdown");
    var textElement = langeDropdownElement[0].querySelector(".header-store-title");
    textElement.innerText = element[0].innerText;
    setCookie("selectedLanguage", element[0].innerText, 0);
    $(element).toggleClass('item-selected');
});
$(".en-lang").on("click", function() {
    var englishLink = $(this).data('full-link');
    window.open(englishLink, "_self");
});
$(window).on("load", function() {
    var currentDomainName = window.location.hostname;
    /*if (hostName) {
        var hostNameList = hostName.split('.');
        if (hostNameList[0]) {
            currentDomainName = hostNameList[0];
        }
    }*/
    var languageElements = document.querySelectorAll('.language-dropdown');
    Array.from(languageElements).forEach(languageElement => {
        var languageTitleElement = languageElement.querySelector('.header-store-title');
        var languageMenuElement = languageElement.querySelectorAll('li');
        Array.from(languageMenuElement).forEach(languageMenu => {
            var languagelink = languageMenu.querySelector('.dropdown-item');
            $(languagelink).removeClass('item-selected');
            var dataPath = $(languagelink).data('language-url');
            var languageDomain = '';
            if (dataPath) {
                var dataPathList = dataPath.split('//');
                languageDomain = dataPathList[1];
                /*if (dataPathList[1]) {
                    var dataPathUrlList = dataPathList[1].split('.');
                    if (dataPathUrlList[0]) {
                        languageDomain = dataPathUrlList[0];
                    }
                }*/
            }
            if (currentDomainName == languageDomain) {
                $(languagelink).toggleClass('item-selected');
                languageTitleElement.innerHTML = languagelink.innerText;
                languageTitleElement.setAttribute("aria-label", "Selected Page Language is " + languagelink.innerText);
            }
        });
    });
    $.fn.loadHeaderAccess();
    if(sessionStorage.getItem('alertclosed') !== 'true' && $('#alertBox')) {
        $('#alertBox').removeClass('d-none');
    }
});
$('.topnav-list').on('click', '.nav-item', function() {
    sessionStorage.removeItem("siteCode");
    sessionStorage.removeItem("distance");
    sessionStorage.removeItem("examId");
    sessionStorage.removeItem("metric");
    sessionStorage.removeItem("locationInfo");
    sessionStorage.removeItem("stateInfo");
});

function onButtonKeyDown() {
    switch (window.event.key) {
        case 'ArrowUp':
        case 'ArrowLeft':
            window.event.preventDefault();
            if (this.currentIndex > -1) {
                var prevIndex = Math.max(0, this.currentIndex - 1);
                $(this.topLevelNodes[prevIndex].querySelector('button')).focus();
            }
            break;
        case 'ArrowDown':
        case 'ArrowRight':
            window.event.preventDefault();
            if (this.currentIndex > -1) {
                var nextIndex = Math.min(this.topLevelNodes.length - 1, this.currentIndex + 1);
                $(this.topLevelNodes[nextIndex].querySelector('button')).focus();
            }
            break;
        case 'Home':
            window.event.preventDefault();
            $(this.topLevelNodes[0].querySelector('button')).focus();
            break;
        case 'End':
            window.event.preventDefault();
            $(this.topLevelNodes[this.topLevelNodes.length - 1].querySelector('button')).focus();
            break;
    }
}
$.fn.loadHeaderAccess = function() {
    var topLevelNodes = [
        ...document.querySelectorAll(
            '.nav-item.dropdown:not(.mobileonly)'
        ),
    ];
    topLevelNodes.forEach((node, index) => {
        var currentIndex = index;
        node.addEventListener('keydown', onButtonKeyDown.bind({ topLevelNodes, currentIndex }));
    });
}

$('.searchHeaderIcon').on('click',function scrollToTop(){
    window.scrollTo({
        top:0,
        behavior:'smooth'
    });
})
$('#nav-box').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        window.scrollTo({
            top:0,
            behavior:'smooth'
        });
    }
});





