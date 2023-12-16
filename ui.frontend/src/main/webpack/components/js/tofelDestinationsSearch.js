var tdsPaginationInitFlag = true;
var tdsPaginationReInitFlag = false;
var tdsPaginationScrollInitFlag = false;
var tdsPageNumber = 1;

var tdResultPageSize = 10;
var tofelDestinationsResultList = [];
var tdTotalResultCount = 0;
var tdFilterText = '';
var tdResultCurrentPageNumber = 1;
var tofelDestinationsApi = '';
var finalTofelDestinationsApi = '';
var tofelSearchType='name';
// https://ccdi-pub.ets.org/ccdi-pub/destinations-search?name=4860
// https://ccdi-pub.ets.org/ccdi-pub/destinations-search?name=california&perpage=10&pagenum=2

$.fn.destinationHtmlEncode = function(searchTerm){
	var txt = document.createElement("textarea");
    txt.innerText = searchTerm;
    return txt.innerHTML.split("<br>").join("\n");
}

function tofelDesResultData(result, nr) {
    const tdResultContainer = document.querySelector('.tofel-destinations-result--data-container');
    $('.tofel-destinations-pagenation').addClass('d-none');
    const totalResultText = document.querySelector('#td-result-count-text');
    totalResultText.innerHTML = nr + ' Results for ' + "'" + $.fn.destinationHtmlEncode(tdFilterText) + "'";

    if(nr > tdResultPageSize ) {
        $('.tdsPagination').removeClass('d-none');
    } else {
        $('.tdsPagination').addClass('d-none');
    }
    $("#tofelDestinationsResults").empty();
    if (result && result.length > 0) {
        $('#td-no-results').addClass('d-none');
        $('#td-empty-result').addClass('d-none');
        $('.tofel-destinations-results--wrap').removeClass('d-none');
        $('#td-result-count-text').removeClass('d-none');
        $('.tofel-destinations-note').removeClass('d-none');
        
        for (let i = 0; i < result.length; i++) {
            var row = '<div class="accordion-item">';
            if (result[i].institutionName) {
                row += '<div class="accordion-header body-text" id="tdID-' + i + '"><button tabindex="0" class="accordion-button collapsed" type="button" data-bs-toggle="collapse" id="destinations-title-' + i + '" data-bs-target="#tdIDbody-' + i + '" aria-expanded="false" aria-controls="collapseOne"><span>' + result[i].institutionName + '<small>';
                if (result[i].institutionCity != 'N/A') {
                    row += result[i].institutionCity + ', ';
                }
                if (result[i].institutionState != 'N/A') {
                    row += result[i].institutionState + ', ';
                }
                if (result[i].institutionCountry != 'N/A') {
                    row += result[i].institutionCountry;
                }
                row += '</small></span></button></div>';
            }
            row += '<div id="tdIDbody-' + i + '" class="accordion-collapse collapse">';
            row += '<div class="accordion-body">';
            row += '<div class="tofel-destinations-result-content">';
            row += '<ul>';
            if (result[i].institutionCode) {
                row += '<li><strong>DI Code: </strong>' + result[i].institutionCode + '</li>';
            }
            if (result[i].institutionCity) {
                row += '<li><strong>Location: </strong>';
                if (result[i].institutionCity != 'N/A') {
                    row += result[i].institutionCity + ', ';
                }
                if (result[i].institutionState != 'N/A') {
                    row += result[i].institutionState + ', ';
                }
                if (result[i].institutionCountry != 'N/A') {
                    row += result[i].institutionCountry;
                }
                row += '</li>';
            }
            if (result[i].institutionWebsite) {
                row += '<li><strong>Website: </strong><a target="_blank" aria-label="Go To '+result[i].institutionName+' site, opens in a new tab" href="https://' + result[i].institutionWebsite + '">' + result[i].institutionWebsite + '</a></li>';
            }
            if (result[i].institutionFinancialAidFlag) {
                row += '<li><strong>Financial Aid available? </strong>' + result[i].institutionFinancialAidFlag + '</li>';
            }
            if (result[i].institutionFieldsOfStudy) {
                row += '<li><strong>Fields of Study: </strong>' + result[i].institutionFieldsOfStudy + '</li>';
            }
            row += '</ul>';
            row += '<p class="score-table-title">Score Information</p>';
            var _scoreInfo = result[i].institutionScoreInfo;
            if (_scoreInfo.length > 0) {
                row += '<div class="table-scroll"><table role="table"><tbody><tr><th scope="col">Program</th><th scope="col">Level</th><th scope="col">Min. Score</th></tr></tbody><tbody>';
                for (let j = 0; j < _scoreInfo.length; j++) {
                    row += '<tr><td data-td-label="Program"><strong>' + _scoreInfo[j].programName + '</strong></td><td data-td-label="Level">' + _scoreInfo[j].programLevel + '</td><td data-td-label="Min. Score"><ul>';
                    if (_scoreInfo[j].minimumScoreIBT != '') {
                        row += '<li><strong>iBT: </strong>' + _scoreInfo[j].minimumScoreIBT + '</li>';
                    } else {
                        row += '<li><strong>iBT: </strong>Contact the Institution</li>';
                    }
                    if (_scoreInfo[j].minimumScoreESE != '') {
                        row += '<li><strong>Essentials: </strong>' + _scoreInfo[j].minimumScoreESE + '</li>';
                    } else {
                        row += '<li><strong>Essentials: </strong>Contact the Institution</li>';
                    }
                    row += '</ul></td></tr>';
                }
                row += '</table></div>';
            } else {
                row += '<p>Please contact this institution directly for score information.</p>';
            }
            row += '</div>';
            row += '</div>';
            row += '</div>';
            row += '</div>';
            $(row).appendTo("#tofelDestinationsResults");
        }

    } else if (tdFilterText == '') {
        $('.tofel-destinations-results--wrap').addClass('d-none');
        $('#td-empty-result').removeClass('d-none');
        $('#td-result-count-text').addClass('d-none');
        $('#td-no-results').addClass('d-none');
        $('.tofel-destinations-note').addClass('d-none');
    } else {
        $("#tofelDestinationsResults").html('');
        $('.tofel-destinations-results--wrap').removeClass('d-none');
        $('#td-empty-result').addClass('d-none');
        $('.tofel-destinations-note').addClass('d-none');
        $('#td-no-results').removeClass('d-none');
        $('#td-result-count-text').removeClass('d-none');
    }
}
$.fn.tdsScrollTop = function() {
    $('html, body').animate({
        scrollTop: $('.tofel-destinations-search').offset().top - 30,
    });
};
$.fn.tdsInitPagination = function(totalResult) {
    var _totalPage = Math.ceil(totalResult / tdResultPageSize);
    if(tdsPaginationReInitFlag) {
        $('.tdsPagination').litePagination('destroy');
        $('.tdsPagination').litePagination({
            currentPage  : 1,
            // link_string   : '/?pages={page_number}',
            maxPage: _totalPage,
            pageString   : '{currentPage}',
            reInit: true,
            paged : function (page) {
                $.fn.loadTdResults((page - 1) * tdResultPageSize, page);
                if(page != tdsPageNumber) {
                    tdsPaginationScrollInitFlag = true;
                }
            }
        });
    } else {
        $('.tdsPagination').litePagination({
            currentPage  : 1,
            // link_string   : '/?pages={page_number}',
            maxPage: _totalPage,
            pageString   : '{currentPage}',
            reInit: false,
            paged : function (page) {
                $.fn.loadTdResults(page);
                if(page != tdsPageNumber) {
                    tdsPaginationScrollInitFlag = true;
                }
            } 
        });
        tdsPaginationReInitFlag = true;
    }
    
};
$.fn.loadTdResults = function(PageNumber) {
    if (PageNumber) {
        finalTofelDestinationsApi = tofelDestinationsApi + (tofelSearchType === 'name'? 'name=':'loc=') + tdFilterText + '&perpage=' + tdResultPageSize + '&pagenum=' + PageNumber;
    } else {
        finalTofelDestinationsApi = tofelDestinationsApi + (tofelSearchType === 'name'? 'name=':'loc=') + tdFilterText;
    }
    $.getJSON(finalTofelDestinationsApi, function(data) {
        tdResultPageSize = data.request.pageSize;
        tdTotalResultCount = data.numberOfResults;
        tofelDestinationsResultList = data.result;
        // tofelDestinationsResultList.sort(function(a, b) {
        //     return (a.institutionName > b.institutionName) ? 1 : ((a.institutionName < b.institutionName) ? -1 : 0);
        // });
        if(tdsPaginationInitFlag && tdTotalResultCount > tdResultPageSize) {
            $.fn.tdsInitPagination(tdTotalResultCount);
            tdsPaginationInitFlag = false;
        }
        if(tdsPaginationScrollInitFlag) {
            $.fn.tdsScrollTop();
            tdsPaginationScrollInitFlag = false;
            tdsPageNumber = PageNumber;
        }
        tofelDesResultData(tofelDestinationsResultList, tdTotalResultCount);
        
    }).fail(function() {
        tofelDesResultData({}, '0');
    });
}
$.fn.tofelDesResultDataReset = function() {
    $('.tofel-destinations-list--body').empty();
    tdResultCurrentPageNumber = 1;
    tofelDestinationsResultList = [];
    tdsPaginationInitFlag = true;
    tdsPageNumber = 1;
}
$('#tofelSearchButton').on('click', function() {
    tdFilterText = $('#tofelSearchInput').val();
    $.fn.tofelDesResultDataReset();
    $.fn.loadTdResults();
});
// $('#tofelSearchLoadMore').on('click', function(e) {
//     tdResultCurrentPageNumber = tdResultCurrentPageNumber + 1;
//     $.fn.loadTdResults(tdResultCurrentPageNumber);
// });

