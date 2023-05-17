require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");

require("./config")(app);
require('./config/session.config')(app)


app.use((req, res, next) => {

    // const loggedUser = req.session.currentUser;
    // const userAdmin = req.session.currentUser?.role
    // const userAvatar = req.session.currentUser?.avatar

    // if (loggedUser) {
    //     res.locals.hideLogin = true;
    //     res.locals.hideSignUp = true;
    // }

    // if (userAdmin === 'ADMIN') res.locals.isAdmin = true;

    // if (userAvatar) {
    //     res.locals.isAvatar = true;
    //     res.locals.avatarUrl = userAvatar;
    // }

    req.locals.loggedUser = req.session.currentUser
    req.locals.isAdmin = req.session.currentUser?.role === 'ADMIN'

    next();
});

// Start handling routes
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/event", eventRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);

const mapRoutes = require("./routes/map.routes");
app.use("/map", mapRoutes);

require("./error-handling")(app)

module.exports = app;