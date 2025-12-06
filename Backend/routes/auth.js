const express = require("express");
const router = express.Router();
const controller = require("../controllers/autcontroller");

router.post("/register", controller.register); //creation user
router.post("/login", controller.login); //login 

module.exports = router;