define(function(require) {

    var Adapt = require('coreJS/adapt');
    var Backbone = require('backbone');
    var ToolboxView = require('extensions/adapt-toolbox/js/adapt-toolboxView');

    function setupToolbox(toolboxModel, toolboxItems) {

        var toolboxCollection = new Backbone.Collection(toolboxItems);
        var toolboxModel = new Backbone.Model(toolboxModel);

        Adapt.on('navigationView:postRender', function(navigationView) {
            navigationView.$('.navigation-drawer-toggle-button').after(new ToolboxView({
                model: toolboxModel,
                collection: toolboxCollection
            }).$el);

            // Set layout based on device size
            if (Adapt.device.screenSize === 'large') {
                $('.toolbox-inner').css('display','block');
                if(Adapt.course.get('_toolbox')._hideDrawerIcon) {
                    $('.drawer-back').css('display','none');
                    $('.navigation-drawer-toggle-button').css('display','none');
                }
            }
            if (Adapt.device.screenSize != 'large') {
                if (Adapt.course.get('_toolbox')._disableOnMobile) {
                    $('.toolbox-inner').css('display','none');
                    $('.drawer-back').css('display','block');
                    $('.navigation-drawer-toggle-button').css('display','block');
                } else {
                    $('.toolbox-inner').css('display','block');
                    if(Adapt.course.get('_toolbox')._hideDrawerIcon) {
                        $('.drawer-back').css('display','none');
                        $('.navigation-drawer-toggle-button').css('display','none');
                    }
                }
            }

        });
    
    }

    Adapt.once('app:dataReady', function() {

        if(Adapt.course.get('_toolbox')._isEnabled){
            var courseToolbox = Adapt.course.get('_toolbox');
            setupToolbox(courseToolbox, courseToolbox._items);
        }

    });

});