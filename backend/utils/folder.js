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

const editName=(folders,old_folder_name,new_folder_name)=>{
  const currentFolder=folders[old_folder_name];
  folders[new_folder_name]=folders[old_folder_name];
  delete folders[old_folder_name];
  return folders;
}
module.exports = { createFolder, softDeleteFolder, checkIfDeleted,editName };
