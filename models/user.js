var mongoose = require("mongoose"),
	passportLocalMongoose = require("passport-local-mongoose")


var Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: String,
	password: String
});

var options = {
	errorMessages: {
		IncorrectPasswordError: 'Password is incorrect',
		IncorrectUsernameError: 'Username is incorrect or does not exist'
	}
};

UserSchema.plugin(passportLocalMongoose, options);

module.exports = mongoose.model("User", UserSchema);