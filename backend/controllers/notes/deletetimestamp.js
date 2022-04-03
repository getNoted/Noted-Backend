const Video = require("../../models/video");
const jwt = require("jsonwebtoken");
const url = require("url");

const deletetimestamp = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    if (!user) {
      res.status(404).json({ message: "user not logged in" });
    }
    let { video_name, timestamp } = req.body;
    const user_id = user._id;
    timestamp = formattimestamp(timestamp);

    const video = await Video.findOne({ video_name, user_id });

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

const formattimestamp = (timestamp) => {
  const timearr = timestamp.split(":");
  while (timearr.length !== 3) {
    timearr.unshift("00");
  }
  let formattedtimestamp = "";
  timearr.forEach((element, index) => {
    if (index === 2) formattedtimestamp += element;
    else formattedtimestamp += element + ":";
  });
  console.log(formattedtimestamp);
  return formattedtimestamp;
};

module.exports = { deletetimestamp };
