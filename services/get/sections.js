//sections

var generator = require('dyson-generators');

var id_aux = 0;

var sections = {
	path: '/v2/portals/personal_juegos_android/sections',
	collection: true,
	cache: true,
	size: 4,
	template: {

		
		name: function() {
			if (id_aux == 0) {
				return "home_categories";
			} else if (id_aux == 1) {
				return "home_novelties";
			} else if (id_aux == 2) {
				return "home_clubs";
			} else if (id_aux == 3) {
				return "home_tops";
			}
		},
		tags: function() {
			if (id_aux == 0) {
				var tags = [];
				tags.push("1268");
				return tags;
			} else if (id_aux == 1) {
				var tags = [];
				tags.push("1298");
				return tags
			} else if (id_aux == 2) {
				var tags = [];
				tags.push("1256");
				return tags
			} else if (id_aux == 3) {
				var tags = [];
				tags.push("1128");
				tags.push("1129");
				tags.push("1130");
				return tags;
			}
		},
		position: function(){
			return id_aux++;
		}
	}
}

module.exports = [sections];