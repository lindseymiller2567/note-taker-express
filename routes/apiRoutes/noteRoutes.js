const router = require('express').Router();
const { createNote, validateNote } = require('../../lib/notes');
const fs = require('fs');
const path = require('path');

const notes = require('../../db/db.json'); // notes database

const { v4: uuidv4 } = require('uuid'); // unique ID generator 

// get route
// get() method requires two arguments- first is string that describes the route the client will have to fetch from
// second is callback function that will execute every time that route is accessed with GET request
router.get('/notes', (req, res) => {

    fs.readFile(path.join(__dirname, '../../db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        // console.log(data)

        var notes = JSON.parse(data)
        // console.log(notes)

        res.json(notes);
    })

});

// post route
router.post('/notes', (req, res) => {
    // req.body is where our incoming content will be 
    // add in ID here
    req.body.id = uuidv4()

    //if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        // add note to json file and notes array in this function
        const note = createNote(req.body)
        res.json(note);
    }
})

module.exports = router;