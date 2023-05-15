const express = require('express');
const router = require("express").Router()
const Event = require('../models/event.model.js');

// Event list

router.get('/event/list', (req, res, next) => {
    res.render('event/event')
})

// Create Event

router.get('/event/event-create', (req, res, next) => {
    res.render('event/event-create')
})


//Perfil
router.get('/user/profile', (req, res, next) => {
    res.render('user/profile')
})

module.exports = router;