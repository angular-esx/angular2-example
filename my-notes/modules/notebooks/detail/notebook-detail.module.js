(function (application) {
    application.notebookDetailModule = function (myNotesStoreService) {
        var _myNotesStoreService = myNotesStoreService;

        this.notebook = {};

        this.save = function () {
            _myNotesStoreService.addNotebook(this.notebook);
            $('#notebookModal').closeModal();
        }

        this.init = function () {
            this.notebook = _myNotesStoreService.newNotebook();
        }
    };
    application.notebookDetailModule.prototype.ngOnInit = function () {
        this.init();
    };
    application.notebookDetailModule.annotations = [
        new ng.core.Component({
            selector: 'notebook-detail',
            templateUrl: '/modules/notebooks/detail/templates/notebook-detail.html'
        })
    ];
    application.notebookDetailModule.parameters = [
        new ng.core.Inject(application.myNotesStoreService)
    ];
})(window.application || (window.application = {}));