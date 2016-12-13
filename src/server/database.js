
// get mongo-module
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
// Connection URL
var url = 'mongodb://localhost:27017/TestDB';
var DB;
 
// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);   
    console.log("Connected correctly to database server");
    DB = db;
    test(db);
    db.close();
});

var test = function (db) {
    db.collection('stock').remove();
    db.collection('stock').find().toArray(
        function (err, docs) {
            console.log("first operation:");
            console.log(docs);
        })
    
    addItem(item1);
    db.collection('stock').find().toArray(function (err, docs) {
        console.log("second operation:");
        console.log(docs);
    });
    addItem(item3);
    db.collection('stock').find().toArray(function (err, docs) {
        console.log("third operation:");
        console.log(docs);
    });
};
var Color = function () {
    var name, image, quantity, minQuantity;
    return {
        "name": name,
        "image": image,
        "quantity": quantity,
        "minQuantity": minQuantity
    };
};
var Item = function () {
    var category, subCategory;
    var index, name, decription, location;
    var colors = [];
    var toString = function () {
        return JSON.stringify(this);
    };
};

var item1 = {
    category: "plates",
    subCategory: "circle",
    index: "1",
    name: "item1",
    decription: "this is item 1",
    location: "third shelf",
    colors: [
        { name: "red", quantity: 50, minQuantity: 5 },
        { name: "blue", quantity: 60, minQuantity: 5 },
        { name: "green", quantity: 100, minQuantity: 5 },
    ]
};
 
var item2 = {
    category: "plates",
    subCategory: "circle",
    index: "2",
    name: "item2",
    decription: "this is item 2",
    location: "second shelf",
    colors: [
        { name: "red", quantity: 50, minQuantity: 5 },
        { name: "blue", quantity: 60, minQuantity: 5 },
        { name: "green", quantity: 100, minQuantity: 5 },
    ]
};

var item3 = {
    category: "cups",
    subCategory: "tall",
    index: "3",
    name: "item3",
    decription: "this is item 3",
    location: "second shelf",
    colors: [
        { name: "red", quantity: 50, minQuantity: 5 },
        { name: "blue", quantity: 60, minQuantity: 5 },
        { name: "green", quantity: 100, minQuantity: 5 },
    ]
};

//Data-Base structure
var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('test');
    // Insert some documents
    collection.insertMany([item1,item2,item3],
     function (err, result) {
        //assert.equal(err, null);
        //assert.equal(3, result.result.n);
        //assert.equal(3, result.ops.length);
        console.log("Inserted " +result.result.n+" documents into the collection");
        callback(result);
    });
}

var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('stock');
   
    // Find some documents
    
    collection.find({}).toArray(function (err, docs) {
        //assert.equal(err, null);
        console.log("Found the following records:");
        console.log(docs);
        //callback(result);
    });
}

var updateDocument = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Update document where a is 2, set b equal to 1
    collection.updateOne({ a: 2 }
      , { $set: { b: 1 } }, function (err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          console.log("Updated the document with the field a equal to 2");
          callback(result);
      });
}

var removeDocument = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.deleteMany({ }, function (err, result) {
        console.log("Removed all document with the field a equal to 3");
        callback(result);
    });
}

var indexCollection = function (db, callback) {
    db.collection('documents').createIndex(
      { "a": 1 },
        null,
        function (err, results) {
            console.log(results);
            callback();
        }
    );
};

var getItem = function (query) {
    var collection = db.collection('stock');
    // Find item
    return collection.find(query).toArray();
};
var addItem = function (item) {
    var collection = DB.collection('stock');
    collection.insert(item);
};
var getAllItems = function () {
    //wait for db to be ready
    while (!DB.open);
    return db.collection('stock').find().toArray();
}

module.exports = { item1, item2, item3, getItem, addItem, Item, Color, getAllItems };