require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");

require("./config")(app);
require('./config/session.config')(app)

app.use((req, res, next) => {
    const loggedUser = req.session.currentUser;
    if (loggedUser) {
        res.locals.hideLogin = true;
        res.locals.hideRegister = true;
    } else {
        res.locals.hideProfile = true;
        res.locals.hideLogout = true;
    }
    next();
});

// Start handling routes
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/", eventRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);


const mapRoutes = require("./routes/map.routes");
app.use("/map", mapRoutes);

require("./error-handling")(app);
module.exports = app;
