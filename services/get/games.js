//games
var bogan = require('boganipsum');
var generator = require('dyson-generators');
var random_name = require('random-name');
var functions = require('../functions');

var total_games = 20;
var my_total_games = 10;
var id_aux = 1;
var offset = 0;
var array_tags = [];
var id_tag = 0;
var promoId_value = functions.random_number();

var list_games = function(element) {

	console.log("Elements::" + element);
	var list = [];

	for (var i = 0; i < element; i++) {
		list.push({
			"id": i,
			"title": random_name(),
			"purchased": functions.random_purchase(),
			"rating": functions.random_rating(),
			"imageUrl": "http://lorempixel.com/200/200/" + functions.type_image() + "/" + i,
			"price": {
				"value": functions.random_price(),
				"currency": "ARG",
				"promoId": functions.random_number()
			}
		});
	}
	return list;
};

var list_screenshots = function(element) {

	console.log("Elements::" + element);
	var list = [];
	var width = 400;
	var height = 200;

	for (var i = 0; i < element; i++) {
		list.push({
			"width": width,
			"height": height,
			"imageUrl": "http://lorempixel.com/" + width + "/" + height + "/" + functions.type_image() + "/" + i
		});
	}
	return list;
};

var games = {

	path: '/v2/portals/personal_juegos_android/lists/:tag/games-android?',
	status: function(req, res) {
		console.log("===>" + req.query['page']);

		offset = 0;
		var prev_page = req.query['page'] - 1;
		var curr_page = req.query['page'];
		var page_size = req.query['size'];

		if (curr_page * page_size > total_games) {
			if (prev_page * page_size > total_games) {
				res.json(404, {
					message: 'Number of games: ' + total_games,
					error: 404
				});
			} else {
				offset = total_games - (prev_page * page_size);
			}
		}
	},
	cache: true,
	collection: true,
	size: function(params, query, data) {
		var tags = params.tag;
		array_tags = tags.split(";")
		return array_tags.length;
	},
	template: {
		id: function() {
			return id_aux++;
		},
		tag:function(){
			var tag = array_tags[id_tag];
			id_tag++;
			return tag+"";
		},
		header: generator.name,
		result: function(params, query, data) {
			if (offset == 0) {
				return list_games(query.size);
			} else {
				return list_games(offset);
			}
		},
		page: function(params, query, data) {
			return parseInt(query.page) || 1;
		},
		size: function(params, query, data) {
			if (offset == 0) {
				return parseInt(query.size) || undefined;
			} else {
				return offset;
			}
		},
		total: total_games
	}
};


var game_detailed = {
	path: '/v2/portals/personal_juegos_android/games-android/:id',
	status: function(req, res) {
		if (req.params['id'] == undefined) {
			res.json(404, {
				message: 'Fail, Fail, Fail!!',
				error: 404
			});
		}
	},
	template: {
		id: function() {
			return id_aux++;
		},
		title: generator.name,
		description: bogan(),
		purchased: functions.random_purchase(),
		rating: functions.random_rating(),
		imageUrl: "http://lorempixel.com/200/200/",
		developer:generator.name,
		price: {
			value: functions.random_price(),
			currency: "ARG",
			promoId: promoId_value
		},
		hasSubscription: functions.random_purchase(),
		screenshots: list_screenshots(5),
		provider: {
			id: function() {
				return id_aux++;
			},
			name: generator.name,
			tag: functions.random_big_number() + "",
			subscription: {
				id: promoId_value,
				image: "http://lorempixel.com/200/200/" + functions.type_image() + "/" + id_aux,
				title: generator.name,
				shortDescription: bogan({
					paragraphs: 1,
					sentenceMin: 2,
					sentenceMax: 3
				}),
				longDescription: bogan({
					paragraphs: 3,
					sentenceMin: 5,
					sentenceMax: 10
				}),
				price: {
					value: functions.random_price(),
					currency: "ARG",
					promoId: promoId_value
				},
				status: functions.random_status()
			}
		}
	}
};

var game_related = {
	path: '/v2/portals/personal_juegos_android/games-android/:gameId/related/games-android?',
	status: games.status,
	cache: true,
	collection: true,
	size: 1,
	template: {
		id: function() {
			return id_aux++;
		},
		header: generator.name,
		result: function(params, query, data) {
			if (offset == 0) {
				return list_games(query.size);
			} else {
				return list_games(offset);
			}
		},
		page: function(params, query, data) {
			return parseInt(query.page) || 1;
		},
		size: function(params, query, data) {
			if (offset == 0) {
				return parseInt(query.size) || undefined;
			} else {
				return offset;
			}
		},
		total: total_games
	}
};

var my_games = {
	path: '/v2/portals/personal_juegos_android/games-android/purchases?',
	status: function(req, res) {
		console.log("===>" + req.query['page']);

		offset = 0;
		var prev_page = req.query['page'] - 1;
		var curr_page = req.query['page'];
		var page_size = req.query['size'];

		if (curr_page * page_size > my_total_games) {
			if (prev_page * page_size > my_total_games) {
				res.json(404, {
					message: 'Number of games: ' + my_total_games,
					error: 404
				});
			} else {
				offset = my_total_games - (prev_page * page_size);
			}
		}
	},
	cache: true,
	collection: true,
	size: function(params, query, data) {
		if (offset == 0) {
			return query.size;
		} else {
			return offset;
		}
	},
	template: {
		url: "https://dl.dropboxusercontent.com/u/3873933/UNOFriends.apk",
		id: function() {
			return id_aux++;
		},
		title: generator.name,
		description: bogan(),
		purchased: true,
		rating: functions.random_rating(),
		imageUrl: "http://lorempixel.com/200/200/",
		price: {
			value: functions.random_price(),
			currency: "ARG",
			promoId: function() {
				return parseInt(Math.random() * (1000) + 10);
			}
		}
	},
	container: {
		result: function(params, query, data) {
			return data;
		},
		page: function(params, query, data) {
			return parseInt(query.page) || 1;
		},
		size: function(params, query, data) {
			if (offset == 0) {
				return parseInt(query.size) || undefined;
			} else {
				return offset;
			}
		},
		total: my_total_games
	}
};

var search = {
	path: '/v2/portals/personal_juegos_android/searches/games-android?',
	status: games.status,
	cache: true,
	collection: true,
	size: 1,
	template: {
		id: function() {
			return id_aux++;
		},
		result: function(params, query, data) {
			if (offset == 0) {
				return list_games(query.size);
			} else {
				return list_games(offset);
			}
		},
		page: function(params, query, data) {
			return parseInt(query.page) || 1;
		},
		size: function(params, query, data) {
			if (offset == 0) {
				return parseInt(query.size) || undefined;
			} else {
				return offset;
			}
		},
		total: total_games
	}
};

module.exports = [games, my_games, game_detailed, game_related, search];