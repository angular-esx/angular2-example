(function (app) {
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
	app.heroService = ng.core.Class({
		constructor: function () {

		},
		getHeroes: function () {
			return Promise.resolve(HEROES);
			//return HEROES;
		},
		getHeroById: function (id) {
			for (var index in HEROES) {
				if (HEROES[index].id === id) {
					return Promise.resolve(HEROES[index]);
				}
			}
			return Promise.resolve(null);
		}
	});
})(window.app || (window.app = {}));