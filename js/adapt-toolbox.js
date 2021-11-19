import Adapt from 'core/js/adapt';
import ToolboxView from './toolboxView';

class Toolbox extends Backbone.Controller {

  initialize() {
    this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
  }

  onAppDataReady() {
    this.listenTo(Adapt.config, 'change:_activeLanguage', this.onLangChange);

    if (!Adapt.course.get('_toolbox')) return;

    if (!Adapt.course.get('_toolbox')._isEnabled) return;

    this.setupToolbox();
    this.setupListeners();
  }

  onLangChange() {
    this.removeListeners();
    this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
  }

  setupToolbox() {
    this.config = Adapt.course.get('_toolbox');

    this.model = new Backbone.Model(this.config);
    this.collection = new Backbone.Collection(this.config._items);
  }

  setupListeners() {
    this.listenTo(Adapt, 'navigationView:postRender', this.renderNavigationView);
  }

  removeListeners() {
    this.stopListening(Adapt, 'navigationView:postRender', this.renderNavigationView);
    this.stopListening(Adapt.config, 'change:_activeLanguage', this.onLangChange);
  }

  renderNavigationView() {
    $('.nav__drawer-btn').after(new ToolboxView({
      model: this.model,
      collection: this.collection
    }).$el);
  }
}

export default Adapt.toolbox = new Toolbox();
