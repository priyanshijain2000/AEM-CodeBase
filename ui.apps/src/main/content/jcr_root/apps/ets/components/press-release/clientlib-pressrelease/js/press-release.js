$(function () {
    var acceptancePaginationReInitFlag = false;
    var pressreleasePageSize = 6;
    var isDisplayDate = $("#press-release-group").data('display-date');
    if (screen.width <= 768) {
        pressreleasePageSize = 3;
    }
    function updateCards(cards) {
        $(".press-release-cards").empty();
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].title) {
                var card = '';
                var cardDate = new Date(cards[i].date).toLocaleDateString('en-us', { month: "long", year: "numeric", day: "numeric" });
                var cardImage = cards[i].image ? cards[i].image : "/content/dam/ets-org/general/placeholders/img-plchldr-featured-news.jpg";
                if (isDisplayDate) {
                    card = ' <div class="card press-release-cards-container info-card-translucent"><img src="' + cardImage + '" class="card-img-top" alt="' + cards[i].alt + '"><div class="card-body"><p class="body-text press-release-date">' + cardDate + '</p><div class="heading5"><a href="' + cards[i].path + '">' + cards[i].title + '</a></div><div class="card-heading-seperator"><span class="card-heading-seperator-stroke-big"></span><span class="card-heading-seperator-stroke-small"></span></div><p class="press-release-cards-container-content body-text">' +
                        cards[i].description + '</p> </div><div class="card-footer"> <div class="press-release-button-band m-0"><a class="cta-btn-primary" href="' +
                        cards[i].path + '" aria-label="Read More About '+cards[i].title+'">Read more</a></div></div></div>';
                }
                else {
                    card = ' <div class="card press-release-cards-container info-card-translucent"><img src="' + cardImage + '" class="card-img-top" alt="' + cards[i].alt + '"><div class="card-body"><div class="heading5"><a href="' + cards[i].path + '">' + cards[i].title + '</a></div><div class="card-heading-seperator"><span class="card-heading-seperator-stroke-big"></span><span class="card-heading-seperator-stroke-small"></span></div><p class="press-release-cards-container-content body-text">' +
                        cards[i].description + '</p> </div><div class="card-footer"> <div class="press-release-button-band m-0"><a class="cta-btn-primary" href="' +
                        cards[i].path + '" aria-label="Read More About '+cards[i].title+'">Read more</a></div></div></div>';
                }
                $(card).appendTo(".press-release-cards");
            }
        }
        
    }
    function initiateLoadmore(cards) {
        updateCards(cards);
        // Start Rellax
        // var rellax = new Rellax('.rellax');
        // // Destroy and create again parallax with previous settings
        // setTimeout(function () {
        //     rellax.refresh();
        // }, 1000);
    }
    function scrollTopPressReleaseCards() {
        const pressreleasefilters = document.querySelector('.press-release-filters');
        if (pressreleasefilters) {
            $(window).scrollTop($(pressreleasefilters).offset().top - 50);
        }
    };
    function pressreleaseInitPagination(cards) {
        var _totalPage = Math.ceil(cards.length / pressreleasePageSize);
        if(_totalPage > 1) {
            $('.pressreleasePagination').removeClass('d-none');
            if(acceptancePaginationReInitFlag) {
                $('.pressreleasePagination').litePagination('destroy');
                $('.pressreleasePagination').litePagination({
                    currentPage  : 1,
                    // link_string   : '/?pages={page_number}',
                    maxPage: _totalPage,
                    pageString   : '{currentPage}',
                    reInit: true,
                    paged : function (page) {
                        var updatedCard = cards.slice(page * pressreleasePageSize - pressreleasePageSize, page * pressreleasePageSize);
                        initiateLoadmore(updatedCard);
                        scrollTopPressReleaseCards();
                    }
                });
            } else {
                $('.pressreleasePagination').litePagination({
                    currentPage  : 1,
                    // link_string   : '/?pages={page_number}',
                    maxPage: _totalPage,
                    pageString   : '{currentPage}',
                    reInit: false,
                    paged : function (page) {
                        var updatedCard = cards.slice(page * pressreleasePageSize - pressreleasePageSize, page * pressreleasePageSize);
                        initiateLoadmore(updatedCard);
                        scrollTopPressReleaseCards();
                    } 
                });
                acceptancePaginationReInitFlag = true;
            }
        } else {
            $('.acceptancePagination').addClass('d-none');
        }
    }
    if($(".press-release-cards")[0]) {
        $(".press-release-dropdown").select2({
            placeholder: $(".press-release-dropdown").data("placeholder"),
            minimumResultsForSearch: Infinity,
            selectionCssClass: "singleselect-withoutsearch",
            dropdownCssClass: "singleselect-withoutsearch",
        });
        var prAriaLabel = $(".press-release-dropdown").attr('aria-label');
        setTimeout(() => {
            var setprAriaLabel = $('.press-release-dropdown').next('.select2-container').find('.select2-selection');
            if($('.press-release-dropdown').hasClass("select2-hidden-accessible") && setprAriaLabel.length == 1) {
                $('.press-release-dropdown').removeAttr("aria-label");
                setprAriaLabel.removeAttr('aria-labelledby');
                setprAriaLabel.attr('aria-label', prAriaLabel);
            }
        }, 3000);
        $(".press-release-dropdown option:first-child").attr('selected', 'true');
        var category = $(".press-release-dropdown option:selected").val();
        var dataPath = $("#press-release-group").data('press-release-path');
        var contentType = $("#press-release-group").data('content-type');
        // dataPath = "/src/main/webpack" + dataPath + category;
        dataPath = "/bin/ets/fetchNewsPages.json?path=" + dataPath + "&contentType=" + contentType + "&category=" + category;
        $.getJSON(dataPath, function (data) {
            
            var cardlength = data.collection.length;
            var cards = data.collection;
            initiateLoadmore(cards.slice(0, pressreleasePageSize));
            
            pressreleaseInitPagination(cards);
            
            if(cardlength > pressreleasePageSize) {
                $('.pressreleasePagination').removeClass('d-none');
            } else {
                $('.pressreleasePagination').addClass('d-none');
            }

            $('.press-release-dropdown').on('change', function () {
                category = $(".press-release-dropdown option:selected").val();
                dataPath = $("#press-release-group").data('press-release-path');
                contentType = $("#press-release-group").data('content-type');
                // dataPath = "/src/main/webpack" + dataPath + category;
                dataPath = "/bin/ets/fetchNewsPages.json?path=" + dataPath + "&contentType=" + contentType + "&category=" + category;
                $.getJSON(dataPath, function (data) {
                    cardlength = data.collection.length;
                    cards = data.collection;
                    initiateLoadmore(cards.slice(0, pressreleasePageSize));
                    pressreleaseInitPagination(cards);
                    if(cardlength > pressreleasePageSize) {
                        $('.pressreleasePagination').removeClass('d-none');
                    } else {
                        $('.pressreleasePagination').addClass('d-none');
                    }
                });
            });
        });
    }
});



