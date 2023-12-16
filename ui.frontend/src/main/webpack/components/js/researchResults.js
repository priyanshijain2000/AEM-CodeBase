var researchApi = '';
var researchResultPageSize = 10;
var researchResultTotalCount = 0;
var researchPaginationInitFlag = true;
var researchPaginationScrollInitFlag = false;
var researchPaginationReInitFlag = false;
var researchResultList = [];
var orginalResearchResultList = [];
var researchResultCurrentPageNumber = 1;
var researchResultPageNumberCount = 0;
var filterText = '';
var ResearchfilterText = '';
var minYear = 0;
var maxYear = 0;
var selectedMinYear = 0;
var selectedMaxYear = 0;
var researchResultApi = '';
var finalResearchResultApi = '';

var rsFiltersYear = [];
var rsFiltersSubjects = [];
var rsFiltersAuthors = [];
var rsFiltersDocTypes = [];
var rsFiltersYearFv = [];
var rsFiltersSubjectsFv = [];
var rsFiltersAuthorsFv = [];
var rsFiltersDocTypesFv = [];
var FinalFiltersValue = [];
var FinalFiltersValueDuplicate = [];
var rsMultipleArray = [];

var rsYearSliderInit = '';
var filterFlag = true;

var setFilterFlagFromSlider = false;
var rsFiltersSubjectsAfter = [];
var rsFiltersAuthorsAfter = [];
var rsFiltersDocTypesAfter = [];

var yearSliderFlag = true;
var filterButtonClick = true;

window.researchData = {};
// ?text=machine%20learning&resultsPerPage=10&resultsStart=0&applyFilter=subjects:"Accessibility"&applyFilter=subjects:"Adaptivity"&applyFilter=authors:"Almond,%20Russell%20G."&applyFilter=docTypes:"report"&applyFilter=years:"2007"
// https://www-tr.ets.org/sitesearch/researcher/search?text=grade&resultsPerPage=10
// https://www-qc.ets.org/researcher?text=machine%20learning&resultsPerPage=5&resultsStart=0&applyFilter=subjects:%2221st%20Century%20Skills%22&applyFilter=years:%222020%22&applyFilter=years:%222021%22&applyFilter=years:%222022%22


$('#researchSearchButton').on('click', function() {
	sessionStorage.setItem("researchSearched", "true");
    var inputElement = document.querySelector('#research-search-form-input');
    var searchText = $(inputElement).val();
    if (searchText && searchText != '') {
        var resultUrl = $(this).data('research-result-url');
        window.location.href = resultUrl + '?qt=' + searchText;
    }

});
$('#research-search-form-input').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        var inputElement = $(this);
        var searchText = $(inputElement).val();
        if (searchText && searchText != '') {
			sessionStorage.setItem("researchSearched", "true");
            var resultUrl = $('#researchSearchButton').data('research-result-url');
            window.location.href = resultUrl + '?qt=' + searchText;
        }
    }

});

$.fn.resetPageUrl = function() {
    var queryParams = new URLSearchParams(window.location.search);
    if (ResearchfilterText && ResearchfilterText != '') {
        queryParams.set("qt", ResearchfilterText);
    } else {
        queryParams.delete("qt");
    }
    // if (rsFiltersSubjectsFv && rsFiltersSubjectsFv.length) {
    //     queryParams.set("subject", rsFiltersSubjectsFv.join(";"));
    // } else {
    //     queryParams.delete("subject");
    // }
    // if (rsFiltersAuthorsFv && rsFiltersAuthorsFv.length) {
    //     queryParams.set("author", rsFiltersAuthorsFv.join(";"));
    // } else {
    //     queryParams.delete("author");
    // }
    // if (rsFiltersDocTypesFv && rsFiltersDocTypesFv.length) {
    //     queryParams.set("docType", rsFiltersDocTypesFv.join(";"));
    // } else {
    //     queryParams.delete("docType");
    // }
    // if (selectedMinYear > 0) {
    //     queryParams.set("minYear", selectedMinYear);
    // } else {
    //     queryParams.delete("minYear");
    // }
    // if (selectedMaxYear > 0) {
    //     queryParams.set("maxYear", selectedMaxYear);
    // } else {
    //     queryParams.delete("maxYear");
    // }
    window.history.replaceState({}, document.title, "?" + queryParams.toString());
}

function setParamsValueSearchField(ResearchfilterText) {
    if (ResearchfilterText) {
        $("#research-results-form-input").val(ResearchfilterText);
    }
}

