const express = require('express');
const router = require("express").Router()
const User = require("../models/User.model")


const bcrypt = require('bcryptjs')
const saltRounds = 10

//signup render
router.get('/auth/signup', (req, res, next) => res.render('auth/signup'))

//handler
router.post('/auth/signup', (req, res, next) => {


    const { email, userPwd, username, avatar, interests } = req.body

    const address = {
        city: req.body.city,
        zipcode: req.body.zipcode
    }

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPwd, salt))
        .then(hashedPassword => User.create({ email, username, avatar, interests, password: hashedPassword, address }))
        .then(createdUser => res.redirect('/auth/login'))
        .catch(err => next(err))
})

//Login render
router.get('/auth/login', (req, res, next) => res.render('auth/login'))

//handler
router.post('/auth/login', (req, res, next) => {

    const { email, userPwd } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado en la Base de Datos' })
                return
            } else if (bcrypt.compareSync(userPwd, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(err => next(err))
})

//Logout
router.post('/auth/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/'))
})



module.exports = router;