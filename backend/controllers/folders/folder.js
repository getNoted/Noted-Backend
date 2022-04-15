const { default: mongoose } = require("mongoose");
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
  console.log(folder_name);
  try {
    const _id = authByToken(req);
    const user = await User.findOne({ _id });
    if (user) {
      console.log(user.folders);
      let folder=await User.findOne({_id},{
        folders: {
          $filter: {
            input: "$folders",
            as:"folder",
            cond:{
              $and:[
                {$eq:["$$folder.folder_name",folder_name]},
                {$eq:["$$folder.is_deleted",false]}
               
              ]
            }
          },
         
        }
      });
      console.log(folder);
      if (folder.folders.length===0) {
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
    console.log(is_deleted==="true");
    
    if (user) {
     

    const folders = await User.find({ _id },{
        folders: {
          $filter: {
            input: "$folders",
            as:"folder",
            cond:{
              $and:[
                {$eq:["$$folder.is_deleted",is_deleted==="true"]},
               
              ]
            }
          },
         
        },

        
        
      }).sort({'folders.createdAt':1});
      console.log(folders);
      res.status(200).json({ message: "success", folders:folders[0].folders});
    } else {
      res.status(404).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
}



// Delete a folder
const deleteFolder = async (req, res) => {
  let { folder_id } = req.body;
  console.log(folder_id);
  folder_id = mongoose.Types.ObjectId(folder_id);
  if (folder_id === "default") {
    res.status(400).json({ message: "default folder cannot be deleted" });
  } else {
    try {
      const _id = authByToken(req);
      const folder=await User.findOneAndUpdate({_id:_id,'folders._id':folder_id},{
        $set:{
          'folders.$.is_deleted':true
        }
      });
      console.log(folder);
      
      if (folder) {
        console.log(folder);
        
        
          
        res.status(200).json({message:"success"});
        
        
      } else {
        res.status(404).json({ message: "folder not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }
};



//Edit Name of a folder
const editFoldername = async (req, res) => {
  let { new_folder_name, old_folder_name,folder_id } = req.body;
  folder_id = mongoose.Types.ObjectId(folder_id);
  if (old_folder_name === "default") {
    res.status(400).json({ message: "default folder cannot be modified" });
  } else {
    try {
      const _id = authByToken(req);
      
      let folder=await User.findOne({ _id },{
        folders: {
          $filter: {
            input: "$folders",
            as:"folder",
            cond:{
              $and:[
                {$eq:["$$folder.folder_name",new_folder_name]},
                {$eq:["$$folder.is_deleted",false]},
               
              ]
            }
          },
         
        },
    });
    
    if(folder.folders.length===0){
      //rename the folder
      let folder=await User.findOneAndUpdate({_id:_id,'folders._id':folder_id},{
        $set:{
          'folders.$.folder_name':new_folder_name
        }
      });
      
      if(folder){
        res.status(200).json({message:"success"});
      }
      else{
        //folder does not exist
        res.status(404).json({message:"folder does not exist"});
      }
    }

    else{
      //cannot rename because one with the same name already exists

      res.status(400).json({message:"folder name already exists"});
    }
  
  } catch (err) {
      console.log(err);
    }
  }
};

module.exports = { deleteFolder, editFoldername, createfolder, getFolders };