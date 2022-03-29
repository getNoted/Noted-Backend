const bcrypt = require("bcrypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    if (await bcrypt.compare(password, user.password)) {
      const { username, email, _id: user_id } = user;
      const token = jwt.sign(
        { username, email, user_id },
        process.env.JWT_AUTH_SECRET
      );
      res
        .status(200)
        .json({ message: "user signed in successfully", token: token });
    } else {
      res.status(400).json({ message: "incorrect password" });
    }
  } catch (err) {
    console.log(err);
    res.json({ message: err });
  }
};

module.exports = { signin };
