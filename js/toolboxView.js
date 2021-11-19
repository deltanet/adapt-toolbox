import Adapt from 'core/js/adapt';

export default class ToolboxView extends Backbone.View {

  className() {
    return 'toolbox';
  }

  events() {
    return {
      'click .js-toolbox-item-click': 'onItemClicked'
    };
  }

  initialize() {
    this.render();
    this.setupListeners();
  }

  render() {
    let data = this.collection.toJSON();
    data = this.applyIconOrder(data);

    const template = Handlebars.templates['toolbox'];
    this.$el.html(template({toolbox: data}));

    this.updateLayout();
  }

  setupListeners() {
    this.listenTo(Adapt.config, 'change:_activeLanguage', this.remove);
    this.listenTo(Adapt, 'device:changed', this.updateLayout);
  }

  applyIconOrder(data) {
    if (data.length == 0) return;

    return data.sort((obj1, obj2) => obj2._iconOrder - obj1._iconOrder);
  }

  updateLayout() {
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
  }

  onItemClicked(event) {
    const $item = $(event.currentTarget);
    const items = this.applyIconOrder(this.model.get('_items'));
    const itemModel = items[$item.index()];
    const trigger = itemModel._triggerOption;
    const customTrigger = itemModel._trigger;

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
}
