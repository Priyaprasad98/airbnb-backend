//External Module
const express = require("express");

//local module
const authController = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get("/login", authController.getLogin);

authRouter.post("/login", authController.postLogin);

authRouter.post("/logout", authController.postLogout);

authRouter.get("/signup", authController.getsignup);

module.exports = authRouter;