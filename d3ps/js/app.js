(function (Calc) {
  Calc.ApplicationAdapter = DS.FixtureAdapter.extend();

  document.styleSheets[1].disabled = true;
  $('body').on('click', '#style-toggle', function () {
    $.each(document.styleSheets, function (i, e) {
      e.disabled = !e.disabled;
    });
    return false;
  });
})(window.Calc || (window.Calc = Ember.Application.create()));