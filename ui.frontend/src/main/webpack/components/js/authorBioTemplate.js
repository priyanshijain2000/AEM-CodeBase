var authorResultPageSize = 10;
var researchAuthorAPI = "";
var authorName = "";
var authorResultsStartCount = 0;
var abtPageNumber = 1;
var abtPaginationInitFlag = true;
var abtPaginationScrollInitFlag = false;
$(window).on("load", function() {
    var authorBioTemplate = document.querySelector(".author-bio-template");
    if (authorBioTemplate) {
        var resultDataContainer = authorBioTemplate.querySelector(".research-result--data-container");
        researchAuthorAPI = $(resultDataContainer).data("research-result-path");
        authorName = $(resultDataContainer).data("author-name");
        $.fn.loadAuthorDataFromAPI();
    }
})
function populateAuthorBioTemplateData(result, nr) {
    var authorBioTemplate = document.querySelector(".author-bio-template");
    if(authorBioTemplate) {
        if(nr > authorResultPageSize) {
            $('.abtPagination').removeClass('d-none');
        } else {
            $('.abtPagination').addClass('d-none');
        }
        $("#authorBioResults").empty();
        if (result && result.length > 0) {
            $('#authorBioTemplateHead').removeClass('d-none');
            $('#authorBioResults').show();
            for (let i = 0; i < result.length; i++) {
                var row = '<div class="result">';

                if (result[i]["docType"]) {
                    row += '<div class="doc-type">' + result[i]["docType"] + '</div>';
                }
                if (result[i]["heading"]) {
                    row += '<h3><a href="' + result[i]["url"] + '" target="_self">' + result[i]["heading"] + '</a></h3>';
                }
                row += '<div class="result-infomation">';
                var authorsName = '';
                if (result[i]["authors"] && result[i]["authors"].length > 0) {
                    result[i]["authors"].forEach((author, index) => {
                        if (index != result[i]["authors"].length - 1)
                            authorsName += author["bio"] != null ? '<a href="' + author["bio"] + '">' + author["name"] + '</a>' + '; ' : '<span>' + author["name"] + '; ' + '</span>';
                        else
                            authorsName += author["bio"] != null ? '<a href="' + author["bio"] + '">' + author["name"] + '</a>' : '<span>' + author["name"] + '</span>';
                    });
                }
                if (authorsName != '') {
                    row += '<div><strong>Author(s):</strong>' + authorsName + '</div>';
                }
                if (result[i]["year"]) {
                    row += '<div><strong>Publication Year:</strong><span>' + result[i]["year"] + '</span></div>';
                }
                if (result[i]["source"]) {
                    row += '<div><strong>Source:</strong><span>' + result[i]["source"] + '</span></div>';
                }
                row += '</div>';
                row += '</div>';

                $(row).appendTo("#authorBioResults");
            }
        }
    } 
}
$.fn.abtScrollTop = function() {
    $('html, body').animate({
        scrollTop: $('.research-results--wrap').offset().top - 30,
    });
};
$.fn.loadAuthorDataFromAPI = function(pageNumber, page) {
    var researchAuthorFinalAPI = '';
    if(pageNumber) {
        researchAuthorFinalAPI = researchAuthorAPI + '?text=' + authorName + '&applyFilter=authors:"' + authorName + '"' + '&resultsPerPage=' + authorResultPageSize + '&resultsStart=' + pageNumber;
    } else {
        researchAuthorFinalAPI = researchAuthorAPI + '?text=' + authorName + '&applyFilter=authors:"' + authorName + '"' + '&resultsPerPage=' + authorResultPageSize + '&resultsStart= "0" ';
    }
    $.getJSON(researchAuthorFinalAPI, function(data) {
        var researchResultTotalCount = data.numberOfResults;
        var researchResultList = data.results;
        if (researchResultList) {
            populateAuthorBioTemplateData(researchResultList, researchResultTotalCount);
        }else {
            populateAuthorBioTemplateData({}, '0');
        }
        if(abtPaginationInitFlag && researchResultTotalCount > authorResultPageSize) {
            $.fn.abtInitPagination(researchResultTotalCount);
            abtPaginationInitFlag = false;
        }
        if(abtPaginationScrollInitFlag) {
            $.fn.abtScrollTop();
            abtPaginationScrollInitFlag = false;
            abtPageNumber = page;
        }
        populateAuthorBioTemplateData(researchResultList, researchResultTotalCount);
    }).fail(function() {
        populateAuthorBioTemplateData({}, '0');
    });
}
$.fn.abtInitPagination = function(totalResult) {
    var _totalPage = Math.ceil(totalResult / authorResultPageSize);
    $('.abtPagination').litePagination({
        currentPage  : 1,
        maxPage: _totalPage,
        pageString   : '{currentPage}',
        reInit: false,
        paged : function (page) {
            $.fn.loadAuthorDataFromAPI((page - 1) * authorResultPageSize, page);
            if(page != abtPageNumber) {
                abtPaginationScrollInitFlag = true;
            }
        } 
    });
}