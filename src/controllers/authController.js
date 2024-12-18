const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const saltRounds = 10;

require("dotenv").config();

const register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).send("User already exists");
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ username, password: hash, role });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send("User not found");
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!result) {
        return res.status(400).json({ message: "Invalid password" });
      }
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token });
    });
  } catch (error) {
    res.status(500).josn({ error: "Internal server error" });
  }
};

module.exports = { register, login };
