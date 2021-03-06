/*global define */
define(['backbone', 'marionette', 'HeaderModule/collections/BaseCollection', 'HeaderModule/models/HeaderModel', 'backbone.picky'], function(Backbone, Marionette, BaseCollection, HeaderModel) {

	return BaseCollection.extend({
		model: HeaderModel,
		initialize: function(models, options) {
			BaseCollection.prototype.initialize.call(this, options);
			this.url = options.url !== undefined ? options.url : '';


			var singleSelect = new Backbone.Picky.SingleSelect(this);
			_.extend(this, singleSelect);
		}
	}, {
		stubFilename: 'HeaderCollection'
	});
});
