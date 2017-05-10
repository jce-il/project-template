$( document ).ready(function() 
{
    backlink();
	createTable();
	db_rendering();
	
});

let db_rendering = function()
{
	let i = 1;
	let table = document.getElementById("table"); 
	
	let database = firebase.database();
	let leadsRef = database.ref('Facebook');
	
	leadsRef.on('value', function(snapshot) 
	{
		snapshot.forEach(function(childSnapshot) 
		{
			
			let row = table.insertRow(i);
			let cell1 = row.insertCell(0);
			let cell2 = document.createElement('input');
			cell2.type = "button";
			cell2.setAttribute("onClick","del("+ '"' + childSnapshot.key+ '"' +");");
			cell2.value = "Delete";
			row.appendChild(cell2);
			cell1.innerHTML = "<a href='https://www.facebook.com/" +childSnapshot.key+ "'>" + childSnapshot.key + "</a>";
			i++;
			
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
	let cell3 = row.insertCell(2);
	cell1.innerHTML = "Facebook page name";
	cell2.innerHTML = "Delete";
	cell3.innerHTML = "<input type='button' onclick='Add_new()' value='Add new Facebook page'/>";
};

let Add_new = function()
{
	let page = window.prompt("Enter a facebook page id (page id is viewable in format of https://www.facebook.com/{page-id} on any page)","");
	
	if (page != null) 
	{
		let rootRef = firebase.database().ref();
		
		//if(page.charAt(page.length-1) == '/')  // HTML LINK breaker, decrepted
		//	page = page.substr(0,page.length-1);
		let page_unicoded = page.replace(/[^\x20-\x7E]+/g, '');
		console.log(page_unicoded);
		if(page.localeCompare(page_unicoded) != 0) // meaning page had some special unicoded characters! 
			page = page.replace(/\D/g,''); // strips all non-numbers from page-id, leading to verifiable string
		let storesRef = rootRef.child('Facebook/' + page);
		storesRef.set("1");
		location.reload();
	}
};

let del = function(key)
{
	let rootRef = firebase.database().ref();
	let storesRef = rootRef.child('Facebook/' + key);
	storesRef.remove();
	location.reload();
};

let backlink = function()
{
    var link = document.createElement("a");
    //var txt= document.createTextNode("back to calendar");
	var pic = document.createElement("IMG");
	pic.src = "pics/icon.png";
	pic.height = 40;
	pic.width = 40;
    link.appendChild(pic);
    link.href = "../index.html";
    document.body.appendChild(link);
};