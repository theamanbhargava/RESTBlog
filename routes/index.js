/**
 * Created by AmanB on 02-06-2017.
 */
var express = require("express"),
	router = express.Router({mergeParams: true}),
	passport = require("passport"),
	User = require("../models/user"),
	middleware = require("../middelware");

router.get("/", function (req, res) {
	res.render("landing");
});

// show register form
router.get("/register", function (req, res) {
	res.render("register");
});

// show admin register form
router.get("/admin-register", function (req, res) {
	res.render("admin-register");
});

//handle normal sign up logic
router.post("/register", function (req, res) {
	if (req.body.email) {
		var newUser = new User({username: req.body.username, isAdmin: false});
		User.register(newUser, req.body.password, function (err, user) {
			if (err) {
				console.log(err);
				req.flash("error", err.message);
				return res.render("register");
			}
			passport.authenticate("local")(req, res, function () {
				req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
				res.redirect("/blogs");
			});
		});
	} else {
		res.redirect("/register");
	}
});

//handle sign up logic
router.post("/admin-register", function (req, res) {
	if (req.body.email) {
		if (req.body.secret === process.env.SECRET) {
			var newUser = new User({username: req.body.username, isAdmin: true});
			User.register(newUser, req.body.password, function (err, user) {
				if (err) {
					console.log(err);
					req.flash("error", err.message);
					return res.render("register");
				}
				passport.authenticate("local")(req, res, function () {
					req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
					res.redirect("/blogs");
				});
			});
		}
	} else {
		res.redirect("/admin-register");
	}
});

//show login form
router.get("/login", function (req, res) {
	res.render("login");
});

//handling login logic
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/blogs",
		failureRedirect: "/login"
	}), function (req, res) {
});

// logout route
router.get("/logout", function (req, res) {
	req.logout();
	req.flash("success", "LOGGED YOU OUT!");
	res.redirect("/blogs");
});

router.get("/secret", middleware.isAdmin, function (req, res) {
	res.send("You are the best!");
});

module.exports = router;
