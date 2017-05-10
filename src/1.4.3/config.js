Date.prototype.setISO8601 = function (string) {
    let regexp = "([0-9]{4})(-([0-9]{2})(-([0-9]{2})" +
        "(T([0-9]{2}):([0-9]{2})(:([0-9]{2})(\.([0-9]+))?)?" +
        "(Z|(([-+])([0-9]{2}):([0-9]{2})))?)?)?)?";
    let d = string.match(new RegExp(regexp));

    let offset = 0;
    let date = new Date(d[1], 0, 1);

    if (d[3]) { date.setMonth(d[3] - 1); }
    if (d[5]) { date.setDate(d[5]); }
    if (d[7]) { date.setHours(d[7]); }
    if (d[8]) { date.setMinutes(d[8]); }
    if (d[10]) { date.setSeconds(d[10]); }
    if (d[12]) { date.setMilliseconds(Number("0." + d[12]) * 1000); }
    if (d[14]) {
        offset = (Number(d[16]) * 60) + Number(d[17]);
        offset *= ((d[15] == '-') ? 1 : -1);
    }

    offset -= date.getTimezoneOffset();
    time = (Number(date) + (offset * 60 * 1000));
    this.setTime(Number(time));
} // pre-configured function, it converts date from Facebook API date format to Javascript date format



var config_module = (function () 
{
	let accessToken = "1888264188125920|gehNVYkmMDZifyIv_IfMk72_I80"; // access token further required by Facebook API
	let pw = "Mgo6B97nHZKdwXMiGw5P";
	let config = 
	{
		apiKey: "AIzaSyBU9GCk3-4FVsBJp2Etpy2pmU2TTgR7U6c",
		authDomain: "test-9d3f7.firebaseapp.com",
		databaseURL: "https://test-9d3f7.firebaseio.com",
		storageBucket: "test-9d3f7.appspot.com",
		messagingSenderId: "692751540092"
	}; // API keys configuration 
	let config_firebase = function()
	{
		firebase.initializeApp(config);// sending API key to server for verification 
	};
	let getaccessToken = function(input)
	{
		if(input == pw)
		{
			return accessToken;
		}
		else
		{
			return null;
		}
	};
	return { getaccessToken, config_firebase};
}());
config_module.config_firebase();
