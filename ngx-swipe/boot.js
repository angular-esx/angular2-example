(function (application) {
    document.addEventListener('DOMContentLoaded', function () {
      ng.platform.browser.bootstrap(application.myApp, []);
  });
})(window.application || (window.application = {}));