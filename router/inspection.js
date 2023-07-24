const express = require("express");
const router = express.Router();

const{ createInspection} = require("../controller/inspection");


router.post("/v1/createInspection", createInspection);

module.exports = router;