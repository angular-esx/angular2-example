(function (ngxBootstrap) {
  (ngxBootstrap.ngxServices || (ngxBootstrap.ngxServices = {})).ngxSwipeService = ng.core
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

})(window.ngxBootstrap || (window.ngxBootstrap = {}));