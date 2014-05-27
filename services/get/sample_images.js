//sample_images.js

var generator = require('dyson-generators');

var id_aux = 0;

var sample_images = {
	path: '/v2/portals/personal_juegos_android/sample_images/',
	collection: true,
	cache: true,
	size: 5,
	template: {

		width: function() {
			if (id_aux === 3) {
				return 200;
			} else {
				return 400;
			}
		},
		height: function() {
			if (id_aux === 3) {
				return 400;
			} else {
				return 200;
			}
		},
		imageUrl: function() {
			if (id_aux === 3) {
				return "http://lorempixel.com/200/400/sports/" + id_aux++
			} else {
				return "http://lorempixel.com/400/200/sports/" + id_aux++;
			}
		}
	}
}


module.exports = [sample_images];