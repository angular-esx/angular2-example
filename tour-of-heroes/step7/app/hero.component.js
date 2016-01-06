(function(app) {
  var Router = ng.router.Router;

  app.HeroComponent = ng.core
    .Component({
      selector: 'my-hero',
      templateUrl: 'app/hero.component.html',
      styleUrls: ['app/hero.component.css'],
      providers: [
        app.HeroService
      ]
    })
    .Class({
      constructor: [app.HeroService, ng.router.Router, function(heroService, router) {
        this.heroService = heroService;
        this.router = router;
      }],
      ngOnInit: function() {
        var _this = this;
        
        _this.heroService.getHeroes().then(function(heroes) {
          _this.heroes = heroes;
        });
      },
      onSelect: function(hero) {
        this.selectedHero = hero;
      },
      gotoDetail: function() {
        this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
      }
    });

})(window.app || (window.app = {}));
