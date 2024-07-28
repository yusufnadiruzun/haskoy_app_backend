const express = require("express");
const router = express.Router();

const{ permissionControl,authorise,deletePermission, addPermission} = require("../controller/permission");


router.post("/v1/permissionControl", permissionControl);
router.post("/v1/authorise", authorise);
router.post("/v1/delete", deletePermission);
router.post("/v1/addPermission", addPermission);
module.exports = router;