const express=require('express');
const router=express.Router();
const { updatenotes }=require('../controllers/notes/updatenotes');

router.put('/',updatenotes);
module.exports=router;