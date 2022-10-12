const express=require('express');
const router=express.Router();
const {getStats}=require('../controllers/stats');
router.get('/getstats',getStats);

module.exports=router;