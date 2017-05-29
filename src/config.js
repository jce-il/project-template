Date.prototype.setISO8601 = function(dString){
    var regexp = /(\d\d\d\d)(-)?(\d\d)(-)?(\d\d)(T)?(\d\d)(:)?(\d\d)(:)?(\d\d)(\.\d+)?(Z|([+-])(\d\d)(:)?(\d\d))/;
    if (dString.toString().match(new RegExp(regexp))) {
        var d = dString.match(new RegExp(regexp));
        var offset = 0;
        this.setUTCDate(1);
        this.setUTCFullYear(parseInt(d[1],10));
        this.setUTCMonth(parseInt(d[3],10) - 1);
        this.setUTCDate(parseInt(d[5],10));
        this.setUTCHours(parseInt(d[7],10));
        this.setUTCMinutes(parseInt(d[9],10));
        this.setUTCSeconds(parseInt(d[11],10));
        if (d[12]) {
            this.setUTCMilliseconds(parseFloat(d[12]) * 1000);
        }
        else {
            this.setUTCMilliseconds(0);
        }
        if (d[13] != 'Z') {
            offset = (d[15] * 60) + parseInt(d[17],10);
            offset *= ((d[14] == '-') ? -1 : 1);
            this.setTime(this.getTime() - offset * 60 * 1000);
        }
    }
    else {
        this.setTime(Date.parse(dString));
    }
    return this;
}; // pre-configured function, it converts date from Facebook API date format to Javascript date format



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
