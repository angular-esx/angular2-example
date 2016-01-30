(function (application) {
  (application.services || (application.services = {})).mySwipeService = ng.core
    .Class((function () {
      return {
        constructor: function () {
          this.swipeEmitter = new ng.core.EventEmitter();
        },
        subscribe: function (onNext, onError, onCompleted) {
          this.swipeEmitter.subscribe(onNext, onError, onCompleted);
        },
        swipe: function (swipeId) {
          this.swipeEmitter.next({ swipeId: swipeId });
        }
      }
    })());

})(window.application || (window.application = {}));