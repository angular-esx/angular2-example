(function(app) {
  app.DashboardComponent = ng.core
    .Component({
      selector: 'my-dashboard',
      templateUrl: 'app/dashboard.component.html',
      styleUrls: ['app/dashboard.component.css'],
      providers: [app.HeroService]
    })
    .Class({
      constructor: [app.HeroService, ng.router.Router, function(heroService, router) {
        this.heroService = heroService;
        this.router = router;
      }],
      ngOnInit: function() {
        var _this = this;
        
        _this.heroService.getHeroes().then(function(heroes) {
          _this.heroes = heroes.slice(1,5)
        });
      },
      gotoDetail: function(hero) {
        this.router.navigate(['HeroDetail', { id: hero.id }]);
      }
    });
})(window.app || (window.app = {}));