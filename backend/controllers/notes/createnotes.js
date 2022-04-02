const jwt=require('jsonwebtoken');
const Video =require('../../models/video');
const url=require('url');

const createnotes = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
 
  try{
    const user=jwt.verify(token,process.env.JWT_AUTH_SECRET);
    if(!user){
      res.status(404).json({message:"user not logged in"})
    }
    const user_id=user._id;
    const {video_url,videoname:video_name,timestamp,content,foldername:folder}=req.body;
    console.log(video_url);
    const {v:video_id}=url.parse(video_url,true).query;
    
    const video=await Video.findOne({video_id, user_id});
    
    if(video){
      const updatednotes=video.notes;
      updatednotes.set(timestamp,content);
      
       await Video.updateOne({user_id,video_id},{
         $set:{
           notes:updatednotes
         }
       })
       res.status(200).json({message:"success"});
    }
    else{
      const notes=new Map();
      notes.set(timestamp,content);
      const newVideo=await Video.create({
        video_id,
        video_url,
        user_id,
        video_name,
        folder,
        notes
      });

      res.status(200).json({message:"success"})
    }
    
  }catch(err){
    console.log(err);
  }
 
};



module.exports={createnotes};
