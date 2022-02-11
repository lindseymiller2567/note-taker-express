const fs = require('fs');
const path = require('path');

const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// make public folder static
app.use(express.static('public'));

const notes = require('./db/db.json');

function createNote(body, notesArray) {
    console.log("body: " + body);
    console.log("the notes array: " + notesArray);

    const note = body;

    notesArray.push(note);

    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );

    console.log("dirname: " + __dirname);

    // return finished code to post route for response
    return body;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}

// get route
// get() method requires two arguments- first is string that describes the route the client will have to fetch from
// second is callback function that will execute every time that route is accessed with GET request
app.get('/api/notes', (req, res) => {
    // res.send('Hello!');
    res.json(notes);
});

// post route
app.post('/api/notes', (req, res) => {
    // req.body is where our incoming content will be 
    console.log(req.body);

    // add in ID here
    // function code... 

    // //if any data in req.body is incorrect, send 400 error back
    // if (!validateNote(req.body)) {
    //     res.status(400).send('The note is not properly formatted.');
    // } else {
    //     // add note to json file and notes array in this function
    //     const note = createNote(req.body, notes)

    //     res.json(note);
    // }

    const note = createNote(req.body, notes)

    res.json(note);
})

// get route for displaying frontend landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// get route for displaying frontend note page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

// get route for displaying all other pages
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
})

// app listen should always be last in your code
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
