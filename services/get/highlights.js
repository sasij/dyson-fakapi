//highlights

var generator = require('dyson-generators');
var functions = require('../functions');
var id_aux = 0; //fake id
var pages = 1;
var number_of_highlights = 5;

var list_highlights = function(dpi) {

	console.log("DPI::" + dpi);

	var list = [];
	var widht = 0;
	var height = 0;

	if (dpi == "mdpi") {
		widht = 320;
		height = 200;
	} else if (dpi == "hdpi") {
		widht = 480;
		height = 300;
	} else {
		widht = 640
		height = 400;
	}

	for (var i = 0; i < number_of_highlights; i++) {
		list.push({
			"image_name": "/" + widht + "/" + height + "/" + functions.type_image() + "/",
			"section_uri": "android://games/" + functions.random_number(),
			"delay": 5000
		});
	}
	return list;
};

var highlights = {
	path: '/v2/portals/personal_juegos_android/highlights/:dpi',
	cache: true,
	template: {
		items: function(params, query, data) {
			var dpi = params.dpi;
			return list_highlights(dpi);
		},
		image_url_base: "http://lorempixel.com"
	}
};

var highlights_provider = {
	path: '/v2/portals/personal_juegos_android/providers/:id/highlights/:dpi',
	cache: true,
	template: {
		items: function(params, query, data) {
			var dpi = params.dpi;
			return list_highlights(dpi);
		},
		imageUrlBase: "http://lorempixel.com"
	}
};


module.exports = [highlights, highlights_provider];