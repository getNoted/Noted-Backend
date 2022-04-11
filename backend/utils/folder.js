const createFolder=(folders,foldername)=>{
    const def={
      is_deleted:false
    }
    folders[foldername]=def;
    return folders;
  }

  module.exports={createFolder};