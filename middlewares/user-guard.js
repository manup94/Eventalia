const loggedUsers = (req, res, next) => {
    res.locals.loggedUsers = req.session.currentUser;
    next();
}

const checkRoles = (...admittedRoles) => (req, res, next) => {
    
    const isAdmitted = admittedRoles.includes(req.session.currentUser.role)
    
    if (isAdmitted) {
        next()
    } else {
        res.render('event/login', { errorMessage: 'Acceso no autorizado' })
    }
}

module.exports = { loggedUsers, checkRoles }