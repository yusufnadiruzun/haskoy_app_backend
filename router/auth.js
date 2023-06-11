
const express = require('express')
const router = express.Router()
const { signup,login } = require("../controller/auth");

router.post("/v1/signup", signup);
router.post("/v1/login", login);

module.exports = router;