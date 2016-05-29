(function (app) {

    app.dialogService = ng.core.Class({
        constructor: function () {

        },
        confirm: function (message) {
            return new Promise(function (resolve, reject) {
                return resolve(window.confirm(message || 'Is it OK?'));
            });
        }
    });
})(window.app || (window.app = {}));