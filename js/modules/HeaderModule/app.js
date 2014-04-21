define(["jquery", "backbone", "marionette", "app", "HeaderModule/collections/HeaderCollection"], function($, Backbone, Marionette, App, Collection) {
	return App.module("Header", function(Header, App) {
		/**
		 * Start With Default Header Variables
		 */
		_.extend(Header, {
			startWithParent: false,
			appRegion: 'headerRegion',
		});

		Header.navigate = function(route, options) {
			options = options || {};
			Backbone.history.navigate(route, options);
		};

		Header.Controller = Backbone.Marionette.Controller.extend({
			initialize: function() {},
			listHeader: function() {
				require(["HeaderModule/views/MenuView"], function(MenuView) {
					var headers = new MenuView({collection: Header.collection});
					App[Header.appRegion].show(headers);

					headers.on("itemview:navigate", function(childView, model) {
						/**
						 * Trigger any custom events and send default event
						 * from the uri with navigate: as prefix
						 */
						if (model.get('navigationTrigger') !== undefined) {
							App.trigger(model.get('navigationTrigger'));
						}
						App.trigger('navigate:'+ model.get('uri'));

						/**
						 * Remove active class on all dropdowns
						 */
						$(".nav > .dropdown").removeClass("active");
						
						/**
						 * Mark current model in collection as selected
						 */
						model.select();
						model.collection.trigger("reset");
					});

				});
			},
			/**
			 * Useful function to manually set which header is active
			 */
			setActiveHeader: function(uri) {
				var headerToSelect = Header.collection.find(function(header) {
					return header.get('uri') === uri;
				});

				headerToSelect.select();
				Header.collection.trigger("reset");
			}
		});

		/**
		 * Grab Menu Items 
		 */
		Header.addInitializer(function() {
			this.collection = new Collection();
			this.controller = new Header.Controller();
			this.collection.fetch();
		});

		/**
		 * List headers when module is started.
		 */
		Header.on("start", function() {
			Header.controller.listHeader();
		});

		/**
		 * Manually set navigation menu item as active
		 * by passing in the relevant uri string.
		 * 
		 * @param  {string} url 
		 */
		App.commands.setHandler("set:active:header", function(uri) {
			Header.controller.setActiveHeader(uri);
		});



	});
});