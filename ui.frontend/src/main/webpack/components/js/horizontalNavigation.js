$(window).on("load", function() {
    var stateInfo = sessionStorage.getItem("stateInfo");
    var currentPagePath = $("#h-nav").data('current-page-path');
    var dynamicRootPath = $("#h-nav").data('dynamic-path');
    if (stateInfo && currentPagePath) {
        var stateInfoDict = JSON.parse(stateInfo);
        const stateCode = dynamicRootPath +'/' + stateInfoDict['Code'];
        const selectEls = document.querySelectorAll('.horizontal-menu');
        Array.from(selectEls).forEach(selectContainer => {
            var firstAnchorElement = selectContainer.querySelectorAll('.cta-btn-bg-tab.dynamic-link')[0];
            if (firstAnchorElement) {
                firstAnchorElement.href = stateCode+".html";
                if (currentPagePath.includes(dynamicRootPath) && firstAnchorElement.classList.contains("cta-btn-bg-tab")) {
                    firstAnchorElement.classList.add("active");
                    $('.dynamic-menu').addClass("d-md-flex");
                }
            }
        });
        const mobileHorizontalMenu = document.querySelector('.mobile-horizontal-menu-dropdown');
        if (mobileHorizontalMenu) {
            const horizontalMenuContainer = document.querySelector('.horizontal-menu__content-container');
            var dropdownBackgroundURL = '';
            if (horizontalMenuContainer) {
                const headerImage = horizontalMenuContainer.querySelector('.header-image');
                if (headerImage) {
                    dropdownBackgroundURL = $(headerImage).data("background-image-path");
                }
            }
            $(mobileHorizontalMenu).css('background-image', 'url("' + dropdownBackgroundURL + '")');
            /*var firstListelement = mobileHorizontalMenu.querySelectorAll('li')[0];
            var firstListAnchorelement = $(firstListelement).find('a');
            firstListAnchorelement.href = stateRedirectURL;*/
        }
    }
    if ($(window).width() <= 768) {
        var element = document.querySelector(".mobile-horizontal-menu-dropdown");
        $(element).parent().removeClass("cmp-container--body");
        $(element).find("input").val($(element).find(".horizontal-menu-dropdown-item-active").text());
    }
    if ($(".horizontal-menu>.active")[0]) {
        if ($(window).width() <= 768) {
            var activeElement = $(".horizontal-menu>.active");
            var element = $(this);
            var parentElement = $(activeElement).parent(".horizontal-menu");
            $(activeElement).siblings().css("display", "none");
            $(activeElement).addClass("removeBorderRadius");
            $(activeElement).css("border-radius", 0);
            $(activeElement).css("border", 0);
            $(parentElement).css("padding", 0);
            var grandParent = $(parentElement).parent(".cmp-container--body");
            $(grandParent).removeClass("cmp-container--body");
            $(element).css("width", "100%");
        }
    }
    if ($(".horizontal-single-menu__content-container")[0]) {
        if ($(window).width() <= 768) {
            var activeElement = $(".horizontal-single-menu__content-container");
            $(activeElement).css("border-radius", "0");
            var grandParent = $(activeElement).parent(".cmp-container--body");
            $(grandParent).removeClass("cmp-container--body");
        }
    }
    if ($(".horizontal-menu__content-container")[0]) {
        if ($(window).width() <= 768) {
            var activeElement = $(".horizontal-menu__content-container");
            $(activeElement).css("border-radius", "0");
            var grandParent = $(activeElement).parent(".cmp-container--body");
            $(grandParent).removeClass("cmp-container--body");
        }
    }
});
$(".horizontal-menu-dropdown.dropdown-item").on("click", function() {
    var element = $(this);
    var parentElement = $(element).parent().parent(".dropdown-menu");
    $(parentElement).children().each(function() {
        $(this).find(".dropdown-item").removeClass("horizontal-menu-dropdown-item-active");
    });
    $(element).toggleClass("horizontal-menu-dropdown-item-active");
    $(parentElement).parent(".dropdown").find("input").val($(element).text());
});