const express = require("express");
const controller = require("../controller/home-controller")
const router = express.Router()

router.get("/",controller.getHome)
router.get("/register", controller.getRegister)
router.post("/register", controller.postRegister)



module.exports = router