// $(function () {
//     function updateCards(loadmoreCount, maxvalidcard, cards, initiate, isDisplayDate) {
//         var i = initiate;
//         while (i < maxvalidcard) {
//             if (i > loadmoreCount - 1) {
//                 $('.press-release-load-more .load-more-button').css('display', 'none');
//                 i++;
//             }
//             else if (cards[i].title) {
//                 var cardDate = new Date(cards[i].date).toLocaleDateString('en-us', { month: "long", year: "numeric", day: "numeric" });
//                 var card = '';
//                 var cardImage = cards[i].image ? cards[i].image : "/content/dam/ets-org/general/placeholders/img-plchldr-featured-news.jpg";
//                 if (isDisplayDate) {
//                     card = ' <div class="card press-release-cards-container info-card-translucent"><img src="' + cardImage + '" class="card-img-top" alt="' + cards[i].alt + '"><div class="card-body"><p class="body-text press-release-date">' + cardDate + '</p><div class="heading5"><a href="' + cards[i].path + '">' + cards[i].title + '</a></div><div class="card-heading-seperator"><span class="card-heading-seperator-stroke-big"></span><span class="card-heading-seperator-stroke-small"></span></div><p class="press-release-cards-container-content body-text">' +
//                         cards[i].description + '</p> </div><div class="card-footer"> <div class="article-banner-button-band m-0"><a class="cta-btn-primary" href="' +
//                         cards[i].path + '" aria-label="Read More About '+cards[i].title+'">Read more</a></div></div></div>';
//                 }
//                 else {
//                     card = ' <div class="card press-release-cards-container info-card-translucent"><img src="' + cardImage + '" class="card-img-top" alt="' + cards[i].alt + '"><div class="card-body"><div class="heading5"><a href="' + cards[i].path + '">' + cards[i].title + '</a></div><div class="card-heading-seperator"><span class="card-heading-seperator-stroke-big"></span><span class="card-heading-seperator-stroke-small"></span></div><p class="press-release-cards-container-content body-text">' +
//                         cards[i].description + '</p> </div><div class="card-footer"> <div class="article-banner-button-band m-0"><a class="cta-btn-primary" href="' +
//                         cards[i].path + '" aria-label="Read More About '+cards[i].title+'">Read more</a></div></div></div>';
//                 }
//                 $(card).appendTo(".press-release-cards");
//                 i++;
//                 continue;
//             } else {
//                 i++;
//                 if (loadmoreCount > maxvalidcard) {
//                     maxvalidcard++;
//                     continue;
//                 }
//             }

//         }
//         return maxvalidcard;
//     }
//     function initiateLoadmore(totalloadedData, loadmoreCount, maxvalidcard, cards,initiate) {
//         initiate = totalloadedData;
//         if (screen.width <= 768) {
//             maxvalidcard = totalloadedData + 3;
//         }
//         else {
//             maxvalidcard = totalloadedData + 6;
//         }
//         totalloadedData = +updateCards(loadmoreCount, maxvalidcard, cards, initiate, isDisplayDate);
//         // Start Rellax
//         var rellax = new Rellax('.rellax');
//         // Destroy and create again parallax with previous settings
//         setTimeout(function () {

