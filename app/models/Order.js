var mongoose = require('mongoose');
var Schema= mongoose.Schema;

var orderedItem= new mongoose.Schema({
	name: String,
	quantity: Number
});	

module.exports = mongoose.model('order',{
    orderId : String,
    userName: String,
	status: String,
	date: Date,
	orderedItems: [orderedItem]
});
