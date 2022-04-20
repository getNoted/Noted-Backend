const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const Video = require("../../models/video");
const { authByToken } = require("../../utils/auth");

const { checkIfDeleted } = require("../../utils/folder");
const { changeNotesFormat } = require("../../utils/notes");
const {ifExists} =require('../../utils/folder');
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


const editName=async (req,res)=>{
  const {video_id,new_video_name}=req.body;
  try{
    const user_id=authByToken(req);
    let video=await Video.findOne({user_id,video_name:new_video_name,is_deleted:false});
    console.log(video);
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


const changeFolder=async (req,res)=>{
  const {video_id,folder_name}=req.body;
  const user_id=authByToken(req);
  console.log(user_id);
  let folder=await ifExists(user_id,folder_name);
  if(folder.folders.length!==0){
    //folder exist so change the folder of the video

    const video=await Video.findOneAndUpdate({user_id,video_id},{
      $set:{
        folder:folder_name
      }
    });

    if(video){
      res.json({message:"success"});
    }
    else{
      //video not found
      res.status(404).json({message:"video not found"});
    }

  }
  else{
    //folder does not exist
    res.status(404).json({message:"folder not found"});
  }

}


module.exports = { readnotes,deleteVideo,editName,changeFolder};
