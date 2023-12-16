var acceptancePaginationReInitFlag = false;
var acceptanceSearchPageSize = 10;
var acceptanceList = [];
var orginalAcceptanceList = [];
var acceptanceCurrentPageNumber = 1;
var filterText = '';


$.fn.sortTable = function(event){
    var $this=$(event.target).closest('th');
    var currentclass = $this.attr('class');
    // var title = $this.find('b');
    var titleText = $this.data("key");
    var liveRegion=$("span.visuallyhidden#liveRegion");
    // $this.siblings().removeClass().addClass("sort_both").find('img').attr("src", '/src/main/webpack/resources/images/sort_both.png');
    $this.siblings().removeClass().addClass("sort_both").find('img').attr("src", '/content/dam/ets-org/icons/commons/sort_both.png');
    if (currentclass == "sort_both") {
        $this.removeClass('sort_both').addClass('sort_asc');
        $this.attr('aria-sort','ascending');
        $.fn.sortAcceptanceResults(titleText, true);
    } else if (currentclass == "sort_asc") {
        $this.removeClass('sort_asc').addClass('sort_desc');
        $this.attr('aria-sort','descending');
        $.fn.sortAcceptanceResults(titleText, false);
    } else if (currentclass == "sort_desc") {
        $this.removeClass('sort_desc').addClass('sort_asc');
        $this.attr('aria-sort','ascending');
        $.fn.sortAcceptanceResults(titleText, true);
    }

    if ($this.hasClass('sort_asc')) {
        // $this.find('img').attr("src", '/src/main/webpack/resources/images/sort_asc.png');
        $this.find('img').attr("src", '/content/dam/ets-org/icons/commons/sort_asc.png');
    } else if ($this.hasClass('sort_desc')) {
        // $this.find('img').attr("src", '/src/main/webpack/resources/images/sort_desc.png');
        $this.find('img').attr("src", '/content/dam/ets-org/icons/commons/sort_desc.png');
    }
    $(liveRegion).text("Table is now sorted by "+$this.text().replace(/\s/g,'') +","+$this.attr('aria-sort'));
};

$("table tr.sortingimages th button").each((i,item)=>{    
    item.addEventListener('click',$.fn.sortTable);   
});

// const closeAllSelectSearchInput = el => {
//     // Close all other select boxes except for the el past as an argument
//     Array.from(document.querySelectorAll('.select--active'))
//         .filter(o => o !== el)
//         .forEach(o => o.classList.remove('select--active'));
// };

// function handleSearchClickHanlder(e, selectContainer) {
//     e.stopPropagation();
//     closeAllSelectSearchInput(selectContainer);
//     // Toggle self
//     selectContainer.classList.toggle('select--active');
// }

// function updateFromSearchInputHandler(selectEl, textElememt, selectOptions, callFrom) {
//     const index = selectEl.selectedIndex;
//     textElememt.innerHTML = selectEl.options[index].innerHTML;
//     Array.from(selectOptions.querySelectorAll('.select__item')).forEach((option, i) => {
//         if (i === index) {
//             option.classList.add('select__item--selected');
//             if (callFrom == 'PageSize') {
//                 acceptanceSearchPageSize = $(option).data('pagesize');
//                 $.fn.filterSchoolAcceptanceList();
//             }
//         } else {
//             option.classList.remove('select__item--selected');
//         }
//     });
// }

function loadPageCountDropdown() {
    $(".page-count-dropdown").select2({
        minimumResultsForSearch: Infinity,
        selectionCssClass: "singleselect-withoutsearch",
        dropdownCssClass: "singleselect-withoutsearch",
    });
    var pcdAriaLabel = $(".page-count-dropdown").attr('aria-label');
    setTimeout(() => {
        var setpcdAriaLabel = $('.customselectpagecountsearch').find('.select2-selection');
        if ($('.page-count-dropdown').hasClass("select2-hidden-accessible") && setpcdAriaLabel.length == 1) {
            setpcdAriaLabel.attr('aria-label', pcdAriaLabel);
            setpcdAriaLabel.removeAttr('aria-labelledby');
            $('.page-count-dropdown').removeAttr("aria-label");
        }
    }, 2000);

    $(".page-count-dropdown option:first-child").attr('selected', 'true');
    acceptanceSearchPageSize = $(".page-count-dropdown option:selected").text();
    $('.page-count-dropdown').on('change', function() {
        acceptanceSearchPageSize = $(".page-count-dropdown option:selected").text();
        $.fn.filterSchoolAcceptanceList();
    });
}

function populateAcceptanceResultData() {
    const schoolAcceptanceTable = document.querySelector('.school-acceptance__table');
    const noResultElement = schoolAcceptanceTable.querySelector('.school-acceptance__noresults');
    $(noResultElement).addClass('d-none');
    const acceptanceTableElement = schoolAcceptanceTable.querySelector('table');
    const acceptanceTableBodyElement = acceptanceTableElement.querySelector('tbody');
    
    $(acceptanceTableBodyElement).empty();
    if (acceptanceList && acceptanceList.length > 0) {
        for (let cardCount = (acceptanceCurrentPageNumber * acceptanceSearchPageSize) - (acceptanceSearchPageSize); cardCount < acceptanceCurrentPageNumber * acceptanceSearchPageSize; cardCount++) {
            if (acceptanceList[cardCount]) {
                const rowElement = document.createElement('tr');
                const countryElement = document.createElement('td');
                countryElement.innerHTML = acceptanceList[cardCount].Country;
                rowElement.append(countryElement);
                const stateElement = document.createElement('td');
                stateElement.innerHTML = acceptanceList[cardCount]['State/Province'];
                rowElement.append(stateElement);
                const InstituteElement = document.createElement('td');
                InstituteElement.innerHTML = acceptanceList[cardCount].Institution;
                rowElement.append(InstituteElement);
                const programElement = document.createElement('td');
                programElement.innerHTML = acceptanceList[cardCount].Program;
                rowElement.append(programElement);
                acceptanceTableBodyElement.append(rowElement);
            } else {
                break;
            }
        }
    } else {
        $(noResultElement).removeClass('d-none');
    }
}

