//External Module
const express = require("express");

//local Module
const storeController = require("../controllers/storeController");
const restrictTo = require("../middlewares/restrictTo");

const storeRouter = express.Router();


storeRouter.use(restrictTo("guest"));

storeRouter.get("/homes",storeController.getHomes);

storeRouter.get("/bookings",storeController.getBookings);

storeRouter.get("/favorites",storeController.getFavouriteList);

storeRouter.post("/favorites",storeController.postFavouriteList);

storeRouter.get("/homes/:homeId",storeController.getHomeDetails);


module.exports = storeRouter;