//core module
const path = require("path");

//External Module
const express = require("express");

//local Module
const rootdir = require("../utils/pathUtils");

const hostRouter = express.Router();
const hostController = require("../controllers/hostController");


hostRouter.get("/add-home", hostController.getAddHome);

hostRouter.post("/add-home",hostController.postAddHome);

hostRouter.get("/host-home-list",hostController.getHostHomes);

module.exports = {hostRouter};