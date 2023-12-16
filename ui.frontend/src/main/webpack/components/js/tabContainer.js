$(".tab-container a").on("click", function() {
    var element = $(this);
    var parentElement = $(element).parent(".tab-container");
    $(parentElement)
        .children()
        .each(function() {
            var currentTabElement = $(this);
            $(currentTabElement).removeClass("active");
            if ($(window).width() <= 768) {
                $(currentTabElement).css("display", "none");
            }
        });
    $(element).toggleClass("active");
    if ($(window).width() <= 768) {
        $(element).css("display", "flex");
        $(element).addClass("removeBorderRadius");
        var grandParent = $(parentElement).parent(".ComponentContent");
        $(grandParent).removeClass("ComponentContent");
        $(element).css("width", "100%");
    }

    var containerElement = $(parentElement).parent().parent(".tab-component");
    var tabContentContainer = $(containerElement).find(".tab-content-container");
    if ($(window).width() <= 768) {
        $(tabContentContainer).addClass("ComponentContent");
    }
    $(tabContentContainer)
        .children()
        .each(function() {
            var currentTabItemElement = $(this);
            $(currentTabItemElement).css("display", "none");
        });
    var elementId = $(element).attr("id");
    $(tabContentContainer)
        .find("#" + elementId)
        .css("display", "block");
});
$(function() {
    if ($(".tab-container>.active")[0]) {
        if ($(window).width() <= 768) {
            var activeElement = $(".tab-container>.active");
            var element = $(this);
            var parentElement = $(activeElement).parent(".tab-container");
            $(activeElement).siblings().css("display", "none");
            $(activeElement).addClass("removeBorderRadius");
            var grandParent = $(parentElement).parent(".ComponentContent");
            $(grandParent).removeClass("ComponentContent");
            $(element).css("width", "100%");
            var containerElement = $(parentElement).parent().parent(".tab-component");
            var tabContentContainer = $(containerElement).find(
                ".tab-content-container"
            );
            if ($(window).width() <= 768) {
                $(tabContentContainer).addClass("ComponentContent");
            }
        }
    }
    //selected test url append


});
$(window).on("load", function() {
    if ($(window).width() <= 768) {
        var element = document.querySelector(".mobile-tab-dropdown");
        var containerElement = $(element).parent(".ComponentContent");
        var tabContentContainer = $(containerElement).find(
            ".tab-content-container"
        );
        $(tabContentContainer)
            .children()
            .each(function() {
                var currentTabItemElement = $(this);
                $(currentTabItemElement).css("display", "none");
            });
        var childElement = $(element).find(".tab-dropdown-item-active");
        var elementId = $(childElement).attr("id");
        $(tabContentContainer)
            .find("#" + elementId)
            .css("display", "block");
        $(tabContentContainer)
            .removeClass("ComponentContent");
        $(tabContentContainer)
            .find("#" + elementId).find(".tab-item-content-container").toggleClass("ComponentContent");
        $(element).parent().removeClass("ComponentContent");
        $(element).find("input").val($(element).find(".tab-dropdown-item-active").text());
    }
});
$(".tab-dropdown.dropdown-item").on("click", function() {
    var element = $(this);
    var parentElement = $(element).parent().parent(".dropdown-menu");
    $(parentElement).children().each(function() {
        $(this).find(".dropdown-item").removeClass("tab-dropdown-item-active");
    });
    $(element).toggleClass("tab-dropdown-item-active");
    $(parentElement).parent(".dropdown").find("input").val($(element).text());
    var containerElement = $(parentElement).parent(".dropdown").parent(".mobile-tab-dropdown").parent("");
    var tabContentContainer = $(containerElement).find(
        ".tab-content-container"
    );
    $(tabContentContainer)
        .children()
        .each(function() {
            var currentTabItemElement = $(this);
            $(currentTabItemElement).css("display", "none");
        });
    var elementId = $(element).attr("id");
    $(tabContentContainer)
        .find("#" + elementId)
        .css("display", "block");
    $(tabContentContainer)
        .removeClass("ComponentContent");
    $(tabContentContainer)
        .find("#" + elementId).find(".tab-item-content-container").toggleClass("ComponentContent");
});

$(window).on("load resize", function() {
    if (this.matchMedia("(max-width: 767px)").matches) {
        $(".cmp-tabs__tabpanel").removeAttr("aria-hidden");
    }
});