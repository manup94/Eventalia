const express = require('express');
const router = require("express").Router()
const User = require("../models/User.model")
const Event = require("../models/Event.model")

const { isLoggedIn } = require('../../middlewares/route-guard');
const { checkRoles } = require('../../middlewares/user-guard');
const eventApiHandler = require('../../services/event-api.services');
const { formatDate } = require('../../utils/formatDate');


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

            const newInternal = internalEvents.map(elm => {
                const newStart = formatDate(elm.start)
                const newEnd = formatDate(elm.end)

                return { ...elm.toObject(), start: newStart, end: newEnd }
            });



            res.render('event/event-list', { newInternal, externalEvents })
        })
        .catch(err => next(err))
})


// Create Event
router.get('/event/event-create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {
    res.render('event/event-create')
})

router.post('/event/event-create', isLoggedIn, checkRoles('ADMIN'), (req, res, next) => {


    const { title, description, category, start, end, city, lat, lng, eventImg, } = req.body;

    const startFormated = formatDate(start);
    console.log(startFormated);

    const location = {
        type: 'Point',
        coordinates: [lat, lng],
        city
    }

    Event
        .create({ title, description, category, start, end, city, location, eventImg })
        .then(res.redirect('/list'))
        .catch(err => next(err));
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
        .catch(err => next(err))
});

router.post('/:id/edit', (req, res, next) => {

    const { title, description, category, start, end, city, location, eventImg } = req.body
    const { id } = req.params

    Event
        .findByIdAndUpdate(id, { title, description, category, start, end, city, location, eventImg })
        .then(() => res.redirect('/'))
        .catch(err => next(err));
});

// Event favorites
router.get('/:id/add', isLoggedIn, (req, res, next) => {

    const { id } = req.params
    const currentIdUser = req.session.currentUser._id

    // PROMISE ALL
    Promise.all([
        Event.findByIdAndUpdate(id, { $push: { assistants: currentIdUser } }),
        User.findByIdAndUpdate(currentIdUser, { $push: { events: id } })
    ])
        .then(res.redirect('/user/profile'))
        .catch(err => next(err));
})



//Delete
router.post('/:id/delete', (req, res, next) => {

    const { id } = req.params

    Event
        .findByIdAndDelete(id)
        .then(() => res.redirect('/list'))
        .catch(err => next(err))
})


module.exports = router