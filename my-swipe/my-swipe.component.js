(function (application) {
  (application.components || (application.components = {})).mySwipe = ng.core.Directive({
    selector: 'my-swipe',
    events: ['swiping', 'swiped']
  })
  .Class({
    constructor: [ng.core.ElementRef, function(elementRef) {
      this.nativeElement = elementRef.nativeElement;
      this.swiping = new ng.core.EventEmitter();
      this.swiped = new ng.core.EventEmitter();
    }],
    ngAfterViewInit: function () {
      var SWIPE_TO_LEFT_DIRECTION = 'swipeToLeft',
          SWIPE_TO_RIGHT_DIRECTION = 'swipeToRight';

      var self = this,
          manager, transform, defaultTransform, element;

      var swipeLeft = this.nativeElement.getElementsByClassName('swipe-left')[0] 
        && this.nativeElement.getElementsByClassName('swipe-left')[0].offsetWidth;
      var swipeRight = this.nativeElement.getElementsByClassName('swipe-right')[0] 
        && this.nativeElement.getElementsByClassName('swipe-right')[0].offsetWidth;

      transform = 0;
      defaultTransform = 0;
      if(swipeLeft || swipeRight){
        manager = new Hammer.Manager(this.nativeElement, {
          recognizers: [
              [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }]
          ]
        });

        manager.on('panstart', function (e) {
          if (e.target.className == 'swipe-content') {
            self.swiping.next({
              type: 'swiping',
              direction: e.additionalEvent == 'panleft' ? SWIPE_TO_LEFT_DIRECTION : SWIPE_TO_RIGHT_DIRECTION,
              target: e.target
            });

            element = e.target;
            defaultTransform = parseInt(element.style.transform.split(/[(px)]/)[1]) || 0;
          }
        });

        manager.on('pan', function (e) {
          if(swipeLeft && swipeRight){
            transform = defaultTransform + e.deltaX;
          }else if(swipeLeft){
            transform = defaultTransform + e.deltaX > 0 ? 0 : defaultTransform + e.deltaX;
          }else if(swipeRight){
            transform = defaultTransform + e.deltaX < 0 ? 0 : defaultTransform + e.deltaX;
          }

          element.style.transition = 'transform 0s ease-out';
          element.style.transform = 'translateX('+transform+'px)';
        });

        manager.on('panend', function (e) {
          element.style.transition = null;

          if(swipeRight && transform >= (swipeRight / 2)) {
            element.style.transform = 'translateX('+swipeRight+'px)';
          }else if(swipeRight && transform < (swipeRight / 2) && transform >= 0) {
            element.style.transform = null;
          }else if(swipeLeft && transform < 0 && (transform > -swipeLeft / 2)) {
            element.style.transform = null;
          }if(swipeLeft && transform <= -(swipeLeft / 2)) {
            element.style.transform = 'translateX(-'+swipeLeft+'px)';
          }

          self.swiped.next({
            type: 'swiped',
            direction: e.additionalEvent == 'panleft' ? SWIPE_TO_LEFT_DIRECTION : SWIPE_TO_RIGHT_DIRECTION,
            target: e.target
          });
        });

        manager = new Hammer.Manager(this.nativeElement, {
          recognizers: [
              [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 }]
          ]
        });

        manager.on('swipeleft', function (e) {
          if(e.deltaTime < 300 && e.target.className == 'swipe-content'){
            element = e.target;
            transform = parseInt(element.style.transform.split(/[(px)]/)[1]) || 0;
            if(swipeLeft && transform <= 0) {
              element.style.transform = 'translateX(-'+swipeLeft+'px)';
            }else if(swipeRight && transform > 0){
              element.style.transform = null;
            }
          }
        });

        manager.on('swiperight', function (e) {
          if(e.deltaTime < 300 && e.target.className == 'swipe-content'){
            element = e.target;
            transform = parseInt(element.style.transform.split(/[(px)]/)[1]) || 0;
            if(swipeRight && transform >= 0) {
              element.style.transform = 'translateX('+swipeRight+'px)';
            }else if(swipeLeft && transform < 0) {
              element.style.transform = null;
            }
          }
        });
      }
    }
  });
})(window.application || (window.application = {}));