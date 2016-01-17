(function (application) {
    document.addEventListener('DOMContentLoaded', function () {
        ng.platform.browser.bootstrap(application.myNotesApp, [
            ng.router.ROUTER_PROVIDERS,
            application.myNotesStoreService
        ]);
  });
})(window.application || (window.application = {}));