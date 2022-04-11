const express = require("express");
const router = express.Router();
const { deleteFolder, editFoldername } = require("../controllers/folders/folder");
router.post("/editname",editFoldername)
router.post("/delete", deleteFolder);
module.exports = router;
