(function (application) {
    application.myNotesStoreService = function () {
        var _notebooks = {}, _notes = {},
            _lastNotebookId = 0, _lastNoteId = 0,
            _totalNotebooks = 0, _totalNotes = 0,
            _self = this;

        this.newNotebook = function () { return new _notebook(); }
        this.getNotebooks = function () {
            var notebooks = [];
            for (var prop in _notebooks) {
                notebooks.push(_notebooks[prop]);
            }

            return notebooks;
        }
        this.getNotebook = function (id) {
            return _notebooks[id];
        }
        this.countNotebooks = function () {
            return _totalNotebooks;
        };
        this.addNotebook = function (notebook) {
            notebook.id = ++_lastNotebookId;

            _notebooks[notebook.id] = notebook;

            _totalNotebooks++;
        }
        this.removeNotebook = function (notebook) {
            for (var i = 0; i < notebook.noteIds.length; i++) {
                delete _notes[notebook.noteIds[i]];
            }

            delete _notebooks[notebook.id];

            _totalNotebooks--;
        }


        this.newNote = function () { return new _note(); }
        this.getNotes = function () {
            var notes = [];
            for (var prop in _notes) {
                notes.push(_notes[prop]);
            }

            return notes;
        }
        this.getNote = function (id) {
            return _notes[id];
        }
        this.countNotes = function () {
            return _totalNotes;
        };
        this.addNote = function (note) {
            note.id = ++_lastNoteId;

            _notes[note.id] = note;

            _totalNotes++;

            if (note.notebookId) {
                _notebooks[note.notebookId].addNote(note);
            }
        }
        this.removeNote = function (note) {
            if (note.notebookId) {
                _notebooks[note.notebookId].removeNote(note);
            }

            delete _notes[note.id];

            _totalNotes--;
        }
        
        init();

        function _notebook(id, title) {
            this.id = id || 0;
            this.title = title;
            this.noteIds = [];
            this.totalNotes = 0;

            this.addNote = function (note) {
                this.noteIds.push(note.id);
                this.totalNotes++;
            }
            this.removeNote = function (note) {
                for (var i = 0; i < this.noteIds.length; i++) {
                    if (this.noteIds[i] == note.id) {
                        this.noteIds.splice(i, 1);
                        this.totalNotes--;
                        break;
                    }
                }
            }
        }
        function _note(id, title, description, notebookId) {
            this.id = id || 0;
            this.title = title;
            this.description = description;
            this.notebookId = notebookId || 0;
        }

        function init() {
            var noteBookIds = [], notebook;
            for (var i = 1; i <= 5; i++) {
                notebook = _self.newNotebook();
                notebook.title = 'Notebook ' + i;

                _self.addNotebook(notebook);

                noteBookIds.push(notebook.id);
            }

            var note;
            for (var i = 1; i <= 10; i++) {
                note = _self.newNote();
                note.title = 'Note ' + i;
                note.description = 'This is description of Note ' + i;
                note.notebookId = noteBookIds[Math.floor(Math.random() * noteBookIds.length)];

                _self.addNote(note);
            }
        }
    };
})(window.application || (window.application = {}));