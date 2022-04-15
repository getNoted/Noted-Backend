const express = require("express");
const router = express.Router();

const { readnotes, deleteVideo,editName,changeFolder } = require("../controllers/notes/video");
router.get("/:video_id", readnotes);
router.post('/delete',deleteVideo)
router.post("/editname",editName);
router.post("/changefolder",changeFolder);

module.exports = router;
