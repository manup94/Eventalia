const loggedUsers = (req, res, next) => {

    const loggedUser = req.session.currentUser;
    const userAdmin = req.session.currentUser?.role;
    const userAvatar = req.session.currentUser?.avatar;

    if (loggedUser) {
        res.locals.loggedUser = loggedUser;
        res.locals.hideLogin = true;
        res.locals.hideSignUp = true;
    }
    if (userAdmin === 'ADMIN') {
        res.locals.isAdmin = true;
    }
    if (userAvatar) {
        res.locals.isAvatar = true;
        res.locals.avatarUrl = userAvatar;
    }
    next();
};

module.exports = { loggedUsers };