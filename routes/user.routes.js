const express = require('express');
const router = require("express").Router()

const User = require("../models/User.model");
const { isLoggedIn } = require('../middlewares/route-guard');


//Profile
// router.get('/user/:_id', isLoggedIn, (req, res) => {
//     const id = req.session.currentUser._id
//     User
//         .findById(id)
//         .then(user => res.render('user/profile', user))
//         .catch(err => console.log(err))
// })

router.get('/user/profile', isLoggedIn, (req, res) => {
    const id = req.session.currentUser._id
    User
        .findById(id).populate('events')
        .then(user => {
            res.render('user/profile', user)
        })
        .catch(err => console.log(err))
})

//Update
router.get('/user/:_id/edit', (req, res, next) => {

    const id = req.session.currentUser._id
    User
        .findById(id)
        .then(user => res.render("user/profile-edit", user))
        .catch(err => console.log(err))
});

router.post('/user/:_id/edit', (req, res, next) => {

    const { username, email, interests } = req.body
    const { id } = req.session.currentUser._id
    const address = {
        city: req.body.city,
        zipcode: req.body.zipcode
    }
    User
        .findByIdAndUpdate(id, { username, email, interests, address })
        .then(() => res.redirect('/'))
        .catch(() => res.redirect(`/user/${id}/edit`))

});


//Delete
router.post('/user/:_id/delete', (req, res, next) => {

    const id = req.session.currentUser._id

    User
        .findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
});



module.exports = router;