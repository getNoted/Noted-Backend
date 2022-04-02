const express=require('express');
const router=express.Router();
const {createnotes}=require('../controllers/notes/createnotes');
router.post('/',createnotes);

module.exports=router;