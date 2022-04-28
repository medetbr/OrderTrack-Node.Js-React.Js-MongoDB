const express = require("express");
const ShopController = require("../controllers/Shop");

const router = express.Router();

router.route("/").post(ShopController.create)
// router.route("/addMeal/:id").post(ShopController.addMeal)
// router.route("/addDrink/:id").post(ShopController.addDrink)
router.route("/:id").get(ShopController.getShopOne)
router.route("/").get(ShopController.getShopList)
router.route("/:id").delete(ShopController.delete)
router.route("/:id").patch(ShopController.update)
router.route("/userShop/:id").get(ShopController.findUserShop)


module.exports = router;