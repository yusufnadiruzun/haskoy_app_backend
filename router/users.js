const express = require("express");
const router = express.Router();

const {getUsers} = require("../controller/usersOperations");

router.get("/v1/getStudents",getUsers);

module.exports = router;