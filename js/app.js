define(["jquery", "underscore", "backbone", "marionette"], function($, _, Backbone, Marionette) {
	var App = new Marionette.Application();

	App.addRegions({
		headerRegion: "#header-region",
		mainRegion: "#main-region"
	});

	App.Controller = Backbone.Marionette.Controller.extend({
		services1: function() {
			console.log('in services 1');
		},
		services2: function() {
			console.log('in services 2');
		}
	});

	App.appRouter = new Backbone.Marionette.AppRouter({
		controller: new App.Controller(),
		appRoutes: {
			'services1': 'services1',
			'services2': 'services2'
		}
	});


	App.on("initialize:after", function() {
		if (Backbone.history) {
			require(["HeaderModule/app"], function(HeaderApp) {
				Backbone.history.start();

				HeaderApp.start({
					menuUrl: 'http://127.0.0.1',
					dev: true
				});
				
			});
		}
	});

	return App;
});