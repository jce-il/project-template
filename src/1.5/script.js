var page_module = (function () 
{
	let facebook_app_id = "1888264188125920";
	let pw = "Mgo6B97nHZKdwXMiGw5P";
	let initModule = function()
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
		  appId      : ''+facebook_app_id,
		  xfbml      : true,
		  version    : 'v2.8'
		}); // API call function to "throw" API ID and be approved upon IP filtering of Facebook management
		/// END of Facebook API initation virtual space ///
		
	};
	
	let gather_all_events_from_all_facebook_pages = function()
	{
		// subdibision into local function!
		
		let add_event_to_calendar = function(id, name, date) // subfunction responisble for adding event to fullcalendar API event and render that
		{
			let event={id , title: name , start: date , url: 'https://www.facebook.com/events/'+id };
			// creating an event format in fullcalendar API
			$('#calendar1').fullCalendar( 'renderEvent', event, true);
			 // rendering said event to fullcalendar API
		}
		
		let withdraw_events_from_facebook_page = function(data) // subfunction responsible for scanning entire event database file from facebook page
		{
			 // subfunction to print results into Fullcalendar API
			let i;
			for(i=0; i<data.length; i++)
			{
				let event_date = new Date(); // sets a new Date for event date formating to be dynamic
				event_date.setISO8601(data[i].start_time); // converts time from Facebook API date format to Javascript Date format
				add_event_to_calendar(data[i].id, data[i].name, event_date);		 
			}
		}
		
		
		let add_events_from_page = function(str) // subfunction responsible for doing the API request for the event database
		{
			FB.api
			(
				"/"+ str+"/events?access_token="+config_module.getaccessToken(pw), // the HTTP request defined in FB API
				function (response)  
				{
				  if (response && !response.error) // if request was approved by server 
				  {
						withdraw_events_from_facebook_page(response.data);
				  }
				  else
				  {
					  console.log(response);
				  }
				}
			);
			
		}
		
		let scan_all_db_for_pages = function() // subfunction responsible for facebook DB load via Firebase API call
		{
			let database = firebase.database();
			let leadsRef = database.ref('Facebook');
			leadsRef.on('value', function(snapshot) 
			{
				snapshot.forEach(function(childSnapshot) 
				{
				  if(childSnapshot.val().charAt(0) == '1')
					add_events_from_page(childSnapshot.key);
				});
			});
		}
		
		scan_all_db_for_pages();
	};
	let create_buttons = function()
	{
		let back_button_build = function()
		{
			let link = document.createElement("a");
			let pic = document.createElement("IMG");
			pic.src = "buttons/admin.png";
			pic.height = 40;
			pic.width = 40;
			link.appendChild(pic);
			link.href = "login_page/login.html";
			document.body.appendChild(link);
		};
		
		
		back_button_build();
	}
	return { initModule, gather_all_events_from_all_facebook_pages, create_buttons, };
	
}());



$( document ).ready(function() 
{
	page_module.create_buttons();
	page_module.initModule();
	page_module.gather_all_events_from_all_facebook_pages();
});







