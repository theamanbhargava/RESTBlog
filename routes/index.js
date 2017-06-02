/**
 * Created by AmanB on 02-06-2017.
 */
var express = require("express"),
	router  = express.Router({mergeParams: true});

router.get("/", function (req, res) {
	res.redirect("/blogs");
});

module.exports = router;
