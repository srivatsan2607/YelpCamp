var mongoose = require("mongoose"),
    Campground = require("./models/campgroundModel.js"),
	Comment = require("./models/commentModel.js");
	

var datas = [
	{
		name:"KAshmir",
		image:"https://images.pexels.com/photos/4268158/pexels-photo-4268158.jpeg?auto=compress&cs=tinysrgb&h=350",
description:"Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term \"Kashmir\" denoted only the Kashmir Valley"
	},
	{
		name:"KAshmir",
		image:"https://images.pexels.com/photos/4268158/pexels-photo-4268158.jpeg?auto=compress&cs=tinysrgb&h=350",
description:"Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term \"Kashmir\" denoted only the Kashmir Valley"
	},
	{
		name:"KAshmir",
		image:"https://images.pexels.com/photos/4268158/pexels-photo-4268158.jpeg?auto=compress&cs=tinysrgb&h=350",
description:"Kashmir is the northernmost geographical region of the Indian subcontinent. Until the mid-19th century, the term \"Kashmir\" denoted only the Kashmir Valley"
	}
]

function seedDb(){
	Campground.deleteMany({},function(err){
		// if(err){
		// 	console.log(err);
		// }else{
		// 	console.log("Deleted");
		// 	datas.forEach(function(seed){
		// 		Campground.create(seed,function(err,campground){
		// 			if(err){
		// 				console.log(err);
		// 			}else{
		// 				console.log("camp created");
		// 				Comment.create({
		// 					text:"This place is amazing!!!!",
		// 					author:"vatsan"
		// 				},function(err,comment){
		// 					if(err){
		// 						console.log(err);
		// 					}else{
		// 						campground.comments.push(comment);
		// 						campground.save();
		// 						console.log("created comment");
		// 					}
		// 				})
		// 			}
		// 		})
		// 	})
		// }
	});
}

module.exports = seedDb;