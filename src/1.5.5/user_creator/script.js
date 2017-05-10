$( document ).ready(function() 
{
    buttons_insert();
	createTable();
	db_rendering();
	
});
let factor = 0;
let is_admin = 0;
let admin_email = "";
let db_rendering = function()
{
	
	let table = document.getElementById("table"); 
	let admin_req = firebase.database();
	admin_req = admin_req.ref("admin");
	admin_req.once('value').then(function(snapshot)
	{
		if(snapshot.val().localeCompare(firebase.auth().currentUser.email)==0)
		{
			is_admin=1;
			admin_email += snapshot.val();
		}
	}).then(continue_rendering);
};
let continue_rendering = function()
{
	if(is_admin != 1)
		return;
	let i = 1;
	let database = firebase.database();
	let leadsRef = database.ref('Users');
	leadsRef.once('value').then(function(snapshot) 
	{
		snapshot.forEach(function(childSnapshot) 
		{
			if(is_admin==1)
			{
				let color = childSnapshot.val().substring(childSnapshot.val().indexOf("@",childSnapshot.val().indexOf("@")+1)+1,childSnapshot.val().length);
				let email = childSnapshot.val().substring(0,childSnapshot.val().indexOf(color)-1);
				let row = table.insertRow(i);
				row.id = i;
				let cell1 = row.insertCell(0);
				cell1.innerHTML = email;
				let cell2 = row.insertCell(1);
				cell2.style.backgroundColor = "#"+color;
				cell2.name = color;
				cell2.id = "a"+i;
				cell2.className = "a"+i;
				cell2.value = color;
				let change_color = document.createElement('input');
				change_color.type = "image";
				change_color.setAttribute("onClick","changeColor(" + '"' + childSnapshot.key + '",' + i+ ");");
				change_color.src = "../buttons/color_picker.png";
				change_color.height = 40;
				change_color.width = 40;
				row.appendChild(change_color);
				let cell3 = document.createElement('input');
				cell3.type = "button";
				cell3.setAttribute("onClick","change_password("+ '"' + childSnapshot.key+ '",' + i +"," + "'" + email + "'" + ");");
				cell3.value = "Change password";
				row.appendChild(cell3);
				let cell4 = document.createElement('input');
				cell4.type = "button";
				cell4.setAttribute("onClick","del("+ '"' + childSnapshot.key+ '",' + i +"," + "'" + email + "'" + ");");
				cell4.value = "Delete";
				if(email == admin_email)
					cell4.disabled = true;
				row.appendChild(cell4);
				i++;
			}
		});
	});
}


let createTable = function()
{
	let table = document.createElement("table");
	table.id = "table";
	document.body.appendChild(table);
	let row = table.insertRow(0);
	let cell1 = row.insertCell(0);
	let cell2 = row.insertCell(1);
	let cell4 = row.insertCell(2);
	let cell5 = row.insertCell(3);
	cell1.innerHTML = "Username";
	cell2.innerHTML = "Color"
	cell4.innerHTML = "Password change";
	cell5.innerHTML = "<input type='button' onclick='Add_new()' value='Add new User'/>";
};

let Add_new = function()
{
	window.location = "../create_user/create.html";
};

let del = function(key,index,email)
{
	let rootRef = firebase.database().ref();
	let storesRef = rootRef.child('Users/' + key);
	//storesRef.remove();
	let cred = "";
	let backup = firebase.auth().currentUser;
	if(is_admin == 1)
	{
		let admin_email = "";
		let admin_pw = "";
		firebase.database().ref().child("Crds").once('value').then(function(snapshot) 
		{
			snapshot.forEach(function(childSnapshot) 
			{
				if(childSnapshot.key.replace('.',"") == email.replace('.',"") )
				{
					cred += childSnapshot.val();
				}
				if(childSnapshot.key.replace('.',"") == firebase.auth().currentUser.email.replace('.',""))
				{
					admin_email += firebase.auth().currentUser.email;
					admin_pw += childSnapshot.val();
				}
			});
		}).then(function()
		{
			if(cred != "")
			{
				firebase.auth().signInWithEmailAndPassword(email, cred).catch(function(error) 
				{
					console.log(error.message);
				}).then(function()
				{
					if(firebase.auth().currentUser.uid != backup.uid && firebase.auth().currentUser!=null)
					{
						firebase.auth().currentUser.delete().then(function() {
							firebase.auth().signInWithEmailAndPassword(admin_email, admin_pw).catch(function(error) 
							{
								console.log(error.message);
							}).then(function()
							{
									storesRef.remove();
									firebase.database().ref().child("Crds/" + email.replace(".","")).remove();
									firebase.database().ref().child("Facebook").once('value',function(snapshot) 
									{
										snapshot.forEach(function(childSnapshot) 
										{
											if(childSnapshot.val().indexOf(email) > 0)
												firebase.database().ref().child("Facebook/" + childSnapshot.key).remove();
										});
										
									});
									firebase.database().ref().child("Users/" + email.replace(".","")).remove();
									document.getElementById("table").deleteRow(index+factor);
									factor--;
							});
						
						}, function(error) {
						  console.log(error);
						});
					}
				});
			}
		});
	}
	
};

