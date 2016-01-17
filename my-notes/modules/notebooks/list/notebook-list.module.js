(function (application, $) {
    application.notebookListModule = function (myNotesStoreService) {
        var _myNotesStoreService = myNotesStoreService;
        
        this.notebooks = [];

        this.remove = function (notebook) {
            _myNotesStoreService.removeNotebook(notebook);
            this.init();
        }

        this.init = function () {
            this.notebooks = _myNotesStoreService.getNotebooks();
        }
    };
    application.notebookListModule.prototype.ngOnInit = function () {
        this.init();
    };
    application.notebookListModule.prototype.ngAfterViewInit = function () {
        $('#addNotebook').leanModal({
            dismissible: false,
        })
        $('#addNote').leanModal({
            dismissible: false,
        });
        $('.tooltipped').tooltip();
    };
    application.notebookListModule.annotations = [
        new ng.core.Component({
            selector: 'notebook-list',
            templateUrl: '/modules/notebooks/list/templates/notebook-list.html',
            directives: [application.notebookDetailModule, application.noteDetailModule]
        })
    ];
    application.notebookListModule.parameters = [
        new ng.core.Inject(application.myNotesStoreService)
    ];
})(window.application || (window.application = {}), jQuery);