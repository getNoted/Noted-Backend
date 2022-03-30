const { Router, application } = require("express");
const express = require("express");
const router = express.Router();
// routes
const signup = require("./signup");
const signin = require("./signin");
const changepassword = require("./changepassword");
router.use("/v1/signup", signup);
router.use("/v1/signin", signin);
router.use("/v1/resetpassword", changepassword);
module.exports = router;
