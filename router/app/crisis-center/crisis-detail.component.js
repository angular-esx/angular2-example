(function (app) {
  app.CrisisDetailComponent = ng.core
    .Component({
      selector: 'my-hero-detail',
      template: `
        <div *ngIf="crisis">
          <h2>{{editName}} details!</h2>
          <div><label>id: </label>{{crisis.id}}</div>
          <div>
            <label>name: </label>
            <input [(ngModel)]="editName" placeholder="name"/>
          </div>
           <p>
                <button (click)="save()">Save</button>
                <button (click)="cancel()">Cancel</button>
            </p>
        </div>
      `,
      styleUrls: ['css/hero-detail.component.css'],
      // inputs: ['hero']
      providers: [
        app.crisisService,
        app.dialogService
      ]
    })
    .Class({
      constructor: [app.crisisService, ng.router.RouteParams, ng.router.Router, app.dialogService
        , function (crisisService, routeParams, router, dialog) {
          this.crisisService = crisisService;
          this.routeParams = routeParams;
          this.router = router;
          this.dialog = dialog;
        }],
      routerOnActivate: function () {
        var self = this;
        var id = self.routeParams.get('id');
        if (typeof id === 'string') {
          id = parseInt(id);
        }
        self.crisisService.getCrisisById(id).then(function (data) {
          if (data) {
            self.crisis = data;
            self.editName = data.name;
          } else {
            self.gotoCrises();
          }

        });
      },
      gotoCrises: function () {
        // this.router.navigateByUrl('/crisis-center/');
        this.router.navigate(['CrisisList', { id: this.crisis.id }]);
      },
      save: function () {
        this.crisis.name = this.editName;
        this.gotoCrises();
      },
      cancel: function () {
        this.editName = this.crisis.name;
        this.gotoCrises();

      },
      routerCanDeactivate: function () { // router hook
        if (!this.crisis || this.crisis.name === this.editName) {
          return true;
        } else {
          return this.dialog.confirm("Discard changes?");
        }
      },
      goBack: function () {
        window.history.back();
      }
    });
})(window.app || (window.app = {}));