function populateResearchResultData(result, nr) {
    
    const researchResultContainer = document.querySelector('.research-result--data-container');
    const totalResult = document.querySelector('#total-result');
    
    $('#research-no-results').addClass('d-none');
    $('#resear-chresults-head').addClass('d-none');
    $('#research-results').hide();
    if (ResearchfilterText && ResearchfilterText != '') {
        totalResult.innerHTML = nr + ' Results for ' + "'" + ResearchfilterText + "'";
        $("#no-search-result").html(ResearchfilterText);
    } 
    const researchListBody = researchResultContainer.querySelector('.results-list--body');
    $(researchListBody).empty();

    if(nr > researchResultPageSize) {
        $('.researchResultsPagination').removeClass('d-none');
    } else {
        $('.researchResultsPagination').addClass('d-none');
    }

    if (researchResultList && researchResultList.length > 0) {
        $('#resear-chresults-head').removeClass('d-none');
        $('#research-results').show();
        $('#research-no-results').addClass('d-none');
        $('.research-no-keyword-msg').addClass('d-none');
        for (let i = 0; i < result.length; i++) {
            var row = '<div class="result">';

            if (researchResultList[i]["docType"]) {
                row += '<h2>' + researchResultList[i]["docType"] + '</h2>';
            }
            if (researchResultList[i]["heading"]) {
                row += '<h3><a href="' + researchResultList[i]["url"] + '" target="_self">' + researchResultList[i]["heading"] + '</a></h3>';
            }
            row += '<div class="result-infomation">';
            var authorsName = '';
            if (researchResultList[i]["authors"] && researchResultList[i]["authors"].length > 0) {
                researchResultList[i]["authors"].forEach((author, index) => {
                    if (index != researchResultList[i]["authors"].length - 1)
                        authorsName += author["bio"] != null ? '<a href="' + author["bio"] + '">' + author["name"] + '</a>' + '; ' : '<span>' + author["name"] + '; ' + '</span>';
                    else
                        authorsName += author["bio"] != null ? '<a href="' + author["bio"] + '">' + author["name"] + '</a>' : '<span>' + author["name"] + '</span>';
                });
            }
            if (authorsName != '') {
                row += '<div><strong>Author(s):</strong><span>' + authorsName + '</span></div>';
            }
            if (researchResultList[i]["year"]) {
                row += '<div><strong>Publication Year:</strong><span>' + researchResultList[i]["year"] + '</span></div>';
            }
            if (researchResultList[i]["source"]) {
                row += '<div><strong>Source:</strong><span>' + researchResultList[i]["source"] + '</span></div>';
            }
            row += '</div>';
            row += '</div>';

            $(row).appendTo("#research-results");
            itemCount = i + 1;
        }
        filterFlag = false;
    } else {
        $('#resear-chresults-head').addClass('d-none');
        if(filterFlag) {
            $('.research-result--filter-container').addClass('d-none');
        }
        $('#research-results').hide();
        if (ResearchfilterText && ResearchfilterText != '') {
            $('#research-no-results').removeClass('d-none');
            $('.research-no-keyword-msg').addClass('d-none');
            var clearFilterButton = document.querySelector('#resultClearFilterbutton');
            if (clearFilterButton) {
                $(clearFilterButton).parent().addClass('d-none');
            }
        } else {
            $('.research-no-keyword-msg').removeClass('d-none');
        }
           
    }

    if (researchResultList && (researchResultList.length >= 1 && filterButtonClick)) {
        $('.rr-filter-button-wrap').removeClass('d-none');
    } else {
        $('.rr-filter-button-wrap').addClass('d-none');
    }
}

$.fn.researchScrollTop = function() {
    $('html, body').animate({
        scrollTop: $('#researchresultswrap').offset().top - 30
    }, 'slow');
}
$.fn.resetResearchResultPageData = function() {
    researchResultPageNumberCount = 0;
    researchResultCurrentPageNumber = 1;
}

$.fn.restAllFilterData = function() {
    researchPaginationInitFlag = true;
    $.fn.resetResearchResultPageData();
    rsFiltersYear = [];
    rsFiltersSubjects = [];
    rsFiltersAuthors = [];
    rsFiltersDocTypes = [];
    rsFiltersYearFv = [];
    rsFiltersSubjectsFv = [];
    rsFiltersAuthorsFv = [];
    rsFiltersDocTypesFv = [];
    selectedMinYear = 0;
    selectedMaxYear = 0;
    var sliderHandle = document.querySelector('.ui-slider-handle');
    if (sliderHandle) {
        $("#slider-range").slider("destroy");
    }
}

function split(val) {
    return val.split(/,\s*/);
}

