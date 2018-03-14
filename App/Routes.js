'use strict';
/*var express = require("express");
var app = express();

var user_routes = require("./Routes/User");

export.

app.use("/api", user_routes);*/

var userRoute = require("./Routes/User");
var roleRoute = require("./Routes/Role");
exports.assignRoutes = function (app) {
    // user Routes
    app.use('/user', userRoute);
    // role rputes
    app.use('/role', roleRoute);
}