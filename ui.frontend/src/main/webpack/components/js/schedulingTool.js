var testInfoPaginationReInitFlag = false;
var locationList = [];
var currentPageNumber = 1;
var pageSize = 20;
var latitude = null;
var longitude = null;
var testCode = null;
var countryCode = '';
var distance = null;
var programCode = '';
var brandName = '';
var locationName = '';
var testName = '';
var siteCode = '';
var testCenter = '';
var testFromHome = false;
// var monthNames = ["January", "February", "March", "April", "May", "June",
//     "July", "August", "September", "October", "November", "December"
// ];
// var countPrev, countNext = 0;
var checked = false;
var locationTestCenterList = [];
var geoLocationCountry;
var isMile = false;
// var scheduleCalendar = null;
var selectedEventInfo = null;
var isTestFromHomeClicked = false;
var popupStartDate = null;
var popupEndDate = null;
var popupDeliveryMode = null;
var popupTestDuration = null;
var popupSiteCode = null;
var bannerText = '';
var testFromHomeDescription = '';
var scheduleButtonText = '';
var scheduleButtonUrl = '';
var testFromHomeRequirementText = '';
var testFromHomeRequirementUrl = '';
var addressLabel = '';
var availableTimeLabel = '';
var seatsOpenLabel = '';
var getDirectionText = '';
var errorImagePath = '';
var addressImagePath = '';
var availableTimeImagePath = '';
var scoreReportDateList = '';
var scheduleURL = '';
var deliveryMode = '';
var testDate = '';
var timeZoneId = '';
var filterTestFromHomeCenter = null;
var testFromHomeTimeZoneId = '';
var loaderImagePath = '';
var testCenterOffset = 0;
var testFromHomeOffset = 0;
var testStartDate = null;
var testEndDate = null;
var disclaimerText = '';
var scoreReportMinDate = null;
var scoreReportMaxDate = null;
var cellClicked = false;
var isOnlyRemoteTestFlag = false;
var distanceBy = 'mi';
var distanceValue = null;
var setOneTimeLoad = 1;
var calendarDays = null;
var wttAriaLabel = '';
var ddAriaLabel = '';
var tcdAriaLabel = '';
var apiStartDate = new Date();
var apiEndDate = new Date();
var isAPICallForTwoMonths = false;
var stateCode = '';
var loadNextMonthData = false;

var MaxCutOffDistance = 25;

function loaderAnnouncement(element, statusMessage, loaderState) {
    $("span.hiddenStatus#loaderLiveRegion").html(statusMessage);
    $(element).attr('aria-busy', loaderState);
}

function dropdownAnnouncement(statusMessage) {
    setTimeout(() => {
        var dropdownLiveRegion = document.getElementById('dropdownLiveRegion');
        if (dropdownLiveRegion) {
            $("#dropdownLiveRegion").html(statusMessage);
        }
    }, 600);
}

function convertToMile(km) {
    return km / 1.609;
}
var mobiScrollCalendar = null;
// if ($(window).width() <= 768) {
//     pageSize = 5;
// }
var selectedCalendarDate = null;

function populateResultData(cp) {
    // console.log(cp, locationList.length);
    const testInfoResult = document.querySelector('.test-info__results');
    const testInfoCenters = testInfoResult.querySelector('.test-info__results__centers');
    // const pageResultCountElement = testInfoResult.querySelector('.page-navigation__item-count-text');
    var anchorElementText = $(testInfoCenters).data("schedule-button-label");
    var anchorElementURL = $(testInfoCenters).data("schedule-button-url");
    // let itemCount = 0;
    $(testInfoCenters).empty();
    $(testInfoCenters).css("display", "flex");
    var startPoint = pageSize * cp - pageSize;
    var endPoint = pageSize * cp;
    for (let cardCount = startPoint; cardCount < endPoint; cardCount++) {
        if (locationList.length > pageSize && cardCount < locationList.length) {
            loadNextMonthData = false;
        } else {
            if (isAPICallForTwoMonths) {
                var calendarMaxDate = new Date();
                calendarMaxDate.setDate(new Date().getDate() + calendarDays);
                var newEndDatePi = new Date(apiEndDate);
                newEndDatePi.setDate(newEndDatePi.getDate() + 1);
                if (newEndDatePi < calendarMaxDate) {
                    loadNextMonthData = true;
                }
            }
        }
        if (locationList[cardCount]) {
            const cardContainer = document.createElement('div');
            cardContainer.className = 'test-info__results__centers__card';
            const cardDescription = document.createElement('div');
            cardDescription.className = 'test-info__results__centers__card__description';
            const heading = document.createElement('div');
            heading.className = 'heading5';
            heading.innerHTML = locationList[cardCount].siteName + ' ';
            cardDescription.append(heading);
            const headingSPan = document.createElement('span');
            if (isMile) {
                distanceBy = 'mi';
                distanceValue = locationList[cardCount].seatAvailability.availability[0].distance;

            } else {
                distanceBy = 'km';
                distanceValue = (locationList[cardCount].seatAvailability.availability[0].distance * 1.60934).toFixed(2);
            }
            headingSPan.innerHTML = '(' + distanceValue + ' ' + distanceBy + ')';
            heading.append(headingSPan);
            const description = document.createElement('div');
            description.className = 'test-info__results__centers__card__description__text';
            description.innerHTML = (locationList[cardCount].address[0].addressLine1 ? locationList[cardCount].address[0].addressLine1 : '') + (locationList[cardCount].address[0].addressLine2 ? ', ' + locationList[cardCount].address[0].addressLine2 : '') + (locationList[cardCount].address[0].addressLine3 ? ', ' + locationList[cardCount].address[0].addressLine3 : '') + (locationList[cardCount].address[0].city ? ', ' + locationList[cardCount].address[0].city : '') + (locationList[cardCount].address[0].state ? ', ' + locationList[cardCount].address[0].state : '') + (locationList[cardCount].address[0].postalCode ? ', ' + locationList[cardCount].address[0].postalCode : '') + (locationList[cardCount].address[0].country ? ', ' + locationList[cardCount].address[0].country : '');
            cardDescription.append(description);
            cardContainer.append(cardDescription);
            const anchor = document.createElement('a');
            anchor.className = 'cta-btn-primary test-from-center';
            anchor.setAttribute("data-sitcode", locationList[cardCount].siteCode);
            anchor.setAttribute("aria-label", anchorElementText + ' for ' + locationList[cardCount].siteName + ' ' + distanceValue + ' ' + distanceBy);
            anchor.href = anchorElementURL;
            anchor.innerHTML = anchorElementText;
            anchor.addEventListener('click', () => {
                sessionStorage.setItem("siteCode", locationList[cardCount].siteCode);
                //sessionStorage.removeItem("testFromHome");
            });
            cardContainer.append(anchor);
            testInfoCenters.append(cardContainer);
        } else {
            break;
        }
        // itemCount = cardCount + 1;
    }
    // if (pageResultCountElement) {
    //     pageResultCountElement.innerHTML = ((currentPageNumber * pageSize) - (pageSize - 1)).toString() + ' - ' + itemCount.toString() + ' of ' + locationList.length.toString() + ' results';
    // }
}


function assignPageData(result) {
    locationList = [];
    currentPageNumber = 1;
    pageSize = 20;
    locationList = result;
    $.fn.testInfoPagination(result.length);
    var testLocationElement = document.querySelector('.test-info__summary');
    if (testLocationElement) {
        $(testLocationElement).css("display", "block");
    }

    var testNameElement = document.querySelector('.test-name-value');
    if (testNameElement) {
        testNameElement.innerHTML = testName;
    }
        
    var locationNameElement = document.querySelector('.location-value');
    if (locationNameElement) {
        locationNameElement.innerHTML = locationName;
    }
        
    if (locationList[0] && locationList[0].address) {
        populateResultData(currentPageNumber);
    }
}

/*$('.test-from-home-btn').on('click', 'a', function() {
    sessionStorage.setItem("testFromHome", true);
});*/

// Data Error handle
$.fn.closeAlertErrorInfo = function() {
    $('.alert-error-info').addClass('d-none');
};
$('.alert-error-close').on('click', function(e) {
    e.preventDefault();
    $.fn.closeAlertErrorInfo();
});
$.fn.showAlertErrorInfo = function() {
    $('.alert-error-info').removeClass('d-none');
    $('html, body').animate({
        scrollTop: $('.scheduleTool').offset().top - 100,
    });
};

// No result handle
$.fn.showAlertNoResults = function() {
    $('.alert-no-results').removeClass('d-none');
    $('html, body').animate({
        scrollTop: $('.scheduleTool').offset().top - 100,
    });
};
$('.alert-no-result-close').on('click', function(e) {
    e.preventDefault();
    $.fn.closeAlertNoResults();
});
$('.alert-change-the-area-date').on('click', function(e) {
    e.preventDefault();
    $.fn.closeAlertNoResults();
    $('html, body').animate({
        scrollTop: $('.schedule-calendar-component').offset().top - 100,
    });
});
$.fn.closeAlertNoResults = function() {
    $('.alert-no-results').addClass('d-none');
};

$.fn.hideErrorInfo = function(container) {
    if (container) {
        const errorInfo = container.querySelector('.error-info');
        if (errorInfo) {
            $(errorInfo).css("display", "none");
        }
    }
};
$.fn.showErrorInfo = function(errorText, container) {
    if (container && errorText && errorText != '') {
        const errorInfo = container.querySelector('.error-info');
        if (errorInfo) {
            const paragrapElementh = errorInfo.querySelector('p');
            paragrapElementh.innerHTML = errorText;
            $(errorInfo).css("display", "flex");
        }
    }
};
$.fn.restSerchResult = function(container) {
    if (container) {
        const testInfoCenters = container.querySelector('.test-info__results__centers');
        if (testInfoCenters) {
            $(testInfoCenters).empty();
            $(testInfoCenters).css("display", "none");
        }
        $('.page-navigation').remove();
    } else {
        locationTestCenterList = [];
        $.fn.loadMobiscrollCalendarData(null);
    }
};
$.fn.scrollTestCenterResult = function() {
    $('html, body').animate({
        scrollTop: $('.test-info__results').offset().top - 30,
    });
};

