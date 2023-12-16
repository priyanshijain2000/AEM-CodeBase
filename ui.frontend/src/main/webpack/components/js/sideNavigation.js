$(".side-menu.dropdown-item").on("click", function () {
    const element = $(this);
    $(element).parents(".dropdown").find("input").val($(element).text());
});
$("#SideNavigationMenu").on("show.bs.dropdown", function () {
    $(this).find("i").toggleClass("dropdown-downarrow");
    $(this).find("i").toggleClass("dropdown-uparrow");
});

$("#SideNavigationMenu").on("hide.bs.dropdown", function () {
    $(this).find("i").toggleClass("dropdown-downarrow");
    $(this).find("i").toggleClass("dropdown-uparrow");
});
$(window).on("load", function () {
    var element = $("#SideNavigationMenu");
    $(element).find("input").val($(element).parents(".dropdown").find(".side-menu-item-active").text());
});