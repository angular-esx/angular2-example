(function (application) {
  (application.components || (application.components = {})).mySwipe = ng.core.Directive({
    selector: 'my-swipe',
    properties: ['swipeId: swipe-id'],
    events: ['swiping', 'swiped']
  })
  .Class((function () {
    var _SWIPE_LEFT_CLASS = 'swipe-left',
        _SWIPE_RIGHT_CLASS = 'swipe-right',
        _SWIPE_CONTENT_CLASS = 'swipe-content',
        _SWIPING_TYPE = 'swiping',
        _SWIPED_TYPE = 'swiped',
        _SWIPE_TO_LEFT_DIRECTION = 'swipeToLeft',
        _SWIPE_TO_RIGHT_DIRECTION = 'swipeToRight';

    return {
      constructor: [application.services.mySwipeService, ng.core.ElementRef, function (mySwipeService, elementRef) {
        this.swipeService = mySwipeService;
        this.nativeElement = elementRef.nativeElement;
        this.swiping = new ng.core.EventEmitter();
        this.swiped = new ng.core.EventEmitter();
      }],
      ngAfterViewInit: function () {
        var _self = this, 
            _manager,
            _element,
            _swipeLeft = _getSwipeLeft(this.nativeElement),
            _swipeRight = _getSwipeRight(this.nativeElement),
            _defaultTransform = 0,
            _transform = 0;

        if (_swipeLeft || _swipeRight) {
          _manager = new Hammer.Manager(this.nativeElement, {
            recognizers: [
                [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
            ]
          });

          _manager.on('panstart', function (e) {
            if (e.target.className == _SWIPE_CONTENT_CLASS) {
              _self.swiping.next({
                type: _SWIPING_TYPE,
                direction: e.additionalEvent == 'panleft' ? _SWIPE_TO_LEFT_DIRECTION : _SWIPE_TO_RIGHT_DIRECTION,
                target: e.target
              });

              _element = e.target;
              _defaultTransform = parseInt(_element.style.transform.split(/[(px)]/)[1]) || 0;
            }
          });

          _manager.on('pan', function (e) {
            if (_swipeLeft && _swipeRight) {
              _transform = _defaultTransform + e.deltaX;
            }
            else if (_swipeLeft) {
              _transform = (function (value) {
                return value > 0 ? 0 : value;
              })(_defaultTransform + e.deltaX);
            }
            else if (_swipeRight) {
              _transform = (function (value) {
                return value < 0 ? 0 : value;
              })(_defaultTransform + e.deltaX);
            }

            _element.style.transition = 'transform 0s ease-out';
            _element.style.transform = 'translateX(' + _transform + 'px)';
          });

          _manager.on('panend', function (e) {
            _element.style.transition = null;

            if (_swipeRight && _transform >= (_swipeRight / 2)) {
              _element.style.transform = 'translateX(' + _swipeRight + 'px)';
            }
            else if (_swipeRight && _transform < (_swipeRight / 2) && _transform >= 0) {
              _element.style.transform = null;
            }
            else if (_swipeLeft && _transform < 0 && (_transform > -_swipeLeft / 2)) {
              _element.style.transform = null;
            }
            else if (_swipeLeft && _transform <= -(_swipeLeft / 2)) {
              _element.style.transform = 'translateX(-' + _swipeLeft + 'px)';
            }

            _self.swiped.next({
              type: _SWIPED_TYPE,
              direction: e.additionalEvent == 'panleft' ? _SWIPE_TO_LEFT_DIRECTION : _SWIPE_TO_RIGHT_DIRECTION,
              target: e.target
            });
          });
        }

        this.swipeService.subscribe(
         function (data) {
           if (!data || !data.swipeId || _self.swipeId == data.swipeId) {
             _self.swipe();
           }
         },
         function (error) {
           console.log('mySwipeService.swipe', error);
         });
      },
      swipe: function () {

        var _element = _getSwipeContent(this.nativeElement),
            _swipeLeft = _getSwipeLeft(this.nativeElement),
            _swipeRight = _getSwipeRight(this.nativeElement),
            _transform = parseInt(_element.style.transform.split(/[(px)]/)[1]) || 0;
        
        if (_element && (_swipeLeft || _swipeRight)) {
          _element.style.transition = 'transform 0.2s ease-out';

          if (_swipeRight) {
            _element.style.transform = _transform ? null : 'translateX(' + _swipeRight + 'px)';
          }
          else if (_swipeLeft) {
            _element.style.transform = _transform ? null : 'translateX(-' + _swipeLeft + 'px)';
          }
        }
      }
    };

    function _getSwipeContent(nativeElement) {
      return nativeElement.getElementsByClassName(_SWIPE_CONTENT_CLASS)[0];
    };
    function _getSwipeLeft(nativeElement) {
      return (nativeElement.getElementsByClassName(_SWIPE_LEFT_CLASS)[0] || {}).offsetWidth;
    };
    function _getSwipeRight(nativeElement) {
      return (nativeElement.getElementsByClassName(_SWIPE_RIGHT_CLASS)[0] || {}).offsetWidth;
    };
  })());
})(window.application || (window.application = {}));