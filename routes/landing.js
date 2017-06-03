/**
 * Created by AmanB on 03-06-2017.
 */
var express = require("express"),
	router = express.Router({mergeParams: true});

router.get("/", function (req, res) {
	res.render("landing", {title: 'Blog'});
});
module.exports = router;