$('#tofelSearchInput').on('keypress', function(event) {
    if (event.keyCode == 13) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            tdFilterText = $(this).val();
            $.fn.tofelDesResultDataReset();
            $.fn.loadTdResults();
        }
    }
});
$(window).on('load', function() {
    var searchDataPathElement = document.querySelector(".tofel-destinations-search__select__container");
    if (searchDataPathElement) {
		const urlstring = window.location.href;
        const pathurl = new URL(urlstring);
        const locationParam = pathurl.searchParams.get("location");
        const institutionParam = pathurl.searchParams.get("institution");
        tofelDestinationsApi = $('.tofel-destinations-result--data-container').data("td-result-path");
		if(locationParam || institutionParam){
			if(institutionParam){
			tdFilterText = institutionParam;
			tofelSearchType='name';
			$("input[name='tofelSearchType']:radio[value='name']").attr("checked", "checked");
			} else if (locationParam){
			tdFilterText = locationParam;
			tofelSearchType='loc';
			$("input[name='tofelSearchType']:radio[value='loc']").attr("checked", "checked");
			}
			$('#tofelSearchInput').val(tdFilterText);
            $.fn.tofelDesResultDataReset();
            $.fn.loadTdResults();
		} else{
			$("input[name='tofelSearchType']:radio[value='name']").attr("checked", "checked");
		}
    }
})
$("input[name='tofelSearchType']").click(function() {
    if ($("input[name='tofelSearchType']:checked").val() == 'name') {
        tofelSearchType='name';
    } else if ($("input[name='tofelSearchType']:checked").val() == 'loc') {
        tofelSearchType='loc';
    }
});