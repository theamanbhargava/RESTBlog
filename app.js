/**
 * Created by AmanB on 11-05-2017.
 */
var express     = require("express"),
	app         = express(),
	mongoose    = require("mongoose"),
	bodyParser  = require("body-parser");
	methodOverride = require("method-override");
	mongoose.connect("mongodb://localhost/restful_blog_app");
	expressSanitizer = require("express-sanitizer");

//Require routes
var blogRoutes = require("./routes/blog"),
	indexRoutes = require("./routes/index");

app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

/*title
* image
* body
* created*/

//INDEX ROUTE
app.use("/", indexRoutes);

app.use("/blogs", blogRoutes);

app.listen(process.env.PORT, function () {
	console.log("Server is running on port " + process.env.PORT);
});
