const express = require("express");
const router = express.Router();

const{ createInspection, addInspection, deleteInspection} = require("../controller/inspection");


router.post("/v1/createInspection", createInspection);
router.post("/v1/addInspection", addInspection);
router.post("/v1/deleteInspection", deleteInspection);

module.exports = router;