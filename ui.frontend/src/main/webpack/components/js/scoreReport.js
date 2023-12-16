var api =$("#score-report").data('report-json');
// var api = "/src/main/webpack/components/json/scorereportcalendarNew.json";
var testData = {};
var selectedData = [];
var yearlist = [];
var selectedTest = "";
var selectedMonth = "";
var selectedMonthVal = "";
var selectedDay = "";
var selectedYear = 1;
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var currDate = new Date();
var reportingDate = "";
 //var minDate= new Date(2022, 6, 1);
 //var maxDate= new Date(2023, 12, 31);
var minDate = new Date($("#score-report").data('mindate'));
var maxDate = new Date($("#score-report").data('maxdate'));
var dyAriaLabel = '';
var dmAriaLabel = '';
var ddAriaLabel = '';
var yearloopStopFlag = 1;
var monloopStopFlag = 1;
var dateloopStopFlag = 1;
function setMonth() {
  $.each(months, function (index, value) {
    var i = index + 1;
    $("#dateMonth").append('<option value="' + i + '">' + value + "</option>");
  });
  $("#dateMonth").select2({
    placeholder: $("#dateMonth").data("placeholder"),
    minimumResultsForSearch: Infinity,
    disabled: true,
    selectionCssClass: "singleselect-withoutsearch",
    dropdownCssClass: "singleselect-withoutsearch",
  });
  if(monloopStopFlag == 1) {
    dmAriaLabel = $("#dateMonth").attr('aria-label');
    monloopStopFlag++;
  }
  setTimeout(() => {
    var setdmAriaLabel = $("#dateMonth").next('.select2-container').find('.select2-selection');
    if($("#dateMonth").hasClass("select2-hidden-accessible") && setdmAriaLabel.length == 1) {
      $("#dateMonth").removeAttr("aria-label");
      setdmAriaLabel.removeAttr('aria-labelledby');
      setdmAriaLabel.attr('aria-label', dmAriaLabel);
    }
    $(".dropdown-wrapper").removeAttr('aria-hidden');
    $("#dateMonth").removeAttr("aria-hidden");
  }, 2000);
}
$.fn.sortTest = function(sortingList, asc) {

  sortingList.sort(function(a, b) {
      if (asc) {
          return (a.toLowerCase() > b.toLowerCase()) ? 1 : ((a.toLowerCase() < b.toLowerCase()) ? -1 : 0);
      } else {
          return (b.toLowerCase() > a.toLowerCase()) ? 1 : ((b.toLowerCase() < a.toLowerCase()) ? -1 : 0);
      }
  });
  return sortingList;
}
function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// make sure the number of days correspond with the selected month
function setDays() {
  // selectedYear = $("#selectYearid")
  //   .find($(".select2-selection__rendered"))
  //   .text();
  var optionCount = $("#dateDay").find("option").length - 1;
  if (leapYear(selectedYear)) {
    var daysCount = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  } else {
    var daysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  if (optionCount < daysCount[selectedMonthVal - 1]) {
    for (var i = optionCount; i < daysCount[selectedMonthVal - 1]; i++) {
      $("#dateDay").append(
        $("<option></option>")
          .attr("value", i + 1)
          .text(i + 1)
      );
    }
  } else {
    for (var j = daysCount[selectedMonthVal - 1]; j < optionCount; j++) {
      var optionItem = "#dateDay option[value=" + (j + 1) + "]";
      $(optionItem).remove();
    }
  }
  $("#dateDay").select2({
    placeholder: $("#dateDay").data("placeholder"),
    minimumResultsForSearch: Infinity,
    selectionCssClass: "singleselect-withoutsearch",
    dropdownCssClass: "singleselect-withoutsearch",
  });
  if(dateloopStopFlag == 1) {
    ddAriaLabel = $("#dateDay").attr('aria-label');
    dateloopStopFlag++;
  }
  setTimeout(() => {
    var setddAriaLabel = $("#dateDay").next('.select2-container').find('.select2-selection');
    if($("#dateDay").hasClass("select2-hidden-accessible") && setddAriaLabel.length == 1) {
      $("#dateDay").removeAttr("aria-label");
      setddAriaLabel.removeAttr('aria-labelledby');
      setddAriaLabel.attr('aria-label', ddAriaLabel);
    }
    $(".dropdown-wrapper").removeAttr('aria-hidden');
    $("#dateDay").removeAttr("aria-hidden");
  }, 2000);
}

function setYears() {
  var yeardata = $("#dateYear option");
  if (yeardata.length > 1) {
    yeardata.each(function () {
      $(this).remove();
    });
  }
  $("#dateYear").append($("<option></option>"));
  yearlist.forEach(function (i) {
    $("#dateYear").append($("<option></option>").attr("value", i).text(i));
  });
  $("#dateYear").select2({
    placeholder: $("#dateYear").data("placeholder"),
    minimumResultsForSearch: Infinity,
    // disabled: true,
    selectionCssClass: "singleselect-withoutsearch",
    dropdownCssClass: "singleselect-withoutsearch",
  });
  if(yearloopStopFlag == 1) {
    dyAriaLabel = $("#dateYear").attr('aria-label');
    yearloopStopFlag++;
  }
  setTimeout(() => {
    var setdyAriaLabel = $("#dateYear").next('.select2-container').find('.select2-selection');
    if($("#dateYear").hasClass("select2-hidden-accessible") && setdyAriaLabel.length == 1) {
      $("#dateYear").removeAttr("aria-label");
      setdyAriaLabel.removeAttr('aria-labelledby');
      setdyAriaLabel.attr('aria-label', dyAriaLabel);
    }
    $(".dropdown-wrapper").removeAttr('aria-hidden');
    $("#dateYear").removeAttr("aria-hidden");
  }, 2000);
  // selectedYear = $("#selectYearid").find($(".select2-selection__rendered")).text();
}

function counDateValidate(mode) {
  var mmFormat= ('0' + selectedMonthVal).slice(-2);
  var ddFormat= ('0' + selectedDay).slice(-2);
  var selectedDate = new Date(mmFormat+"/"+ddFormat+"/"+selectedYear);
  if (selectedDate >= minDate && selectedDate <= maxDate) {
    if (selectedDate.getDay() < 3) {
      var fridayDate = new Date(
        mmFormat+"/"+ddFormat+"/"+selectedYear
      );
      var friday = mode - 2 - selectedDate.getDay();
      fridayDate.setDate(fridayDate.getDate() + friday);
      reportingDate = fridayDate;
    } else if (selectedDate.getDay() > 4) {
      var fridayDate = new Date(
        mmFormat+"/"+ddFormat+"/"+selectedYear
      );
      var friday = mode + 5 - selectedDate.getDay();
      fridayDate.setDate(fridayDate.getDate() + friday);
      reportingDate = fridayDate;
    } else {
      var tuesdayDate = new Date(
        mmFormat+"/"+ddFormat+"/"+selectedYear
      );
      var tuesday = mode + 2 - selectedDate.getDay();
      tuesdayDate.setDate(tuesdayDate.getDate() + tuesday);
      reportingDate = tuesdayDate;
    }
  }
  else {
    reportingDate = '';
    flag = 2;
  }
}

function dateValidate() {
  if (selectedMonth != "" && selectedDay != "" && selectedYear != 1) {
    var pieces = [];
    $(".scoreresult").addClass("d-none");
    $(".score-error").addClass("d-none");
    const sliceYear = selectedYear.slice(-2);
    var flag = 0;
    $.each(testData, function (index, value) {
      if (value.TestNameAndCode === selectedTest) {
        switch (value.DeliveryMode) {
          case "r":
            var startdate = value.StartDate.split("/");
            var enddate = value.EndDate.split("/");
            if (startdate[0] == selectedMonthVal) {
              if (
                parseInt(startdate[1]) <= parseInt(selectedDay) &&
                parseInt(enddate[1]) >= parseInt(selectedDay) &&
                startdate[2] == sliceYear
              ) {
                var reportdate = value.ReportDate.split("/");
                const reportMonth = months[reportdate[0] - 1];
                $(".disclaimer-content .testvalue").html(value.TestNameAndCode);
                $(".disclaimer-content .datevalue").html(
                  selectedMonth + " " + selectedDay + ", " + selectedYear
                );
                $(".disclaimer-content .reportdatevalue").html(
                  reportMonth + " " + reportdate[1] + ", 20" + reportdate[2]
                );
                $(".validdaterange .datevalue").html(minDate+" - "+maxDate);
                flag = 1;
              } else {
                $(".disclaimer-content .testvalue").html(value.TestNameAndCode);
                $(".disclaimer-content .datevalue").html(
                  selectedMonth + " " + selectedDay + ", " + selectedYear
                );
              }
            } else {
              $(".disclaimer-content .testvalue").html(value.TestNameAndCode);
              $(".disclaimer-content .datevalue").html(
                selectedMonth + " " + selectedDay + ", " + selectedYear
              );
            }
            break;
          case "7d":
            counDateValidate(7);
            $(".disclaimer-content .testvalue").html(value.TestNameAndCode);
            $(".disclaimer-content .datevalue").html(
              selectedMonth + " " + selectedDay + ", " + selectedYear
            );
            if(reportingDate) {
            $(".disclaimer-content .reportdatevalue").html(
              months[reportingDate.getMonth()] +
                " " +
                reportingDate.getDate() +
                ", " +
                reportingDate.getFullYear()
            );
              flag = 1;
            }
            else{
			  flag = 2;
			}
            break;
          case "21d":
            // selectedYear = "2022";
            counDateValidate(21);
            $(".disclaimer-content .testvalue").html(value.TestNameAndCode);
            $(".disclaimer-content .datevalue").html(
              selectedMonth + " " + selectedDay + ", " + selectedYear
            );
            if(reportingDate){
              $(".disclaimer-content .reportdatevalue").html(
                months[reportingDate.getMonth()] +
                  " " +
                  reportingDate.getDate() +
                  ", " +
                  reportingDate.getFullYear()
              );
              flag = 1;
            }
            else{
			  flag = 2;
			}
            break;
            case '20d':
            case '20b':
              counDateValidate(20);
              $(".disclaimer-content .testvalue").html(value.TestNameAndCode);
              $(".disclaimer-content .datevalue").html(
                selectedMonth + " " + selectedDay + ", " + selectedYear
              );
              if(reportingDate){
                $(".disclaimer-content .reportdatevalue").html(
                  months[reportingDate.getMonth()] +
                    " " +
                    reportingDate.getDate() +
                    ", " +
                    reportingDate.getFullYear()
                );
                flag = 1;
              }
              else{
			  flag = 2;
			}
              break;
        }
      }
    });
    if (flag == 1) {
      $(".scoreresult").removeClass("d-none");
      $(".score-error").addClass("d-none");
      $(".invalid-date").addClass("d-none");
    }
    else if(flag == 2){
	  $(".scoreresult").addClass("d-none");
      $(".score-error").addClass("d-none");
      $(".invalid-date").removeClass("d-none");
	}
    else {
      $(".scoreresult").addClass("d-none");
      $(".score-error").removeClass("d-none");
      $(".invalid-date").addClass("d-none");
    }
  } else if (selectedYear == 1) {
    $.each(testData, function (index, value) {
      if (value.TestNameAndCode === selectedTest) {
        switch (value.DeliveryMode) {
          case "r":
            var startdate = value.StartDate.split("/");
            var enddate = value.EndDate.split("/");
            if (startdate[2] == enddate[2]) {
              yearlist.push("20" + startdate[2]);
            }
            break;
          case "7d":
            for (i=minDate.getFullYear(); i<= maxDate.getFullYear(); i++){
             yearlist.push(i);
            }
            break;
          case "21d":
            for (i=minDate.getFullYear(); i<= maxDate.getFullYear(); i++){
              yearlist.push(i);
             }
            break;
        }
      }
    });
    yearlist = yearlist.sort();
    yearlist = jQuery.unique(yearlist);
    setYears();
  }
}

function result() {
  dateValidate();
}
if(api && api!=''){
  $.getJSON(api, function (data) {
    testData = data.scorereportcalendar;
    //  testData = JSON.parse(JSON.stringify(arr).replace(/\s/g, ''));
    var NewArray = testData.filter(function (element, index, self) {
      return (
        index ===
        self
          .map((mapObj) => mapObj.TestNameAndCode)
          .indexOf(element.TestNameAndCode)
      );
    });

    var name=[];
    $.each(NewArray, function (index, value) {
      name.push(value.TestNameAndCode);
    });
    if(name){
    name = $.fn.sortTest(name, true);
    }
    $.each(name, function (index, value) {
      $("#selectTest").append(
        '<option value="' + value + '">' + value + "</option>"
      );
    });
    $("#selectTest").select2({
      placeholder: $("#selectTest").data("placeholder"),
      minimumResultsForSearch: Infinity,
      selectionCssClass: "singleselect-withoutsearch",
      dropdownCssClass: "singleselect-withoutsearch",
    });
    var stAriaLabel = $("#selectTest").attr('aria-label');
    setTimeout(() => {
      var setstAriaLabel = $("#selectTest").next('.select2-container').find('.select2-selection');
      if($("#selectTest").hasClass("select2-hidden-accessible") && setstAriaLabel.length == 1) {
        $("#selectTest").removeAttr("aria-label");
        setstAriaLabel.removeAttr('aria-labelledby');
        setstAriaLabel.attr('aria-label', stAriaLabel);
      }
      $(".dropdown-wrapper").removeAttr('aria-hidden');
      $("#selectTest").removeAttr('aria-hidden');
    }, 2000);
    setMonth();
    setDays();
    setYears();
  });
}
$("#selectTestid").on("select2:select", function () {
  selectedTest = $(this).find($(".select2-selection__rendered")).text();
  // if(selectedTest != $(this).find($(".select__item:first-child")).text()){
  $(".customselect-data").removeClass("disabled");
  $(".ets-dropdown").prop("disabled", false);
  //}
  yearlist = [];
  selectedYear = 1;
  result();
  setYears();
});

$("#selectMonthid").on("select2:select", function () {
  selectedMonth = $("#selectMonthid")
    .find($(".select2-selection__rendered"))
    .text();
  $.each(months, function (index, value) {
    var i = index + 1;
    if (selectedMonth == value) {
      selectedMonthVal = i;
    }
  });
  setDays();
  result();
});

$("#selectDayid").on("select2:select", function () {
  selectedDay = $(this).find($(".select2-selection__rendered")).text();
  result();
});

$("#selectYearid").on("select2:select", function () {
  selectedYear = $(this).find($(".select2-selection__rendered")).text();
  setDays();
  result();
});