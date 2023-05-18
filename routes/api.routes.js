const express = require('express');
const router = express.Router();

// const Event = require("../models/Event.model")


router.get("/internalEvent/:event_id", (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => res.json(event))
        .catch(err => next(err))
})


module.exports = router