define(['backbone', 'marionette', 'app'], function(Backbone, Marionette, App) {
	return Backbone.Collection.extend({
		initialize: function(options) {},
		
		/**
		 * Override collection fetch to provide stub data
		 * @param  options 
		 */
		fetch: function(options) {
			options = options || {};

			var useStubData = App.Config.USE_STUB_DATA || false,
				stubPath = App.Config.STUB_PATH || false,
				stubFilename = this.constructor.stubFilename || false;


			if (useStubData !== false && stubPath !== false && stubFilename !== false) {
				var collection = this;

				var xhr = $.ajax({
					type: "GET",
					dataType: "json",
					url: stubPath + '/collections/' + stubFilename + '.json',
					success: function(data) {
						collection.reset(data);
					}
				});
				
				return xhr;
			}

			return Backbone.Collection.prototype.fetch.call(this, options);


		}
	});
});