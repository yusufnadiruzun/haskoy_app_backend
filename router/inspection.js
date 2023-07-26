const express = require("express");
const router = express.Router();

const{ createInspection, addInspection, deleteInspection, getInspectionName,addInspectionBarcod} = require("../controller/inspection");


router.post("/v1/createInspection", createInspection);
router.post("/v1/addInspection", addInspection);
router.post("/v1/deleteInspection", deleteInspection);
router.get("/v1/getInspectionName", getInspectionName);
router.get("/v1/addInspectionBarcod/:inspectionName/:date/:phone", addInspectionBarcod);
module.exports = router;