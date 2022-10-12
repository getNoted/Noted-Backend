const express = require("express");
const router = express.Router();
const { readallvideos } = require("../controllers/notes/videos");
router.get("/", readallvideos);

module.exports = router;
