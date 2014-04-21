//providers
var bogan = require('boganipsum');
var generator = require('dyson-generators');
var random_name = require('random-name');
var functions = require('../functions');
var id_aux = 0; //fake id

var provider = {
	path: '/v2/portals/personal_juegos_android/provider/:id',
	template: {
		id: function(params) {
			return (params.id || id_aux++);
		},
		name: generator.name,
		image: "http://lorempixel.com/200/200/" + functions.type_image() + "/" + id_aux++,
		tag: function() {
			return parseInt(Math.random() * (15000) + 10000) + "";
		},
		subscription: {
			id: function() {
				return id_aux++;
			},
			image: "http://lorempixel.com/200/200/" + functions.type_image() + "/" + id_aux++,
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
				value: function() {
					return parseFloat((Math.random() * (11.99 - 0.99) + 0.99).toFixed(2));
				},
				currency: "ARG"
			},
			status: function() {
				return ((Math.floor(Math.random() * 10) + 1) % 2) == 0 ? 0 : 1;
			}
		}

	}
};

var providers = {
	path: '/v2/portals/personal_juegos_android/providers',
	collection: true,
	cache: true,
	size: function() {
		return Math.floor(Math.random() * 6) + 5;
	},
	template: provider.template
};

module.exports = [provider, providers];