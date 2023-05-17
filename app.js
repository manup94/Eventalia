require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");

require("./config")(app);
require('./config/session.config')(app)


// app.use((req, res, next) => {

//     // const loggedUser = req.session.currentUser;
//     // const userAdmin = req.session.currentUser?.role
//     // const userAvatar = req.session.currentUser?.avatar

//     // if (loggedUser) {
//     //     res.locals.hideLogin = true;
//     //     res.locals.hideSignUp = true;
//     // }

//     // if (userAdmin === 'ADMIN') res.locals.isAdmin = true;

//     // if (userAvatar) {
//     //     res.locals.isAvatar = true;
//     //     res.locals.avatarUrl = userAvatar;
//     // }

//     req.locals.loggedUser = req.session.currentUser
//     req.locals.isAdmin = req.session.currentUser?.role === 'ADMIN'

//     next();
// });


require("./routes/index")(app)

require("./error-handling")(app)

module.exports = app;