//subscription

var functions = require('../functions');
var bogan = require('boganipsum');
var generator = require('dyson-generators');
var functions = require('../functions');
var id_aux = 0;
var pages = 1;

var subscription = {
	path: '/v2/portals/personal_juegos_android/games_android/promos/:id',
	template: {
		id: function(params) {
			return (params.id || id_aux++);
		},
		name: generator.name,
		image: function() {
			return "http://lorempixel.com/200/200/sports/" + id_aux;
		},
		shortDescription: generator.name,
		longDescription: "subscription semanal al club de juegos Wazzup por sólo $7,49",
		price: {
				"value": functions.random_price(),
				"currency": "ARG",
				"promoId": functions.random_number()
			},
		userStatus:{
			"userStatus":functions.random_number(),
			"promoAction":functions.random_number(),
			"creditsAvailable": functions.random_number()
		}
	}
};

var subscriptions = {

	path: '/v2/portals/personal_juegos_android/games_android/promos',
	collection: true,
	cache: true,
	size: function(){
		return Math.floor(Math.random() * 6) + 5;
	},
	template: subscription.template
};

var cancel_subcription = {

	path: '/v2/portals/personal_juegos_android/games_android/promos/:id/keyword',
	template: {
		keyword: function() {
			return "bajaclubea";
		}
	}
};


module.exports = [subscription, subscriptions, cancel_subcription];