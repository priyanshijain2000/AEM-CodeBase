var today = new Date();
today.setHours(0, 0, 0, 0);
var selectedData = [];
var currentYear = today.getFullYear();
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
var dyAriaLabelGRE = '';
var dmAriaLabelGRE = '';
var ddAriaLabelGRE = '';
var yearloopStopFlagGRE = 1;
var monloopStopFlagGRE = 1;
var dateloopStopFlagGRE = 1;
$(function() {
  setYears();
  setMonth();
  setDays();
  setRolealert();
});

function setRolealert(){
  var $scoreresulttext = $('.scoreresulttext p');
  if($scoreresulttext.length > 0) {
    $scoreresulttext.attr('role','alert');
  }
}

function result() {
	if (selectedMonth != "" && selectedDay != "" && selectedYear != 1 ) {
		$(".gre-score-valid").addClass("d-none");
    	$(".gre-score-invalid").addClass("d-none");
    	var mmFormat= ('0' + selectedMonthVal).slice(-2);
    	var ddFormat= ('0' + selectedDay).slice(-2);
    	var userDate = new Date(mmFormat+"/"+ddFormat+"/"+selectedYear);
        userDate.setHours(0, 0, 0, 0);
        var lastValidDate = userDate;
        lastValidDate.setFullYear(lastValidDate.getFullYear() + 5);
        $(".gre-score-valid .testdatevalue").html(
	            selectedMonth + " " + selectedDay + ", " + selectedYear
	    );
        if (lastValidDate < today) {
			$(".gre-score-invalid").removeClass("d-none");
		}
		else{
			$(".gre-score-valid .reportdatevalue").html(
	            selectedMonth + " " + selectedDay + ", " + lastValidDate.getFullYear()
	        );
			$(".gre-score-valid").removeClass("d-none");
		}
	}
}

function setMonth() {
  $.each(months, function (index, value) {
    var i = index + 1;
    $("#dateMonth-gre").append('<option value="' + i + '">' + value + "</option>");
  });
  $("#dateMonth-gre").select2({
    placeholder: $("#dateMonth-gre").data("placeholder"),
    minimumResultsForSearch: Infinity,
    selectionCssClass: "singleselect-withoutsearch",
    dropdownCssClass: "singleselect-withoutsearch",
  });
  if(monloopStopFlagGRE == 1) {
    dmAriaLabelGRE = $("#dateMonth-gre").attr('aria-label');
    monloopStopFlagGRE++;
  }
  setTimeout(() => {
    var setdmAriaLabelGRE = $("#dateMonth-gre").next('.select2-container').find('.select2-selection');
    if($("#dateMonth-gre").hasClass("select2-hidden-accessible") && setdmAriaLabelGRE.length == 1) {
      $("#dateMonth-gre").removeAttr("aria-label");
      setdmAriaLabelGRE.removeAttr('aria-labelledby');
      setdmAriaLabelGRE.attr('aria-label', dmAriaLabelGRE);
    }
    $(".dropdown-wrapper").removeAttr('aria-hidden');
    $("#dateMonth-gre").removeAttr("aria-hidden");
  }, 2000);
}

function leapYear(year) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

// make sure the number of days correspond with the selected month
function setDays() {
  var optionCount = $("#dateDay-gre").find("option").length - 1;
  if (leapYear(selectedYear)) {
    var daysCount = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  } else {
    var daysCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  if (optionCount < daysCount[selectedMonthVal - 1]) {
    for (var i = optionCount; i < daysCount[selectedMonthVal - 1]; i++) {
      $("#dateDay-gre").append(
        $("<option></option>")
          .attr("value", i + 1)
          .text(i + 1)
      );
    }
  } else {
    for (var j = daysCount[selectedMonthVal - 1]; j < optionCount; j++) {
      var optionItem = "#dateDay-gre option[value=" + (j + 1) + "]";
      $(optionItem).remove();
    }
  }
  $("#dateDay-gre").select2({
    placeholder: $("#dateDay-gre").data("placeholder"),
    minimumResultsForSearch: Infinity,
    selectionCssClass: "singleselect-withoutsearch",
    dropdownCssClass: "singleselect-withoutsearch",
  });
  if(dateloopStopFlagGRE == 1) {
    ddAriaLabelGRE = $("#dateDay-gre").attr('aria-label');
    dateloopStopFlagGRE++;
  }
  setTimeout(() => {
    var setddAriaLabelGRE = $("#dateDay-gre").next('.select2-container').find('.select2-selection');
    if($("#dateDay-gre").hasClass("select2-hidden-accessible") && setddAriaLabelGRE.length == 1) {
      $("#dateDay-gre").removeAttr("aria-label");
      setddAriaLabelGRE.removeAttr('aria-labelledby');
      setddAriaLabelGRE.attr('aria-label', ddAriaLabelGRE);
    }
    $(".dropdown-wrapper").removeAttr('aria-hidden');
    $("#dateDay-gre").removeAttr("aria-hidden");
  }, 2000);
}

function setYears() {
  var yeardata = $("#dateYear-gre option");
  if (yeardata.length > 1) {
    yeardata.each(function () {
      $(this).remove();
    });
  }
  $("#dateYear-gre").append($("<option></option>"));
  for(var i=currentYear-5;i<currentYear+4;i++){
	$("#dateYear-gre").append($("<option></option>").attr("value", i).text(i));
  }
  $("#dateYear-gre").select2({
    placeholder: $("#dateYear-gre").data("placeholder"),
    minimumResultsForSearch: Infinity,
    selectionCssClass: "singleselect-withoutsearch",
    dropdownCssClass: "singleselect-withoutsearch",
  });
  if(yearloopStopFlagGRE == 1) {
    dyAriaLabelGRE = $("#dateYear-gre").attr('aria-label');
    yearloopStopFlagGRE++;
  }
  setTimeout(() => {
    var setdyAriaLabelGRE = $("#dateYear-gre").next('.select2-container').find('.select2-selection');
    if($("#dateYear-gre").hasClass("select2-hidden-accessible") && setdyAriaLabelGRE.length == 1) {
      $("#dateYear-gre").removeAttr("aria-label");
      setdyAriaLabelGRE.removeAttr('aria-labelledby');
      setdyAriaLabelGRE.attr('aria-label', dyAriaLabelGRE);
    }
    $(".dropdown-wrapper").removeAttr('aria-hidden');
    $("#dateYear-gre").removeAttr("aria-hidden");
  }, 2000);
}

$("#selectMonthid-gre").on("select2:select", function () {
  selectedMonth = $("#selectMonthid-gre")
    .find($(".select2-selection__rendered"))
    .text();
  $.each(months, function (index, value) {
    var i = index + 1;
    if (selectedMonth == value) {
      selectedMonthVal = i;
    }
  });
  $(".customselect-data").removeClass("disabled");
  $(".ets-dropdown").prop("disabled", false);
  setDays();
  result();
});

$("#selectDayid-gre").on("select2:select", function () {
  selectedDay = $(this).find($(".select2-selection__rendered")).text();
  result();
});

$("#selectYearid-gre").on("select2:select", function () {
  selectedYear = $(this).find($(".select2-selection__rendered")).text();
  setDays();
  result();
});