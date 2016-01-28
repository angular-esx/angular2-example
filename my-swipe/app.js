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
    },
    onSwiping: function (event) {
      console.log(event.type, event.direction);
    },
    onSwiped: function (event) {
      console.log(event.type, event.direction);
    }
  });
})(window.application || (window.application = {}));