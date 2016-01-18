(function (application) {
  application.myApp = ng.core.Component({
    selector: 'my-app',
    template: `
      <my-swipe>
        <div class ="swipe-content-section">Swipe to left</div>
        <div class ="swipe-action-section" (click)="clickOnAction()">Action</div>
      </my-swipe>
      `,
    directives: [application.components.mySwipe]
  })
  .Class({
    constructor: function () {},
    clickOnAction: function () {
      alert('You have just clicked on action');
    }
  });
})(window.application || (window.application = {}));