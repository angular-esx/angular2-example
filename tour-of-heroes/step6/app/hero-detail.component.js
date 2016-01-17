(function(app) {
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
          <button (click)="goBack()">Back</button>
        </div>
      `,
      styles: [`
        label {
          display: inline-block;
          width: 3em;
          margin: .5em 0;
          color: #607D8B;
          font-weight: bold;
        }
        input {
          height: 2em;
          font-size: 1em;
          padding-left: .4em;
        }
        button {
          margin-top: 20px;
          font-family: Arial;
          background-color: #eee;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer; cursor: hand;
        }
        button:hover {
          background-color: #cfd8dc;
        }
      `],
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
        this.router.navigate(['Heroes']);
      }
    });
})(window.app || (window.app = {}));