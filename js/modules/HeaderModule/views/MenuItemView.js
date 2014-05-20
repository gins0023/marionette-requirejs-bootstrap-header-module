/*global define */
define(["backbone", "marionette", "HeaderModule/app", "tpl!HeaderModule/templates/menuItemTemplate.html"], function(Backbone, Marionette, HeaderApp, menuItemTemplate) {
	var MenuView = Backbone.Marionette.ItemView.extend({
		template: menuItemTemplate,
		tagName: "li",
		events: {
			"click a": "navigate"
		},
		navigate: function(e) {
			var navigate = this.model.get("navigate");

			if (navigate !== undefined && navigate === false) {
				e.preventDefault();
			}

			this.trigger("navigate", this.model);
		},
		/**
		 * Set active header for currently selected model.
		 * In the case of sub-nav, also set top level header
		 * to active.
		 */
		onRender: function() {
			if (this.model.selected) {
				this.$el.addClass("active");
			}
		}
	});

	return MenuView;
});
