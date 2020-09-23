var express 			  = require("express"),
	app 				  = express(),
	bodyparser 			  = require("body-parser"),
	mongoose 			  = require("mongoose"),
	flash			      = require("connect-flash"),
	passport			  = require("passport"),
	User				  = require("./models/user.js"),
	LocalStrategy 		  = require("passport-local"),
	passportLocalMongoose = require("passport-local-mongoose"),
	Campground 			  = require("./models/campgroundModel.js"),
	seedDb 				  = require("./seeds.js"),
	Comment 			  = require("./models/commentModel.js"),
	campgroundRoutes 	  = require("./routes/campgrounds"),
	commentRoutes		  = require("./routes/comments"),
	indexRoutes			  = require("./routes/index"),
	methodOverride		  = require("method-override")
require("dotenv").config();
// seedDb();

require("./connections/connection.js");
app.use(bodyparser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passport configuration
app.use(require("express-session")({
	secret:"Harry potter is my favourite series",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	res.locals.info = req.flash("info");
	res.locals.moment = require('moment');
	next();
});

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT || 3000, function () {
    console.log("Running YelpCamp Server @port 3000");
})