(function (application) {
  (application.components || (application.components = {})).mySwipe = ng.core.Component({
    selector: 'my-swipe',
    template: `
      <div class="swipe-container">
        <div class ="swipe-content">
          <ng-content select=".swipe-content-section"></ng-content>
        </div>
        <div class ="swipe-actions">
          <ng-content select=".swipe-action-section"></ng-content>
        </div>
      </div>
    `,
    styles: [`
      .swipe-container{
        width: 50%;
        height: 50px;
        margin-bottom: 10px;
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
        width: 80%;
        height: 100%;
      }
      .swiped {
        transform: translateX(-80%);
      }
    `]
  })
  .Class({
    constructor: function() {},
    ngAfterViewInit: function () {
      var elements = document.getElementsByClassName('swipe-content');
      var manager;
      for (var i = 0; i < elements.length; i++) {
        manager = new Hammer.Manager(elements[i], {
          recognizers: [
              [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
          ]
        });

        manager.on('swipeleft', function (e) {
          e.target.className = 'swipe-content swiped';
        });
        manager.on('swiperight', function (e) {
          e.target.className = 'swipe-content';
        });
      }
    }
  });

})(window.application || (window.application = {}));

