
const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}

const isLoggedOut = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/event/event-list')
}

module.exports = { isLoggedIn, isLoggedOut }
