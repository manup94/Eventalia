require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");
const {loggedUsers} = require ('./middlewares/user-guard')

require("./config")(app);
require('./config/session.config')(app)

//For the navbar and user
app.use(loggedUsers)

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