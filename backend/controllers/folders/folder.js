const User = require("../../models/user");
const Video = require("../../models/video");
const { authByToken } = require("../../utils/auth");
const {
  checkIfDeleted,
  softDeleteFolder,
  editName,
} = require("../../utils/folder");


const createfolder = async (req, res) => {
  const { folder_name } = req.body;
  const _id = authByToken(req);
  const user = await User.findOne({ _id });
  try {
    if (user) {
      if (!user.folders.hasOwnProperty(folder_name)) {
        const { folders } = user;
        const updatedFolders = createFolder(folders, folder_name);
        await User.updateOne(
          { _id },
          {
            $set: {
              folders: updatedFolders,
            },
          }
        );
        res.status(200).json({ message: "folder created" });
        console.log(folders)
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

// Delete a folder
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


//Edit Name of a folder
const editFoldername = async (req, res) => {
  const { new_folder_name, old_folder_name } = req.body;
  if (old_folder_name === "default") {
    res.status(400).json({ message: "default folder cannot be modified" });
  } else {
    try {
      const _id = authByToken(req);
      const user = await User.findOne({ _id });
      if (user) {
        if (!user.folders.hasOwnProperty(old_folder_name)) {
          res.status(404).json({ message: "folder not found" });
        } else if (user.folders.hasOwnProperty(new_folder_name)) {
          res.status(400).json({ message: "folder already exists" });
        } else {
          let { folders } = user;
          folders = editName(folders, old_folder_name, new_folder_name);
          await User.updateOne(
            { _id },
            {
              $set: {
                folders: folders,
              },
            }
          );

          await Video.updateMany(
            { user_id: _id, folder: old_folder_name },
            {
              $set: {
                folder: new_folder_name,
              },
            }
          );
          res.status(200).json({ message: "success" });
        }
      } else {
        res.status(404).json({ message: "user not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }
};
module.exports = { deleteFolder, editFoldername, createfolder, getFolders };