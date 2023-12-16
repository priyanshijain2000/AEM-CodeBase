var allProductsApi = '/src/main/webpack/components/js/allproducts.json';
var allPPaginationReInitFlag = false;
var allProductsPageSize = 10;
var allProductsList = [];
var orginalAllProductsList = [];
var productCategoryList = [];
var allProductsCurrentPageNumber = 1;
var productFilterText = '';
var categoryFilterText = '';
var allProductsLabel = '';
if ($(window).width() <= 768) {
    allProductsPageSize = 5;
}

function populateAllProductsResultData() {
    const testInfoResult = document.querySelector('.all-products__results');
    const testInfoResultData = document.querySelector('.all-products__input__container__resultsData');
    $(testInfoResultData).empty();
    const headingtestinfo = document.createElement('div');
    headingtestinfo.className = 'all-products__input__container__resultsData__text';
    if (productFilterText && productFilterText != '') {
        headingtestinfo.innerHTML = ' Results for ' + "'" + productFilterText + "'";
    } else {
        headingtestinfo.innerHTML = allProductsLabel;
    }
    testInfoResultData.append(headingtestinfo);
    const testInfoCenters = testInfoResult.querySelector('.all-products__results__description');
    $(testInfoCenters).empty();

    $.fn.sortProductsResults('productName', true);
    
    if (allProductsList.length === 0) {
        $('.noProduct').removeClass('d-none');
        $('#dataFilter').addClass('d-none');

    } else {
        $('.noProduct').addClass('d-none');
        $('#dataFilter').removeClass('d-none');
    }

    for (let cardCount = (allProductsCurrentPageNumber * allProductsPageSize) - (allProductsPageSize); cardCount < allProductsCurrentPageNumber * allProductsPageSize; cardCount++) {
        if (allProductsList[cardCount]) {
            const cardContainer = document.createElement('div');
            cardContainer.className = 'all-products__results__description__card';

            const cardNumberDescription = document.createElement('div');
            cardNumberDescription.className = 'all-products__results__description__card__numwrapper';


            const cardDescription = document.createElement('div');
            cardDescription.className = 'all-products__results__description__card__value';

            const heading = document.createElement('a');
            const headingSpan = document.createElement('span');
            heading.className = 'heading5';
            headingSpan.className = 'heading5';
            heading.href = allProductsList[cardCount].productLink;
            heading.target = allProductsList[cardCount].newTab == 'true' ? '_blank' : '_self';
            heading.innerHTML = allProductsList[cardCount].productName;
            headingSpan.innerHTML = allProductsList[cardCount].productName;
            if(allProductsList[cardCount].productLink != '') {
                cardDescription.append(heading);
            } else {
                cardDescription.append(headingSpan);
            }
            


            const description = document.createElement('div');
            description.className = 'all-products__results__description__card__value__text body-text';
            const locationtitle = allProductsList[cardCount].productDescription;
            description.innerHTML = locationtitle;


            cardDescription.append(description);
            const pagelink = document.createElement('div');
            pagelink.innerHTML = '<label class="all-products__results__description__card__value__link body-text"><strong>Categories:</strong>&nbsp;&nbsp ' + allProductsList[cardCount].categories.split(',').join(', ') + ' </label>';
            cardDescription.append(pagelink);

            cardContainer.append(cardNumberDescription);
            cardContainer.append(cardDescription);

            testInfoCenters.append(cardContainer);
            $('.all-products__results').css("display", "block");

        } else {
            break;
        }
    }
}

