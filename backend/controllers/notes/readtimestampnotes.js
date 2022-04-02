const Video = require("../../models/video");
const jwt = require("jsonwebtoken");
const url = require("url");
const formattimestamp=(timestamp)=>{
    const timearr = timestamp.split(":");
    while (timearr.length !== 3) {
      timearr.unshift("00");
    }
    let formattedtimestamp="";
    timearr.forEach((element,index) => {
        if(index===2) formattedtimestamp+=element;
        else
            formattedtimestamp+=element+":";
    });
    console.log(formattedtimestamp);
    return formattedtimestamp;
}
const readtimestampnotes = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    const user = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    if (!user) {
      res.status(404).json({ message: "user not logged in" });
    }
    const user_id = user._id;
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
