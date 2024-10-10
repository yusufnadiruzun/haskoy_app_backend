const express = require("express");
const router = express.Router();

const auth = require("./auth");
const permission = require("./permission");
const inspection = require("./inspection");
const users = require("./users");
const studytrack = require("./StudyTrack");

router.use("/auth",auth);
router.use("/permission",permission);
router.use("/inspection",inspection);
router.use("/user",users);
router.use("/studytrack",studytrack);

module.exports = router;