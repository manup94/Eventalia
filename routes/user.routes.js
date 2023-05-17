const express = require('express');
const router = require("express").Router()

const User = require("../models/User.model");
const { isLoggedIn } = require('../middlewares/route-guard');
// const { loggedUsers } = require('../middlewares/user-guard');

//Profile

router.get('/profile', isLoggedIn, (req, res) => {

    const { _id } = req.session.currentUser

    User
        .findById(_id).populate('events')
        .then(user => {
            res.render('user/profile', user)
        })
        .catch(err => next(err))
})

//Update
router.get('/:_id/edit', (req, res, next) => {

    const { _id } = req.session.currentUser

    User
        .findById(_id)
        .then(user => res.render("user/profile-edit", user))
        .catch(err => next(err))
});

router.post('/:_id/edit', (req, res, next) => {

    const { username, email, interests } = req.body

    const { _id } = req.session.currentUser

    const address = {
        city: req.body.city,
        zipcode: req.body.zipcode
    }

    User
        .findByIdAndUpdate(_id, { username, email, interests, address })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
});


//Delete
router.post('/:_id/delete', (req, res, next) => {

    const { _id } = req.session.currentUser

    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
});



module.exports = router;