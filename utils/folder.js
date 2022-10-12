const User = require("../models/user");

const ifExists = async (user_id, folder_name) => {
  let folder = await User.findOne(
    { _id: user_id },
    {
      folders: {
        $filter: {
          input: "$folders",
          as: "folder",
          cond: {
            $and: [
              { $eq: ["$$folder.folder_name", folder_name] },
              { $eq: ["$$folder.is_deleted", false] },
            ],
          },
        },
      },
    }
  );
  console.log(folder);
  return folder;
};

const findFolder=async (user_id,folder_name,folder_id)=>{
  let folder = await User.findOne(
    { _id: user_id },
    {
      folders: {
        $filter: {
          input: "$folders",
          as: "folder",
          cond: {
            $and: [
              { $eq: ["$$folder.folder_name", folder_name] },
              { $eq: ["$$folder._id", folder_id] },
              { $eq: ["$$folder.is_deleted", false] },
            ],
          },
        },
      },
    }
  );
  return folder;
}

const softDeleteFolder = (folders, folder_name) => {
  const currentFolder = folders[folder_name];
  currentFolder.is_deleted = true;
  return folders;
};

const checkIfDeleted = (folders, folder_name) => {
  const currentFolder = folders[folder_name];
  return currentFolder.is_deleted;
};

const editName = (folders, old_folder_name, new_folder_name) => {
  const currentFolder = folders[old_folder_name];
  folders[new_folder_name] = folders[old_folder_name];
  delete folders[old_folder_name];
  return folders;
};
module.exports = { softDeleteFolder, checkIfDeleted, editName, ifExists,findFolder};
