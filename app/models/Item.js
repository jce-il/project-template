var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Color = new Schema({
  name:   String,
  image:  Buffer,
  quantity: Number,
  minQuantity: Number
})

module.exports = mongoose.model('Item',{
    category: String,
	subCategory: String,
	index: String,
	name: String,
	description: String,
	location: String,
	colors:   [Color]    
});

