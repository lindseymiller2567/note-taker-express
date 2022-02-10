const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const notes = require('./db/db.json');

// get route
// get() method requires two arguments- first is string that describes the route the client will have to fetch from
// second is callback function that will execute every time that route is accessed with GET request
app.get('/api/notes', (req, res) => {
    // res.send('Hello!');
    res.json(notes);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
