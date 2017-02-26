/**
 * Created by priyasuriyamurthi on 2/25/17.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LoginSchema = new Schema({
    id:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    email:{type:String},
    personType:{type:String},
    billShell:[]
});

module.exports = mongoose.model('Login', LoginSchema);