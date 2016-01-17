(function(app) {
  app.AppComponent = ng.core
    .Component({
      selector: 'my-app',
      template: `
        <h4>Tabs Demo</h4>
        <ui-tabs>
          <template ui-pane title='Overview' active="true">
            You have {{details.length}} details.
          </template>
          <template *ngFor="#detail of details" ui-pane [title]="detail.title">
            {{detail.text}} <br><br>
            <button class="btn" (click)="removeDetail(detail)">Remove</button>
          </template>
          <template ui-pane title='Summary'>
            Next last ID is {{id}}.
          </template>
        </ui-tabs>
        <hr>
        <button class="btn" (click)="addDetail()">Add Detail</button>
      `,
      directives: [app.UiTabs, app.UiPane]
    })
    .Class({
      constructor: function() {
        this.details = [];
        this.id = 0;
      },
      addDetail: function() {
        this.id++;
        this.details.push({
          title: `Detail ${this.id}`,
          text: `Some detail text for ${this.id}...`
        });
      },
      removeDetail: function(detail){
        this.details = this.details.filter((d) => d !== detail);
      }
    });
})(window.app || (window.app = {}));