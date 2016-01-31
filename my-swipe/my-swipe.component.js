(function (application) {
  (application.components || (application.components = {})).mySwipe = ng.core.Directive({
    selector: 'my-swipe',
    events: ['swiping', 'swiped'],
    inputs: ['threshold', 'velocity', 'distance', 'distanceLeft', 'distanceRight', 'deltaTime']
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

      // Minimal pan distance required before recognizing.
      var threshold = this.threshold || 0;
      // Minimal velocity required before recognizing, unit is in px per ms.
      var velocity = this.velocity || 0.65;
      // Minimal distance to pan left/right, unit is px
      var distance = this.distance;
      // Minimal distance to pan left, unit is px
      var distanceLeft = this.distanceLeft || distance || (swipeLeft && swipeLeft/2);
      // Minimal distance to pan right, unit is px
      var distanceRight = this.distanceRight || distance || (swipeRight && swipeRight/2);
      // maxtime to active swipe action
      var deltaTime = this.deltaTime || 300;

      transform = 0;
      defaultTransform = 0;

      if(swipeLeft || swipeRight){
        manager = new Hammer.Manager(this.nativeElement, {
          recognizers: [
              [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL, threshold: threshold }]
          ]
        });

        manager.on('panstart', function (e) {
          element = getParentElement(e.target, 'swipe-content');
          if (element) {
            self.swiping.next({
              type: 'swiping',
              direction: e.additionalEvent == 'panleft' ? SWIPE_TO_LEFT_DIRECTION : SWIPE_TO_RIGHT_DIRECTION,
              target: e.target
            });

            defaultTransform = parseInt(element.style.transform.split(/[(px)]/)[1]) || 0;
          }
        });

        manager.on('pan', function (e) {
          if(element){
            if(swipeLeft && swipeRight){
              transform = defaultTransform + e.deltaX;
            }else if(swipeLeft){
              transform = defaultTransform + e.deltaX > 0 ? 0 : defaultTransform + e.deltaX;
            }else if(swipeRight){
              transform = defaultTransform + e.deltaX < 0 ? 0 : defaultTransform + e.deltaX;
            }

            element.style.transition = 'transform 0s ease-out';
            element.style.transform = 'translateX('+transform+'px)';
          }
        });

        manager.on('panend', function (e) {
          if(element){
            element.style.transition = null;

            if(swipeRight && transform >= distanceRight) {
              element.style.transform = 'translateX('+swipeRight+'px)';
            }else if(swipeRight && transform < distanceRight && transform >= 0) {
              element.style.transform = null;
            }else if(swipeLeft && transform < 0 && (transform > -distanceLeft)) {
              element.style.transform = null;
            }if(swipeLeft && transform <= -distanceLeft) {
              element.style.transform = 'translateX(-'+swipeLeft+'px)';
            }

            self.swiped.next({
              type: 'swiped',
              direction: e.additionalEvent == 'panleft' ? SWIPE_TO_LEFT_DIRECTION : SWIPE_TO_RIGHT_DIRECTION,
              target: e.target
            });
          }

          element = null;
        });

        manager = new Hammer.Manager(this.nativeElement, {
          recognizers: [
              [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL, threshold: threshold, velocity: velocity }]
          ]
        });

        manager.on('swipeleft', function (e) {
          element = getParentElement(e.target, 'swipe-content');
          if(e.deltaTime < deltaTime && element){
            transform = parseInt(element.style.transform.split(/[(px)]/)[1]) || 0;
            if(swipeLeft && transform <= 0) {
              element.style.transform = 'translateX(-'+swipeLeft+'px)';
            }else if(swipeRight && transform > 0){
              element.style.transform = null;
            }
          }
          element = null;
        });

        manager.on('swiperight', function (e) {
          element = getParentElement(e.target, 'swipe-content');
          if(e.deltaTime < deltaTime && element){
            transform = parseInt(element.style.transform.split(/[(px)]/)[1]) || 0;
            if(swipeRight && transform >= 0) {
              element.style.transform = 'translateX('+swipeRight+'px)';
            }else if(swipeLeft && transform < 0) {
              element.style.transform = null;
            }
          }
          element = null;
        });
      }

      function getParentElement(element, parentClass){
        if(element.className && element.className.indexOf(parentClass) >= 0){
          return element;
        }

        var p = element.parentNode;
        
        while (p !== null) {
          var o = p;
          if(o.className && o.className.indexOf(parentClass) >= 0){
            return o;
          }
          p = o.parentNode;
        }

        return null;
      }
    }
  });
})(window.application || (window.application = {}));