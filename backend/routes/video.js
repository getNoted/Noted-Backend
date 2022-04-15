const express = require("express");
const router = express.Router();
const { readnotes, editName } = require("../controllers/notes/video");
router.post("/editname",editName);
router.get("/:video_id", readnotes);
module.exports = router;
