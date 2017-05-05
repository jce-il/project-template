$( document ).ready(function() 
{
    buttons_insert();
	createTable();
	db_rendering();
	
});
let factor = 0;
let is_admin = 0;
let admin_email = "";
let names = [];
let db_rendering = function()
{
	
	let table = document.getElementById("table"); 
	let admin_req = firebase.database();
	admin_req = admin_req.ref("admin");
	admin_req.once('value').then(function(snapshot)
	{
		if(firebase.auth().currentUser.email == snapshot.val() + "@gmail.com")
		{
			is_admin=1;
			admin_email += snapshot.val();
		}
	}).then(function()
	{
		firebase.database().ref("Names").once('value',function(snapshot)
		{
			snapshot.forEach(function(childSnapshot)
			{
				let obj = new Object();
				obj.id = childSnapshot.key;
				obj.name = childSnapshot.val();
				names.push(obj);
			});
			
		}).then(function()
		{
			firebase.database().ref("Auto_approve").once('value',function(snapshot)
			{
				snapshot.forEach(function(childSnapshot)
				{
					names.forEach(function(val)
					{
						if(val.id == childSnapshot.key)
						{
							if(childSnapshot.val() == 1)
								val.auto = true;
							else
								val.auto = false;
						}
					});
				});
				continue_rendering();
			});
		});
	});
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
			//	let color = childSnapshot.val().substring(childSnapshot.val().indexOf("@",childSnapshot.val().indexOf("@")+1)+1,childSnapshot.val().length);
			//	let email = childSnapshot.val().substring(0,childSnapshot.val().indexOf(color)-1);
				let color = childSnapshot.val();
				let email = childSnapshot.key;
				let row = table.insertRow(i);
				row.id = i;
				let cell1 = row.insertCell(0);
				names.forEach(function(val,index,arr)
				{
					if(val.id == email)
					{
						let change_name_input = document.createElement('INPUT');
						change_name_input.id = val.id;
						change_name_input.value = val.name;
						let change_name_btn = document.createElement('button');
						change_name_btn.type = "button";
						change_name_btn.innerHTML = "Change the name";
						change_name_btn.addEventListener('click',function()
						{
							if(change_name_input.value != null && change_name_input.value.length > 0)
							{
								firebase.database().ref("Names/" + email).set(change_name_input.value);
							}
						});
						cell1.appendChild(change_name_input);
						cell1.appendChild(change_name_btn);
					}
				});
				//cell1.innerHTML = email;
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
				//cell2.appendChild(change_color);
				let cell2_extra = row.insertCell(2);
				cell2_extra.appendChild(change_color);
				let cell3_input = document.createElement('input');
				cell3_input.type = "button";
				cell3_input.setAttribute("onClick","change_password("+ '"' + childSnapshot.key+ '",' + i +"," + "'" + email + "'" + ");");
				cell3_input.value = "Change password";
				//row.appendChild(cell3);
				let cell3 = row.insertCell(3);
				cell3.appendChild(cell3_input);
				let cell4_input = document.createElement('input');
				cell4_input.type = "button";
				cell4_input.setAttribute("onClick","del("+ '"' + childSnapshot.key+ '",' + i +"," + "'" + email + "'" + ");");
				cell4_input.value = "Delete";
				if(email == admin_email)
					cell4_input.disabled = true;
				//row.appendChild(cell4);
				let cell4 = row.insertCell(4);
				cell4.appendChild(cell4_input);
				let make_admin = document.createElement('button');
				make_admin.type = "button";
				make_admin.innerHTML = "make admin";
				make_admin.addEventListener('click',function()
				{
					firebase.database().ref("admin").set(email);
					alert("Successfully moved admin rights to " + email + " Returning to main screen");
					window.location = "../index.html";
				});
				let cell5 = row.insertCell(5);
				cell5.appendChild(make_admin);
				let cell6 = row.insertCell(6);
				if(email == admin_email)
				{
					make_admin.disabled = true;
				}
				let checkbox = document.createElement("INPUT");
				checkbox.setAttribute("type", "checkbox");
				names.forEach(function(val)
				{
					if(val.id == email)
					{
						checkbox.checked = val.auto;
					}
				});
				checkbox.addEventListener('click', function()
				{
					if(checkbox.checked == true)
						firebase.database().ref("Auto_approve/" + email).set(1);
					else
						firebase.database().ref("Auto_approve/" + email).set(0);
				});
				cell6.appendChild(checkbox);
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
	let empty = row.insertCell(3);
	let empty2 = row.insertCell(4);
	let cell5 = row.insertCell(5);
	let cell6 = row.insertCell(6);
	cell1.innerHTML = "Username";
	cell2.innerHTML = "Color sample"
	cell4.innerHTML = "Change color button";
	empty.innerHTML = "Password change";
	cell5.innerHTML = "<input type='button' onclick='Add_new()' value='Add new User'/>";
	empty2.innerHTML = "Delete button";
	cell6.innerHTML = "Auto check";
	
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
				if(email == childSnapshot.key)
				{
					cred += childSnapshot.val();
				}
				if(childSnapshot.key + "@gmail.com"  == firebase.auth().currentUser.email)
				{
					admin_email += firebase.auth().currentUser.email;
					admin_pw += childSnapshot.val();
				}
			});
		}).then(function()
		{
			if(cred != "")
			{
				firebase.auth().signInWithEmailAndPassword(email + "@gmail.com" , cred).catch(function(error) 
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
									firebase.database().ref().child("Crds/" + email).remove();
									firebase.database().ref().child("Facebook").once('value',function(snapshot) 
									{
										snapshot.forEach(function(childSnapshot) 
										{
											if(email == childSnapshot.val().substring(1,childSnapshot.val().length))
												firebase.database().ref().child("Facebook/" + childSnapshot.key).remove();
										});
										
									});
									firebase.database().ref().child("Users/" + email).remove();
									firebase.database().ref().child("Names/" + email).remove();
									firebase.database().ref().child("Auto_approve/" + email).remove();
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
	let cell6 = row.children[5];
	let cell7 = row.children[6];
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
			row.append(cell6);
			row.append(cell7);
			alert("Succeeded");
		}
		else
			alert("password's length must be above 6, all characters must be from english alphabet including numbers and special characters");
	});
	row.appendChild(cell2);
	row.appendChild(input);
	row.appendChild(btn);
	row.appendChild(cell5);
	row.appendChild(cell6);
	row.appendChild(cell7);
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
				if(email == childSnapshot.key)
				{
					cred += childSnapshot.val();
				}
				if(childSnapshot.key + "@gmail.com"  == firebase.auth().currentUser.email)
				{
					admin_email += firebase.auth().currentUser.email;
					admin_pw += childSnapshot.val();
				}
			});
		}).then(function()
		{
			if(cred != "")
			{
				firebase.auth().signInWithEmailAndPassword(email + "@gmail.com" , cred).catch(function(error) 
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
									firebase.database().ref().child("Crds/" + email).set(pw);
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
	let cell6 = row.children[5];
	let cell7 = row.children[6];
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
		firebase.database().ref('Users/'+key).set(color_string);
		while(row.firstChild)
		row.removeChild(row.firstChild);
		row.append(cell1);
		row.append(cell2);
		row.append(cell3);
		row.append(cell4);
		row.append(cell5);
		row.append(cell6);
		row.append(cell7);
		cell2.style.backgroundColor = "#" + color_string;
	});
	row.appendChild(input);
	row.appendChild(btn);
	row.appendChild(cell4);
	row.appendChild(cell5);
	row.appendChild(cell6);
	row.appendChild(cell7);
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
