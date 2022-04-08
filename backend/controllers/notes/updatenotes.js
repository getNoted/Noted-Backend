const jwt = require("jsonwebtoken");
const Video = require("../../models/video");
const url = require("url");
const {formattimestamp}=require('../../utils/notes');
const { authByToken } = require("../../utils/auth");
const updatenotes = async (req, res) => {
  
  try {
    user_id=authByToken(req);
    let {
      video_url,
      videoname: video_name,
      timestamp,
      content,
      foldername: folder,
    } = req.body;
    const { v: video_id } = url.parse(video_url, true).query;

    const video = await Video.findOne({ video_id, user_id });
    timestamp = formattimestamp(timestamp);
    if (video) {
      const updatednotes = video.notes;
      updatednotes.set(timestamp, content);

      await Video.updateOne(
        { user_id, video_id },
        {
          $set: {
            notes: updatednotes,
          },
        }
      );
      res.status(200).json({ message: "updated" });
    } else {
      res.status(404).json({ message: "no video exists" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { updatenotes };
