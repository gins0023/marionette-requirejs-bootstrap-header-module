require.config({
    baseUrl: 'lib/',
	paths: {
		jquery: 'jquery-min',
		underscore: 'underscore-min',
		backbone: 'backbone-min',
		marionette: 'backbone.marionette-min',
		"backbone.picky": 'backbone.picky-min',
		bootstrap: 'bootstrap/js/bootstrap.min',
		tpl: 'tpl',
		app: '../js/app',
		config: '../js/config',
		collections: '../js/collections',
		models: '../js/models',
		stubs: '../js/stubs',
		AuthenticationModule: '../js/modules/AuthenticationModule',
		HeaderModule: '../js/modules/HeaderModule'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: ['jquery', 'underscore'],
			exports: 'Backbone'
		},
		marionette: {
			deps: ['jquery', 'backbone'],
			exports: 'Marionette'
		},
		bootstrap: {
			deps: ['jquery']
		}
	}
});


define([
	'jquery',
	'underscore',
	'backbone',
	'marionette',
	'bootstrap',
	'app',
	'config'
	], function($, _, Backbone, Marionette, Bootstrap, App, Config) {
		App.Config = Config;
		App.start();
});

