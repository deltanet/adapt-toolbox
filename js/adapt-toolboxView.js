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

            this.listenTo(Adapt, 'device:changed', this.reRender, this);
            
            var data = this.collection.toJSON();
            var template = Handlebars.templates['toolbox'];
            this.$el.html(template({
                toolbox:data
            }));
        },

        reRender: function() {
            if (Adapt.device.screenSize === 'large') {
                $('.toolbox-inner').css('display','block');
                if(Adapt.course.get('_toolbox')._hideDrawerIcon) {
                    $('.drawer-back').css('display','none');
                    $('.navigation-drawer-toggle-button').css('display','none');
                }
            } else {
                $('.toolbox-inner').css('display','none');
                $('.drawer-back').css('display','block');
                $('.navigation-drawer-toggle-button').css('display','block');
            }
        },

        onItemClicked: function(event) {

            var $item = $(event.currentTarget);
            var itemModel = this.model.get('_items')[$item.index()];

            Adapt.trigger(itemModel._trigger);

        }

    });

    return ToolboxView;

});