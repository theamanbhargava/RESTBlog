/**
 * Created by AmanB on 02-06-2017.
 */
var express = require("express");
var router  = express.Router();
var middleware = require("../middelware/index.js");
var Blog = require("../models/blog");

router.get("/", function (req, res) {
	Blog.find({}, function (err, blogs) {
		if(err){
			console.log("ERROR!")
		}else{
			res.render("index", {blogs: blogs});
		}
	});
});

router.get("/new", middleware.isLoggedIn, function (req, res) {
	res.render("new");
});

//SHOW ROUTE
router.get("/:id", function (req, res) {
	Blog.findById(req.params.id).populate("comments").exec(function (err, foundBlog) {
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("show", {blog : foundBlog});
		}
	})
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, function (req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	var title = req.body.blog.title,
		image = req.body.blog.image,
		body = req.body.blog.body;
	
	var author = {
		id: req.user._id,
		username: req.user.username
	};
	var newBlog = {title: title, image: image, body: body, author: author};
	Blog.create(newBlog, function (err, newBlog) {
		if(err){
			res.render("new");
		}
		else{
			res.redirect("/blogs");
		}
	})
});

/*EDIT ROUTE
 * Shows edit form*/
router.get("/:id/edit", middleware.checkUserBlog, function (req, res) {
	Blog.findById(req.params.id, function (err, foundBlog) {
		if(err){
			res.redirect("/blogs");
		}else{
			res.render("edit", {blog : foundBlog});
		}
	});
});

/*
 UPDATE ROUTE
 Creates route for the update as a put request
 */
router.put("/:id", middleware.checkUserBlog, function (req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updatedBlog) {
		if(err){
			res.redirect("/blogs");
		}
		else{
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

//DELETE ROUTE
router.delete("/:id", middleware.checkUserBlog, function (req, res) {
	Blog.findByIdAndRemove(req.params.id, function (err) {
		if(err){
			console.log(err);
		}else{
			res.redirect("/blogs");
		}
	})
});

module.exports = router;
