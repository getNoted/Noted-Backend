const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  folder_name: String,
  is_deleted: Boolean,
  unique: true,
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
