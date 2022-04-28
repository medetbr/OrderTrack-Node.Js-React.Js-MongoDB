const express = require("express");
const UserController = require("../controllers/User");

const router = express.Router();

router.route("/").post(UserController.create)
router.route("/login").post(UserController.login)
router.route("/:id").get(UserController.getUser)
router.route("/:id").delete(UserController.delete)
router.route("/:id").patch(UserController.update)

module.exports = router;