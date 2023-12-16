$(function() {
    if(sessionStorage.getItem("researchSearched")=="true"){
    	$('.go-back-breadcrumb').addClass('d-none');
    }
    else{
    	$('.go-back').addClass('d-none');
    }
});