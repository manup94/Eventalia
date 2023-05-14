const express = require('express');
const router = express.Router();
const Event = require('../models/event.model.js');

// Event list

router.get('/event', (req, res, next) => {
    res.render('event/event')
})

// Create Event//

router.get('/event-create', (req, res, next) => {
    res.render('event/event-create')
})





module.exports = router;