$('.customselectresultsearch input').on('input', function() {
    filterText = $(this).val();
    $.fn.filterSchoolAcceptanceList();
});

$.fn.sortAcceptanceResults = function(prop, asc) {
    $.fn.resetAcceptancePageData();
    acceptanceList.sort(function(a, b) {
        if (asc) {
            return (a[prop].replace(/&nbsp;/g, '').replace(/\s+/g, '').toLowerCase() > b[prop].replace(/&nbsp;/g, '').replace(/\s+/g, '').toLowerCase()) ? 1 : ((a[prop].replace(/&nbsp;/g, '').replace(/\s+/g, '').toLowerCase() < b[prop].replace(/&nbsp;/g, '').replace(/\s+/g, '').toLowerCase()) ? -1 : 0);
        } else {
            return (b[prop].replace(/&nbsp;/g, '').replace(/\s+/g, '').toLowerCase() > a[prop].replace(/&nbsp;/g, '').replace(/\s+/g, '').toLowerCase()) ? 1 : ((b[prop].replace(/&nbsp;/g, '').replace(/\s+/g, '').toLowerCase() < a[prop].replace(/&nbsp;/g, '').replace(/\s+/g, '').toLowerCase()) ? -1 : 0);
        }
    });
    populateAcceptanceResultData();
    $.fn.saProductsInitPagination();
};

$.fn.resetAcceptancePageData = function() {
    acceptanceCurrentPageNumber = 1;
};

$.fn.filterSchoolAcceptanceList = function() {
    $.fn.resetAcceptancePageData();
    if(filterText && filterText != '') {
        acceptanceList = orginalAcceptanceList.filter(state => state.Country.toLowerCase().includes(filterText.toString().toLowerCase()) || state['State/Province'].toLowerCase().includes(filterText.toString().toLowerCase()) || state.Institution.toLowerCase().includes(filterText.toString().toLowerCase()) || state.Program.toLowerCase().includes(filterText.toString().toLowerCase()));
    } else {
        acceptanceList = orginalAcceptanceList;
    }
    populateAcceptanceResultData();
    $.fn.saProductsInitPagination();
};

$.fn.saProductsInitPagination = function() {
    var _totalPage = Math.ceil(acceptanceList.length / acceptanceSearchPageSize);
    if(_totalPage > 1) {
        $('.acceptancePagination').removeClass('d-none');
        if(acceptancePaginationReInitFlag) {
            $('.acceptancePagination').litePagination('destroy');
            $('.acceptancePagination').litePagination({
                currentPage  : 1,
                // link_string   : '/?pages={page_number}',
                maxPage: _totalPage,
                pageString   : '{currentPage}',
                reInit: true,
                paged : function (page) {
                    acceptanceCurrentPageNumber = page;
                    populateAcceptanceResultData();
                    $.fn.scrollTopAcceptanceTable();
                }
            });
        } else {
            $('.acceptancePagination').litePagination({
                currentPage  : 1,
                // link_string   : '/?pages={page_number}',
                maxPage: _totalPage,
                pageString   : '{currentPage}',
                reInit: false,
                paged : function (page) {
                    acceptanceCurrentPageNumber = page;
                    populateAcceptanceResultData();
                    $.fn.scrollTopAcceptanceTable();
                } 
            });
            acceptancePaginationReInitFlag = true;
        }
    } else {
        $('.acceptancePagination').addClass('d-none');
    }
    
};

$.fn.loadSchoolAcceptanceList = function() {
    const schoolAcceptanceTable = document.querySelector('.school-acceptance__table');
    if (schoolAcceptanceTable) {
        var dataPath = $(schoolAcceptanceTable).data('school-acceptance-path');
        var dataPathList = dataPath.split('/');
        var jsonKey = '';
        if (dataPathList[dataPathList.length - 1]) {
            var jsonKeyList = dataPathList[dataPathList.length - 1].split('.');
            jsonKey = jsonKeyList[0];
        }
        $.getJSON(dataPath, function(result) {
            acceptanceList = result[jsonKey];
            orginalAcceptanceList = result[jsonKey];
            populateAcceptanceResultData();
            $.fn.saProductsInitPagination();
        });
    }
};

$.fn.scrollTopAcceptanceTable = function() {
    const schoolAcceptanceTable = document.querySelector('.school-acceptance__table');
    if (schoolAcceptanceTable) {
        $(window).scrollTop($(schoolAcceptanceTable).offset().top);
    }
};

$(window).on('load', function() {
    loadPageCountDropdown();
    $.fn.loadSchoolAcceptanceList();
});
