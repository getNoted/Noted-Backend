const jwt=require('jsonwebtoken');
const Video =require('../models/video');

const authByToken=(req)=>{
    const token = req.headers["authorization"].split(" ")[1];
  
    const user = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    if (!user) {
      res.status(404).json({ message: "user not logged in" });
    }
    
    const user_id = user.user_id;
  
    return user_id;
}

module.exports={authByToken}