function extractLast(term) {
    return split(term).pop();
}
$.fnreserMultiSelectFn = function() {
    var selectContainer = document.querySelector('.select2-container');
    if(selectContainer) {
        $('#subjectMultiselect').val(null).trigger('change');
        $('#authorMultiselect').val(null).trigger('change');
        $('#formatMultiselect').val(null).trigger('change');
    }
}
var $subjecteventSelect = $("#subjectMultiselect");
var $subjectchips = $('#subjectchips');
var flaginitCountSubject = 1;
var subjecteventSelectAriaLabel = '';
var subjecteventSelectAriaLabelFlag = 1;
$.fn.updateSubjectsFilter = function(afterFilter, yearFlag) {
    var data = '';
    if ((rsFiltersSubjects.length > 0 && rsFiltersSubjectsFv.length == 0) || yearFlag == 'year') {
        if(afterFilter) {
            data = $.map(rsFiltersSubjectsAfter, function(obj, i) {
                var objx = {
                    id: i,
                    text: obj,
                    selected: false
                };
                return objx;
            });
            $subjecteventSelect.select2('destroy').empty();
        } else {
            var data = $.map(rsFiltersSubjects, function(obj, i) {
                var selectedIndex = rsFiltersSubjectsFv.indexOf(obj);
                const objx = {
                    id: i,
                    text: obj,
                    selected: selectedIndex >= 0 ? true : false
                };
                return objx;
            });
        }
        $subjecteventSelect.select2({
            data: data,
            closeOnSelect: false,
            selectionCssClass: "multiselect-dropdown",
            dropdownCssClass: "multiselect-dropdown",
            placeholder: $subjecteventSelect.data("placeholder"),
            allowClear: true
        });
        if(subjecteventSelectAriaLabelFlag == 1) {
            subjecteventSelectAriaLabel = $subjecteventSelect.attr('aria-label');
            subjecteventSelectAriaLabelFlag++;
        }
        setTimeout(() => {
            var setsubjecteventSelectAriaLabel = $subjecteventSelect.next('.select2-container').find('.select2-search__field');
            var setsubjecteventSelectAriaLabelselection = $subjecteventSelect.next('.select2-container').find('.select2-selection');
            if($subjecteventSelect.hasClass("select2-hidden-accessible") && setsubjecteventSelectAriaLabel.length == 1) {
                $subjecteventSelect.removeAttr("aria-label");
                setsubjecteventSelectAriaLabel.removeAttr('aria-labelledby');
                setsubjecteventSelectAriaLabel.attr('aria-label', subjecteventSelectAriaLabel);
                setsubjecteventSelectAriaLabelselection.attr('aria-label', subjecteventSelectAriaLabel+' ');
            }
        }, 2000);
        if(flaginitCountSubject == 1) {
            $subjecteventSelect.on("select2:select", function(e) {
                $("#subjectsDropdownAnnouncement").html(e.params.data.text + " selected ");
                if (rsFiltersSubjectsFv && rsFiltersSubjectsFv.length > 0) {
                    var selectedIndex = rsFiltersSubjectsFv.indexOf(e.params.data.text);
                    if (selectedIndex < 0) {
                        rsFiltersSubjectsFv.push(e.params.data.text);
                    }
    
                } else {
                    rsFiltersSubjectsFv.push(e.params.data.text);
                }
                $.fn.subjectChipsWrap($subjecteventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $subjectchips.append('<button aria-label="'+e.params.data.text+'" class="'+_finalString+'" data-id="'+e.params.data.id+'">'+e.params.data.text+'<i role="button" tabindex="0" aria-label="click to remove selection" onkeypress="$(this).subjectClearSingleChipsFnkeydown(event, false)" onClick="$(this).subjectclearSingleChipsFn(event, false)"></i></button>');
            });
            $subjecteventSelect.on("select2:unselect", function(e) {
                $("#subjectsDropdownAnnouncement").html(e.params.data.text + " unselected ");
                if (rsFiltersSubjectsFv && rsFiltersSubjectsFv.length > 0) {
                    rsFiltersSubjectsFv.forEach(function(item, index, object) {
                        if (item == e.params.data.text) {
                            object.splice(index, 1);
                        }
                    });
                }
                $.fn.subjectChipsWrap($subjecteventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $.fn.subjectclearSingleChipsFn('', true, _finalString);
            });
            $subjecteventSelect.on("select2:close", function(e) {
                $.fn.setApiURL(true, 'subject');
                if (e.params.originalSelect2Event && !e.params.originalSelect2Event.data.selected) {
                    if (rsFiltersSubjectsFv && rsFiltersSubjectsFv.length > 0) {
                        var selectedIndex = rsFiltersSubjectsFv.indexOf(e.params.originalSelect2Event.data.text);
                        rsFiltersSubjectsFv.splice(selectedIndex, 1);
                    }
                }
            });
            flaginitCountSubject++;
        }
    }
}
$.fn.subjectChipsWrap = function(values) {
    if(values.length > 0) {
        $subjectchips.removeClass('d-none');
    } else {
        $subjectchips.addClass('d-none');
    }
};
$.fn.subjectclearSingleChipsFn = function(event, deleteItem, resultId) {
    if(!deleteItem) {
        $(event.target).parents('form').submit(function(e){
            e.preventDefault();
        });
        var idToRemove = $(event.target).parent('button').attr("data-id");
        var values = $subjecteventSelect.val();
        if (values) {
            $subjectchips.removeClass('d-none');
            var i = values.indexOf(idToRemove);
            if (i >= 0) {
                values.splice(i, 1);
                $subjecteventSelect.val(values).trigger('change');
                $(event.target).parent('button').remove();
            }
        }
        $.fn.subjectChipsWrap(values);
    } else {
        $subjectchips.find('.'+resultId).remove();
    }
};
$.fn.subjectClearSingleChipsFnkeydown = function(event, deleteItem) {
    if (event.keyCode == 13) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $.fn.subjectclearSingleChipsFn(event, deleteItem);
        }
    }
};
$.fn.subjectClearChipsAllFn = function() {
    $subjecteventSelect.val('').trigger('change');
    $subjectchips.find('button').remove();
    $subjectchips.addClass('d-none');
};
$('.subjectChipsClear').on('click', function(e) {
    e.preventDefault();
    $.fn.subjectClearChipsAllFn();
});
var $authoreventSelect = $("#authorMultiselect");
var $authorchips = $('#authorchips');
var flaginitCountAuthor = 1;
var authoreventSelectAriaLabelFlag = 1;
var authoreventSelectAriaLabel = '';
$.fn.updateAuthorsFilter = function(afterFilter, yearFlag) {
    if ((rsFiltersAuthors.length > 0 && rsFiltersAuthorsFv.length == 0) || yearFlag == 'year') {
        var data = '';
        if(afterFilter) {
            data = $.map(rsFiltersAuthorsAfter, function(obj, i) {
                var objx = {
                    id: i,
                    text: obj,
                    selected: false
                };
                return objx;
            });
            $authoreventSelect.select2('destroy').empty();
        } else {
            var data = $.map(rsFiltersAuthors, function(obj, i) {
                var selectedIndex = rsFiltersAuthorsFv.indexOf(obj);
                const objx = {
                    id: i,
                    text: obj,
                    selected: selectedIndex >= 0 ? true : false
                };
                return objx;
            });
        }
        // console.log(data);
        $authoreventSelect.select2({
            data: data,
            closeOnSelect: false,
            selectionCssClass: "multiselect-dropdown",
            dropdownCssClass: "multiselect-dropdown",
            placeholder: $authoreventSelect.data("placeholder"),
            allowClear: true
        });
        if(authoreventSelectAriaLabelFlag == 1) {
            authoreventSelectAriaLabel = $authoreventSelect.attr('aria-label');
            authoreventSelectAriaLabelFlag++;
        }
        setTimeout(() => {
            var setauthoreventSelectAriaLabel = $authoreventSelect.next('.select2-container').find('.select2-search__field');
            var setauthoreventSelectAriaLabelselection = $authoreventSelect.next('.select2-container').find('.select2-selection');
            if($authoreventSelect.hasClass("select2-hidden-accessible") && setauthoreventSelectAriaLabel.length == 1) {
                $authoreventSelect.removeAttr("aria-label");
                setauthoreventSelectAriaLabel.removeAttr('aria-labelledby');
                setauthoreventSelectAriaLabel.attr('aria-label', authoreventSelectAriaLabel);
                setauthoreventSelectAriaLabelselection.attr('aria-label', authoreventSelectAriaLabel+' ');
            }
        }, 2000);
        if(flaginitCountAuthor == 1) {
            $authoreventSelect.on("select2:select", function(e) {
                $("#authoursDropdownAnnouncement").html(e.params.data.text + " selected ");
                if (rsFiltersAuthorsFv && rsFiltersAuthorsFv.length > 0) {
                    var selectedIndex = rsFiltersAuthorsFv.indexOf(e.params.data.text);
                    if (selectedIndex < 0) {
                        rsFiltersAuthorsFv.push(e.params.data.text);
                    }
                } else {
                    rsFiltersAuthorsFv.push(e.params.data.text);
                }
                $.fn.authorChipsWrap($authoreventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $authorchips.append('<button aria-label="'+e.params.data.text+'" class="'+_finalString+'" data-id="'+e.params.data.id+'">'+e.params.data.text+'<i role="button" tabindex="0" aria-label="click to remove selection" onkeypress="$(this).authorClearSingleChipsFnkeydown(event, false)" onClick="$(this).authorclearSingleChipsFn(event, false)"></i></button>');
            });
            $authoreventSelect.on("select2:unselect", function(e) {
                $("#authoursDropdownAnnouncement").html(e.params.data.text + " unselected ");
                if (rsFiltersAuthorsFv && rsFiltersAuthorsFv.length > 0) {
                    rsFiltersAuthorsFv.forEach(function(item, index, object) {
                        if (item == e.params.data.text) {
                            object.splice(index, 1);
                        }
                    });
                }
                $.fn.authorChipsWrap($authoreventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $.fn.authorclearSingleChipsFn('', true, _finalString);
            });
            $authoreventSelect.on("select2:close", function(e) {
                $.fn.setApiURL(true, 'author');
                if (e.params.originalSelect2Event && !e.params.originalSelect2Event.data.selected) {
                    if (rsFiltersAuthorsFv && rsFiltersAuthorsFv.length > 0) {
                        var selectedIndex = rsFiltersAuthorsFv.indexOf(e.params.originalSelect2Event.data.text);
                        rsFiltersAuthorsFv.splice(selectedIndex, 1);
                    }
                }
            });
            flaginitCountAuthor++;
        }
    }
}
$.fn.authorChipsWrap = function(values) {
    if(values.length > 0) {
        $authorchips.removeClass('d-none');
    } else {
        $authorchips.addClass('d-none');
    }
};
$.fn.authorclearSingleChipsFn = function(event, deleteItem, resultId) {
    if(!deleteItem) {
        $(event.target).parents('form').submit(function(e){
            e.preventDefault();
        });
        var idToRemove = $(event.target).parent('button').attr("data-id");
        var values = $authoreventSelect.val();
        if (values) {
            $authorchips.removeClass('d-none');
            var i = values.indexOf(idToRemove);
            if (i >= 0) {
                values.splice(i, 1);
                $authoreventSelect.val(values).trigger('change');
                $(event.target).parent('button').remove();
            }
        }
        $.fn.authorChipsWrap(values);
    } else {
        $authorchips.find('.'+resultId).remove();
    }
};
$.fn.authorClearSingleChipsFnkeydown = function(event, deleteItem) {
    if (event.keyCode == 13) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $.fn.authorclearSingleChipsFn(event, deleteItem);
        }
    }
};
$.fn.authorClearChipsAllFn = function() {
    $authoreventSelect.val('').trigger('change');
    $authorchips.find('button').remove();
    $authorchips.addClass('d-none');
};
$('.authorChipsClear').on('click', function(e) {
    e.preventDefault();
    $.fn.authorClearChipsAllFn();
});
var $formateventSelect = $("#formatMultiselect");
var $formatchips = $('#formatchips');
var flaginitCountFormat = 1;
var formateventSelectAriaLabel = '';
var formateventSelectAriaLabelFlag = 1;
$.fn.updateFormatFilter = function(afterFilter, yearFlag) {
    if ((rsFiltersDocTypes.length > 0 && rsFiltersDocTypesFv.length == 0) || yearFlag == 'year') {
        var data = '';
        if(afterFilter) {
            data = $.map(rsFiltersDocTypesAfter, function(obj, i) {
                var objx = {
                    id: i,
                    text: obj,
                    selected: false
                };
                return objx;
            });
            $formateventSelect.select2('destroy').empty();
        } else {
            data = $.map(rsFiltersDocTypes, function(obj, i) {
                var selectedIndex = rsFiltersDocTypesFv.indexOf(obj);
                var objx = {
                    id: i,
                    text: obj,
                    selected: selectedIndex >= 0 ? true : false
                };
                return objx;
            });
        } 
        $formateventSelect.select2({
            data: data,
            closeOnSelect: false,
            selectionCssClass: "multiselect-dropdown",
            dropdownCssClass: "multiselect-dropdown",
            placeholder: $formateventSelect.data("placeholder"),
            allowClear: true
        });
        if(formateventSelectAriaLabelFlag == 1) {
            formateventSelectAriaLabel = $formateventSelect.attr('aria-label');
            formateventSelectAriaLabelFlag++;
        }
        setTimeout(() => {
            var setformateventSelectAriaLabel = $formateventSelect.next('.select2-container').find('.select2-search__field');
            var setformateventSelectAriaLabelselection = $formateventSelect.next('.select2-container').find('.select2-selection');
            if($formateventSelect.hasClass("select2-hidden-accessible") && setformateventSelectAriaLabel.length == 1) {
                $formateventSelect.removeAttr("aria-label");
                setformateventSelectAriaLabel.removeAttr('aria-labelledby');
                setformateventSelectAriaLabel.attr('aria-label', formateventSelectAriaLabel);
                setformateventSelectAriaLabelselection.attr('aria-label', formateventSelectAriaLabel+' ');
            }
        }, 2000);
        if(flaginitCountFormat == 1) {
            $formateventSelect.on("select2:select", function(e) {
                $("#formatsDropdownAnnouncement").html(e.params.data.text + " selected ");
                if (rsFiltersDocTypesFv && rsFiltersDocTypesFv.length > 0) {
                    var selectedIndex = rsFiltersDocTypesFv.indexOf(e.params.data.text);
                    if (selectedIndex < 0) {
                        rsFiltersDocTypesFv.push(e.params.data.text);
                    }
                } else {
                    rsFiltersDocTypesFv.push(e.params.data.text);
                }
                $.fn.formatChipsWrap($formateventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $formatchips.append('<button aria-label="'+e.params.data.text+'" class="'+_finalString+'" data-id="'+e.params.data.id+'">'+e.params.data.text+'<i role="button" tabindex="0" aria-label="click to remove selection" onkeypress="$(this).formatClearSingleChipsFnkeydown(event, false)" onClick="$(this).formatclearSingleChipsFn(event, false)"></i></button>');
            });
            $formateventSelect.on("select2:unselect", function(e) {
                $("#formatsDropdownAnnouncement").html(e.params.data.text + " unselected ");
                if (rsFiltersDocTypesFv && rsFiltersDocTypesFv.length > 0) {
                    rsFiltersDocTypesFv.forEach(function(item, index, object) {
                        if (item == e.params.data.text) {
                            object.splice(index, 1);
                        }
                    });
                }
                $.fn.formatChipsWrap($formateventSelect.val());
                var _string = e.params.data._resultId;
                var _finalString = _string.split(' ')[0];
                $.fn.formatclearSingleChipsFn('', true, _finalString);
            });
            $formateventSelect.on("select2:close", function(e) {
                $.fn.setApiURL(true, 'format');
                if (e.params.originalSelect2Event && !e.params.originalSelect2Event.data.selected) {
                    if (rsFiltersDocTypesFv && rsFiltersDocTypesFv.length > 0) {
                        var selectedIndex = rsFiltersDocTypesFv.indexOf(e.params.originalSelect2Event.data.text);
                        rsFiltersDocTypesFv.splice(selectedIndex, 1);
                    }
                }
            });
            flaginitCountFormat++;
        }
    } 
}
$.fn.formatChipsWrap = function(values) {
    if(values.length > 0) {
        $formatchips.removeClass('d-none');
    } else {
        $formatchips.addClass('d-none');
    }
};
$.fn.formatclearSingleChipsFn = function(event, deleteItem, resultId) {
    if(!deleteItem) {
        $(event.target).parents('form').submit(function(e){
            e.preventDefault();
        });
        var idToRemove = $(event.target).parent('button').attr("data-id");
        var values = $formateventSelect.val();
        if (values) {
            $formatchips.removeClass('d-none');
            var i = values.indexOf(idToRemove);
            if (i >= 0) {
                values.splice(i, 1);
                $formateventSelect.val(values).trigger('change');
                $(event.target).parent('button').remove();
            }
        }
        $.fn.formatChipsWrap(values);
    } else {
        $formatchips.find('.'+resultId).remove();
    }
};
$.fn.formatClearSingleChipsFnkeydown = function(event, deleteItem) {
    if (event.keyCode == 13) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $.fn.formatclearSingleChipsFn(event, deleteItem);
        }
    }
};
$.fn.formatClearChipsAllFn = function() {
    $formateventSelect.val('').trigger('change');
    $formatchips.find('button').remove();
    $formatchips.addClass('d-none');
};
$('.formatChipsClear').on('click', function(e) {
    e.preventDefault();
    $.fn.formatClearChipsAllFn();
});
$.fn.resetAllChips = function() {
    $.fn.subjectClearChipsAllFn();
    $.fn.authorClearChipsAllFn();
    $.fn.formatClearChipsAllFn();
};
$.fn.rsLoadingCustomSelect = function(e, selectedDropdown) {
    if(e && selectedDropdown == 'subject') {
        $.fn.updateAuthorsFilter(e);
        $.fn.updateFormatFilter(e);
    } else if (e && selectedDropdown == 'author') {
        $.fn.updateSubjectsFilter(e);
        $.fn.updateFormatFilter(e);
    } else if (e && selectedDropdown == 'format') {
        $.fn.updateSubjectsFilter(e);
        $.fn.updateAuthorsFilter(e);
    } else if (e && selectedDropdown == 'year') {
        $.fn.updateSubjectsFilter(e, 'year');
        $.fn.updateAuthorsFilter(e, 'year');
        $.fn.updateFormatFilter(e, 'year');
    } else {
        $.fn.updateSubjectsFilter(e);
        $.fn.updateAuthorsFilter(e);
        $.fn.updateFormatFilter(e);
    }
}
$.fn.loadYearSlider = function() {
    if (rsFiltersYear.length > 0) {
        minYear = parseInt(rsFiltersYear[0]);
        maxYear = parseInt(rsFiltersYear[rsFiltersYear.length - 1]);
    }
    var sliderHandleBtnLeft = document.querySelector('.research-result--filter-container__slider--slider-btn-left');
    if (sliderHandleBtnLeft) {
        sliderHandleBtnLeft.innerHTML = minYear;
    }
    var sliderHandleBtnRight = document.querySelector('.research-result--filter-container__slider--slider-btn-right');
    if (sliderHandleBtnRight) {
        sliderHandleBtnRight.innerHTML = maxYear;
    }
    if (rsFiltersYear.length > 0) {
        rsYearSliderInit = $("#slider-range").slider({
            classes: {
                "ui-slider": "ui-corner-all",
                "ui-slider-handle": "ui-corner-all",
                "ui-slider-range": "ui-corner-all ui-widget-header"
            },
            range: true,
            step: 1,
            min: minYear,
            max: maxYear,
            values: [selectedMinYear > 0 ? selectedMinYear : minYear, selectedMaxYear > 0 ? selectedMaxYear : maxYear],
            create: function() {
                selectedMinYear = selectedMinYear > 0 ? selectedMinYear : minYear;
                selectedMaxYear = selectedMaxYear > 0 ? selectedMaxYear : maxYear;
            },
            slide: function(event, ui) {
                if (sliderHandleBtnLeft) {
                    sliderHandleBtnLeft.innerHTML = ui.values[0];
                }
                if (sliderHandleBtnRight) {
                    sliderHandleBtnRight.innerHTML = ui.values[1];
                }
                selectedMinYear = ui.values[0];
                selectedMaxYear = ui.values[1];
                var sliderHandleLeft = document.querySelector('.slider-handle-left-text');
                if (sliderHandleLeft)
                    sliderHandleLeft.innerHTML = selectedMinYear;
                    $(sliderHandleLeft).parent().attr({"aria-valuenow":sliderHandleLeft.innerHTML,"aria-valuetext":"Selected Year is "+sliderHandleLeft.innerHTML});
                var sliderHandleRight = document.querySelector('.slider-handle-right-text');
                if (sliderHandleRight)
                    sliderHandleRight.innerHTML = selectedMaxYear;
                    $(sliderHandleRight).parent().attr({"aria-valuenow":sliderHandleRight.innerHTML,"aria-valuetext":"Selected Year is "+sliderHandleRight.innerHTML});
            },
            stop: function( event, ui) {
                $.fn.resetAllChips();
                rsFiltersSubjectsFv = [];
                rsFiltersAuthorsFv = [];
                rsFiltersDocTypesFv = [];
                $.fn.setApiURL(true, 'year');

            }
        });
        var sliderHandle = document.querySelectorAll('.ui-slider-handle');
        if (sliderHandle && sliderHandle.length > 0) {
            Array.from(sliderHandle).forEach((handleElement, i) => {
                const spanElement = document.createElement('span');
                spanElement.className = i == 0 ? 'slider-handle-left-text' : 'slider-handle-right-text';
                spanElement.innerHTML = i == 0 ? selectedMinYear > 0 ? selectedMinYear : minYear : selectedMaxYear > 0 ? selectedMaxYear : maxYear;
                // spanElement.setAttribute('tabindex', 1);
                handleElement.append(spanElement);
                $('.slider-handle-left-text').parent().attr({"role":"slider","aria-label":"Press alt + right or left key to add or reduce, start publication year","aria-valuenow":spanElement.innerHTML,"aria-valuetext":"Selected Year is "+spanElement.innerHTML})
                $('.slider-handle-right-text').parent().attr({"role":"slider","aria-label":"Press alt + right or left key to add or reduce, end publication year","aria-valuenow":spanElement.innerHTML,"aria-valuetext":"Selected Year is "+spanElement.innerHTML})
            });
        }
    }
}
$.fn.setApiURL = function(setFilterFlagFromSlider, selectedDropdown) {
    var subjects = [];
    var authors = [];
    var docTypes = [];
    var years = [];
    rsMultipleArray = [];
    FinalFiltersValue = [];
    FinalFiltersValueDuplicate = [];
    var minV = selectedMinYear;
    var maxV = selectedMaxYear;
    rsFiltersYearFv = rsFiltersYear.filter(function(year) {
        if (Number(year) >= minV && Number(year) <= maxV) {
            return true;
        }
    });
    
    rsFiltersSubjectsFv = rsFiltersSubjectsFv.sort();
    rsFiltersAuthorsFv = rsFiltersAuthorsFv.sort();
    rsFiltersDocTypesFv = rsFiltersDocTypesFv.sort();

    if (rsFiltersSubjectsFv.length > 0) {
        subjects = rsFiltersSubjectsFv.map(i => '&applyFilter=subjects:"' + i + '"');
    }
    if (rsFiltersAuthorsFv.length > 0) {
        authors = rsFiltersAuthorsFv.map(i => '&applyFilter=authors:"' + i + '"');
    }
    if (rsFiltersDocTypesFv.length > 0) {
        docTypes = rsFiltersDocTypesFv.map(i => '&applyFilter=docTypes:"' + i + '"');
    }
    if (rsFiltersYearFv.length > 0) {
        years = rsFiltersYearFv.map(i => '&applyFilter=years:"' + i + '"');
    }
    rsMultipleArray = [subjects, authors, docTypes, years]
    FinalFiltersValue = Array.prototype.concat(...rsMultipleArray);
    FinalFiltersValue = FinalFiltersValue.join('');
    FinalFiltersValue = FinalFiltersValue.replace(" ", "%20");
    if(!selectedDropdown) {
        FinalFiltersValueDuplicate = FinalFiltersValue;
    } else {
        FinalFiltersValueDuplicate = [];
    }
    
    if(setFilterFlagFromSlider) {
        $.fn.onChangeGetFilterValueDate(selectedDropdown);
    } else {
       $.fn.applyFilterToresultData();
    }
}

