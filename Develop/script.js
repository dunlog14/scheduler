
$(function () {

  // current date
var currentDay = dayjs().format('dddd, MMMM D, YYYY');
$('#currentDay').text(currentDay);

// local storage
$('.saveBtn').on('click', function() {
  var timeBlockId = $(this).parent().attr('id');
  var userInput = $(this).siblings('.description').val();
  localStorage.setItem(timeBlockId, userInput);
});

// Apply past, present, or future class to each time-block
function updateTimeBlockClasses() {
  var currentHour = dayjs().format('H');
  
  $('.time-block').each(function() {
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);
    
    if (timeBlockHour < currentHour) {
      $(this).removeClass('present future').addClass('past');
    } else if (timeBlockHour == currentHour) {
      $(this).removeClass('past future').addClass('present');
    } else {
      $(this).removeClass('past present').addClass('future');
    }
  });
}

// Get user input from local storage and set values of corresponding textarea elements
function populateUserInput() {
  $('.time-block').each(function() {
    var timeBlockId = $(this).attr('id');
    var userInput = localStorage.getItem(timeBlockId);

    $(this).children('.description').val(userInput);
  });
}

updateTimeBlockClasses();
populateUserInput();

// Update time-block classes every hour
setInterval(updateTimeBlockClasses, 3600000);




});
