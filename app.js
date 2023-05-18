require("dotenv").config();
require("./db");

const express = require("express");
const hbs = require("hbs");
const app = express();
const session = require("express-session");

const { loggedUsers } = require('./middlewares/user-guard')

require("./config")(app);
require('./config/session.config')(app)

require("./routes/index")(app)
//     req.locals.isAdmin = req.session.currentUser?.role === 'ADMIN'
// app.use(loggedUsers);



require("./routes/index")(app)

require("./error-handling")(app)

module.exports = app;