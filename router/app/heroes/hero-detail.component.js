(function (app) {
  app.HeroDetailComponent = ng.core
    .Component({
      selector: 'my-hero-detail',
      template: `
                <div *ngIf="hero">
                    <h2>{{hero.name}} details!</h2>
                    <div>
                        <label>id: </label>{{hero.id}}</div>
                    <div>
                        <label>name: </label>
                        <input [(ngModel)]="hero.name" placeholder="name"/>
                  </div>
                </div>
            `,
      styleUrls: ['css/hero-detail.component.css'],
      // inputs: ['hero']
      providers: [
        app.heroService
      ]
    })
    .Class({
      constructor: [app.heroService, ng.router.RouteParams, ng.router.Router, function (heroService, routeParams, router) {
        this.heroService = heroService;
        this.routeParams = routeParams;
        this.router = router;
      }],
      routerOnActivate: function () {
        var self = this;
        var id = self.routeParams.get('id');
        this.heroService.getHeroById(id).then(data => self.hero = data);
      },
      goBack: function () {
        window.history.back();
      }
    });
})(window.app || (window.app = {}));