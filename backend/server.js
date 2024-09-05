const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');




const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors());  // This enables CORS for all routes

// Connect to MongoDB (you can replace this with your preferred database)
mongoose.connect('mongodb://localhost:27017/notesDB', { useNewUrlParser: true, useUnifiedTopology:true });

// Define a schema for notes
const noteSchema = new mongoose.Schema({
    text: String,
    deleted: Boolean
});

const Note = mongoose.model('Note', noteSchema);

// API to save a new note
app.post('/save-note', (req, res) => {
    const newNote = new Note({
        text: req.body.text,
        deleted: false
    });
    console.log("Saving new note:", newNote);
    newNote.save().then(() => res.json({ success: true })).catch(err => res.json({ success: false, error: err }));
});

// API to get all notes
app.get('/get-notes', (req, res) => {
    Note.find({ deleted: false }).then(notes => res.json(notes)).catch(err => res.json({ success: false, error: err }));
});

// API to delete a note (move it to deleted)
app.post('/delete-note', (req, res) => {
    Note.findByIdAndUpdate(req.body.id, { deleted: true }).then(() => res.json({ success: true })).catch(err => res.json({ success: false, error: err }));
});

app.listen(3000, () => console.log('Server is running on port 3000'));
