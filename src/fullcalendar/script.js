let accessToken = null; // access token further required by Facebook API

$( document ).ready(function() 
{
	initate_everything();
	gather_all_events_from_all_facebook_pages();
});


let initate_everything = function()
{
	//// Calendar initation virtual space ////
	let elemDiv = document.createElement('div');
	elemDiv.id = "calendar1"
	document.body.appendChild(elemDiv);
	  $('#calendar1').fullCalendar(
	{
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
  //// END OF Calendar initation virtual space ////
  
  
  /// Facebook API initation virtual space ///
  // depends on IP being either localhost or specific firebase-project approved by author
    FB.init(
	{
      appId      : '1888264188125920',
      xfbml      : true,
      version    : 'v2.8'
    }); // API call function to "throw" API ID and be approved upon IP filtering of Facebook management
	
	FB.getLoginStatus(function(response) 
	{
		if (response.status === 'connected') 
		{
			
		} 
		else 
		{
			FB.login(function(response) 
			{
				
			});
			
		}
	}); // API call to check if local host is connected to Facebook server by user, if it's not it will call LOGIN request 
	
	
	
	FB.getLoginStatus(function(response) 
	{
		if (response.status === 'connected') 
		{
			accessToken = FB.getAuthResponse()['accessToken'];
			//console.log(accessToken); DEBUGGING PURPOSES
			
		}
		else
		{
			alert("Connection to Facebook was disabled by user");
		}
	} ); // API call to gather access token that is relevent to further API calls upon Facebook API
	/// END of Facebook API initation virtual space ///
	
}


// let button_facebook_manage = function(){}


let gather_all_events_from_all_facebook_pages = function()
{
	let str = ""; // predefined Facebook page here
	FB.api
	(
		"/"+ str+"/events", // the HTTP request defined in FB API
		function (response)  
		{
		  if (response && !response.error) // if request was approved by server 
		  {
			 // subfunction to print results into Fullcalendar API
			 let i;
			 for(i=0; i<response.data.length; i++)
			 {
				 let event_date = new Date(); // sets a new Date for event date formating to be dynamic
				 event_date.setISO8601(response.data[i].start_time); // converts time from Facebook API date format to Javascript Date format
				 let event={id:response.data[i].id , title: response.data[i].name , start: event_date , url: 'https://www.facebook.com/events/'+response.data[i].id };
				 // creating an event format in fullcalendar API
				 $('#calendar1').fullCalendar( 'renderEvent', event, true);
				 // rendering said event to fullcalendar API
			 }
		  }
		}
	);
}

