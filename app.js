require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);
require('./config/session.config')(app)

<<<<<<< HEAD
const capitalize = require("./utils/capitalize");
const projectName = "Proyecto-2";

app.locals.appTitle = `${capitalize(projectName)}`;
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
=======
app.use((req, res, next) => {

    if (req.session.currentUser) {
        next()
    }

})
>>>>>>> 4246e107623ab0a026cf6d76a424068944851c1b

// Start handling routes
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/", eventRoutes);

const userRoutes = require("./routes/user.routes");
const session = require("express-session");
app.use("/", userRoutes);

const mapRoutes = require("./routes/map.routes");
app.use("/map", mapRoutes);

require("./error-handling")(app);
module.exports = app;
