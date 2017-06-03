/**
 * Created by AmanB on 02-06-2017.
 */
var express = require("express");
var router = express.Router({mergeParams: true});
var Blog = require("../models/blog");
var Comment = require("../models/comments");
var middleware = require("../middelware");

//Comments New
router.get("/new", middleware.isLoggedIn, function (req, res) {
	// find campground by id
	// console.log(req.params.id);
	Blog.findById(req.params.id, function (err, blog) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/new", {blog: blog});
		}
	})
});

//Comments Create
router.post("/", middleware.isLoggedIn, function (req, res) {
	//lookup campground using ID
	req.body.comment = req.body.comment.sanitize();
	Blog.findById(req.params.id, function (err, blog) {
		if (err) {
			console.log(err);
			res.redirect("/blogs");
		} else {
			Comment.create(req.body.comment, function (err, comment) {
				if (err) {
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					//save comment
					comment.save();
					blog.comments.push(comment);
					blog.save();
					req.flash('success', 'Created a comment!');
					res.redirect('/blogs/' + blog._id);
				}
			});
		}
	});
});

router.get("/:commentId/edit", middleware.checkUserComment, middleware.isLoggedIn, function (req, res) {
	// find campground by id
	Comment.findById(req.params.commentId, function (err, comment) {
		if (err) {
			console.log(err);
		} else {
			res.render("comments/edit", {blog_id: req.params.id, comment: comment});
		}
	})
});

router.put("/:commentId", middleware.checkUserComment, function (req, res) {
	req.body.comment = req.body.comment.sanitize();
	Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function (err, comment) {
		if (err) {
			res.render("edit");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	});
});

router.delete("/:commentId", middleware.checkUserComment, function (req, res) {
	Comment.findByIdAndRemove(req.params.commentId, function (err) {
		if (err) {
			console.log("PROBLEM!");
		} else {
			res.redirect("/blogs/" + req.params.id);
		}
	})
});

module.exports = router;
