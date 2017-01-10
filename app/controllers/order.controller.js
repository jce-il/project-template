
var order = require('../models/order');

module.exports = {
  showAllIOrders: showAllOrders
 }

function getAllIOrders(req,res) {
	order.find({}, function(err,orders) {
    var orderMap = {};
	if (err) {
      res.status(404);
      res.send('ORDERS WERE NOT FOUND!');
    }
	res.render('pages/orders', { 
      order: order,
      success: req.flash('success')
    });
	//if we need it to be shown on the screen...
    /*orders.forEach(function(order) {
      orderMap[order._id] = order;
    });
    res.send(userMap);  
  });*/
}