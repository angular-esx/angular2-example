(function (app) {
	var CRISIS = [
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
	app.crisisService = ng.core.Class({
		constructor: function () {

		},
		getCrisises: function () {
			return Promise.resolve(CRISIS);
		},
		getCrisisById: function (id) {
			for (var index in CRISIS) {
				if (CRISIS[index].id === id) {
					return Promise.resolve(CRISIS[index]);
				}
			}
			return Promise.resolve(null);
		}
	});
})(window.app || (window.app = {}));