const favDialog = document.getElementById('nav-search');
function resetClass(box, c = "") {
    for(var i = 0; i < box.length; i++) {
        box[i].className = c;
    }
}
function timeOut(box, time, animate) {
    setTimeout(() => {
        box.className = "animated searchHeaderIcon " + animate;
    }, time);
}
function searchAnimationOpen() {
    $('.root').addClass("bghide");
    $('.headerSearch').addClass("show");
    $('.navsearchHeader').addClass("cmp-container--default");
    
    const box = document.getElementById("nav-box");
    const search = document.getElementById("nav-search");        
    var boxList = box.children;
    boxList = Object.assign([], boxList).reverse();
	var elementHeight=document.querySelector('.header-container').getBoundingClientRect().top;
    search.style.top=elementHeight+'px';
    for(var i = 1; i < boxList.length + 1; i++) {
        var e = i - 1;
        timeOut(boxList[e], 50 * e, "zoomOut fast");

        if(e + 1 === boxList.length) {
            setTimeout(() => {
                box.className = "hidden";
                search.className = "animated fadeInRight";
                resetClass(boxList, "transparent");
                $("#searchhome").focus();
            }, 50 * (e + 1));
        }
    }
    setTimeout(() => {
        $("#searchhome").focus();
    }, 0);
}
$('.searchHeaderIcon').click(function(){
	favDialog.showModal();
    searchAnimationOpen();
});
$('#nav-box').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
		favDialog.showModal();
        searchAnimationOpen();
    }
});
$("#searchhome").keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
       
        var inputElement = $(this);
        var searchText = $(inputElement).val();
        if (searchText && searchText != '') {
            var resultUrl = $('#gssResultPageUrl').data('gss-result-page-url');
            window.location.href = resultUrl + '?text=' + searchText;
        }
    }

});
$(".searchHeaderIcon").on('click', function() {
    var searchText = $("#searchhome").val();
    if (searchText && searchText != '') {
        var resultUrl = $('#gssResultPageUrl').data('gss-result-page-url');
        window.location.href = resultUrl + '?text=' + searchText;
    }
});

 function searchAnimationClose(){
    $('.headerSearch').removeClass("show");
    $('.root').removeClass("bghide");
    $('.navsearchHeader').removeClass("cmp-container--default");
    const box = document.getElementById("nav-box");
    const search = document.getElementById("nav-search");
    var boxList = box.children;
    search.className = "animated fadeOut fast";
    search.className = "hidden";
    box.className = "";
    for(var i = 1; i < boxList.length + 1; i++) {
        var e = i - 1;
        timeOut(boxList[e], 100 * (e + 1), "zoomIn");
    }
}
$(".headerClose").click(function() {
	favDialog.close();
    searchAnimationClose();
});

$(".headerClose").keypress(function(event) {
     var keycode = (event.keyCode ? event.keyCode : event.which);
     if (keycode == '13') {
		 favDialog.close();
        searchAnimationClose();
     }
 });



 $(document).on('keydown', function (e) {
    if (e.keyCode == 27 && $('.navsearchHeader dialog.animated').length>0) {
		favDialog.close();
        searchAnimationClose();
    }
});

