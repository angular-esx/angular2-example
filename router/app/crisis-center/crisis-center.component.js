(function (app) {
    app.CrisisCenterComponent =
        ng.core.Component({
            template: `
                <h2>CRISIS CENTER</h2>
                <router-outlet></router-outlet>
            `,
            directives: [
                //Do not add ng.router.ROUTER_DIRECTIVES in child router component,
                ng.router.RouterOutlet
            ],
            providers: [
                app.crisisService
            ]
        }).Class({
            constructor: function () {

            }

        })
    ng.router.RouteConfig([
        { path: '/', name: 'CrisisCenter', component: app.CrisisListComponent, useAsDefault: true },
        { path: '/:id', name: 'CrisisDetail', component: app.CrisisDetailComponent },
        { path: '/list/:id', name: 'CrisisList', component: app.CrisisListComponent }
    ])(app.CrisisCenterComponent)
})(window.app || (window.app = {}));