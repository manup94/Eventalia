const express = require('express');
const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render('index', {
    isAdmin: req.session.currentUser?.role === 'ADMIN'
  })
});

module.exports = router

