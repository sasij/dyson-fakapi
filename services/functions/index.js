//
//
//Module with auxiliar functions
//
//


exports.random_purchase = function() {
	return ((Math.floor(Math.random() * 10) + 1) % 2) == 0 ? true : false;
};
exports.random_rating = function() {
	return parseFloat((Math.random() * (5.0 - 0.5) + 0.5).toFixed(1));
};
exports.random_price = function() {
	return parseFloat((Math.random() * (11.99 - 0.99) + 0.99).toFixed(2));
};

exports.random_big_number = function() {
	return parseInt(Math.random() * (15000) + 10000);
};

exports.random_number = function() {
	return parseInt(Math.random() * (1000) + 10);
};

exports.random_status = function() {
	return ((Math.floor(Math.random() * 10) + 1) % 2) == 0 ? 0 : 1;
};

exports.type_image = function() {
	var image_type_array = ["abstract", "animals", "business", "cats", "city", "food", "nightlife",
		"fashion", "people", "nature", "sports", "technics", "transport"
	];
	var position = Math.floor(Math.random() * 12) + 1
	console.log("random position:::" + position + " value::" + image_type_array[position]);
	return image_type_array[position];
};
