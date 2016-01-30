(function (application) {
  application.myApp = ng.core.Component({
    selector: 'my-app',
    templateUrl: 'app.html',
    styles: [`
      button {
        height: 50px;
        margin: 0px;
        width: 60px;
      }
      item{
        width: 100%;
        height: 50px;
        position: relative;
        display: inline-block;
        overflow: hidden;
      }
      .swipe-content{
        background-color: #0275d8;
        color: white;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 100;
        transition: transform 0.3s ease-out;
      }
      .swipe-left{
        position: absolute;
        top: 0px;
        right: 0px;
        height: 100%;
      }
      .swipe-right{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
      }
      .btn-group .btn{
        border-radius: 0px;
      }
    `],
    directives: [application.components.mySwipe],
    providers: [application.services.mySwipeService]
  })
  .Class({
    constructor: [application.services.mySwipeService, function (mySwipeService) {
      this.swipeService = mySwipeService;
    }],
    clickOnAction: function () {
      alert('You have just clicked on action');
    },
    onSwiping: function (event) {
      console.log(event.type, event.direction);
    },
    onSwiped: function (event) {
      console.log(event.type, event.direction);
    },
    swipe: function (swipeId) {
      this.swipeService.swipe(swipeId);
    }
  });
})(window.application || (window.application = {}));