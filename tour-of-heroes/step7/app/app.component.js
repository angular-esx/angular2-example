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
      styleUrls: ['app/app.component.css'],
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
    {path: '/detail/:id', name: 'HeroDetail', component: app.HeroDetailComponent}
  ])(app.AppComponent);

})(window.app || (window.app = {}));