// get mongo-module
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
// Connection URL
var url = 'mongodb://localhost:27017/TestDB';

// Use connect method to connect to the server
MongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to database server");

    insertDocuments(db, function () {
        findDocuments(db, function () {
            db.collection('documents').remove();
            db.close();
        });
    });
});


//Data-Base structure
var DB = (function () {
    // your private properties
    var prop1 = 1;
    var prop2 = 2;
    // your getters
    var getProp1 = function () {
        return prop1;
    };
    var getProp2 = function () {
        return Prop2;
    };
    // your setters
    var setProp1 = function (newValue) {
        prop1 = newValue;
    };
    var setProp2 = function (newValue) {
        prop2 = newValue;
    };
    // your JSON representation of the object
    var toString = function () {
        return JSON.stringify({
            prop1: prop1,
            prop2: prop2
        });
    };
    // Object that gets exposed -
    return {
        "getProp1": getProp1,
        "getProp2": getProp2,
        "setProp1": setProp1,
        "setProp2": setProp2,
        "toString": toString
    }
})();

module.exports = { DB };

var insertDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insertMany([
      { a: 1, b: 1, c: 1 }, { a: 2, b: 2, c: 2 }, { a: 3, b: 3, c: 3}
    ], function (err, result) {
        //assert.equal(err, null);
        //assert.equal(3, result.result.n);
        //assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the collection");
        callback(result);
    });
}

var findDocuments = function (db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
   
    // Find some documents
    
    collection.find().toArray(function (err, docs) {
        //assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);

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