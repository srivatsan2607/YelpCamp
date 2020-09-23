var express  = require("express"),
	router   = express.Router(),
	User     = require("../models/user"),
	passport = require("passport")

router.get("/", function (req, res) {
    res.render("landing");
})

router.get("/register",function(req,res){
	res.render("campgrounds/register");
});

router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message)
			return res.redirect("/register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome to YelpCamp "+user.username)
			res.redirect("/campgrounds");
		})
	})
});

router.get("/login", function(req, res){
   res.render("campgrounds/login"); 
});

router.post("/login", function(req,res,next){
		passport.authenticate("local", {
		successRedirect: "/campgrounds",
		failureRedirect: "/login",
		failureFlash:true,
		successFlash:"Successfully logged in as "+req.body.username+"!"
	})(req, res);
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("info","Successfully logged you out!")
	res.redirect("/campgrounds");
})

module.exports = router;