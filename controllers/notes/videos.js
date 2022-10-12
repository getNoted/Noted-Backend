
const Video = require("../../models/video");
const url = require("url");
const { authByToken } = require("../../utils/auth");
const readallvideos = async (req,res) => {

  try {
    const user_id=authByToken(req);
    const page=parseInt(req.query.page);
    const limit=parseInt(req.query.limit);
    const deleted=req.query.deleted;
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const totalDocuments= await Video.countDocuments({user_id });

    const result = await Video.find({user_id,is_deleted:deleted==='true' },{ video_id: 1, video_name: 1,video_url:1,created_at:1 }).sort({created_at:-1}).skip(startIndex).limit(limit);
    console.log(result);
    if (!result) {
      res.status(404).json({ message: "no video not found" });
    } else {
      res.status(200).json({ message: "success",videos:result });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { readallvideos };
