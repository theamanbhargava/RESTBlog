/**
 * Created by AmanB on 02-06-2017.
 */
var express = require("express"),
	router = express.Router({mergeParams: true}),
	passport = require("passport"),
	User = require("../models/user");

router.get("/", function (req, res) {
	res.redirect("/blogs");
});

// show register form
router.get("/register", function (req, res) {
	res.render("register");
});

//handle sign up logic
router.post("/register", function (req, res) {
	var newUser = new User({username: req.body.username});
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

module.exports = router;
