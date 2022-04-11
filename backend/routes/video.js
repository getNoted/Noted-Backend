const express = require("express");
const router = express.Router();
const { readnotes } = require("../controllers/notes/video");
router.get("/:video_id", readnotes);

module.exports = router;
