const express = require("express");
const controller = require("../controller/home-controller")
const router = express.Router()
const product = require("./product")

router.get("/",controller.getHome)
router.get("/register", controller.getRegister)
router.post("/register", controller.postRegister)
router.get("/login", controller.getLogin)
router.post("/login", controller.postLogin)

router.use("/products", product)



module.exports = router