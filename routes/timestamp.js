const express=require('express');
const router=express.Router();
const {createnotes,readtimestampnotes,deletetimestamp,updatenotes}=require('../controllers/notes/timestamp');
router.post('/read',readtimestampnotes);
router.put('/update',updatenotes);
router.post('/create',createnotes);
router.post('/delete',deletetimestamp);


module.exports=router;