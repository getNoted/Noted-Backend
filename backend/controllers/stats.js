
const {authByToken}=require('../utils/auth');
const User=require('../models/user');
const Video=require('../models/video');
const getStats=async (req,res)=>{
    try{
        _id = authByToken(req);
        const user=await User.findOne({_id});
        console.log(user);
        if(user){
            const stats={};
            console.log(user);
            stats.folders=user.folders.length;
            const videos=await Video.find({user_id:_id});
            stats.videos=videos.length;
            res.json({message:"success", data:stats})
        }
        else{
            res.json({message:"user not found"});
        }
        
    }catch(err){
        console.log(err);
    }
}

module.exports={getStats}