const jwt = require("jsonwebtoken");
const Video = require("../../models/video");
const { authByToken } = require("../../utils/auth");
const { checkIfDeleted } = require("../../utils/folder");
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
      res.status(404).json({ message: "not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const deleteVideo=async (req,res)=>{
   const {video_id}=req.body;
   try{
    const user_id=authByToken(req);
    const video=await Video.findOneAndUpdate({user_id,video_id},{
      $set:{
        is_deleted:true
      }
    });

    if(!video){
      res.status(404).json({message:"video not found"});
    }

    else{
      res.status(200).json({message:"success"})
    }

   }catch(err){
    console.log(err);
   }
}





module.exports = { readnotes,deleteVideo };
