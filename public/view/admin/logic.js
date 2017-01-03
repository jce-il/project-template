/*
var databaseUrl = "mydb"; // "username:password@example.com/mydb"
var collections = ["users", "reports"]
var db = require("mongojs").connect(databaseUrl, collections);




var collections = db.getCollectionNames();
for(var i = 0; i< collections.length; i++){    
    print('Collection: ' + collections[i]); // print the name of each collection
    db.getCollection(collections[i]).find().forEach(printjson); //and then print the json of each of its elements
}
*/