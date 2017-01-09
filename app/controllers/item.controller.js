

var Item = require('../models/Item');
var path = require('path');

/*module.exports = {
    get: function (req, res) {
        
        }
    ,
    post: function (req, res) {
        
    }
}*/

module.exports = {
  showAllItems: showAllItems,
  addItem: addItem,
  checkQuantity: checkQuantity,
  deleteItem: deleteItem,
  deleteAllItems: deleteAllItems,
  changeItem: changeItem
}


function showAllItems(req,res) {    
	Item.find({}, (err, stock) => {
        if (err) {
            res.status(404);
            res.send('Items not found!');
        }
        else{
            res.json(stock);
            console.log(stock);
            //res.render(path.join(__dirname , '../public/view/admin/index.html'));
            //res.render('index.html');
        }      
        console.log("hi");
        console.log(stock);
		
  });
  
}

function addItem(req,res) {
	var newItem = new Item({ category: 'ffhjjk',subCategory: 'circle' ,index:'1' ,name:'item1' ,description: 'this is item 1',quantity:5,minQuantity:5 });
	newItem.save();
	console.log(newItem);
	showAllItems(req,res);
}

function checkQuantity (req,res){
	Item.$where('this.quantity <= this.minQuantity').exec(function(err, result) {
	if (err) {
	  throw err;
	}
  console.log(result);
  res.json(result);
	});

}

function deleteAllItems(req,res) {
	Item.remove ({},function(err, result) {
	if (err) {
	  throw err;
	}
	console.log(result);
	res.json(result);
	});
}

function deleteItem(req,res) {
	Item.remove ({quantity:5,minQuantity:5},function(err, result) {
	if (err) {
	  throw err;
	}
	console.log(result);
	res.json(result);
	});
}

function changeItem(req,res) {
   // var key = "category";
	var value = "cups";
    //Item.findOneAndUpdate({index: Item.index}, {$set: {key: value}}, {new: true}, function(err, doc){
	Item.findOneAndUpdate({index:"1"}, {$set: {category: value}}, {new: true}, function(err, doc){
        if(err){
            throw err;
        }

        console.log(doc);
        //res.json("הפריט עודכן");
		//console.log("הפריט עודכן");
		//console.log("a");
		showAllItems(req,res);

    });
	console.log("fhdkbfhbh");
	showAllItems(req,res);

}
