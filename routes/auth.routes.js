const express = require('express');
const router = express.Router();
const User = require("../models/User.model")

const bcrypt = require('bcryptjs')
const saltRounds = 10

//signup//
//render
router.get('/signup', (req, res, next) => res.render('auth/signup'))
//handler
router.post('')



module.exports = router;