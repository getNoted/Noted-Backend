const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  folder_name: {
    type:String,
    unique:true
  },
  is_deleted: Boolean,
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  
  folders:[folderSchema],

  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
const Folder = mongoose.model("Folder", folderSchema);
module.exports = User;
module.exports = Folder;
