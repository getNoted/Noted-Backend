const express = require("express");
const router = express.Router();
const { readnotes } = require("../controllers/notes/video");
router.get("/:videoname", readnotes);

module.exports = router;
