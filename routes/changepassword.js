const express = require("express");
const router = express.Router();
const { resetpassword } = require("../controllers/auth/changepassword");
router.post("/", resetpassword);
module.exports = router;
