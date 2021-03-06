/*global define */
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
				modelRoot = itemView.model.get("root"),
				location = itemView.model.get("location"),
				current = location !== undefined && location === "right" ? right : left;

			if (index === 0) {
				left.html('');
				right.html('');
			}
				
			if (modelRoot !== undefined && modelRoot !== null) {
				var root = modelRoot.toLowerCase().replace(/\s+/g, "-"),
					el = current.find("#menu-group-"+root),
					data = itemView.model.toJSON();

				data.rootNoSpaces = root;

				if (el.length === 0) {
					current = current.append(dropdownItemTemplate(data)).find("ul:last");
				} else {
					current = el.find('ul');
				}
			}

			current.append(itemView.el);

			if (itemView.model.selected && modelRoot !== undefined && modelRoot !== null) {
				current.parent().addClass('active');
			}
		}	
	});

	return MenuView;
});
