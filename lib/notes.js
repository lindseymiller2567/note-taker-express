const fs = require('fs');
const path = require('path');

function createNote(body) {
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        var notesArray = JSON.parse(data)

        const note = body;
        notesArray.push(note);

        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'), // where and what to save the file
            JSON.stringify(notesArray, null, 2),  // in what format to save the file as
        );

        // return finished code to post route for response
        return body;
    })
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    if (!note.id || typeof note.id !== 'string') {
        return false;
    }
    return true;
}

module.exports = {
    createNote,
    validateNote,
};