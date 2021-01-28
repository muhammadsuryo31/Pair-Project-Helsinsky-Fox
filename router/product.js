const express = require("express")
const router = express.Router();
const controller = require("../controller/product-controller")

const mid = (req, res, next) => {
    if (req.session.AdminId){
        next()
    } else {
        res.redirect("/")
    }
}

router.use(mid)
router.get("/list", controller.getList)
router.get("/add", controller.getAdd)
router.post("/add", controller.postAdd)
router.get("/edit/:id", controller.getEdit)
router.post("/edit/:id", controller.postEdit)
router.get("/done/:id", controller.getDone)
router.get("/register", controller.getRegister)
router.post("/register", controller.postRegister)
router.get("/operator", controller.getOperator)
router.get("/addmaterial", controller.getAddMaterial)
router.post("/addmaterial", controller.postAddMaterial)
router.get("/material", controller.getMaterialList)
router.get("/detail/:id", controller.getDetail)
router.post("/detail/:id", controller.postDetail)
router.get("/material/restock/:id", controller.getRestock)
router.get("/usedmaterialplus/:productid/:materialid", controller.getUsedMaterialPlus)
router.get('/usedmaterialminus/:productid/:materialid', controller.getUsedMaterialMinus)
router.get("/logout", controller.logOut)

module.exports = router;