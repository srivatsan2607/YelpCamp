var Campground = require("../models/campgroundModel"),
	Comment	   = require("../models/commentModel"),
	

	middlewares = {}

middlewares.checkCampgroundOwnership = function (req,res,next){
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCamp){
			if(err || !foundCamp){
				req.flash("error","Campground does not exist")
				res.redirect("/campgrounds")
			}else{
				if(foundCamp.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You don't have permission to do that!")
					res.redirect("/campgrounds/"+req.params.id)
				}
			}
		})
	}else{
		res.redirect("back")
	}
}

middlewares.checkCommentOwnership = function (req,res,next){
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id,function(err,foundComment){
			if(err || !foundComment){
				req.flash("error","Comment not found!")
				res.redirect("back")
			}else{
				if(foundComment.author.id.equals(req.user._id)){
					next();
				}else{
					req.flash("error","You don't have permission to do that!")
					res.redirect("back")
				}
			}
		})
	}else{
		req.flash("error","Please Login to proceed...");
		res.redirect("back")
	}
}

middlewares.isLoggedin = function (req,res,next){
	if(req.isAuthenticated()){
	   return next();
	}
	req.flash("error","Please Login to proceed..")
	res.redirect("/login");
}

module.exports = middlewares;
