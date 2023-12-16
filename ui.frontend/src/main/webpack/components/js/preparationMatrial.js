// const pmurlstring = window.location.href;
// const pmpathurl = new URL(pmurlstring);
// var errorCountPM = 1;

// function scaleAnimation() {
//     const inViewport = (entries) => {
//         entries.forEach((entry) => {
//             entry.target.classList.toggle("is-inViewport", entry.isIntersecting);
//         });
//     };
//     const Obs = new IntersectionObserver(inViewport);
//     const obsOptions = {};
//     const ELsinViewport = document.querySelectorAll("[data-inviewport]");
//     ELsinViewport.forEach((EL) => {
//         Obs.observe(EL, obsOptions);
//     });
// };
// function pmSetParam(paramName,paramValue) {
//     var queryParams = new URLSearchParams(window.location.search);
//     queryParams.set(paramName, paramValue);
//     window.history.replaceState({}, document.title, "?" + queryParams.toString());
// }

// function scrolltoErrorId(e) {

//      setTimeout(function() { 
//         $('html, body').animate({
//         	scrollTop: $('.error'+e).offset().top - 100
//     	}, 1500);
//     }, 2500);

// }

// function callAjaxPMFn(url, target, value) {
//     $.ajax({
//         url: url,
//         success: function (result) {
//             $('#' + target).html(result);
//             $('.' + target).html(value);
//         },
//         complete: function () {
//             scaleAnimation();
//         }
//     });
// }

// if ($('.preparation-materials')) {
//     $(".preparation-materials").each(function (index, value) {
//         var materialdropdown = $(this).find('.preparation-material-dropdown');
//         var searchresulttitletext = $(this).find('.search-result-title-text');


//         var _pmTempParamId = materialdropdown.data("param-name");
//         var _pmTempParamValue = pmpathurl.searchParams.get(_pmTempParamId);
// 		var isSessionValue=false;
//         if ((!_pmTempParamValue || _pmTempParamValue == null || _pmTempParamValue == '') && materialdropdown) {
//         _pmTempParamValue = sessionStorage.getItem("examId");
//          if (_pmTempParamValue && _pmTempParamValue != '')
//          isSessionValue=true;	
//         }
//         var _pmTempTargetValue = $(this).find("option[testid='"+_pmTempParamValue+"']").val();
//         if (_pmTempParamValue && _pmTempParamValue != '' && materialdropdown) {
//             materialdropdown.val(_pmTempTargetValue);
//             const  _onloadSelectValue = materialdropdown.children(':selected').attr("path");
//             const  _onloadSelectId = materialdropdown.data('prep-id');
// 			if(_onloadSelectValue && _onloadSelectValue!=''){
//             	callAjaxPMFn(_onloadSelectValue, _onloadSelectId, _pmTempTargetValue);
//                 $('.error' + _onloadSelectId).addClass('d-none');
// 				if(isSessionValue){
// 	            isSessionValue=false;
//    	            pmSetParam(materialdropdown.data('param-name'), _pmTempParamValue);
//                 }
//             } else {
// 				$('.error' + _onloadSelectId).removeClass('d-none');
//                 if(errorCountPM === 1) {
//                 	scrolltoErrorId(_onloadSelectId);
//                 }
//                 errorCountPM++;
//             }
//         }

//         materialdropdown.select2({
//             placeholder: materialdropdown.data("placeholder"),
// 			selectionCssClass: "singleselect-withsearch",
//             dropdownCssClass: "singleselect-withsearch",
//         });

//         materialdropdown.on('select2:open', function (e) {
//             var select2Input= document.querySelector(".select2-container.select2-container--default.select2-container--open input[type='search']");
//             select2Input.setAttribute('aria-label',e.target.dataset.placeholder+" Search");
//             select2Input.removeAttribute('aria-activedescendant');            
//             setTimeout(() => {
//                 var selectInput= document.querySelector(".select2-container.select2-container--default.select2-container--open input[type='search']");
//                 selectInput.focus();
//             }, 500);
//         });
        
//         setTimeout(() => {
//             var pmAriaLabel = materialdropdown.attr('aria-label');
//             var setPMAriaLabel = materialdropdown.next('.select2-container').find('.select2-selection');
//             if(materialdropdown.hasClass("select2-hidden-accessible") && setPMAriaLabel.length == 1) {
//                 materialdropdown.removeAttr("aria-label");
//                 setPMAriaLabel.removeAttr('aria-labelledby');
//                 setPMAriaLabel.attr('aria-label', pmAriaLabel);
//             }
//         }, 3000);
//         materialdropdown.on('select2:select', function (data) {
// 			if(data.params.data.element.attributes.path.value && data.params.data.element.attributes.path.value!=''){
//                 callAjaxPMFn(data.params.data.element.attributes.path.value, data.currentTarget.getAttribute('data-prep-id'), data.params.data.text);
//                 $('.error' + data.currentTarget.getAttribute('data-prep-id')).addClass('d-none');
//                 pmSetParam(data.currentTarget.getAttribute('data-param-name'),data.params.data.element.attributes.testid.value);
// 			}
//         });
//     });
// }
