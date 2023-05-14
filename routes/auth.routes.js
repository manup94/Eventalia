const express = require('express');
const router = express.Router();
const User = require("../models/User.model")

const bcrypt = require('bcryptjs')
const saltRounds = 10

//signup//
//render
router.get('/signup', (req, res, next) => res.render('auth/signup'))
//handler
router.post('/signup', (req, res, next) => {

    const { email, userPwd, username, avatar, interest } = req.body
    const address = {
        city: req.body.address.city,
        zipcode: req.body.address.zipcode
    }
    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ email, username, avatar, interest, password: hashedPassword }, { address }))
        .then(createdUser => res.redirect('/login'))
        .catch(error => next(error))
})

//Login//
router.get('/login', (req, res, next) => res.render('auth/login'))



module.exports = router;