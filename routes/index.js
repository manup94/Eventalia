module.exports = app => {

    const indexRouter = require("./index.routes");
    app.use("/", indexRouter);

    const authRouter = require("./auth.routes");
    app.use("/auth", authRouter);

    const eventRouter = require("./event.routes");
    app.use("/", eventRouter);

    const userRouter = require("./user.routes");
    app.use("/user", userRouter);

    const mapRouter = require("./map.routes");
    app.use("/map", mapRouter);

    const apiRouter = require("./api.routes");
    app.use("/api", apiRouter);
}