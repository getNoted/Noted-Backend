const express = require("express");
const router = express.Router();
const { deleteFolder } = require("../controllers/folders/folder");
router.post("/delete", deleteFolder);
module.exports = router;
