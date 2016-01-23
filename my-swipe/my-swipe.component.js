(function (application) {
  (application.components || (application.components = {})).mySwipe = ng.core.Directive({
    selector: 'my-swipe'
  })
  .Class({
    constructor: [ng.core.ElementRef, ng.core.Renderer, function(ElementRef, Renderer) {
      this.ElementRef = ElementRef;
      console.log(ElementRef.nativeElement)
      this.Renderer = Renderer;
    }],
    ngAfterViewInit: function () {
      var manager, transform, defaultTransform, element;
      var widthActionSection = document.getElementsByClassName('swipe-actions')[0] && document.getElementsByClassName('swipe-actions')[0].offsetWidth;
      transform = 0;
      defaultTransform = 0;
      if(widthActionSection){
        manager = new Hammer.Manager(this.ElementRef.nativeElement, {
          recognizers: [
              [Hammer.Pan, { direction: Hammer.DIRECTION_HORIZONTAL }],
          ]
        });
        manager.on('panstart', function (e) {
          if(e.target.className == 'swipe-content'){
            element = e.target;
            defaultTransform = parseInt(element.style.transform.split(/[(px)]/)[1]) || 0;
          }
        });
        manager.on('pan', function (e) {
          transform = defaultTransform + e.deltaX;
          if(transform > 0){
            transform = 0;
          }
          element.style.transition = 'transform 0s ease-out';
          element.style.transform = 'translateX('+transform+'px)';          
        });
        manager.on('panend', function (e) {
          element.style.transition = null;
          if(transform <= -(widthActionSection / 2 ) ) {
            element.style.transform = 'translateX(-'+widthActionSection+'px)';
          }else if(transform > -(widthActionSection / 2)){
            element.style.transform = null;
          }
        });
        
      }
    }
  });

})(window.application || (window.application = {}));