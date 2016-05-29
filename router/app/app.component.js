(function (app) {
	app.AppComponent =
		ng.core.Component({
			selector: 'hero-app',
			template: `
				 <h1 class="title">Component Router</h1>
                 <a [routerLink]="['CrisisCenter']">Crisis Center</a>
                 <a [routerLink]="['Heroes']">Heroes</a>
                 <router-outlet></router-outlet>
			  `,
			styleUrls: ['css/app.component.css'],
			directives: [
				ng.router.ROUTER_DIRECTIVES,
			], providers: [
				ng.router.ROUTER_PROVIDERS,
				app.heroService
			]
		}).Class({
			constructor: [ng.router.Router, function (router) {
				this.router = router;
			}],
			ngOnInit() {

			},
		})

		ng.router.RouteConfig([
		{
			path: '/crisis-center/...',
			name: 'CrisisCenter',
			component: app.CrisisCenterComponent,
			useAsDefault: true
		},
		{ path: '/heroes', name: 'Heroes', component: app.HeroListComponent },
		{ path: '/hero/:id', name: 'HeroDetail', component: app.HeroDetailComponent },

		])(app.AppComponent);

})(window.app || (window.app = {}));