function callSearchApi(combineTestData = false, setDefaultsTestCenter = true) {
    if(setDefaultsTestCenter) {
        $.fn.setDefaultsTestCenter();
    }
    var noDataErrMsg = 'No results found with search criteria, try again...';
    filterTestFromHomeCenter = null;
    cellClicked = false;
    var distanceOption = $(".distance-dropdown option:selected")[0];
    MaxCutOffDistance = $(distanceOption).data('distance');
    
    /* From API */
    if (testCode && latitude && longitude && countryCode && programCode && distance) {
        var localStorageTestCenterList = JSON.parse(localStorage.getItem(testCode));
        var selectedStorageTestCenterList = [];
        const testInfoResult = document.querySelector('.test-info__results');
        const testInfo = document.querySelector('.test-info');
        const scheculeCalendarElement = document.querySelector('.schedule-calendar-component');
        var diffInHours = 0;
        $.fn.hideErrorInfo(testInfoResult ? testInfo : scheculeCalendarElement);
        $.fn.closeAlertNoResults();
        $.fn.closeAlertErrorInfo();
        if (localStorageTestCenterList && localStorageTestCenterList.length > 0) {
            selectedStorageTestCenterList = localStorageTestCenterList.filter(testData => testData.latitude == latitude && testData.longitude == longitude && testData.startDate == apiStartDate.toDateString() && testData.endDate == apiEndDate.toDateString());
            if (selectedStorageTestCenterList[0]) {
                var t1 = new Date(selectedStorageTestCenterList[0].createdTime).getTime();
                var t2 = new Date().getTime();
                diffInHours = (t2 - t1) / (3600 * 1000);
                if (diffInHours > 4) {
                    for (var i = 0; i < localStorageTestCenterList.length; i++) {
                        if (localStorageTestCenterList[i].latitude == selectedStorageTestCenterList[0].latitude && localStorageTestCenterList[i].longitude == selectedStorageTestCenterList[0].longitude) {
                            localStorageTestCenterList.splice(i, 1);
                            selectedStorageTestCenterList = [];
                            break;
                        }
                    }
                }
            }
        }

        var loader = null;
        if (testInfoResult) {
            loader = testInfoResult.querySelector('.loader');
        } else {
            loader = scheculeCalendarElement.querySelector('.loader');
        }
        if (loader) {
            $(loader).css('display', 'flex');
            loaderAnnouncement(loader, "Data Loading Please Wait", true);
        }
        var retries = 0;
        var retryInterval = 25000;
            

        function siteAvailabilityAjaxCall() {
            $.ajax({
                type: "GET",
                url: "/bin/ets/test-location-availability.json?ExamId=" + testCode + "&Latitude=" + latitude + "&Longitude=" + longitude + "&MaxCutOffDistance=" + MaxCutOffDistance + "&CountryCode=" + countryCode + "&programCode=" + programCode + "&days=" + calendarDays + "&startDate=" + encodeURIComponent($.datepicker.formatDate('yy-mm-d', new Date(apiStartDate)) + ' ' + (apiStartDate.getHours() > 9 ? apiStartDate.getHours() : '0' + apiStartDate.getHours()) + ':' + (apiStartDate.getMinutes() > 9 ? apiStartDate.getMinutes() : '0' + apiStartDate.getMinutes())) + "&endDate=" + encodeURIComponent($.datepicker.formatDate('yy-mm-d', new Date(apiEndDate)) + ' ' + (apiEndDate.getHours() > 9 ? apiEndDate.getHours() : '0' + apiEndDate.getHours()) + ':' + (apiEndDate.getMinutes() > 9 ? apiEndDate.getMinutes() : '0' + apiEndDate.getMinutes())) + (programCode == 'PRX' ? "&StateCode=" + stateCode : ''),
                // url: "/src/main/webpack/components/json/test-location-availability.json",
                dataType: "json",
                success: function(result, status, xhr) {
                    if (loader) {
                        loaderAnnouncement(loader, "Data Loading Complete", false);
                        $(loader).css('display', 'none');
                    }
                    if (result) {
                        if (result.status == 'success') {
                            if (result.data && result.data.length > 0) {
                                const testCenterData = {
                                    "latitude": latitude,
                                    "longitude": longitude,
                                    "testCenterList": result.data,
                                    "createdTime": new Date().toLocaleString(),
                                    "startDate": apiStartDate.toDateString(),
                                    "endDate": apiEndDate.toDateString()
                                };
                                if (localStorageTestCenterList && localStorageTestCenterList.length > 0) {
                                    localStorageTestCenterList.push(testCenterData);
                                } else {
                                    localStorageTestCenterList = [];
                                    localStorageTestCenterList.push(testCenterData);
                                }
                                localStorage.setItem(testCode, JSON.stringify(localStorageTestCenterList));
                                var tempTestCenterDataList = result.data.filter(FilterTestCenter => FilterTestCenter.isRemoteTestCenter == false);
                                filterTestFromHomeCenter = null;
                                var testFromHomeCenter = result.data.filter(testFromHomeData => testFromHomeData.isRemoteTestCenter == true);
                                if (testFromHomeCenter && testFromHomeCenter.length > 0) {
                                    filterTestFromHomeCenter = testFromHomeCenter[0];
                                    filterTestFromHomeCenter = $.fn.productBasedHomeCenterFilterFn(filterTestFromHomeCenter);
                                    $.fn.getTimeZoneId(filterTestFromHomeCenter.address[0].latitude, filterTestFromHomeCenter.address[0].longitude, true);
                                }
                                var filterTestCenterData = $.fn.filterTestCenterByDistance(tempTestCenterDataList);
                                filterTestCenterData = $.fn.productBasedFilterFn(filterTestCenterData);
                                if (filterTestCenterData && filterTestCenterData.length > 0) {
                                    if (testInfoResult) {
                                        if (combineTestData) {
                                            locationList = jQuery.merge(locationList, filterTestCenterData);
                                            populateResultData(currentPageNumber);
                                        } else {
                                            assignPageData(filterTestCenterData);
                                        }
                                    } else {
                                        locationTestCenterList = filterTestCenterData;
                                        $.fn.loadTestCenter(filterTestCenterData);
                                        $.fn.loadMobiscrollCalendarData(filterTestCenterData);
                                    }
                                } else {
                                    $.fn.restSerchResult(testInfoResult);
                                    if (testInfoResult) {
                                        $.fn.hideResultInfo();
                                        // $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                                        $.fn.showAlertNoResults();
                                    } else {
                                        if (!filterTestFromHomeCenter) {
                                            // $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                                            $.fn.showAlertNoResults();
                                        }
                                            
                                    }
                                }
                            } else {
                                $.fn.hideResultInfo();
                                $.fn.restSerchResult(testInfoResult);
                                // $.fn.showErrorInfo(result.errorMessage, testInfoResult ? testInfo : scheculeCalendarElement);
                                $.fn.showAlertNoResults();
                            }
                        } else if (result.status == 'failure') {
                            retries++;
                            if (retries <= 3) {
                                setTimeout(function() {
                                    siteAvailabilityAjaxCall();
                                }, retryInterval);
                            } else {
                                $.fn.hideResultInfo();
                                $.fn.restSerchResult(testInfoResult);
                                // $.fn.showErrorInfo(result.errorMessage, testInfoResult ? testInfo : scheculeCalendarElement);
                                $.fn.showAlertErrorInfo();
                            }
                        }
                    }
                },
                error: function(xhr, status, error) {
                    retries++;
                    if (retries <= 3) {
                        setTimeout(function() {
                            siteAvailabilityAjaxCall();
                        }, retryInterval);
                    } else {
                        if (loader) {
                            loaderAnnouncement(loader, "Data Loading Complete", false);
                            $(loader).css('display', 'none');
                        }
                        $.fn.showAlertErrorInfo();
                    }
                }
            });
        }
        siteAvailabilityAjaxCall();

        /*if (localStorageTestCenterList && localStorageTestCenterList.length > 0 && selectedStorageTestCenterList && selectedStorageTestCenterList.length > 0) {
            var tempTestCenterDataList = selectedStorageTestCenterList[0].testCenterList.filter(FilterTestCenter => FilterTestCenter.isRemoteTestCenter == false);
            filterTestFromHomeCenter = null;
            var testFromHomeCenter = selectedStorageTestCenterList[0].testCenterList.filter(testFromHomeData => testFromHomeData.isRemoteTestCenter == true);
            if (testFromHomeCenter && testFromHomeCenter.length > 0) {
                filterTestFromHomeCenter = testFromHomeCenter[0];
                filterTestFromHomeCenter = $.fn.productBasedHomeCenterFilterFn(filterTestFromHomeCenter);
                $.fn.getTimeZoneId(filterTestFromHomeCenter.address[0].latitude, filterTestFromHomeCenter.address[0].longitude, true);
            }
            var filterTestCenterData = $.fn.filterTestCenterByDistance(tempTestCenterDataList);
            filterTestCenterData = $.fn.productBasedFilterFn(filterTestCenterData);
            if (filterTestCenterData && filterTestCenterData.length > 0) {
                if (testInfoResult) {
                    if (combineTestData) {
                        locationList = jQuery.merge(locationList, filterTestCenterData);
                        populateResultData(currentPageNumber);
                    } else {
                        assignPageData(filterTestCenterData);
                    }
                } else {
                    locationTestCenterList = filterTestCenterData;
                    $.fn.loadTestCenter(filterTestCenterData);
                    $.fn.loadMobiscrollCalendarData(filterTestCenterData);
                }
            } else {
                $.fn.restSerchResult(testInfoResult);
                if (testInfoResult) {
                    $.fn.hideResultInfo();
                    $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                } else {
                    if (!filterTestFromHomeCenter) {
                        $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                    }
                        
                }
            }
        } else {
            var loader = null;
            if (testInfoResult) {
                loader = testInfoResult.querySelector('.loader');
            } else {
                loader = scheculeCalendarElement.querySelector('.loader');
            }
            if (loader) {
                $(loader).css('display', 'flex');
                loaderAnnouncement(loader, "Data Loading Please Wait", true);
            }
            var retries = 0;
            var retryInterval = 25000;
                

            function siteAvailabilityAjaxCall() {
                console.log("/bin/ets/test-location-availability.json?ExamId=" + testCode + "&Latitude=" + latitude + "&Longitude=" + longitude + "&MaxCutOffDistance=" + MaxCutOffDistance + "&CountryCode=" + countryCode + "&programCode=" + programCode + "&days=" + calendarDays + "&startDate=" + encodeURIComponent($.datepicker.formatDate('yy-mm-d', new Date(apiStartDate)) + ' ' + (apiStartDate.getHours() > 9 ? apiStartDate.getHours() : '0' + apiStartDate.getHours()) + ':' + (apiStartDate.getMinutes() > 9 ? apiStartDate.getMinutes() : '0' + apiStartDate.getMinutes())) + "&endDate=" + encodeURIComponent($.datepicker.formatDate('yy-mm-d', new Date(apiEndDate)) + ' ' + (apiEndDate.getHours() > 9 ? apiEndDate.getHours() : '0' + apiEndDate.getHours()) + ':' + (apiEndDate.getMinutes() > 9 ? apiEndDate.getMinutes() : '0' + apiEndDate.getMinutes())) + (programCode == 'PRX' ? "&StateCode=" + stateCode : ''));
                $.ajax({
                    type: "GET",
                    url: "/bin/ets/test-location-availability.json?ExamId=" + testCode + "&Latitude=" + latitude + "&Longitude=" + longitude + "&MaxCutOffDistance=" + MaxCutOffDistance + "&CountryCode=" + countryCode + "&programCode=" + programCode + "&days=" + calendarDays + "&startDate=" + encodeURIComponent($.datepicker.formatDate('yy-mm-d', new Date(apiStartDate)) + ' ' + (apiStartDate.getHours() > 9 ? apiStartDate.getHours() : '0' + apiStartDate.getHours()) + ':' + (apiStartDate.getMinutes() > 9 ? apiStartDate.getMinutes() : '0' + apiStartDate.getMinutes())) + "&endDate=" + encodeURIComponent($.datepicker.formatDate('yy-mm-d', new Date(apiEndDate)) + ' ' + (apiEndDate.getHours() > 9 ? apiEndDate.getHours() : '0' + apiEndDate.getHours()) + ':' + (apiEndDate.getMinutes() > 9 ? apiEndDate.getMinutes() : '0' + apiEndDate.getMinutes())) + (programCode == 'PRX' ? "&StateCode=" + stateCode : ''),
                    dataType: "json",
                    success: function(result, status, xhr) {
                        if (loader) {
                            loaderAnnouncement(loader, "Data Loading Complete", false);
                            $(loader).css('display', 'none');
                        }
                        if (result) {
                            if (result.status == 'success') {
                                if (result.data && result.data.length > 0) {
                                    const testCenterData = {
                                        "latitude": latitude,
                                        "longitude": longitude,
                                        "testCenterList": result.data,
                                        "createdTime": new Date().toLocaleString(),
                                        "startDate": apiStartDate.toDateString(),
                                        "endDate": apiEndDate.toDateString()
                                    };
                                    if (localStorageTestCenterList && localStorageTestCenterList.length > 0) {
                                        localStorageTestCenterList.push(testCenterData);
                                    } else {
                                        localStorageTestCenterList = [];
                                        localStorageTestCenterList.push(testCenterData);
                                    }
                                    localStorage.setItem(testCode, JSON.stringify(localStorageTestCenterList));
                                    var tempTestCenterDataList = result.data.filter(FilterTestCenter => FilterTestCenter.isRemoteTestCenter == false);
                                    filterTestFromHomeCenter = null;
                                    var testFromHomeCenter = result.data.filter(testFromHomeData => testFromHomeData.isRemoteTestCenter == true);
                                    if (testFromHomeCenter && testFromHomeCenter.length > 0) {
                                        filterTestFromHomeCenter = testFromHomeCenter[0];
                                        filterTestFromHomeCenter = $.fn.productBasedHomeCenterFilterFn(filterTestFromHomeCenter);
                                        $.fn.getTimeZoneId(filterTestFromHomeCenter.address[0].latitude, filterTestFromHomeCenter.address[0].longitude, true);
                                    }
                                    var filterTestCenterData = $.fn.filterTestCenterByDistance(tempTestCenterDataList);
                                    filterTestCenterData = $.fn.productBasedFilterFn(filterTestCenterData);
                                    if (filterTestCenterData && filterTestCenterData.length > 0) {
                                        if (testInfoResult) {
                                            if (combineTestData) {
                                                locationList = jQuery.merge(locationList, filterTestCenterData);
                                                populateResultData(currentPageNumber);
                                            } else {
                                                assignPageData(filterTestCenterData);
                                            }
                                        } else {
                                            locationTestCenterList = filterTestCenterData;
                                            $.fn.loadTestCenter(filterTestCenterData);
                                            $.fn.loadMobiscrollCalendarData(filterTestCenterData);
                                        }
                                    } else {
                                        $.fn.restSerchResult(testInfoResult);
                                        if (testInfoResult) {
                                            $.fn.hideResultInfo();
                                            $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                                        } else {
                                            if (!filterTestFromHomeCenter) {
                                                $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                                            }
                                                
                                        }
                                    }
                                } else {
                                    $.fn.hideResultInfo();
                                    $.fn.restSerchResult(testInfoResult);
                                    $.fn.showErrorInfo(result.errorMessage, testInfoResult ? testInfo : scheculeCalendarElement);
                                }
                            } else if (result.status == 'failure') {
                                retries++;
                                if (retries <= 3) {
                                    setTimeout(function() {
                                        siteAvailabilityAjaxCall();
                                    }, retryInterval);
                                } else {
                                    $.fn.hideResultInfo();
                                    $.fn.restSerchResult(testInfoResult);
                                    $.fn.showErrorInfo(result.errorMessage, testInfoResult ? testInfo : scheculeCalendarElement);
                                }
                            }
                        }
                    },
                    error: function(xhr, status, error) {
                        retries++;
                        if (retries <= 3) {
                            setTimeout(function() {
                                siteAvailabilityAjaxCall();
                            }, retryInterval);
                        } else {
                            if (loader) {
                                loaderAnnouncement(loader, "Data Loading Complete", false);
                                $(loader).css('display', 'none');
                            }
                            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                        }
                    }
                });
            }
            siteAvailabilityAjaxCall();
        }*/
    }
    /* EndCode From API */
    /* From Json */
    /*if (testCode && latitude && longitude && countryCode && programCode && distance) {
        var localStorageTestCenterList = JSON.parse(localStorage.getItem(testCode));
        var selectedStorageTestCenterList = [];
        const testInfoResult = document.querySelector('.test-info__results');
        const testInfo = document.querySelector('.test-info');
        const scheculeCalendarElement = document.querySelector('.schedule-calendar-component');
        var diffInHours = 0;
        $.fn.hideErrorInfo(testInfoResult ? testInfo : scheculeCalendarElement);
        if (localStorageTestCenterList && localStorageTestCenterList.length > 0) {
            selectedStorageTestCenterList = localStorageTestCenterList.filter(testData => testData.latitude == latitude && testData.longitude == longitude && testData.startDate == apiStartDate.toDateString() && testData.endDate == apiEndDate.toDateString());
            if (selectedStorageTestCenterList[0]) {
                var t1 = new Date(selectedStorageTestCenterList[0].createdTime).getTime();
                var t2 = new Date().getTime();
                diffInHours = (t2 - t1) / (3600 * 1000);
                if (diffInHours > 4) {
                    for (var i = 0; i < localStorageTestCenterList.length; i++) {
                        if (localStorageTestCenterList[i].latitude == selectedStorageTestCenterList[0].latitude && localStorageTestCenterList[i].longitude == selectedStorageTestCenterList[0].longitude) {
                            localStorageTestCenterList.splice(i, 1);
                            selectedStorageTestCenterList = [];
                            break;
                        }
                    }
                }
            }
        }
        if (localStorageTestCenterList && localStorageTestCenterList.length > 0 && selectedStorageTestCenterList && selectedStorageTestCenterList.length > 0) {
            var tempTestCenterDataList = selectedStorageTestCenterList[0].testCenterList.filter(FilterTestCenter => FilterTestCenter.isRemoteTestCenter == false);
            filterTestFromHomeCenter = null;
            var testFromHomeCenter = selectedStorageTestCenterList[0].testCenterList.filter(testFromHomeData => testFromHomeData.isRemoteTestCenter == true);
            if (testFromHomeCenter && testFromHomeCenter.length > 0) {
                filterTestFromHomeCenter = testFromHomeCenter[0];
                filterTestFromHomeCenter = $.fn.productBasedHomeCenterFilterFn(filterTestFromHomeCenter);
            }
            var filterTestCenterData = $.fn.filterTestCenterByDistance(tempTestCenterDataList);
            filterTestCenterData = $.fn.productBasedFilterFn(filterTestCenterData);
            if (filterTestCenterData && filterTestCenterData.length > 0) {
                if (testInfoResult) {
                    if (combineTestData) {
                        locationList = jQuery.merge(locationList, filterTestCenterData);
                        populateResultData(currentPageNumber);
                    } else {
                        assignPageData(filterTestCenterData);
                    }
                } else {
                    locationTestCenterList = filterTestCenterData;
                    $.fn.loadTestCenter(filterTestCenterData);
                    $.fn.loadMobiscrollCalendarData(filterTestCenterData);
                }
            } else {
                $.fn.restSerchResult(testInfoResult);
                if (testInfoResult) {
                    $.fn.hideResultInfo();
                    $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                } else {
                    if (!filterTestFromHomeCenter) {
                        $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                    }
                }
            }
        } else {
            if (testInfoResult) {
                loader = testInfoResult.querySelector('.loader');
            } else {
                loader = scheculeCalendarElement.querySelector('.loader');
            }
            if (loader) {
                $(loader).css('display', 'flex');
            }
            loaderAnnouncement(loader, "Data Loading Please Wait", true);
            var dataPath = "/src/main/webpack/components/json/testCenters.json";
            $.getJSON(dataPath, function(result) {
                if (loader) {
                    $(loader).css('display', 'none');
                }
                loaderAnnouncement(loader, "Data Loading Complete", false);
                if (result) {
                    if (result.status == 'success') {
                        if (result.data && result.data.length > 0) {
                            const testCenterData = {
                                "latitude": latitude,
                                "longitude": longitude,
                                "testCenterList": result.data,
                                "createdTime": new Date().toLocaleString(),
                                "startDate": apiStartDate.toDateString(),
                                "endDate": apiEndDate.toDateString()
                            };
                            if (localStorageTestCenterList && localStorageTestCenterList.length > 0) {
                                localStorageTestCenterList.push(testCenterData);
                            } else {
                                localStorageTestCenterList = [];
                                localStorageTestCenterList.push(testCenterData);
                            }
                            localStorage.setItem(testCode, JSON.stringify(localStorageTestCenterList));
                            var tempTestCenterDataList = result.data.filter(FilterTestCenter => FilterTestCenter.isRemoteTestCenter == false);
                            filterTestFromHomeCenter = null;
                            var testFromHomeCenter = result.data.filter(testFromHomeData => testFromHomeData.isRemoteTestCenter == true);
                            if (testFromHomeCenter && testFromHomeCenter.length > 0) {
                                filterTestFromHomeCenter = testFromHomeCenter[0];
                                filterTestFromHomeCenter = $.fn.productBasedHomeCenterFilterFn(filterTestFromHomeCenter);
                            }
                            var filterTestCenterData = $.fn.filterTestCenterByDistance(tempTestCenterDataList);
                            filterTestCenterData = $.fn.productBasedFilterFn(filterTestCenterData);
                            if (filterTestCenterData && filterTestCenterData.length > 0) {
                                if (testInfoResult) {
                                    if (combineTestData) {
                                        locationList = jQuery.merge(locationList, filterTestCenterData);
                                        populateResultData(currentPageNumber);
                                    } else {
                                        assignPageData(filterTestCenterData);
                                    }
                                } else {
                                    locationTestCenterList = filterTestCenterData;
                                    $.fn.loadTestCenter(filterTestCenterData);
                                    $.fn.loadMobiscrollCalendarData(filterTestCenterData);
                                }
                            } else {
                                $.fn.restSerchResult(testInfoResult);
                                if (testInfoResult) {
                                    $.fn.hideResultInfo();
                                    $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                                } else {
                                    if (!filterTestFromHomeCenter) {
                                        $.fn.showErrorInfo(noDataErrMsg, testInfoResult ? testInfo : scheculeCalendarElement);
                                    }
                                }
                            }
                        } else {
                            $.fn.hideResultInfo();
                            $.fn.restSerchResult(testInfoResult);
                            $.fn.showErrorInfo(result.errorMessage, testInfoResult ? testInfo : scheculeCalendarElement);
                        }
                    } else if (result.status == 'failure') {
                        $.fn.hideResultInfo();
                        $.fn.restSerchResult(testInfoResult);
                        $.fn.showErrorInfo(result.errorMessage, testInfoResult ? testInfo : scheculeCalendarElement);
                    }
                }
            });
        }
    }*/
    /* ENd From Json */
}
$.fn.hideResultInfo = function() {
    var testLocationElement = document.querySelector('.test-info__summary');
    if (testLocationElement) {
        $(testLocationElement).css("display", "none");
    }
};
var loadTestDropdownFlag = 0;

