const express = require("express");
const router = express.Router();

const auth = require("./auth");
const permission = require("./permission");

router.use("/auth",auth);
router.use("/permission",permission);

module.exports = router;