$(window).on("load resize", function () {
    if (this.matchMedia("(max-width: 767px)").matches) {
        if ($(".cmp-secnavigation").length > 0 && $(".cmp-secnavigation").length != undefined) {
            $(".cmp-breadcrumb__list.desktop").addClass( "d-none" );
            $(".cmp-breadcrumb__list.go-back").removeClass( "d-none" );
        }
    }
});