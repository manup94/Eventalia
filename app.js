require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);
require('./config/session.config')(app)

const capitalize = require("./utils/capitalize");
const projectName = "Proyecto-2";

app.locals.appTitle = `${capitalize(projectName)}`;

app.use((req, res, next) => {

    console.log('soy un middleware de bloque y hago lo que digas en cada peticion')
    next()
})

// Start handling routes
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const apiRoutes = require("./routes/api.routes");
app.use("/", apiRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/", eventRoutes);

const userRoutes = require("./routes/user.routes");
app.use("/", userRoutes);


require("./error-handling")(app);
module.exports = app;
