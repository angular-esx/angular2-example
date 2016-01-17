(function (application, $) {
    application.noteDetailModule = function (myNotesStoreService) {
        var _myNotesStoreService = myNotesStoreService,
            _emtyNotebook;

        this.note = {};
        this.notebooks = [];

        this.save = function () {
            //ngModel work incorrectly with Materialize's select element. This code is used to get selected notebook's id
            var seletcedNotebookTitle = $($('.dropdown-content.select-dropdown li[class="active selected"] span')[0]).html();
            for (var i = 0; i < this.notebooks.length; i++) {
                if (this.notebooks[i].title == seletcedNotebookTitle) {
                    this.note.notebookId = this.notebooks[i].id;
                    break;
                }
            }

            _myNotesStoreService.addNote(this.note);
            $('#noteModal').closeModal();
        }

        this.init = function () {
            this.note = _myNotesStoreService.newNote();

            _emtyNotebook = _myNotesStoreService.newNotebook();
            _emtyNotebook.title = 'Add to notebook';

            var _notebooks = _myNotesStoreService.getNotebooks();
            _notebooks.splice(0, 0, _emtyNotebook);
            this.notebooks = _notebooks;
        }
    };
    application.noteDetailModule.prototype.ngOnInit = function () {
        this.init();
    };
    application.noteDetailModule.prototype.ngAfterViewInit = function () {
        var p = $('select').material_select();
    };
    application.noteDetailModule.annotations = [
        new ng.core.Component({
            selector: 'note-detail',
            templateUrl: '/modules/notes/detail/templates/note-detail.html'
        })
    ];
    application.noteDetailModule.parameters = [
       new ng.core.Inject(application.myNotesStoreService)
    ];
})(window.application || (window.application = {}), jQuery);