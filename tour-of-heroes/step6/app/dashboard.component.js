(function(app) {
  app.DashboardComponent = ng.core
    .Component({
      selector: 'my-dashboard',
      template: `
        <h2>Welcome To {{title}}!</h2>
      `
    })
    .Class({
      constructor: function() {
        this.title = 'Dashboard';
      }
    });
})(window.app || (window.app = {}));