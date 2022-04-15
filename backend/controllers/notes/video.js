const jwt = require("jsonwebtoken");
const Video = require("../../models/video");
const { authByToken } = require("../../utils/auth");

const { changeNotesFormat } = require("../../utils/notes");
const readnotes = async (req, res) => {
  try {
    const user_id = authByToken(req);
    const { video_id } = req.params;
    const video = await Video.findOne({ user_id, video_id });
    if (video) {
      const notes = video.notes;
      const data = changeNotesFormat(video.notes);
      res.json({ message: "success", data: data, videoname: video.video_name });
    } else {
      res.json({ message: "not found" });
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
