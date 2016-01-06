(function(app) {
  app.AppComponent = ng.core
    .Component({
      selector: 'my-app',
      templateUrl: 'app/app.component.html',
      directives: [app.HighlightDirective]
    })
    .Class({
      constructor: function() {
      }
    });
})(window.app || (window.app = {}));