define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');

    var ToolboxView = Backbone.View.extend({

        className: 'toolbox',

        initialize: function(options) {
            this.render();
        },

        events: {
            'click .toolbox-button': 'onItemClicked'
        },

        render: function(setScore) {
            var data = this.collection.toJSON();
            var template = Handlebars.templates['toolbox'];
            this.$el.html(template({
                toolbox:data
            }));
        },

        onItemClicked: function(event) {

            var $item = $(event.currentTarget);
            var itemModel = this.model.get('_items')[$item.index()];

            Adapt.trigger(itemModel._trigger);

        }

    });

    return ToolboxView;

});