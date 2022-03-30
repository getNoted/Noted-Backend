const { Router, application } = require("express");
const express = require("express");
const router = express.Router();
// routes
const signup=require('./signup');
const signin=require('./signin');
router.use('/v1/signup',signup);
router.use('/v1/signin',signin);
module.exports = router;
