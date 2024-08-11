const express = require("express");
const router = express.Router();

const{ createInspection, addInspection, updateInspection,getStudentInspection,deleteInspection,getAllInspection, getInspectionName,addInspectionBarcod, getInspection} = require("../controller/inspection");


router.post("/v1/createInspection", createInspection);
router.post("/v1/addInspection", addInspection);
router.post("/v1/deleteInspection", deleteInspection);
router.post("/v1/getInspection", getInspection);
router.post("/v1/updateInspection", updateInspection);
router.post("/v1/getStudentInspection", getStudentInspection);
router.get("/v1/getInspectionName", getInspectionName);
router.get("/v1/getAllInspection", getAllInspection);
router.get("/v1/addInspectionBarcod/:inspectionName/:date/:phone", addInspectionBarcod);

module.exports = router;