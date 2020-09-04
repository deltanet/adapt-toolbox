define([
  'core/js/adapt'
], function (Adapt) {

  var ToolboxView = Backbone.View.extend({

    className: 'toolbox',

    events: {
      'click .js-toolbox-item-click': 'onItemClicked'
    },

    initialize: function () {
      this.render();
      this.setupListeners();
    },

    render: function () {
      var data = this.collection.toJSON();
      data = this.applyIconOrder(data);

      var template = Handlebars.templates['toolbox'];
      this.$el.html(template({toolbox: data}));

      this.updateLayout();
    },

    setupListeners: function () {
      this.listenTo(Adapt.config, 'change:_activeLanguage', this.remove);
      this.listenTo(Adapt, 'device:changed', this.updateLayout);
    },

    applyIconOrder: function (data) {
      if (data.length == 0) return;
      if (!data[0]._iconOrder) return data;

      return data.sort(function (obj1, obj2) {
        return obj2._iconOrder - obj1._iconOrder;
      });
    },

    updateLayout: function () {
      if (Adapt.device.screenSize === 'large') {
        this.$('.toolbox__inner').css('display', 'block');

        if (Adapt.course.get('_toolbox')._hideDrawerIcon) {
          $('.drawer__back-btn').css('display', 'none');
          $('.nav__drawer-btn').css('display', 'none');
        }
      }

      if (Adapt.device.screenSize != 'large') {
        if (Adapt.course.get('_toolbox')._disableOnMobile) {
          this.$('.toolbox__inner').css('display', 'none');
          $('.drawer__back-btn').css('display', 'block');
          $('.nav__drawer-btn').css('display', 'block');
        } else {
          this.$('.toolbox__inner').css('display', 'block');
          if (Adapt.course.get('_toolbox')._hideDrawerIcon) {
            $('.drawer__back-btn').css('display', 'none');
            $('.nav__drawer-btn').css('display', 'none');
          }
        }
      }
    },

    onItemClicked: function (event) {
      var $item = $(event.currentTarget);
      var items = this.applyIconOrder(this.model.get('_items'));
      var itemModel = items[$item.index()];
      var trigger = itemModel._triggerOption;
      var customTrigger = itemModel._trigger;

      // Check for triggerOption
      if (!customTrigger == '') {
        Adapt.trigger(customTrigger);
      } else {
        switch (trigger) {
          case 'Show Help':
            Adapt.trigger('help:showHelp');
            break;
          case 'Show Resources':
            Adapt.trigger('resources:showResources');
            break;
          case 'Show Search':
            Adapt.trigger('resources:showSearch');
            break;
          case 'Show Glossary':
            Adapt.trigger('glossary:showGlossary');
            break;
        }
      }
    }

  });

  return ToolboxView;

});
