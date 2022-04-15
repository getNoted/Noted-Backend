const express = require("express");
const router = express.Router();

const { createfolder,getFolders,deleteFolder, editFoldername } = require("../controllers/folders/folder");
router.post("/delete", deleteFolder);
router.post("/create", createfolder);
router.get("/getfolders", getFolders);
router.post("/editname",editFoldername);
module.exports = router;
