const jwt = require("jsonwebtoken");
const Video = require("../../models/video");

const readnotes = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    if (!user) {
      res.status(404).json({ message: "user not logged in" });
    }
    const user_id = user._id;

    const { videoname: video_name } = req.params;
    const video = await Video.findOne({ video_name, user_id });
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
const changeNotesFormat = (notes) => {
  let data = [];
  for (let timestamp of notes.keys()) {
    data.push({
      [timestamp]: notes.get(timestamp),
    });
  }
  return data;
};

module.exports = { readnotes };
