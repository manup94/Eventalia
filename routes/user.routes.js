const express = require('express');
const router = require("express").Router()


//Perfil
router.get('/user/profile', (req, res, next) => {
    res.render('user/profile')
})


module.exports = router;