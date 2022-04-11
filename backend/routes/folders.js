const express = require("express");
const router = express.Router();
const { deleteFolder } = require("../controllers/folders/folder");
const { createfolder } = require("../controllers/folders/folder");
router.post("/delete", deleteFolder);
router.post("/create", createfolder);
module.exports = router;
