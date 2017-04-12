
$( document ).ready(function() 
{
	initcalendar();	
});

var initcalendar = function()
{
	var elemDiv = document.createElement('div');
	elemDiv.id = "calendar1"
	document.body.appendChild(elemDiv);
	  $('#calendar1').fullCalendar({
    header: {
      left: 'prev,next,today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
      },
	 eventClick: function(event)
	 {
		  if (event.url) 
		  {
            window.open(event.url);
            return false;
		  }
	 }	 
  });
}

// var button_facebook_manage = function(){}

// var initFB = function(){}

// var gather_all_events_from_all_facebook_pages = function(){}