function loadTestDropdown() {
    const customSelectDistanceSearch = document.querySelector('.distance-dropdown');
    if (customSelectDistanceSearch) {
        var sessionDistance = sessionStorage.getItem("distance");
        if (sessionDistance) {
            var selectOptionsList = customSelectDistanceSearch.querySelectorAll('option');
            Array.from(selectOptionsList).forEach(optionItem => {
                if (sessionDistance == $(optionItem).data('distance')) {
                    optionItem.setAttribute('selected', true);
                    distance = isMile ? $(optionItem).data('distance') : convertToMile($(optionItem).data('distance'));
                } else {
                    optionItem.removeAttribute('selected');
                }
            });
        } else {
            var distanceOption = $(".distance-dropdown option:selected")[0];
            if (distanceOption) {
                distance = isMile ? $(distanceOption).data('distance') : convertToMile($(distanceOption).data('distance'));
                sessionStorage.setItem("distance", $(distanceOption).data('distance'));
            }
        }
        $(".distance-dropdown").select2({
            placeholder: $(".distance-dropdown").data("placeholder"),
            minimumResultsForSearch: Infinity,
            selectionCssClass: "singleselect-withoutsearch",
            dropdownCssClass: "singleselect-withoutsearch"
        });
        ddAriaLabel = $(".distance-dropdown").attr('aria-label');
        setTimeout(() => {
            var setDDAriaLabel = $('.distance-dropdown').next('.select2-container').find('.select2-selection');
            if ($('.distance-dropdown').hasClass("select2-hidden-accessible") && setDDAriaLabel.length == 1) {
                setDDAriaLabel.attr('aria-label', ddAriaLabel);
                setDDAriaLabel.attr('aria-required', 'true');
                setDDAriaLabel.removeAttr('aria-labelledby');
                $('.distance-dropdown').removeAttr("aria-label");
            }
        }, 3000);
        if (isOnlyRemoteTestFlag) {
            $('.distance-dropdown').parent('.field-groups').addClass('d-none');
        }
        if (loadTestDropdownFlag == 0) {
            $('.distance-dropdown').on('change', function() {
                var distanceOption = $(".distance-dropdown option:selected")[0];
                distance = isMile ? $(distanceOption).data('distance') : convertToMile($(distanceOption).data('distance'));
                sessionStorage.setItem("distance", $(distanceOption).data('distance'));
                $.fn.removeSelectedTestCenterData();
                callSearchApi();
                dropdownAnnouncement($('#demo-custom-event-popover').data('test-announcement-testcenter'));

            });
            loadTestDropdownFlag++;
        }
    }
    const scheculeCalendarElement = document.querySelector('.schedule-calendar-component');
    const customSelectTestSearcher = document.querySelector('.where-to-test-dropdown');
    if (customSelectTestSearcher) {
        var dataPath = $(customSelectTestSearcher).data('test-json-path');
        var sessionExamId = sessionStorage.getItem("examId");
        if (sessionExamId) {
            testCode = sessionExamId;
        }
        var sessionProgramCode = sessionStorage.getItem("programCode");
        if (sessionProgramCode) {
            programCode = sessionProgramCode;
        }
        $.getJSON(dataPath, function(data) {
            var filterdropDown = $.fn.sortTestDropDown(data.Test, 'testName', true);
            var isExamIdMatch = false;
            $.each(filterdropDown, function(index, value) {
                var testSelected = false;
                if (sessionExamId && value.examId == sessionExamId) {
                    testCode = value.examId;
                    testName = value.testName;
                    programCode = value.programCode;
                    popupTestDuration = value['testDuration(in minutes)'];
                    testSelected = true;
                    isExamIdMatch = true;
                    if (scheculeCalendarElement) {
                        $(customSelectTestSearcher).siblings(".drop-down-preselect-label").removeClass('d-none');
                    }
                } else if (filterdropDown && filterdropDown.length == 1) {
                    testCode = value.examId;
                    testName = value.testName;
                    programCode = value.programCode;
                    popupTestDuration = value['testDuration(in minutes)'];
                    testSelected = true;
                    isExamIdMatch = true;
                    sessionStorage.setItem("examId", testCode);
                    sessionStorage.setItem("programCode", programCode);
                }
                $('.where-to-test-dropdown').append('<option ' + (testSelected ? 'selected ' : '') + 'value="' + value.examId + '" data-examid="' + value.examId + '" data-programcode="' + value.programCode + '" data-testduration="' + value['testDuration(in minutes)'] + '">' + value.testName + '</option>');
            });
            if (!isExamIdMatch) {
                testCode = null;
                programCode = null;
                sessionStorage.removeItem("examId");
                sessionStorage.removeItem("programCode");
            }
            $(".where-to-test-dropdown").select2({
                placeholder: $(".where-to-test-dropdown").data("placeholder"),
                selectionCssClass: "singleselect-withsearch",
                dropdownCssClass: "singleselect-withsearch"
            });
            wttAriaLabel = $(".where-to-test-dropdown").attr('aria-label');
            setTimeout(() => {
                var setwttAriaLabel = $('.where-to-test-dropdown').next('.select2-container').find('.select2-selection');
                if ($('.where-to-test-dropdown').hasClass("select2-hidden-accessible") && setwttAriaLabel.length == 1) {
                    setwttAriaLabel.attr('aria-required', 'true');
                    setwttAriaLabel.attr('aria-label', wttAriaLabel);
                    setwttAriaLabel.removeAttr('aria-labelledby');
                    $('.where-to-test-dropdown').removeAttr("aria-label");
                }
            }, 3000);
            if (testCode == null) {
                $('.where-to-test-dropdown').val(null).trigger('change');
            }
            if (filterdropDown && filterdropDown.length == 1) {
                $('.where-to-test-dropdown').prop("disabled", true);
            }
            $('.where-to-test-dropdown').on('change', function() {
                if (scheculeCalendarElement) {
                    $(customSelectTestSearcher).parent().removeClass('required-select-field');
                    $(customSelectTestSearcher).siblings('.drop-down-error-label').addClass('d-none');
                    if (!$(customSelectTestSearcher).siblings(".drop-down-preselect-label").hasClass("d-none")) {
                        $(customSelectTestSearcher).siblings(".drop-down-preselect-label").addClass("d-none");
                    }
                }
                var Country = $(".where-to-test-dropdown option:selected")[0];
                testCode = $(Country).data('examid');
                programCode = $(Country).data('programcode');
                testName = $(Country).text();
                popupTestDuration = $(Country).data('testduration');
                window.dataLayer.push({
					"event": "test_type_selected",
				    "brand": brandName,
				    "test_name": testName
				});
                sessionStorage.setItem("examId", testCode);
                sessionStorage.setItem("programCode", programCode);
                $.fn.removeSelectedTestCenterData();
                callSearchApi();
                if (locationName == '') {
                    dropdownAnnouncement($('#demo-custom-event-popover').data('test-announcement-location'));
                }
            });
        });
    }
    const testFromHomeCheckbox = document.querySelector('#flexCheckDefault');
    if (testFromHomeCheckbox) {
        //var sessionTestFromHome = sessionStorage.getItem("testFromHome");
        const urlstring = window.location.href;
        const pathurl = new URL(urlstring);
        const sessionTestFromHome = pathurl.searchParams.get("testFromHome");
        if (sessionTestFromHome == 'true') {
            $(testFromHomeCheckbox).prop('checked', sessionTestFromHome);
            checked = true;
        } else if (isOnlyRemoteTestFlag) {
            $(testFromHomeCheckbox).prop('checked', true);
            checked = true;
        } else {
            $(testFromHomeCheckbox).prop('checked', false);
            checked = false;
        }
    }
}
$.fn.sortTestDropDown = function(sortingList, prop, asc) {

    sortingList.sort(function(a, b) {
        if (asc) {
            return (a[prop].toLowerCase() > b[prop].toLowerCase()) ? 1 : ((a[prop].toLowerCase() < b[prop].toLowerCase()) ? -1 : 0);
        } else {
            return (b[prop].toLowerCase() > a[prop].toLowerCase()) ? 1 : ((b[prop].toLowerCase() < a[prop].toLowerCase()) ? -1 : 0);
        }
    });
    return sortingList;
};
$.fn.enableDisableCheckbox = function(enable) {
    const scheculeCalendarElement = document.querySelector('.schedule-calendar-component');
    if (scheculeCalendarElement) {
        var formCheckElement = scheculeCalendarElement.querySelector('.form-check');
        if (formCheckElement) {
            if (enable) {
                $(formCheckElement).removeClass('disabled');
                $("#testFromHomeTooltip").tooltip("enable");
            } else {
                $(formCheckElement).addClass('disabled');
                $("#testFromHomeTooltip").tooltip("disable");
            }
        }
    }
};
tcdAriaLabel = $(".testCenter-dropdown").attr('aria-label');
$.fn.setDefaultsTestCenter = function() {
    $.fn.enableDisableCheckbox(false);
    const customSelectTestCenterSearch = document.querySelector('.testCenter-dropdown');
    if (customSelectTestCenterSearch) {
        $('.testCenter-dropdown').empty();
        $(".testCenter-dropdown").select2({
            placeholder: $(".testCenter-dropdown").data("placeholder"),
            selectionCssClass: "singleselect-withsearch",
            dropdownCssClass: "singleselect-withsearch"
        });
        setTimeout(() => {
            var setTCDAriaLabel = $('.testCenter-dropdown').next('.select2-container').find('.select2-selection');
            if ($('.testCenter-dropdown').hasClass("select2-hidden-accessible") && setTCDAriaLabel.length == 1) {
                setTCDAriaLabel.attr('aria-label', tcdAriaLabel);
                setTCDAriaLabel.attr('aria-required', 'true');
                setTCDAriaLabel.removeAttr('aria-labelledby');
                $('.testCenter-dropdown').removeAttr("aria-label");
            }
        }, 3000);
        $('.testCenter-dropdown').prop("disabled", true);
        var testDropDownInfoLabel = $('.testCenter-dropdown').parent().find('.drop-down-info-label');
        if (testDropDownInfoLabel) {
            $(testDropDownInfoLabel).css('display', 'none');
        }
        if (isOnlyRemoteTestFlag) {
            $('.testCenter-dropdown').parents('.field-groups-test').addClass('d-none');
        }
    }
};
var flaginittestCenter = 1;
$.fn.loadTestCenter = function(testcenterList) {
    $.fn.enableDisableCheckbox(true);
    testcenterList = testcenterList.filter(FilterTestCenter => FilterTestCenter.isRemoteTestCenter == false);
    const customSelectTestCenterSearch = document.querySelector('.testCenter-dropdown');
    if (customSelectTestCenterSearch) {
        var sessionSiteCode = sessionStorage.getItem("siteCode");
        $.each(testcenterList, function(index, value) {
            var testCenterSelected = false;
            if (sessionSiteCode && value.siteCode == sessionSiteCode) {
                siteCode = value.siteCode;
                testCenter = value.siteName;
                testCenterSelected = true;
                var templocationTestCenterList = testcenterList.filter(data => data.siteCode == siteCode);
                $.fn.getTimeZoneId(templocationTestCenterList[0].address[0].latitude, templocationTestCenterList[0].address[0].longitude, false);
            }
            var distanceData = isMile ? value.seatAvailability.availability[0].distance + ' mi' : (value.seatAvailability.availability[0].distance * 1.60934).toFixed(2) + ' km';
            $('.testCenter-dropdown').append('<option ' + (testCenterSelected ? 'selected' : '') + ' ' + 'value="' + distanceData + '" data-sitecode="' + value.siteCode + '" data-sitename="' + value.siteName + '">' + value.siteCode + ' - ' + value.siteName + '</option>');
        });

        function formatState(state) {
            if (!state.id) {
                return state.text;
            }
            // var baseUrl = "/user/pages/images/flags";
            var $state = $(
                '<span style="width:100%">' + state.text + '<span style="float:right"> ' + state.element.value + '</span>' + '</span>'
            );
            return $state;
        };
        $(".testCenter-dropdown").select2({
            placeholder: $(".testCenter-dropdown").data("placeholder"),
            selectionCssClass: "singleselect-withsearch",
            dropdownCssClass: "singleselect-withsearch",
            templateResult: formatState
        });
        setTimeout(() => {
            $('.testCenter-dropdown').next('.select2-container').find('.select2-selection').attr('aria-label', tcdAriaLabel);
            $('.testCenter-dropdown').next('.select2-container').find('.select2-selection').removeAttr('aria-labelledby');
        }, 2000);
        // if ($('.select2-selection').length > 0 && $('.select2-selection').length != undefined) {
        //     $('.select2-selection').each(function() {
        //         $(this).attr('aria-label', $(this).attr('aria-labelledby'));
        //         $(this).removeAttr('aria-labelledby');
        //     });
        // }
        $('.testCenter-dropdown').prop("disabled", false);
        var testDropDownInfoLabel = $('.testCenter-dropdown').parent().find('.drop-down-info-label');
        if (testDropDownInfoLabel) {
            $(testDropDownInfoLabel).css('display', 'inline-block');
        }
        if (sessionSiteCode == null){
            $('.testCenter-dropdown').val(null).trigger('change');
        }

        if (flaginittestCenter == 1) {
            $('.testCenter-dropdown').on('change', function() {
                var testCenterOption = $(".testCenter-dropdown option:selected")[0];
                if (testCenterOption) {
                    siteCode = $(testCenterOption).data("sitecode");
                    testCenter = $(testCenterOption).data("sitename");
                    sessionStorage.setItem("siteCode", siteCode);
                    var templocationTestCenterList = locationTestCenterList.filter(data => data.siteCode == siteCode);
                    $.fn.getTimeZoneId(templocationTestCenterList[0].address[0].latitude, templocationTestCenterList[0].address[0].longitude, false);
                    $.fn.loadMobiscrollCalendarData(locationTestCenterList);
                }
                if ($('#testFromHomeTooltip').length > 0) {
                    dropdownAnnouncement($('#demo-custom-event-popover').data('test-announcement-testfromhome'));
                }
            });
            flaginittestCenter++;
        }
    }
};
$('form').keypress(function(e) {
    return e.keyCode != 13;
});


