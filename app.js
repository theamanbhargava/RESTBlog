/**
 * Created by AmanB on 11-05-2017.
 */
var express     = require("express"),
	app         = express(),
	mongoose    = require("mongoose"),
	passport = require("passport"),
	cookieParser = require("cookie-parser"),
	LocalStrategy = require("passport-local"),
	session = require("express-session"),
	User = require("./models/user"),
	flash = require("connect-flash"),
	bodyParser  = require("body-parser"),
	expressSanitizer = require("express-sanitizer"),
	methodOverride = require("method-override");
	mongoose.connect("mongodb://localhost/restful_blog_app_v3");
	
//Require routes
var blogRoutes = require("./routes/blog"),
	indexRoutes = require("./routes/index"),
	commentRoutes = require("./routes/comments");
	landingRoutes = require("./routes/landing");
	
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

/*title
* image
* body
* created*/

app.use(require("express-session")({
	secret: "Once again Rusty wins cutest dog!",
	resave: false,
	saveUninitialized: false
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

app.use("/", landingRoutes);

//INDEX ROUTES
app.use("/", indexRoutes);

//BLOG ROUTES
app.use("/blogs", blogRoutes);

//COMMENT PUT, POST AND DELETE ROUTES
app.use("/blogs/:id/comments", commentRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function () {
	console.log("Server is running on port " + process.env.PORT);
});
