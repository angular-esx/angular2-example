(function (application) {
  application.myApp = ng.core.Component({
    selector: 'my-app',
    templateUrl: 'app.html',
    styleUrls: ['app.css'],
    directives: [application.ngxBootstrap.ngxComponents.ngxSwipe],
    providers: [application.ngxBootstrap.ngxServices.ngxSwipeService]
  })
  .Class({
    constructor: [application.ngxBootstrap.ngxServices.ngxSwipeService, function (ngxSwipeService) {
      this.swipeService = ngxSwipeService;
      this.items = [];

      var description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus.';
      var titles = ['Facebook', 'Google Plus', 'Twitter'];
      for (var i = 0; i < titles.length; i++) {
        this.items.push({ title: titles[i], description: description });
      }
    }],
    edit: function () {
      alert('You have just clicked on edit button');
    },
    'delete': function () {
      alert('You have just clicked on delete button');
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
})(window.application = {
  ngxBootstrap: window.ngxBootstrap
});