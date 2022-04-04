const express=require('express');
const router=express.Router();
const {deletetimestamp}=require('../controllers/notes/deletetimestamp');
router.post('/',deletetimestamp);
module.exports=router;