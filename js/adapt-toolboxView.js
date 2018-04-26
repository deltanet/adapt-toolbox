define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');

  var ToolboxView = Backbone.View.extend({

    className: 'toolbox',

    initialize: function() {
      this.render();
    },

    events: {
      'click .toolbox-button': 'onItemClicked'
    },

    render: function() {

      this.listenTo(Adapt, 'device:changed', this.reRender, this);

      var data = this.collection.toJSON();
      data = this.applyIconOrder(data);
      var template = Handlebars.templates['toolbox'];
      this.$el.html(template({toolbox: data}));
    },

    applyIconOrder: function(data) {
      if (!data[0]._iconOrder) return data;
      return data.sort(function(obj1, obj2) {
        return obj2._iconOrder - obj1._iconOrder;
      });
    },

    reRender: function() {
      if (Adapt.device.screenSize === 'large') {
        $('.toolbox-inner').css('display', 'block');
        if (Adapt.course.get('_toolbox')._hideDrawerIcon) {
          $('.drawer-back').css('display', 'none');
          $('.navigation-drawer-toggle-button').css('display', 'none');
        }
      }
      if (Adapt.device.screenSize != 'large') {
        if (Adapt.course.get('_toolbox')._disableOnMobile) {
          $('.toolbox-inner').css('display', 'none');
          $('.drawer-back').css('display', 'block');
          $('.navigation-drawer-toggle-button').css('display', 'block');
        } else {
          $('.toolbox-inner').css('display', 'block');
          if (Adapt.course.get('_toolbox')._hideDrawerIcon) {
            $('.drawer-back').css('display', 'none');
            $('.navigation-drawer-toggle-button').css('display', 'none');
          }
        }
      }
    },

    onItemClicked: function(event) {

      var $item = $(event.currentTarget);
      var items = this.applyIconOrder(this.model.get('_items'));
      var itemModel = items[$item.index()];
      var trigger = itemModel._triggerOption;
      var customTrigger = itemModel._trigger;

      // Check for triggerOption
      if (!customTrigger == "") {
        Adapt.trigger(customTrigger);
      } else {
        switch (trigger) {
          case "Show Help":
            Adapt.trigger("help:showHelp");
            break;
          case "Show Resources":
            Adapt.trigger("resources:showResources");
            break;
          case "Show Search":
            Adapt.trigger("resources:showSearch");
            break;
          case "Show Glossary":
            Adapt.trigger("glossary:showGlossary");
            break;
        }
      }
    }

  });

  return ToolboxView;

});
