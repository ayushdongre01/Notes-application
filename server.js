const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an instance of an Express app
const app = express();

// Set the port
const PORT = 3000;

// Serve static files like HTML, CSS, and JS
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse JSON data from POST requests
app.use(express.json());

// Array to store notes temporarily (could be saved to a file/database)
let notes = [];

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to get all notes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// Route to add a new note
app.post('/api/notes', (req, res) => {
    const { note } = req.body;
    if (note) {
        notes.push(note);
        saveNotesToFile(notes);
        res.status(201).json({ message: 'Note added successfully!' });
    } else {
        res.status(400).json({ message: 'Note content is required!' });
    }
});

// Route to delete a note
app.delete('/api/notes', (req, res) => {
    const { note } = req.body;
    const index = notes.indexOf(note);
    if (index !== -1) {
        notes.splice(index, 1);
        saveNotesToFile(notes);
        res.status(200).json({ message: 'Note deleted successfully!' });
    } else {
        res.status(404).json({ message: 'Note not found!' });
    }
});

// Function to save notes to a file
function saveNotesToFile(notes) {
    fs.writeFile(path.join(__dirname, 'notes.json'), JSON.stringify(notes, null, 2), (err) => {
        if (err) {
            console.error('Error saving notes:', err);
        } else {
            console.log('Notes saved to file');
        }
    });
}

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
