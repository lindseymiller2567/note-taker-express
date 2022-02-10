const express = require('express');
const app = express();

const notes = require('./db/db.json');

// get route
// get() method requires two arguments- first is string that describes the route the client will have to fetch from
// second is callback function that will execute every time that route is accessed with GET request
app.get('/api/notes', (req, res) => {
    // res.send('Hello!');
    res.json(notes);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});
