'use strict';

var express = require("express");
var ProductController = require("../Controllers/ProductController");
//var md_auth = require("../Middlewares/Authenticated");
var api = express.Router();



api.post("/get",  ProductController.getRole);
module.exports = api;