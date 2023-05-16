require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();

require("./config")(app);
require('./config/session.config')(app)

app.use((req, res, next) => {

    if (req.session.currentUser) {
        next()
    }

})

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


require("./error-handling")(app);
module.exports = app;
