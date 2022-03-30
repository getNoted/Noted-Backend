const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/user");
const resetpassword = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const { oldpassword, newpassword, confirmpassword } = req.body;
  if (confirmpassword !== newpassword) {
    res
      .status(400)
      .json({ message: "confirm password is not same as new password" });
  }
  try {
    const currentUser = jwt.verify(token, process.env.JWT_AUTH_SECRET);
    const _id = currentUser.user_id;
    const user = await User.findById({ _id });
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    if (await bcrypt.compare(oldpassword, user.password)) {
      await User.updateOne(
        { _id },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );

      res.status(200).json({ message: "password changed" });
    } else {
      res.status(400).json({ message: "incorrect password" });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { resetpassword };
