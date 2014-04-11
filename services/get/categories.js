
//categories

var generator = require('dyson-generators');
var id_aux = 0;//fake id
var pages = 1;

var category = {
	path:'/v2/portals/personal_juegos_android/category/:id?',
	template:{
		tag:function(params) {
            return (params.id || id_aux++)+"";
        },
		name: generator.name,
		imageUrl: "http://lorempixel.com/200/200/"
	}
};

var categories = {
	path:'/v2/portals/personal_juegos_android/categories',
	collection: true,
	cache: true,
	size: function() {
		return Math.floor(Math.random() * 6) + 5;
	},
	template: category.template
	// container: {
		
	// 	items: function(params, query, data) {
	// 		return data;
	// 	},
	// 	page: pages,
	// 	size: function(params, query, data) {
	// 		return data.length;
	// 	},
	// 	total: function(params, query, data){
	// 		return pages * data.length;
	// 	}
	// }
};


module.exports = [category, categories];