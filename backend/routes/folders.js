const express = require("express");
const router = express.Router();
const { deleteFolder } = require("../controllers/folders/folder");
const { createfolder } = require("../controllers/folders/folder"); 
const { getFolders } = require("../controllers/folders/folder");
router.post("/delete", deleteFolder);
router.post("/create", createfolder);
router.get("/getfolders", getFolders);
module.exports = router;