function isNullOrWhitespace(text) {
    if (text == null) {
        return true;
    }
    return text.replace(/\s/gi, '').length < 1;
}

function getCountry(results) {
    for (var i = 0; i < results[0].address_components.length; i++) {
        var shortname = results[0].address_components[i].short_name;
        var longname = results[0].address_components[i].long_name;
        var type = results[0].address_components[i].types;
        if (type.indexOf("country") != -1) {
            if (!isNullOrWhitespace(shortname)) {
                return shortname;
            } else {
                return longname;
            }
        }
    }

}
//Get the latitude and the longitude;
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({ 'latLng': latlng }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                var loc = getCountry(results);
                console.log("location", loc);
            }
        }
    });
}

function errorFunction() {
    alert("Geocoder failed");
}

$.fn.getCookie = function(key) {
    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
};

function getCurrentLocation() {
    var geoLocationCookie = $.fn.getCookie('geo_loc');
    if (geoLocationCookie) {
        var splitReadCookie = geoLocationCookie.split(",");
        for (i = 0; i < splitReadCookie.length; i++) {
            var value = splitReadCookie[i];
            value = value.split("=");
            if (value[0].trim() == "country") {
                geoLocationCountry = value[1];
            }
        }
    }

}

function setMetric() {
    var mileCountry;
    var metric = sessionStorage.getItem("metric");
    if (metric) {
        if (metric == 'Mi') {
            isMile = true;
            $("input:radio[value='Mi']").attr("checked", "checked");
        } else if (metric == 'Km') {
            isMile = false;
            $("input:radio[value='Km']").attr("checked", "checked");
        }

    } else {
        var dataPath = "/content/dam/ets-org/json-files/mileCountries.json";
        //var dataPath = "/src/main/webpack/components/json/mileCountries.json";
        $.getJSON(dataPath, function(result) {
            mileCountry = result;
            var country = mileCountry.country;

            if (country.includes(geoLocationCountry)) {
                isMile = true;
                $("input:radio[value='Mi']").attr("checked", "checked");
                sessionStorage.setItem("metric", 'Mi');
            } else {
                isMile = false;
                $("input:radio[value='Km']").attr("checked", "checked");
                sessionStorage.setItem("metric", 'Km');
            }

        });
    }
}
$("input[name='distance']").click(function() {
    var distanceOption = $(".distance-dropdown option:selected")[0];
    if ($("input[name='distance']:checked").val() == 'Mi') {
        sessionStorage.setItem("metric", 'Mi');
        isMile = true;
        distance = $(distanceOption).data('distance');
        callSearchApi();
    } else {
        isMile = false;
        sessionStorage.setItem("metric", 'Km');
        distance = convertToMile($(distanceOption).data('distance'));
        callSearchApi();
    }
});
$(window).on('load', function() {
    const bodyTag = document.querySelector('body');
    if ($(bodyTag).hasClass('theme-praxis')) {
        isAPICallForTwoMonths = true;
    } else if ($(bodyTag).hasClass('theme-gre')) {
        isAPICallForTwoMonths = true;
    } else if ($(bodyTag).hasClass('theme-toefl')) {
        isAPICallForTwoMonths = true;
    } else {
        isAPICallForTwoMonths = false;
    }
    const testInfoResultcmp = document.querySelector('.test-info__results');
    var calendarElement = document.getElementById('demo-custom-event-popover');
    $("#testFromHomeTooltip").tooltip("disable");
    if (testInfoResultcmp) {
        const testInfoCentersCmp = testInfoResultcmp.querySelector('.test-info__results__centers');
        calendarDays = Number($(testInfoCentersCmp).data("days"));
    } else {
        if (calendarElement) {
            calendarDays = Number($(calendarElement).data("days"));
        }
    }
    if (calendarElement) {
        isOnlyRemoteTestFlag = $(calendarElement).data("only-remote-test");
    }
    if (!isAPICallForTwoMonths) {
        apiEndDate.setDate(new Date().getDate() + calendarDays);
    } else {
        $.fn.CalculateAPIEndDate(60);
    }
    getCurrentLocation();
    setMetric();
    $.fn.initialiseMobiscrollCalendar();
    $.fn.setDefaultsTestCenter();
    loadTestDropdown();

    var input = document.getElementById('locationautocomplete');
    if (input) {
        var autocomplete = new google.maps.places.Autocomplete(input);
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            var place = autocomplete.getPlace();
            locationName = place.name;
            latitude = place.geometry.location.lat();
            longitude = place.geometry.location.lng();
            sessionStorage.setItem("locationInfo", $(input).val());
            const scheculeCalendarElement = document.querySelector('.schedule-calendar-component');
            if (scheculeCalendarElement) {
                if (!$('#locationautocomplete').parent().parent().siblings('.drop-down-error-label').hasClass('d-none')) {
                    $('#locationautocomplete').parent().parent().siblings('.drop-down-error-label').addClass('d-none');
                }
                if (!$('#locationautocomplete').siblings('.ets-dropdown-button').hasClass('d-none')) {
                    $('#locationautocomplete').siblings('.ets-dropdown-button').addClass('d-none');
                }
                $('#locationautocomplete').parent().removeClass('required-field-msg');
            }
            (place.address_components).forEach(element => {
                (element.types).forEach(addressType => {
                    if (addressType == 'country') {
                        countryCode = element['short_name'];
                        return;
                    }
                });
            });
            (place.address_components).forEach(element => {
                (element.types).forEach(addressType => {
                    if (addressType == 'administrative_area_level_1') {
                        stateCode = element['short_name'];
                        return;
                    }
                });
            });
            $.fn.removeSelectedTestCenterData();
            callSearchApi();
            if (!isOnlyRemoteTestFlag) {
                dropdownAnnouncement($('#demo-custom-event-popover').data('test-announcement-distance'));
            }
        });
        var sessionStateName = sessionStorage.getItem("locationInfo");
        var sessionExamId = sessionStorage.getItem("examId");
        if (!sessionStateName) {
            var stateInfo = sessionStorage.getItem("stateInfo");
            if (stateInfo) {
                var stateInfoDict = JSON.parse(stateInfo);
                sessionStateName = stateInfoDict['Name'];
                sessionStorage.setItem("locationInfo", sessionStateName);
            }
        }
        if (sessionStateName) {
            var loader = null;
            const testInfoResult = document.querySelector('.test-info__results');
            const scheculeCalendarElement = document.querySelector('.schedule-calendar-component');
            if (testInfoResult) {
                loader = testInfoResult.querySelector('.loader');
            } else {
                loader = scheculeCalendarElement.querySelector('.loader');
            }
            if (loader) {
                $(loader).css('display', 'flex');
                loaderAnnouncement(loader, "Data Loading Please Wait", true);
            }
            $(input).val(sessionStateName);
            var request = {
                query: sessionStateName,
                fields: ['name', 'geometry', 'formatted_address', 'types', 'place_id'],
            };
            var service = new google.maps.places.PlacesService(input);
            var placeServiceCount = 1;

            function findPlaceService() {
                const testInfo = document.querySelector('.test-info');
                $.fn.hideErrorInfo(testInfoResult ? testInfo : scheculeCalendarElement);
                $.fn.closeAlertNoResults();
                $.fn.closeAlertErrorInfo();
                service.findPlaceFromQuery(request, function(results, status) {
                    if (status && status == 'OK') {
                        if (results) {
                            request = {
                                placeId: results[0].place_id,
                                fields: ['name', 'geometry', 'formatted_address', 'types', 'address_component']
                            };
                            var detailServiceCount = 1;

                            function getLocationService() {
                                service.getDetails(request, function(place, detailStatus) {
                                    if (detailStatus && detailStatus == 'OK') {
                                        locationName = place.name;
                                        latitude = place.geometry.location.lat();
                                        longitude = place.geometry.location.lng();
                                        (place.address_components).forEach(element => {
                                            (element.types).forEach(addressType => {
                                                if (addressType == 'administrative_area_level_1') {
                                                    stateCode = element['short_name'];
                                                    return;
                                                }
                                            });
                                        });
                                        (place.address_components).forEach(element => {
                                            (element.types).forEach(addressType => {
                                                if (addressType == 'country') {
                                                    countryCode = element['short_name'];
                                                    if (loader) {
                                                        loaderAnnouncement(loader, "Data Loading Complete", false);
                                                        $(loader).css('display', 'none');
                                                    }
                                                    if (sessionExamId) {
                                                        callSearchApi();
                                                    } else {
                                                        $.fn.loadMobiscrollCalendarData(locationTestCenterList);
                                                    }
                                                    return;
                                                }
                                            });
                                        });
                                    } else {
                                        if (detailServiceCount <= 3) {
                                            setTimeout(function() {
                                                getLocationService();
                                                detailServiceCount++;
                                            }, 25000);
                                        } else {
                                            if (loader) {
                                                loaderAnnouncement(loader, "Data Loading Complete", false);
                                                $(loader).css('display', 'none');
                                            }
                                            $.fn.showErrorInfo(detailStatus, testInfoResult ? testInfo : scheculeCalendarElement);
                                        }
                                    }
                                });
                            }
                            getLocationService();
                        }
                    } else {
                        if (placeServiceCount <= 3) {
                            setTimeout(function() {
                                findPlaceService();
                                placeServiceCount++;
                            }, 25000);
                        } else {
                            if (loader) {
                                loaderAnnouncement(loader, "Data Loading Complete", false);
                                $(loader).css('display', 'none');
                            }
                            $.fn.showErrorInfo(detailStatus, testInfoResult ? testInfo : scheculeCalendarElement);
                        }
                    }
                });
            }
            findPlaceService();
        } else {
            $.fn.loadMobiscrollCalendarData(locationTestCenterList);
        }
    }
});
$('.schedule-calendar-component .form-check').click(function() {
    const testFromHomeCheckbox = document.querySelector('#flexCheckDefault');
    if (testFromHomeCheckbox) {
        if (checked == true) {
            checked = false;
            $(testFromHomeCheckbox).prop('checked', false);
            $('#testFromHomeAnnouncement').html('Test From Home checkbox unchecked');
        } else {
            checked = true;
            $(testFromHomeCheckbox).prop('checked', true);
            $('#testFromHomeAnnouncement').html('Test From Home checkbox checked');
        }
    }
    $.fn.setTestFromHomeParam();
    $.fn.loadMobiscrollCalendarData(locationTestCenterList);
    testFromHomeCheckbox.parentElement.focus();
});
$.fn.filterTestCenterByDistance = function(testCenterDataList) {
    var filterDistanceTestCenterList = [];
    if (testCenterDataList) {
        Array.from(testCenterDataList).forEach(testCenterData => {
            var selectedAvailData = testCenterData.seatAvailability.availability.filter(availData => Number(availData.distance) <= Number(distance));
            if (selectedAvailData && selectedAvailData.length > 0) {
                filterDistanceTestCenterList.push(testCenterData);
            }
        });
    }
    filterDistanceTestCenterList.sort(function(a, b) {
        return (Number(a.seatAvailability.availability[0].distance) > Number(b.seatAvailability.availability[0].distance)) ? 1 : ((Number(a.seatAvailability.availability[0].distance) < Number(b.seatAvailability.availability[0].distance)) ? -1 : 0);
    });
    return filterDistanceTestCenterList;
};
$.fn.initialiseMobiscrollCalendar = function() {
    if (selectedCalendarDate == null) {
        selectedCalendarDate = new Date();
    }
    var calendarMaxDate = new Date();
    calendarMaxDate.setDate(new Date().getDate() + calendarDays);
    var calendarElement = document.getElementById('demo-custom-event-popover');
    if (calendarElement) {
        var currentDate = new Date();
        mobiscroll.setOptions({
            locale: mobiscroll.localeEn,
            theme: 'ios',
            themeVariant: 'light'
        });
        mobiscroll.setOptions({
            theme: 'ios',
            themeVariant: 'light',
            clickToCreate: false,
            dragToCreate: false,
            dragToMove: false,
            dragToResize: false,
            eventDelete: false
        });
        mobiScrollCalendar = $('#demo-custom-event-popover').mobiscroll().eventcalendar({
            view: {
                calendar: {
                    labels: true,
                    popover: true,
                    popoverClass: 'custom-event-popover'
                }
            },
            invalid: [{
                recurring: {
                    repeat: 'daily',
                    until: currentDate.setDate(new Date().getDate() - 1)
                }
            }],
            min: new Date(),
            max: calendarMaxDate,
            onSelectedDateChange: function(event, inst) {
                if ($(window).width() >= 768) {
                    inst._showEventPopover = false;
                } else {
                    inst._showEventPopover = true;
                }
                selectedCalendarDate = event.date;
                $.fn.disablePreviousButton(selectedCalendarDate);
            },
            renderLabel: function(data) {
                return '<div class="single-day-event-dot' + (data.original.remoteCenterOnly ? ' show-border-test' : ' show-border') + '"style="background:' + data.original.color + '"></div>' +
                    (data.original.remoteCenterOnly ? '<div class="d-none d-md-block single-day-event" style="color:' + data.original.remoteTextColor + ';border-bottom: 0.75px dashed' + data.original.remoteTextColor + ';">' + data.original.remoteTestName + '</div>' : '') +
                    (!data.original.remoteCenterOnly ? '<div class="d-none d-md-block single-day-event test-center-label">' + data.original.title + '</div>' : '') +
                    '<div class="d-block d-md-none single-day-event" style="color:' + data.original.mobileTextColor + '">' + data.original.mobileText + '</div>';
            },
            eventOrder: function(event) {
                return event.remoteCenterOnly ? -1 : 1;
            },
            renderEventContent: function(data) {
                if (cellClicked) {
                    return $.fn.showEventDetails(data);
                }
            },
            onCellClick: function(ev, inst) {
                if ($(window).width() < 768 && ev && ev.events && ev.events.length > 0) {
                    selectedEventInfo = null;
                    isTestFromHomeClicked = ev.events[0].isRemoteTestCenter;
                    testStartDate = ev.events[0].start;
                    testEndDate = ev.events[0].end;
                    popupDeliveryMode = ev.events[0].deliveryMode;
                    popupSiteCode = ev.events[0].siteCode;
                    testDate = $.datepicker.formatDate('mm/d/yy', new Date(ev.events[0].start));
                    inst._showEventPopover = true;
                    cellClicked = true;
                } else {
                    inst._showEventPopover = false;
                }
            },
            onLabelClick: function(event, inst) {
                selectedEventInfo = null;
                isTestFromHomeClicked = event.label.isRemoteTestCenter;
                testStartDate = event.label.start;
                testEndDate = event.label.end;
                popupDeliveryMode = event.label.deliveryMode;
                popupSiteCode = event.label.siteCode;
                testDate = $.datepicker.formatDate('mm/d/yy', new Date(event.label.start));
                inst._showEventPopover = true;
                cellClicked = true;
            },
            onPageChange: function(event, inst) {
                if (isAPICallForTwoMonths) {
                    if (event.month > apiEndDate) {
                        apiStartDate = event.month;
                        $.fn.CalculateAPIEndDate(60);
                    } else if (event.month < apiStartDate) {
                        if (event.month.getMonth() != apiStartDate.getMonth()) {
                            apiEndDate = new Date(event.month.getFullYear(), event.month.getMonth() + 1, 0);
                            $.fn.CalculateAPIStartDate(60);
                        }
                    }
                    callSearchApi(false, false);
                }
            },
            onPageLoaded: function(event, mobiScrollCalendar) {
                $.fn.disableCalendarMonth();
                $.fn.removeCalendaToday();
                if (setOneTimeLoad == 1) {
                    $.fn.disablePreviousButton(event.firstDay);
                    setOneTimeLoad++;
                }

                var calGridCell = document.querySelectorAll('.mbsc-calendar-cell');
                var calendarFocusLabel = $(calendarElement).data("calendar-focus-label");;
                $('.mbsc-calendar-cell .mbsc-calendar-labels').find('.mbsc-calendar-text').attr('role', 'button');
                if ($('.mbsc-calendar-body').length != 0) {
                    $('.mbsc-calendar-body').attr('tabindex', 0);
                    $('.mbsc-calendar-body').attr('role', 'application');
                    $('.mbsc-calendar-body').attr('aria-label', calendarFocusLabel);
                }
                $('.mbsc-calendar-button-prev').attr('aria-label','Previous month');
                $('.mbsc-calendar-button-next').attr('aria-label','Next month');
                Array.from(calGridCell).forEach(selectContainer => {
                    var eventsCount = $(selectContainer).find('.mbsc-calendar-labels .mbsc-calendar-text');
                    var eventsData= $(selectContainer).find('.mbsc-calendar-day-inner').attr('aria-label');

                    var gridMessage = eventsCount.length > 1 ? eventsData + ', Total ' + eventsCount.length + ' events are present' : eventsData + ', ' + eventsCount.length + ' event is present';
                    if (eventsCount.length > 0) {
                        $(selectContainer).attr({ 'aria-label': gridMessage + ', press tab to navigate through these events' });
                    } else {
                        $(selectContainer).attr({ 'aria-label': gridMessage + ', press arrow to navigate next day' });
                    }
                    $(selectContainer.querySelector('.mbsc-calendar-cell-inner.mbsc-calendar-day-inner.mbsc-ios')).removeAttr('role');
                    $(selectContainer.querySelector('.mbsc-calendar-day-text')).attr('aria-hidden', 'true');
                    selectContainer.querySelectorAll('.mbsc-calendar-text .mbsc-calendar-custom-label').forEach((elem) => {
                        if (elem.title !== '') {
                            elem.ariaLabel = elem.title + ', Press enter to open event details popoup';
                            elem.removeAttribute('title');
                        }
                    });
                    if ($(window).width() < 768) {
                        if (selectContainer.querySelectorAll('.show-border').length > 0 || selectContainer.querySelectorAll('.show-border-test').length > 0) {
                            $(selectContainer.querySelector('.mbsc-calendar-cell-inner')).addClass('showtest');
                        } else {
                            $(selectContainer.querySelector('.mbsc-calendar-cell-inner')).removeClass('showtest');
                        }
                        $(selectContainer).css('border', '0');
                    } else {
                        if (selectContainer.querySelectorAll('.show-border').length > 0) {
                            if ($(selectContainer).hasClass('mbsc-calendar-day-outer')) {
                                $(selectContainer).css('border-top', '1px solid #ccc');
                                $(selectContainer.querySelector('.mbsc-calendar-cell-inner')).removeClass('showtest');
                            } else {
                                $(selectContainer).css('border-top', '5px solid #151515');
                                $(selectContainer.querySelector('.mbsc-calendar-cell-inner')).addClass('showtest');
                            }
                        } else if (selectContainer.querySelectorAll('.show-border-test').length > 0) {
                            $(selectContainer).css('border-top', '1px solid #ccc');
                            $(selectContainer.querySelector('.mbsc-calendar-cell-inner')).addClass('showtest');
                        } else {
                            $(selectContainer).css('border-top', '1px solid #ccc');
                            $(selectContainer.querySelector('.mbsc-calendar-cell-inner')).removeClass('showtest');
                        }
                    }
                });
            }
        }).mobiscroll('getInst');
        mobiScrollCalendar._showEventPopover = $(window).width() >= 768 ? false : true;
    }
};

