const express = require('express');
const router = require("express").Router()
const Event = require("../models/Event.model")

const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');
const eventApiHandler = require('../services/event-api.services');

// event list
router.get('/event/list', isLoggedIn, (req, res, next) => {

    const userRole = {
        isUser: req.session.currentUser?.role === 'USER',
        isAdmin: req.session.currentUser?.role === 'ADMIN'
    }

    const promises = [
        Event.find(),
        eventApiHandler.getEvents()
    ]

    Promise
        .all(promises)
        .then(promiseResults => {

            const internalEvents = promiseResults[0]
            const extrernalEvents = promiseResults[1].data.results

            res.render('event/event-list', { internalEvents, extrernalEvents })
        })
        .catch(err => next(err))
})


// Create Event//
router.get('/event/event-create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    res.render('event/event-create')

})
router.post('/event/event-create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    const { title, description, category, start, end, city, lat, lng, eventImg, } = req.body;
    const location = {
        type: 'Point',
        coordinates: [lat, lng],
        city
    }
    Event
        .create({ title, description, category, start, end, city, location, eventImg })
        .then(res.redirect('/event/list'))
        .catch(err => console.log(err));

})

// Details


router.get('/event/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params

    // res.send(_id)

    const promises = [
        Event.findById(_id),
        eventApiHandler.getOneEvent(_id)
    ]

    Promise
        .all(promises)
        .then(promiseResults => {

            const internalEvent = promiseResults[0]
            const extrernalEvent = promiseResults[1].data.results

            res.render('event/event-detail', { internalEvent, extrernalEvent })
        })
        .catch(err => next(err))

})
// Update
router.get('/event/:id/edit', (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .then(event => res.render("event/event-edit", event))
        .catch(err => console.log(err))
});

router.post('/event/:id/edit', (req, res, next) => {
    const { title, description, category, start, end, city, location, eventImg } = req.body
    const { id } = req.params

    // res.send(id)

    Event
        .findByIdAndUpdate(id, { title, description, category, start, end, city, location, eventImg })
        .then(() => res.redirect('/'))
        .catch(() => res.redirect(`/event/${id}/edit`));
});

//Delete
router.post('/event/:id/delete', (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/event/list'))
        .catch(err => console.log(err))
});



module.exports = router