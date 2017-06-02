var mongoose = require("mongoose");

//MONGOOSE MODEL CONFIG
var blogSchema = new mongoose.Schema({
	title : String,
	image : {type : String, default: "placeholder.jpg"},
	body : String,
	created:
		{type: Date,
			default: Date.now}
});

module.exports = mongoose.model("blog", blogSchema);
