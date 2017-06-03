/**
 * Created by AmanB on 02-06-2017.
 */
var mongoose = require("mongoose");
mongoose.Promise = require('bluebird');
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
