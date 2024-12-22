// Select elements from the DOM
const noteContainer = document.getElementById('note-container');
const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');

// Event listener for adding notes
addNoteBtn.addEventListener('click', function() {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        addNoteToUI(noteText);
        noteInput.value = ''; // Clear the textarea
    } else {
        alert('Please write something before adding a note!');
    }
});

// Function to create and add a note to the UI
function addNoteToUI(noteText) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');

    const noteTextDiv = document.createElement('div');
    noteTextDiv.classList.add('note-text');
    noteTextDiv.textContent = noteText;

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    
    // Event listener for the delete button
    deleteBtn.addEventListener('click', function() {
        noteDiv.remove();
    });

    // Append the text and delete button to the note
    noteDiv.appendChild(noteTextDiv);
    noteDiv.appendChild(deleteBtn);

    // Append the note to the container
    noteContainer.appendChild(noteDiv);
}

// Generate falling items (pages, pens, feathers)
function generateFallingItems() {
    for (let i = 0; i < 20; i++) {
        const itemType = ['page', 'pen', 'feather'];
        const item = document.createElement('div');
        item.classList.add(itemType[Math.floor(Math.random() * itemType.length)]);
        
        // Set a random left position (value between 0 and 1)
        item.style.setProperty('--randX', Math.random());

        document.body.appendChild(item);
    }
}

// Call the function to add falling items when the page loads
generateFallingItems();
