document.addEventListener('DOMContentLoaded', function () {
    const saveNoteButton = document.getElementById('save-note');
    const noteInput = document.getElementById('note-input');
    const notesList = document.getElementById('notes-list');

    if (saveNoteButton) {
        saveNoteButton.addEventListener('click', function () {
            const newNote = noteInput.value.trim();
            if (newNote) {
                chrome.storage.local.get({ notes: [] }, function (result) {
                    const notes = result.notes;
                    notes.push(newNote);
                    chrome.storage.local.set({ notes: notes }, function () {
                        noteInput.value = ''; // Clear the input field
                        displayNotes(notes); // Display the updated notes list
                    });
                });
            }
        });
    } else {
        console.error("Save note button not found in the DOM.");
    }

    function loadNotes() {
        chrome.storage.local.get({ notes: [] }, function (result) {
            displayNotes(result.notes);
        });
    }

    function displayNotes(notes) {
        notesList.innerHTML = ''; // Clear the existing notes
        notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.textContent = note;
            noteItem.addEventListener('click', function () {
                deleteNote(index);
            });
            notesList.appendChild(noteItem);
        });
    }

    function deleteNote(index) {
        chrome.storage.local.get({ notes: [] }, function (result) {
            const notes = result.notes;
            notes.splice(index, 1); // Remove the note at the specified index
            chrome.storage.local.set({ notes: notes }, function () {
                displayNotes(notes); // Update the displayed list
            });
        });
    }

    loadNotes(); // Load notes when the popup is opened
});
