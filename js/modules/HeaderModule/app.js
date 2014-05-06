/*global define */
define(["jquery", "backbone", "marionette", "app", "HeaderModule/collections/HeaderCollection"], function($, Backbone, Marionette, App, Collection) {
	return App.module("Header", function(Header, App, data) {
		/**
		 * Start With Default Header Variables
		 */
		_.extend(Header, {
			startWithParent: false,
			appRegion: 'headerRegion',
			activeHeaderModel: null,
			Config: {
				USE_STUB_DATA: false,
				STUB_PATH: "js/modules/HeaderModule/stubs"
			}
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
						 * Remove active class on all dropdowns
						 */
						$(".nav > .dropdown").removeClass("active");
						
						/**
						 * Mark current model in collection as selected
						 */
						model.select();
						model.collection.trigger('reset');

						/**
						 * Wait until header refreshed to trigger events
						 */
						Header.controller.triggerEvents(model);
					}, this);

					App.trigger('header:loaded'); //signal header loaded
				});
			},
			/**
			 * Useful function to manually set which header is active
			 */
			setActiveHeader: function(uri) {
				var headerToSelect = Header.collection.find(function(header) {
					return header.get('uri') === uri;
				});

				if (headerToSelect !== undefined) {
					this.triggerEvents(headerToSelect);
					headerToSelect.select();
					headerToSelect.collection.trigger("reset");
				}

			},
			triggerEvents: function(model) {
				//Don't fire event if same nav element clicked
				if (this.activeHeaderModel !== null && this.activeHeaderModel === model) {
					return;
				}

				/**
				 * Trigger any custom events and send default event
				 * from the uri with navigate: as prefix
				 */
				if (model.get('navigationTrigger') !== undefined) {
					App.trigger(model.get('navigationTrigger'));
				}
				App.trigger('navigate:'+ model.get('uri'));
				App.trigger('navigate:navigate', model);

				this.activeHeaderModel = model;
			}
		});

		/**
		 * Create collection with menu url from app 
		 */
		Header.addInitializer(function(options) {
			_.extend(this, options);

			if (this.dev !== undefined && this.dev === true) this.Config.USE_STUB_DATA = true;
			
			this.collection = new Collection([], {
				url: this.menuUrl
			});
			this.controller = new Header.Controller();
		});

		/**
		 * List headers when module is started 
		 * and menu items loaded.
		 */
		Header.on("start", function() {
			$.when(Header.collection.fetch()).then(function() {
				Header.controller.listHeader();
				Header.controller.setActiveHeader(Backbone.history.fragment);
			});
			
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
