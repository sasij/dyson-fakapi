var url_base = "https://api-pre.genexies.net/v2/portals/personal_android";

var index = {
	path: '/',
	render: function(req, res) {

		var html = '<h1>FakAPI</h1><p>Click on the next links to test it:</p>';

		var examples = [
			'/v2/portals/personal_juegos_android/categories',
			'/v2/portals/personal_juegos_android/sections',
			'/v2/portals/personal_juegos_android/lists/2/games-android?page=1&size=3',
			'/v2/portals/personal_juegos_android/lists/2;5;6/games-android?page=1&size=3',
			'/v2/portals/personal_juegos_android/games-android/3',
			'/v2/portals/personal_juegos_android/games-android/3/related/games-android?size=2',
			'/v2/portals/personal_juegos_android/games-android/purchases?token=2&page=1&size=3',
			'/v2/portals/personal_juegos_android/providers',
			'/v2/portals/personal_juegos_android/highlights/mdpi',
			'/v2/portals/personal_juegos_android/providers/5/highlights/hdpi',
			'/v2/portals/personal_juegos_android/licenses/4',
			'/v2/portals/personal_juegos_android/licenses',
			'/v2/portals/personal_juegos_android/search?query=futbol&size=5&page=1'
		];

		html += '<ul>' + examples.map(function(example) {
			return '<li><a href="' + example + '">' + example + '</a></li>';
		}).join('') + '</ul>';

		res.send(200, html);
	}
};

/**
 *  Redirections
 */

var configuration = {
	path: '/v2/portals/personal_juegos_android/configuration/',

	render: function(req, res) {
		res.redirect(url_base + '/configuration');
	}
};

var authentication = {
	path: '/v2/portals/personal_juegos_android/webssoauthentication/sessions/:UUID',

	render: function(req, res) {
		res.redirect(url_base + '/webssoauthentication/sessions/' + req.query('UUID'));
	}
};

var help = {
	path: '/v2/portals/personal_juegos_android/help',

	render: function(req, res) {
		res.redirect(url_base + '/help');
	}
};

var legal_term = {
	path: '/v2/portals/personal_juegos_android/legal/terms',

	render: function(req, res) {
		res.redirect(url_base + '/legal/terms');
	}
};

var legal_term_acceptances = {
	path: '/v2/portals/personal_juegos_android/legal/terms/acceptances?',

	render: function(req, res) {
		res.redirect(url_base + '/legal/terms/acceptances?token='+req.query('token'));
	}
};

module.exports = [index, configuration, authentication, help, 
				legal_term, legal_term_acceptances];