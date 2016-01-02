(function(app) {
  var HEROES = [
    { "id": 11, "name": "Mr. Nice" },
    { "id": 12, "name": "Narco" },
    { "id": 13, "name": "Bombasto" },
    { "id": 14, "name": "Celeritas" },
    { "id": 15, "name": "Magneta" },
    { "id": 16, "name": "RubberMan" },
    { "id": 17, "name": "Dynama" },
    { "id": 18, "name": "Dr IQ" },
    { "id": 19, "name": "Magma" },
    { "id": 20, "name": "Tornado" }
  ];

  app.HeroService = ng.core
    .Class({
      constructor: function() {
        
      },
      getHeroes: function() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve(HEROES);
          }, 2000) // 2 seconds
        });
      }
    });
    
})(window.app || (window.app = {}));