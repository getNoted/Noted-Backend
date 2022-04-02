const { Router, application } = require("express");
const express = require("express");
const router = express.Router();

// routes

const signup = require("./signup");
const signin = require("./signin");
const changepassword = require("./changepassword");
const createnotes=require('./createnotes');
const readtimestampnotes=require('./timestampnotes')

router.use("/v1/signup", signup);
router.use("/v1/signin", signin);
router.use("/v1/resetpassword", changepassword);

<<<<<<< HEAD
router.use('/v1/notes/timestamp/read',readtimestampnotes);
=======
>>>>>>> 59ba6c6f7964ed91d97dacba94761a72b055ac80
module.exports = router;
