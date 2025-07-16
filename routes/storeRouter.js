//core Module
const path = require("path");

//External Module
const express = require("express");

//local Module
const storeRouter = express.Router();
const storeController = require("../controllers/storeController");

storeRouter.get("/",storeController.getIndex);

storeRouter.get("/homes",storeController.getHomes);

storeRouter.get("/bookings",storeController.getBookings);

storeRouter.get("/favorites",storeController.getFavouriteList);

storeRouter.post("/favorites",storeController.postFavouriteList);

storeRouter.get("/homes/:homeId",storeController.getHomeDetails);


module.exports = storeRouter;