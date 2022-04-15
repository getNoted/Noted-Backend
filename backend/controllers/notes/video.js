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

module.exports = { readnotes };
