
const express = require('express')
const router = express.Router()
const { signup,login,deleteUser } = require("../controller/auth");

router.post("/v1/signup", signup);
router.post("/v1/login", login);
router.delete("/v1/deleteUser",deleteUser)
module.exports = router;