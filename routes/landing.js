/**
 * Created by AmanB on 03-06-2017.
 */
var express = require("express"),
	request = require("request");
	router = express.Router({mergeParams: true});



router.get("/", function (req, res) {
	var date = new Date(+(new Date()) - Math.floor(Math.random()*500000000000));
	function formatDate(date) {
		var d = new Date(date),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}
	
	date = formatDate(date);
	var url = "https://api.nasa.gov/planetary/apod?api_key=wor61xzaXPZLnohf7YBS4OFWXe3ndGDo4VpR9prX&date=" + date;
	request(url, function (error, response, body) {
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			// res.send(data);
			res.render("landing", {data : data, title: 'NASA Picture of The Day'});
		}
	});
});
module.exports = router;
