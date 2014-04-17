(function (Calc) {
  Calc.Router.map(function () {
    this.resource('stats', { path: '/' });
  });

  Calc.StatsRoute = Ember.Route.extend({
  	model: function () {
      return this.store.find('character', 1);
  	}
  });
})(window.Calc);
