/**
 * Created by priyasuriyamurthi on 2/25/17.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var LoginSchema = new Schema({
    email_id:{type:String},
    firstName:{type:String},
    lastName:{type:String},
    personType:{type:String, default:"user"}
});

module.exports = mongoose.model('Login', LoginSchema);