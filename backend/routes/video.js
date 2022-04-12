const express = require("express");
const router = express.Router();
const { readnotes, deleteVideo } = require("../controllers/notes/video");
router.get("/:video_id", readnotes);
router.post('/delete',deleteVideo)

module.exports = router;
