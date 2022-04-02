const Video = require("../../models/video");
const jwt = require("jsonwebtoken");
const url = require("url");

const deletetimestamp=(req,res)=>{
    const token = req.headers["authorization"].split(" ")[1];

    try {
        const user = jwt.verify(token, process.env.JWT_AUTH_SECRET);
        if (!user) {
          res.status(404).json({ message: "user not logged in" });
        }
        let {video_url,timestamp}=req.body;
        const user_id = user._id;
        timestamp=formattimestamp(timestamp);
        
    const { v: video_id } = url.parse(video_url, true).query;

    const video = await Video.findOne({ video_id, user_id });

    if (!video) {
      res.status(404).json({ message: "video not found" });
    }

    else{
        notes=video.notes;
        notes.delete(timestamp);

        await Video.updateOne({video_id,user_id},{
            $set:{
                notes:notes
            }
        })
    }
    }catch(err){
        console.log(err);
    }
    
}

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