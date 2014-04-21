(function (Calc) {
  Calc.Router.map(function () {
    this.resource('stats', { path: '/' });
    this.resource('calculation', { path: '/calculation' });
  });

  Calc.StatsRoute = Ember.Route.extend({
    model: function () {
      return this.store.find('character', 1);
    }
  });
  Calc.CalculationRoute = Ember.Route.extend({
  });
})(window.Calc);
