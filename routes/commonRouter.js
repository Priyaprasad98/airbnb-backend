//External Module
const express = require("express");

//local Module
const commonController = require("../controllers/commonController");

const commonRouter = express.Router();

commonRouter.get("/", commonController.getIndex);

module.exports = commonRouter;
