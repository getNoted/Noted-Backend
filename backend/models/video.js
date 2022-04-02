const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    video_id: {
      type: String,
      required: true,
    },
    user_id: mongoose.Schema.Types.ObjectId,
    video_name: {
      type: String,
      required: true,
    },
    video_url: {
      type: String,
      required: true,
    },
    folder: {
      type: String,
      required: true,
    },
    notes: {
      type: Map,
      of: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "modified_on" } }
);

const Video = mongoose.model("Video", videoSchema);

module.exports = Video;
