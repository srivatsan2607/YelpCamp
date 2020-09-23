var express    = require("express"),
	router     = express.Router({mergeParams:true}),
	Campground = require("../models/campgroundModel"),
	Comment    = require("../models/commentModel"),
	middleware = require("../middleware")


//New route
router.get("/new",middleware.isLoggedin,function(req,res){
	Campground.findById(req.params.id,function(err,foundCamp){
		if(err || !foundCamp){
			req.flash("error","Campground not found!")
			res.redirect("back")
		}else{
			res.render("comments/newComments",{campground:foundCamp});
		}
	})
})

//Create route
router.post("/",middleware.isLoggedin,function(req,res){
	Campground.findById(req.params.id,function(err,foundCamp){
		if(err || !foundCamp){
			req.flash("error","Campground not found!")
			res.redirect("/campgrounds/"+req.params.id)
		}else{
			Comment.create(req.body.comment,function(err,comment){
				if(err || !comment){
					req.flash("error",err.message)
				}else{
					comment.author.id=req.user._id;
					comment.author.username=req.user.username;
					comment.save();
					foundCamp.comments.push(comment);
					foundCamp.save();
					req.flash("success","Comment Added!")
					res.redirect("/campgrounds/"+req.params.id);
				}
			})
		}
	})
});

router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCamp){
		if(err || !foundCamp){
			req.flash("error","Campground not found!")
			res.redirect("back")
		}
		Comment.findById(req.params.comment_id,function(err,foundComment)		{
		if(err || !foundComment){
			req.flash("error","Comment not found!")
			res.redirect("/campgrounds/"+req.params.id)
		}else{
			res.render("comments/editComments",		{campground:foundCamp,comment:foundComment});
		}
	})
	})
})

router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Campground.findById(req.params.id,function(err,foundCamp){
		if(err || !foundCamp){
			req.flash("error","Campground not found!")
			res.redirect("back")
		}
		Comment.findByIdAndUpdate
	(req.params.comment_id,req.body.comment,function(err,foundComment){
		if(err || !foundComment){
			req.flash("error","Comment not found!")
			res.redirect("/campgrounds/"+req.params.id)
		}else{
			req.flash("info","Comment updated!")
			res.redirect("/campgrounds/"+req.params.id)
		}
	})
	})	
});

router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
	Comment.findByIdAndRemove(req.params.comment_id,function(err){
		if(err){
			req.flash("error",err.message)
			res.redirect("back")
		}
		req.flash("info","Comment deleted!")
		res.redirect("/campgrounds/"+req.params.id);
	})
})

module.exports = router;
