(function (application) {
  application.myApp = ng.core.Component({
    selector: 'my-app',
    template: `
      <my-swipe>
        <item *ngFor="#item of items, #i=index">
          <div class ="swipe-content">
            Swipe to left {{i}}
          </div>
          <div class="swipe-actions">
            <button>Delete</button>
            <button>Edit</button>
          </div>
        </item>
      </my-swipe>
      `,
    styles: [`
      button {
        height: 50px;
        margin: 0px;
        width: 60px;
      }
      item{
        width: 80%;
        height: 50px;
        margin: 10px;
        position: relative;
        display: inline-block;
        overflow: hidden;
      }
      .swipe-content{
        background-color: rebeccapurple;
        color: white;
        width: 100%;
        height: 100%;
        position: relative;
        z-index: 100;
        transition: transform 0.3s ease-out;
      }
      .swipe-actions{
        text-align: right;
        color: white;
        background-color: orangered;
        position: absolute;
        top: 0px;
        right: 0px;
        height: 100%;
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