let change_password = function(key,index,email)
{
	let row = document.getElementById(index);
	let cell1 = row.children[0];
	let cell2 = row.children[1];
	let cell3 = row.children[2];
	let cell4 = row.children[3];
	let cell5 = row.children[4];
	while(row.firstChild)
		row.removeChild(row.firstChild);
	row.appendChild(cell1);
	row.appendChild(cell2);
	var input = document.createElement("INPUT");
	input.id = key+index;
	var btn = document.createElement("button");
	btn.type = "button";
	btn.innerHTML = "Password Submit";
	btn.addEventListener("click", function() 
	{
		let pw = document.getElementById(key+index).value;
		if(change_pw(key,index,email,pw)==true)
		{
			while(row.firstChild)
				row.removeChild(row.firstChild);
			row.append(cell1);
			row.append(cell2);
			row.append(cell3);
			row.append(cell4);
			row.append(cell5);
			alert("Succeeded");
		}
		else
			alert("password's length must be above 6, all characters must be from english alphabet including numbers and special characters");
	});
	row.appendChild(cell2);
	row.appendChild(input);
	row.appendChild(btn);
	row.appendChild(cell5);
};
let change_pw = function(key,index,email,pw)
{
	if(pw.length < 6)
	{
		alert("Not enough characters, please type 6 or more");
		return false;
	}
	let rootRef = firebase.database().ref();
	let storesRef = rootRef.child('Users/' + key);
	//storesRef.remove();
	let cred = "";
	let backup = firebase.auth().currentUser;
	if(is_admin == 1)
	{
		let admin_email = "";
		let admin_pw = "";
		firebase.database().ref().child("Crds").once('value').then(function(snapshot) 
		{
			snapshot.forEach(function(childSnapshot) 
			{
				if(childSnapshot.key.replace('.',"") == email.replace('.',"") )
				{
					cred += childSnapshot.val();
				}
				if(childSnapshot.key.replace('.',"") == firebase.auth().currentUser.email.replace('.',""))
				{
					admin_email += firebase.auth().currentUser.email;
					admin_pw += childSnapshot.val();
				}
			});
		}).then(function()
		{
			if(cred != "")
			{
				firebase.auth().signInWithEmailAndPassword(email, cred).catch(function(error) 
				{
					console.log(error.message);
				}).then(function()
				{
					if(firebase.auth().currentUser.uid != backup.uid && firebase.auth().currentUser!=null)
					{
						firebase.auth().currentUser.updatePassword(pw).then(function() {
							firebase.auth().signInWithEmailAndPassword(admin_email, admin_pw).catch(function(error) 
							{
								console.log(error.message);
							}).then(function()
							{
									firebase.database().ref().child("Crds/" + email.replace(".","")).set(pw);
							});
						
						}, function(error) {
						  console.log(error);
						});
					}
				});
			}
		});
	}
	return true;
};
let changeColor = function(key, index)
{
	let row = document.getElementById(index);
	let cell1 = row.children[0];
	let cell2 = row.children[1];
	let cell3 = row.children[2];
	let cell4 = row.children[3];
	let cell5 = row.children[4];
	while(row.firstChild)
		row.removeChild(row.firstChild);
	row.appendChild(cell1);
	row.appendChild(cell2);
	var input = document.createElement("INPUT");
	var picker = new jscolor(input);
	picker.valueElement = "";
	picker.fromString("#" + cell2.name);
	input.value = "Click";
	input.size = 2;
	var btn = document.createElement("button");
	btn.type = "button";
	btn.innerHTML = "Color Submit";
	btn.addEventListener("click", function() 
	{
		let colors = input.style.backgroundColor.split(',');
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
		cell2.name = color_string;
		firebase.database().ref('Users/'+key).set(cell1.innerHTML + "@" + color_string);
		while(row.firstChild)
		row.removeChild(row.firstChild);
		row.append(cell1);
		row.append(cell2);
		row.append(cell3);
		row.append(cell4);
		row.append(cell5);
		cell2.style.backgroundColor = "#" + color_string;
	});
	row.appendChild(input);
	row.appendChild(btn);
	row.appendChild(cell4);
	row.appendChild(cell5);
};

let buttons_insert = function()
{
    let link = document.createElement("a");
    //var txt= document.createTextNode("back to calendar");
	let backpic = document.createElement("IMG");
	backpic.src = "../buttons/back.png";
	backpic.height = 40;
	backpic.width = 40;
    link.appendChild(backpic);
    link.href = "../index.html";
    document.body.appendChild(link);
	
	let link2 = document.createElement("a");
	let dbpic = document.createElement("IMG");
	dbpic.src = "../buttons/facebook.png";
	dbpic.height = 40;
	dbpic.width = 40;
    link.appendChild(dbpic);
    link.href = "../admin_page/admin.html";
    document.body.appendChild(link);
	
	let btn = document.createElement("button");
	btn.type = "button";
	btn.name = "log out";
	let log_out_pic = document.createElement("IMG");
	log_out_pic.src = "../buttons/log_out.png";
	log_out_pic.height = 40;
	log_out_pic.width = 40;
	btn.appendChild(log_out_pic);
	btn.addEventListener("click", function() { firebase.auth().signOut(); window.location = "../index.html"; });
	document.body.appendChild(btn);
};
