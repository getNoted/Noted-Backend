const createFolder = (folders, foldername) => {
  const def = {
    is_deleted: false,
  };
  folders[foldername] = def;
  return folders;
};

const softDeleteFolder = (folders, folder_name) => {
  const currentFolder = folders[folder_name];
  currentFolder.is_deleted = true;
  return folders;
};

const checkIfDeleted = (folders, folder_name) => {
  const currentFolder = folders[folder_name];
  return currentFolder.is_deleted;
};
module.exports = { createFolder, softDeleteFolder, checkIfDeleted };
