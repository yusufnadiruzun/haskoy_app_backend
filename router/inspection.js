const express = require("express");
const router = express.Router();

const{ createInspection, addInspection, deleteInspection,getAllInspection, getInspectionName,addInspectionBarcod, getInspection} = require("../controller/inspection");


router.post("/v1/createInspection", createInspection);
router.post("/v1/addInspection", addInspection);
router.post("/v1/deleteInspection", deleteInspection);
router.post("/v1/getInspection", getInspection);
router.get("/v1/getInspectionName", getInspectionName);
router.get("/v1/getAllInspection", getAllInspection);
router.get("/v1/addInspectionBarcod/:inspectionName/:date/:phone", addInspectionBarcod);

module.exports = router;