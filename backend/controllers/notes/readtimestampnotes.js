const Video = require("../../models/video");
const jwt = require("jsonwebtoken");
const url = require("url");
const {formattimestamp}=require('../../utils/notes');
const { authByToken } = require("../../utils/auth");
const readtimestampnotes = async (req, res) => {
  

  try {
    const user_id=authByToken(req);
    let { videourl: video_url, timestamp } = req.body;
    
    
    timestamp=formattimestamp(timestamp);
    const { v: video_id } = url.parse(video_url, true).query;

    const video = await Video.findOne({ video_id, user_id });

    if (!video) {
      res.status(404).json({ message: "video not found" });
    }

    if (video.notes.has(timestamp)) {
      const note = video.notes.get(timestamp);
      res.json({ message: "success", notes: note });
    } else {
      res.status(404).json({ message: "timestamp does not exist" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { readtimestampnotes };
