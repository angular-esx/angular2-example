(function (application) {
    application.noteListModule = function (myNotesStoreService) {
        var _myNotesStoreService = myNotesStoreService;

        this.notes = [];

        this.remove = function (note) {
            _myNotesStoreService.removeNote(note);
            this.init();
        }

        this.init = function () {
            this.notes = _myNotesStoreService.getNotes();
        }
    };
    application.noteListModule.prototype.ngOnInit = function () {
        this.init();
    };
    application.noteListModule.prototype.ngAfterViewInit = function () {
        $('#addNote').leanModal({
            dismissible: false,
        });
    };
    application.noteListModule.annotations = [
        new ng.core.Component({
            selector: 'note-list',
            templateUrl: '/modules/notes/list/templates/note-list.html',
            directives: [application.noteDetailModule]
        })
    ];
    application.noteListModule.parameters = [
        new ng.core.Inject(application.myNotesStoreService)
    ];
})(window.application || (window.application = {}));