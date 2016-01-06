(function(app) {
  app.HeroDetailComponent = ng.core
    .Component({
      selector: 'my-hero-detail',
      templateUrl: 'app/hero-detail.component.html',
      styleUrls: ['app/hero-detail.component.css'],
      providers: [app.HeroService]
    })
    .Class({
      constructor: [app.HeroService, ng.router.RouteParams, ng.router.Router, function(heroService, routeParams, router) {
        this.heroService = heroService;
        this.routeParams = routeParams;
        this.router = router;
      }],
      ngOnInit: function() {
        var _this = this;
        var id = _this.routeParams.get('id');
        _this.heroService.getHero(id).then(function(hero) {
          _this.hero = hero;
        });
      },
      goBack: function() {
        window.history.back();
      }
    });
})(window.app || (window.app = {}));