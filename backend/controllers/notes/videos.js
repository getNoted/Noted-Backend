
const Video = require("../../models/video");
const url = require("url");
const { authByToken } = require("../../utils/auth");
const readallvideos = async (req,res) => {

  try {
    const user_id=authByToken(req);
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const totalDocuments= await Video.countDocuments({user_id });

    const result = await Video.find({user_id },{ video_id: 1, video_name: 1,video_url:1 }).skip(startIndex).limit(limit);

    if (!result) {
      res.status(404).json({ message: "no video not found" });
    } else {
      res.status(200).json({ message: "success",result });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { readallvideos };
