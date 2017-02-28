var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;




var BillShell = new Schema({
	login_id: {type:String},
	owner: {type:String},
	sheetName:{type:String},
	creationDate:{type:Date,default:Date.now}
})


module.exports =  mongoose.model('Bill', BillShell);