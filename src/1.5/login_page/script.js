$( document ).ready(function() 
{
   build_HTML();
   setTimeout(function() 
   {
		if(firebase.auth().currentUser != null)
		{
			window.location = "../admin_page/admin.html";
		}
   },500);
   auto_fill_buttons();
   
});

let send_data = function()
{
	let email = document.getElementById("email").value;
	let pw = document.getElementById("password").value;
	
	if(email != null && pw != null)
	{
		firebase.auth().signInWithEmailAndPassword(email, pw).catch(function(error) 
		{
			console.log(error.message);
		});
		setTimeout(function() 
		{
			if(firebase.auth().currentUser != null)
			{
				window.location = "../admin_page/admin.html";
			}
		},700);
	}
	
	return false; // crucial to prevent rendering
};


let build_HTML = function()
{
	let back_button_build = function()
	{
		let link = document.createElement("a");
		//var txt= document.createTextNode("back to calendar");
		let pic = document.createElement("IMG");
		pic.src = "../buttons/back.png";
		pic.height = 40;
		pic.width = 40;
		link.appendChild(pic);
		link.href = "../index.html";
		document.body.appendChild(link);
	};
	
	let login_form_build = function()
	{
		let form_obj = document.createElement("FORM");
		form_obj.id = "form";
		form_obj.autocomplete = "true"; // turns on auto complete on form
		form_obj.acceptCharset = "UTF-8"; // utilizes english-only with special characters incl @
		form_obj.onsubmit = send_data;
		
		
		let email = document.createElement("INPUT");
		email.setAttribute("type", "email");
		email.name = "email";
		email.required = "true";
		email.autocomplete = "true";
		email.form = form_obj;
		email.id = "email";
		
		form_obj.appendChild(document.createTextNode("E-mail: "));
		form_obj.appendChild(email);
		
		let pw = document.createElement("INPUT");
		pw.setAttribute("type","password");
		pw.name = "password";
		pw.required = "true";
		pw.autocomplete = "true";
		pw.form = form_obj;
		pw.id = "password";
		
		form_obj.appendChild(document.createElement("br"));
		form_obj.appendChild(document.createTextNode("Password: "));
		form_obj.appendChild(pw);
		
		
		let btn = document.createElement("button");
		btn.form = form_obj;
		btn.formNoValidate = false; // validate data
		btn.type = "submit";
		btn.name = "submit";
		btn.innerHTML = "Submit";
		
		
		let btn_reset = document.createElement("button");
		btn_reset.form = form_obj;
		btn_reset.formNoValidate = false;
		btn_reset.type = "reset";
		btn_reset.name = "reset";
		btn_reset.innerHTML = "Reset";
		
		form_obj.appendChild(document.createElement("br"));
		form_obj.appendChild(btn);
		form_obj.appendChild(document.createTextNode(" "));
		form_obj.appendChild(btn_reset);
		
		document.body.appendChild(form_obj);
		document.getElementById('email').onkeydown = function(e)
		{
		   if(e.keyCode == 13){
			 send_data();
		   }
		};
		document.getElementById('password').onkeydown = function(e)
		{
		   if(e.keyCode == 13){
			 send_data();
		   }
		};
		
	};
	
	
	back_button_build();
	login_form_build();
};

let auto_fill_buttons = function()
{
	// function for testing purposes
	// autofill button function
	
	let btn1 = document.createElement("button");
	btn1.type = "button";
	btn1.name = "fill_user";
	btn1.appendChild(document.createTextNode("Fill user (company) reguler"));
	btn1.addEventListener("click",function() 
	{
		document.getElementById("email").value = "terem@gmail.com";
		document.getElementById("password").value = "123456";
	});
	
	let btn2 = document.createElement("button");
	btn2.type = "button";
	btn2.name = "Fill admin";
	btn2.appendChild(document.createTextNode("Fill admin (nadav)"));
	btn2.addEventListener("click",function() 
	{
		document.getElementById("email").value = "yeseg11@gmail.com";
		document.getElementById("password").value = "123456";
	});
	
	document.body.appendChild(btn1);
	document.body.appendChild(btn2);
}