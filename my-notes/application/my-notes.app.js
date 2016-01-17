(function (application) {
    application.myNotesApp = function (router) {
        var _router = router;
        
        this.goToNotebookList = function () {
            _router.navigate(['NotebookList']);
        }
    };
    application.myNotesApp.prototype.ngAfterViewInit = function () {
        this.goToNotebookList();
    };
    application.myNotesApp.annotations = [
        new ng.core.Component({
            selector: 'my-notes-app',
            templateUrl: '/application/templates/my-notes.html',
            directives: [application.navbarComponent, application.sidebarComponent, ng.router.ROUTER_DIRECTIVES]
        }),
        new ng.router.RouteConfig([
            { path: '/notebooks', name: 'NotebookList', component: application.notebookListModule },
            { path: '/notes', name: 'NoteList', component: application.noteListModule }
        ])
    ];
    application.myNotesApp.parameters = [
        new ng.core.Inject(ng.router.Router)
    ];
    
})(window.application || (window.application = {}));