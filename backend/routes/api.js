const { Router, application } = require("express");
const express = require("express");
const router = express.Router();

// routes

const signup = require("./signup");
const signin = require("./signin");
const changepassword = require("./changepassword");
const createnotes = require("./createnotes");
const readtimestampnotes = require("./timestampnotes");
const video = require("./video");
const deletetimestamp=require("./deletetimestampnotes");
const videos = require("./videos");
const updatenotes = require("./updatenotes");
const timestamp= require('./timestamp');

router.use("/v1/signup", signup);
router.use("/v1/signin", signin);
router.use("/v1/resetpassword", changepassword);
router.use("/v1/notes/timestamp", timestamp);
router.use("/v1/video", video);
router.use("/v1/videos",videos);
module.exports = router;
