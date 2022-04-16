const express = require("express");
const router = express.Router();
const { searchVideoname } = require("../controllers/notes/search");
router.get("/", searchVideoname);
module.exports = router;
