const express = require("express");
const router = express.Router();

const{addStudyTrack,getStudyTrack, updateStudyTrack,getClassStudents} = require("../controller/StudyTrack");


router.post("/v1/addStudyTrack", addStudyTrack);
router.post("/v1/getClassStudents", getClassStudents);
router.post("/v1/getStudyTrack", getStudyTrack);
router.post("/v1/updateStudyTrack", updateStudyTrack);
module.exports = router;