(function(app) {
  app.HighlightDirective = ng.core
    .Directive({
      selector: '[myHighlight]',
      host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()'
      },
      inputs: ['highlightColor: myHighlight', '_defaultColor: defaultColor']
    })
    .Class({
      constructor: [ng.core.ElementRef, ng.core.Renderer, function(ElementRef, Renderer) {
        this.el = ElementRef;
        this.renderer = Renderer;
        this._defaultColor = 'red';
      }],
      defaultColor: function(colorName) {
        this._defaultColor = colorName || this._defaultColor;
      },
      onMouseEnter: function() { 
        this._highlight(this.highlightColor || this._defaultColor);
      },
      onMouseLeave: function() { 
        this._highlight(null); 
      },
      _highlight: function(color) {
        this.renderer.setElementStyle(this.el, 'backgroundColor', color);
      }
    })
})(window.app || (window.app = {}));