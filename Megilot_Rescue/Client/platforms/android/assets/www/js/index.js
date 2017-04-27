/*
Tal Rofeh
301905154
Nadav Eshed
201656147
*/

var mainFunction = (function()
{
	document.addEventListener("deviceready", onDeviceReady, false);
	function getLocation()
	{
		if(navigator.geolocation)
		{
			var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
			navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		}
		else
		{
            console.log("Sorry, browser does not support geolocation!");
        }
	}
	
	function onSuccess(position) 
	{
		var Latitude = position.coords.latitude;
		var Longitude = position.coords.longitude;
		var Timestamp = position.timestamp;
		var string = "Latitude : " + Latitude + " Longitude: " + Longitude + " Timestamp: " + Timestamp;
		navigator.notification.alert(string, alertDismissed);
		$.post('http://96de2cef.ngrok.io/reciveing_data.php', { MyLocation: Latitude + "," + Longitude} );
	}
	
	function onError(positionError)
	{
		if(positionError.code == 1) 
		{
		   navigator.notification.alert("Error: Access is denied!", alertDismissed);
		}
		
		else if(positionError.code == 2) 
		{
		   navigator.notification.alert("Error: Position is unavailable!", alertDismissed);
		}
	}
		
	function alertDismissed(){
		
	}
	
	function onDeviceReady() {
		//alert("great!");
	}
	
	
	$("document").ready(function() {
		
		$("#MegilotLoginForm").on('submit', function(){ // search for expenses
			
		});
		
		$("#showlocation").click(function(){ // search for expenses
			getLocation();
		});
	});	
	
}());