$.fn.setFilterValue = function(subjects, authors, docTypes, years) {
    rsFiltersSubjects = Object.keys(subjects).sort();
    rsFiltersAuthors = Object.keys(authors).sort();
    rsFiltersDocTypes = Object.keys(docTypes).sort();
    rsFiltersYear = Object.keys(years).sort();
    if(yearSliderFlag) {
        $.fn.loadYearSlider();
    }
    $.fn.rsLoadingCustomSelect();
}
$.fn.onChangeGetFilterValueDate = function(selectedDropdown) {
    var onchangetoGetFilterData = researchResultApi + '?text=' + ResearchfilterText + '&resultsPerPage=' + researchResultPageSize + '&resultsStart=0' + FinalFiltersValue;
    $.getJSON(onchangetoGetFilterData, function(data) {
        if(data.filters) {
            rsFiltersSubjectsAfter = Object.keys(data.filters.subjects).sort();
            rsFiltersAuthorsAfter = Object.keys(data.filters.authors).sort();
            rsFiltersDocTypesAfter = Object.keys(data.filters.docTypes).sort();
            $.fn.rsLoadingCustomSelect(true, selectedDropdown);
        }
    });
}
$.fn.researchResultsPagination = function(totalResult) {
    var _totalPage = Math.ceil(totalResult / researchResultPageSize);
    if(researchPaginationReInitFlag) {
        $('.researchResultsPagination').litePagination('destroy');
        $('.researchResultsPagination').litePagination({
            currentPage  : 1,
            // link_string   : '/?pages={page_number}',
            maxPage: _totalPage,
            pageString   : '{currentPage}',
            reInit: true,
            paged : function (page) {
                $.fn.applyFilterToresultData((page - 1) * researchResultPageSize, page);
                if(page != researchResultCurrentPageNumber) {
                    researchPaginationScrollInitFlag = true;
                }
            }
        });
    } else {
        $('.researchResultsPagination').litePagination({
            currentPage  : 1,
            // link_string   : '/?pages={page_number}',
            maxPage: _totalPage,
            pageString   : '{currentPage}',
            reInit: false,
            paged : function (page) {
                $.fn.applyFilterToresultData((page - 1) * researchResultPageSize, page);
                if(page != researchResultCurrentPageNumber) {
                    researchPaginationScrollInitFlag = true;
                }
            } 
        });
        researchPaginationReInitFlag = true;
    }
    
};
$.fn.applyFilterToresultData = function(PageStartFrom, page) {
    researchResultList = [];
    finalResearchResultApi = '';
    if (PageStartFrom) {
        yearSliderFlag = false;
        // PageNumber = (PageNumber - 1) * researchResultPageSize;
        if (FinalFiltersValueDuplicate == '') {
            finalResearchResultApi = researchResultApi + '?text=' + ResearchfilterText + '&resultsPerPage=' + researchResultPageSize + '&resultsStart=' + PageStartFrom;
        } else {
            finalResearchResultApi = researchResultApi + '?text=' + ResearchfilterText + '&resultsPerPage=' + researchResultPageSize + '&resultsStart=' + PageStartFrom + '' + FinalFiltersValueDuplicate;
        }
    } else {
        yearSliderFlag = true;
        if (FinalFiltersValue == '') {
            finalResearchResultApi = researchResultApi + '?text=' + ResearchfilterText + '&resultsPerPage=' + researchResultPageSize + '&resultsStart=0';
        } else {
            finalResearchResultApi = researchResultApi + '?text=' + ResearchfilterText + '&resultsPerPage=' + researchResultPageSize + '&resultsStart=0' + FinalFiltersValue;
        }
        PageStartFrom = 0;
    }

    $.getJSON(finalResearchResultApi, function(data) {
        researchResultTotalCount = data.numberOfResults;
        researchResultList = data.results;
        if (researchResultList) {
            populateResearchResultData(researchResultList, researchResultTotalCount);
            if(researchPaginationInitFlag && researchResultTotalCount > researchResultPageSize) {
                $.fn.researchResultsPagination(researchResultTotalCount);
                researchPaginationInitFlag = false;
            }

            if(researchPaginationScrollInitFlag) {
                $.fn.researchScrollTop();
                researchPaginationScrollInitFlag = false;
                researchResultCurrentPageNumber = page;
            }
        } else {
            populateResearchResultData({}, '0');
        }
        if (!PageStartFrom && FinalFiltersValue == '') {
            if (data.filters) {
                $.fn.setFilterValue(data.filters.subjects, data.filters.authors, data.filters.docTypes, data.filters.years);
            }
        }

    }).fail(function() {
        populateResearchResultData({}, '0');
    });
}

