var config_module= (function () 
{
	
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
	
	return { config_firebase, };
}());
config_module.config_firebase();