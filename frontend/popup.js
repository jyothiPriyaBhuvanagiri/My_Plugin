document.addEventListener('DOMContentLoaded', function () {
    const saveNoteButton = document.getElementById('save-note');
    const noteInput = document.getElementById('note-input');
    const notesList = document.getElementById('notes-list');

    if (saveNoteButton) {
        saveNoteButton.addEventListener('click', function () {
            const newNote = noteInput.value.trim();
            if (newNote) {
                fetch('http://localhost:3000/save-note', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ text: newNote })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            noteInput.value = ''; // Clear the input field
                            loadNotes(); // Reload notes after saving
                        } else {
                            console.error("Error saving note:", data.error);
                        }
                    });
            }
        });
    }

    function loadNotes() {
        fetch('http://localhost:3000/get-notes')
            .then(response => response.json())
            .then(notes => {
                notesList.innerHTML = ''; // Clear existing notes
                notes.forEach(note => {
                    const noteItem = document.createElement('div');
                    noteItem.className = 'note-item';
                    noteItem.textContent = note.text;
                    noteItem.addEventListener('click', function () {
                        deleteNote(note._id);
                    });
                    notesList.appendChild(noteItem);
                });
            });
    }

    function deleteNote(noteId) {
        fetch('http://localhost:3000/delete-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: noteId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    loadNotes(); // Reload the notes list after deletion
                } else {
                    console.error("Error deleting note:", data.error);
                }
            });
    }

    loadNotes(); // Load notes when the popup is opened
});
