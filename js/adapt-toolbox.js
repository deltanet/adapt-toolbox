define([
    'core/js/adapt',
    './toolboxView'
], function(Adapt, ToolboxView) {

    var Toolbox = _.extend({

        initialize: function() {
            this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
        },

        onAppDataReady: function() {
            this.listenTo(Adapt.config, 'change:_activeLanguage', this.onLangChange);

            if (!Adapt.course.get('_toolbox')) return;

            if (Adapt.course.get('_toolbox')._isEnabled){
                this.setupToolbox();
                this.setupListeners();
            }
        },

        onLangChange: function() {
            this.removeListeners();
            this.listenToOnce(Adapt, 'app:dataReady', this.onAppDataReady);
        },

        setupToolbox: function() {
            this.config = Adapt.course.get('_toolbox');

            this.model = new Backbone.Model(this.config);
            this.collection = new Backbone.Collection(this.config._items);
        },

        setupListeners: function() {
            this.listenTo(Adapt, 'navigationView:postRender', this.renderNavigationView);
        },

        removeListeners: function() {
            this.stopListening(Adapt, 'navigationView:postRender', this.renderNavigationView);
            this.stopListening(Adapt.config, 'change:_activeLanguage', this.onLangChange);
        },

        renderNavigationView: function(navigationView) {
            navigationView.$('.navigation-drawer-toggle-button').after(new ToolboxView({
                model: this.model,
                collection: this.collection
            }).$el);
        }

    }, Backbone.Events);

    Toolbox.initialize();

    return Toolbox;

});
