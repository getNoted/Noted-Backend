const mongoose = require("mongoose");
const videotimestampSchema = new mongoose.Schema({
  note:{
    type: String,
    required: true,
  },
  timestamp:{
    type: String,
    required: true,
  }
})
const videoSchema = new mongoose.Schema({
  video_id: {
    type: String,
    required: true,
  },
  video_name: {
    type: String,
    required: true,
  },
  video_url: {
    type: String,
    required: true,
  },
  folder:{
    type: String,
    required: true,
  },
  notes:
    [videotimestampSchema]
}, {timestamps: { createdAt: 'created_at',updatedAt: 'modified_on'}});

const Video = mongoose.model("Video", videoSchema);
const VideoTimestamp = mongoose.model("VideoTimestamp", videotimestampSchema);
module.exports = Video;
module.exports = VideoTimestamp;
