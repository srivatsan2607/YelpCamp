var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//Schema Setup
var CampgroundSchema = new Schema({
	name:String,
	price:String,
	image:String,
	description:String,
	location:String,
	coordinates:Array,
	createdAt:{type:Date,default:Date.now},
	author:{
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		},
		username:String
	},
	comments:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Comment"
	}]
});

module.exports = mongoose.model("Campground",CampgroundSchema);