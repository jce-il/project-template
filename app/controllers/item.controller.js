

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
  a: a
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

function changeItem(res,item,key,value) {
	console.log("in changeItem");
    Item.findOneAndUpdate({index: item.index}, {$set: {category: value}}, function(err, doc){
        if(err){
            throw err;
        }
        console.log(doc);
		console.log("הפריט עודכן");
		res.json("הפריט עודכן");
    });

}

function a(req,res) {
	console.log("in a");
	var item = new Item({ category: 'aaaa',subCategory: 'sss' ,index:'1' ,name:'www' ,description: 'this is item a',quantity:4,minQuantity:2 });
	item.save();
	changeCategoryOfItem(req,res,item)
}

function changeCategoryOfItem(req,res,item) {
	console.log("in changeCategoryOfItem");
	var key = 'category';
	var value = "mmmmmm"
	//var value = item.params.category;
	changeItem(res,item,key,value);
}





