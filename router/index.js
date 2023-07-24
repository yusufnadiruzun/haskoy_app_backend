const express = require("express");
const router = express.Router();

const auth = require("./auth");
const permission = require("./permission");
const inspection = require("./inspection");

router.use("/auth",auth);
router.use("/permission",permission);
router.use("/inspection",inspection);

router.get("/deneme",(req,res) => {console.log("anan") ;res.send("deneme")});


module.exports = router;