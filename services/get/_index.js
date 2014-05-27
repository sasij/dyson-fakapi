// var url_base = "https://api-pre.genexies.net/v2/portals/personal_android";
var url_base = "https://api.pre.musica.personal.com.ar/v2/portals/personal_android"

var index = {
	path: '/',
	render: function(req, res) {

		var html = '<h1>FakAPI</h1><p>Click on the next links to test it:</p>';

		var examples = [
			'/v2/portals/personal_juegos_android/categories',
			'/v2/portals/personal_juegos_android/sections',
			'/v2/portals/personal_juegos_android/lists/2/games-android?page=1&size=3',
			'/v2/portals/personal_juegos_android/lists/27;5;6/games-android?page=1&size=3',
			'/v2/portals/personal_juegos_android/games-android/3',
			'/v2/portals/personal_juegos_android/games-android/3/related/games-android?size=2',
			'/v2/portals/personal_juegos_android/games-android/3/valuation/',
			'/v2/portals/personal_juegos_android/games-android/purchases?token=2&page=1&size=3',
			'/v2/portals/personal_juegos_android/games_android/providers',
			'/v2/portals/personal_juegos_android/games_android/promos',
			'/v2/portals/personal_juegos_android/games_android/promos/5/keyword',
			'/v2/portals/personal_juegos_android/highlights/mdpi',
			'/v2/portals/personal_juegos_android/providers/5/highlights/hdpi',
			'/v2/portals/personal_juegos_android/licenses/4',
			'/v2/portals/personal_juegos_android/licenses',
			'/v2/portals/personal_juegos_android/searches/games-android?query=futbol&size=5&page=1',
			'/v2/portals/personal_juegos_android/legal/terms',
			'/v2/portals/personal_juegos_android/webssoauthentication/sessions/95190bbb-1ceb-3ae5-919f-077d7fbb3bae',
			'/v2/portals/personal_juegos_android/webssoauthentication/sessions?uuid=95190bbb-1ceb-3ae5-919f-077d7fbb3bae&line=1168631020&pin=1379',
			'/v2/portals/personal_juegos_android/configuration',
			'/v2/portals/personal_juegos_android/authentication/sessions/delete?token=23c10c8ccf755bd1e239cae7026155fa',
			'/v2/portals/personal_juegos_android/sample_images/'


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
	path: '/v2/portals/personal_juegos_android/configuration',

	render: function(req, res) {
		res.redirect(url_base + '/configuration');
	}
};

var authentication = {
	//UUID:: 95190bbb-1ceb-3ae5-919f-077d7fbb3bae 
	path: '/v2/portals/personal_juegos_android/webssoauthentication/sessions/:UUID',

	render: function(req, res) {
		res.redirect(url_base + '/webssoauthentication/sessions/' + req.params['UUID']);
	}
};

var logout = {
	//23c10c8ccf755bd1e239cae7026155fa
	path: '/v2/portals/personal_juegos_android/authentication/sessions/delete?',
	render: function(req, res) {
		res.redirect('https://api.pre.musica.personal.com.ar/v2/portals/personal_android_juegos/authentication/sessions/delete?token=' + req.query.token);
	}
};

var webssoauthentication = {
	//'/v2/portals/personal_juegos_android/webssoauthentication/sessions?uuid=95190bbb-1ceb-3ae5-919f-077d7fbb3bae&line=1168631020&pin=1379
	path: '/v2/portals/personal_juegos_android/webssoauthentication/sessions?',

	render: function(req, res) {
		res.redirect(url_base + '/webssoauthentication/sessions?uuid=' + req.query['uuid'] + '&line=' + req.query['line'] + '&pin=' + req.query['pin']);
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
		res.json({
			result:"OK"
		});
		//res.redirect(url_base + '/legal/terms/acceptances?token=' + req.query.token);
	}
};

module.exports = [index, configuration, webssoauthentication, logout, authentication, help,
	legal_term, legal_term_acceptances
];