function charConvert(arguments) {
    var chars = ["™", "©", "Û", "®", "ž", "Ü", "Ÿ", "Ý", "$", "Þ", "%", "¡", "ß", "¢", "à", "£", "á", "À", "¤", "â", "Á", "¥", "ã", "Â", "¦", "ä", "Ã", "§", "å", "Ä", "¨", "æ", "Å", "©", "ç", "Æ", "ª", "è", "Ç", "«", "é", "È", "¬", "ê", "É", "­", "ë", "Ê", "®", "ì", "Ë", "¯", "í", "Ì", "°", "î", "Í", "±", "ï", "Î", "²", "ð", "Ï", "³", "ñ", "Ð", "´", "ò", "Ñ", "µ", "ó", "Õ", "¶", "ô", "Ö", "·", "õ", "Ø", "¸", "ö", "Ù", "¹", "÷", "Ú", "º", "ø", "Û", "»", "ù", "Ü", "@", "¼", "ú", "Ý", "½", "û", "Þ", "€", "¾", "ü", "ß", "¿", "ý", "à", "‚", "À", "þ", "á", "ƒ", "Á", "ÿ", "å", "„", "Â", "æ", "…", "Ã", "ç", "†", "Ä", "è", "‡", "Å", "é", "ˆ", "Æ", "ê", "‰", "Ç", "ë", "Š", "È", "ì", "‹", "É", "í", "Œ", "Ê", "î", "Ë", "ï", "Ž", "Ì", "ð", "Í", "ñ", "Î", "ò", "‘", "Ï", "ó", "’", "Ð", "ô", "“", "Ñ", "õ", "”", "Ò", "ö", "•", "Ó", "ø", "–", "Ô", "ù", "—", "Õ", "ú", "˜", "Ö", "û", "™", "×", "ý", "š", "Ø", "þ", "›", "Ù", "ÿ", "œ", "Ú"];
    var codes = ["&trade;", "&copy;", "&#219;", "&reg;", "&#158;", "&#220;", "&#159;", "&#221;", "&#36;", "&#222;", "&#37;", "&#161;", "&#223;", "&#162;", "&#224;", "&#163;", "&#225;", "&Agrave;", "&#164;", "&#226;", "&Aacute;", "&#165;", "&#227;", "&Acirc;", "&#166;", "&#228;", "&Atilde;", "&#167;", "&#229;", "&Auml;", "&#168;", "&#230;", "&Aring;", "&#169;", "&#231;", "&AElig;", "&#170;", "&#232;", "&Ccedil;", "&#171;", "&#233;", "&Egrave;", "&#172;", "&#234;", "&Eacute;", "&#173;", "&#235;", "&Ecirc;", "&#174;", "&#236;", "&Euml;", "&#175;", "&#237;", "&Igrave;", "&#176;", "&#238;", "&Iacute;", "&#177;", "&#239;", "&Icirc;", "&#178;", "&#240;", "&Iuml;", "&#179;", "&#241;", "&ETH;", "&#180;", "&#242;", "&Ntilde;", "&#181;", "&#243;", "&Otilde;", "&#182;", "&#244;", "&Ouml;", "&#183;", "&#245;", "&Oslash;", "&#184;", "&#246;", "&Ugrave;", "&#185;", "&#247;", "&Uacute;", "&#186;", "&#248;", "&Ucirc;", "&#187;", "&#249;", "&Uuml;", "&#64;", "&#188;", "&#250;", "&Yacute;", "&#189;", "&#251;", "&THORN;", "&#128;", "&#190;", "&#252", "&szlig;", "&#191;", "&#253;", "&agrave;", "&#130;", "&#192;", "&#254;", "&aacute;", "&#131;", "&#193;", "&#255;", "&aring;", "&#132;", "&#194;", "&aelig;", "&#133;", "&#195;", "&ccedil;", "&#134;", "&#196;", "&egrave;", "&#135;", "&#197;", "&eacute;", "&#136;", "&#198;", "&ecirc;", "&#137;", "&#199;", "&euml;", "&#138;", "&#200;", "&igrave;", "&#139;", "&#201;", "&iacute;", "&#140;", "&#202;", "&icirc;", "&#203;", "&iuml;", "&#142;", "&#204;", "&eth;", "&#205;", "&ntilde;", "&#206;", "&ograve;", "&#145;", "&#207;", "&oacute;", "&#146;", "&#208;", "&ocirc;", "&#147;", "&#209;", "&otilde;", "&#148;", "&#210;", "&ouml;", "&#149;", "&#211;", "&oslash;", "&#150;", "&#212;", "&ugrave;", "&#151;", "&#213;", "&uacute;", "&#152;", "&#214;", "&ucirc;", "&#153;", "&#215;", "&yacute;", "&#154;", "&#216;", "&thorn;", "&#155;", "&#217;", "&yuml;", "&#156;", "&#218;"];

    for(x = 0; x < chars.length; x++) {

        arguments = arguments.replace(chars[x], codes[x]);
    }
    return arguments;
}


