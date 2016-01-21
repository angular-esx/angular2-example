(function (application) {
  application.myApp = ng.core.Component({
    selector: 'my-app',
    template: `
      <my-swipe *ngFor="#item of items">
        <div class="swipe-content-section">Swipe to left</div>
        <div class="swipe-action-section">
          <button>Delete</button>
          <button>Edit</button>
        </div>
      </my-swipe>
      `,
    styles: [`
      button {
        height: 50px;
        margin: 0px;
        width: 100px;
      }
    `],
    directives: [application.components.mySwipe]
  })
  .Class({
    constructor: function () {
      this.items = [];
      for(var i = 0; i < 10; i++){
        this.items.push({});
      }
    },
    clickOnAction: function () {
      alert('You have just clicked on action');
    }
  });
})(window.application || (window.application = {}));