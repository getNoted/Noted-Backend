
const express = require("express");
const { signin } = require("../controllers/auth/signin");
const router = express.Router();

router.post("/", signin);

module.exports = router;