$('#productSearchButton').on('click', function () {
    var inputElement = document.querySelector('.all-products__select__container input');
    productFilterText = $(inputElement).val();
    productFilterText = $.fn.allProdHtmlEncode(productFilterText);
    $.fn.filterSchoolAllproductList();
    populateAllProductsResultData();
    $.fn.allProductsInitPagination();
});

$.fn.allProdHtmlEncode = function (searchTerm) {
    var txt = document.createElement("textarea");
    txt.innerText = searchTerm;
    return txt.innerHTML.split("<br>").join("\n");
};

$.fn.filterSchoolAllproductList = function () {
    allProductsCurrentPageNumber = 1;
    if(productFilterText && productFilterText != '') {
        var inputValue = productFilterText.replace(/[^\w\s]/gi, '').toString().trim().toLowerCase();
        allProductsList = orginalAllProductsList.filter(state => state.searchTitle.toLowerCase().indexOf(charConvert(inputValue)) >= 0);
        if(categoryFilterText && categoryFilterText != '' && categoryFilterText != 'All Categories') {
            allProductsList = allProductsList.filter(state => state.categories.replace(/&amp;/g, '').replace(/\s+/g, '').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').toLowerCase().split(',').includes(categoryFilterText.replace(/&amp;/g, ' & ').replace(/\s+/g, '').toString().toLowerCase()));

        }
    } else {
        allProductsList = orginalAllProductsList;
        if (categoryFilterText && categoryFilterText != '' && categoryFilterText != 'All Categories') {
            allProductsList = allProductsList.filter(state => state.categories.replace(/&amp;/g, '').replace(/\s+/g, '').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').toLowerCase().split(',').includes(categoryFilterText.replace(/&amp;/g, ' & ').replace(/\s+/g, '').toString().toLowerCase()));

        }
    }
};


$.fn.loadCategoryList = function (categoryList) {
    const customselectAllProductsFilter = document.querySelector('.customselectAllProductsFilter');
    if (customselectAllProductsFilter) {
        if (categoryList) {
            $.fn.sortcategoryResults();
            $.each(["All Categories", ...categoryList], function (index, value) {
                $('.customselectAllProductsFilter .all-products-dropdown').append('<option value="' + value + '" data-category="' + value + '">' + value + '</option>');
            });
            $(".all-products-dropdown").select2({
                placeholder: $(".all-products-dropdown").data("placeholder"),
                minimumResultsForSearch: Infinity,
                selectionCssClass: "singleselect-withoutsearch",
                dropdownCssClass: "singleselect-withoutsearch",
            });
            var allCateAriaLabel = $(".all-products-dropdown").attr('aria-label');
            setTimeout(() => {
                var setallCateAriaLabel = $('.customselectAllProductsFilter').find('.select2-selection');
                if ($('.all-products-dropdown').hasClass("select2-hidden-accessible") && setallCateAriaLabel.length == 1) {
                    setallCateAriaLabel.attr('aria-label', allCateAriaLabel);
                    setallCateAriaLabel.removeAttr('aria-labelledby');
                    $('.all-products-dropdown').removeAttr("aria-label");
                }
            }, 2000);

            $('.all-products-dropdown').on('change', () => {
                categoryFilterText = $('.all-products-dropdown option:selected').text();
                $.fn.filterSchoolAllproductList();
                populateAllProductsResultData();
                $.fn.allProductsInitPagination();
            });

        }
    }
};

$.fn.allProductsInitPagination = function() {
    var _totalPage = Math.ceil(allProductsList.length / allProductsPageSize);
    if(_totalPage > 1) {
        $('.allProductsPagination').removeClass('d-none');
        if(allPPaginationReInitFlag) {
            $('.allProductsPagination').litePagination('destroy');
            $('.allProductsPagination').litePagination({
                currentPage  : 1,
                // link_string   : '/?pages={page_number}',
                maxPage: _totalPage,
                pageString   : '{currentPage}',
                reInit: true,
                paged : function (page) {
                    allProductsCurrentPageNumber = page;
                    populateAllProductsResultData();
                    $.fn.scrollallproductsTable();
                }
            });
        } else {
            $('.allProductsPagination').litePagination({
                currentPage  : 1,
                // link_string   : '/?pages={page_number}',
                maxPage: _totalPage,
                pageString   : '{currentPage}',
                reInit: false,
                paged : function (page) {
                    allProductsCurrentPageNumber = page;
                    populateAllProductsResultData();
                    $.fn.scrollallproductsTable();
                } 
            });
            allPPaginationReInitFlag = true;
        }
    } else {
        $('.allProductsPagination').addClass('d-none');
    }
    
};

function loadAllProducts() {
    $.getJSON(allProductsApi, function (data) {
        allProductsList = data['ets-products'];
        orginalAllProductsList = data['ets-products'];
        productCategoryList = data['category-list'];
        $.fn.loadCategoryList(productCategoryList);
        populateAllProductsResultData();
        $.fn.allProductsInitPagination();
    });
}

$(window).on('load', function () {
    var searchDataPathElement = document.querySelector(".all-products__input__container");
    if (searchDataPathElement) {
        var searchDataPath = $(searchDataPathElement).attr("data-cf-path");
        allProductsLabel = $(searchDataPathElement).attr("data-products-text");
        if (searchDataPath && searchDataPath != '') {
            allProductsApi = '/bin/ets/fetchProducts.json?path=' + searchDataPath;
            loadAllProducts();
        }
    }
});


$.fn.scrollallproductsTable = function () {
    const allProductsList = document.querySelector('.all-products__input__container--resultDisplay');
    if (allProductsList) {
        $(window).scrollTop($(allProductsList).offset().top);
    }
};

$(function () {
    //press enter on text area..
    $('#searchField').keypress(function (e) {
        var key = e.which;
        if (key == 13) // the enter key code
        {
            $('#productSearchButton').click();
            return false;
        }
    });

});

function replaceSpecialCharacter(str, map) {
    for (key in map) {
        str = str.replaceAll(key, map[key]);
    }
    return str;
}

$.fn.sortProductsResults = function (prop, asc) {
    var specialCharObj = {
        '<sup>&reg;</sup>': '',
        '<sup>&trade;</sup>': '',
        '<sup>&copy;</sup>': ''
    };
    allProductsList.sort(function (a, b) {
        if (asc) {
            return (replaceSpecialCharacter(a[prop].toLowerCase(), specialCharObj).replace(/[`~!@#$%^&*()_|+\-–=?;:'",.<>\{\}\[\]\\\/]/gi, '') > replaceSpecialCharacter(b[prop].toLowerCase(), specialCharObj).replace(/[`~!@#$%^&*()_|+\-–=?;:'",.<>\{\}\[\]\\\/]/gi, '')) ? 1 : ((replaceSpecialCharacter(a[prop].toLowerCase(), specialCharObj).replace(/[`~!@#$%^&*()_|+\-–=?;:'",.<>\{\}\[\]\\\/]/gi, '') < replaceSpecialCharacter(b[prop].toLowerCase(), specialCharObj).replace(/[`~!@#$%^&*()_|+\-–=?;:'",.<>\{\}\[\]\\\/]/gi, '')) ? -1 : 0);
        } else {
            return (replaceSpecialCharacter(b[prop].toLowerCase(), specialCharObj).replace(/[`~!@#$%^&*()_|+\-–=?;:'",.<>\{\}\[\]\\\/]/gi, '') > replaceSpecialCharacter(a[prop].toLowerCase(), specialCharObj).replace(/[`~!@#$%^&*()_|+\-–=?;:'",.<>\{\}\[\]\\\/]/gi, '')) ? 1 : ((replaceSpecialCharacter(b[prop].toLowerCase(), specialCharObj).replace(/[`~!@#$%^&*()_|+\-–=?;:'",.<>\{\}\[\]\\\/]/gi, '') < replaceSpecialCharacter(a[prop].toLowerCase(), specialCharObj).replace(/[`~!@#$%^&*()_|+\-–=?;:'",.<>\{\}\[\]\\\/]/gi, '')) ? -1 : 0);
        }
    });
};

$.fn.sortcategoryResults = function () {
    productCategoryList.sort(function (a, b) {
        return (a.toLowerCase() > b.toLowerCase()) ? 1 : ((a.toLowerCase() < b.toLowerCase()) ? -1 : 0);
    });
};
