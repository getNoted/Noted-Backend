const express = require("express");
const router = express.Router();

const { createfolder,getFolders,deleteFolder, editFoldername,getVideos } = require("../controllers/folders/folder");
router.post("/delete", deleteFolder);
router.post("/create", createfolder);
router.get("/getfolders", getFolders);
router.post("/editname",editFoldername);
router.post("/getvideos",getVideos);
module.exports = router;
