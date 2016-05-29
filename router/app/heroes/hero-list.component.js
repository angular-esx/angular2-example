(function (app) {
    app.HeroListComponent =
        ng.core.Component({
            template: `
                <h2>HEROES</h2>
                <ul class="items">
                    <li *ngFor="let hero of heroes" (click)="onSelect(hero)">
                        <span class="badge">{{hero.id}}</span> {{hero.name}}
                    </li>
                    </ul>
                `,

        }).Class({
            constructor: [app.heroService, ng.router.RouteParams, ng.router.Router, function (service, routerParams, router) {
                this.service = service;
                this.routerParams = routerParams;
                this.router = router;
            }], ngOnInit() {
                this.service.getHeroes().then(heroes => this.heroes = heroes);
            },
            onSelect(hero) {
                this.router.navigate(['HeroDetail', { id: hero.id }]);
            }

        })
})(window.app || (window.app = {}));