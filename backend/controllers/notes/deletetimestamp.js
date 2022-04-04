
const Video = require("../../models/video");
const jwt = require("jsonwebtoken");
const url = require("url");
const {authByToken}=require('../../utils/auth');
const {formattimestamp}=require('../../utils/notes');
const deletetimestamp = async (req, res) => {
  

  try {
    const user_id=authByToken(req);
    let { video_name, timestamp } = req.body;
    
    timestamp = formattimestamp(timestamp);

    const video = await Video.findOne({ video_name, user_id });
    const video_id=video.video_id;
    if (!video) {
      res.status(404).json({ message: "video not found" });
    } else {
      console.log(video);
      notes = video.notes;
      if (!notes.has(timestamp)) {
        res.status(404).json({ message: "timestamp does not exist" });
      } else {
        notes.delete(timestamp);

        await Video.updateOne(
          { video_id, user_id },
          {
            $set: {
              notes: notes,
            },
          }
        );

        res.status(200).json({ message: "success" });
      }
    }
  } catch (err) {
    console.log(err);
  }
};


module.exports = { deletetimestamp };

