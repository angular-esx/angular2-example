(function (app) {
    app.CrisisListComponent =
        ng.core.Component({
            template: `
                <h2>CRISIS LIST</h2>
                <ul class="items">
                    <li *ngFor="let crisis of crisises"
                    (click)="onSelect(crisis)" [class.selected]="isSelected(crisis)">
                        <span class="badge">{{crisis.id}}</span> {{crisis.name}}
                    </li>
                    </ul>
                `,
        }).Class({
            constructor: [app.crisisService, ng.router.RouteParams, ng.router.Router, function (service, routerParams, router) {
                this.service = service;
                this.routerParams = routerParams;
                this.router = router;
            }], ngOnInit() {
                var self = this;
                self.selectedId = self.routerParams.get('id');
                this.service.getCrisises().then(function (data) {
                    self.crisises = data;
                });
            },

            onSelect(hero) {
                this.router.navigate(['CrisisDetail', { id: hero.id }]);
            },
            isSelected: function (crisis) {
                if (crisis.id === this.selectedId) return true;
                return false
            }

        })
})(window.app || (window.app = {}));