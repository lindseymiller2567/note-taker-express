const router = require('express').Router();
const path = require('path');

// get route for displaying frontend landing page
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})

// get route for displaying frontend note page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/notes.html'))
})

// get route for displaying all other pages
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
})

module.exports = router;