//             rellax.refresh();

//         }, 1000);
//     }
//     if ($(".press-release-cards")[0]) {
//         $(".press-release-dropdown").select2({
//             placeholder: $(".press-release-dropdown").data("placeholder"),
//             minimumResultsForSearch: Infinity,
//             selectionCssClass: "singleselect-withoutsearch",
//             dropdownCssClass: "singleselect-withoutsearch",
//         });
//         var prAriaLabel = $(".press-release-dropdown").attr('aria-label');
//         setTimeout(() => {
//             var setprAriaLabel = $('.press-release-dropdown').next('.select2-container').find('.select2-selection');
//             if($('.press-release-dropdown').hasClass("select2-hidden-accessible") && setprAriaLabel.length == 1) {
//                 $('.press-release-dropdown').removeAttr("aria-label");
//                 setprAriaLabel.removeAttr('aria-labelledby');
//                 setprAriaLabel.attr('aria-label', prAriaLabel);
//             }
//         }, 3000);
//         $(".press-release-dropdown option:first-child").attr('selected', 'true');
//         var category = $(".press-release-dropdown option:selected").val();
//         var dataPath = $("#press-release-group").data('press-release-path');
//         var contentType = $("#press-release-group").data('content-type');
//         var isDisplayDate = $("#press-release-group").data('display-date');
//         dataPath = "/bin/ets/fetchNewsPages.json?path=" + dataPath + "&contentType=" + contentType + "&category=" + category;
//         $.getJSON(dataPath, function (data) {
//             var loadmoreCount = data.collection.length;
//             var maxvalidcard = loadmoreCount >= 6 ? 6 : loadmoreCount;
//             var cards = data.collection;
//             var initiate = 0;
//             var totalloadedData = 0;
//             totalloadedData = +updateCards(loadmoreCount, maxvalidcard, cards, initiate, isDisplayDate);
//             if (totalloadedData > loadmoreCount - 1) {
//                 $('.press-release-load-more .load-more-button').css('display', 'none');
//             }

//             $('.press-release-load-more .load-more-button').on('click', function(e){
//                 var cardElement = $(this).parent().parent();
//                 var cardGroup = $(cardElement).find('.press-release-cards .card.press-release-cards-container');
//                 totalloadedData=cardGroup.length;
//                 initiateLoadmore(totalloadedData, loadmoreCount, maxvalidcard, cards,initiate)
//             });
            
//             document.querySelector('.press-release-load-more .load-more-button').addEventListener("keydown", function (e) {
//                 if (e.keyCode == 13) {
//                     var cardElement = $(this).parent().parent();
//                     var cardGroup = $(cardElement).find('.press-release-cards .card.press-release-cards-container');
//                     totalloadedData=cardGroup.length;
//                     initiateLoadmore(totalloadedData, loadmoreCount, maxvalidcard, cards,initiate);
//                     cardGroup=$(cardElement).find('.press-release-cards .card.press-release-cards-container');                    
//                     var cardDifferenceLength = 6;
//                     if (screen.width <= 768) cardDifferenceLength = 3;
//                     var visibleCardDifference = Math.ceil(cardGroup.length % cardDifferenceLength);
//                     var focusCard = visibleCardDifference == 0 ? cardGroup.length - cardDifferenceLength : cardGroup.length - visibleCardDifference;
//                     var newFocus = $(cardElement).find('.press-release-cards .card.press-release-cards-container')[focusCard];
//                     $(newFocus).find('.heading5 a').focus();
//                 }
//             })

//             $('.press-release-dropdown ').on('change', function () {
//                 $('.press-release-load-more .load-more-button').css('display', 'flex');
//                 category = $(".press-release-dropdown option:selected").val();
//                 contentType = $("#press-release-group").data('content-type');
//                 dataPath = $("#press-release-group").data('press-release-path');
//                 dataPath = "/bin/ets/fetchNewsPages.json?path=" + dataPath + "&contentType=" + contentType + "&category=" + category;
//                 $.getJSON(dataPath, function (data) {
//                     loadmoreCount = data.collection.length;
//                     maxvalidcard = loadmoreCount >= 6 ? 6 : loadmoreCount;
//                     cards = data.collection;
//                     initiate = 0;
//                     totalloadedData = 0;
//                     $(".press-release-cards").empty();
//                     totalloadedData = +updateCards(loadmoreCount, maxvalidcard, cards, initiate, isDisplayDate);
//                     if (totalloadedData > loadmoreCount - 1) {
//                         $('.press-release-load-more .load-more-button').css('display', 'none');
//                     }
//                 });
//             });
//         });
//     } else {
//         // Do something if class does not exist
//     }

// });