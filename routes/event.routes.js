const express = require('express');
const router = require("express").Router()
const User = require("../models/User.model")
const Event = require("../models/Event.model")

const { isLoggedIn, checkRoles } = require('../middlewares/route-guard');
const eventApiHandler = require('../services/event-api.services');

// event list
router.get('/list', isLoggedIn, (req, res, next) => {

    const promises = [
        Event.find(),
        eventApiHandler.getEvents()
    ]

    Promise
        .all(promises)
        .then(promiseResults => {

            const internalEvents = promiseResults[0]
            const externalEvents = promiseResults[1].data.results

            res.render('event/event-list', { internalEvents, externalEvents })
        })
        .catch(err => next(err))
})


// Create Event
router.get('/event-create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    res.render('event/event-create')
})

router.post('/event-create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {

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
router.get('/internalEvent/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params

    Event
        .findById(_id)
        .then(internalEvents => res.render('event/event-internal-detail', internalEvents))
        .catch(err => next(err))
})

router.get('/externalEvent/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    eventApiHandler
        .getOneEvent(id)
        .then(externalEvents => res.render('event/event-external-detail', { events: externalEvents.data.results }))
        .catch(err => next(err))
})


// Update
router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    Event
        .findById(id)
        .then(event => res.render("event/event-edit", event))
        .catch(err => console.log(err))
});

router.post('/:id/edit', (req, res, next) => {

    const { title, description, category, start, end, city, location, eventImg } = req.body
    const { id } = req.params

    Event
        .findByIdAndUpdate(id, { title, description, category, start, end, city, location, eventImg })
        .then(() => res.redirect('/'))
        .catch(() => next(err));
});

// Event favorites
router.get('/:id/add', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const currentIdUser = req.session.currentUser._id

    // PROMISE ALL
    Event
        .findByIdAndUpdate(id, { $push: { assistants: currentIdUser } })
        .then(() => {
            User
                .findByIdAndUpdate(currentIdUser, { $push: { events: id } })
                .then(res.redirect('/'))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));

});


router.get('/externalEvent/:id/add', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const currentIdUser = req.session.currentUser._id;

    User
        .findByIdAndUpdate(currentIdUser, { $push: { externalEvents: id } })
        .then(res.redirect('/'))
        .catch(err => console.log(err));
})



//Delete
router.post('/:id/delete', (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/event/list'))
        .catch(err => console.log(err))
})


module.exports = router