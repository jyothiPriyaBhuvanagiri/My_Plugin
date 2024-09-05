chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'saveNote') {
        chrome.storage.local.get({ notes: [] }, function (result) {
            const notes = result.notes;
            notes.push(message.note);
            chrome.storage.local.set({ notes: notes }, function () {
                sendResponse({ success: true }); // Always send a response
            });
        });
        return true; // Indicates we will respond asynchronously
    } else {
        sendResponse({ success: false, error: 'Unknown message type' });
    }
});