$('#researchResultsButton').on('click', function() {
    filterFlag = true;
    var inputElement = document.querySelector('#research-results-form-input');
    sessionStorage.setItem("researchSearched", "true");
    ResearchfilterText = $(inputElement).val();
    $.fnreserMultiSelectFn();
    $.fn.restAllFilterData();
    $.fn.setApiURL();
    $.fn.resetPageUrl();
    $.fn.resetAllChips();
});
// $('#researchResultsButton').keypress(function(event) {
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if (keycode == '13') {
// 		sessionStorage.setItem("researchSearched", "true");
//         var inputElement = document.querySelector('#research-results-form-input');
//         ResearchfilterText = $(inputElement).val();
//         filterFlag = true;
//         $.fnreserMultiSelectFn();
//         $.fn.restAllFilterData();
//         $.fn.setApiURL();
//         $.fn.resetPageUrl();
//     }
// });
$('#research-results-form-input').on('keypress', function(event) {
    if (event.keyCode == 13) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
			sessionStorage.setItem("researchSearched", "true");
            var inputElement = document.querySelector('#research-results-form-input');
            ResearchfilterText = $(inputElement).val();
            filterFlag = true;
            $.fnreserMultiSelectFn();
            $.fn.restAllFilterData();
            $.fn.setApiURL();
            $.fn.resetPageUrl();
            $.fn.resetAllChips();
        }
    }
});
$('#resultApplyFilterbutton').on('click', function() {
    researchPaginationInitFlag = true;
    $.fn.resetPageUrl();
    $.fn.setApiURL();
});
$('#researchResultsFilterButton').on('click', function() {
    var click = $(this).data('clicks');
    if (click % 2 == 1) {
        filterButtonClick = false;
    }else{
        filterButtonClick = true;
    };
    var filterConatiner = document.querySelector('.research-result--filter-container');
    if (filterConatiner) {
        $(filterConatiner).toggleClass('d-none');
    }
	var clearFilterButton = document.querySelector('#resultClearFilterbutton');
    if (clearFilterButton) {
        $(clearFilterButton).parent().toggleClass('d-none');
    }
});
$('.customselect__selected.subjects-multiselect-element').on('click', function() {
    var input = $(this);
    var isOpen = false;
    isOpen = input.autocomplete("widget").is(":visible");
    if (isOpen) {
        $('#ui-id-1').css("display", "none");
        return;
    }
    $(input).trigger("keydown");
})
$('.customselect__selected.author-multiselect-element').on('click', function() {
    var input = $(this);
    var isOpen = false;
    isOpen = input.autocomplete("widget").is(":visible");
    if (isOpen) {
        $('#ui-id-2').css("display", "none");
        return;
    }
    $(input).trigger("keydown");
})
$('.customselect__selected.formats-multiselect-element').on('click', function() {
    var input = $(this);
    var isOpen = false;
    isOpen = input.autocomplete("widget").is(":visible");
    if (isOpen) {
        $('#ui-id-3').css("display", "none");
        return;
    }
    $(input).trigger("keydown");
})
$(window).on('load', function() {
    var searchDataPathElement = document.querySelector(".research-result--data-container");
    const urlstring = window.location.href;
    const pathurl = new URL(urlstring);
    ResearchfilterText = pathurl.searchParams.get("qt");
    if (searchDataPathElement) {
        setParamsValueSearchField(ResearchfilterText);
        researchResultApi = $(searchDataPathElement).data("research-result-path");
        if (ResearchfilterText && ResearchfilterText != '') {
            finalResearchResultApi = researchResultApi + '?text=' + ResearchfilterText + '&resultsPerPage=' + researchResultPageSize + '&resultsStart=0';
            $.fn.applyFilterToresultData();
        }
    }
});
/*
$(window).on('load', function() {
    var searchDataPathElement = document.querySelector(".research-result--data-container");
    const urlstring = window.location.href;
    const pathurl = new URL(urlstring);
    ResearchfilterText = pathurl.searchParams.get("qt");
    var querySubject = pathurl.searchParams.get("subject");
    var queryAuthor = pathurl.searchParams.get("author");
    var queryDocType = pathurl.searchParams.get("docType");
    var queryMinYear = pathurl.searchParams.get("minYear");
    var queryMaxYear = pathurl.searchParams.get("maxYear");
    if (searchDataPathElement) {
        setParamsValueSearchField(ResearchfilterText);
        researchResultApi = $(searchDataPathElement).data("research-result-path");
        if (ResearchfilterText && ResearchfilterText != '') {
            finalResearchResultApi = researchResultApi + '?text=' + ResearchfilterText + '&resultsPerPage=' + researchResultPageSize + '&resultsStart=0';
            $.fn.applyFilterToresultData();
            if (researchResultApi && researchResultApi != '') {
                if (querySubject || queryAuthor || queryDocType) {
                    if (querySubject)
                        rsFiltersSubjectsFv = querySubject.split(';');
                    if (queryAuthor)
                        rsFiltersAuthorsFv = queryAuthor.split(';');
                    if (queryDocType)
                        rsFiltersDocTypesFv = queryDocType.split(';');
                    if (queryMinYear)
                        selectedMinYear = Number(queryMinYear);
                    if (queryMaxYear)
                        selectedMaxYear = Number(queryMaxYear);

                    if (FinalFiltersValue == '') {
                        finalResearchResultApi = researchResultApi + '?text=' + ResearchfilterText + '&resultsPerPage=' + researchResultPageSize + '&resultsStart=0';
                    } else {
                        finalResearchResultApi = researchResultApi + '?text=' + ResearchfilterText + '&resultsPerPage=' + researchResultPageSize + '&resultsStart=0' + FinalFiltersValue;
                    }
                    $.getJSON(finalResearchResultApi, function(data) {
                        if (data.filters) {
                            $.fn.setFilterValue(data.filters.subjects, data.filters.authors, data.filters.docTypes, data.filters.years);
                        }
                        
                        $.fn.setApiURL();
                    }).fail(function() {
                        populateResearchResultData({}, '0');
                    });

                } else {
                    $.fn.applyFilterToresultData();
                }
            }
        }
    }
}); */
$('#resultClearFilterbutton').on('click', function() {
    $.fnreserMultiSelectFn();
    $.fn.restAllFilterData();
    $.fn.resetPageUrl();
    $.fn.setApiURL();
    $.fn.resetAllChips();
});
// $('#resultClearFilterbutton').keypress(function(event) {
//     var keycode = (event.keyCode ? event.keyCode : event.which);
//     if (keycode == '13') {
//         $.fnreserMultiSelectFn();
//         $.fn.restAllFilterData();
//         $.fn.resetPageUrl();
//         $.fn.setApiURL();
//     }
// });