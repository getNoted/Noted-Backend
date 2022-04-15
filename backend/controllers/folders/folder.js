const User = require("../../models/user");
const { authByToken } = require("../../utils/auth");
const { createFolder, checkIfDeleted, softDeleteFolder } = require("../../utils/folder");

const createfolder = async (req, res) => {
  const { folder_name } = req.body;
  try {
    const _id = authByToken(req);
    const user = await User.findOne({ _id });
    if (user) {
      console.log(user.folders);
      let folder=await User.findOne({'folders.folder_name':folder_name,'folders.user_id':_id});
      console.log(folder);
      if (!folder) {
        folder={folder_name:folder_name,is_deleted:false,user_id:_id};
        user.folders.push(folder);
        await user.save();
        res.status(200).json({ message: "folder created" });
        
      } else {
        res.status(400).json({ message: "folder already exists" });
      }
    }
    else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

const getFolders=async (req,res)=>{
  try {
    const _id = authByToken(req);
    const user = await User.findOne({ _id });
    let is_deleted=req.query.deleted;
    console.log(is_deleted);
    console.log(user);
    if (user) {
      const folders=await User.find({'folders.user_id':_id,'folders.is_deleted':is_deleted},{_id:0,'folders._id':1,'folders.folder_name':1});
      console.log(folders);
      res.status(200).json({ message: "success", folders:folders[0].folders});
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
}

const deleteFolder = async (req, res) => {
  const { folder_name } = req.body;
  if (folder_name === "default") {
    res.status(400).json({ message: "default folder cannot be deleted" });
  } else {
    try {
      const _id = authByToken(req);
      const user = await User.findOne({ _id });

      if (user) {
        if (!user.folders.hasOwnProperty(folder_name)) {
          res.status(404).json({ message: "folder not found" });
        } else {
          const { folders } = user;
          if (checkIfDeleted(folders, folder_name)) {
            res.status(400).json({ message: "folder already deleted" });
          } else {
            const updatedFolders = softDeleteFolder(folders, folder_name);
            await User.updateOne(
              { _id },
              {
                $set: {
                  folders: updatedFolders,
                },
              }
            );
            res.status(200).json({ message: "success" });
          }
        }
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { deleteFolder, createfolder, getFolders };
