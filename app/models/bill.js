var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var BillSchema   = new Schema({
	billShell_id:{type:String,required: true},
	person : {type:String,required: true
    },
	date: {type:Date,default:Date.now},
	itemAmount:{type:Number, default: 0.00,required: true
    },
	billType:{type:String},
	description:{type:String},
	comments:{type:String},
	createdOn:{type:Date, default:Date.now},
	updatedOn:{type:Date, default:null},
	updatedBy:{type:String, default:null}
});

var BillShell = new Schema({
	owner: {type:String},
	sheetName:{type:String},
	creationDate:{type:Date,default:Date.now}
})

var BillShell = mongoose.model('Bill', BillShell);
var BillSchema = mongoose.model('BillSchema', BillSchema);
module.exports =  {
	BillShell : BillShell,
    BillSchema : BillSchema
}