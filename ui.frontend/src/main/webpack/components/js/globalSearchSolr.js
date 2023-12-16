// Reference Solar API URL
// https://www-tr.ets.org/sitesearch/etsorg/search?text=test&brand=all&resultsPerPage=10&resultsStart=10

var gssPaginationInitFlag = true;
var gssPaginationReInitFlag = false;
var gssPaginationScrollInitFlag = false;
var gssPageNumber = 1;
var gssResultPageSize = 10;
var gssTotalResult = 0;
var gssSearchValue = '';
var gssBaseAPIurl = '';
var finalGssResultApi = '';

var gssResultList = [];
var gssQLResultList = [];


var gssFilterByValue = '';
var gssFilterSelect = '';
var gssFilterFirstValue = '';
var initSelctValues = [];

function populateGssResultData(result, totalResult, PageStartFrom) {
    $('#global-search-solr-result').addClass('d-none');
    $('.global-search-no-keyword-msg').removeClass('d-none');
    $('.gss-result-om').addClass('d-none');
    $('#gss-filter-wrap').addClass('d-none');
    $('#gss-have-results').removeClass('d-none').html(totalResult + ' Results for ' + "'" + gssSearchValue + "'");

    
    if(totalResult >= gssResultPageSize) {
        $('.gssPagination').removeClass('d-none');
    } else {
        $('.gssPagination').addClass('d-none');
    }

    $('#global-search-solr-result').empty();
    if (result && result.length > 0) {
        $('#gss-filter-wrap').removeClass('d-none');
        $('#global-search-solr-result').removeClass('d-none');
        $('.global-search-no-keyword-msg').addClass('d-none');
        for (let i = 0; i < result.length; i++) {
            var row = '<div class="result"><div>';

            row += '<div class="number">' + (PageStartFrom + i) + '.</div>';
            if (result[i]["title"]) {
                row += '<h2><a class="global-search-data-layer" tabindex="-1" href="' + result[i]["url"] + '" target="_self">' + result[i]["title"] + '</a></h2>';
            }
            if (result[i]["shortDescription"]) {
                row += '<p>' + result[i]["shortDescription"] + '</p>';
            }
            if (result[i]["url"]) {
                row += '<p><a class="global-search-data-layer" aria-label="Learn more about ' + result[i]["title"] + '" href="' + result[i]["url"] + '" target="_self">' + result[i]["url"] + '</a></p>';
            }
            row += '</div></div>';

            $(row).appendTo("#global-search-solr-result");
        }
        
		setTimeout(() => {
			window.adobeDataLayer = window.adobeDataLayer || [];
			$('#global-search-solr-result h2 a').on('click', function() {
				var clickUrl = $(this).attr('href');
				var clickName = $(this).text() == "" ? "NA" : $(this).text();				
				window.adobeDataLayer.push({
					"pageData": {
						"searchDetail": {
							"SearchClickURL": clickUrl,
							"SearchClickName": clickName
						}
					}
				});
			});
			
			$('#global-search-solr-result p a').on('click', function() {
				var clickUrl = $(this).attr('href');
				var urlText = $(this).parent('p').parent('div').children('h2').children('a').text();
				var clickName = urlText == "" ? "NA" : urlText;
				window.adobeDataLayer.push({
					"pageData": {
						"searchDetail": {
							"SearchClickURL": clickUrl,
							"SearchClickName": clickName
						}
					}
				});
			});
	        $('a.global-search-data-layer').on('click', function(){
			    var resultString = $(".gss-result-heading").text();
			    var resultArray = resultString.split(" ");
			    var url = $(this).attr('href');
			    console.log("Data layer for search ",url);
				dataLayer.push({
			        "event" : "search",
			        "internal_search_term" : $('#gssResultsInput').val(),
			        "search_results_count" : resultArray[0],
			        "result_url_selected" : url
			    });
			});
		}, 500);

    } else {
        $('#global-search-solr-result').addClass('d-none');
        if (gssSearchValue && gssSearchValue != '') {
            $('.gss-result-om').removeClass('d-none');
            $('#gss-filter-wrap').removeClass('d-none');
            $('.global-search-no-keyword-msg').addClass('d-none');
        } else {
            $('.global-search-no-keyword-msg').removeClass('d-none');
            $('#gss-have-results').addClass('d-none');
        }

    }
	window.adobeDataLayer.push({
		"pageData": {
			"searchDetail": {
				"searchResults": totalResult
			}
		}
    });
	window.dataLayer.push({
	  "event": "view_search_results",
	  "search_term": gssSearchValue
	});
}