function counDateValidate(mode, paramSelectedDate) {
    var reportingDate = '';
    if (paramSelectedDate >= scoreReportMinDate && paramSelectedDate <= scoreReportMaxDate) {
        if (paramSelectedDate.getDay() < 3) {
            var tuesdayDate;
            tuesdayDate = paramSelectedDate;
            var tuesday;
            tuesday = mode + 2 - paramSelectedDate.getDay();
            tuesdayDate.setDate(tuesdayDate.getDate() + tuesday);
            reportingDate = tuesdayDate;
        } else {
            var fridayDate;
            fridayDate = paramSelectedDate;
            var friday;
            friday = mode + 5 - paramSelectedDate.getDay();
            fridayDate.setDate(fridayDate.getDate() + friday);
            reportingDate = fridayDate;
        }
    } else {
        reportingDate = '';
    }
    return reportingDate;
}
$.fn.showEventDetails = function(data) {
    var divString = '';
    var bannerTextStr = '';
    var scoreReportDate = '';
    var getDirectionOpenNewTab = $('#demo-custom-event-popover').data("get-direction-label");
    var dialogdescription = $('#demo-custom-event-popover').data("calendar-dialog-description");
    setTimeout(() => {
        // $('.mbsc-popup-focus').removeAttr('tabindex');
        $('.mbsc-popup-focus').html('<span aria-hidden="true">Event dialog is loading</span>');
        $('.mbsc-popup-focus').attr('aria-description', dialogdescription);
        $('.mbsc-popup-body').attr('role', 'presentation'); 
    }, 0);
    if (scoreReportDateList && scoreReportDateList.length) {
        const deliveryMode = scoreReportDateList[0].DeliveryMode;
        switch (deliveryMode) {
            case "r":
                var filteerscoreReportDateList = scoreReportDateList.filter(scoreDate => new Date(data.original.start) >= new Date(scoreDate["StartDate"]) && new Date(data.original.start) <= new Date(scoreDate["EndDate"]));
                if (filteerscoreReportDateList && filteerscoreReportDateList.length > 0) {
                    scoreReportDate = filteerscoreReportDateList[0]["ReportDate"];
                } else {
                    scoreReportDate = '';
                }
                break;
            case "7d":
                scoreReportDate = counDateValidate(7, new Date(data.original.start));
                break;
            case "21d":
                scoreReportDate = counDateValidate(21, new Date(data.original.start));
                break;
            case '20d':
            case '20b':
                scoreReportDate = counDateValidate(20, new Date(data.original.start));
                break;
        }
    } else {
        scoreReportDate = '';
    }
    if (scoreReportDate && scoreReportDate != '') {
        bannerTextStr = bannerText;
    }
    if (bannerTextStr && bannerTextStr != '') {
        bannerTextStr = bannerTextStr.replace('{Test}', testName + ' ');
        bannerTextStr = bannerTextStr.replace('{TestDate}', $.datepicker.formatDate('MM d, yy', new Date(data.original.start)));
        if (scoreReportDate && scoreReportDate != '') {
            bannerTextStr = bannerTextStr.replace('{ScoreReportDate}', $.datepicker.formatDate('MM d, yy', new Date(scoreReportDate)));
        } else {
            bannerTextStr = bannerTextStr.replace('{ScoreReportDate}', '');
        } 
    }
    if ($(window).width() < 768) {
        if (data.original.mobileKey == 'TFH') {
            divString = '<div class="md-custom-event-cont">' +
            '<button tabindex="0" aria-label="Close" role="button" id="calendar-popup-close-button" class="close-calendar-popup" onClick="$(this).popupCloseButtonClick()"></button>' +
                '<div tabindex="0" role="dialog" aria-label="'+ data.original.remoteTestName +'"  class="calendar-popup-container">' +
                (bannerTextStr && bannerTextStr != '' ? '<div class="calendar-popup-container--disclaimer">' +
                    '<p>' + bannerTextStr + '</p>' +
                    '</div>' : '') +
                '<div class="' + (data.original.remoteCenterOnly ? 'd-flex ' : 'd-none ') + 'calendar-popup-container--testfromhome">' +
                '<div class="calendar-popup-container--testfromhome--title">' + data.original.remoteTestName +
                '</div>' +
                '<div class="button cmp-button--primary cmp-button--rightIcon" onkeydown="$(this).testFromHomeScheduleButtonKeydown(event)">' +
                '<button type="button" id="testFromHomeScheduleButton" onClick="$(this).testFromHomeScheduleButtonClick()"  class="cmp-button" data-cmp-clickable="" data-cmp-data-layer="{&quot;button-5487aab983&quot;:{&quot;@type&quot;:&quot;core-components-examples/components/button&quot;,&quot;dc:title&quot;:&quot;Button&quot;}}">' +
                '<span class="cmp-button__icon cmp-button__icon--rightArrow" aria-hidden="true"></span>' +
                '<span class="cmp-button__text">' + scheduleButtonText + '</span>' +
                '</button>' +
                '</div>' +
                '<a tabindex="0" target="_blank" aria-label="' + testFromHomeRequirementText + ', Opens in a new window tab" onkeydown="$(this).testFromHomeRequirementKeydown(event)" href="' + testFromHomeRequirementUrl + '">' + testFromHomeRequirementText + '</a>' +
                '<div class="calendar-popup-container--testfromhome--availableTime">' +
                '<img class="d-none d-md-block" src="' + availableTimeImagePath + '" alt="">' +
                '<div class="calendar-popup-container--testfromhome--availableTime--container">' +
                '<div class="calendar-popup-container--testfromhome--availableTime--container--title">' + availableTimeLabel + '</div>' +
                '<div class="calendar-popup-container--testfromhome--availableTime--container--description"></div>' +
                '</div>' +
                '</div>' +
                '<div class="loader" style="display:flex; margin-top:0; width:100%;"><img style="width:100%;" src="' + loaderImagePath + '" alt="ets preloader" /></div>' +
                '<div role="alert" class="calendar-popup-error-info" style="display: none;">' +
                '<i><img src="' + errorImagePath + '" alt="error-image"/></i>' +
                '<p></p>' +
                '</div>' +
                (disclaimerText && disclaimerText != '' ? '<div class="calendar-popup-container--footer-disclaimer">' + disclaimerText + '</div>' : '') +
                '</div>' +
                '</div>';
            $.fn.getEventDetails('.calendar-popup-container', true);

        } else if (data.original.mobileKey == 'TC') {
            divString = '<div class="md-custom-event-cont">' +
            '<button tabindex="0" aria-label="Close" role="button" id="calendar-popup-close-button" class="close-calendar-popup" onClick="$(this).popupCloseButtonClick()"></button>' +
                '<div tabindex="0" role="dialog" aria-label="'+ testCenter +'" class="calendar-popup-container">' +
                (bannerTextStr && bannerTextStr != '' ? '<div class="calendar-popup-container--disclaimer">' +
                    '<p>' + bannerTextStr + '</p>' +
                    '</div>' : '') +
                '<div class="' + (!data.original.remoteCenterOnly ? 'd-flex ' : 'd-none ') + 'calendar-popup-container--testcenter">' +
                '<div class="calendar-popup-container--testcenter--title">' +
                testCenter +
                '</div>' +
                '<div class="button cmp-button--primary cmp-button--rightIcon" onkeydown="$(this).testCenterScheduleButtonKeydown(event)">' +
                '<button type="button" id="testCenterScheduleButton" onClick="$(this).testCenterScheduleButtonClick()" class="cmp-button" data-cmp-clickable="" data-cmp-data-layer="{&quot;button-5487aab983&quot;:{&quot;@type&quot;:&quot;core-components-examples/components/button&quot;,&quot;dc:title&quot;:&quot;Button&quot;}}">' +
                '<span class="cmp-button__icon cmp-button__icon--rightArrow" aria-hidden="true"></span>' +
                '<span class="cmp-button__text">' + scheduleButtonText + '</span>' +
                '</button>' +
                '</div>' +
                '<div class="calendar-popup-container--testcenter--address">' +
                '<img class="d-none d-md-block" src="' + addressImagePath + '" alt="">' +
                '<div class="calendar-popup-container--testcenter--address--container">' +
                '<div class="calendar-popup-container--testcenter--address--container--title">' + addressLabel + '</div>' +
                '<div class="calendar-popup-container--testcenter--address--container--description"><span>' + data.original.address + '</span> ' + data.original.distance + ' MI <a href="https://www.google.com/maps/dir/?api=1&origin=&destination=' + data.original.address.replace(/ /g, "+") + '&travelmode=car" aria-label="' + getDirectionOpenNewTab + '" target="_blank">' + getDirectionText + '</a></div>' +
                '</div>' +
                '</div>' +
                '<div class="calendar-popup-container--testcenter--availableTime">' +
                '<img class="d-none d-md-block" src="' + availableTimeImagePath + '" alt="">' +
                '<div class="calendar-popup-container--testcenter--availableTime--container">' +
                '<div class="calendar-popup-container--testcenter--availableTime--container--title">' + availableTimeLabel + '</div>' +
                '<div class="calendar-popup-container--testcenter--availableTime--container--description"></div>' +
                '</div>' +
                '</div>' +
                '<div class="loader" style="display:flex; margin-top:0; width:100%;"><img style="width:100%;" src="' + loaderImagePath + '" alt="ets preloader" /></div>' +
                '<div role="alert" class="calendar-popup-error-info" style="display: none;">' +
                '<i><img src="' + errorImagePath + '" alt="error-image"/></i>' +
                '<p></p>' +
                '</div>' +
                (disclaimerText && disclaimerText != '' ? '<div class="calendar-popup-container--footer-disclaimer">' + disclaimerText + '</div>' : '') +
                '</div>' +
                '</div>';
            $.fn.getEventDetails('.calendar-popup-container', false);
        } else if (data.original.mobileKey == 'B') {
            divString = '<div class="md-custom-event-cont">' +
            '<button tabindex="0" aria-label="Close" role="button" id="calendar-popup-close-button" class="close-calendar-popup" onClick="$(this).popupCloseButtonClick()"></button>' +
                '<div tabindex="0" role="dialog" aria-label="'+ data.original.remoteTestName +'" class="calendar-popup-container">' +
                (bannerTextStr && bannerTextStr != '' ? '<div class="calendar-popup-container--disclaimer">' +
                    '<p>' + bannerTextStr + '</p>' +
                    '</div>' : '') +
                '<div class="calendar-popup-container--testfromhome">' +
                '<div class="calendar-popup-container--testfromhome--title">' + data.original.remoteTestName +
                '</div>' +
                '<div class="button cmp-button--primary cmp-button--rightIcon" onkeydown="$(this).testFromHomeScheduleButtonKeydown(event)">' +
                '<button type="button" id="testFromHomeScheduleButton" onClick="$(this).testFromHomeScheduleButtonClick()" class="cmp-button" data-cmp-clickable="" data-cmp-data-layer="{&quot;button-5487aab983&quot;:{&quot;@type&quot;:&quot;core-components-examples/components/button&quot;,&quot;dc:title&quot;:&quot;Button&quot;}}">' +
                '<span class="cmp-button__icon cmp-button__icon--rightArrow" aria-hidden="true"></span>' +
                '<span class="cmp-button__text">' + scheduleButtonText + '</span>' +
                '</button>' +
                '</div>' +
                '<a tabindex="0" target="_blank" aria-label="' + testFromHomeRequirementText + ', Opens in a new window tab" onkeydown="$(this).testFromHomeRequirementKeydown(event)" href="' + testFromHomeRequirementUrl + '">' + testFromHomeRequirementText + '</a>' +
                '<div class="calendar-popup-container--testfromhome--description">' +
                testFromHomeDescription +
                '</div>' +
                '<div class="calendar-popup-container--testfromhome--availableTime">' +
                '<img class="d-none d-md-block" src="' + availableTimeImagePath + '" alt="">' +
                '<div class="calendar-popup-container--testfromhome--availableTime--container">' +
                '<div class="calendar-popup-container--testfromhome--availableTime--container--title">' + availableTimeLabel + '</div>' +
                '<div class="calendar-popup-container--testfromhome--availableTime--container--description"></div>' +
                '</div>' +
                '</div>' +
                '<div class="loader" style="display:flex; margin-top:0; width:100%;"><img style="width:100%;" src="' + loaderImagePath + '" alt="ets preloader" /></div>' +
                '<div role="alert" class="calendar-popup-error-info" style="display: none;">' +
                '<i><img src="' + errorImagePath + '" alt="error-image"/></i>' +
                '<p></p>' +
                '</div>' +
                (disclaimerText && disclaimerText != '' ? '<div class="calendar-popup-container--footer-disclaimer">' + disclaimerText + '</div>' : '') +
                '</div>' +
                '<div class="calendar-popup-container--separator"></div>' +
                '<div class="calendar-popup-container--testcenter">' +
                '<div class="calendar-popup-container--testcenter--title">' +
                testCenter +
                '</div>' +
                '<div class="button cmp-button--primary cmp-button--rightIcon" onkeydown="$(this).testCenterScheduleButtonKeydown(event)">' +
                '<button type="button" id="testCenterScheduleButton" onClick="$(this).testCenterScheduleButtonClick()" class="cmp-button" data-cmp-clickable="" data-cmp-data-layer="{&quot;button-5487aab983&quot;:{&quot;@type&quot;:&quot;core-components-examples/components/button&quot;,&quot;dc:title&quot;:&quot;Button&quot;}}">' +
                '<span class="cmp-button__icon cmp-button__icon--rightArrow" aria-hidden="true"></span>' +
                '<span class="cmp-button__text">' + scheduleButtonText + '</span>' +
                '</button>' +
                '</div>' +
                '<div class="calendar-popup-container--testcenter--address">' +
                '<img class="d-none d-md-block" src="' + addressImagePath + '" alt="">' +
                '<div class="calendar-popup-container--testcenter--address--container">' +
                '<div class="calendar-popup-container--testcenter--address--container--title">' + addressLabel + '</div>' +
                '<div class="calendar-popup-container--testcenter--address--container--description"><span>' + data.original.address + '</span> ' + data.original.distance + ' MI <a href="https://www.google.com/maps/dir/?api=1&origin=&destination=' + data.original.address.replace(/ /g, "+") + '&travelmode=car" aria-label="' + getDirectionOpenNewTab + '" target="_blank">' + getDirectionText + '</a></div>' +
                '</div>' +
                '</div>' +
                '<div class="calendar-popup-container--testcenter--availableTime">' +
                '<img class="d-none d-md-block" src="' + availableTimeImagePath + '" alt="">' +
                '<div class="calendar-popup-container--testcenter--availableTime--container">' +
                '<div class="calendar-popup-container--testcenter--availableTime--container--title">' + availableTimeLabel + '</div>' +
                '<div class="calendar-popup-container--testcenter--availableTime--container--description"></div>' +
                '</div>' +
                '</div>' +
                '<div class="loader" style="display:flex; margin-top:0; width:100%;"><img style="width:100%;" src="' + loaderImagePath + '" alt="ets preloader" /></div>' +
                '<div role="alert" class="calendar-popup-error-info" style="display: none;">' +
                '<i><img src="' + errorImagePath + '" alt="error-image"/></i>' +
                '<p></p>' +
                '</div>' +
                (disclaimerText && disclaimerText != '' ? '<div class="calendar-popup-container--footer-disclaimer">' + disclaimerText + '</div>' : '') +
                '</div>' +
                '</div>';
            $.fn.getEventDetails('.calendar-popup-container--testfromhome', true);
            $.fn.getEventDetails('.calendar-popup-container--testcenter', false);
        } else {
            divString = '';
        }
    } else {
        if (isTestFromHomeClicked && data.original.remoteCenterOnly) {
            divString = '<div class="md-custom-event-cont">' +
            '<button tabindex="0" aria-label="Close" role="button" id="calendar-popup-close-button" class="close-calendar-popup" onClick="$(this).popupCloseButtonClick()"></button>' +
                '<div tabindex="0" role="dialog" aria-label="'+ data.original.remoteTestName +'" class="calendar-popup-container">' +
                (bannerTextStr && bannerTextStr != '' ? '<div class="calendar-popup-container--disclaimer">' +
                    '<p>' + bannerTextStr + '</p>' +
                    '</div>' : '') +
                '<div class="' + (data.original.remoteCenterOnly ? 'd-flex ' : 'd-none ') + 'calendar-popup-container--testfromhome">' +
                '<div class="calendar-popup-container--testfromhome--title">' + data.original.remoteTestName +
                '</div>' +
                '<div class="button cmp-button--primary cmp-button--rightIcon" onkeydown="$(this).testFromHomeScheduleButtonKeydown(event)">' +
                '<button type="button" id="testFromHomeScheduleButton" onClick="$(this).testFromHomeScheduleButtonClick()" class="cmp-button" data-cmp-clickable="" data-cmp-data-layer="{&quot;button-5487aab983&quot;:{&quot;@type&quot;:&quot;core-components-examples/components/button&quot;,&quot;dc:title&quot;:&quot;Button&quot;}}">' +
                '<span class="cmp-button__icon cmp-button__icon--rightArrow" aria-hidden="true"></span>' +
                '<span class="cmp-button__text">' + scheduleButtonText + '</span>' +
                '</button>' +
                '</div>' +
                '<a tabindex="0" target="_blank" aria-label="' + testFromHomeRequirementText + ', Opens in a new window tab" onkeydown="$(this).testFromHomeRequirementKeydown(event)" href="' + testFromHomeRequirementUrl + '">' + testFromHomeRequirementText + '</a>' +
                '<div class="calendar-popup-container--testfromhome--availableTime">' +
                '<img class="d-none d-md-block" src="' + availableTimeImagePath + '" alt="">' +
                '<div class="calendar-popup-container--testfromhome--availableTime--container">' +
                '<div class="calendar-popup-container--testfromhome--availableTime--container--title">' + availableTimeLabel + '</div>' +
                '<div class="calendar-popup-container--testfromhome--availableTime--container--description"></div>' +
                '</div>' +
                '</div>' +
                '<div class="loader" style="display:flex; margin-top:0; width:100%;"><img style="width:100%;" src="' + loaderImagePath + '" alt="ets preloader" /></div>' +
                '<div role="alert" class="calendar-popup-error-info" style="display: none;">' +
                '<i><img src="' + errorImagePath + '" alt="error-image"/></i>' +
                '<p></p>' +
                '</div>' +
                (disclaimerText && disclaimerText != '' ? '<div class="calendar-popup-container--footer-disclaimer">' + disclaimerText + '</div>' : '') +
                '</div>' +
                '</div>';
            $.fn.getEventDetails('.calendar-popup-container', true);

        } else if (!isTestFromHomeClicked && !data.original.remoteCenterOnly) {
            divString = '<div class="md-custom-event-cont">' +
            '<button tabindex="0" aria-label="Close" role="button" id="calendar-popup-close-button" class="close-calendar-popup" onClick="$(this).popupCloseButtonClick()"></button>' +
                '<div tabindex="0" role="dialog" aria-label="'+ testCenter +'" class="calendar-popup-container">' +
                (bannerTextStr && bannerTextStr != '' ? '<div class="calendar-popup-container--disclaimer">' +
                    '<p>' + bannerTextStr + '</p>' +
                    '</div>' : '') +
                '<div class="' + (!data.original.remoteCenterOnly ? 'd-flex ' : 'd-none ') + 'calendar-popup-container--testcenter">' +
                '<div class="calendar-popup-container--testcenter--title">' +
                testCenter +
                '</div>' +
                '<div class="button cmp-button--primary cmp-button--rightIcon" onkeydown="$(this).testCenterScheduleButtonKeydown(event)">' +
                '<button type="button" id="testCenterScheduleButton" onClick="$(this).testCenterScheduleButtonClick()" class="cmp-button" data-cmp-clickable="" data-cmp-data-layer="{&quot;button-5487aab983&quot;:{&quot;@type&quot;:&quot;core-components-examples/components/button&quot;,&quot;dc:title&quot;:&quot;Button&quot;}}">' +
                '<span class="cmp-button__icon cmp-button__icon--rightArrow" aria-hidden="true"></span>' +
                '<span class="cmp-button__text">' + scheduleButtonText + '</span>' +
                '</button>' +
                '</div>' +
                '<div class="calendar-popup-container--testcenter--address">' +
                '<img class="d-none d-md-block" src="' + addressImagePath + '" alt="">' +
                '<div class="calendar-popup-container--testcenter--address--container">' +
                '<div class="calendar-popup-container--testcenter--address--container--title">' + addressLabel + '</div>' +
                '<div class="calendar-popup-container--testcenter--address--container--description"><span>' + data.original.address + '</span> ' + data.original.distance + ' MI <a href="https://www.google.com/maps/dir/?api=1&origin=&destination=' + data.original.address.replace(/ /g, "+") + '&travelmode=car" aria-label="' + getDirectionOpenNewTab + '" target="_blank">' + getDirectionText + '</a></div>' +
                '</div>' +
                '</div>' +
                '<div class="calendar-popup-container--testcenter--availableTime">' +
                '<img class="d-none d-md-block" src="' + availableTimeImagePath + '" alt="">' +
                '<div class="calendar-popup-container--testcenter--availableTime--container">' +
                '<div class="calendar-popup-container--testcenter--availableTime--container--title">' + availableTimeLabel + '</div>' +
                '<div class="calendar-popup-container--testcenter--availableTime--container--description"></div>' +
                '</div>' +
                '</div>' +
                '<div class="loader" style="display:flex; margin-top:0; width:100%;"><img style="width:100%;" src="' + loaderImagePath + '" alt="ets preloader" /></div>' +
                '<div role="alert" class="calendar-popup-error-info" style="display: none;">' +
                '<i><img src="' + errorImagePath + '" alt="error-image"/></i>' +
                '<p></p>' +
                '</div>' +
                (disclaimerText && disclaimerText != '' ? '<div class="calendar-popup-container--footer-disclaimer">' + disclaimerText + '</div>' : '') +
                '</div>' +
                '</div>';
            $.fn.getEventDetails('.calendar-popup-container', false);
        } else {
            divString = '';
        }
    }
    setTimeout(() => {
        if ($('.mbsc-popup-body').parent('.mbsc-popup').length == 1) {
            $('.mbsc-popup-body').parent('.mbsc-popup').attr('aria-label', 'Available Time Dialog');
        }
    }, 1000);
    return divString;
};
$.fn.scheduleBtnDataLayer = function(){
	const testType = $("#select2-where-to-test-dropdown-container").text();
	const testCenter = $("#select2-testCenter-dropdown-container").text();
	const brandTitle = $(".ets-brand").data("brand");
    window.dataLayer.push({
        "event": "calendar_schedule_selection",
        "test_name": testType,
        "brand": brandTitle,
        "test_center_code": testCenter
    });
};

