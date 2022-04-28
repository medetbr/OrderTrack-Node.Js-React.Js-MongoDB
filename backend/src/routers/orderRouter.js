const express = require("express");
const OrderController = require("../controllers/Order");

const router = express.Router();

router.route("/").post(OrderController.create)
router.route("/:id").get(OrderController.fetchOrder)
router.route("/find/:id").get(OrderController.getOrder)
router.route("/:id").delete(OrderController.delete)
router.route("/:id").patch(OrderController.update)


module.exports = router;