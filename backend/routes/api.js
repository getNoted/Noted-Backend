const { Router, application } = require("express");
const express = require("express");
const router = express.Router();

// routes
const signup=require('./signup');
router.use('/signup',signup);
module.exports = router;
