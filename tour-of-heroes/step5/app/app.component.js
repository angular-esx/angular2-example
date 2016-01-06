(function(app) {

  app.AppComponent = ng.core
    .Component({
      selector: 'my-app',
      template:`
        <h1>{{title}}</h1>
        <a [routerLink]="['Dashboard']">Dashboard</a>
        <a [routerLink]="['Heroes']">Heroes</a>
        <router-outlet></router-outlet>
      `,
      styles:[`
        a {
          padding: 5px 10px;
          text-decoration: none;
          margin-top: 10px;
          display: inline-block;
          background-color: #eee;
          border-radius: 4px;
        }
        a:visited, a:link {
          color: #607D8B;
        }
        a:hover {
          color: #039be5;
          background-color: #CFD8DC;
        }
        a.router-link-active {
          color: #039be5;
        }
        h1 {
          font-size: 1.2em;
          color: #999;
          margin-bottom: 0;
        }
        h2 {
          font-size: 2em;
          margin-top: 0;
          padding-top: 0;
        }
      `],
      directives: [ng.router.ROUTER_DIRECTIVES]
    })
    .Class({
      constructor: [function() {
        this.title = "Tour of heroes";
      }]
    });

  ng.router.RouteConfig([
    // {path: '/', redirectTo: ['Dashboard'] },
    {path: '/dashboard', name: 'Dashboard', component: app.DashboardComponent, useAsDefault: true},
    {path: '/heroes', name: 'Heroes', component: app.HeroComponent},
  ])(app.AppComponent);

})(window.app || (window.app = {}));