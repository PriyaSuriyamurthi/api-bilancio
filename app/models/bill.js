var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var Person = new Schema({
    firstName:{type:String},
    lastName:{type:String},
	email:{type:String},
    personType:{type:String}
});

var BillSchema   = new Schema({
	_id:{type:String},
	person :Person,
	Date: {type:Date},
	itemAmount:{type:Number, default: 0.00},
	billType:{type:String},
	Description:{type:String},
	comments:{type:String},
	futureDate:{type:Boolean, default:false}
});


module.exports = mongoose.model('Bill', BillSchema);