const express = require('express');
const router = require("express").Router()
const Event = require("../models/Event.model")

const { isLoggedIn, isLoggedOut, checkRoles, checkUser } = require('../middlewares/route-guard');
const { formatedDate } = require('../utils/formatedDate');


// Event list

// router.get('/event/list', (req, res, next) => {
//     res.render('event/event')
// })

router.get('/event/list', (req, res, next) => {

    const userRole = {
        isUSER: req.session.currentUser?.role === 'USER',
        isADMIN: req.session.currentUser?.role === 'ADMIN'
    }

    Event
        .find()
        .then(allEvents => res.render('event/event', { userRole, event: allEvents }))
        .catch(err => console.log(err))
})


// Create Event//
// render
router.get('/event/create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    res.render('event/event-create')
})
//handler
router.post('/event/create', (req, res, next) => {
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

//Perfil
router.get('/user/profile', (req, res, next) => {
    res.render('user/profile')
})

module.exports = router;