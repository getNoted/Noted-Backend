const express=require('express');
const router=express.Router();
const {readtimestampnotes}=require('../controllers/notes/readtimestampnotes');
router.post('/',readtimestampnotes);
module.exports=router;