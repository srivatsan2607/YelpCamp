var express = require("express"),
	router = express.Router({ mergeParams: true }),
	Campground = require("../models/campgroundModel"),
	Comment = require("../models/commentModel"),
	middleware = require("../middleware"),
	mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding')

require('dotenv').config();
const geocodingClient = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

//Index route
router.get("/", function (req, res) {
	Campground.find({}, function (err, allCampgrounds) {
		if (err) {
			req.flash("error", err.message)
		}
		else {
			res.render("campgrounds/index", { campgrounds: allCampgrounds });
		}
	})
})

//New route
router.get("/new", middleware.isLoggedin, function (req, res) {
	res.render("campgrounds/newCampgrounds");
})

//Create route
router.post("/", middleware.isLoggedin, async function (req, res) {
	var location = req.body.camp.location;
	req.body.camp.author = {
		id: req.user._id,
		username: req.user.username
	}
	let response = await geocodingClient.forwardGeocode({
		query: location,
		limit: 1
	})
		.send();
	req.body.camp.coordinates = response.body.features[0].geometry.coordinates;
	console.log(req.body.camp.coordinates);
	Campground.create(req.body.camp, function (err, Campground) {
		if (err) {
			req.flash("error", err.message)
		}
		else {
			req.flash("success", "Campground created successfully!")
			res.redirect("/campgrounds");
		}
	});
})

//Show route
router.get("/:id", function (req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function (err, foundCamp) {
		if (err || !foundCamp) {
			req.flash("error", "Campground not found!")
			res.redirect("back")
		} else {
			res.render("campgrounds/show", { campground: foundCamp });
		}
	})
})

//Edit Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findById(req.params.id, function (err, foundCamp) {
		if (err || !foundCamp) {
			req.flash("error", "Campground not found!")
			res.redirect("back")
		} else {
			res.render("campgrounds/edit", { campground: foundCamp });
		}
	})
});

//Update Route
router.put("/:id", middleware.checkCampgroundOwnership, async function (req, res) {
	// req.body.blog.body = req.sanitize(req.body.blog.body);
	var location = req.body.camp.location;
	let response = await geocodingClient.forwardGeocode({
		query: location,
		limit: 1
	})
		.send();
	var coordinates = response.body.features[0].geometry.coordinates;
	req.body.camp.coordinates = coordinates;
	Campground.findByIdAndUpdate(req.params.id, req.body.camp, function (err, updatedcampground) {
		if (err) {
			req.flash("error", err.message)
			res.redirect("/campgrounds")
		} else {
			req.flash("info", "Campground updated successfully!")
			res.redirect("/campgrounds/" + req.params.id);
		}
	})
});


//Delete route
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findByIdAndRemove(req.params.id, function (err, foundcampground) {
		if (err || !foundcampground) {
			req.flash("error", "Campground not found!")
			res.redirect("back")
		}
		Comment.deleteMany({ _id: { $in: foundcampground.comments } }, (err) => {
			if (err) {
				req.flash("error", err.message)
			}
			req.flash("info", "Campground deleted successfully!")
			res.redirect("/campgrounds");
		})
	})
});


module.exports = router;