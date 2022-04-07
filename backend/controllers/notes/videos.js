
const Video = require("../../models/video");
const url = require("url");
const { authByToken } = require("../../utils/auth");
const readallvideos = async (req,res) => {

  try {
    const user_id=authByToken(req);
    const videos = await Video.find({user_id },{ _id: 0, video_name: 1,video_url:1 });

    if (!videos) {
      res.status(404).json({ message: "no video not found" });
    } else {
      res.status(200).json({ message: "success", videos });
    }
    
  } catch (err) {
    console.log(err);
  }
};

module.exports = { readallvideos };
