const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// middleware functions 
app.use(express.urlencoded({ extended: true })); // parse incoming string or array data
app.use(express.json()); // parse incoming JSON data
app.use(express.static('public')); // make public folder static

// use routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// app listen should always be last in your code
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});