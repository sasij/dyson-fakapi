//games
var bogan = require('boganipsum');
var generator = require('dyson-generators');
var random_name = require('random-name');
var total_games = 20;
var my_total_games = 10;
var id_aux = 1;

var random_purchase = function() {
	return ((Math.floor(Math.random() * 10) + 1) % 2) == 0 ? true : false;
};
var random_rating = function() {
	return parseFloat((Math.random() * (5.0 - 0.5) + 0.5).toFixed(1));
};
var random_price = function() {
	return parseFloat((Math.random() * (11.99 - 0.99) + 0.99).toFixed(2));
};

var random_big_number = function() {
	return parseInt(Math.random() * (15000) + 10000);
};

var random_number = function() {
	return parseInt(Math.random() * (1000) + 10);
};

var random_status = function() {
	return ((Math.floor(Math.random() * 10) + 1) % 2) == 0 ? 0 : 1;
};

var promoId_value = random_number();


var list_games = function(element) {

	console.log("Elements::" + element);
	var list = [];

	for (var i = 0; i < element; i++) {
		list.push({
			"id": i,
			"title": random_name(),
			"purchased": random_purchase(),
			"rating": random_rating(),
			"imageUrl": "http://lorempixel.com/g/200/200/",
			"price": {
				"value": random_price(),
				"currency": "ARG",
				"promoId": random_number()
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
			"imageUrl": "http://lorempixel.com/" + width + "/" + height + "/"
		});
	}
	return list;
};

var games = {

	path: '/v2/portals/personal_juegos_android/lists/:tag/games-android?',
	status: function(req, res) {
		console.log("===>" + req.query['page']);
		if (req.query['page'] * req.query['size'] > total_games) {
			res.json(404, {
				message: 'Number of games: ' + total_games,
				error: 404
			});
		}
	},
	cache: true,
	collection: true,
	size: function(params, query, data) {
		var tags = params.tag;
		var array_tags = tags.split(";")
		return array_tags.length;
	},
	template: {
		id: function() {
			return id_aux++;
		},
		header: generator.name,
		result: function(params, query, data) {
			return list_games(query.size);
		},
		page: function(params, query, data) {
			return parseInt(query.page) || 1;
		},
		size: function(params, query, data) {
			return parseInt(query.size) || undefined;
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
		purchased: random_purchase(),
		rating: random_rating(),
		imageUrl: "http://lorempixel.com/200/200/",
		price: {
			value: random_price(),
			currency: "ARG",
			promoId: promoId_value
		},
		hasSubscription: random_purchase(),
		screenshots: list_screenshots(5),
		provider: {
			id: function() {
				return id_aux++;
			},
			name: generator.name,
			tag: random_big_number(),
			subscription: {
				id: promoId_value,
				image: "http://lorempixel.com/200/200/",
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
					value: random_price(),
					currency: "ARG",
					promoId: promoId_value
				},
				status: random_status
			}
		}
	}
};

var game_related = {
	path: '/v2/portals/personal_juegos_android/games-android/:gameId/related/games?',
	collection: true,
	size: function(params, query, data) {
		console.log("----->>>>" + query.size);
		return query.size;
	},
	cache: true,
	template: {
		id: function() {
			return id_aux++;
		},
		title: generator.name,
		purchased: function() {
			return ((Math.floor(Math.random() * 10) + 1) % 2) == 0 ? true : false;
		},
		rating: function() {
			return parseFloat((Math.random() * (5.0 - 0.5) + 0.5).toFixed(1));
		},
		imageUrl: "http://lorempixel.com/g/200/200/",
		price: {
			value: function() {
				return parseFloat((Math.random() * (11.99 - 0.99) + 0.99).toFixed(2));
			},
			currency: "ARG",
			promoId: function() {
				return parseInt(Math.random() * (1000) + 10);
			}
		}
	}
};

var my_games = {
	path: '/v2/portals/personal_juegos_android/games-android/my-games?',
	status: function(req, res) {
		console.log("===>" + req.query['page']);
		if (req.query['page'] * req.query['size'] > my_total_games) {
			res.json(404, {
				message: 'Number of games: ' + my_total_games,
				error: 404
			});
		}
	},
	cache: true,
	collection: true,
	size: function(params, query, data) {
		return query.size;
	},
	template: {
		url: "https://dl.dropboxusercontent.com/u/3873933/UNOFriends.apk",
		id: function() {
			return id_aux++;
		},
		title: generator.name,
		description: bogan(),
		purchased: true,
		rating: random_rating(),
		imageUrl: "http://lorempixel.com/200/200/",
		price: {
			value: random_price(),
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
			return parseInt(query.size) || undefined;
		},
		total: my_total_games
	}
};



var search = {
	path: '/v2/portals/personal_juegos_android/search/?',
	status: function(req, res) {
		console.log("===>" + req.query['page']);
		if (req.query['page'] * req.query['size'] > total_games) {
			res.json(404, {
				message: 'Number of games: ' + total_games,
				error: 404
			});
		}
	},
	cache: true,
	collection: true,
	size: 1,
	template: {
		id: function() {
			return id_aux++;
		},
		result: function(params, query, data) {
			return list_games(query.size);
		},
		page: function(params, query, data) {
			return parseInt(query.page) || 1;
		},
		size: function(params, query, data) {
			return parseInt(query.size) || undefined;
		},
		total: total_games
	}
};

module.exports = [games, my_games, game_detailed, game_related, search];