$.fn.scheduleHomeTestBtnDataLayer = function(){
	const testType = $("#select2-where-to-test-dropdown-container").text();
	const testCenter = "Test from Home";
	const brandTitle = $(".ets-brand").data("brand");
    window.dataLayer.push({
        "event": "calendar_schedule_selection",
        "test_name": testType,
        "brand": brandTitle,
        "test_center_code": testCenter
    });
};

$.fn.popupCloseButtonClick = function () {
    var closePopuup = document.getElementById('calendar-popup-close-button');
    if(closePopuup) {
        $('.mbsc-popup-wrapper').trigger('click');
    }
};

$.fn.testCenterScheduleButtonClick = function() {
    this.scheduleBtnDataLayer();
    var templocationTestCenterList = locationTestCenterList.filter(data => data.siteCode == siteCode);
    window.open(scheduleURL + '?_p=' + programCode + '&testCode=' + testCode + '&deliveryMode=' + templocationTestCenterList[0].deliveryMode + '&testCenterId=' + siteCode + '&testDate=' + testDate + '&timeZoneId=' + timeZoneId, '_blank');
};
$.fn.testCenterScheduleButtonKeydown = function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        this.scheduleBtnDataLayer();
        var templocationTestCenterList = locationTestCenterList.filter(data => data.siteCode == siteCode);
        window.open(scheduleURL + '?_p=' + programCode + '&testCode=' + testCode + '&deliveryMode=' + templocationTestCenterList[0].deliveryMode + '&testCenterId=' + siteCode + '&testDate=' + testDate + '&timeZoneId=' + timeZoneId, '_blank');
    }
};
$.fn.testFromHomeScheduleButtonClick = function() {
    this.scheduleHomeTestBtnDataLayer();
    window.open(scheduleURL + '?_p=' + programCode + '&testCode=' + testCode + '&deliveryMode=' + filterTestFromHomeCenter.deliveryMode + '&testCenterId=' + filterTestFromHomeCenter.siteCode + '&testDate=' + testDate + '&timeZoneId=' + testFromHomeTimeZoneId, '_blank');
};
$.fn.testFromHomeScheduleButtonKeydown = function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        this.scheduleHomeTestBtnDataLayer();
        window.open(scheduleURL + '?_p=' + programCode + '&testCode=' + testCode + '&deliveryMode=' + filterTestFromHomeCenter.deliveryMode + '&testCenterId=' + filterTestFromHomeCenter.siteCode + '&testDate=' + testDate + '&timeZoneId=' + testFromHomeTimeZoneId, '_blank');
    }
};
$.fn.testFromHomeRequirementKeydown = function(event) {
    var _href = $(event.target).attr('href');
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if (keycode == '13') {
        window.open(_href, '_blank');
    }
};
$.fn.getEventDetails = function(eventContainer, isTestFromHome) {
    setTimeout(function() {
        var eventDeliveryMode = null;
        var eventSiteCode = null;
        var eventTimeZoneId = null;
        $.fn.getTimeZoneOffset(isTestFromHome);
        if (isTestFromHome) {
            eventDeliveryMode = filterTestFromHomeCenter.deliveryMode;
            eventSiteCode = filterTestFromHomeCenter.siteCode;
            eventTimeZoneId = testFromHomeTimeZoneId;
        } else {
            eventDeliveryMode = popupDeliveryMode;
            eventSiteCode = popupSiteCode;
            eventTimeZoneId = timeZoneId;
        }
        var dataPath = "/bin/ets/all-seats-availability.json?StartDate=" + encodeURIComponent(popupStartDate) + "&EndDate=" + encodeURIComponent(popupEndDate) + "&ExamId=" + testCode + "&DeliveryMode=" + eventDeliveryMode + "&TestDuration=PT" + popupTestDuration + "M&SiteCode=" + eventSiteCode + "&programCode=" + programCode + "&TimeZoneId=" + eventTimeZoneId + "&days=" + calendarDays + (programCode == 'PRX' ? "&StateCode=" + stateCode + "&CountryCode=" + countryCode : '');
        // var dataPath = "/src/main/webpack/components/json/testEvent.json";
        var retries = 0;
        var retryInterval = 25000;

        function seatAvailabilityAjaxCall() {
            $.ajax({
                async: false,
                type: "GET",
                url: dataPath,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(result) {
                    if (result.status == 'success') {
                        if (result.data && result.data.length > 0) {
                            selectedEventInfo = result.data;
                            showPopupError = false;
                            if (selectedEventInfo && selectedEventInfo.length > 0) {
                                var availTimeString = '';
                                Array.from(selectedEventInfo).forEach(eventInfo => {
                                    var startTimeList = eventInfo.startTime.split('T');
                                    var timeSplitList = startTimeList[1].split(':');
                                    var startHours = Number(timeSplitList[0]);
                                    var startMinute = Number(timeSplitList[1]);
                                    var availTimeHours = ((startHours + 11) % 12 + 1);
                                    var availTimeminute = startMinute;
                                    availTimeString = availTimeString + '<div><span>' + availTimeHours + ':' + (availTimeminute >= 10 ? availTimeminute : '0' + availTimeminute) + (startHours >= 12 ? ' p.m.' : ' a.m.') + '</span> ' + seatsOpenLabel + '</div>';
                                });
                                $.fn.showAvailableTime(eventContainer, isTestFromHome, '', availTimeString);
                            }
                        } else {
                            $.fn.showAvailableTime(eventContainer, isTestFromHome, result.errorMessage, '');
                        }
                    } else if (result.status == 'failure') {
                        retries++;
                        if (retries <= 3) {
                            setTimeout(function() {
                                seatAvailabilityAjaxCall();
                            }, retryInterval);
                        } else {
                            $.fn.showAvailableTime(eventContainer, isTestFromHome, result.errorMessage, '');
                        }
                    }
                },
                error: function(xhr, status, error) {
                    retries++;
                    if (retries <= 3) {
                        setTimeout(function() {
                            seatAvailabilityAjaxCall();
                        }, retryInterval);
                    } else {
                        var popover = document.querySelector(".mbsc-popup-content");
                        var popupContainer = popover.querySelector(eventContainer);
                        var loader = popupContainer.querySelector(".loader");
                        if (loader) {
                            loaderAnnouncement(loader, "Result Not Found", false);
                            $(loader).css('display', 'none');
                        }
                        //alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
                    }
                }
            });
        }
        var popoverAvail = document.querySelector(".mbsc-popup-content");
        if (popoverAvail) {
            seatAvailabilityAjaxCall();
        }
            
    }, 1000);
};
$.fn.getTimeZoneOffset = function(isTestFromHome) {
    var currentoffset = 0;
    var currentoffsetHour = 0;
    var currentoffsetMinute = 0;
    var offsetSign = '';
    if (isTestFromHome) {
        currentoffset = Math.abs(testFromHomeOffset);
        offsetSign = Math.sign(testFromHomeOffset) == -1 ? '-' : '+';
    } else {
        currentoffset = Math.abs(testCenterOffset);
        offsetSign = Math.sign(testCenterOffset) == -1 ? '-' : '+';
    }
    currentoffsetHour = Math.floor(currentoffset / 3600);
    currentoffsetMinute = Math.floor(currentoffset % 3600 / 60);

    popupStartDate = testStartDate + offsetSign + (currentoffsetHour >= 10 ? currentoffsetHour : '0' + currentoffsetHour) + ':' + (currentoffsetMinute >= 10 ? currentoffsetMinute : '0' + currentoffsetMinute);
    popupEndDate = testEndDate + offsetSign + (currentoffsetHour >= 10 ? currentoffsetHour : '0' + currentoffsetHour) + ':' + (currentoffsetMinute >= 10 ? currentoffsetMinute : '0' + currentoffsetMinute);
};
$.fn.showAvailableTime = function(eventContainer, isTestFromHome, errorMessage, availTimeString) {
    var popover = document.querySelector(".mbsc-popup-content");
    if (popover) {
        var popupContainer = popover.querySelector(eventContainer);
        var timeContainer = null;
        if (popupContainer) {
            if (isTestFromHome) {
                timeContainer = popupContainer.querySelector(".calendar-popup-container--testfromhome--availableTime--container--description");
            } else {
                timeContainer = popupContainer.querySelector(".calendar-popup-container--testcenter--availableTime--container--description");
            }
                
            var loader = popupContainer.querySelector(".loader");
            if (loader) {
                loaderAnnouncement(loader, "Data Loading Complete", false);
                $(loader).css('display', 'none');
            }
            if (timeContainer) {
                $(timeContainer).empty();
                if (availTimeString != '') {
                    $(availTimeString).appendTo(timeContainer);
                }
                    
            }
        }
        if (errorMessage != '') {
            var errorConatiner = popupContainer.querySelector(".calendar-popup-error-info");
            if (errorConatiner) {
                $(errorConatiner).css('display', 'flex');
                var paraTag = errorConatiner.querySelector("p");
                paraTag.innerHTML = errorMessage;
            }
        }
    }
};
$.fn.getTimeZoneId = function(latitudeparam, longitudeparam, isTestFromHome) {
    $.ajax({
        async: false,
        type: "GET",
        // url: '/src/main/webpack/components/json/timeZoneId.json',
        url: '/bin/ets/timeZoneId.json?location=' + latitudeparam + ',' + longitudeparam + '&timestamp=0',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
            if (isTestFromHome) {
                testFromHomeTimeZoneId = result.timeZoneId;
                testFromHomeOffset = result.rawOffset;
            } else {
                timeZoneId = result.timeZoneId;
                testCenterOffset = result.rawOffset;
            }
        },
        error: function(xhr, status, error) {
            alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText);
        }
    });
};
$.fn.disablePreviousButton = function(eventDate) {
    var startDate = eventDate;
    var calendarPreviousbtn = document.querySelector('.mbsc-calendar-button-prev');
    if (calendarPreviousbtn) {
        var prevSVG = calendarPreviousbtn.querySelector('svg');
        if (prevSVG) {
            prevSVG.setAttribute('role', 'presentation');
        }
            
    }
    if (startDate > new Date() && startDate.getMonth() != new Date().getMonth()) {
        if (calendarPreviousbtn) {
            calendarPreviousbtn.removeAttribute('disabled');
        }
           
    } else {
        if (calendarPreviousbtn) {
            calendarPreviousbtn.setAttribute('disabled', true);
        }
            
    }
    var calendarNextbtn = document.querySelector('.mbsc-calendar-button-next');
    if (calendarNextbtn) {
        var nextSVG = calendarNextbtn.querySelector('svg');
        if (nextSVG) {
            nextSVG.setAttribute('role', 'presentation');
        }
            
    }
    startDate.setDate(1);
    startDate.setMonth(startDate.getMonth() + 1);
    var currentDate = new Date();
    currentDate.setDate(new Date().getDate() + calendarDays);
    if (startDate <= currentDate) {
        if (calendarNextbtn) {
            calendarNextbtn.removeAttribute('disabled');
        }
    } else {
        if (calendarNextbtn) {
            calendarNextbtn.setAttribute('disabled', true);
        }
    }
};
$.fn.loadMobiscrollCalendarData = function(testcenterList) {
    if (testcenterList && testcenterList.length > 0) {
        testcenterList = testcenterList.filter(testFromHomeData => testFromHomeData.isRemoteTestCenter == false);
    }
    var calendarElement = document.getElementById('demo-custom-event-popover');
    if (calendarElement) {
        var testCenterShortName = '';
        var testFromHomeShortName = '';
        var testBothShortName = '';
        var testCenterSpan = document.querySelector('.schedule-calendar-component--legends--test-center');
        if (testCenterSpan) {
            testCenterShortName = testCenterSpan.innerHTML;
        }
            
        var testFromHomeSpan = document.querySelector('.schedule-calendar-component--legends--test-from-home');
        if (testFromHomeSpan) {
            testFromHomeShortName = testFromHomeSpan.innerHTML;
        }
            
        var testBothSpan = document.querySelector('.schedule-calendar-component--legends--both');
        if (testBothSpan) {
            testBothShortName = testBothSpan.innerHTML;
        }
            
        var availableDatList = [];
        var testFromHomeLabel = $(calendarElement).data("test-from-home-label");
        bannerText = $(calendarElement).data("banner-text");
        brandName = $(calendarElement).data("brand-name");
        testFromHomeDescription = $(calendarElement).data("test-from-home-description");
        scheduleButtonText = $(calendarElement).data("schedule-button-text");
        scheduleButtonUrl = $(calendarElement).data("schedule-button-url");
        testFromHomeRequirementText = $(calendarElement).data("test-from-home-requirement-text");
        testFromHomeRequirementUrl = $(calendarElement).data("test-from-home-requirement-url");
        addressLabel = $(calendarElement).data("address-label");
        availableTimeLabel = $(calendarElement).data("available-time-label");
        seatsOpenLabel = $(calendarElement).data("seats-open-label");
        getDirectionText = $(calendarElement).data("get-direction-text");
        errorImagePath = $(calendarElement).data("error-image-path");
        addressImagePath = $(calendarElement).data("address-image-path");
        availableTimeImagePath = $(calendarElement).data("available-time-image-path");
        scheduleURL = $(calendarElement).data("schedule-url");
        loaderImagePath = $(calendarElement).data("loader-image-path");
        disclaimerText = $(calendarElement).data("disclaimer-text");
        var scoreReportPath = $(calendarElement).data("score-report-path");
        scoreReportMinDate = new Date($(calendarElement).data("minschdate"));
        scoreReportMaxDate = new Date($(calendarElement).data("maxschdate"));
        var scoreReportFilterData = [];
        if (testCode) {
            $.ajax({
                async: false,
                type: "GET",
                url: scoreReportPath,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function(result) {
                    if (result && result.scorereportcalendar.length > 0) {
                        var testScoreData = result.scorereportcalendar.filter(scoreFilter => scoreFilter["TestNameAndCode"].includes(testCode.toString()));
                        scoreReportFilterData = result.scorereportcalendar.filter(scoreFilter => scoreFilter["TestNameAndCode"].includes(testCode.toString()) && scoreFilter["DeliveryMode"] == 'r');
                        if (testScoreData && testScoreData.length > 0) {
                            scoreReportDateList = testScoreData;
                        } else {
                            scoreReportDateList = [];
                        }
                    } else {
                        scoreReportDateList = [];
                    }
                },
                error: function(xhr, status, error) {
                    scoreReportDateList = [];
                }
            });
        }
        if ((siteCode != null && siteCode != '') && testcenterList) {
            var selectedTestCenter = testcenterList.filter(data => data.siteCode == siteCode);
            if ($(window).width() < 768) {
                $.each(selectedTestCenter, function(index, testCenterData) {
                    Array.from(testCenterData.seatAvailability.availability).forEach(availableDate => {
                        var isDateAvailable = false;
                        if (scoreReportFilterData && scoreReportFilterData.length > 0) {
                            Array.from(scoreReportFilterData).forEach(scoreReporteRegData => {
                                if (new Date(availableDate.adminDate) >= new Date(scoreReporteRegData.StartDate) && new Date(availableDate.adminDate) <= new Date(scoreReporteRegData.EndDate)) {
                                    isDateAvailable = true;
                                    return;
                                }
                            });
                        } else {
                            isDateAvailable = true;
                        }
                        if (isDateAvailable) {
                            var isRemoteTestCenter = false;
                            if (checked) {
                                if (filterTestFromHomeCenter) {
                                    var testFromHomeAvailability = filterTestFromHomeCenter.seatAvailability.availability.filter(availabilityData => availabilityData.adminDate == availableDate.adminDate);
                                    if (testFromHomeAvailability && testFromHomeAvailability.length > 0) {
                                        isRemoteTestCenter = true;
                                    }
                                        
                                }
                            }
                            var DateDetails = {
                                testCenterName: testCenterData.siteName,
                                siteCode: testCenterData.siteCode,
                                Date: availableDate.adminDate,
                                isRemoteCenterAvailable: testCenterData.isRemoteTestCenter,
                                isRemoteTestCenter: isRemoteTestCenter ? true : false,
                                remoteTestName: testFromHomeLabel,
                                remoteCenterOnly: false,
                                address: (testCenterData.address[0].addressLine1 ? testCenterData.address[0].addressLine1 + ', ' : '') + (testCenterData.address[0].city ? testCenterData.address[0].city + ', ' : '') + (testCenterData.address[0].state ? testCenterData.address[0].state : '') + ' ' + testCenterData.address[0].postalCode,
                                distance: availableDate.distance,
                                deliveryMode: testCenterData.deliveryMode,
                                siteCode: testCenterData.siteCode
                            };
                            if (availableDatList.length == 0) {
                                availableDatList.push(DateDetails);
                            } else {
                                var selectedTestCenterDate = availableDatList.filter(data => data.Date == availableDate.adminDate && data.isRemoteTestCenter == false);
                                if (!selectedTestCenterDate || selectedTestCenterDate.length == 0) {
                                    availableDatList.push(DateDetails);
                                }
                            }
                        }
                    });
                });
                if (checked && filterTestFromHomeCenter) {
                    Array.from(filterTestFromHomeCenter.seatAvailability.availability).forEach(availableDate => {
                        var isDateAvailable = false;
                        if (scoreReportFilterData && scoreReportFilterData.length > 0) {
                            Array.from(scoreReportFilterData).forEach(scoreReporteRegData => {
                                if (new Date(availableDate.adminDate) >= new Date(scoreReporteRegData.StartDate) && new Date(availableDate.adminDate) <= new Date(scoreReporteRegData.EndDate)) {
                                    isDateAvailable = true;
                                    return;
                                }
                            });
                        } else {
                            isDateAvailable = true;
                        }
                        if (isDateAvailable) {
                            var DateDetails = {
                                testCenterName: filterTestFromHomeCenter.siteName,
                                siteCode: filterTestFromHomeCenter.siteCode,
                                Date: availableDate.adminDate,
                                isRemoteCenterAvailable: filterTestFromHomeCenter.isRemoteTestCenter,
                                isRemoteTestCenter: true,
                                remoteTestName: testFromHomeLabel,
                                remoteCenterOnly: true,
                                address: (filterTestFromHomeCenter.address[0].addressLine1 ? filterTestFromHomeCenter.address[0].addressLine1 + ', ' : '') + (filterTestFromHomeCenter.address[0].city ? filterTestFromHomeCenter.address[0].city + ', ' : '') + (filterTestFromHomeCenter.address[0].state ? filterTestFromHomeCenter.address[0].state : '') + ' ' + filterTestFromHomeCenter.address[0].postalCode,
                                distance: availableDate.distance,
                                deliveryMode: filterTestFromHomeCenter.deliveryMode,
                                siteCode: filterTestFromHomeCenter.siteCode
                            };
                            if (availableDatList.length == 0) {
                                availableDatList.push(DateDetails);
                            } else {
                                var selectedTestCenterDate = availableDatList.filter(data => data.Date == availableDate.adminDate);
                                if (!selectedTestCenterDate || selectedTestCenterDate.length == 0) {
                                    availableDatList.push(DateDetails);
                                }
                            }
                        }
                    });
                }
            } else {
                $.each(selectedTestCenter, function(index, testCenterData) {
                    Array.from(testCenterData.seatAvailability.availability).forEach(availableDate => {
                        var isDateAvailable = false;
                        if (scoreReportFilterData && scoreReportFilterData.length > 0) {
                            Array.from(scoreReportFilterData).forEach(scoreReporteRegData => {
                                if (new Date(availableDate.adminDate) >= new Date(scoreReporteRegData.StartDate) && new Date(availableDate.adminDate) <= new Date(scoreReporteRegData.EndDate)) {
                                    isDateAvailable = true;
                                    return;
                                }
                            });
                        } else {
                            isDateAvailable = true;
                        }
                        if (isDateAvailable) {
                            var DateDetails = {
                                testCenterName: testCenterData.siteName,
                                siteCode: testCenterData.siteCode,
                                Date: availableDate.adminDate,
                                isRemoteCenterAvailable: testCenterData.isRemoteTestCenter,
                                isRemoteTestCenter: false,
                                remoteTestName: testFromHomeLabel,
                                remoteCenterOnly: false,
                                address: (testCenterData.address[0].addressLine1 ? testCenterData.address[0].addressLine1 + ', ' : '') + (testCenterData.address[0].city ? testCenterData.address[0].city + ', ' : '') + (testCenterData.address[0].state ? testCenterData.address[0].state : '') + ' ' + testCenterData.address[0].postalCode,
                                distance: availableDate.distance,
                                deliveryMode: testCenterData.deliveryMode,
                                siteCode: testCenterData.siteCode
                            };
                            if (availableDatList.length == 0) {
                                availableDatList.push(DateDetails);
                            } else {
                                var selectedTestCenterDate = availableDatList.filter(data => data.Date == availableDate.adminDate && data.isRemoteTestCenter == false);
                                if (!selectedTestCenterDate || selectedTestCenterDate.length == 0) {
                                    availableDatList.push(DateDetails);
                                }
                            }
                        }
                    });
                });
                if (checked && filterTestFromHomeCenter) {
                    Array.from(filterTestFromHomeCenter.seatAvailability.availability).forEach(availableDate => {
                        var isDateAvailable = false;
                        if (scoreReportFilterData && scoreReportFilterData.length > 0) {
                            Array.from(scoreReportFilterData).forEach(scoreReporteRegData => {
                                if (new Date(availableDate.adminDate) >= new Date(scoreReporteRegData.StartDate) && new Date(availableDate.adminDate) <= new Date(scoreReporteRegData.EndDate)) {
                                    isDateAvailable = true;
                                    return;
                                }
                            });
                        } else {
                            isDateAvailable = true;
                        }
                        if (isDateAvailable) {
                            var DateDetails = {
                                testCenterName: filterTestFromHomeCenter.siteName,
                                siteCode: filterTestFromHomeCenter.siteCode,
                                Date: availableDate.adminDate,
                                isRemoteCenterAvailable: filterTestFromHomeCenter.isRemoteTestCenter,
                                isRemoteTestCenter: true,
                                remoteTestName: testFromHomeLabel,
                                remoteCenterOnly: true,
                                address: (filterTestFromHomeCenter.address[0].addressLine1 ? filterTestFromHomeCenter.address[0].addressLine1 + ', ' : '') + (filterTestFromHomeCenter.address[0].city ? filterTestFromHomeCenter.address[0].city + ', ' : '') + (filterTestFromHomeCenter.address[0].state ? filterTestFromHomeCenter.address[0].state : '') + ' ' + filterTestFromHomeCenter.address[0].postalCode,
                                distance: availableDate.distance,
                                deliveryMode: filterTestFromHomeCenter.deliveryMode,
                                siteCode: filterTestFromHomeCenter.siteCode
                            };
                            if (availableDatList.length == 0) {
                                availableDatList.push(DateDetails);
                            } else {
                                var selectedTestCenterDate = availableDatList.filter(data => data.Date == availableDate.adminDate && data.isRemoteTestCenter == true);
                                if (!selectedTestCenterDate || selectedTestCenterDate.length == 0) {
                                    availableDatList.push(DateDetails);
                                }
                            }
                        }
                    });
                }
            }
        } else if (checked && filterTestFromHomeCenter) {
            Array.from(filterTestFromHomeCenter.seatAvailability.availability).forEach(availableDate => {
                var isDateAvailable = false;
                if (scoreReportFilterData && scoreReportFilterData.length > 0) {
                    Array.from(scoreReportFilterData).forEach(scoreReporteRegData => {
                        if (new Date(availableDate.adminDate) >= new Date(scoreReporteRegData.StartDate) && new Date(availableDate.adminDate) <= new Date(scoreReporteRegData.EndDate)) {
                            isDateAvailable = true;
                            return;
                        }
                    });
                } else {
                    isDateAvailable = true;
                }
                if (isDateAvailable) {
                    var DateDetails = {
                        testCenterName: filterTestFromHomeCenter.siteName,
                        siteCode: filterTestFromHomeCenter.siteCode,
                        Date: availableDate.adminDate,
                        isRemoteCenterAvailable: filterTestFromHomeCenter.isRemoteTestCenter,
                        isRemoteTestCenter: checked && filterTestFromHomeCenter.isRemoteTestCenter ? true : false,
                        remoteTestName: testFromHomeLabel,
                        remoteCenterOnly: true,
                        address: (filterTestFromHomeCenter.address[0].addressLine1 ? filterTestFromHomeCenter.address[0].addressLine1 + ', ' : '') + (filterTestFromHomeCenter.address[0].city ? filterTestFromHomeCenter.address[0].city + ', ' : '') + (filterTestFromHomeCenter.address[0].state ? filterTestFromHomeCenter.address[0].state : '') + ' ' + filterTestFromHomeCenter.address[0].postalCode,
                        distance: availableDate.distance,
                        deliveryMode: filterTestFromHomeCenter.deliveryMode,
                        siteCode: filterTestFromHomeCenter.siteCode
                    };
                    if (availableDatList.length == 0) {
                        availableDatList.push(DateDetails);
                    } else {
                        var selectedTestCenterDate = availableDatList.filter(data => data.Date == availableDate.adminDate && data.isRemoteTestCenter == true);
                        if (!selectedTestCenterDate || selectedTestCenterDate.length == 0) {
                            availableDatList.push(DateDetails);
                        }
                    }
                }
            });
        }
        if (availableDatList) {
            dateAvailable = [];
            dateAvailable1 = [];
            for (var l = 0; l < availableDatList.length; l++) {
                var date = availableDatList[l].Date;
                var start = date + 'T00:00:00';
                var end = date + 'T23:59:59';
                var calendarData = {};
                calendarData.id = l;
                calendarData.start = start;
                calendarData.end = end;
                calendarData.title = availableDatList[l].testCenterName;
                calendarData.color = '#ffffff';
                calendarData.textColor = '#A03137';
                calendarData.remoteTextColor = '#003356';
                calendarData.isRemoteTestCenter = availableDatList[l].isRemoteTestCenter;
                calendarData.remoteTestName = availableDatList[l].remoteTestName;
                calendarData.mobileText = availableDatList[l].remoteCenterOnly ? testFromHomeShortName : (availableDatList[l].isRemoteTestCenter ? testBothShortName : testCenterShortName);
                calendarData.mobileTextColor = availableDatList[l].remoteCenterOnly ? '#3072BE' : (availableDatList[l].isRemoteTestCenter ? '#785701' : '#A03137');
                calendarData.remoteCenterOnly = availableDatList[l].remoteCenterOnly;
                calendarData.mobileKey = availableDatList[l].remoteCenterOnly ? 'TFH' : (availableDatList[l].isRemoteTestCenter ? 'B' : 'TC');
                calendarData.address = availableDatList[l].address;
                calendarData.distance = availableDatList[l].distance;
                calendarData.deliveryMode = availableDatList[l].deliveryMode;
                calendarData.siteCode = availableDatList[l].siteCode;
                dateAvailable.push(calendarData);
                dateAvailable1 = dateAvailable;
            }
            mobiScrollCalendar.setEvents(dateAvailable1);
        }
    }
};
$(window).on('resize', function() {
    $.fn.initialiseMobiscrollCalendar();
    $.fn.loadMobiscrollCalendarData(locationTestCenterList);
});
$.fn.setTestFromHomeParam = function() {
    var queryParams = new URLSearchParams(window.location.search);
    if (checked) {
        queryParams.set("testFromHome", checked);
        window.history.replaceState({}, document.title, "?" + queryParams.toString());
    } else {
        var uri = window.location.toString();
        var cleanUri = uri.substring(0, uri.indexOf("?"));
        window.history.replaceState({}, document.title, cleanUri);
    }
};
$.fn.removeSelectedTestCenterData = function() {
    siteCode = '';
    testCenter = '';
    sessionStorage.removeItem("siteCode");
};
$.fn.disableCalendarMonth = function() {
    var calendartitleWrapper = document.querySelector('.mbsc-calendar-title-wrapper');
    if (calendartitleWrapper) {
        $(calendartitleWrapper).find('button')[0].setAttribute('tabindex', -1);
    }
};
$.fn.removeCalendaToday = function() {
    var calendartodaybutton = document.querySelector('.mbsc-calendar-button-today');
    if (calendartodaybutton) {
        $('.mbsc-calendar-button-today').remove();
    }
};
$.fn.testInfoPagination = function(totalResult) {
    var _totalPage = Math.ceil(totalResult / pageSize);
    if(_totalPage > 1) {
        $('.testInfoPagination').removeClass('d-none');
        if(testInfoPaginationReInitFlag) {
            $('.testInfoPagination').litePagination('destroy');
            $('.testInfoPagination').litePagination({
                currentPage  : 1,
                // link_string   : '/?pages={page_number}',
                maxPage: _totalPage,
                pageString   : '{currentPage}',
                reInit: true,
                paged : function (page) {
                    $.fn.testInfoHandlingPagination(page);
                    $.fn.scrollTestCenterResult();
                }
            });
        } else {
            $('.testInfoPagination').litePagination({
                currentPage  : 1,
                // link_string   : '/?pages={page_number}',
                maxPage: _totalPage,
                pageString   : '{currentPage}',
                reInit: false,
                paged : function (page) {
                    $.fn.testInfoHandlingPagination(page);
                    $.fn.scrollTestCenterResult();
                } 
            });
            testInfoPaginationReInitFlag = true;
        }
    } else {
        $('.testInfoPagination').addClass('d-none');
    }
};
$.fn.testInfoHandlingPagination = function(page) {
    if (loadNextMonthData) {
        loadNextMonthData = false;
        var newStartDate = new Date(apiEndDate);
        apiStartDate = new Date(newStartDate.setDate(newStartDate.getDate() + 1));
        $.fn.CalculateAPIEndDate(60);
        callSearchApi(true);
    } else {
        populateResultData(page);
    }
};
// $('#testInfoLoadmoreBtn').on('click', function(e) {
//     currentPageNumber = currentPageNumber + 1;
//     if (loadNextMonthData) {
//         loadNextMonthData = false;
//         var newStartDate = new Date(apiEndDate);
//         apiStartDate = new Date(newStartDate.setDate(newStartDate.getDate() + 1));
//         $.fn.CalculateAPIEndDate(60);
//         callSearchApi(true);
//     } else {
//         populateResultData(currentPageNumber);
//     }
// });
$('.schedule-calendar-component .form-check').keypress(function(e) {
    if (!$(this).hasClass('disabled')) {
        if (e.keyCode == 32) {
            e.preventDefault();
            const testFromHomeCheckbox = document.querySelector('#flexCheckDefault');
            if (testFromHomeCheckbox) {
                if (checked == true) {
                    checked = false;
                    $(testFromHomeCheckbox).prop('checked', false);
                } else {
                    checked = true;
                    $(testFromHomeCheckbox).prop('checked', true);
                }
            }
            $.fn.setTestFromHomeParam();
            $.fn.loadMobiscrollCalendarData(locationTestCenterList);
            testFromHomeCheckbox.parentElement.focus();
        }
    }
});
$('.schedule-calendar-component').on('focusout', '#locationautocomplete', function(e) {
    if (!$(this).val()) {
        $(this).parent().addClass('required-field-msg');
        $(this).parent().parent().siblings('.drop-down-error-label').removeClass('d-none');
        $(this).siblings('.ets-dropdown-button').removeClass('d-none');
        locationName = '';
        latitude = null;
        longitude = null;
        sessionStorage.removeItem("locationInfo");
    }
});
$('.schedule-calendar-component').on('focusout', '.select2-container', function(e) {
    var selectElement = $(this).siblings('.where-to-test-dropdown');
    if (selectElement.length > 0) {
        if (testName == '') {
            $(this).parent().addClass('required-select-field');
            $(this).siblings('.drop-down-error-label').removeClass('d-none');
        }
    }
});
$.fn.CalculateAPIEndDate = function(numberOfDays) {
    var calendarMaxDate = new Date();
    calendarMaxDate.setDate(new Date().getDate() + calendarDays);
    var startDateNew = new Date(apiStartDate);
    var newEndDate = new Date(startDateNew.setDate(startDateNew.getDate() + numberOfDays));
    var lastDayOfMonth = new Date(newEndDate.getFullYear(), newEndDate.getMonth() + 1, 0);
    if (newEndDate.getDate() < 15) {
        newEndDate = new Date(newEndDate.setDate(newEndDate.getDate() - newEndDate.getDate()));
    } else {
        newEndDate = lastDayOfMonth;
    }
    apiEndDate = newEndDate;
    if (newEndDate > calendarMaxDate) {
        apiEndDate = calendarMaxDate;
    }
        
};
$.fn.CalculateAPIStartDate = function(numberOfDays) {
    var calendarMinDate = new Date();
    var endDateNew = new Date(apiEndDate);
    var newStartDate = new Date(endDateNew.setDate(endDateNew.getDate() - numberOfDays));
    var firstDayOfMonth = new Date(newStartDate.getFullYear(), newStartDate.getMonth(), 1);
    if (newStartDate.getMonth() - 1 === calendarMinDate.getMonth() && calendarMinDate.getDate() > 15) {
        newStartDate = calendarMinDate;
    } else {
        newStartDate = firstDayOfMonth;
    }
    apiStartDate = newStartDate;
    if (newStartDate < calendarMinDate) {
        apiStartDate = calendarMinDate;
    }
        
};
$.fn.productBasedFilterFn = function(filterTestCenterData) {
    let productBasedFilterList = [];
    if (programCode == 'GRI' && testCode == 'GEN') {
        productBasedFilterList = filterTestCenterData.filter(testData => String(testData.siteCode).startsWith('3'));
    } else if (programCode == 'GRI' && testCode != 'GEN') {
        productBasedFilterList = filterTestCenterData.filter(testData => String(testData.siteCode).startsWith('3'));
        filterTestCenterData.forEach((centerData, index) => {
            const filteredDateCenterList = centerData.seatAvailability.availability.filter(dateData => (new Date(dateData.adminDate) >= new Date('2023-09-25') && new Date(dateData.adminDate) <= new Date('2023-10-08')) || (new Date(dateData.adminDate) >= new Date('2023-10-24') && new Date(dateData.adminDate) <= new Date('2023-11-06')) || (new Date(dateData.adminDate) >= new Date('2024-04-07') && new Date(dateData.adminDate) <= new Date('2024-04-20')));
            if (filteredDateCenterList && filteredDateCenterList.length > 0) {
                filterTestCenterData[index].seatAvailability.availability = filteredDateCenterList;
            } else {
                if (productBasedFilterList) {
                    productBasedFilterList.push(centerData);
                }
            }
        });
    } else if (programCode == 'TEL' && testCode != 'ESS') {
        productBasedFilterList = filterTestCenterData.filter(testData => String(testData.siteCode).startsWith('1'));
    } else if (programCode == 'PRX') {
        productBasedFilterList = filterTestCenterData.filter(testData => String(testData.siteCode).startsWith('6'));
    } else if (programCode == 'SLS') {
        productBasedFilterList = filterTestCenterData.filter(testData => String(testData.siteCode).startsWith('6'));
    } else {
        productBasedFilterList = [];
    }
    productBasedFilterList.forEach(testData => {
        const index = filterTestCenterData.findIndex(center => center.siteCode === testData.siteCode);
        if (index >= 0) {
            filterTestCenterData.splice(index, 1);
        }
            
    });
    return filterTestCenterData;
};
$.fn.productBasedHomeCenterFilterFn = function(filterTestFromHomeCenter) {
    if (programCode == 'GRI' && testCode != 'GEN') {
        const filteredDateCenterList = filterTestFromHomeCenter.seatAvailability.availability.filter(dateData => (new Date(dateData.adminDate) >= new Date('2023-09-25') && new Date(dateData.adminDate) <= new Date('2023-10-08')) || (new Date(dateData.adminDate) >= new Date('2023-10-24') && new Date(dateData.adminDate) <= new Date('2023-11-06')) || (new Date(dateData.adminDate) >= new Date('2024-04-07') && new Date(dateData.adminDate) <= new Date('2024-04-20')));
        if (filteredDateCenterList && filteredDateCenterList.length > 0) {
            filterTestFromHomeCenter.seatAvailability.availability = filteredDateCenterList;
        } else {
            filterTestFromHomeCenter.seatAvailability.availability = [];
        }
    }
    return filterTestFromHomeCenter;
};
