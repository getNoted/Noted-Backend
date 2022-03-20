const brcrypt = require("bcrypt");
const User = require("../models/user");

const signup = async (req, res) => {
  const { email, username, password: plainTextPassword } = req.body;

  const password = await brcrypt.hash(plainTextPassword, 10);

  try {
    const newUser = await User.create({
      email,
      username,
      password,
    });
    res
      .status(200)
      .json({ user: newUser, message: "user created successfully" });
  } catch (err) {
    res.json({ message: err });
  }
};

module.exports = { signup };
