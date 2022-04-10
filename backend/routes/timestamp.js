const express=require('express');
const router=express.Router();
const {createnotes}=require('../controllers/notes/createnotes');
const {readtimestampnotes}=require('../controllers/notes/readtimestampnotes');
const {deletetimestamp}=require('../controllers/notes/deletetimestamp');
router.post('/create',createnotes);
router.post('/read',readtimestampnotes);
router.post('/delete',deletetimestamp);


module.exports=router;