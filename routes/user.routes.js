const express = require('express');
const router = require("express").Router()

const User = require("../models/User.model");
const { isLoggedIn } = require('../middlewares/route-guard');


//Perfil

router.get('/user/:_id', isLoggedIn, (req, res) => {
    const id = req.session.currentUser._id
    User.findById(id)
        .then(user => res.render('user/profile', user))
        .catch(err => console.log(err))
})

//Update




//Delete






module.exports = router;