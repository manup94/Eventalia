const loggedUsers = (req, res, next) => {
    res.locals.loggedUsers = req.session.currentUser
    next()
}
module.exports = { loggedUsers } 