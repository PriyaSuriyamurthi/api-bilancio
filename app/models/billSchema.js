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
    createdOn:{type:Date},
    updatedOn:{type:Date, default:Date.now},
    updatedBy:{type:String, required: true}
})

module.exports = mongoose.model('BillSchema', BillSchema);
