(function (application, $) {
    application.navbarComponent = function () {

    };
    application.navbarComponent.prototype.ngAfterViewInit = function () {
        $(".button-collapse").sideNav();
    };
    application.navbarComponent.annotations = [
        new ng.core.Component({
            selector: 'nav-bar',
            templateUrl: '/application/components/navbar/templates/navbar.html'
        })
    ];
})(window.application || (window.application = {}), jQuery);