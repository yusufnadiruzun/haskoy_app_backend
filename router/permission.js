const express = require("express");
const router = express.Router();

const permissionControl = require("../controller/permission");

router.post("/v1/permissionControl", permissionControl);

module.exports = router;