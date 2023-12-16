/*
var api= '/src/main/webpack/components/json/scheduleCalendar.json';
// For checkbox //
var checked = false;
$('.form-check-input').click(function(){
  if(checked == true){
   $('.test-from-home').remove();
   $('.tui-full-calendar-weekday-schedule').removeClass('test-from-home-schedule');
   $('.tui-full-calendar-weekday-grid').removeClass('highlight-top');
   $('.tui-full-calendar-weekday-schedule-block').css('border-top','5px solid #151515');
   checked = false;
  }
  else{
  $('.tui-full-calendar-weekday-grid-header').append('<div class="test-from-home">Test from Home</div>');
  $('.tui-full-calendar-weekday-schedule').addClass('test-from-home-schedule');
  $('.tui-full-calendar-weekday-grid').addClass('highlight-top');
  $('.tui-full-calendar-weekday-schedule-block').css('border-top','none');
    checked = true;
  }

})
// For checkbox //
// For calendar //
var Calendar = tui.Calendar;
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
var countPrev, countNext = 0;
if(document.getElementById('calendar') != null){
var $calEl = $('#calendar').tuiCalendar({
    defaultView: 'month',
    taskView: true,
    template: {
      monthDayname: function(dayname) {
        return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
      },
      taskTitle: function() {
        return '<label><input type="checkbox" />Task</label>';
      }
    },
    theme:{
      'week.currentTime.fontWeight': 'bold',
      'month.holidayExceptThisMonth.color': 'rgba(15, 15, 15, 0.4)',
    }
  });
  
  
  // For calendar months schedule //
  var cal= $calEl.data('tuiCalendar');
  function dateFormat(e){
    var s= new Date().toLocaleString();
    var a = s.split(',');
    var b = a[1].split(' ');
    var c = "T22:30:24";
    var j = e.concat(c);
    return j;
  }
  function dateValue(t){
     var m = t.split('-');
     var n = m[m.length-1];
     return n;
  }
  function titleValue(h){
     if ($(window).width() < 768) {
          return h;
        }
        else {
          var p = '3611 Jerome Avenue';
          return p;
        }
    }
  $.getJSON(api, function(data) {
    dateAvailable =[];
    dateAvailable1 =[];
    testData = data;
    for(var l=0; l<testData.essaschedulingSOAMessage[0].availableDates.availableDate.length; l++){
    var date = testData.essaschedulingSOAMessage[0].availableDates.availableDate[l].testDate;
      var start = String(dateFormat(date));
      var dateData = String(dateValue(date));
      var titleCheck = String (titleValue(dateData));
      var calendarData = {};
      calendarData.id = l;
      calendarData.start = start;
      calendarData.end = start;
      calendarData.calendarId = l,
      calendarData.title = titleCheck,
      calendarData.category = 'time',
      dateAvailable.push(calendarData);
      dateAvailable1=dateAvailable;
    }
    cal.createSchedules(dateAvailable1);
  });
var data = [];

function getDataAction(target) {
  return target.dataset ? target.dataset.action : target.getAttribute('data-action');
}
function currentCalendarDate(format) {
  var currentDate = moment([cal.getDate().getFullYear(), cal.getDate().getMonth(), cal.getDate().getDate()]);
  return currentDate.format(format);
}
function setRenderRangeText() {
  var renderRange = document.getElementById('renderRange');
  var options = cal.getOptions();
  var viewName = cal.getViewName();

  var html = [];
  if (viewName === 'day') {
      html.push(currentCalendarDate('YYYY.MM.DD'));
  } else if (viewName === 'month' &&
      (!options.month.visibleWeeksCount || options.month.visibleWeeksCount > 4)) {
      var monthValue = monthNames[parseInt(currentCalendarDate('MM'))-1];
      var yearValue = currentCalendarDate('YYYY');
      html.push(monthValue +' '+ yearValue);   

  }
  renderRange.innerHTML = html.join('');
}
// For calendar months schedule //
// For calendar months scroll for two months //
function onClickNavi(e) {
  var action = getDataAction(e.target);
  switch (action) {
      case 'move-prev':
          cal.prev();
          $(".mov-next").removeAttr("disabled");
          if(countPrev == 0 || countPrev == 1){
            countPrev++;
            countNext = 1; 
          }
          else {
            countPrev = 0;                 
          }
          if(countPrev == 2){
            $(".mov-prev").attr("disabled", 'disabled');
            countPrev = 0;
            countNext = 0; 
          }
          break;
      case 'move-next':
          cal.next();
          $(".mov-prev").removeAttr("disabled");
          if(countNext == 0 || countNext == 1){
            countNext ++;
            countPrev = 1;  
          }
          else {
            countNext  = 0;                 
          }
          if(countNext  == 2){
            $(".mov-next").attr("disabled", 'disabled');
            countNext = 0;
            countPrev = 0;  
          }
          break;
      case 'move-today':
          cal.today();
          break;
      default:
          return;
  }

  setRenderRangeText();
}

function setEventListener() {
  $('#menu-navi').on('click', onClickNavi);
}

setRenderRangeText();
setEventListener();
// For calendar months scroll for two months //

// For calendar//
}
else{return false}
*/