
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
		var MyLatitude = position.coords.latitude;
		var MyLongitude = position.coords.longitude;
		var MyTimestamp = position.timestamp;
		var MyLocation = "Latitude : " + MyLatitude + " Longitude: " + MyLongitude + " Timestamp: " + MyTimestamp;
		var url = 'http://96de2cef.ngrok.io/reciveing_data.php'; //'http://localhost/test.php'; //
		$.post(url,
		{
			Latitude: MyLatitude,
			Longitude: MyLongitude,
			Timestamp: MyTimestamp
		},
		function(data, status){
			alert("Data: " + data + "\nStatus: " + status);
		});
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



