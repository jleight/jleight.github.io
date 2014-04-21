Ember.Handlebars.helper('locale', function (number) {
  return number.toLocaleString();
});

(function (Calc) {
  Calc.ApplicationAdapter = DS.FixtureAdapter.extend();

  document.styleSheets[1].disabled = true;
  $('body').on('click', '#style-toggle', function () {
    $.each(document.styleSheets, function (i, e) {
      e.disabled = !e.disabled;
    });
    return false;
  });

  $('body').popover({
    html: true,
    selector: 'i[data-help-image]',
    trigger: 'hover',
    title: 'Stat Location',
    placement: function (p, e) {
      return 'right';
    },
    content: function () {
      return '<img src="' + $(this).data('helpImage') + '" />';
    }
  });
})(window.Calc || (window.Calc = Ember.Application.create()));