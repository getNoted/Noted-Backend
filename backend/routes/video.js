const express = require("express");
const router = express.Router();
const { readnotes, editName } = require("../controllers/notes/video");
router.get("/:videoname", readnotes);
router.post("/editname",editName);

module.exports = router;
