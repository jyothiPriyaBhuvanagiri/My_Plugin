document.addEventListener('DOMContentLoaded', function() {
    loadNotes();

    document.getElementById('bold-btn').addEventListener('click', function() {
        applyStyle('bold');
    });

    document.getElementById('italic-btn').addEventListener('click', function() {
        applyStyle('italic');
    });

    document.getElementById('bullet-btn').addEventListener('click', function() {
        insertBullet();
    });

    document.getElementById('save-btn').addEventListener('click', function() {
        saveNote();
    });

    // Make the textarea contenteditable
    const noteArea = document.getElementById('note-area');
    noteArea.contentEditable = true;
});

function applyStyle(style) {
    const noteArea = document.getElementById('note-area');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (!range || range.collapsed) return; // No text selected

    let span = document.createElement('span');

    switch (style) {
        case 'bold':
            span.style.fontWeight = 'bold';
            break;
        case 'italic':
            span.style.fontStyle = 'italic';
            break;
    }

    range.surroundContents(span);
}

function insertBullet() {
    const noteArea = document.getElementById('note-area');
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);

    if (!range || range.collapsed) return; // No text selected

    let ul = document.createElement('ul');
    let li = document.createElement('li');

    li.textContent = range.toString();
    ul.appendChild(li);

    range.deleteContents();
    range.insertNode(ul);
}

function saveNote() {
    const noteArea = document.getElementById('note-area');
    const noteContent = noteArea.innerHTML; // Save the formatted content as HTML

    if (noteContent) {
        chrome.storage.local.get({notes: []}, function(result) {
            const notes = result.notes;
            notes.push(noteContent);
            chrome.storage.local.set({notes: notes}, function() {
                noteArea.innerHTML = ''; // Clear the textarea after saving
                loadNotes();
            });
        });
    }
}

function loadNotes() {
    chrome.storage.local.get({notes: []}, function(result) {
        const notesList = document.getElementById('notes-list');
        notesList.innerHTML = '';
        result.notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.innerHTML = note;
            noteItem.addEventListener('click', function() {
                deleteNote(index);
            });
            notesList.appendChild(noteItem);
        });
    });
}

function deleteNote(index) {
    chrome.storage.local.get({notes: []}, function(result) {
        const notes = result.notes;
        notes.splice(index, 1);
        chrome.storage.local.set({notes: notes}, function() {
            loadNotes();
        });
    });
}
