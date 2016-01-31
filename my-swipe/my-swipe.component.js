(function (ngxBootstrap) {
  (ngxBootstrap.ngxComponents || (ngxBootstrap.ngxComponents = {})).ngxSwipe = ng.core.Directive({
    selector: 'ngx-swipe',
    properties: ['swipeId: swipe-id', 'distanceLeft: distance-left', 'distanceRight: distance-right', 'deltaTime: delta-time'],
    inputs: ['threshold', 'velocity', 'distance'],
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
      constructor: [ngxBootstrap.ngxServices.ngxSwipeService, ng.core.ElementRef, function (ngxSwipeService, elementRef) {
        this.swipeService = ngxSwipeService;
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
            _transform = 0
        // Minimal pan distance required before recognizing.
        _threshold = this.threshold || 0,
        // Minimal velocity required before recognizing, unit is in px per ms.
        _velocity = this.velocity || 0.65,
        // Minimal distance to pan left/right, unit is px
        _distance = this.distance,
        // Minimal distance to pan left, unit is px
        _distanceLeft = this.distanceLeft || _distance || (_swipeLeft && _swipeLeft / 2),
        // Minimal distance to pan right, unit is px
        _distanceRight = this.distanceRight || _distance || (_swipeRight && _swipeRight / 2),
        // maxtime to active swipe action
        _deltaTime = this.deltaTime || 300;

        if (_swipeLeft || _swipeRight) {
          _manager = new Hammer.Manager(this.nativeElement, {
            recognizers: [
              [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL, threshold: _threshold }]
            ]
          });

          _manager.on('panstart', function (e) {
            _element = _getSwipeContent(e.target, _SWIPE_CONTENT_CLASS);
            if (_element) {
              _emitSwipingEvent(_self, e);

              _defaultTransform = _getTransformValue(_element);
            }
          });

          _manager.on('pan', function (e) {
            if (_element) {
              if (_swipeLeft && _swipeRight) {
                _transform = _defaultTransform + e.deltaX;
              }
              else if (_swipeLeft) {
                _transform = _defaultTransform + e.deltaX > 0 ? 0 : _defaultTransform + e.deltaX;
              }
              else if (_swipeRight) {
                _transform = _defaultTransform + e.deltaX < 0 ? 0 : _defaultTransform + e.deltaX;
              }

              _element.style.transition = 'transform 0s ease-out';
              _element.style.transform = _translateX(_transform);
            }
          });

          _manager.on('panend', function (e) {
            if (_element) {
              _element.style.transition = null;

              if (_swipeRight && _transform >= _distanceRight) {
                _element.style.transform = _translateX(_swipeRight);
              }
              else if (_swipeRight && _transform < _distanceRight && _transform >= 0) {
                _element.style.transform = null;
              }
              else if (_swipeLeft && _transform < 0 && (_transform > _distanceLeft)) {
                _element.style.transform = null;
              }
              else if (_swipeLeft && _transform <= -_distanceLeft) {
                _element.style.transform = _translateX(-_swipeLeft);
              }

              _emitSwipedEvent(_self, e);
            }
          });



          _manager = new Hammer.Manager(this.nativeElement, {
            recognizers: [
              [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL, threshold: threshold, velocity: velocity }]
            ]
          });

          _manager.on('swipeleft', function (e) {
            _element = _getSwipeContent(e.target, _SWIPE_CONTENT_CLASS);

            if (_element && e.deltaTime < _deltaTime) {
              _transform = _getTransformValue(_element);

              if (_swipeLeft && _transform <= 0) {
                _element.style.transform = _translateX(-_swipeLeft);
              }
              else if (_swipeRight && _transform > 0) {
                _element.style.transform = null;
              }
            }
          });

          _manager.on('swiperight', function (e) {
            _element = _getSwipeContent(e.target, _SWIPE_CONTENT_CLASS);

            if (_element && e.deltaTime < _deltaTime) {
              _transform = _getTransformValue(_element);

              if (_swipeRight && _transform >= 0) {
                _element.style.transform = _translateX(_swipeRight);
              }
              else if (_swipeLeft && _transform < 0) {
                _element.style.transform = null;
              }
            }
          });

        }

        this.swipeService.subscribe(
         function (data) {
           if (!data || !data.swipeId || _self.swipeId == data.swipeId) {
             _self.swipe();
           }
         },
         function (error) {
           console.error('mySwipeService.swipe', error);
         });

      },
      swipe: function () {
        var _element = this.nativeElement.getElementsByClassName(_SWIPE_CONTENT_CLASS)[0],
            _event = {
              additionalEvent: '',
              target: _element
            },
            _swipeLeft = _getSwipeLeft(this.nativeElement),
            _swipeRight = _getSwipeRight(this.nativeElement),
            _transform = _getTransformValue(_element),
            _translateXString;

        if (_element && (_swipeLeft || _swipeRight)) {
          if (_swipeLeft) {
            _translateXString = _transform ? null : _translateX(-_swipeLeft);
            _event.additionalEvent = _transform >= 0 ? 'panleft' : 'panright';
          }
          else if (_swipeRight) {
            _translateXString = _transform ? null : _translateX(_swipeRight);
            _event.additionalEvent = _transform > 0 ? 'panleft' : 'panright';
          }

          _emitSwipingEvent(this, _event);

          _element.style.transition = 'transform 0.2s ease-out';
          _element.style.transform = _translateXString;

          _emitSwipedEvent(this, _event);
        }
      }
    };

    function _emitSwipingEvent(context, event) {
      context.swiping.next({
        type: _SWIPING_TYPE,
        direction: event.additionalEvent == 'panleft' ? _SWIPE_TO_LEFT_DIRECTION : _SWIPE_TO_RIGHT_DIRECTION,
        target: event.target
      });
    };

    function _emitSwipedEvent(context, event) {
      context.swiped.next({
        type: _SWIPED_TYPE,
        direction: event.additionalEvent == 'panleft' ? _SWIPE_TO_LEFT_DIRECTION : _SWIPE_TO_RIGHT_DIRECTION,
        target: event.target
      });
    };

    function _getSwipeContent(element, parentClass) {
      if (element.className && element.className.indexOf(parentClass) > -1) {
        return element;
      }

      var currentNode, parentNode = element.parentNode;
      while (parentNode !== null) {
        currentNode = parentNode;
        if (currentNode.className && currentNode.className.indexOf(parentClass) > -1) {
          return currentNode;
        }
        parentNode = currentNode.parentNode;
      }

      return null;
    };

    function _getSwipeLeft(nativeElement) {
      return (nativeElement.getElementsByClassName(_SWIPE_LEFT_CLASS)[0] || {}).offsetWidth;
    };

    function _getSwipeRight(nativeElement) {
      return (nativeElement.getElementsByClassName(_SWIPE_RIGHT_CLASS)[0] || {}).offsetWidth;
    };

    function _getTransformValue(element) {
      return parseInt(element.style.transform.split(/[(px)]/)[1]) || 0;
    };

    function _translateX(value) {
      return 'translateX(' + value + 'px)';
    };

  })());
})(window.ngxBootstrap || (window.ngxBootstrap = {}));