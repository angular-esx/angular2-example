(function (application) {
    application.sidebarComponent = function (router, myNotesStoreService) {
        var _router = router;
        var _myNotesStoreService = myNotesStoreService;

        this.totalNotebooks = 0;
        this.totalNotes = 0;

        this.goToNotebookList = function () {
            _router.navigate(['NotebookList']);
            $(".button-collapse").sideNav('hide');
        }
        this.goToNoteList = function () {
            _router.navigate(['NoteList']);
            $(".button-collapse").sideNav('hide');
        }

        this.init = function () {
            this.totalNotebooks = _myNotesStoreService.countNotebooks();
            this.totalNotes = _myNotesStoreService.countNotes();
        }
    };
    application.sidebarComponent.prototype.ngOnInit = function () {
        this.init();
    };
    application.sidebarComponent.annotations = [
        new ng.core.Component({
            selector: 'side-bar',
            templateUrl: '/application/components/sidebar/templates/sidebar.html'
        })
    ];
    application.sidebarComponent.parameters = [
        new ng.core.Inject(ng.router.Router),
        new ng.core.Inject(application.myNotesStoreService)
    ];

})(window.application || (window.application = {}));