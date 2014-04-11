//licenses

var generator = require('dyson-generators');
var random_name = require('random-name');
var bogan = require('boganipsum');

var id_aux = 0;//fake id

var license = {
	path:'/v2/portals/personal_juegos_android/licenses/:id',
	template:{
		id:function(params) {
            return (params.id || id_aux++)+"";
        },
		name: generator.name,
		license: function(){
			var position = Math.floor((Math.random()*10)+1);
			return bogan({ paragraphs: position });
		}
	}
};

var licenses = {
	path:'/v2/portals/personal_juegos_android/licenses',
	collection: true,
	cache: true,
	size: function() {
		return Math.floor((Math.random()*10)+5);
	},
	template: license.template
};

module.exports = [license, licenses];