function populateGssQuickLinkResultData(result) {
    $('#quick-links-global-search-solr-result').empty();
    if (result && result.length > 0) {
        $('#quick-links-global-search-solr-result').removeClass('d-none');
        $('.quick-links-gss-title').removeClass('d-none');
        for (let i = 0; i < result.length; i++) {
            var row = '<div class="result"><div>';

            if (result[i]["title"]) {
                row += '<h4><a href="' + result[i]["url"] + '" class="global-search-data-layer" target="_self">' + result[i]["title"] + '</a></h4>';
            }
            if (result[i]["description"]) {
                row += '<p>' + result[i]["description"] + '</p>';
            }
            if (result[i]["url"]) {
                row += '<p><a href="' + result[i]["url"] + '" class="global-search-data-layer" target="_self">' + result[i]["url"] + '</a></p>';
            }
            row += '</div></div>';

            $(row).appendTo("#quick-links-global-search-solr-result");
        }
        setTimeout(function() {
	        $('a.global-search-data-layer').on('click', function(){
			    var resultString = $(".gss-result-heading").text();
			    var resultArray = resultString.split(" ");
			    var url = $(this).attr('href');
				dataLayer.push({
			        "event" : "search",
			        "internal_search_term" : $('#gssResultsInput').val(),
			        "search_results_count" : resultArray[0],
			        "result_url_selected" : url
			    });
			});
		}, 500);
    } else {
        $('#quick-links-global-search-solr-result').addClass('d-none');
        $('.quick-links-gss-title').addClass('d-none');
    }

}

$.fn.gssScrollTop = function() {
    $('html, body').animate({
        scrollTop: $('#gss-results-wrap').offset().top - 30,
    });
};
$.fn.gssFilterFn = function() {
    var $gssfilterselect = $("#gss-filter-select");
    if (gssFilterSelect) {
        $gssfilterselect.select2('destroy').select2();
    }
    gssFilterSelect = $gssfilterselect.select2({
        minimumResultsForSearch: -1,
        selectionCssClass: "singleselect-dropdown-without-checkbox",
        dropdownCssClass: "singleselect-dropdown-without-checkbox",
        templateSelection: function(data) {
            gssFilterByValue = data.id;
            return data.text;
        }
    });
    var gssAriaLabel = $("#gss-filter-select").attr('aria-label');
    setTimeout(() => {
        var setGssAriaLabel = $('#gss-filter-wrap').find('.select2-selection');
        if($('#gss-filter-select').hasClass("select2-hidden-accessible") && setGssAriaLabel.length == 1) {
            setGssAriaLabel.attr('aria-label', gssAriaLabel);
            setGssAriaLabel.removeAttr('aria-labelledby');
            $('#gss-filter-select').removeAttr("aria-label");
        }
    }, 2000);
    $gssfilterselect.on("change", function() {
        $.fn.gssFilterOnChange();
    });
};
$.fn.gssFilterOnChange = function() {
    $.fn.gssSetParams();
    $.fn.gssHandlingAPI(0);
    gssPaginationInitFlag = true;
    gssPageNumber = 1;
};
$.fn.gssSetParams = function() {
    var queryParams = new URLSearchParams(window.location.search);
    if (gssSearchValue && gssSearchValue != '') {
        queryParams.set("text", gssSearchValue);
    } else {
        queryParams.delete("text");
    }
    if (gssFilterByValue && gssFilterByValue != '') {
        queryParams.set("brand", gssFilterByValue);
        if (!gssSearchValue && gssSearchValue == '') {
            queryParams.delete("brand");
        }
    } else {
        queryParams.delete("brand");
    }
    if (gssSearchValue && gssSearchValue != '') {
        window.history.replaceState({}, document.title, "?" + queryParams.toString());
    }
};
$.fn.gssReSetParams = function() {
    gssFilterByValue = gssFilterFirstValue;
    $("#gss-filter-select").val(gssFilterByValue);
    $.fn.gssSetParams();
    if (gssFilterSelect) {
        $("#gss-filter-select").val(gssFilterFirstValue).trigger("change");
    }
};

