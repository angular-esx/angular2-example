(function(app) {
  app.AppComponent = ng.core
    .Component({
      selector: 'my-app',
      template: `
        <h1>{{title}}</h1>
        <h2>{{hero.name}} details!</h2>
        <div><label>id: </label>{{hero.id}}</div>
        <div>
          <label>name: </label>
          <div><input [(ngModel)]="hero.name" placeholder="name"></div>
        </div>
        `
    })
    .Class({
      constructor: function() {
        this.title = "Tour of heroes";
        this.hero = {
          id: 1,
          name: 'Windstorm'
        };
      }
    });
})(window.app || (window.app = {}));