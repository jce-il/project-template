//functions

var Item = require('../models/Item');

/*module.exports = {
    get: function (req, res) {
        
        }
    ,
    post: function (req, res) {
        
    }
}*/

module.exports = {
  showAllItems: showAllItems,
  //createItem: createItem
  
}

/*function createItem (req,res) {
	const items = [
		{ category: 'plates',subCategory: 'circle' ,index:'1' ,name:'item1' ,description: 'this is item 1' },
		{ category: 'cups',subCategory: 'paper' ,index:'3' ,name:'item3' ,description: 'this is item 3' },
		{ category: 'plates',subCategory: 'Square' ,index:'2' ,name:'item2' ,description: 'this is item 2' },
		{ category: 'plates',subCategory: 'circle' ,index:'11' ,name:'item1' ,description: 'this is item 1' }
	  ];
	res.render('pages/stock',{items:items});
} */



function showAllItems(req,res) {
    /*
	const items = [
		{ category: 'plates',subCategory: 'circle' ,index:'1' ,name:'item1' ,description: 'this is item 1' },
		{ category: 'cups',subCategory: 'paper' ,index:'3' ,name:'item3' ,description: 'this is item 3' },
		{ category: 'plates',subCategory: 'Square' ,index:'2' ,name:'item2' ,description: 'this is item 2' },
		{ category: 'plates',subCategory: 'circle' ,index:'11' ,name:'item1' ,description: 'this is item 1' }
	  ];
	Item.find({}, (err, stock) => {
	if (err) {
      res.status(404);
      res.send('Items not found!');
    }
	res.render('pages/stock', { 
      stock: stock,
      success: req.flash('success')
    });
  });
  */
}

