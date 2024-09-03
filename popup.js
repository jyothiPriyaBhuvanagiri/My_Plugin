document.addEventListener('DOMContentLoaded', function () {
    const saveNoteButton = document.getElementById('save-note');
    const noteInput = document.getElementById('note-input');
    const notesList = document.getElementById('notes-list');

    if (saveNoteButton) { // Ensure the button element exists
        saveNoteButton.addEventListener('click', saveNote);
    } else {
        console.error("Save note button not found in the DOM.");
    }

    function loadNotes() {
        chrome.storage.local.get({ notes: [] }, function (result) {
            notesList.innerHTML = ''; // Clear existing notes
            result.notes.forEach((note, index) => {
                const noteItem = document.createElement('div');
                noteItem.className = 'note-item';
                noteItem.textContent = note;
                noteItem.addEventListener('click', function () {
                    deleteNote(index);
                });
                notesList.appendChild(noteItem);
            });
        });
    }

    function saveNote() {
        const newNote = noteInput.value.trim();
        if (newNote) {
            chrome.storage.local.get({ notes: [] }, function (result) {
                const notes = result.notes;
                notes.push(newNote);
                chrome.storage.local.set({ notes: notes }, function () {
                    noteInput.value = ''; // Clear the input field
                    loadNotes(); // Reload the notes
                });
            });
        }
    }

    function deleteNote(index) {
        chrome.storage.local.get({ notes: [] }, function (result) {
            const notes = result.notes;
            notes.splice(index, 1); // Remove the note at the specified index
            chrome.storage.local.set({ notes: notes }, function () {
                loadNotes(); // Reload the notes
            });
        });
    }

    loadNotes(); // Load notes when the popup is opened
});
