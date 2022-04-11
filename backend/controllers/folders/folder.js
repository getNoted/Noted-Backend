const User = require("../../models/user");
const {
  authByToken,
  softDeleteFolder,
  checkIfDeleted,
} = require("../../utils/auth");

const deleteFolder = async (req, res) => {
  const { folder_name } = req.body;
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
};

module.exports = { deleteFolder };
