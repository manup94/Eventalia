
const isLoggedIn = (req, res, next) => {
    req.session.currentUser ? next() : res.render('auth/login', { errorMessage: 'Inicia sesión para continuar' })
}

const isLoggedOut = (req, res, next) => {
    !req.session.currentUser ? next() : res.redirect('/event/event-list')
}

// const isAdminCheck = (req, res, next) => {
//     const isAdmin = req.session.currentUser.role === 'ADMIN';

//     if (!isAdmin) {
//         return res.status(403).json({ error: 'Acceso denegado' });
//     }
//     req.currentUser.isAdmin = true
//     next();
// };




module.exports = { isLoggedIn, isLoggedOut }
