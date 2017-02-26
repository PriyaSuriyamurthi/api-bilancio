var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var BillSchema   = new Schema({
	person : {type:String,required: true
    },
	Date: {type:Date,default:Date.now},
	itemAmount:{type:Number, default: 0.00,required: true
    },
	billType:{type:String},
	Description:{type:String},
	comments:{type:String},
	futureDate:{type:Boolean, default:false},
	createdOn:{type:Date, default:Date.now},
	updatedOn:{type:Date},
	updatedBy:{type:String}
});

var BillShell = new Schema({
	owners: [],
	sheetName:{type:String},
	creationDate:{type:Date,default:Date.now},
	bills: [BillSchema]
})


module.exports = mongoose.model('Bill', BillShell);