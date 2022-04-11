const jwt = require("jsonwebtoken");
const Video = require("../../models/video");
const { authByToken } = require("../../utils/auth");
const {changeNotesFormat}=require('../../utils/notes');
const readnotes = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    if (!user) {
      res.status(404).json({ message: "user not logged in" });
    }
    const user_id = user.user_id;
    console.log(user_id);
    const { videoname: video_name } = req.params;
    
    const video = await Video.findOne({ video_name, user_id });
    console.log(video);
    if (video) {
      const notes = video.notes;
      console.log(video.notes);
      const data = changeNotesFormat(video.notes);
      console.log(data);
      res.json({ message: "success", data: data,videoname:video.video_name });
    } else {
      res.status(200).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const editName=async (req,res)=>{
  const {video_id,new_video_name}=req.body;
  try{
    const user_id=authByToken(req);
    let video=await Video.findOne({user_id,video_name:new_video_name});
    if(video){
      console.log(video);
      res.status(400).json({message:"videoname already exist"});
    }
    else{
      let video=await Video.findOneAndUpdate({user_id,video_id},{
        $set:{
          video_name:new_video_name
        }
      });
      console.log(video);
      if(!video){
        res.status(404).json({message:"video not found"});
      }
      else
        res.status(200).json({message:"success"});
    }
    
  }catch(err){
    console.log(err);
  }
}


module.exports = { readnotes,editName };
