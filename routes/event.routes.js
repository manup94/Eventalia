const express = require('express');
const router = require("express").Router()
const Event = require("../models/Event.model")

const { isLoggedIn, checkRoles } = require('../middlewares/route-guard')

// event list
router.get('/event/list', isLoggedIn, (req, res, next) => {

    const userRole = {
        isUser: req.session.currentUser?.role === 'USER',
        isAdmin: req.session.currentUser?.role === 'ADMIN'
    }

    Event
        .find()
        .then(allEvents => res.render('event/event', { event: allEvents }))
        .catch(err => console.log(err))
})


// Create Event//
// render
router.get('/event/event-create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    res.render('event/event-create')

})
//handler
router.post('/event/event-create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    const { title, description, category, start, end, city, lat, lng, eventImg, } = req.body;
    const location = {
        type: 'Point',
        coordinates: [lat, lng]
    }
    Event
        .create({ title, description, category, start, end, city, location, eventImg })
        .then(res.redirect('/event/list'))
        .catch(err => console.log(err));

})



module.exports = router;