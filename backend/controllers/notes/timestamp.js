const jwt = require("jsonwebtoken");
const Video = require("../../models/video");
const url = require("url");
const { formattimestamp } = require("../../utils/notes");
const { authByToken } = require("../../utils/auth");

//api to create notes for a timestamp from yt
const createnotes = async (req, res) => {
  try {
    user_id = authByToken(req);
    let {
      video_url,
      videoname: video_name,
      timestamp,
      content,
      foldername: folder,
    } = req.body;
    console.log(video_url);
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
      res.status(200).json({ message: "success" });
    } else {
      const notes = new Map();
      notes.set(timestamp, content);
      const newVideo = await Video.create({
        video_id,
        video_url,
        user_id,
        video_name,
        folder,
        notes,
        is_deleted:false
      });

      res.status(200).json({ message: "success" });
    }
  } catch (err) {
    console.log(err);
  }
};

// read notes of a particular timestamp
const readtimestampnotes = async (req, res) => {
  try {
    const user_id = authByToken(req);
    let { videourl: video_url, timestamp } = req.body;

    timestamp = formattimestamp(timestamp);
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


// update notes of a particular timestamp
const updatenotes = async (req, res) => {
  try {
    user_id = authByToken(req);
    let { videoname: video_name, timestamp, content } = req.body;
    
    const video = await Video.findOne({ video_name, user_id });
    timestamp = formattimestamp(timestamp);
    if (video) {
      const updatednotes = video.notes;
      updatednotes.set(timestamp, content);

      await Video.updateOne(
        { user_id, video_name },
        {
          $set: {
            notes: updatednotes,
          },
        }
      );
      res.status(200).json({ message: "success" });
    } else {
      res.status(404).json({ message: "no video exists" });
    }
  } catch (err) {
    console.log(err);
  }
};


//delete a timestamp
const deletetimestamp = async (req, res) => {
  try {
    const user_id = authByToken(req);
    let { video_name, timestamp } = req.body;

    timestamp = formattimestamp(timestamp);

    const video = await Video.findOne({ video_name, user_id });
    const video_id = video.video_id;
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

module.exports = {
  createnotes,
  readtimestampnotes,
  updatenotes,
  deletetimestamp,
};
