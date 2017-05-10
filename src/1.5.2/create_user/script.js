$( document ).ready(function() 
{
   build_HTML();
   
});

let send_data = function()
{
	let email = document.getElementById("email").value;
	let pw = document.getElementById("password").value;
	let pw2 = document.getElementById("password2").value;
	let colors = document.getElementById("colors").style.backgroundColor.split(',');
	let r = parseInt(colors[0].substring(4)).toString(16) + "";
	let g = parseInt(colors[1]).toString(16)+ "";
	let b = parseInt(colors[2]).toString(16)+ "";
	if(r.length == 1)
		r = "0" + r;
	if(g.length == 1)
		g = "0" + g;
	if(b.length == 1)
		b = "0" + b;
	let color_string = r+""+g+""+b;
	
	if(pw!=pw2)
	{
		alert("Passwords do not match");
		return false;
	}
	let admin_email = "";
	let admin_pw = "";
	let rest_of = function()
	{
		let admin_req = firebase.database();
		admin_req = admin_req.ref("admin");
		admin_req.once('value').then(function(snapshot)
		{
			if(snapshot.val().localeCompare(firebase.auth().currentUser.email)==0)
			{
				let backup = firebase.auth().currentUser;
				firebase.auth().createUserWithEmailAndPassword(email, pw).catch(function(error)
				{
						//alert("Failed due to an error");
					//	storesRef.remove();
						//return false;
				}).then(function()
				{
					let storesRef = firebase.database().ref().child('Users/' + email.replace('.', ""));
					storesRef.set(email+"@"+color_string);
					firebase.database().ref().child("Crds/" + email.replace('.', "" ) ).set(pw);
					alert("Success! moving to main page");
					firebase.auth().signInWithEmailAndPassword(admin_email, admin_pw).catch(function(error) 
					{
								console.log(error.message);
					}).then(function()
					{
						window.location = "../index.html";
						return false;
					});

				});
			}
			else
				alert("User doesn't have permission to add another user!");
		});
	};
	firebase.database().ref().child("Crds").once('value').then(function(snapshot) 
	{
		snapshot.forEach(function(childSnapshot) 
		{
			if(childSnapshot.key.replace('.',"") == firebase.auth().currentUser.email.replace('.',""))
			{
				admin_email += firebase.auth().currentUser.email;
				admin_pw += childSnapshot.val();
			}
		});
	}).then(rest_of);
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
		
		
		let pw2 = document.createElement("INPUT");
		pw2.setAttribute("type","password");
		pw2.name = "password2";
		pw2.required = "true";
		pw2.autocomplete = "true";
		pw2.form = form_obj;
		pw2.id = "password2";
		
		form_obj.appendChild(document.createElement("br"));
		form_obj.appendChild(document.createTextNode("Confirm password: "));
		form_obj.appendChild(pw2);
		
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
		
		let color_btn = document.createElement("INPUT");
		var picker = new jscolor(color_btn);
		picker.valueElement = "";
		picker.fromString("#F0F0F0");
		color_btn.value = "Click";
		color_btn.size = 2;
		color_btn.id = "colors";
		color_btn.style.backgroundColor = "#F0F0F0";
		
		form_obj.appendChild(document.createElement("br"));
		let label = document.createTextNode("Color: ");
		form_obj.appendChild(label);
		form_obj.appendChild(color_btn);
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

