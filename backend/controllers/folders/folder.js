const User = require("../../models/user");
const { authByToken } = require("../../utils/auth");
const { createFolder, checkIfDeleted, softDeleteFolder } = require("../../utils/folder");

const createfolder = async (req, res) => {
  const { folder_name } = req.body;
  try {
    const _id = authByToken(req);
    const user = await User.findOne({ _id });
    if (user) {
      const folder=User.findOne({folder_name});
      console.log(folder);
      if (!folder) {
        
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
  const _id = authByToken(req);
  let isDeleted=req.query.deleted;
  const user = await User.findOne({ _id });
  try {
    if (user) {
      const { folders } = user;
      let folder_names = [];
      for (let folder in folders) {
        if (folders.hasOwnProperty(folder)) {
          if(checkIfDeleted(folders,folder).toString()===isDeleted){
            folder_names.push(folder);
          }
        }
      }
      res.status(200).json({ message: "fetched all folders", folder_names });
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
