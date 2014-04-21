define(["backbone", "marionette", "HeaderModule/app", "HeaderModule/views/MenuItemView", "tpl!HeaderModule/templates/menuTemplate.html", "tpl!HeaderModule/templates/dropdownItemTemplate.html"], function(Backbone, Marionette, HeaderApp, MenuItemView, menuTemplate, dropdownItemTemplate) {
	var MenuView = Backbone.Marionette.CompositeView.extend({
		template: menuTemplate,
		itemView: MenuItemView,
		itemViewContainer: null,
		initialize: function(options) {
			this.className = options.className !== undefined ? options.className : "navbar navbar-inverse navbar-fixed-top";
		},
		/**
		 * Override appendHtml to have different itemViewContainers.
		 * This allows for left/right placement as well as sub-nav.
		 * 
		 * @param  {object} collectionView
		 * @param  {object} itemView       
		 * @param  {int} index          
		 */
		appendHtml: function(collectionView, itemView, index) {
			var left = $(this.el).find(".navbar-left"),
				right = $(this.el).find(".navbar-right"),
				current = itemView.model.get("location") !== undefined && itemView.model.get("location") === "right" ? right : left;
				
			if (itemView.model.get("root") !== undefined) {
				var root = itemView.model.get("root").toLowerCase().replace("/ /g", "-"),
					el = current.find("#menu-group-"+root);

				if (el.length === 0) {
					current = current.append(dropdownItemTemplate(itemView.model.toJSON())).find("ul");
				} else {
					current = el.find('ul');
				}
			}

			current.append(itemView.el);
		}
	});

	return MenuView;
});
