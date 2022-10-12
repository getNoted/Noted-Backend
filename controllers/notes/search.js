const jwt = require("jsonwebtoken");
const Video = require("../../models/video");
const { authByToken } = require("../../utils/auth");

const searchVideoname = async (req, res) => {
    try{
        const user_id = authByToken(req);
        const videoname = req.query.videoname;
        const deleted =req.query.deleted;
        const videos = await Video.find({user_id, is_deleted:deleted==='true', video_name: {$regex: `${videoname}`, $options: "i"}});
        if(videos){
            res.status(200).json({message: "fetched relevant videos", videos});
        }else{
            res.status(404).json({message: "no video found"});
        }
    }
    catch(err){
        console.log(err);
    }
}
module.exports = { searchVideoname };