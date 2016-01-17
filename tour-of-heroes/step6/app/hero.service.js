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
      constructor: function() {},
      getHeroes: function() {
        return Promise.resolve(HEROES);
      },
      getHero: function(id) {
        return Promise.resolve(HEROES)
          .then(function(heroes){
            return HEROES.filter(function(hero){
              return hero.id == id;
            })[0];
          });
      }
    });
    
})(window.app || (window.app = {}));