$.fn.gssinitPagination = function(totalResult) {
    var _totalPage = Math.ceil(totalResult / gssResultPageSize);
    if(gssPaginationReInitFlag) {
        $('.gssPagination').litePagination('destroy');
        $('.gssPagination').litePagination({
            currentPage  : 1,
            // link_string   : '/?pages={page_number}',
            maxPage: _totalPage,
            pageString   : '{currentPage}',
            reInit: true,
            paged : function (page) {
                $.fn.gssHandlingAPI((page - 1) * gssResultPageSize, page);
                if(page != gssPageNumber) {
                    gssPaginationScrollInitFlag = true;
                }
            }
        });
    } else {
        $('.gssPagination').litePagination({
            currentPage  : 1,
            // link_string   : '/?pages={page_number}',
            maxPage: _totalPage,
            pageString   : '{currentPage}',
            reInit: false,
            paged : function (page) {
                $.fn.gssHandlingAPI((page - 1) * gssResultPageSize, page);
                if(page != gssPageNumber) {
                    gssPaginationScrollInitFlag = true;
                }
            } 
        });
        gssPaginationReInitFlag = true;
    }
    
};
$.fn.gssHandlingAPI = function(PageStartFrom, page) {
    finalGssResultApi = '';
    if (PageStartFrom) {
        finalGssResultApi = gssBaseAPIurl + '?text=' + gssSearchValue + '&brand=' + gssFilterByValue + '&resultsPerPage=' + gssResultPageSize + '&resultsStart=' + PageStartFrom;
    } else {
        finalGssResultApi = gssBaseAPIurl + '?text=' + gssSearchValue + '&brand=' + gssFilterByValue + '&resultsPerPage=' + gssResultPageSize + '&resultsStart=0';
        PageStartFrom = 0;
    }

    if (finalGssResultApi && finalGssResultApi != '') {
        $.getJSON(finalGssResultApi, function(data) {
            gssTotalResult = data.numberOfResults;
            gssResultList = data.results;
            gssQLResultList = data.quickLinks;
            if (gssQLResultList) {
                gssQLResultList.sort(function(a, b) {
                    return (a.title > b.title) ? 1 : ((a.title < b.title) ? -1 : 0);
                });
                populateGssQuickLinkResultData(gssQLResultList);
            }

            if (gssResultList) {
                gssResultList.sort(function(a, b) {
                    return (a.title > b.title) ? 1 : ((a.title < b.title) ? -1 : 0);
                });
                populateGssResultData(gssResultList, gssTotalResult, PageStartFrom + 1);
                if(gssPaginationInitFlag && gssResultList.length != 0) {
                    $.fn.gssinitPagination(gssTotalResult);
                    gssPaginationInitFlag = false;
                }
                // console.log(gssPaginationScrollInitFlag);
                if(gssPaginationScrollInitFlag) {
                    $.fn.gssScrollTop();
                    gssPaginationScrollInitFlag = false;
                    gssPageNumber = page;
                }
                
            } else {
                populateGssResultData({}, '0');
            }

        }).fail(function() {
            populateGssResultData({}, '0');
            populateGssQuickLinkResultData({});
        });
    }
};
$('#gssResultsButton').on('click', function() {
    var inputElement = document.querySelector('#gssResultsInput');
    var inputElementFocus = document.querySelector('#gssResultsButton');
    inputElementFocus.setAttribute("aria-describedby","searchcompleted");
    gssSearchValue = $(inputElement).val();
    $.fn.gssReSetParams();
});

$('#gssResultsInput').on('focus', function() {
        var inputElement = document.querySelector('#gssResultsButton');
        inputElement.removeAttribute("aria-describedby");
});

$('#gssResultsInput').on('keypress', function(event) {
    if (event.keyCode == 13) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            gssSearchValue = $(this).val();
            $.fn.gssReSetParams();
        }
    }
});

$("#prospects_form").submit(function(e) {
    e.preventDefault();
});

$(window).on('load', function() {
    const gssurlstring = window.location.href;
    const gsspathurl = new URL(gssurlstring);
    gssSearchValue = gsspathurl.searchParams.get("text");
    var queryFilter = gsspathurl.searchParams.get("brand");
    var gssfilterselectId = document.querySelector('#gss-filter-select');

    if (gssfilterselectId) {
        gssFilterFirstValue = gssfilterselectId.options[0].value;
        if (queryFilter) {
            initSelctValues = $('#gss-filter-select option').map(function() {
                return this.value;
            }).get();
            if ($.inArray(queryFilter, initSelctValues) >= 0) {
                gssFilterByValue = queryFilter;
            } else {
                gssFilterByValue = gssfilterselectId.options[0].value;
            }
            $("#gss-filter-select").val(gssFilterByValue);

        }
        $.fn.gssFilterFn();
    }
    var gssDataPathElement = document.querySelector(".global-search--data-container");
    if (gssDataPathElement) {
        gssBaseAPIurl = $(gssDataPathElement).data("global-solr-path");
        if (gssSearchValue && gssSearchValue != '') {
            $.fn.gssHandlingAPI();
            $("#gssResultsInput").val(gssSearchValue);
        }
    }
});
