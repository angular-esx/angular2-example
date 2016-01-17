(function(app) {
  app.UiPane = ng.core
    .Directive({
      selector: '[ui-pane]',
      inputs: ['title', 'active']
    })
    .Class({
      constructor: [ng.core.ViewContainerRef, ng.core.TemplateRef, 
        function(ViewContainerRef, TemplateRef) {
          this.viewContainer = ViewContainerRef;
          this.templateRef = TemplateRef;
          this._active = false;

          Object.defineProperty(this.__proto__, "active", {
            set: function(active) {
              if (active == this._active) return;
              this._active = active;
              if (active) {
                this.viewContainer.createEmbeddedView(this.templateRef);
              } else {
                this.viewContainer.remove(0);
              }
            },
            get: function () {
              return this._active;
            },
            enumerable: true,
            configurable: true
          });
      }]
    });

  app.UiTabs = ng.core
    .Component({
      selector: 'ui-tabs',
      template: `
        <ul class="nav nav-tabs">
          <li *ngFor="var pane of panes" 
              (click)="select(pane)"
              role="presentation" [class.active]="pane.active">
            <a href="javascript: false">{{pane.title}}</a>
          </li>
        </ul>
        <ng-content></ng-content>
      `
    })
    .Class({
      constructor: [
        [new ng.core.Query(app.UiPane), function() {}],
        function (panes) {
          this.panes = panes;
        }
      ],
      select: function(pane) {
        this.panes.toArray().forEach((p) => p.active = p == pane);
      }
    });
})(window.app || (window.app = {}));