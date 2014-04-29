/*global define */
define(['backbone', 'marionette', 'models/BaseModel'], function(Backbone, Marionette, BaseModel) {
	return BaseModel.extend({
		initialize: function(options) {
			BaseModel.prototype.initialize.call(this, options);

			var selectable = new Backbone.Picky.Selectable(this);
			_.extend(this, selectable);
		},
		defaults: {
			uri: '',
			name: ''
		}
	});
});